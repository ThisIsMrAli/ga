import GA from './index';
const l1 = (x1, x2) => {
    return 21.5 + x1 * Math.sin(4 * Math.PI * x1) - x2 * Math.sin(20 * Math.PI * x2);
}
const l2 = (x0, x1, x2, x3, x4, x5, x6, x7) => {
    const args = [x0, x1, x2, x3, x4, x5, x6, x7];
    let counter = 0;
    let moves = 24;
    for (let i = 0; i <= 7; i++) {
        const row = i;
        const col = args[i];
        // row
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == col) {
                return counter / moves;
            }
        }
        counter++;
        // diognal
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == (col + (j - i))) {
                return counter / moves;
            }
        }
        counter++;
        // inverse diognal
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == (col - (j - i + 1))) {
                return counter / moves;
            }
        }
        counter++;


    }
    return counter / moves;
}
let generations = [500, 550, 800];
let pc = [0.3, 0.4, 0.5, 0.7, 0.8];
let pm = [0.01, 0.02, 0.04, 0.04, 0.06, 0.08]
let g2 = new GA([[0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7]], l2, 0, 200, 100, 0, 0);
// let maxs = [];
// let max = [0];
// for (let i = 1; i < generations.length; i++) {
//     // var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2,0.05 );
//     for (let j = 0; j < pc.length; j++) {
//         //console.log(g2.eval(), g2.chPopulations.length);
//         //console.log(l2(3,1,4,6,2,0,7,5))
//         for (var k = 0; k < pm.length; k++) {
//             g2.setGenerationCount(generations[i]);
//             g2.setCrossOverP(pc[j]);
//             g2.setMutaionP(pm[k]);
//             let eval = g2.eval();
//             if(eval.answer > max[0]){
//                 let a = [eval.answer,generations[i], pc[j], pm[k]];
//                 max = a;
//                 console.log(a)
//             }
//         }
//         maxs.push(max);
//         max = [0];
//     }
// }
// console.log(maxs);




var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2,0.05 );

console.log(g.eval());
