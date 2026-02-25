(function () {
  var form = document.getElementById("contact-form");
  if (!form) {
    return;
  }

  var status = document.getElementById("contact-form-status");
  var action = form.getAttribute("action") || "";
  var phoneInput = form.querySelector('input[name="telefon"]');
  var emailInput = form.querySelector('input[name="epost"]');

  if (action.indexOf("YOUR_CLOUDFLARE_WORKER_ENDPOINT") !== -1 && status) {
    status.textContent = "Formuläret är under aktivering. Ring gärna kliniken direkt så hjälper vi dig.";
  }

  var searchParams = new URLSearchParams(window.location.search);
  var sent = searchParams.get("sent");

  function clearSentParams() {
    if (!window.history || !window.history.replaceState) {
      return;
    }
    var cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("sent");
    cleanUrl.searchParams.delete("reason");
    window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search + cleanUrl.hash);
  }

  if (sent === "1") {
    var successMessage = "Tack. Ditt meddelande är skickat och vi återkommer så snart som möjligt.";

    var thankYou = document.createElement("div");
    thankYou.className = "form-thankyou";
    thankYou.setAttribute("role", "status");
    thankYou.setAttribute("aria-live", "polite");
    thankYou.innerHTML =
      "<h3>Tack för ditt meddelande</h3>" +
      "<p>" + successMessage + "</p>" +
      "<p>Behov av snabb hjälp? <a href=\"tel:+46722294463\">Ring +46 (0)733 82 29 80</a>.</p>";

    form.replaceWith(thankYou);

    if (status) {
      status.hidden = true;
      status.textContent = "";
      status.classList.remove("form-status-success", "form-status-error");
    }

    if (window.gtag) {
      window.gtag("event", "contact_form_success", {
        event_category: "conversion",
        event_label: window.location.pathname
      });
    }

    clearSentParams();
    return;
  }

  if (status && sent === "0") {
    status.textContent = "Det gick inte att skicka formuläret just nu. Ring gärna direkt så hjälper vi dig.";
    status.classList.add("form-status-error");
    if (window.gtag) {
      window.gtag("event", "contact_form_error", {
        event_category: "engagement",
        event_label: window.location.pathname,
        reason: searchParams.get("reason") || "unknown"
      });
    }
  }

  if (sent === "0") {
    clearSentParams();
  }

  var hasTrackedStart = false;
  function hasValue(input) {
    return Boolean(input && input.value && input.value.trim());
  }

  function validateContactChoice(showMessage) {
    if (!phoneInput || !emailInput) {
      return true;
    }

    var isValid = hasValue(phoneInput) || hasValue(emailInput);
    var message = isValid ? "" : "Ange telefonnummer eller e-postadress.";
    phoneInput.setCustomValidity(message);
    emailInput.setCustomValidity(message);

    if (!isValid && showMessage) {
      emailInput.reportValidity();
    }

    return isValid;
  }

  if (phoneInput && emailInput) {
    phoneInput.addEventListener("input", function () {
      validateContactChoice(false);
    });
    emailInput.addEventListener("input", function () {
      validateContactChoice(false);
    });
  }

  form.addEventListener("focusin", function () {
    if (hasTrackedStart || !window.gtag) {
      return;
    }
    hasTrackedStart = true;
    window.gtag("event", "contact_form_start", {
      event_category: "engagement",
      event_label: window.location.pathname
    });
  });

  form.addEventListener("submit", function (event) {
    if (!validateContactChoice(true)) {
      event.preventDefault();
      return;
    }

    if (status) {
      status.textContent = "Skickar meddelande...";
      status.classList.remove("form-status-success", "form-status-error");
    }

    if (window.gtag) {
      window.gtag("event", "contact_form_submit", {
        event_category: "conversion",
        event_label: window.location.pathname
      });
    }
  });
})();
