import { Autosuggest } from "./autosuggest";

if (!window.customElements.get("bh-autosuggest")) {
  window.customElements.define("bh-autosuggest", Autosuggest);
}
