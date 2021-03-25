mapboxgl.accessToken = 'pk.eyJ1IjoianA1NDg1IiwiYSI6ImNrM2Y3bTN5cDAxemEzaG5ubjM1NHpzdXIifQ.1ZnEtqoWaJQRTjp7E2GgGA';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/dark-v10', // style URL
  center: [-73.980760, 40.716794], // starting position [lng, lat]
  zoom: 10 // starting zoom
});

// add the mapbox geocoder control
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

// colorsets for legendbar
var ozonecolors = ['#f1eef6','#bdc9e1','#74a9cf','#2b8cbe','#045a8d'];
var childhospcolors = ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000'];
var childasthmacolors = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];
var blackcarboncolors = ['#f7f7f7','#cccccc','#969696','#636363','#252525'];
var pmcolors = ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'];
var no2colors = ['#f6eff7','#bdc9e1','#67a9cf','#1c9099','#016c59'];
var so2colors = ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'];
var deathcolors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];

// pollutant descriptions to inject into sidebar
var ozonedescription = [
  'Ozone is a gas made up of oxygen that can be good or bad depending on where in the atmosphere it is. Ground level ozone is created when pollutants emitted by cars, power plants, and other sources chemically react in the presence of sunlight. Breathing elevated concentrations of ozone can cause chest pain, coughing, throat irritation, and airway inflammation. It can worsen bronchitis, emphysema, and asthma. Safe amounts of ozone are between 0 - 50 parts per billion (ppb)'];
var so2description = [
  'Sulfur dioxide gets emitted via the burning of fossil fuels and can contribute to respiratory illness by making breathing more difficult, especially for children, the elderly, and those with pre-existing conditions. Longer exposures can aggravate existing heart and lung conditions, as well. It also produces smog and acid rain, effecting plants, animals, and sensitive ecosystems. Safe amounts of SO2 are between 0 - 75 parts per billion (ppb)'];
var no2description = [
  'NO2 can irritate airways in the human respiratory system. Such exposures over short periods can cause difficulty breathing. Longer exposures to elevated concentrations of NO2 may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO2. Safe amounts of NO2 are between 0 - 53 parts per billion (ppb)'];
var pmdescription = [
  'Particulate matter is a mixture of solid particles and liquid droplets found in the air. Some particles are larger (dust, dirt, soot, or smoke) and others are microscopic. Particles less than 2.5 micrometers in diameter, also known as fine particles or PM2.5, pose the greatest risk to health as they can get deep into your lungs or bloodstream, causing irregular breathing and heart complications, sometimes resulting in premature death. Safe amounts of PM25 are between 0 - 12 micrograms per cubic meter'
];
var blackcarbondescription = [
  'Black carbon is the sooty black material emitted from gas and diesel engines, coal-fired power plants, and other sources that burn fossil fuel. Inhalation of black carbon is associated with health problems including respiratory and cardiovascular disease, cancer, and even birth defects.'
];
var childhospdescription = [
  'Asthma is a common health impact of long-term exposure to air pollutants. Asthma-related hospitalizations are also more likely to increase with prolonged exposure, particularly for vulnerable populations such as the elderly and young children.'
];
var childasthmadescription = [
  'Asthma is a common health impact of long-term exposure to air pollutants, particularly for children. Often times, air quality is correlated with low income neighborhoods, leaving children in underserved communities most at risk for respiratory illnesses.'
];
var deathdescription = [
  'Premature mortality (deaths before the age of 65 per 100,000 population under 65 years of age) is a possible result of long-term exposure to air pollutants. While all of the deaths are not solely attributed to air quality, it is important to notice the trending areas of the city that seem to have the most negative health impacts and the worst air quality.'
];


// wait for the initial mapbox style to load before loading our own data
map.on('style.load', function() {

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


  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });


  // Add in all the button click actions, hiding all other layers except for the one that's clicked,
  // changing the popup popupContent
  // and changing the Legend Bar colors
  $('#ozo').on('click', function() {

    map.setLayoutProperty('ozone-fill', 'visibility', 'visible');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': ozonecolors[4] });
    $('#legendbar2').css({'background-color': ozonecolors[3] });
    $('#legendbar3').css({'background-color': ozonecolors[2] });
    $('#legendbar4').css({'background-color': ozonecolors[1] });
    $('#legendbar5').css({'background-color': ozonecolors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Ozone');
    // Inject description into the sidebar
    $('#infofill').text(ozonedescription);

    // Pop up code for the Ozone. Have to nest inside this click function so that
    // the pop-up content will change as the user clicks through the different layers
    map.on('mousemove', function(e) {

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
                                                   <h5>Ozone Pollution</h5> </br>
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


  $('#so2').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('so2-fill', 'visibility', 'visible');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': so2colors[4] });
    $('#legendbar2').css({'background-color': so2colors[3] });
    $('#legendbar3').css({'background-color': so2colors[2] });
    $('#legendbar4').css({'background-color': so2colors[1] });
    $('#legendbar5').css({'background-color': so2colors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Sulfur Dioxide');
    // Inject description into the sidebar
    $('#infofill').text(so2description);

    map.on('mousemove', function(e) {


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
                                 <h5>Sulfur Dioxide Pollution</h5> </br>
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

  $('#blkcarb').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'visible');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': blackcarboncolors[4] });
    $('#legendbar2').css({'background-color': blackcarboncolors[3] });
    $('#legendbar3').css({'background-color': blackcarboncolors[2] });
    $('#legendbar4').css({'background-color': blackcarboncolors[1] });
    $('#legendbar5').css({'background-color': blackcarboncolors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Black Carbon');
    // Inject description into the sidebar
    $('#infofill').text(blackcarbondescription);
    map.on('mousemove', function(e) {


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
                                 <h5>Black Carbon Pollution</h5> </br>
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

  $('#pm').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('pm-fill', 'visibility', 'visible');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': pmcolors[4] });
    $('#legendbar2').css({'background-color': pmcolors[3] });
    $('#legendbar3').css({'background-color': pmcolors[2] });
    $('#legendbar4').css({'background-color': pmcolors[1] });
    $('#legendbar5').css({'background-color': pmcolors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Fine Particulate Matter');
    // Inject description into the sidebar
    $('#infofill').text(pmdescription);
    map.on('mousemove', function(e) {


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
                                 <h5>Fine Particulate Matter Pollution</h5> </br>
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


  $('#no2').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('no2-fill', 'visibility', 'visible');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': no2colors[4] });
    $('#legendbar2').css({'background-color': no2colors[3] });
    $('#legendbar3').css({'background-color': no2colors[2] });
    $('#legendbar4').css({'background-color': no2colors[1] });
    $('#legendbar5').css({'background-color': no2colors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Nitrogen Dioxide');
    // Inject description into the sidebar
    $('#infofill').text(no2description);
    map.on('mousemove', function(e) {


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
                                 <h5>Nitrogen Dioxide Pollution</h5> </br>
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

  $('#asthma-rates').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'visible');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': childasthmacolors[4] });
    $('#legendbar2').css({'background-color': childasthmacolors[3] });
    $('#legendbar3').css({'background-color': childasthmacolors[2] });
    $('#legendbar4').css({'background-color': childasthmacolors[1] });
    $('#legendbar5').css({'background-color': childasthmacolors[0] });

    //Inject pollutant header into the infobox
    $('#subjecthead').text('Child Asthma Rates');
    // Inject description into the sidebar
    $('#infofill').text(childasthmadescription);
    map.on('mousemove', function(e) {


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
                                 <h5>Child Asthma Rates</h5> </br>
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

  $('#asthma-hosp').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'visible');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('death-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': childhospcolors[4] });
    $('#legendbar2').css({'background-color': childhospcolors[3] });
    $('#legendbar3').css({'background-color': childhospcolors[2] });
    $('#legendbar4').css({'background-color': childhospcolors[1] });
    $('#legendbar5').css({'background-color': childhospcolors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Child Asthma-Related Hospitalizations');
    // Inject description into the sidebar
    $('#infofill').text(childhospdescription);
    map.on('mousemove', function(e) {


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
                                 <h5>Child Asthma-Related Hospitalizations</h5> </br>
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

  $('#death').on('click', function() {
    // hide the restaurant-fill-layer on demand
    map.setLayoutProperty('death-fill', 'visibility', 'visible');
    map.setLayoutProperty('no2-fill', 'visibility', 'none');
    map.setLayoutProperty('so2-fill', 'visibility', 'none');
    map.setLayoutProperty('ozone-fill', 'visibility', 'none');
    map.setLayoutProperty('black-carbon-fill', 'visibility', 'none');
    map.setLayoutProperty('pm-fill', 'visibility', 'none');
    map.setLayoutProperty('child-medicaid-asthma-fill', 'visibility', 'none');
    map.setLayoutProperty('child-hosp-asthma-fill', 'visibility', 'none');
    // Adjust Legend
    $('#legendbar1').css({'background-color': deathcolors[4] });
    $('#legendbar2').css({'background-color': deathcolors[3] });
    $('#legendbar3').css({'background-color': deathcolors[2] });
    $('#legendbar4').css({'background-color': deathcolors[1] });
    $('#legendbar5').css({'background-color': deathcolors[0] });
    //Inject pollutant header into the infobox
    $('#subjecthead').text('Premature Deaths');
    // Inject description into the sidebar
    $('#infofill').text(deathdescription);
    map.on('mousemove', function(e) {


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
                                 <h5>Premature Deaths</h5> </br>
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


  // On Hover over Button, add more information about the pollutant via a button popup
$('#ozo').on('hover', function(){
  console.log('hello')
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



  // when the user hovers over our nyc-cd layer make the mouse cursor a pointer
  map.on('mouseenter', 'nyc-cd', () => {
    map.getCanvas().style.cursor = 'pointer'
  })
  map.on('mouseleave', 'nyc-cd', () => {
    map.getCanvas().style.cursor = ''
  })


})
