const templateString = `
  <style>
    body {
      margin: 100px;
      padding: 10%;
      background-color: white;
    }

    input {
      border: 2px solid black;
      padding: 10px;
      font-size: 14px;
      box-shadow: 1px 2px 2px 1px;
    }

    div {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .result {
      border: 1px solid gray;
      height: 1em;
      margin-top: 0px;
      margin-bottom: 10px;
      padding: 10px;
      overflow: hidden;
      box-shadow: 1px 2px 2px 1px;
      font-weight: 400;
    }
  </style>
  <body>
    <input id="input" onkeyup="handleKeyUp(event);" placeholder="you complete me..." />
    <div id="suggestions"></div>
  </body>
`;

const template = document.createElement("template");
template.innerHTML = templateString;

export class Autosuggest extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this._overlay = shadowRoot.querySelector(".overlay");
    this._content = shadowRoot.querySelector(".overlay-content");
  }

  static setStyle(element, style, value, pxStyles) {
    if (value) {
      if (pxStyles && pxStyles.indexOf(style) > -1) {
        value += "px";
      }
      element.style[style] = value;
    }
  }
}
