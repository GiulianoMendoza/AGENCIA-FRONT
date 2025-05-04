import { sucursales, apiKey } from "../US/mapConfig.js";

let isGoogleMapsReady = false;
let mapInitQueue = [];

function initMap(sucursalId) {
  if (typeof google === "undefined" || typeof google.maps === "undefined") {
    console.error("Google Maps API todavia no se cargó");
    return;
  }

  const sucursal = sucursales.find(s =>
    s.nombre.replace(/\s/g, '').toLowerCase() === sucursalId.toLowerCase()
  );

  if (!sucursal) {
    console.warn(`Sucursal no encontrada para ID: ${sucursalId}`);
    return;
  }

  const mapElement = document.getElementById(sucursalId);
  if (!mapElement) {
    console.warn(`No se encontró el div para el ID: ${sucursalId}`);
    return;
  }

  const map = new google.maps.Map(mapElement, {
    zoom: 14,
    center: { lat: sucursal.lat, lng: sucursal.lng },
  });

  new google.maps.Marker({
    position: { lat: sucursal.lat, lng: sucursal.lng },
    map: map,
    title: sucursal.nombre,
  });
}

export function loadMap(sucursalId) {
  if (isGoogleMapsReady) {
    initMap(sucursalId);
    return;
  }

  if (!document.querySelector('#google-maps-script')) {
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&callback=onGoogleMapsLoaded`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  mapInitQueue.push(sucursalId);
}

window.onGoogleMapsLoaded = function () {
  isGoogleMapsReady = true;
  mapInitQueue.forEach(initMap);
  mapInitQueue = [];
};
