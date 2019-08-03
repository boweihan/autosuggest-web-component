import "../main";
import words from "./words";

const autosuggest = document.createElement("bh-autosuggest");
autosuggest.options = {
  placeholder: "type here...",
  inputCss: `{
    border: 2px solid black;
    padding: 10px;
    font-size: 14px;
    box-shadow: 1px 2px 2px 1px;
    width: calc(100% - 20px);
    margin: 10px;
    margin-bottom: 0px;
  }`,
};

autosuggest.words = words;
document.body.appendChild(autosuggest);
