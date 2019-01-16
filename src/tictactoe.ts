import GA from './index';

/*
* Tic-Tac-Toe example for manipulation chromosome
* @param 
* return the best row and col for win or equal like 0111 => (1,2)
*/
const TicTacToe = (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18) => {
    const args = [x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18];
    const player = parseInt(x0); /* zero is circle and one is cross */
    let pos = [];
    for(let i = 0; i < 9; i++){
        let index = !player ? 2*i : 2*i+1;
        pos.push([args[index],args[index+1]);
    }
    for(let i = 0; i < 2; i++){

    }
}

/* provide all domains */
let domain = []; /* container */
domain.push([0,1]); /* player */
let n = 2 * 9; /* 9 cells include 2 properties as row and col */
for(let i:Number = 0; i < n; i++)
    domain.push([0, 2]); /* 00, 01, 10. add it 18 times to container as domain */
let g = new GA(domain, TicTacToe, 0, 100, 600, 0.4, 0.3, "00000", 0);
console.log(g.eval());
