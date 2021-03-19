export {setDisabledPage, setActiveForm, defaultForm};

const defaultForm = {
  avatar: document.querySelector('#avatar-photo').src,
  title:  document.querySelector('#title').value,
  typeHousing: document.querySelector('#type').value,
  price: document.querySelector('#price').value,
  pricePlaceHolder: document.querySelector('#price').placeholder,
  timein: document.querySelector('#timein').value,
  timeout: document.querySelector('#timeout').value,
  roomNumber: document.querySelector('#room_number').value,
  capacity: document.querySelector('#capacity').value,
  description: document.querySelector('#description').value,
}

const setDisabledPage = () => {
  const form = document.querySelector('.ad-form');
  const filter = document.querySelector('.map__filters');
  form.classList.add('ad-form--disabled');
  filter.classList.add('map__filters--disabled');
  const activeFields = document.querySelectorAll('.ad-form fieldset, .map__filters select, .map__filters fieldset');
  activeFields.forEach(element => {
    element.disabled=true;
  });
};

const setActiveForm = (className) => {
  const form = document.querySelector(`.${className}`);
  form.classList.remove(`${className}--disabled`);
  const disabledFields = document.querySelectorAll(`.${className} fieldset[disabled], .${className} select[disabled]`);
  disabledFields.forEach(element => {
    element.disabled=false;
  });
};

setDisabledPage();
