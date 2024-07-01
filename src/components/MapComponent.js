import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const MapComponent = () => {
  const mapRef = useRef();

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
      .then(([Map, MapView, FeatureLayer]) => {
        const map = new Map({
          basemap: 'streets-navigation-vector'
        });

        // Create a new view
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118.80500, 34.02700],
          zoom: 13
        });

        // Add the feature layer
        const featureLayer = new FeatureLayer({
          url: 'https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/survey123_4ba2969c11d04355bd6122c1c5155439/FeatureServer',
        });

        map.add(featureLayer);

      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return <div style={{ height: '100vh' }} ref={mapRef}></div>;
};

export default MapComponent;
