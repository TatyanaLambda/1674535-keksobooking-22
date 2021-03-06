export {setFilter, resetFilter, getFilteredPoints};
import {POINTS_COUNT} from './main.js';

const DEFAULT_SELECT_FILTER = 'any';

const priceRange = {
  low: 10000,
  middle: 50000,
}

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__features');

const getFilteredPoints = (points) => {

  let filteredPoints = points.slice();

  if (housingType.value !== DEFAULT_SELECT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.type === housingType.value);
  }

  if (housingPrice.value !== DEFAULT_SELECT_FILTER) {
    switch (housingPrice.value){
      case 'low':
        filteredPoints = filteredPoints.filter((point) => point.offer.price < priceRange.low);
        break;
      case 'middle':
        filteredPoints = filteredPoints.filter((point) => point.offer.price >= priceRange.low && point.offer.price <= priceRange.middle);
        break;
      case 'high':
        filteredPoints = filteredPoints.filter((point) => point.offer.price > priceRange.middle);
        break;
      default:
        break;
    }
  }

  if (housingRooms.value !== DEFAULT_SELECT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.rooms.toString() === housingRooms.value);
  }

  if (housingGuests.value !== DEFAULT_SELECT_FILTER) {
    filteredPoints = filteredPoints.filter((point) => point.offer.guests.toString() === housingGuests.value);
  }

  const checkedFeatures = document.querySelectorAll('.map__features input:checked');
  checkedFeatures.forEach(element => {
    filteredPoints = filteredPoints.filter((point) => point.offer.features.indexOf(element.value) !== -1);
  });

  return filteredPoints.slice(0, POINTS_COUNT);
};

const setFilter = (cb) => {
  mapFilters.forEach(element => {
    element.addEventListener('change', () => cb());
  });
  mapFeatures.forEach(element => {
    element.addEventListener('change', () => cb());
  });
};

const resetFilter = () => {
  const event = new Event('change');
  const checkedFeatures = document.querySelectorAll('.map__features input:checked');

  mapFilters.forEach(element => {
    element.value = DEFAULT_SELECT_FILTER;
    element.dispatchEvent(event);
  });
  
  checkedFeatures.forEach(element => {
    element.checked = false;
    element.dispatchEvent(event);
  });
};
