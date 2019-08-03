import { Trie } from "./trie";
import { debounce } from "./debounce";

const templateString = ({
  placeholder,
  inputCss,
  suggestionCss,
  resultCss,
}) => `
  <style>
    :host {
      display: block;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    #input ${inputCss}
    #suggestion ${suggestionCss}
    .result ${resultCss}
  </style>
  <div>
    <input id="input" placeholder="${placeholder}" />
    <div id="suggestion"></div>
  </div>
`;

const template = document.createElement("template");
template.innerHTML = templateString;

export class Autosuggest extends HTMLElement {
  // constructors for custom elements cannot access properties or attributes
  constructor() {
    super();

    // use shadow DOM to hide our shame
    // best practice to do this in the constructor
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  // life cycle method for when the element is inserted into the DOM
  connectedCallback() {
    // set up data structure to handle suggestions
    const words = this.words || [];
    this._trie = new Trie(words);

    // as a best practice, don't override attributes that a user may have set
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", 0);
    }

    // configurable options passed in through properties
    const options = {
      placeholder: "Type here...",
      inputCss: `{
        border: 1px solid black;
        padding: 10px;
        font-size: 14px;
        box-shadow: 1px 1px 1px 1px;
        width: calc(100% - 20px);
        margin: 10px;
        margin-bottom: 0px;
      }`,
      suggestionCss: `{
        background-color: #f2f2f2;
        margin: 10px;
        margin-top: 0px;
      }`,
      resultCss: `{
        margin: 0;
        padding: 10px;
        overflow: hidden;
        border-bottom: 1px solid lightgray;
      }`,
      debounce: 0,
      ...(this.options || {}),
    };

    // build template dynamically with options
    const template = document.createElement("template");
    template.innerHTML = templateString(options);

    // html template is rendered when cloned, let's attach it to the shadow DOM
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // bind event handlers
    this._shadowRoot
      .querySelector("#input")
      .addEventListener(
        "keyup",
        debounce(this.keyUp.bind(this), options.debounce),
      );
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

  keyUp(event) {
    // event.target.value is subject to re-targeting for shadow DOM elements
    // which helps with encapsulation. We need to get the correct target from
    // the path
    let substring = event.path[0].value;

    let suggestionBox = this._shadowRoot.querySelector("#suggestion");
    suggestionBox.innerHTML = "";

    if (!substring) {
      return [];
    }

    let results = this._trie.find(substring);

    let appendResult = result => {
      let div = document.createElement("div");
      div.tabIndex = 0;
      div.className += " result";
      let text = document.createTextNode(result);
      div.append(text);
      suggestionBox.append(div);
    };

    for (let i = 0; i < results.length; i++) {
      appendResult(results[i]);
    }
  }
}
