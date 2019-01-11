import GA from './index';
const l1 = (x1, x2) => {
    return 21.5 + x1 * Math.sin(4 * Math.PI * x1) - x2 * Math.sin(20 * Math.PI * x2);
}
//const l2 = (x,)
var g = new GA([[-3, 12.1], [4.1, 5.8]], 100, 1000, l1, 5, 0.2, 0.05);
//var g2 = new GA([[0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7]], 100,1000, () => { }, 0);
//var e = g2.generateChrom().substr(0, 3);
//console.log(e,g2.binDec(e),g2.binReal(e,[0,7]));
console.log(g.eval())