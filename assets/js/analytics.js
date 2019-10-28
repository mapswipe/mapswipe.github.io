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
  projectCentroidsUrl = 'https://dev.mapswipe.org/api/projects/projects_centroid.geojson';
  setTimeout(function(){ map.invalidateSize()}, 400);
  addGeojsonLayer(projectCentroidsUrl);

  // add legend
  addLegend()

}

function addLegend() {
  legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'info legend')
	div.innerHTML += '<i style="background:orange"></i>active<br>'
	div.innerHTML += '<i style="background:blue"></i>finished<br>'
	div.innerHTML += '<i style="background:grey"></i>inactive<br>'
	return div;
  };
  legend.addTo(map);
}

function addGeojsonLayer (url) {
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

    // define default point style
    var geojsonMarkerGreen = {
        radius: 6,
        fillColor: "grey",
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    // create geojson layer
    layer = L.geoJSON(geojsonData.responseJSON, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerGreen);
        }
    })

    // set style based on feature properties
    layer.setStyle(function(feature) {
        if (feature.properties.status == 'active') {
            return {fillColor: 'orange', color:'black', radius: 9}
        } else if (feature.properties.status == 'finished') {
            return {fillColor: 'blue'}
        } else {
            return {fillColor: 'grey'}
        }
    }).addTo(map)

    // add a popup
    layer.bindPopup(function (layer) {
        // popup with a link to the project page with detailed information
        popup = '<a href="analyticsProject.html?projectId='+layer.feature.properties.project_id+'">'+layer.feature.properties.name+'</a>'
        return popup;
    });

    // fit to layer extent
    map.fitBounds(layer.getBounds());

    // add data to projects table
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