(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var tinySampleLoader = require('tiny-sample-loader');
var audioBufferInstrument = require('audio-buffer-instrument');

function getAudioSamplePromise (ctx, url) {

	var instrumentPromise = new Promise( (resolve, reject) => { 
		var promise = tinySampleLoader(url, ctx);
		promise.then(  (value) => {
    		var  instrument = new audioBufferInstrument(ctx, value);
			resolve(instrument);
		}).catch(function (value) {
			reject(value);
		})
	})
	return instrumentPromise;
}

module.exports = getAudioSamplePromise;



},{"audio-buffer-instrument":2,"tiny-sample-loader":3}],2:[function(require,module,exports){
// From: https://dev.opera.com/articles/drum-sounds-webaudio/
function audioBufferInstrument(context, buffer) {
    this.context = context;
    this.buffer = buffer;
}

audioBufferInstrument.prototype.setup = function () {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
};

audioBufferInstrument.prototype.get = function () {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    return this.source;
};

audioBufferInstrument.prototype.trigger = function (time) {
    this.setup();
    this.source.start(time);
};

module.exports = audioBufferInstrument;
},{}],3:[function(require,module,exports){
function sampleLoader (url, context) {
    
    var promise = new Promise((resolve, reject) => { 
        var request = new XMLHttpRequest();
    
        request.open('get', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            if(request.status === 200){
                context.decodeAudioData(request.response, function (buffer) {
                    resolve(buffer);
                });
            } else {
                reject('tiny-sample-loader request failed');
            }

        };
        request.send();
    });
    
    return promise;
};
module.exports = sampleLoader;
},{}],4:[function(require,module,exports){
var samplePromise = require('./index');
var ctx = new AudioContext();

let promise = samplePromise(ctx, 'https://raw.githubusercontent.com/oramics/sampled/master/DM/CR-78/samples/bongo-h.wav').then(function(instrument){

    // Promise success. You have a simple audioBufferInstrument
    // Which you can get and connect
    var audioBuf = instrument.get();
    audioBuf.connect(ctx.destination);
    audioBuf.start(2);

    // More ravens
    var audioBuf2 = instrument.get();
    audioBuf2.connect(ctx.destination);
    audioBuf2.start(3);

    // And even more ravens
    var audioBuf3 = instrument.get();
    audioBuf3.connect(ctx.destination);
    audioBuf3.start(4);


}).catch(function(err){
    console.log(err)
});

},{"./index":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hdWRpby1idWZmZXItaW5zdHJ1bWVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aW55LXNhbXBsZS1sb2FkZXIvaW5kZXguanMiLCJ0ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciB0aW55U2FtcGxlTG9hZGVyID0gcmVxdWlyZSgndGlueS1zYW1wbGUtbG9hZGVyJyk7XG52YXIgYXVkaW9CdWZmZXJJbnN0cnVtZW50ID0gcmVxdWlyZSgnYXVkaW8tYnVmZmVyLWluc3RydW1lbnQnKTtcblxuZnVuY3Rpb24gZ2V0QXVkaW9TYW1wbGVQcm9taXNlIChjdHgsIHVybCkge1xuXG5cdHZhciBpbnN0cnVtZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IFxuXHRcdHZhciBwcm9taXNlID0gdGlueVNhbXBsZUxvYWRlcih1cmwsIGN0eCk7XG5cdFx0cHJvbWlzZS50aGVuKCAgKHZhbHVlKSA9PiB7XG4gICAgXHRcdHZhciAgaW5zdHJ1bWVudCA9IG5ldyBhdWRpb0J1ZmZlckluc3RydW1lbnQoY3R4LCB2YWx1ZSk7XG5cdFx0XHRyZXNvbHZlKGluc3RydW1lbnQpO1xuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0cmVqZWN0KHZhbHVlKTtcblx0XHR9KVxuXHR9KVxuXHRyZXR1cm4gaW5zdHJ1bWVudFByb21pc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QXVkaW9TYW1wbGVQcm9taXNlO1xuXG5cbiIsIi8vIEZyb206IGh0dHBzOi8vZGV2Lm9wZXJhLmNvbS9hcnRpY2xlcy9kcnVtLXNvdW5kcy13ZWJhdWRpby9cbmZ1bmN0aW9uIGF1ZGlvQnVmZmVySW5zdHJ1bWVudChjb250ZXh0LCBidWZmZXIpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xufVxuXG5hdWRpb0J1ZmZlckluc3RydW1lbnQucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc291cmNlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbn07XG5cbmF1ZGlvQnVmZmVySW5zdHJ1bWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc291cmNlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbn07XG5cbmF1ZGlvQnVmZmVySW5zdHJ1bWVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgdGhpcy5zZXR1cCgpO1xuICAgIHRoaXMuc291cmNlLnN0YXJ0KHRpbWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdWRpb0J1ZmZlckluc3RydW1lbnQ7IiwiZnVuY3Rpb24gc2FtcGxlTG9hZGVyICh1cmwsIGNvbnRleHQpIHtcbiAgICBcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsgXG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgXG4gICAgICAgIHJlcXVlc3Qub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmKHJlcXVlc3Quc3RhdHVzID09PSAyMDApe1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShidWZmZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ3Rpbnktc2FtcGxlLWxvYWRlciByZXF1ZXN0IGZhaWxlZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBwcm9taXNlO1xufTtcbm1vZHVsZS5leHBvcnRzID0gc2FtcGxlTG9hZGVyOyIsInZhciBzYW1wbGVQcm9taXNlID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGN0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxubGV0IHByb21pc2UgPSBzYW1wbGVQcm9taXNlKGN0eCwgJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9vcmFtaWNzL3NhbXBsZWQvbWFzdGVyL0RNL0NSLTc4L3NhbXBsZXMvYm9uZ28taC53YXYnKS50aGVuKGZ1bmN0aW9uKGluc3RydW1lbnQpe1xuXG4gICAgLy8gUHJvbWlzZSBzdWNjZXNzLiBZb3UgaGF2ZSBhIHNpbXBsZSBhdWRpb0J1ZmZlckluc3RydW1lbnRcbiAgICAvLyBXaGljaCB5b3UgY2FuIGdldCBhbmQgY29ubmVjdFxuICAgIHZhciBhdWRpb0J1ZiA9IGluc3RydW1lbnQuZ2V0KCk7XG4gICAgYXVkaW9CdWYuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgIGF1ZGlvQnVmLnN0YXJ0KDIpO1xuXG4gICAgLy8gTW9yZSByYXZlbnNcbiAgICB2YXIgYXVkaW9CdWYyID0gaW5zdHJ1bWVudC5nZXQoKTtcbiAgICBhdWRpb0J1ZjIuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgIGF1ZGlvQnVmMi5zdGFydCgzKTtcblxuICAgIC8vIEFuZCBldmVuIG1vcmUgcmF2ZW5zXG4gICAgdmFyIGF1ZGlvQnVmMyA9IGluc3RydW1lbnQuZ2V0KCk7XG4gICAgYXVkaW9CdWYzLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICBhdWRpb0J1ZjMuc3RhcnQoNCk7XG5cblxufSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG59KTtcbiJdfQ==
