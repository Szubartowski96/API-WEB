import { countries } from './constants';

const input = document.querySelector('.input-section_input');
const submitBtn = document.querySelector('.input-section_btn-submit');
const capital = document.querySelector('#capital');
const currencies = document.querySelector('#currencies');
const populationCount = document.querySelector('#population');
const flag = document.querySelector('.flag');
const languages = document.querySelector('#languages');
const map = document.querySelector('.mapBtn');
let countryNames = [];

countryNames = countries.map(({ name }) => {
  return name;
});

const onInputChange = () => {
  removeAutocompleteDropdown();
  const value = input.value.toLowerCase();
  if (value.length === 0) return;
  const filteredNames = countryNames.filter((countryName) => {
    return countryName.toLowerCase().startsWith(value);
  });
  createAutocompleteDropdown(filteredNames);
};

function createAutocompleteDropdown(list) {
  const listEl = document.createElement('ul');
  listEl.className = 'input-section_autocomplete-list';
  listEl.id = 'input-section_autocomplete-list';

  list.forEach((country) => {
    const listItem = document.createElement('li');
    const countryButton = document.createElement('button');
    countryButton.innerText = country;
    countryButton.addEventListener('click', onCountryButtonClick);
    listItem.appendChild(countryButton);
    listEl.appendChild(listItem);
  });

  document.querySelector('#input-section').appendChild(listEl);
}

const removeAutocompleteDropdown = () => {
  const listEl = document.querySelector('#input-section_autocomplete-list');
  if (listEl) listEl.remove();
};

const onCountryButtonClick = (e) => {
  const buttonEl = e.target;
  input.value = buttonEl.innerHTML;
  removeAutocompleteDropdown();
  getInfo();
};

const getInfo = async () => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${input.value}`
    );
    const data = await response.json();

    const {
      population: num,
      flags: { png: flagImg },
    } = data[0];

    const populationInMln = (num / 1000000).toFixed(2);
    const currency = Object.values(data[0].currencies);
    const languagesInfo = Object.values(data[0].languages).slice(0, 3);
    const maps = data[0].maps.googleMaps;

    capital.innerText = data[0].capital;
    currencies.innerText = currency[0].name;
    populationCount.innerText = `${populationInMln} mln`;
    languages.innerText = languagesInfo.join(', ');
    flag.style.display = 'block';
    flag.setAttribute('src', flagImg);
    map.setAttribute('href', maps);
  } catch (error) {
    console.error('Error while downloading data:', error);
  }
};

input.addEventListener('input', onInputChange);
let isErrorMessageDisplayed = false;

const onSubmitClick = (event) => {
  event.preventDefault();
  removeAutocompleteDropdown();
  const inputValue = input.value.trim();

  if (inputValue.length === 0 && !isErrorMessageDisplayed) {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = 'Enter the name of the country';
    errorMessage.classList.add('error-message');

    input.parentElement.appendChild(errorMessage);
    isErrorMessageDisplayed = true;

    setTimeout(() => {
      errorMessage.remove();
      isErrorMessageDisplayed = false;
      console.log('Error message removed');
    }, 5000);

    return;
  } else if (input.value !== countries.value && !isErrorMessageDisplayed) {
    const wrongCountry = document.createElement('p');
    wrongCountry.innerText = 'Incorrect country name';
    wrongCountry.classList.add('error-message');

    input.parentElement.appendChild(wrongCountry);
    isErrorMessageDisplayed = true;

    setTimeout(() => {
      wrongCountry.remove();
      isErrorMessageDisplayed = false;
      console.log('Wrong country message removed');
    }, 5000);

    return;
  }

  const previousErrorMessage = document.querySelector('.error-message');
  if (previousErrorMessage) {
    previousErrorMessage.remove();
  }

  input.value = inputValue;
  getInfo();
};

submitBtn.addEventListener('click', onSubmitClick);
document.body.addEventListener('click', (event) => {
  input.value = '';
  removeAutocompleteDropdown();
});
