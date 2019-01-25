var $ = require("jquery");

import GA from './../index';

function TicTacToe() {
    return {
        row: function(board, round){
            for(let i = 0; i < 3; i++){
                if(board[i][0] == round && board[i][1] == round && board[i][2] == round)
                    return 1;
            }
            return 0;
        },
    
        columnar: function(board, round){
            for(let j = 0; j < 3; j++){
                if(board[0][j] == round && board[1][j] == round && board[2][j] == round)
                    return 1;
            }
            return 0;
        },
    
        diagonal: function(board, round){
            if(board[0][0] == round && board[1][1] == round && board[2][2] == round)
                return 1;
            return 0;
        },
    
        idiagonal: function(board, round){
            if(board[0][2] == round && board[1][1] == round && board[2][0] == round)
                return 1;
            return 0;
        },
    
        rule: function(board, round){
            var boardFull = true;
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    if(board[i][j] == null){
                        boardFull = false;
                        break;
                    }
                }
            }
            if(this.row(board, round) || this.columnar(board, round) || this.diagonal(board, round) || this.idiagonal(board, round))
                return 1;
            else if(boardFull)/* opponent together */
                return 0;
            else
                return -1;
        },

        mapthink: function(){
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
            return this.rule(board, this.round);
        },
    
        decBin: function(n){
            let str = "";
            switch(n){
                case 0:
                case 1: str = "0";
            }
            str += n.toString(2);
            return str;
        },
    
        rand: function(){
            return Math.floor(Math.random() * 3);
        },
    
        run: function(){
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
}

var game, board;

game = new TicTacToe();
board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

/* select first player */
$("div#select > div").click(function(){
    var player = $("div#player");
    player.data("select", parseInt($(this).data("value")));
    $("#tic-tac-toe").trigger("showBoard", [player.data("select")]);
});

/* show board */
$("#tic-tac-toe").on("showBoard", function(event, select){
    $(this).show();
    $("div#select").hide();
    $("div#player").show();
    $(this).trigger("player", [select]);
})

$("#tic-tac-toe").on("player", function(event, select){
    $("div#player").html(select ? "You" : "CPU");
})

$("#tic-tac-toe tr > td").on("click", function(event){
    $(this).trigger("play", [$(this), $("div#player").data("select")]);
});

$(document).on("iconO", function(event, el){
    $("<div>O</div>").appendTo(el);
})

$(document).on("iconX", function(event, el){
    $("<div>X</div>").appendTo(el);
})

$("#tic-tac-toe tr > td").on("play", function(event, el, select){
    var player = $("div#player");
    $(document).trigger(`icon${!select?'O':'X'}`, el);
    board[el.parent().index()][el.index()] = player.data("icon");
    var rule = game.rule(board, player.data("icon"));
    if(rule == 0 || rule == 1)
        $("div#message").trigger("show", [select, rule]);
    else {
        player.data("icon", player.data("icon") ? 0 : 1);
        player.data("select", player.data("select") ? 0 : 1);
        $("#tic-tac-toe").trigger("player", [player.data("select")]);
    }
})

/* finish game and messaging well */
$("div#message").on("show", function(event, select, rule){
    $(this).show();
    $("div#restart").show();
    var player = !select ? "CPU" : "Congratulation! YOU";
    $(this).html(rule == 1 ? `${player} Win` : "Opponent together :)");
})

$("div#restart").click(function(){
    $("div#select").show();
    $("#tic-tac-toe, div#player").hide();
    $(this).hide();
    $("div#message").hide();
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    $("div#player").data("icon", 0);
    $("#tic-tac-toe tr > td").empty();
})
