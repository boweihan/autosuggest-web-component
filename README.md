<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [autosuggest-web-component](#autosuggest-web-component)
  - [Installation](#installation)
  - [Import](#import)
  - [Example Usage](#example-usage)
  - [Configuration Options](#configuration-options)
  - [Disclaimer](#disclaimer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# autosuggest-web-component

![](autosuggest-web-component.gif)

## Installation

`npm install -- save autosuggest-web-component`

## Import

After installing the web component via package manager. Import it into your application.

`import "autosuggest-web-component"`

A polyfill (webcomponentjs) is applied along with the import.

## Example Usage

The base requirement to use this component is to create the element, pass in an array of (string) words that you wish to autosuggest against, and append the element to the DOM.

```
import "autosuggest-web-component";
import words from "./words";

const autosuggest = document.createElement("bh-autosuggest");
autosuggest.words = words;
document.body.appendChild(autosuggest);
```

## Configuration Options

Configuration can be passed in via the options property.

Default configuration options (can all be overridden):

```
autosuggest.options = {
  // input placeholder
  placeholder: "Type here...",

  // css template string for input field
  inputCss: `{
    border: 1px solid black;
    padding: 10px;
    font-size: 14px;
    box-shadow: 1px 1px 1px 1px;
    width: calc(100% - 20px);
    margin: 10px;
    margin-bottom: 0px;
  }`,

  // css template string for suggestion box
  suggestionCss: `{
    background-color: #f2f2f2;
    margin: 10px;
    margin-top: 0px;
  }`,

  // css template string for individual result
  resultCss: `{
    margin: 0;
    padding: 10px;
    overflow: hidden;
    border-bottom: 1px solid lightgray;
  }`,

  // debounce time in ms
  debounce: 0,
};
```

## Disclaimer

Client side autosuggestion is great for small data sets but might not be the best solution for larger data sets (i.e. entire language dictionaries).
