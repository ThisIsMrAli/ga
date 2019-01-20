import GA from './index';

class TicTacToe(){

    constructor(){
        this.brain = [];
        this.brain.push([0,0,0]);
        this.brain.push([0,0,0]);
        this.brain.push([0,0,0]);
    }

    rand(){
        return Math.ceil(Math.random() * 2);
    }

    map(){
        for(let i = 0; i < args.length; i++)
            this.brain[args[i][0]][args[i][0]] = round;
    }

    row(){
        for(let i = 0; i < 3; i++){
            if(this.brain[i][0] == round && this.brain[i][1] == round && this.brain[i][2] == round)
                return 1;
        }
        return 0;
    }

    columnar(){
        for(let j = 0; j < 3; j++){
            if(this.brain[0][j] == round && this.brain[1][j] == round && this.brain[2][j] == round)
                return 1;
        }
        return 10
    }

    diagonal(){
        if(this.brain[0][0] == round && this.brain[1][1] == round && this.brain[2][2] == round)
            return 1;
        return 0;
    }

    idiagonal(){
        if(this.brain[0][2] == round && this.brain[1][1] == round && this.brain[2][0] == round)
            return 1;
        return 0;
    }

    conflictIndex(){
        args.map()
        return -1;
    }

    /*
    * Tic-Tac-Toe example for manipulation chromosome
    * @param 
    * return the best row and col for win or equal like 0111 => (1,2)
    */
    Logic(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17){
        this.map();
        if(this.row() || this.columnar() || this.diagonal() || this.idiagonal())
            return 1;
        else if(this.conflictIndex())
            return -1;
        else
            return 0;
    }

    decBin(n){
        let str = "";
        switch(n){
            case 0:
            case 1: str = "0";
        }
        str += n.toString(2);
        return str;
    }
}

let t = new TicTacToe();

/* if round is zero circle and one is cross */
let args = [];
if(!round){
    args.push(x0,x1);
    args.push(x4,x5);
    args.push(x8,x9);
    args.push(x12,x13);
    args.push(x16,x17);
} else {
    args.push(x2,x3);
    args.push(x6,x7);
    args.push(x10,x11);
    args.push(x14,x15);
}

let round = parseInt(prompt("CPU or Human? (0 or 1)"));
let initch = "";
/* provide all domains */
let domain = []; /* container */
let n = 2 * 9; /* 9 cells include 2 properties as row and col */
for(let i = 0; i < n; i++)
    domain.push([0, 2]); /* 00, 01, 10. add it 18 times to container as domain */
let cpu = new GA(domain, Logic, 0, 100, 600, 0.4, 0.3, initch, 0);
let bestInput;
let countRound = 0;
let i = 2;
while(i > 0){
    if(round){
        let cell = prompt("Which do you insert symbol at Row and Col");
        let row = parseInt(cell.split(',')[0]);
        let col = parseInt(cell.split(',')[1]);
        initch += decBin(row) + decBin(col);
        round = !round;
        countRound += 1;
    } else {
        if(countRound){
            cpu.setInitChromosome(initch);
        
            while(true){
                let evalation = cpu.eval();
                if(evalation.answer == 1 || evalation.answer == 0){
                    bestInput = evalation.inputs;
                    break;
                }
            }
        } else {
            bestInput = [rand(), rand()];
        }
        initch += decBin(bestInput[countRound]) + decBin(bestInput[countRound]);
        round = !round;
    }
    console.log(initch);
    i -= 1;
}
//console.log((!round ? "CPU" : "You") + (Logic() == 1 ? " won" : Logic() == 0 ? " equel" : "less") + "!");


