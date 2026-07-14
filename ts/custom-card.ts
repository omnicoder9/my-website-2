const customCardLimits = {
  description: 280,
  title: 80
} as const;

function sanitizeCustomCardText(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

class CustomCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          max-width: 300px;
          background: #fff;
          margin: 8px;
        }

        h3 {
          margin: 0;
          color: #333;
        }

        p {
          color: #666;
        }
      </style>
      <div>
        <h3></h3>
        <p></p>
      </div>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  connectedCallback(): void {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) {
      return;
    }

    const heading = shadowRoot.querySelector("h3");
    const paragraph = shadowRoot.querySelector("p");

    if (heading) {
      heading.textContent = sanitizeCustomCardText(this.getAttribute("title") || "", customCardLimits.title) || "Default Title";
    }

    if (paragraph) {
      paragraph.textContent =
        sanitizeCustomCardText(this.getAttribute("description") || "", customCardLimits.description) || "Default Description";
    }
  }
}

if (!customElements.get("custom-card")) {
  customElements.define("custom-card", CustomCard);
}

function openPopup(): void {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <style>
      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      .popup input {
        display: block;
        margin: 10px 0;
      }

      .popup button {
        margin-top: 10px;
      }
    </style>
    <div class="popup">
      <label>Title: <input type="text" id="cardTitle" maxlength="${customCardLimits.title}"></label>
      <label>Description: <input type="text" id="cardDescription" maxlength="${customCardLimits.description}"></label>
      <button type="button" id="confirmAddCardBtn">Add Card</button>
      <button type="button" id="cancelAddCardBtn">Cancel</button>
    </div>
  `;

  document.body.appendChild(popup);

  const titleInput = popup.querySelector<HTMLInputElement>("#cardTitle");
  const descriptionInput = popup.querySelector<HTMLInputElement>("#cardDescription");
  const confirmButton = popup.querySelector<HTMLButtonElement>("#confirmAddCardBtn");
  const cancelButton = popup.querySelector<HTMLButtonElement>("#cancelAddCardBtn");

  titleInput?.addEventListener("input", () => {
    const sanitizedValue = sanitizeCustomCardText(titleInput.value, customCardLimits.title);
    if (sanitizedValue !== titleInput.value) {
      titleInput.value = sanitizedValue;
    }
  });
  descriptionInput?.addEventListener("input", () => {
    const sanitizedValue = sanitizeCustomCardText(descriptionInput.value, customCardLimits.description);
    if (sanitizedValue !== descriptionInput.value) {
      descriptionInput.value = sanitizedValue;
    }
  });
  confirmButton?.addEventListener("click", addCustomCard);
  cancelButton?.addEventListener("click", () => {
    popup.remove();
  });
}

function addCustomCard(): void {
  const titleInput = document.getElementById("cardTitle") as HTMLInputElement | null;
  const descriptionInput = document.getElementById("cardDescription") as HTMLInputElement | null;
  const container = document.getElementById("cardContainer");
  const popup = document.querySelector(".popup");

  if (!titleInput || !descriptionInput || !container || !popup) {
    return;
  }

  const newCard = document.createElement("custom-card");
  newCard.setAttribute("title", sanitizeCustomCardText(titleInput.value, customCardLimits.title));
  newCard.setAttribute("description", sanitizeCustomCardText(descriptionInput.value, customCardLimits.description));

  container.appendChild(newCard);
  popup.remove();
}

window.openPopup = openPopup;
window.addCustomCard = addCustomCard;

const addCustomCardButton = document.getElementById("addCustomCardBtn");
if (addCustomCardButton) {
  addCustomCardButton.addEventListener("click", openPopup);
}
