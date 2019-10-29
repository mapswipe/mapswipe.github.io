(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var PRECACHE = 'precache-v1';
var RUNTIME = 'runtime';
var caches = void 0;
var cache = void 0;

// A list of local resources we always want to be cached.
var PRECACHE_URLS = ['index.html', './', // Alias for index.html
'/', 'offline.html', 'assets/css/main.css', 'assets/js/index.js'];

var devEnvs = ['http://localhost:8090'];

var extensionCache = ['css', 'js', 'png', 'gif', 'json', 'svg', 'mp4', 'ogg', 'webp', 'webm'];

var DEBUG = devEnvs.indexOf(window.location.origin) > -1 ? true : false;

console.log(window);

// The install handler takes care of precaching the resources we always need.
window.addEventListener('install', function (event) {
    event.waitUntil(caches.open(PRECACHE).then(function (cache) {
        return cache.addAll(PRECACHE_URLS);
    }).then(window.skipWaiting()));
});

// The activate handler takes care of cleaning up old caches.
window.addEventListener('activate', function (event) {
    var currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return cacheNames.filter(function (cacheName) {
            return !currentCaches.includes(cacheName);
        });
    }).then(function (cachesToDelete) {
        return Promise.all(cachesToDelete.map(function (cacheToDelete) {
            return caches.delete(cacheToDelete);
        }));
    }).then(function () {
        return window.clients.claim();
    }));
});

window.addEventListener('fetch', function (event) {
    var extension = event.request.url.split('.').pop();

    if (event.request.url.startsWith(window.location.origin) && event.request.method === 'GET' && !DEBUG) {
        var requestURL = new URL(event.request.url);
        var freshResource = fetch(event.request).then(function (response) {
            var clonedResponse = response.clone();
            // Don't update the cache with error pages!
            if (response.ok) {
                // All good? Update the cache with the network response
                caches.open(RUNTIME).then(function (cache) {
                    cache.put(event.request, clonedResponse);
                });
            }
            return response;
        }).catch(function () {
            return cache.match('offline.html');
        });
        var cachedResource = caches.open(RUNTIME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || freshResource;
            });
        }).catch(function (e) {
            return freshResource;
        });
        event.respondWith(cachedResource);
    }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc2VydmljZVdvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQU0sV0FBVyxhQUFqQjtBQUNBLElBQU0sVUFBVSxTQUFoQjtBQUNBLElBQUksZUFBSjtBQUNBLElBQUksY0FBSjs7QUFFQTtBQUNBLElBQU0sZ0JBQWdCLENBQ2xCLFlBRGtCLEVBRWxCLElBRmtCLEVBRVo7QUFDTixHQUhrQixFQUlsQixjQUprQixFQUtsQixxQkFMa0IsRUFNbEIsb0JBTmtCLENBQXRCOztBQVNBLElBQU0sVUFBVSxDQUNaLHVCQURZLENBQWhCOztBQUlBLElBQU0saUJBQWlCLENBQ25CLEtBRG1CLEVBRW5CLElBRm1CLEVBR25CLEtBSG1CLEVBSW5CLEtBSm1CLEVBS25CLE1BTG1CLEVBTW5CLEtBTm1CLEVBT25CLEtBUG1CLEVBUW5CLEtBUm1CLEVBU25CLE1BVG1CLEVBVW5CLE1BVm1CLENBQXZCOztBQWFBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZ0IsT0FBTyxRQUFQLENBQWdCLE1BQWhDLElBQTBDLENBQUMsQ0FBM0MsR0FBK0MsSUFBL0MsR0FBc0QsS0FBcEU7O0FBRUEsUUFBUSxHQUFSLENBQVksTUFBWjs7QUFFQTtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsaUJBQVM7QUFDeEMsVUFBTSxTQUFOLENBQ0ksT0FBTyxJQUFQLENBQVksUUFBWixFQUNDLElBREQsQ0FDTTtBQUFBLGVBQVMsTUFBTSxNQUFOLENBQWEsYUFBYixDQUFUO0FBQUEsS0FETixFQUVDLElBRkQsQ0FFTSxPQUFPLFdBQVAsRUFGTixDQURKO0FBS0gsQ0FORDs7QUFRQTtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBb0MsaUJBQVM7QUFDekMsUUFBTSxnQkFBZ0IsQ0FBQyxRQUFELEVBQVcsT0FBWCxDQUF0QjtBQUNBLFVBQU0sU0FBTixDQUNJLE9BQU8sSUFBUCxHQUFjLElBQWQsQ0FBbUIsc0JBQWM7QUFDN0IsZUFBTyxXQUFXLE1BQVgsQ0FBa0I7QUFBQSxtQkFBYSxDQUFDLGNBQWMsUUFBZCxDQUF1QixTQUF2QixDQUFkO0FBQUEsU0FBbEIsQ0FBUDtBQUNILEtBRkQsRUFFRyxJQUZILENBRVEsMEJBQWtCO0FBQ3RCLGVBQU8sUUFBUSxHQUFSLENBQVksZUFBZSxHQUFmLENBQW1CLHlCQUFpQjtBQUNuRCxtQkFBTyxPQUFPLE1BQVAsQ0FBYyxhQUFkLENBQVA7QUFDSCxTQUZrQixDQUFaLENBQVA7QUFHSCxLQU5ELEVBTUcsSUFOSCxDQU1RO0FBQUEsZUFBTSxPQUFPLE9BQVAsQ0FBZSxLQUFmLEVBQU47QUFBQSxLQU5SLENBREo7QUFTSCxDQVhEOztBQWFBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBVSxLQUFWLEVBQWlCO0FBQzlDLFFBQUksWUFBWSxNQUFNLE9BQU4sQ0FBYyxHQUFkLENBQWtCLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWhCOztBQUVBLFFBQUksTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFrQixVQUFsQixDQUE2QixPQUFPLFFBQVAsQ0FBZ0IsTUFBN0MsS0FBd0QsTUFBTSxPQUFOLENBQWMsTUFBZCxLQUF5QixLQUFqRixJQUEwRixDQUFDLEtBQS9GLEVBQXNHO0FBQ2xHLFlBQUksYUFBYSxJQUFJLEdBQUosQ0FBUSxNQUFNLE9BQU4sQ0FBYyxHQUF0QixDQUFqQjtBQUNBLFlBQUksZ0JBQWdCLE1BQU0sTUFBTSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsUUFBVixFQUFvQjtBQUM5RCxnQkFBSSxpQkFBaUIsU0FBUyxLQUFULEVBQXJCO0FBQ0E7QUFDQSxnQkFBSSxTQUFTLEVBQWIsRUFBaUI7QUFDYjtBQUNBLHVCQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsS0FBVixFQUFpQjtBQUN2QywwQkFBTSxHQUFOLENBQVUsTUFBTSxPQUFoQixFQUF5QixjQUF6QjtBQUNILGlCQUZEO0FBR0g7QUFDRCxtQkFBTyxRQUFQO0FBQ0gsU0FWbUIsRUFVakIsS0FWaUIsQ0FVWCxZQUFNO0FBQ1gsbUJBQU8sTUFBTSxLQUFOLENBQVksY0FBWixDQUFQO0FBQ0gsU0FabUIsQ0FBcEI7QUFhQSxZQUFJLGlCQUFpQixPQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsS0FBVixFQUFpQjtBQUM1RCxtQkFBTyxNQUFNLEtBQU4sQ0FBWSxNQUFNLE9BQWxCLEVBQTJCLElBQTNCLENBQWdDLFVBQVUsUUFBVixFQUFvQjtBQUN2RCx1QkFBTyxZQUFZLGFBQW5CO0FBQ0gsYUFGTSxDQUFQO0FBR0gsU0FKb0IsRUFJbEIsS0FKa0IsQ0FJWixVQUFVLENBQVYsRUFBYTtBQUNsQixtQkFBTyxhQUFQO0FBQ0gsU0FOb0IsQ0FBckI7QUFPQSxjQUFNLFdBQU4sQ0FBa0IsY0FBbEI7QUFDSDtBQUNKLENBM0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBQUkVDQUNIRSA9ICdwcmVjYWNoZS12MSc7XG5jb25zdCBSVU5USU1FID0gJ3J1bnRpbWUnO1xubGV0IGNhY2hlcztcbmxldCBjYWNoZTtcblxuLy8gQSBsaXN0IG9mIGxvY2FsIHJlc291cmNlcyB3ZSBhbHdheXMgd2FudCB0byBiZSBjYWNoZWQuXG5jb25zdCBQUkVDQUNIRV9VUkxTID0gW1xuICAgICdpbmRleC5odG1sJyxcbiAgICAnLi8nLCAvLyBBbGlhcyBmb3IgaW5kZXguaHRtbFxuICAgICcvJyxcbiAgICAnb2ZmbGluZS5odG1sJyxcbiAgICAnYXNzZXRzL2Nzcy9tYWluLmNzcycsXG4gICAgJ2Fzc2V0cy9qcy9pbmRleC5qcydcbl07XG5cbmNvbnN0IGRldkVudnMgPSBbXG4gICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA5MCdcbl07XG5cbmNvbnN0IGV4dGVuc2lvbkNhY2hlID0gW1xuICAgICdjc3MnLFxuICAgICdqcycsXG4gICAgJ3BuZycsXG4gICAgJ2dpZicsXG4gICAgJ2pzb24nLFxuICAgICdzdmcnLFxuICAgICdtcDQnLFxuICAgICdvZ2cnLFxuICAgICd3ZWJwJyxcbiAgICAnd2VibSdcbl07XG5cbmNvbnN0IERFQlVHID0gZGV2RW52cy5pbmRleE9mKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pID4gLTEgPyB0cnVlIDogZmFsc2U7XG5cbmNvbnNvbGUubG9nKHdpbmRvdyk7XG5cbi8vIFRoZSBpbnN0YWxsIGhhbmRsZXIgdGFrZXMgY2FyZSBvZiBwcmVjYWNoaW5nIHRoZSByZXNvdXJjZXMgd2UgYWx3YXlzIG5lZWQuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaW5zdGFsbCcsIGV2ZW50ID0+IHtcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGNhY2hlcy5vcGVuKFBSRUNBQ0hFKVxuICAgICAgICAudGhlbihjYWNoZSA9PiBjYWNoZS5hZGRBbGwoUFJFQ0FDSEVfVVJMUykpXG4gICAgICAgIC50aGVuKHdpbmRvdy5za2lwV2FpdGluZygpKVxuICAgICk7XG59KTtcblxuLy8gVGhlIGFjdGl2YXRlIGhhbmRsZXIgdGFrZXMgY2FyZSBvZiBjbGVhbmluZyB1cCBvbGQgY2FjaGVzLlxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZXZlbnQgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDYWNoZXMgPSBbUFJFQ0FDSEUsIFJVTlRJTUVdO1xuICAgIGV2ZW50LndhaXRVbnRpbChcbiAgICAgICAgY2FjaGVzLmtleXMoKS50aGVuKGNhY2hlTmFtZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlTmFtZXMuZmlsdGVyKGNhY2hlTmFtZSA9PiAhY3VycmVudENhY2hlcy5pbmNsdWRlcyhjYWNoZU5hbWUpKTtcbiAgICAgICAgfSkudGhlbihjYWNoZXNUb0RlbGV0ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoY2FjaGVzVG9EZWxldGUubWFwKGNhY2hlVG9EZWxldGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKGNhY2hlVG9EZWxldGUpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KS50aGVuKCgpID0+IHdpbmRvdy5jbGllbnRzLmNsYWltKCkpXG4gICAgKTtcbn0pO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBsZXQgZXh0ZW5zaW9uID0gZXZlbnQucmVxdWVzdC51cmwuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICBcbiAgICBpZiAoZXZlbnQucmVxdWVzdC51cmwuc3RhcnRzV2l0aCh3aW5kb3cubG9jYXRpb24ub3JpZ2luKSAmJiBldmVudC5yZXF1ZXN0Lm1ldGhvZCA9PT0gJ0dFVCcgJiYgIURFQlVHKSB7XG4gICAgICAgIHZhciByZXF1ZXN0VVJMID0gbmV3IFVSTChldmVudC5yZXF1ZXN0LnVybCk7XG4gICAgICAgIHZhciBmcmVzaFJlc291cmNlID0gZmV0Y2goZXZlbnQucmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWRSZXNwb25zZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgICAgICAvLyBEb24ndCB1cGRhdGUgdGhlIGNhY2hlIHdpdGggZXJyb3IgcGFnZXMhXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAvLyBBbGwgZ29vZD8gVXBkYXRlIHRoZSBjYWNoZSB3aXRoIHRoZSBuZXR3b3JrIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY2FjaGVzLm9wZW4oUlVOVElNRSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIGNsb25lZFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLm1hdGNoKCdvZmZsaW5lLmh0bWwnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBjYWNoZWRSZXNvdXJjZSA9IGNhY2hlcy5vcGVuKFJVTlRJTUUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGUubWF0Y2goZXZlbnQucmVxdWVzdCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgZnJlc2hSZXNvdXJjZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyZXNoUmVzb3VyY2U7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5yZXNwb25kV2l0aChjYWNoZWRSZXNvdXJjZSk7XG4gICAgfVxufSk7XG4iXX0=
