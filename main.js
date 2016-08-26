require('aframe');
require('../index.js');


// var Pd = require('webpd');
// // var patchStr = '#N canvas 779 588 450 300 10;\n'+
// //   '#X obj 126 171 outlet~;\n'+
// //   '#X obj 140 40 inlet~;\n'+
// //   '#X obj 150 111 osc~ 500;\n'+
// //   '#X connect 1 0 2 0;\n'+
// //   '#X connect 2 0 0 0;';
//
// var patchStr = '#N canvas 51 96 762 387 10;\n'+
//   '#X obj 127 161 dac~;\n'+
//   '#X obj 128 101 line~;\n'+
//   '#X obj 128 40 loadbang;\n'+
//   '#X msg 128 71 220;\n'+
//   '#X msg 199 70 \$1 1000;\n'+
//   '#X obj 199 40 r freq;\n'+
//   '#X obj 128 130 phasor~;\n'+
//   '#X connect 1 0 6 0;\n'+
//   '#X connect 2 0 3 0;\n'+
//   '#X connect 3 0 1 0;\n'+
//   '#X connect 4 0 1 0;\n'+
//   '#X connect 5 0 4 0;\n'+
//   '#X connect 6 0 0 0;\n'+
//   '#X connect 6 0 0 1;\n';
//
// var patch = Pd.loadPatch(patchStr);
//
// Pd.start();