window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = window.gtag || gtag;
window.gtag("js", new Date());
window.gtag("config", "G-Q3E31PMZ37");

document.addEventListener("click", function (event) {
  var link = event.target.closest("a");
  if (!link || !link.href) {
    return;
  }

  if (link.href.indexOf("tel:") === 0) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: link.href,
      page_path: window.location.pathname,
      link_text: (link.textContent || "").trim().slice(0, 100)
    });
  }

  if (link.href.indexOf("sms:") === 0) {
    window.gtag("event", "sms_click", {
      event_category: "engagement",
      event_label: link.href,
      page_path: window.location.pathname,
      link_text: (link.textContent || "").trim().slice(0, 100)
    });
  }

  if (link.href.indexOf("mailto:") === 0) {
    window.gtag("event", "email_click", {
      event_category: "engagement",
      event_label: link.href,
      page_path: window.location.pathname,
      link_text: (link.textContent || "").trim().slice(0, 100)
    });
  }

  if (link.href.indexOf("vj1.se/vj/app/booking") !== -1) {
    window.gtag("event", "booking_click", {
      event_category: "conversion",
      event_label: link.href,
      page_path: window.location.pathname,
      link_text: (link.textContent || "").trim().slice(0, 100)
    });
  }
});
