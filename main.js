import { countries } from './constants';

const input = document.querySelector('.input-section_input');
const submitBtn = document.querySelector('.input-section_btn-submit');
const capital = document.querySelector('#capital');
const currencies = document.querySelector('#currencies');
const populationCount = document.querySelector('#population');
const flag = document.querySelector('.flag');
const languages = document.querySelector('#languages');
const map = document.querySelector('.mapBtn');
const countryListElement = document.querySelector('#countryList');

const countryNames = countries.map(({ name }) => {
  return name;
});

// const onInputChange = () => {
//   // removeAutocompleteDropdown();
//   const value = input.value.toLowerCase();

//   if (value.length === 0) return;

//   const filteredNames = [];

//   countryNames.forEach(countryName => {
//     if (countryName.substring(0, value.length).toLowerCase() === value)
//       filteredNames.push(countryName);
//   });
//   createAutocompleteDropdown(filteredNames);
// };

// function createAutocompleteDropdown(list) {
// const listEl = document.createElement("ul");
// listEl.className = "input-section_autocomplete-list";
// listEl.id = "input-section_autocomplete-list";

countryNames.forEach(country => {
  const optionElement = document.createElement('option');
  optionElement.value = country;
  countryListElement.appendChild(optionElement);
  // const countryButton = document.createElement("button");
  // countryButton.innerHTML = country;
  // countryButton.addEventListener("click", onCountryButtonClick);
  // listItem.appendChild(countryButton);
  // listEl.appendChild(listItem);
});

// document.querySelector("#input-section").appendChild(listEl);
// }

// createAutocompleteDropdown(countryNames);

// const removeAutocompleteDropdown = () => {
//   const listEl = document.querySelector("#input-section_autocomplete-list");
//   if (listEl) listEl.remove();
// };

// const onCountryButtonClick = e => {
//   const buttonEl = e.target;
//   input.value = buttonEl.innerHTML;

//   removeAutocompleteDropdown();
//   getInfo();
// };

const getInfo = () => {
  {
    fetch(`https://restcountries.com/v3.1/name/${input.value}`)
      .then(res => res.json())
      .then(data => {
        const { population: num } = data[0];
        const populationInMln = (num / 1000000).toFixed(2);
        const currency = Object.values(data[0].currencies);
        const flagImg = data[0].flags.png;
        const languagesInfo = Object.values(data[0].languages);
        const maps = data[0].maps.googleMaps;

        capital.innerText = data[0].capital;
        currencies.innerText = currency[0].name;
        populationCount.innerText = `${populationInMln} mln`;
        languages.innerText = `${languagesInfo}`;
        flag.style.display = 'block';
        flag.setAttribute('src', flagImg);
        map.setAttribute('href', maps);
      });
  }
};

// input.addEventListener("input", onInputChange);

const onSubmitClick = event => {
  event.preventDefault();
  // removeAutocompleteDropdown();
  const inputValue = input.value.trim();

  if (inputValue.length === 0) return;

  input.value = inputValue;
  getInfo();
};

submitBtn.addEventListener('click', onSubmitClick);
