function initMap() {
  map = L.map('map').setView([0.0, 0.0], 2);
  L.tileLayer( 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  console.log('added map');
  projectCentroidsLayer = L.geoJSON().addTo(map);
  projectCentroidsUrl = 'https://dev.mapswipe.org/api/agg_progress_by_project_id_centroid.geojson';

  projectGeometriesLayer = L.geoJSON().addTo(map);
  projectGeometriesUrl = 'https://dev.mapswipe.org/api/agg_progress_by_project_id_geom.geojson';

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
    td.innerHTML = element.properties.project_id
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.properties.name
    tr.appendChild(td)
  })

  $('#projectsTable').DataTable();
  $('.dataTables_length').addClass('bs-select');

}