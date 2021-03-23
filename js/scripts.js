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
          '#045a8d',
          50,
          '#2b8cbe',
          100,
          '#74a9cf',
          150,
          '#bdc9e1',
          195,
          '#f1eef6'
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
          '#b30000',
          50,
          '#e34a33',
          100,
          '#fc8d59',
          150,
          '#fdcc8a',
          195,
          '#fef0d9'
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
              '#54278f',
              50,
              '#756bb1',
              100,
              '#9e9ac8',
              150,
              '#cbc9e2',
              195,
              '#f2f0f7'
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
                  '#252525',
                  50,
                  '#636363',
                  100,
                  '#969696',
                  150,
                  '#cccccc',
                  195,
                  '#f7f7f7'

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
                              '#7a0177',
                              50,
                              '#c51b8a',
                              100,
                              '#f768a1',
                              150,
                              '#fbb4b9',
                              195,
                              '#feebe2'

                    ],
                'fill-outline-color': '#ccc',
                  'fill-opacity': 0.8
                }
          }, 'waterway-label');

          // add Nitrogen Dioxide map
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
                    '#016c59',
                    50,
                    '#1c9099',
                    100,
                    '#67a9cf',
                    150,
                    '#bdc9e1',
                    195,
                    '#f6eff7'

                  ],
                  'fill-outline-color': '#ccc',
                  'fill-opacity': 0.8
                }
              }, 'waterway-label');

              // add Sulfur Dioxide to map
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
                        '#993404',
                        50,
                        '#d95f0e',
                        100,
                        '#fe9929',
                        150,
                        '#fed98e',
                        195,
                        '#ffffd4'
                      ],
                      'fill-outline-color': '#ccc',
                      'fill-opacity': 0.8
                    }
                  }, 'waterway-label');

                  // add Deaths to map
                      map.addLayer({
                        'id': 'death-fill',
                        'type': 'fill',
                        'source': 'nyc-cd',
                         'layout': {},
                        'paint': {
                          'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'PreMor_Ran'],
                            0,
                            '#a50f15',
                            50,
                            '#de2d26',
                            100,
                            '#fb6a4a',
                            150,
                            '#fcae91',
                            195,
                            '#fee5d9'
                          ],
                          'fill-outline-color': '#ccc',
                          'fill-opacity': 0.8
                        }
                      }, 'waterway-label');




                  // Create a popup, but don't add it to the map yet.
                  var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                  });


// Add in all the button click actions, hiding all other layers except for the one that's clicked
                  $('#ozo').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                    map.setLayoutProperty('ozone-fill', 'visibility', 'visible');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');


           // Pop up code for the Ozone. Have to nest inside this click function so that
           // the pop-up content will change as the user clicks through the different layers
                                       map.on('mousemove', function (e) {

                                         var features = map.queryRenderedFeatures(e.point, {
                                             layers: ['ozone-fill'],
                                         });

                                         if (features.length > 0) {
                                           // show the popup
                                           // Populate the popup and set its coordinates
                                           // based on the feature found.

                                           var hoveredFeature = features[0]
                                           var nta_name = hoveredFeature.properties.NTA_Name
                                           var pollutantDescription = hoveredFeature.properties.Ozone
                                           var ranking = hoveredFeature.properties.Ozone_R


                                           var popupContent = `
                                             <div >
                                                   <b>Ozone Pollution</b> </br>
                                                   <b>Neighborhood Name</b>: ${nta_name}<br/>
                                                   <b>Amount </b>: ${pollutantDescription} ppb <br/>
                                                   <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                                             </div>
                                           `

                                           popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                                           // set this lot's polygon feature as the data for the highlight source
                                           map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                                           // show the cursor as a pointer
                                           map.getCanvas().style.cursor = 'pointer';
                                         } else {
                                           // remove the Popup
                                           popup.remove();

                                           map.getCanvas().style.cursor = '';
                                         }

                                       });




                  });

                  $('#so2').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                     map.setLayoutProperty('so2-fill', 'visibility', 'visible');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['so2-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.SulDiOx
                         var ranking = hoveredFeature.properties.Sul2Ox_R


                         var popupContent = `
                           <div >
                                 <b>Sulfur Dioxide Pollution</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Amount </b>: ${pollutantDescription} ppb <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });

                  $('#blkcarb').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'visible');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['black-carbon-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.BlkCarbon
                         var ranking = hoveredFeature.properties.BlkCarb_R


                         var popupContent = `
                           <div >
                                 <b>Black Carbon Pollution</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Amount </b>: ${pollutantDescription} annual average (absorbance units) <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });

                  $('#pm').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                     map.setLayoutProperty('pm-fill', 'visibility', 'visible');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['pm-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.PM25
                         var ranking = hoveredFeature.properties.PM25_R


                         var popupContent = `
                           <div >
                                 <b>Fine Particulate Matter Pollution</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Amount </b>: ${pollutantDescription} annual average (micrograms per cubic meter)
<br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });


                  $('#no2').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                     map.setLayoutProperty('no2-fill', 'visibility', 'visible');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['no2-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.NitDiOx
                         var ranking = hoveredFeature.properties.N2O_R


                         var popupContent = `
                           <div >
                                 <b>Nitrogen Dioxide Pollution</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Amount </b>: ${pollutantDescription} ppb <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });

                  $('#asthma-rates').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'visible');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['child-medicaid-asthma-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.M_ChdAst
                         var ranking = hoveredFeature.properties.M_ChdAst_R


                         var popupContent = `
                           <div >
                                 <b>Child Asthma Rates</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Rate </b>: ${pollutantDescription} per 100,000 children ages 2-17 continuously enrolled
                                 (for 11 months or more) in Medicaid in 2015
 <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });

                  $('#asthma-hosp').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'visible');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('death-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['child-hosp-asthma-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.H_ChdAst
                         var ranking = hoveredFeature.properties.H_ChdAst_R


                         var popupContent = `
                           <div >
                                 <b>Child Asthma-Related Hospitalizations</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Rate </b>: ${pollutantDescription} asthma hospitalizations
                                 per 10,000 children ages 5-14  <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });

                  $('#death').on('click', function(){
                    // hide the restaurant-fill-layer on demand
                    map.setLayoutProperty('death-fill', 'visibility', 'visible');
                     map.setLayoutProperty('no2-fill', 'visibility', 'none');
                     map.setLayoutProperty('so2-fill', 'visibility', 'none');
                     map.setLayoutProperty('ozone-fill', 'visibility', 'none');
                     map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
                     map.setLayoutProperty('pm-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
                     map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
                     map.on('mousemove', function (e) {


                       var features = map.queryRenderedFeatures(e.point, {
                           layers: ['death-fill'],
                       });

                       if (features.length > 0) {
                         // show the popup
                         // Populate the popup and set its coordinates
                         // based on the feature found.

                         var hoveredFeature = features[0]
                         var nta_name = hoveredFeature.properties.NTA_Name
                         var pollutantDescription = hoveredFeature.properties.PreMortal
                         var ranking = hoveredFeature.properties.PreMor_Ran


                         var popupContent = `
                           <div >
                                 <b>Premature Deaths</b> </br>
                                 <b>Neighborhood Name</b>: ${nta_name}<br/>
                                 <b>Rate </b>: ${pollutantDescription} deaths before the age of 65
                                 per 100,000 population under 65 years of age)  <br/>
                                 <b>Neighborhood Ranking</b>: ${ranking} out of 195<br/>


                           </div>
                         `

                         popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

                         // set this lot's polygon feature as the data for the highlight source
                         map.getSource('highlight-feature').setData(hoveredFeature.geometry);

                         // show the cursor as a pointer
                         map.getCanvas().style.cursor = 'pointer';
                       } else {
                         // remove the Popup
                         popup.remove();

                         map.getCanvas().style.cursor = '';
                       }

                     });

                  });











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
