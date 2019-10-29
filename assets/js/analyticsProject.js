function initAnalyticsProject() {
  // load project id from query variable
  projectId = getQueryVariable('projectId').toString()
  console.log(projectId)

  // init basic map with all projects as polygon, zoom to selected project
  initProjectMap();
  url = 'https://dev.mapswipe.org/api/projects/projects_geom.geojson';
  addProject(url, projectId);

  // make plot for selected project
  url = 'https://dev.mapswipe.org/api/history/history_'+projectId+'.csv'
  makePlot(url, projectId, 'cum_progress');
  makePlot(url, projectId, 'cum_number_of_users');

  // add items and links to download table
  populateProjectDataTable(projectId);
}


function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   console.log(query)
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if(pair[0] == variable){return pair[1];}
   }
   return(false);
}


function initProjectMap() {
  map = L.map('map').setView([0.0, 0.0], 2);
  L.tileLayer( 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  console.log('added map');

  setTimeout(function(){ map.invalidateSize()}, 400);

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


function addProject (url, projectId) {
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
    var geojsonPolygonStyle= {
        fillColor: "grey",
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    // create geojson layer
    layer = L.geoJSON(geojsonData.responseJSON, {
        style: geojsonPolygonStyle
    })

    // set style based on feature properties
    layer.setStyle(function(feature) {
        if (feature.properties.status == 'active') {
            style = {fillColor: 'orange', color:'black'}
        } else if (feature.properties.status == 'finished') {
            style = {fillColor: 'blue'}
        } else {
            style = {fillColor: 'grey'}
        }
        if (feature.properties.project_id == projectId) {
            style.color = 'red',
            style.weight = 5
        }
        return style
    }).addTo(map)

    // add a popup
    layer.bindPopup(function (layer) {
        // popup with a link to the project page with detailed information
        popup = '<a href="analyticsProject.html?projectId='+layer.feature.properties.project_id+'">'+layer.feature.properties.name+'</a>'
        return popup;
    });

    // zoom to selected project
    zoomToFeature(layer, projectId);



  })
}


function zoomToFeature(layer, projectId) {
  layer.eachLayer(function(layer) {
    if (layer.feature.properties.project_id == projectId) {
        console.log('zoom to feature')
        map.fitBounds(layer.getBounds());
    }
  })

}


function populateProjectDataTable(projectId) {

    var datasetNames = [
    {"name":"Raw Results", "description":"Raw Result contain information on MapSwipe Tasks where at least one user submitted a results. If there are several results per task by different users, the individual results are aggregated. For each task a yes_count, maybe_count and bad_imagery_count and further values are provided.", "datatype":"geoJSON"},
    {"name":"Yes Maybe Results", "description":"This dataset contains all results where at least one mapswipe user submitted a yes or maybe classification. The output dataset depicts the union of all selected results.", "datatype":"geoJSON"},
    {"name":"Bad Imagery Results", "description":"This dataset contains all results where at least one mapswipe user submitted a bad_image classification and no other classifications are more frequently submitted. The output dataset depicts the union of all selected results.", "datatype":"geoJSON"},
    {"name":"HOT Tasking Manager Geometries", "description":"This dataset contains shapes that are ready to use in the HOT Tasking Manager. Currently, the geometries consist of maximum 15 MapSwipe Tasks, where at least one user indicated the presence of a building. The filter criteria and size of the tasks can be adapted on request.", "datatype":"geoJSON"},
    {"name":"Progress and Contributors by date", "description":"Number of contributors and project progress on a daily basis.", "datatype":"CSV"},
    {"name":"QGIS style total results count", "description":"You can use this file to set the symbology of your results data in QGIS", "datatype":"QML"},
    {"name":"QGIS style yes results share", "description":"You can use this file to set the symbology of your results data in QGIS", "datatype":"QML"},
  ]

  datasets = [
    {'name': 'Aggregated Results',
     'url': 'https://dev.mapswipe.org/api/agg_results/agg_results_' + projectId + '.csv',
     'description': 'aggregated results',
     'datatype': 'CSV'
     },
     {'name': 'Aggregated Results (with Geometry)',
     'url': 'https://dev.mapswipe.org/api/agg_results/agg_results_' + projectId + '_geom.geojson',
     'description': 'aggregated results',
     'datatype': 'GeoJSON'
     },
     {'name': 'Groups',
     'url': 'https://dev.mapswipe.org/api/groups/groups_' + projectId + '.csv',
     'description': 'Groups',
     'datatype': 'CSV'
     },
     {'name': 'History',
     'url': 'https://dev.mapswipe.org/api/history/history_' + projectId + '.csv',
     'description': 'History',
     'datatype': 'CSV'
     },
     {'name': 'Results',
     'url': 'https://dev.mapswipe.org/api/results/results_' + projectId + '.csv',
     'description': 'Results',
     'datatype': 'CSV'
     },
     {'name': 'Tasks',
     'url': 'https://dev.mapswipe.org/api/tasks/tasks_' + projectId + '.csv',
     'description': 'Tasks',
     'datatype': 'CSV'
     },
  ]

  var tableRef = document.getElementById('projectDataTable').getElementsByTagName('tbody')[0];
  datasets.forEach(function(element) {
    tr = tableRef.insertRow();

    td = document.createElement('td')
    td.innerHTML = projectId
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.name
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.datatype
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = element.description
    tr.appendChild(td)

    td = document.createElement('td')
    td.innerHTML = '<a href="'+element.url+'" target="_blank">Download</a>'
    tr.appendChild(td)
  })
}


function makePlot(url, projectId, attribute) {
  Plotly.d3.csv(url, function(data){ processData(data, projectId, attribute) } );
};


function processData(allRows, projectId, attribute) {
  var x = [], y = [];
  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['day'] );
    y.push( row[attribute] );
  }
  makePlotly( x, y, projectId, attribute);
}


function makePlotly( x, y, projectId, attribute){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];

  Plotly.newPlot(attribute, traces,
    {title: attribute+' for project: '+projectId});
};


