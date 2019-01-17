import GA from './index';

function rand(){
    return Math.ceil(Math.random() * 2);
}

function decBin(n){
    let str = "";
    switch(n){
        case 0:
        case 1: str = "0";
    }
    str += n.toString(2);
    return str;
}

function TicTacToe(){    

    /*
    * Tic-Tac-Toe example for manipulation chromosome
    * @param 
    * return the best row and col for win or equal like 0111 => (1,2)
    */
    const Logic = (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17) => {
        /* if round is zero circle and one is cross */
        let args;
        if(!round){
            args = [x0,x1,x4,x5,x8,x9,x12,x13,x16,x17];
        } else {
            args = [x2,x3,x6,x7,x10,x11,x14,x15];
        }
        function map(){
            return 0;
        }
        function row(){            
            return 1;
        }
        function columnar(){
            return 1;
        }
        function diagonal(){
            return 1;
        }
        function idiagonal(){
            return 1;
        }
        function conflictIndex(){
            return -1;
        }

        if(row() || columnar() || diagonal() || idiagonal())
            return 1;
        else if(conflictIndex())
            return -1;
        else
            return 0;
    }

    /* detemining who play */
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
}

TicTacToe();
