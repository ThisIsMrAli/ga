import GA from './index';

/*
* Tic-Tac-Toe example for manipulation chromosome
* @param 
* return the best row and col for win or equal like 0111 => (1,2)
*/
const TicTacToe = () => {

}

/* provide all domains */
let subdomain = [0, 2]; /* 00, 01, 10. add it 18 times to container as domain */
let domain = []; /* container */
let n = 2 * 9; /* 9 cells include 2 properties as row and col */
for(let i:Number; i < n; i++)
    domain.push([]);
domain.fill(subdomain, 0, n);

let g = new GA(domain, TicTacToe, 0, 100, 100, 0, 0, "01111101", 0);

g.eval();
