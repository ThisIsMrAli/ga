import GA from './index';

class TicTacToe {
    board = [];
    round;
    args = [];
    constructor(round){
        this.board.push([null,null,null]);
        this.board.push([null,null,null]);
        this.board.push([null,null,null]);        
        this.round = round;
    }
    setArguments(x0 = 0,x1 = 0,x2 = 0,x3 = 0,x4 = 0,x5 = 0,x6 = 0,x7 = 0,x8 = 0,x9 = 0,x10 = 0,x11 = 0,x12 = 0,x13 = 0,x14 = 0,x15 = 0,x16 = 0,x17 = 0){
        if(!this.round){
            this.args.push([x0,x1]);
            this.args.push([x4,x5]);
            this.args.push([x8,x9]);
            this.args.push([x12,x13]);
            this.args.push([x16,x17]);
        } else {
            this.args.push([x2,x3]);
            this.args.push([x6,x7]);
            this.args.push([x10,x11]);
            this.args.push([x14,x15]);
        }
    }
    map(){
        for(let i = 0; i < this.args.length; i++)
            console.log(this.args[i][0],this.args[i][1]);
            // this.board[this.args[i][0]][this.args[i][1]] = this.round;
    }
}

let game = new TicTacToe(1);
