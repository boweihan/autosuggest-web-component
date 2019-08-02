import "./main";
import { Autosuggest } from "./component/autosuggest";

describe("ui-elements integration tests", () => {
  describe("bh-autosuggest", () => {
    it(`should be defined`, () => {
      const autosuggestClass = window.customElements.get("bh-autosuggest");
      expect(autosuggestClass).toBe(Autosuggest);
    });
  });
});
