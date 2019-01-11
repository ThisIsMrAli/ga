import GA from './index';
const l1 = (x1, x2) => {
    return 1.5 + x1 * Math.sin(4 * Math.PI * x1) - x2 * Math.sin(20 * Math.PI * x2);
}
const l2 = (x0, x1, x2, x3, x4, x5, x6, x7) => {
    const args = [x0, x1, x2, x3, x4, x5, x6, x7];
    let counter = 0;
    for (let i = 0; i <= 7; i++) {
        const row = i;
        const col = args[i];
        // row
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == col) {
                return counter / 8;
            }
        }
        counter++;
        // diognal
        // for (var j = i + 1; j <= 7; j++) {
        //     if (args[j] == (col + (j - i))) {
        //         return counter / 24;
        //     }
        // }
        // counter++;
        // // inverse diognal
        // for (var j = i + 1; j <= 7; j++) {
        //     if (args[j] == (col - (j - i + 1))) {
        //         return counter / 24;
        //     }
        // }
        // counter++;


    }
    return counter / 8;
}
//var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2, 0.05);
var g2 = new GA([[0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7]], l2, 0, 1000, 1, 0.2, 0.05);
//console.log(g2.eval(), g2.chPopulations.length);
//console.log(l2(3,1,4,6,2,0,7,5))
var ch = g2.generateChrom();
console.log(ch);
console.log( g2.binReal('110',[0,7]))