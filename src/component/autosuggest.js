const templateString = ({ placeholder }) => `
  <style>
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    input {
      border: 2px solid black;
      padding: 10px;
      font-size: 14px;
      box-shadow: 1px 2px 2px 1px;
      width: calc(100% - 20px);
      margin: 10px;
      margin-bottom: 0px;
    }

    div {
      background-color: #f2f2f2;
      margin: 10px;
      margin-top: 0px;
    }

    .result {
      margin: 0;
      padding: 10px;
      overflow: hidden;
      border-bottom: 1px solid lightgray;
    }
  </style>
  <body>
    <input id="input" onkeyup="handleKeyUp(event);" placeholder="${placeholder}" />
    <div id="suggestions"></div>
  </body>
`;

const template = document.createElement("template");
template.innerHTML = templateString;

export class Autosuggest extends HTMLElement {
  constructor() {
    super();

    // use shadow DOM to hide our shame
    // best practice to do this in the constructor
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  // life cycle method for when the element is inserted into the DOM
  connectedCallback() {
    // as a best practice, don't override attributes that a user may have set
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }

    // configurable options passed in through properties
    const options = this.options || { placeholder: "Type here..." };

    // build template dynamically with options
    const template = document.createElement("template");
    template.innerHTML = templateString(options);

    // html template is rendered when cloned, let's attach it to the shadow DOM
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // helper to lazily set properties (i.e. if properties get set before loaded
  // we can ensure that the state is properly reflected)
  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}
