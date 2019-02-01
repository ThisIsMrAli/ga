import GA from './../index';
const l2 = (x0, x1, x2, x3, x4, x5, x6, x7) => {
    const args = [x0, x1, x2, x3, x4, x5, x6, x7];
    let counter = 0;
    let moves = 24;
    for (let i = 0; i <= 7; i++) {
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
let g = new GA([[0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7]], l2, 0, 100, 100, 0, 0,"",0);
while (true) {
    for (let i = 0; i < generations.length; i++) {
        for (let j = 0; j < pc.length; j++) {
            for (var k = 0; k < pm.length; k++) {
                g.setGenerationCount(generations[i]);
                g.setCrossOverP(pc[j]);
                g.setMutaionP(pm[k]);
                let val = g.eval();
                console.log('try to get best result');
                if (val.answer === 1) {
                    let a = [val.answer, val.inputs, generations[i], pc[j], pm[k]];
                    console.log(a)
                    console.log('***************************');
                    console.log(`Answer is 1 for ${JSON.stringify(val.inputs)}`);
                    console.log('***************************');
                }
            }
        }
    }
}

