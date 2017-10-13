
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


