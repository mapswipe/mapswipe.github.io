// Initialize Firebase
// TODO: Replace with your project's customized code snippet

var config = {
    apiKey: "AIzaSyB_0YpjpzQ4zALUa78jREXnryVanus1bew",
    authDomain: "msf-mapswipe.firebaseapp.com",
    databaseURL: "https://msf-mapswipe.firebaseio.com",
    storageBucket: "msf-mapswipe.appspot.com",
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
var db = firebase.database();
var importRef = db.ref("/imports")
var submitInfo = function() {

    // get basic project information
    var name = document.getElementById("name").value;
    var objective = document.getElementById("objective").value;
    var description = document.getElementById("description").value;
    var projectType = document.getElementById("projectType").value;
    var image = document.getElementById("image").value;
    var verificationCount = document.getElementById("verificationCount").value;
    var submissionKey = document.getElementById("submissionKey").value;

    var project = {
        name: name,
        lookFor: objective,
        projectDetails: description,
        image: image,
        verificationCount: verificationCount,
    }

    if (projectType == 1) {
        var tileServer = document.getElementById("tileServerBuildArea").value;
        var tileServerUrl = document.getElementById("tileServerUrlBuildArea").value;
        var layerName = document.getElementById("tileServerLayerNameBuildArea").value;
        var zoomLevel = document.getElementById("zoomLevel").value;
        var kml = document.getElementById("kml").value;

        var mapswipe_import = {
            project: project,
            projectType: projectType,
            key: submissionKey,
            tileServer: tileServer,
            tileServerUrl: tileServerUrl,
            layerName: layerName,
            zoomLevel: zoomLevel,
            kml: kml,
        }

        alert("Submitted project! It can take up to an hour for your project to appear.");
        importRef.push().set(mapswipe_import)

    } else if (projectType == 2) {

        var tileServer = document.getElementById("tileServerFootprint").value;
        var tileServerUrl = document.getElementById("tileServerUrlFootprint").value;
        var layerName = document.getElementById("tileServerLayerNameFootprint").value;
        var inputGeometries = document.getElementById("inputGeometries").value;



        var mapswipe_import = {
            project: project,
            projectType: projectType,
            key: submissionKey,
            tileServer: tileServer,
            tileServerUrl: tileServerUrl,
            layerName: layerName,
            inputGeometries: inputGeometries,
        }

        alert("Submitted project! It can take up to an hour for your project to appear.");
        importRef.push().set(mapswipe_import)

    }


}