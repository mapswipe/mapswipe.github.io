function initMap() {

  var myStyle = {
	"color": "#ff7800",
	"weight": 5,
	"opacity": 0.65
  };

  map = L.map('map').setView([0.0, 0.0], 2);
  L.tileLayer( 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  console.log('added map');
  projectCentroidsLayer = L.geoJSON().addTo(map);
  projectCentroidsUrl = 'https://dev.mapswipe.org/api/projects/projects_centroid.geojson';

  projectGeometriesLayer = L.geoJSON().addTo(map);
  projectGeometriesUrl = 'https://dev.mapswipe.org/api/projects/projects_geom.geojson';

  setTimeout(function(){ map.invalidateSize()}, 400);

  addGeojsonLayer(projectCentroidsUrl, projectCentroidsLayer);
  // addGeojsonLayer(projectGeometriesUrl, projectGeometriesLayer);


  }


function addGeojsonLayer (url, layer) {
  var geojsonData = $.ajax({
    url:url,
    dataType: "json",
    success: console.log("mapswipe project centroids data successfully loaded."),
    error: function (xhr) {
      alert(xhr.statusText)
    }
  })
  // Specify that this code should run once the county data request is complete
  $.when(geojsonData).done(function() {
    layer.addData(geojsonData.responseJSON);
    layer.bindPopup(function (layer) {
        // popup with a link to the project page with detailed information
        popup = '<a href="analyticsProject.html?'+layer.feature.properties.project_id+'">'+layer.feature.properties.name+'</a>'
        return popup;
    });
    map.fitBounds(layer.getBounds());
    populateProjectsTable(geojsonData.responseJSON);
  })

}

function populateProjectsTable(geojsonData) {
  console.log('added projects')

  var tableRef = document.getElementById('projectsTable').getElementsByTagName('tbody')[0];

  geojsonData.features.forEach(function(element) {

    tr = tableRef.insertRow();

    td = document.createElement('td')
    td.innerHTML = '<a href="analyticsProject.html?'+element.properties.project_id+'">'+element.properties.name+'</a>'
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.properties.name
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.properties.project_type
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.properties.status
    tr.appendChild(td)

    td = document.createElement('td')
    if (element.properties.progress > 0) {
        td.innerHTML = Math.round(100*element.properties.progress)+'%'
    } else {
        td.innerHTML = 'not available'
    }
    tr.appendChild(td)

    td = document.createElement('td')
    if (parseInt(element.properties.number_of_users) > 0) {
        td.innerHTML = element.properties.number_of_users
    } else {
        td.innerHTML = 'not available'
    }

    tr.appendChild(td)
  })

  $('#projectsTable').DataTable();
  $('.dataTables_length').addClass('bs-select');

}