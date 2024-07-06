import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { loadModules } from 'esri-loader'

// Use forwardRef to allow the map component to be used as a ref for the parent component (ContributeSection)
const MapComponent = forwardRef(({formData, setFormData, onMapReady }, ref) => {
console.log('MapComponent rendered'); // Add this line
  const mapRef = useRef();
  const [view, setView] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Utility functions
  const fetchSurveyData = async featureServiceUrl => {
    const queryUrl = `${featureServiceUrl}/0/query?where=1%3D1&outFields=*&f=json`
    const response = await fetch(queryUrl)
    const data = await response.json()
    if (data && data.features) {
      return data.features
    } else {
      console.warn('No features found in the response:', data)
      return []
    }
  }

  const calculateCenter = features => {
    if (!features.length) return [0, 0]

    const total = features.length
    const sum = features.reduce(
      (acc, feature) => {
        acc[0] += feature.geometry.x
        acc[1] += feature.geometry.y
        return acc
      },
      [0, 0]
    )

    return [sum[0] / total, sum[1] / total]
  }

  // Function to trigger form data update - moved outside the click handler
  const updateFormDataWithPoint = () => {
    if (selectedPoint) {
      setFormData(prevData => ({
        ...prevData,
        locationName: `${selectedPoint.longitude}, ${selectedPoint.latitude}`
      }))
    }
  }

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const [Map, MapView, Graphic, FeatureLayer] = await loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/FeatureLayer'
          ],
          { css: true }
        )

        if (mapRef.current) {
          const map = new Map({
            basemap: 'streets-navigation-vector'
          });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-122.6765, 45.5231], // Portland center
          zoom: 13
        })

        const featureLayer = new FeatureLayer({
          url: featureServiceUrl
        })

        map.add(featureLayer)

        console.log('Map and View Initialized')

        view.on('click', event => {
          const point = {
            type: 'point',
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude,
            spatialReference: view.spatialReference // Use view's spatialReference
          }

          const symbol = {
            // Moved symbol definition outside the click handler
            type: 'simple-marker',
            color: 'red',
            size: '8px',
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          }

          const graphic = new Graphic({
            geometry: point,
            symbol: symbol
          })

          view.graphics.removeAll()
          view.graphics.add(graphic)

          setSelectedPoint(point) // Update selectedPoint state
        })
      } catch (err) {
        console.error(err)
      };
    };

    if (!view && mapRef.current) {
      initializeMap();
    }
  }, [setFormData, onMapReady, view]) // Only re-run if setFormData changes

  // Expose method to parent component via ref
  if (ref) {
    ref.current = {
      updateFormDataWithPoint: () => {
        if (selectedPoint) {
          setFormData(prevData => ({
            ...prevData,
            locationName: `${selectedPoint.longitude}, ${selectedPoint.latitude}`
          }));
        }
      }
    };
  }

  return (
    <div>
      <div style={{ height: '50vh' }} ref={mapRef}></div>
      <button onClick={() => updateFormDataWithPoint()}>
        Add Location to Form
      </button>
    </div>
  )
}

export default MapComponent
