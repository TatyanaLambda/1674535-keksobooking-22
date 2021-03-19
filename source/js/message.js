import {isEscEvent} from './util.js'
export {showSuccessMessage, showErrorMessage};

const onSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessMessageWindowClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const onErrorEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const closeSuccessMessage = () => {
  const successContent = document.querySelector('.success');
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  window.removeEventListener('click', onSuccessMessageWindowClick);
  successContent.remove();
};

const closeErrorMessage = () => {
  const errorContent = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  document.removeEventListener('keydown', onErrorEscKeydown);
  window.removeEventListener('click', onErrorClick);
  errorButton.removeEventListener('click', onErrorClick);
  errorContent.remove();
};

const showSuccessMessage = () => {
  const main = document.querySelector('main');
  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.cloneNode(true);
  main.prepend(successMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  window.addEventListener('click', onSuccessMessageWindowClick);

};

const showErrorMessage = () => {
  const main = document.querySelector('main');
  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.cloneNode(true);
  main.prepend(errorMessage);
  const errorButton = document.querySelector('.error__button');
  document.addEventListener('keydown', onErrorEscKeydown);
  window.addEventListener('click', onErrorClick);
  errorButton.addEventListener('click', onErrorClick);
};
