import GA from './index';

class Think {
    round;

    constructor(round){
        this.round = round;
    }

    mapthink(){
        let round = 0;
        let index = [];
        let board = [];
        board.push([null,null,null]);
        board.push([null,null,null]);
        board.push([null,null,null]);
        for(let i = 0; i < arguments.length; i += 2){
            let c = [arguments[i],arguments[i+1]];
            for(let j = 0; j < index.length; j++)
                if(c[0] == 3 || c[1] == 3 || (index[j] != undefined && index[j][0] == c[0] && index[j][1] == c[1])){
                    return -1;
                }
            index.push(c);
            board[arguments[i]][arguments[i+1]] = round;
            round = round == 0 ? 1 : 0;
        }
        let game = new TicTacToe();
        return game.rule(board, this.round);
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

    rand(){
        return Math.floor(Math.random() * 3);
    }

    run(){
        let initch = "";
        /* provide all domains */
        let domain = []; /* container */
        let n = 2 * 9; /* 9 cells include 2 properties as row and col */
        for(let i = 0; i < n; i++)
            domain.push([0, 2]); /* 00, 01, 10. add it 18 times to container as domain */
        let ga = new GA(domain, this.map, 0, 100, 600, 0.4, 0.3, initch, 0);
        let bestInput;
        let countRound = 0;
        while(true){
            if(round){
                let cell = prompt("Which do you insert symbol at Row and Col");
                let row = parseInt(cell.split(',')[0]);
                let col = parseInt(cell.split(',')[1]);
                initch += decBin(row) + decBin(col);
                round = !round;
                countRound += 1;
            } else {
                if(countRound){
                    ga.setInitChromosome(initch);                
                    while(true){
                        let evalation = ga.eval();
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
        }        
    }

}

class TicTacToe {

    row(board, round){
        for(let i = 0; i < 3; i++){
            if(board[i][0] == round && board[i][1] == round && board[i][2] == round)
                return 1;
        }
        return 0;
    }

    columnar(board, round){
        for(let j = 0; j < 3; j++){
            if(board[0][j] == round && board[1][j] == round && board[2][j] == round)
                return 1;
        }
        return 0;
    }

    diagonal(board, round){
        if(board[0][0] == round && board[1][1] == round && board[2][2] == round)
            return 1;
        return 0;
    }

    idiagonal(board, round){
        if(board[0][2] == round && board[1][1] == round && board[2][0] == round)
            return 1;
        return 0;
    }

    rule(board, round){
        if(!board) /* conflict index */
            return -1;
        else if(this.row(board, round) || this.columnar(board, round) || this.diagonal(board, round) || this.idiagonal(board, round))
            return 1;
        else /* opponent together */
            return 0;
    }

}

function mapthink(){
    let round = 0;
    let index = [];
    let board = [];
    board.push([null,null,null]);
    board.push([null,null,null]);
    board.push([null,null,null]);
    for(let i = 0; i < arguments.length; i += 2){
        let c = [arguments[i],arguments[i+1]];
        for(let j = 0; j < index.length; j++)
            if(c[0] == 3 || c[1] == 3 || ( index[j] != undefined && index[j][0] == c[0] && index[j][1] == c[1])){
                return false;
            }
        index.push(c);
        board[c[0]][c[1]] = round;
        round = round == 0 ? 1 : 0;
    }
    let game = new TicTacToe();
    return game.rule(board, 0);
}


let think = new Think(0);
let initch = "0000";
/* provide all domains */
let domain = [[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3]]; /* container 00, 01, 10. add it 18 times to container as domain */
let g = new GA(domain, mapthink, 0, 100, 400, 0.15, 0.3,initch,0);
while (true) {
    let val = g.eval();
    console.log('try to get best result');
    if (val.answer === 1) {
        console.log(val);
        break;
    }
}
