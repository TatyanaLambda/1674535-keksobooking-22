/* global L:readonly */
import {createCard} from './card.js';
import {setActiveForm} from './settings.js';
import {filter} from './filter.js';
export {createPoints, resetMap, updatePoints};

const CENTER_LATITUDE = 35.68170;
const CENTER_LONGITUDE = 139.75388;
const SCALE = 13;
const MAP = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPY_WRITE = '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const MAIN_TITLE = 'Моё объявление';

const mainIconParameters = {
  width: 52,
  heigth: 52,
  url: 'img/main-pin.svg',
}

const iconParameters = {
  width: 40,
  heigth: 40,
  url: 'img/pin.svg',
}

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${CENTER_LATITUDE}, ${CENTER_LONGITUDE}`;
    setActiveForm('ad-form');
  })
  .setView({
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  }, SCALE);

L.tileLayer(MAP, {attribution: COPY_WRITE}).addTo(map);

const mainIcon = L.icon({
  iconUrl: mainIconParameters.url,
  iconSize: [mainIconParameters.width, mainIconParameters.heigth],
  iconAnchor: [mainIconParameters.width/2, mainIconParameters.heigth],
});

const icon = L.icon({
  iconUrl: iconParameters.url,
  iconSize: [iconParameters.width, iconParameters.heigth],
  iconAnchor: [iconParameters.width/2, iconParameters.heigth],
});

const mainMarker = L.marker(
  {
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map)
  .bindPopup(MAIN_TITLE,
    {
      keepInView: true,
    })
  .on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

const markers = L.layerGroup().addTo(map);
const createPoints = (points) => {
  points.forEach((point) => {
    const marker = L.marker(
      {
        lat: point.location.lat,
        lng: point.location.lng,
      },
      {
        icon,
      },
    );

    const title = createCard(point);
    marker.addTo(markers)
      .bindPopup(title,
        {
          keepInView: true,
        });
  });
};

const resetMap = () =>{
  mainMarker.setLatLng([CENTER_LATITUDE,CENTER_LONGITUDE]).update();
  address.value = `${CENTER_LATITUDE}, ${CENTER_LONGITUDE}`;
  map.setView({
    lat: CENTER_LATITUDE,
    lng: CENTER_LONGITUDE,
  }, SCALE);
}

const resetMarkers = () => {
  markers.clearLayers();
}

const updatePoints = (points) => {
  resetMarkers();
  const filteredPoints = filter(points);
  createPoints(filteredPoints);
};
