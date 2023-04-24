const BASE_URL = 'https://restcountries.com/v3.1';
const END_POINT = '/name';

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${END_POINT}/${name}?fields=capital,population,languages,flags,name`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}
