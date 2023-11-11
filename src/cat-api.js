console.log('hello');
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_cVsxnhTHYpiEcMczLuKjO9EOhjE7YmXFJX7PiNXXFXaZc80Z8JsvjBnqwcqvbFz0';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
  // .catch(console.error);
}
console.log(fetchBreeds());

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
  // .catch(console.error);
}
