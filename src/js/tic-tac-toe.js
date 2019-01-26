var $ = require("jquery");

import GA from './../index';

function TicTacToe(round) {
    this.round = round;
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
            let game = new TicTacToe(0);
            let round = 0;
            let index = [];
            let board = [
                [null,null,null],
                [null,null,null],
                [null,null,null]
            ];
            console.log(arguments);
            for(let i = 0; i < arguments.length; i += 2){
                let c = [arguments[i],arguments[i+1]];
                for(let j = 0; j < index.length; j++)
                    if(c[0] == 3 || c[1] == 3 || (index[j] != undefined && index[j][0] == c[0] && index[j][1] == c[1]))
                        return -1;
                index.push(c);
                board[arguments[i]][arguments[i+1]] = round;
                round = round == 0 ? 1 : 0;
            }
            return game.rule(board, this.round);
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

        convertSequence2Choromosome: function(sequence){
            let ch = "";
            sequence.forEach(function(v){
                v.forEach(function(u){
                    ch += game.decBin(u);
                })
            })
            return ch;
        },
    
        run: function(sequence){
            let game = new TicTacToe(0);
            if(!sequence.length)
                return [game.rand(), game.rand()];
            let bestInput = null;
            let domain = [
                [0,3],[0,3],[0,3],
                [0,3],[0,3],[0,3],
                [0,3],[0,3],[0,3],
                [0,3],[0,3],[0,3]
            ];
            let g = new GA(domain, game.mapthink, 0, 100, 400, 0.15, 0.3, game.convertSequence2Choromosome(sequence), 0);
            for(let i = 0; i < sequence.length - 3; i++){
                domain.push([0,3]);
                domain.push([0,3]);
                g.setInputs(domain);
            }
            console.log("CPU is thinking...");
            let choice;
            let index = 2 * sequence.length;
            while(true){
                var i = 0;
                while(i < 20){
                    let val = g.eval();
                    if (val.answer){
                        choice = [val.inputs[index],val.inputs[index + 1]];
                        console.log(choice);
                        return choice;
                    }
                    i++;
                }
                while(i < 40){
                    val = g.eval();
                    if(!val.answer)
                        choice = [val.inputs[index],val.inputs[index + 1]];
                        console.log(choice);
                        return choice;
                    i++;
                }
            }
        }
    }
}

var player = $("div#player");
var game = new TicTacToe(0);
$(document).on("reset", function(){
    player.data({board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]});
    player.data("icon", 0);
    player.data("sequence", []);
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
    else {
        cell.removeClass("human");
        $(document).trigger("cpu");
    }
})

$(document).on("cpu", function(){
    $(this).trigger("play", game.run(player.data("sequence")));
})

$("#game table tr > td").on("click", function(event){
    if(!player.data("select"))
        return;
    $(document).trigger("play", [$(this).parent().index(), $(this).index()]);
});

$(document).on("icon", function(event, el){
    $(`<div>${!player.data("icon") ? 'O' : 'X'}</div>`).appendTo(el);
})

$(document).on("play", function(event, row, col){
    var el = $(`#game table tr:nth-child(${row+1}) > td:nth-child(${col+1})`);
    var board = player.data("board");
    if(board[row][col] != null){ // conflict index
        el.addClass("error");
        setTimeout(function(){
            el.removeClass("error");
        }, 1000);
        return;
    }
    var sequence = player.data("sequence");
    sequence.push([row, col]);
    player.data("sequence", sequence);
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
