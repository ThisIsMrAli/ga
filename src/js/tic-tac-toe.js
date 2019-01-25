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

var player = $("div#player");
var game = new TicTacToe();

$(document).on("reset", function(){
    player.data({board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]});
    player.data("icon", 0);
})

$(document).trigger("reset", []);

/* select first player */
$("div#select > div").click(function(){
    player.data("select", parseInt($(this).data("value")));
    $(document).trigger("showBoard");
});

/* show board */
$(document).on("showBoard", function(event){
    $("#game table").show();
    $("div#select").hide();
    player.show();
    $(this).trigger("player");
})

$(document).on("player", function(event){
    player.html(player.data("select") ? "You" : "CPU");
    var cell = $("#game table tr > td");
    if(player.data("select") == 1)
        cell.addClass("human");
    else
        cell.removeClass("human");
})

$("#game table tr > td").on("click", function(event){
    if(!player.data("select"))
        return;
    $(this).trigger("play", [$(this), player.data("select")]);
});

$(document).on("icon", function(event, el){
    $(`<div>${!player.data("icon") ? 'O' : 'X'}</div>`).appendTo(el);
})

$("#game table tr > td").on("play", function(event, el){
    var row = el.parent().index();
    var col = el.index();
    var board = player.data("board");
    if(board[row][col] != null){ // conflict index
        el.addClass("error");
        setTimeout(function(){
            el.removeClass("error");
        }, 1000);
        return;
    }
    $(document).trigger("icon", [el, row, col]);
    board[row][col] = player.data("icon");
    player.data("board", board);
    var rule = game.rule(player.data("board"), player.data("icon"));
    if(rule == 0 || rule == 1)
        $("div#message").trigger("show");
    else {
        player.data("icon", player.data("icon") ? 0 : 1);
        player.data("select", player.data("select") ? 0 : 1);
        $(document).trigger("player", [player.data("select")]);
    }
})

/* finish game and messaging well */
$("div#message").on("show", function(event){
    $(this).show();
    $("div#replay").show();
    var who = !player.data("select") ? "CPU" : "Congratulation! YOU";
    $(this).html(game.rule(player.data("board"),player.data("icon")) == 1 ? `${who} Win` : "Opponent together :)");
})

$("div#replay").on("click", function(){
    $(document).trigger("reset");
    $("div#select").show();
    $("#game table, div#player").hide();
    $(this).hide();
    $("div#message").hide();
    $("#game table tr > td").empty();
})
