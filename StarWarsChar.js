const currentDoc = document.currentScript.ownerDocument;

class StarWarsCharCard extends HTMLElement {
  constructor() {
    super();
  }

  render(swCharData) {
    this.shadowRoot.querySelector(".sw-char__name").innerHTML = swCharData.name;
    this.shadowRoot.querySelector(".sw-char__height").innerHTML =
      swCharData.height;
    this.shadowRoot.querySelector(".sw-char__mass").innerHTML = swCharData.mass;
    this.shadowRoot.querySelector(".sw-char__gender").innerHTML =
      swCharData.gender;
    this.shadowRoot.querySelector(".sw-char__birth-year").innerHTML =
      swCharData.birth_year;
  }

  // Gets called once the element is loaded into the dom
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = currentDoc.querySelector("#sw-char-template");
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    const swCharId = this.getAttribute("sw-char-id");

    const url = `https://swapi.co/api/people/${swCharId}/`;
    let data = "";
    fetch(url)
      .then(response => response.text())
      .then(responseText => {
        data = JSON.parse(responseText);
        this.render(JSON.parse(responseText));
      })
      .catch(e => {
        console.error(e);
      });
  }
}

customElements.define("star-wars-char-card", StarWarsCharCard);
