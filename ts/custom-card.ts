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
      heading.textContent = this.getAttribute("title") || "Default Title";
    }

    if (paragraph) {
      paragraph.textContent = this.getAttribute("description") || "Default Description";
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
      <label>Title: <input type="text" id="cardTitle"></label>
      <label>Description: <input type="text" id="cardDescription"></label>
      <button onclick="addCustomCard()">Add Card</button>
      <button onclick="this.parentElement.remove()">Cancel</button>
    </div>
  `;

  document.body.appendChild(popup);
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
  newCard.setAttribute("title", titleInput.value);
  newCard.setAttribute("description", descriptionInput.value);

  container.appendChild(newCard);
  popup.remove();
}

window.openPopup = openPopup;
window.addCustomCard = addCustomCard;

const addCustomCardButton = document.getElementById("addCustomCardBtn");
if (addCustomCardButton) {
  addCustomCardButton.addEventListener("click", openPopup);
}
