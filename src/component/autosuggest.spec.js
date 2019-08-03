import { Autosuggest } from "./autosuggest";
import words from "../demo/words";

window.customElements.define("bh-autosuggest", Autosuggest);

describe("Autosuggest", () => {
  let element, shadowRoot;
  beforeEach(() => {
    element = document.createElement("bh-autosuggest");
    element.options = {
      placeholder: "type here...",
    };
    element.words = words;
    shadowRoot = element.shadowRoot;
    document.body.append(element);
  });

  describe("init", () => {
    it("should add a div with #input and #suggestion under the shadow root", () => {
      expect(shadowRoot.querySelector("#input")).toBeTruthy();
      expect(shadowRoot.querySelector("#suggestion")).toBeTruthy();
    });

    it("should have a default placeholder", () => {
      expect(shadowRoot.querySelector("#input").placeholder).toEqual(
        "type here...",
      );
    });

    it("should not have any default suggestions", () => {
      expect(shadowRoot.querySelector("#suggestion").children.length).toEqual(
        0,
      );
    });
  });

  describe("keyup", () => {
    it("should display the correct number of results based on the words", () => {
      let event = {
        path: [{ value: "help" }],
      };

      element.keyUp(event);
      expect(shadowRoot.querySelector("#suggestion").children.length).toEqual(
        1,
      );
      expect(
        shadowRoot.querySelector("#suggestion").children[0].innerHTML,
      ).toEqual("help");
    });

    it("should display the correct number of results based on the words", () => {
      let event = {
        path: [{ value: "h" }],
      };

      element.keyUp(event);
      expect(shadowRoot.querySelector("#suggestion").children.length).toEqual(
        10,
      );
      expect(
        shadowRoot.querySelector("#suggestion").children[0].innerHTML,
      ).toEqual("here");
      expect(
        shadowRoot.querySelector("#suggestion").children[9].innerHTML,
      ).toEqual("him");
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
