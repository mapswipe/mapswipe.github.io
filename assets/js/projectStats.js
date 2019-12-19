function initAnalyticsProject() {
  // load project id from query variable
  projectId = getQueryVariable('projectId').toString()
  console.log(projectId)

  // init basic map with all projects as polygon, zoom to selected project
  initProjectMap();
  url = 'https://apps.mapswipe.org/api/projects/projects_geom.geojson';
  addProject(url, projectId);

  // make plot for selected project
  url = 'https://apps.mapswipe.org/api/history/history_'+projectId+'.csv'
  makePlot(url, projectId, 'cum_progress');

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
  L.tileLayer( 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="https://carto.com/">Carto</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0.</a> Data by <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, under ODbL.',
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
        fillOpacity: 0.4
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
        } else if (feature.properties.status == 'inactive') {
            style = {fillColor: 'grey'}
        }
        if (feature.properties.project_id == projectId) {
            style.color = 'black',
            style.weight = 3
        }
        return style
    }).addTo(map)

    // add a popup
    layer.bindPopup(function (layer) {
        // popup with a link to the project page with detailed information
        popup = '<a href="project.html?projectId='+layer.feature.properties.project_id+'">'+layer.feature.properties.name+'</a>'
        return popup;
    });

    // zoom to selected project
    zoomToFeature(layer, projectId);


    // get info for our project
    projectInfo = geojsonData.responseJSON.features.filter(function(item) {
        return item['properties']['project_id'] == projectId
    })[0]['properties']

    // add other project info to html
    document.getElementById('project-info-name').innerHTML = projectInfo['name']
    document.getElementById('project-info-status').innerHTML = projectInfo['status']
    document.getElementById('project-info-description').innerHTML = projectInfo['project_details']
    document.getElementById('project-info-progress').innerHTML = parseInt(Math.round(100 * projectInfo['progress']))
    document.getElementById('project-info-contributors').innerHTML = projectInfo['number_of_users']
    document.getElementById('project-info-area').innerHTML = parseInt(projectInfo['area_sqkm']).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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

  datasets = [
    {'name': 'Aggregated Results',
     'url': 'https://apps.mapswipe.org/api/agg_results/agg_results_' + projectId + '.csv',
     'description': 'aggregated results',
     'datatype': 'CSV'
     },
     {'name': 'Aggregated Results (with Geometry)',
     'url': 'https://apps.mapswipe.org/api/agg_results/agg_results_' + projectId + '_geom.geojson',
     'description': 'aggregated results',
     'datatype': 'GeoJSON'
     },
     {'name': 'HOT Tasking Manager Geometries',
     'url': 'https://apps.mapswipe.org/api/hot_tm/hot_tm_' + projectId + '.geojson',
     'description': 'This dataset contains shapes that are ready to use in the HOT Tasking Manager. Currently, the geometries consist of maximum 15 MapSwipe Tasks, where at least 35% of all users indicated the presence of a building by classifying as "yes" or "maybe"',
     'datatype': 'GeoJSON'
     },
     {'name': 'Moderate to High Agreement Yes Maybe Geometries',
     'url': 'https://apps.mapswipe.org/api/yes_maybe/yes_maybe_' + projectId + '.geojson',
     'description': 'This dataset contains all results where at least 35% of users submitted a "yes" or "maybe" classification. The output dataset depicts the union of all selected results.',
     'datatype': 'GeoJSON'
     },
     {'name': 'Groups',
     'url': 'https://apps.mapswipe.org/api/groups/groups_' + projectId + '.csv',
     'description': 'Groups',
     'datatype': 'CSV'
     },
     {'name': 'History',
     'url': 'https://apps.mapswipe.org/api/history/history_' + projectId + '.csv',
     'description': 'History',
     'datatype': 'CSV'
     },
     {'name': 'Results',
     'url': 'https://apps.mapswipe.org/api/results/results_' + projectId + '.csv',
     'description': 'Results',
     'datatype': 'CSV'
     },
     {'name': 'Tasks',
     'url': 'https://apps.mapswipe.org/api/tasks/tasks_' + projectId + '.csv',
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
    y.push( 100 * row[attribute] );
  }
  makePlotly( x, y, projectId, attribute);
}


function makePlotly( x, y, projectId, attribute){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];


  if (attribute == 'cum_progress') {
    var layout = {
      autosize: 350,
      height: 350,
      margin: {
        l: 40,
        r: 40,
        b: 40,
        t: 60,
        pad: 4
      },
      yaxis: {range: [0, 101]},
      title: {
        text: 'Progress [%]'
      }
    }
  } else {
    var layout = {}
  }

  Plotly.newPlot(attribute, traces, layout,
    {displayModeBar: false})
};


