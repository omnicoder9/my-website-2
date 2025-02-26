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
