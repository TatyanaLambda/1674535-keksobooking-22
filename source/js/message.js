export {showSuccessMessage, showErrorMessage};
import {isEscEvent} from './util.js'

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

const onErrorMessageEscKeydown = (evt) => {
  if (isEscEvent) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorMessageWindowClick = (evt) => {
  evt.preventDefault();
  closeErrorMessage();
};

const onErrorButtonClick = (evt) => {
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
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  window.removeEventListener('click', onErrorMessageWindowClick);
  errorButton.removeEventListener('click', onErrorButtonClick);
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
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  window.addEventListener('click', onErrorMessageWindowClick);
  errorButton.addEventListener('click', onErrorButtonClick);
};
