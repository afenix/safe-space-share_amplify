import React, { useRef, useEffect, useState, forwardRef } from 'react'
import { loadModules } from 'esri-loader'

// Use forwardRef to allow the map component to be used as a ref for the parent component (ContributeSection)
const MapComponent = forwardRef(({formData, setFormData, onMapReady }, ref) => {
console.log('MapComponent rendered'); // Add this line
  const mapRef = useRef();
  const [view, setView] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const featureServiceUrl = 'https://services1.arcgis.com/IVzPgL57Mwzk8mu1/arcgis/rest/services/SafeSpaceShare/FeatureServer';

  // Utility functions (most likely to deprecate in the future)
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

  // Function to trigger form data update
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
        const [
          Map,
          MapView,
          Graphic,
          FeatureLayer,
          GraphicsLayer,
          PopupTemplate,
          Locate,
          Search,
          Expand
        ] = await loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/Graphic',
            'esri/layers/FeatureLayer',
            'esri/layers/GraphicsLayer',
            'esri/PopupTemplate',
            "esri/widgets/Locate",
            'esri/widgets/Search',
            'esri/widgets/Expand',
          ],
          { css: true }
        );

        if (mapRef.current) {
          const map = new Map({
            basemap: 'streets-navigation-vector'
          });

          const mapView = new MapView({
            container: mapRef.current,
            map: map,
            center: [-122.6765, 45.5231],
            zoom: 13
          });

          setView(mapView);

          const userLayer = new GraphicsLayer();
          map.add(userLayer);

          // Add a locate button to the view
          const locateBtn = new Locate({
            view: mapView
          });

          // Add the locate widget to the top left corner of the view (under the zoom buttons)
          mapView.ui.add(locateBtn, {
              position: "top-right"
          });


          // Create the search widget
          const searchWidget = new Search({
            view: mapView
          })

          // Initialize and add the Expand widget to toggle the visibility of the Search widget
          const searchExpand = new Expand({
            expandIcon: 'search', // // Use a search icon for the expand/collapse button. See https://developers.arcgis.com/calcite-design-system/icons/
            expandTooltip: 'Expand Search', // Custom tooltip text for the expand button
            view: mapView,
            content: searchWidget
          })

          mapView.ui.add(searchExpand, 'top-right')

          console.log('Map and View initialized successfully')

          // Notify the parent component when the map is ready
          if (onMapReady) {
            onMapReady(mapView); // Pass the MapView instance to the callback
          }

          // Create a custom style renderer for user location
          const locationRenderer = {
            type: 'simple',
            symbol: {
              type: 'picture-marker',
              url: `${process.env.PUBLIC_URL}/person_pin_circle_24dp_E16833.png`,
              width: '25px',
              height: '25px'
            }
          }

          // Create a PopupTemplate
          const popupTemplate = new PopupTemplate({
            title: 'Location Details',
            content: 'Latitude: {latitude}<br>Longitude: {longitude}'
          })

          const s3UserLocation = new FeatureLayer({
            url: featureServiceUrl,
            renderer: locationRenderer,
            // add fields the popup here
            outFields: ["experience_date", "happinessSadness", "calmAnxious", "awakeTired", "safety", "belonging"],
          })

          map.add(s3UserLocation)
          console.log('Feature layer added to the map')

          // Click event handler
          mapView.on('click', event => {
            console.log('Map clicked at:', event.mapPoint) // Log click event
            const point = {
              type: 'point',
              longitude: event.mapPoint.longitude,
              latitude: event.mapPoint.latitude,
              spatialReference: mapView.spatialReference // Use view's spatialReference
            }

            const symbol = {
              type: 'picture-marker',
              url: `${process.env.PUBLIC_URL}/diversity_2_24dp_E16833.png`,
              width: '45px',
              height: '45px'
            }

            const graphic = new Graphic({
              geometry: point,
              symbol: symbol
            })

            // Remove only the previously selected graphic, not all graphics
            const existingGraphic = mapView.graphics.find(
              g =>
                g.symbol.type === 'picture-marker' &&
                g.symbol.url.includes('diversity_2_24dp_E16833.png')
            );

            if (existingGraphic) {
              mapView.graphics.remove(existingGraphic)
            };

  // TODO: THIS IS NOT WORKING NEEDS TO BE FIXED
            // Attach the popupTemplate to the graphic
            graphic.popupTemplate = popupTemplate
            mapView.popup.open({
              features: [graphic],
              location: event.mapPoint
            });

            mapView.graphics.add(graphic)
            setSelectedPoint(point) // Update selectedPoint state

            // Update form data with selected point
            setFormData(prevData => ({
              ...prevData,
              locationName: `${point.longitude}, ${point.latitude}`
            }));
          });
        };
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
    <div
      ref={mapRef}
      className="map-container"
      style={{
        borderRadius: '10px',
        height: '50vh',
        width: '100vw',
        margin: '20px'
      }}
    ></div>
  )
});

export default MapComponent
