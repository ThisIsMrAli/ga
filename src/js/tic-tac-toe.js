var $ = require("jquery");
import TicTacToe from './TicTacToe';

var player = $("div#player");
var game = new TicTacToe();
/* game.setRound(0);
let board = game.convertIndex2Board([[0,2],[2,2],[2,0]]);
console.log(board);
console.log(game.defenceIDiagonal(board));
 */
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
    game.setRound(0);
    $(this).trigger("play", game.run(player.data("sequence")));
})

$("#game table tr > td").on("click", function(event){
    if(!player.data("select"))
        return;
    game.setRound(1);
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
    var who = !player.data("select") ? "CPU" : "YOU";
    $(this).html(game.rule(player.data("board"),player.data("icon")) == 1 ? `${who} Win` : "Opponent");
})

$("div#replay").on("click", function(){
    $(document).trigger("reset");
    $("div#select").show();
    $("#game table, div#player").hide();
    $(this).hide();
    $("div#message").hide();
    $("#game table tr > td").empty();
})
