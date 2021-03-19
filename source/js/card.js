export {createCard};

const offerTypeLabels = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const roomCountLabels = new Map([
  [0, 'комнат'],
  [1, 'комната'],
  [2, 'комнаты'],
  [3, 'комнаты'],
  [4, 'комнаты'],
  [5, 'комнат'],
  [6, 'комнат'],
  [7, 'комнат'],
  [8, 'комнат'],
  [9, 'комнат'],
]);

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCardFragment = document.createDocumentFragment()

const fillSimpleField = (field, element, textContent) => {
  (field === undefined) ? element.classList.add('hidden') : element.textContent = textContent;
};

const fillCapacity = (roomsCount, guestsCount, element) => {
  if (roomsCount !== undefined && guestsCount !== undefined) {
    element.textContent = `${roomsCount} ${roomCountLabels.get(roomsCount%10)}  для ${guestsCount} ${guestsCount===1?'гостя':'гостей'}`;
  } else if (roomsCount !== undefined && guestsCount === undefined) {
    element.textContent = `${roomsCount} ${roomCountLabels.get(roomsCount%10)}`
  } else if (roomsCount === undefined && guestsCount !== undefined){
    element.textContent = `${guestsCount} ${guestsCount===1?'гостя':'гостей'}`;
  } else {
    element.classList.add('hidden');
  }
};

const fillTime = (checkinTime, checkoutTime, element) => {
  if (checkinTime !== undefined && checkoutTime !== undefined) {
    element.textContent = `Заезд после ${checkinTime}, выезд до ${checkoutTime}`;
  } else if (checkinTime !== undefined && checkoutTime === undefined) {
    element.textContent = `Заезд после ${checkinTime}`;
  } else if (checkinTime === undefined && checkoutTime !== undefined){
    element.textContent = `Выезд до ${checkoutTime}`;
  } else {
    element.classList.add('hidden');
  }
};

const fillFeatures = (element, array) => {
  if (array === undefined || array.length === 0){
    element.classList.add('hidden');
  } else {
    element.innerHTML = '';
    array.forEach((elem) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + elem);
      element.appendChild(featureItem);
    });
  }
};

const fillPhotos = (element, array) => {
  const imgTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
  if (array === undefined || array.length === 0){
    element.classList.add('hidden');
  } else {
    element.innerHTML = '';
    array.forEach((item) => {
      const addPhoto = imgTemplate.cloneNode(true);
      addPhoto.src = item;
      
      element.appendChild(addPhoto);
    });
  }
};

const fillAvatar = (field, element, imagePath) => {
  (field === undefined) ? element.classList.add('hidden') : element.src = imagePath;
};

const createCard = (nearestPlace) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  fillSimpleField (nearestPlace.offer.title, cardElement.querySelector('.popup__title'), nearestPlace.offer.title);
  fillSimpleField (nearestPlace.offer.address, cardElement.querySelector('.popup__text--address'), nearestPlace.offer.address);
  fillSimpleField (nearestPlace.offer.price, cardElement.querySelector('.popup__text--price'), `${nearestPlace.offer.price} ₽/ночь`);
  fillSimpleField (nearestPlace.offer.type, cardElement.querySelector('.popup__type'), offerTypeLabels[nearestPlace.offer.type]);
  fillSimpleField (nearestPlace.offer.description, cardElement.querySelector('.popup__description'), nearestPlace.description);
  fillCapacity(nearestPlace.offer.rooms, nearestPlace.offer.guests, cardElement.querySelector('.popup__text--capacity'));
  fillTime(nearestPlace.offer.checkin, nearestPlace.offer.checkout, cardElement.querySelector('.popup__text--time'));
  fillFeatures(cardElement.querySelector('.popup__features'), nearestPlace.offer.features);
  fillPhotos(cardElement.querySelector('.popup__photos'), nearestPlace.offer.photos);
  fillAvatar (nearestPlace.author.avatar, cardElement.querySelector('.popup__avatar'), nearestPlace.author.avatar);
  return similarCardFragment.appendChild(cardElement);
};

