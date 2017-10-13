(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var tinySampleLoader = require('tiny-sample-loader');
var audioBufferInstrument = require('audio-buffer-instrument');

function getAudioSamplePromise (ctx, url) {

	var instrumentPromise = new Promise( (resolve, reject) => { 
		var promise = tinySampleLoader(ctx, url);
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
function sampleLoader (context, url) {
    
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

    // Get another buffer
    var audioBuf2 = instrument.get();
    audioBuf2.connect(ctx.destination);
    audioBuf2.start(3);

    // And yet another
    var audioBuf3 = instrument.get();
    audioBuf3.connect(ctx.destination);
    audioBuf3.start(4);


}).catch(function(err){
    console.log(err)
});

},{"./index":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hdWRpby1idWZmZXItaW5zdHJ1bWVudC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy90aW55LXNhbXBsZS1sb2FkZXIvaW5kZXguanMiLCJ0ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG52YXIgdGlueVNhbXBsZUxvYWRlciA9IHJlcXVpcmUoJ3Rpbnktc2FtcGxlLWxvYWRlcicpO1xudmFyIGF1ZGlvQnVmZmVySW5zdHJ1bWVudCA9IHJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1pbnN0cnVtZW50Jyk7XG5cbmZ1bmN0aW9uIGdldEF1ZGlvU2FtcGxlUHJvbWlzZSAoY3R4LCB1cmwpIHtcblxuXHR2YXIgaW5zdHJ1bWVudFByb21pc2UgPSBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4geyBcblx0XHR2YXIgcHJvbWlzZSA9IHRpbnlTYW1wbGVMb2FkZXIoY3R4LCB1cmwpO1xuXHRcdHByb21pc2UudGhlbiggICh2YWx1ZSkgPT4ge1xuICAgIFx0XHR2YXIgIGluc3RydW1lbnQgPSBuZXcgYXVkaW9CdWZmZXJJbnN0cnVtZW50KGN0eCwgdmFsdWUpO1xuXHRcdFx0cmVzb2x2ZShpbnN0cnVtZW50KTtcblx0XHR9KS5jYXRjaChmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdHJlamVjdCh2YWx1ZSk7XG5cdFx0fSlcblx0fSlcblx0cmV0dXJuIGluc3RydW1lbnRQcm9taXNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEF1ZGlvU2FtcGxlUHJvbWlzZTtcblxuXG4iLCIvLyBGcm9tOiBodHRwczovL2Rldi5vcGVyYS5jb20vYXJ0aWNsZXMvZHJ1bS1zb3VuZHMtd2ViYXVkaW8vXG5mdW5jdGlvbiBhdWRpb0J1ZmZlckluc3RydW1lbnQoY29udGV4dCwgYnVmZmVyKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbn1cblxuYXVkaW9CdWZmZXJJbnN0cnVtZW50LnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG59O1xuXG5hdWRpb0J1ZmZlckluc3RydW1lbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG59O1xuXG5hdWRpb0J1ZmZlckluc3RydW1lbnQucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbiAodGltZSkge1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgICB0aGlzLnNvdXJjZS5zdGFydCh0aW1lKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXVkaW9CdWZmZXJJbnN0cnVtZW50OyIsImZ1bmN0aW9uIHNhbXBsZUxvYWRlciAoY29udGV4dCwgdXJsKSB7XG4gICAgXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IFxuICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIFxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCd0aW55LXNhbXBsZS1sb2FkZXIgcmVxdWVzdCBmYWlsZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2FtcGxlTG9hZGVyO1xuIiwidmFyIHNhbXBsZVByb21pc2UgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgY3R4ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuXG5sZXQgcHJvbWlzZSA9IHNhbXBsZVByb21pc2UoY3R4LCAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL29yYW1pY3Mvc2FtcGxlZC9tYXN0ZXIvRE0vQ1ItNzgvc2FtcGxlcy9ib25nby1oLndhdicpLnRoZW4oZnVuY3Rpb24oaW5zdHJ1bWVudCl7XG5cbiAgICAvLyBQcm9taXNlIHN1Y2Nlc3MuIFlvdSBoYXZlIGEgc2ltcGxlIGF1ZGlvQnVmZmVySW5zdHJ1bWVudFxuICAgIC8vIFdoaWNoIHlvdSBjYW4gZ2V0IGFuZCBjb25uZWN0XG4gICAgdmFyIGF1ZGlvQnVmID0gaW5zdHJ1bWVudC5nZXQoKTtcbiAgICBhdWRpb0J1Zi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgYXVkaW9CdWYuc3RhcnQoMik7XG5cbiAgICAvLyBHZXQgYW5vdGhlciBidWZmZXJcbiAgICB2YXIgYXVkaW9CdWYyID0gaW5zdHJ1bWVudC5nZXQoKTtcbiAgICBhdWRpb0J1ZjIuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgIGF1ZGlvQnVmMi5zdGFydCgzKTtcblxuICAgIC8vIEFuZCB5ZXQgYW5vdGhlclxuICAgIHZhciBhdWRpb0J1ZjMgPSBpbnN0cnVtZW50LmdldCgpO1xuICAgIGF1ZGlvQnVmMy5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgYXVkaW9CdWYzLnN0YXJ0KDQpO1xuXG5cbn0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgY29uc29sZS5sb2coZXJyKVxufSk7XG4iXX0=
