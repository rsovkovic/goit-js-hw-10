import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//*--------------------------------------------------------------*/
const breedSelect = document.querySelector('.breed-select');
// breedSelect.id = 'sel';
const pLoader = document.querySelector('.loader');
const pError = document.querySelector('.error');
const infoCat = document.querySelector('.cat-info');
breedSelect.addEventListener('change', onSetOutput);
// pLoader.classList.remove('visibility');
breedSelect.classList.add('visibility');
pError.classList.add('visibility');
// infoCat.classList.add('visibility');
//*---------------------------------------------------------------/
fetchBreeds()
  .then(data => createMarkup(data))
  .catch(error => {
    pError.classList.remove('visibility'),
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => {
    // infoCat.classList.remove('visibility');
    pLoader.classList.add('visibility');
    breedSelect.classList.remove('visibility');
  });

function createMarkup(arr) {
  const markup = arr
    .map(({ name, id }) => `<option value=${id}>${name}</option>`)
    .join('');
  breedSelect.innerHTML = markup;
  new SlimSelect({
    select: breedSelect,
  });
}

function onSetOutput(evt) {
  infoCat.classList.add('visibility'),
    pError.classList.add('visibility'),
    pLoader.classList.remove('visibility');
  const breedId = evt.target.value;
  // console.log(breedId);
  fetchCatByBreed(breedId)
    .then(breed => {
      createInfoCat(breed), infoCat.classList.remove('visibility');
    })
    .catch(error => {
      infoCat.classList.add('visibility'),
        pError.classList.remove('visibility'),
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      pLoader.classList.add('visibility');
    });
}

function createInfoCat(breed) {
  console.log(breed);
  const markupInfo = `<div class="cat_box">
      <img class="cat_img" src="${breed[0].url}" alt="${breed[0].breeds[0].name}" />
      <div class="text_box">
        <p class="cat_name">${breed[0].breeds[0].name}</p>
        <p class="info_cat">${breed[0].breeds[0].description}</p>
        <p class="info_temp"><span class="tmp">Temperament:</span> ${breed[0].breeds[0].temperament}</p>
      </div>
    </div>`;
  infoCat.innerHTML = markupInfo;
}
