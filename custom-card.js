class CustomCard extends HTMLElement {
    constructor() {
        super();
        
        // Attach a shadow DOM
        this.attachShadow({ mode: 'open' });
        
        // Define template
        const template = document.createElement('template');
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
        
        // Append template content to shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('title') || 'Default Title';
        this.shadowRoot.querySelector('p').innerText = this.getAttribute('description') || 'Default Description';
    }
}

// Define the custom element
customElements.define('custom-card', CustomCard);


// Function to open the popup
function openPopup() {
    const popup = document.createElement('div');
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

// Function to add a custom card
function addCustomCard() {
    const title = document.getElementById('cardTitle').value;
    const description = document.getElementById('cardDescription').value;
    
    const newCard = document.createElement('custom-card');
    newCard.setAttribute('title', title);
    newCard.setAttribute('description', description);
    ///persist to db/api call
    
    // document.body.appendChild(newCard);//to erase
    document.getElementById('cardContainer').appendChild(newCard); // Append to container
    document.querySelector('.popup').remove();
}
document.getElementById("addCustomCardBtn").addEventListener("click", openPopup);
// Add a button to open the popup//to erase
// document.addEventListener("DOMContentLoaded", () => {
//     const addButton = document.createElement('button');
//     addButton.innerText = "Add Custom Card (will not persist)";
//     addButton.onclick = openPopup;
//     document.body.appendChild(addButton);
// });
