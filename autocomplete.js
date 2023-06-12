import { countries } from "./constants";

const countriesStrings = countries.map(({ name }) => name);

const config = {
  placeHolder: "Search for country...",
  data: {
    src: countriesStrings,
  },
  resultItem: {
    highlight: true,
  },
};



const autoCompleteJS = new autoComplete(config);