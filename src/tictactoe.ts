import GA from './index';

class Think {
    round;
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
        let bestInput;
        let countRound = 0;
        this.round = 0;
        let initch = "";
        let domain = [[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3],[0,3]];
        let g = new GA(domain, this.mapthink, 0, 100, 400, 0.15, 0.3, initch, 0);
        let win = -1;
        let capacity = 3;
        let icapacity = 0;
        let game = new TicTacToe();
        while(win == -1){
            if(this.round){
                let cell = "0,0";
                let row = parseInt(cell.split(',')[0]);
                let col = parseInt(cell.split(',')[1]);
                initch += this.decBin(row) + this.decBin(col);
                this.round = !this.round;
                countRound += 2;
                win = game.rule(this.board, 1);
            } else {
                if(countRound){
                    if(icapacity > capacity){
                        domain.push([0,3]);
                        domain.push([0,3]);
                        g.setInputs(domain);
                    }
                    icapacity++;
                    g.setInitChromosome(initch);
                    let val;
                    let ft = 20; /* final tried */
                    let tried = 0;
                    while (tried < ft) {
                        console.log('Thinking...');
                        val = g.eval();
                        if (val.answer === 1) {
                            bestInput = [val.inputs[countRound],val.inputs[countRound + 1]];
                            break;
                        }
                        tried++;
                    }
                    tried = 0;
                    while(tried < ft){
                        console.log('Thinking for oppenent...');
                        val = g.eval();
                        if(val.answer === 0){
                            bestInput = [val.inputs[countRound],val.inputs[countRound + 1]];
                            break;            
                        }
                        tried++;
                    }        
                } else {
                    bestInput = [this.rand(), this.rand()];
                }
                countRound += 2;
                initch += this.decBin(bestInput[0]) + this.decBin(bestInput[1]);
                win = game.rule(this.board, 0);
                this.round = !this.round;
            }    
        }
        let str = "";
        if(win == 0){
            str = "opponent";
        } else if(win == 1){
            str = "win"
        }
        this.round = !this.round;
        let player = this.round == 0 ? "cpu" : "human";
        console.log(`${player}  ${str}`);
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

let think = new Think();
think.run();
