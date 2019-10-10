function makeplot() {
  Plotly.d3.csv("https://dev.mapswipe.org/api/agg_progress_by_project_id_and_date/agg_progress_by_project_id_and_date_1.csv", function(data){ processData(data) } );
};

function processData(allRows) {

  var x = [], y = [], standard_deviation = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['day'] );
    y.push( row['cumulative_groups_finished_count'] );
  }
  makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];

  Plotly.newPlot('plotlyGraph', traces,
    {title: 'Project Progress'});
};

function initProjectMap() {
  map = L.map('map').setView([0.0, 0.0], 2);
  L.tileLayer( 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
  }).addTo( map );
  console.log('added map');

  setTimeout(function(){ map.invalidateSize()}, 400);
  }


function populateProjectDataTable(projectId, datasetNames) {
  console.log('added projects')

  var tableRef = document.getElementById('projectDataTable').getElementsByTagName('tbody')[0];

  datasetNames.forEach(function(element) {
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
  })

  $('#projectDataTable').DataTable();
  $('.dataTables_length').addClass('bs-select');

}


function initAnalyticsProject() {
  var projectId = '5519'


  var datasetNames = [
    {"name":"Raw Results", "description":"Raw Result contain information on MapSwipe Tasks where at least one user submitted a results. If there are several results per task by different users, the individual results are aggregated. For each task a yes_count, maybe_count and bad_imagery_count and further values are provided.", "datatype":"geoJSON"},
    {"name":"Yes Maybe Results", "description":"This dataset contains all results where at least one mapswipe user submitted a yes or maybe classification. The output dataset depicts the union of all selected results.", "datatype":"geoJSON"},
    {"name":"Bad Imagery Results", "description":"This dataset contains all results where at least one mapswipe user submitted a bad_image classification and no other classifications are more frequently submitted. The output dataset depicts the union of all selected results.", "datatype":"geoJSON"},
    {"name":"HOT Tasking Manager Geometries", "description":"This dataset contains shapes that are ready to use in the HOT Tasking Manager. Currently, the geometries consist of maximum 15 MapSwipe Tasks, where at least one user indicated the presence of a building. The filter criteria and size of the tasks can be adapted on request.", "datatype":"geoJSON"},
    {"name":"Progress and Contributors by date", "description":"Number of contributors and project progress on a daily basis.", "datatype":"CSV"},
    {"name":"QGIS style total results count", "description":"You can use this file to set the symbology of your results data in QGIS", "datatype":"QML"},
    {"name":"QGIS style yes results share", "description":"You can use this file to set the symbology of your results data in QGIS", "datatype":"QML"},
  ]

  initProjectMap();
  makeplot();
  populateProjectDataTable(projectId, datasetNames);
}