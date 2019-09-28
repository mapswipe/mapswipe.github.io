(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvc2VydmljZVdvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQU0sV0FBVyxhQUFqQjtBQUNBLElBQU0sVUFBVSxTQUFoQjtBQUNBLElBQUksZUFBSjtBQUNBLElBQUksY0FBSjs7QUFFQTtBQUNBLElBQU0sZ0JBQWdCLENBQ2xCLFlBRGtCLEVBRWxCLElBRmtCLEVBRVo7QUFDTixHQUhrQixFQUlsQixjQUprQixFQUtsQixxQkFMa0IsRUFNbEIsb0JBTmtCLENBQXRCOztBQVNBLElBQU0sVUFBVSxDQUNaLHVCQURZLENBQWhCOztBQUlBLElBQU0saUJBQWlCLENBQ25CLEtBRG1CLEVBRW5CLElBRm1CLEVBR25CLEtBSG1CLEVBSW5CLEtBSm1CLEVBS25CLE1BTG1CLEVBTW5CLEtBTm1CLEVBT25CLEtBUG1CLEVBUW5CLEtBUm1CLEVBU25CLE1BVG1CLEVBVW5CLE1BVm1CLENBQXZCOztBQWFBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZ0IsT0FBTyxRQUFQLENBQWdCLE1BQWhDLElBQTBDLENBQUMsQ0FBM0MsR0FBK0MsSUFBL0MsR0FBc0QsS0FBcEU7O0FBRUEsUUFBUSxHQUFSLENBQVksTUFBWjs7QUFFQTtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsaUJBQVM7QUFDeEMsVUFBTSxTQUFOLENBQ0ksT0FBTyxJQUFQLENBQVksUUFBWixFQUNDLElBREQsQ0FDTTtBQUFBLGVBQVMsTUFBTSxNQUFOLENBQWEsYUFBYixDQUFUO0FBQUEsS0FETixFQUVDLElBRkQsQ0FFTSxPQUFPLFdBQVAsRUFGTixDQURKO0FBS0gsQ0FORDs7QUFRQTtBQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBb0MsaUJBQVM7QUFDekMsUUFBTSxnQkFBZ0IsQ0FBQyxRQUFELEVBQVcsT0FBWCxDQUF0QjtBQUNBLFVBQU0sU0FBTixDQUNJLE9BQU8sSUFBUCxHQUFjLElBQWQsQ0FBbUIsc0JBQWM7QUFDN0IsZUFBTyxXQUFXLE1BQVgsQ0FBa0I7QUFBQSxtQkFBYSxDQUFDLGNBQWMsUUFBZCxDQUF1QixTQUF2QixDQUFkO0FBQUEsU0FBbEIsQ0FBUDtBQUNILEtBRkQsRUFFRyxJQUZILENBRVEsMEJBQWtCO0FBQ3RCLGVBQU8sUUFBUSxHQUFSLENBQVksZUFBZSxHQUFmLENBQW1CLHlCQUFpQjtBQUNuRCxtQkFBTyxPQUFPLE1BQVAsQ0FBYyxhQUFkLENBQVA7QUFDSCxTQUZrQixDQUFaLENBQVA7QUFHSCxLQU5ELEVBTUcsSUFOSCxDQU1RO0FBQUEsZUFBTSxPQUFPLE9BQVAsQ0FBZSxLQUFmLEVBQU47QUFBQSxLQU5SLENBREo7QUFTSCxDQVhEOztBQWFBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBVSxLQUFWLEVBQWlCO0FBQzlDLFFBQUksWUFBWSxNQUFNLE9BQU4sQ0FBYyxHQUFkLENBQWtCLEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWhCOztBQUVBLFFBQUksTUFBTSxPQUFOLENBQWMsR0FBZCxDQUFrQixVQUFsQixDQUE2QixPQUFPLFFBQVAsQ0FBZ0IsTUFBN0MsS0FBd0QsTUFBTSxPQUFOLENBQWMsTUFBZCxLQUF5QixLQUFqRixJQUEwRixDQUFDLEtBQS9GLEVBQXNHO0FBQ2xHLFlBQUksYUFBYSxJQUFJLEdBQUosQ0FBUSxNQUFNLE9BQU4sQ0FBYyxHQUF0QixDQUFqQjtBQUNBLFlBQUksZ0JBQWdCLE1BQU0sTUFBTSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsUUFBVixFQUFvQjtBQUM5RCxnQkFBSSxpQkFBaUIsU0FBUyxLQUFULEVBQXJCO0FBQ0E7QUFDQSxnQkFBSSxTQUFTLEVBQWIsRUFBaUI7QUFDYjtBQUNBLHVCQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsS0FBVixFQUFpQjtBQUN2QywwQkFBTSxHQUFOLENBQVUsTUFBTSxPQUFoQixFQUF5QixjQUF6QjtBQUNILGlCQUZEO0FBR0g7QUFDRCxtQkFBTyxRQUFQO0FBQ0gsU0FWbUIsRUFVakIsS0FWaUIsQ0FVWCxZQUFNO0FBQ1gsbUJBQU8sTUFBTSxLQUFOLENBQVksY0FBWixDQUFQO0FBQ0gsU0FabUIsQ0FBcEI7QUFhQSxZQUFJLGlCQUFpQixPQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLElBQXJCLENBQTBCLFVBQVUsS0FBVixFQUFpQjtBQUM1RCxtQkFBTyxNQUFNLEtBQU4sQ0FBWSxNQUFNLE9BQWxCLEVBQTJCLElBQTNCLENBQWdDLFVBQVUsUUFBVixFQUFvQjtBQUN2RCx1QkFBTyxZQUFZLGFBQW5CO0FBQ0gsYUFGTSxDQUFQO0FBR0gsU0FKb0IsRUFJbEIsS0FKa0IsQ0FJWixVQUFVLENBQVYsRUFBYTtBQUNsQixtQkFBTyxhQUFQO0FBQ0gsU0FOb0IsQ0FBckI7QUFPQSxjQUFNLFdBQU4sQ0FBa0IsY0FBbEI7QUFDSDtBQUNKLENBM0JEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgUFJFQ0FDSEUgPSAncHJlY2FjaGUtdjEnO1xuY29uc3QgUlVOVElNRSA9ICdydW50aW1lJztcbmxldCBjYWNoZXM7XG5sZXQgY2FjaGU7XG5cbi8vIEEgbGlzdCBvZiBsb2NhbCByZXNvdXJjZXMgd2UgYWx3YXlzIHdhbnQgdG8gYmUgY2FjaGVkLlxuY29uc3QgUFJFQ0FDSEVfVVJMUyA9IFtcbiAgICAnaW5kZXguaHRtbCcsXG4gICAgJy4vJywgLy8gQWxpYXMgZm9yIGluZGV4Lmh0bWxcbiAgICAnLycsXG4gICAgJ29mZmxpbmUuaHRtbCcsXG4gICAgJ2Fzc2V0cy9jc3MvbWFpbi5jc3MnLFxuICAgICdhc3NldHMvanMvaW5kZXguanMnXG5dO1xuXG5jb25zdCBkZXZFbnZzID0gW1xuICAgICdodHRwOi8vbG9jYWxob3N0OjgwOTAnXG5dO1xuXG5jb25zdCBleHRlbnNpb25DYWNoZSA9IFtcbiAgICAnY3NzJyxcbiAgICAnanMnLFxuICAgICdwbmcnLFxuICAgICdnaWYnLFxuICAgICdqc29uJyxcbiAgICAnc3ZnJyxcbiAgICAnbXA0JyxcbiAgICAnb2dnJyxcbiAgICAnd2VicCcsXG4gICAgJ3dlYm0nXG5dO1xuXG5jb25zdCBERUJVRyA9IGRldkVudnMuaW5kZXhPZih3aW5kb3cubG9jYXRpb24ub3JpZ2luKSA+IC0xID8gdHJ1ZSA6IGZhbHNlO1xuXG5jb25zb2xlLmxvZyh3aW5kb3cpO1xuXG4vLyBUaGUgaW5zdGFsbCBoYW5kbGVyIHRha2VzIGNhcmUgb2YgcHJlY2FjaGluZyB0aGUgcmVzb3VyY2VzIHdlIGFsd2F5cyBuZWVkLlxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBldmVudCA9PiB7XG4gICAgZXZlbnQud2FpdFVudGlsKFxuICAgICAgICBjYWNoZXMub3BlbihQUkVDQUNIRSlcbiAgICAgICAgLnRoZW4oY2FjaGUgPT4gY2FjaGUuYWRkQWxsKFBSRUNBQ0hFX1VSTFMpKVxuICAgICAgICAudGhlbih3aW5kb3cuc2tpcFdhaXRpbmcoKSlcbiAgICApO1xufSk7XG5cbi8vIFRoZSBhY3RpdmF0ZSBoYW5kbGVyIHRha2VzIGNhcmUgb2YgY2xlYW5pbmcgdXAgb2xkIGNhY2hlcy5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBjdXJyZW50Q2FjaGVzID0gW1BSRUNBQ0hFLCBSVU5USU1FXTtcbiAgICBldmVudC53YWl0VW50aWwoXG4gICAgICAgIGNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZU5hbWVzLmZpbHRlcihjYWNoZU5hbWUgPT4gIWN1cnJlbnRDYWNoZXMuaW5jbHVkZXMoY2FjaGVOYW1lKSk7XG4gICAgICAgIH0pLnRoZW4oY2FjaGVzVG9EZWxldGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGNhY2hlc1RvRGVsZXRlLm1hcChjYWNoZVRvRGVsZXRlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZShjYWNoZVRvRGVsZXRlKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB3aW5kb3cuY2xpZW50cy5jbGFpbSgpKVxuICAgICk7XG59KTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IGV2ZW50LnJlcXVlc3QudXJsLnNwbGl0KCcuJykucG9wKCk7XG4gICAgXG4gICAgaWYgKGV2ZW50LnJlcXVlc3QudXJsLnN0YXJ0c1dpdGgod2luZG93LmxvY2F0aW9uLm9yaWdpbikgJiYgZXZlbnQucmVxdWVzdC5tZXRob2QgPT09ICdHRVQnICYmICFERUJVRykge1xuICAgICAgICB2YXIgcmVxdWVzdFVSTCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICAgICAgICB2YXIgZnJlc2hSZXNvdXJjZSA9IGZldGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkUmVzcG9uc2UgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICAgICAgLy8gRG9uJ3QgdXBkYXRlIHRoZSBjYWNoZSB3aXRoIGVycm9yIHBhZ2VzIVxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgLy8gQWxsIGdvb2Q/IFVwZGF0ZSB0aGUgY2FjaGUgd2l0aCB0aGUgbmV0d29yayByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNhY2hlcy5vcGVuKFJVTlRJTUUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLnB1dChldmVudC5yZXF1ZXN0LCBjbG9uZWRSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZS5tYXRjaCgnb2ZmbGluZS5odG1sJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgY2FjaGVkUmVzb3VyY2UgPSBjYWNoZXMub3BlbihSVU5USU1FKS50aGVuKGZ1bmN0aW9uIChjYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGZyZXNoUmVzb3VyY2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmcmVzaFJlc291cmNlO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVkUmVzb3VyY2UpO1xuICAgIH1cbn0pO1xuIl19
