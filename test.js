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
