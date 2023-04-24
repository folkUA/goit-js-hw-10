import './css/styles.css';
import { fetchCountries } from './helpers/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('[id="search-box"]');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(evt) {
  const country = evt.target.value.trim();
  if (!country) {
    evt.target.value = '';
    return;
  }

  fetchCountries(country)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      markup(data);
    })
    .catch(() => {
      info.innerHTML = '';
      list.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}

function markup(data) {
  let mark = '';
  data.map(country => {
    mark += `<li class="flag"><img src="${country.flags.svg}" alt="${country.name.official}" width="50" height="25"><h2>${country.name.official}</h2></li>`;
  });
  list.innerHTML = mark;
  if (data.length > 1) {
    info.innerHTML = '';
  } else {
    info.innerHTML = `          
        <p><span>Capital:</span> ${data[0].capital}</p>
        <p><span>Population:</span> ${data[0].population}</p>
        <p><span>Languages:</span> ${Object.values(data[0].languages)}</p>`;
  }
}
