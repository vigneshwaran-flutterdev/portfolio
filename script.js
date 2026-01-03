document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Show yellow popup while sending
    showPopup("Sending...", "var(--accent)");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        showPopup("Message sent successfully!", "var(--accent)");
      } else {
        showPopup("Failed to send message. Try again!", "red");
      }
    } catch (error) {
      showPopup("Network error! Check connection.", "red");
    }
  });

function showPopup(message, color) {
  // If popup exists, remove it first
  let existing = document.getElementById("formStatusPopup");
  if (existing) existing.remove();

  // Create popup
  const popup = document.createElement("div");
  popup.id = "formStatusPopup";
  popup.textContent = message;

  // Styling for popup (matches your gold/yellow theme)
  popup.style.position = "fixed";
  popup.style.bottom = "25px";
  popup.style.right = "25px";
  popup.style.padding = "14px 20px";
  popup.style.background = "#fff8e1";
  popup.style.border = "1px solid var(--accent)";
  popup.style.color = color;
  popup.style.fontSize = "0.9rem";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 8px 26px rgba(0,0,0,0.25)";
  popup.style.zIndex = "9999";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.4s ease";

  document.body.appendChild(popup);

  // fade-in
  setTimeout(() => {
    popup.style.opacity = "1";
  }, 50);

  // fade-out after 3 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 400);
  }, 3000);
}
