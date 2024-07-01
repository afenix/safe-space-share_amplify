import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const MapComponent = () => {
  const mapRef = useRef();
  const featureServiceUrl = 'https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/survey123_4ba2969c11d04355bd6122c1c5155439/FeatureServer';

   // Utility functions
  const fetchSurveyData = async (featureServiceUrl) => {
    const queryUrl = `${featureServiceUrl}/0/query?where=1%3D1&outFields=*&f=json`;
    const response = await fetch(queryUrl);
    const data = await response.json();
console.log('Fetched data:', data); // Log the fetched data
    if (data && data.features) {
      return data.features;
    } else {
      console.warn('No features found in the response:', data);
      return [];
    }
  };

  const calculateCenter = (features) => {
    if (!features.length) return [0, 0];

    const total = features.length;
    const sum = features.reduce((acc, feature) => {
      acc[0] += feature.geometry.x;
      acc[1] += feature.geometry.y;
      return acc;
    }, [0, 0]);

    return [sum[0] / total, sum[1] / total];
  };


  useEffect(() => {
    const initializeMap = async () => {
      try {
        const [Map, MapView, FeatureLayer] = await loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true });

        const map = new Map({
          basemap: 'streets-navigation-vector',
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          zoom: 13,
        });

        const featureLayer = new FeatureLayer({
          url: featureServiceUrl,
        });

        map.add(featureLayer);

        const features = await fetchSurveyData(featureServiceUrl);
        console.log('features: ' + features);
        const center = calculateCenter(features);

        view.center = center;
        view.zoom = 13;
      } catch (err) {
        console.error(err);
      }
    };

    initializeMap();
  }, [featureServiceUrl]);

  return <div style={{ height: '100vh' }} ref={mapRef}></div>;
};

export default MapComponent;