import "../main";
import words from "./words";

const autosuggest = document.createElement("bh-autosuggest");
autosuggest.options = {
  placeholder: "type here...",
};
autosuggest.words = words;
document.body.appendChild(autosuggest);
