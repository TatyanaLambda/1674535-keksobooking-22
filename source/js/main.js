/* global _:readonly */
import './form.js';
import './settings.js';
import './photo.js';
import {createPoints, resetMap, updatePoints} from './map.js';
import {getData} from './api.js';
import {resetForm, setUserFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {setFilter} from './filter.js';
import {setActiveForm} from './settings.js';
export {POINTS_COUNT};
const POINTS_COUNT = 10;
const RERENDER_DELAY = 500;

getData((points) => {
  createPoints(points.slice(0, POINTS_COUNT));
  setActiveForm('map__filters');
  setFilter(_.debounce(() => updatePoints(points), RERENDER_DELAY));
});

const successHandler = () => {
  showSuccessMessage();
  resetMap();
  resetForm();
}

setUserFormSubmit(successHandler, showErrorMessage);
