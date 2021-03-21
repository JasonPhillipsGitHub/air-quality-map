mapboxgl.accessToken = 'pk.eyJ1IjoianA1NDg1IiwiYSI6ImNrM2Y3bTN5cDAxemEzaG5ubjM1NHpzdXIifQ.1ZnEtqoWaJQRTjp7E2GgGA';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/dark-v10', // style URL
  center: [-73.916949,40.682562], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

// add the mapbox geocoder control
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// wait for the initial mapbox style to load before loading our own data
map.on('style.load', function () {

    // add a geojson source for nyc community districts with population data
    map.addSource('nyc-cd', {
      type: 'geojson',
      data: 'data/health-data-4.geojson'
    });




// DOUBLE CHECK THE ORDER OF 195 (ascending or descending), may have to reorder colors




// Note: I was going to try to find a way to use a for loop or something to
//make this section of code more condensed, but doing it this way also allows
// me to easily see the chosen color palettes, which makes finding the right
// layer easier.


    // add OZONE choropleth layer to map
    // colors are from colorbrewer
    map.addLayer({
      'id': 'ozone-fill',
      'type': 'fill',
      'source': 'nyc-cd',
       'layout': {},
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'Ozone_R'],
          0,
          '#f1eef6',
          50,
          '#bdc9e1',
          100,
          '#74a9cf',
          150,
          '#2b8cbe',
          195,
          '#045a8d'
        ],
        'fill-outline-color': '#ccc',
        'fill-opacity': 0.8
      }
    }, 'waterway-label');

// add CHILD Hospitalizations due to ASTHMA to map
    map.addLayer({
      'id': 'child-hosp-asthma-fill',
      'type': 'fill',
      'source': 'nyc-cd',
       'layout': {},
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'H_ChdAst_R'],
          0,
          '#fef0d9',
          50,
          '#fdcc8a',
          100,
          '#fc8d59',
          150,
          '#e34a33',
          195,
          '#b30000'
        ],
        'fill-outline-color': '#ccc',
        'fill-opacity': 0.8
      }
    }, 'waterway-label');

    // add CHILD ASTHMA rates would are enrolled in Medicaid to map
        map.addLayer({
          'id': 'child-medicaid-asthma-fill',
          'type': 'fill',
          'source': 'nyc-cd',
           'layout': {},
          'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'M_ChdAst_R'],
              0,
              '#f2f0f7',
              50,
              '#cbc9e2',
              100,
              '#9e9ac8',
              150,
              '#756bb1',
              195,
              '#54278f'
            ],
            'fill-outline-color': '#ccc',
            'fill-opacity': 0.8
          }
        }, 'waterway-label');

        // add Black Carbon to map
            map.addLayer({
              'id': 'black-carbon-fill',
              'type': 'fill',
              'source': 'nyc-cd',
               'layout': {},
              'paint': {
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'BlkCarb_R'],
                  0,
                  '#f7f7f7',
                  50,
                  '#cccccc',
                  100,
                  '#969696',
                  150,
                  '#636363',
                  195,
                  '#252525'

                ],
                'fill-outline-color': '#ccc',
                'fill-opacity': 0.8
              }
            }, 'waterway-label');


          // add Fine Particulate Matter to map
            map.addLayer({
                  'id': 'pm-fill',
                  'type': 'fill',
                  'source': 'nyc-cd',
                  'layout': {},
                  'paint': {
                  'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'PM25_R'],
                              0,
                              '#feebe2',
                              50,
                              '#fbb4b9',
                              100,
                              '#f768a1',
                              150,
                              '#c51b8a',
                              195,
                              '#7a0177'

                    ],
                'fill-outline-color': '#ccc',
                  'fill-opacity': 0.8
                }
          }, 'waterway-label');

          // add CHILD ASTHMA rates would are enrolled in Medicaid to map
              map.addLayer({
                'id': 'no2-fill',
                'type': 'fill',
                'source': 'nyc-cd',
                 'layout': {},
                'paint': {
                  'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'NO_R'],
                    0,
                    '#f6eff7',
                    50,
                    '#bdc9e1',
                    100,
                    '#67a9cf',
                    150,
                    '#1c9099',
                    195,
                    '#016c59'

                  ],
                  'fill-outline-color': '#ccc',
                  'fill-opacity': 0.8
                }
              }, 'waterway-label');

              // add CHILD ASTHMA rates would are enrolled in Medicaid to map
                  map.addLayer({
                    'id': 'so2-fill',
                    'type': 'fill',
                    'source': 'nyc-cd',
                     'layout': {},
                    'paint': {
                      'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'Sul2Ox_R'],
                        0,
                        '#ffffd4',
                        50,
                        '#fed98e',
                        100,
                        '#fe9929',
                        150,
                        '#d95f0e',
                        195,
                        '#993404'
                      ],
                      'fill-outline-color': '#ccc',
                      'fill-opacity': 0.8
                    }
                  }, 'waterway-label');
    // add an empty data source, which we will use to highlight the geometry the user has selected
    map.addSource('highlight-feature', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    })

    // add a layer for the highlighted feature
    map.addLayer({
      id: 'highlight-line',
      type: 'line',
      source: 'highlight-feature',
      paint: {
        'line-width': 2,
        'line-opacity': 0.9,
        'line-color': 'orange',
      }
    });


    // listen for a click on the map and show info in the sidebar
    map.on('click', function(e) {
      // query for the features under the mouse, but only in our custom layer
      var features = map.queryRenderedFeatures(e.point, {
          layers: ['nyc-cd'],
      });

      if (features.length > 0 ) {
        // get the feature under the mouse pointer
        var hoveredFeature = features[0]

        // pull out the cd_name and pop2010 properties
        var cdName = hoveredFeature.properties.cd_name
        var population_2010 = hoveredFeature.properties.pop2010

        // inject these values into the sidebar
        $('.cdname').text(cdName)
        $('.population').text(`2010 Population: ${numeral(population_2010).format('0.00a')}`)

        // set this lot's polygon feature as the data for the highlight source
        map.getSource('highlight-feature').setData(hoveredFeature.geometry);
      }
    })

    // when the user hovers over our nyc-cd layer make the mouse cursor a pointer
    map.on('mouseenter', 'nyc-cd', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'nyc-cd', () => {
      map.getCanvas().style.cursor = ''
    })

    // add a click listener for buttons in the sidebar.  On click, fly the map to a specific view
    $('.fly-button').on('click', function() {
      // get the 'cd' from the data-cd
      var cd = $(this).data('cd').toString()


      if (cd === 'reset') {
        // fly to the initial center and zoom
        map.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM
        })

        // disable the reset button
        $('.reset-button').prop("disabled", true)

        // reset the info container to its default values and show it
        $('.cdname').text('Click a district for more information')
        $('.population').text('')
        $('.info-container').show()

        // show the choropleth layer
        map.setLayoutProperty('nyc-cd', 'visibility', 'visible')
      } else {

        // get the geometry for the specified district, set the hightlight source
        var geom = getGeometry(cd)
        map.getSource('highlight-feature').setData(geom);

        // enable the reset button
        $('.reset-button').removeAttr("disabled")
        // hide the info container
        $('.info-container').hide()

        // hide the chorpleth layer
        hideChoroplethLayer()


     }
   })
  })
