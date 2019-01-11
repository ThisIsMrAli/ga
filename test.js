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
            if (args[j] == args[i]) {
                return counter / moves;
            }
        }
        counter++;
        // diognal
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == (args[i] + (j - i))) {
                return counter / moves;
            }
        }
        counter++;
        // inverse diognal
        for (var j = i + 1; j <= 7; j++) {
            if (args[j] == (args[i] - (j - i))) {
                return counter / moves;
            }
        }
        counter++;


    }
    return counter / moves;
}
let generations = [400, 450, 500, 550, 600, 1000];
let pc = [0.15, 0.2, 0.3, 0.4];
let pm = [0.3, 0.02, 0.05, 0.1, 0.2];
let g2 = new GA([[0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7]], l2, 0, 100, 100, 0, 0);
let maxs = [];
let max = [0];
while (true) {
    for (let i = 0; i < generations.length; i++) {
        // var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2,0.05 );
        for (let j = 0; j < pc.length; j++) {
            //console.log(g2.eval(), g2.chPopulations.length);
            //console.log(l2(3,1,4,6,2,0,7,5))
            for (var k = 0; k < pm.length; k++) {
                g2.setGenerationCount(generations[i]);
                g2.setCrossOverP(pc[j]);
                g2.setMutaionP(pm[k]);
                let eval = g2.eval();
                // let a = [eval.answer, eval.inputs, generations[i], pc[j], pm[k]];
                // max = a;
                // console.log(a)
                if (eval.answer === 1) {
                    let a = [eval.answer, eval.inputs, generations[i], pc[j], pm[k]];
                    max = a;
                    console.log(a)
                    console.log('***************************');
                    console.log(`Answer is 1 for ${JSON.stringify(eval.inputs)}`);
                    console.log('***************************');
                }
            }
        }
    }
}

console.log(l2(4, 6, 0, 2, 7, 5, 3, 1))





var g = new GA([[-3, 12.1], [4.1, 5.8]], l1, 5, 100, 1000, 0.2, 0.05);

console.log(g.eval());
