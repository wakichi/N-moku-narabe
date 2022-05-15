dx=[1,1,0,-1];
dy=[0,1,1,1];
class Board{
    constructor(hgt, wid, len){
        this.turn = 0
        this.height = Number(hgt)
        this.width =Number(wid)
        this.win_length = Number(len)
        this.field = new Array(this.height);
        for (let x =0;x<this.height;x++){
            this.field[x] = new Array(this.width).fill("#");
        }
    }
    check(){
        // 勝敗と勝者を返す。
        //１が勝利：１
        //0が勝利：０
        //その他−１
        for (let i = 0;i<this.height*this.width;i++){
            //zahyo
            let x = i%this.width;
            let y=Math.floor(i/this.height)
            for (let dir =0;dir<4;dir+=1){
                //tate,yoko,mnaname
                let res = this.check_inner(x,y,dir)
                if (res != -1){
                    //決着
                    return res
                }
            }
        }
        //未決着
        return -1
    }
    check_inner(x,y,dir){
        let nx = x;
        let ny = y;
        let cnt_0 = 0
        let cnt_1 = 0
        let other = 0
        for (let i = 0; i<this.win_length;i++){
            if (nx<0 || ny<0 || nx>=this.width| ny>=this.height) break;
            let brd = this.field[ny][nx]
            if (brd == '1'){
                cnt_1++
            }
            else if(brd == '0'){
                cnt_0++
            }
            else other+=1
            nx+=dx[dir]
            ny+=dy[dir]
        }
        let flg=-1
        if (cnt_0 == this.win_length) flg=0;
        if (cnt_1 == this.win_length) flg=1;
        return flg
    }
}
var board;

function init(){
    // boardをtableとして表示します
    h_val=document.getElementById("hgt").value
    w_val=document.getElementById("wdt").value
    l_val=document.getElementById("len").value
    board= new Board(h_val,w_val,l_val);
    var fieldEle = document.getElementById("gomoku-field");
    var tableEle =document.createElement("table");
    for (let i = 0;i<board.height;i++){
        var tr = document.createElement("tr");
        for (var j = 0;j<board.width;j++){
            var td = document.createElement("td");
            // td.innerHTML = board.field[i][j].toString();
            // td.innerHTML = (i*3+j).toString(); // debug
            td.innerHTML = `<a id=field_${i*board.width+j} class="widelink" onclick="onClickBoard(this)">${board.field[i][j]}</a>`
            tr.appendChild(td)
        }
        tableEle.appendChild(tr);
    }
    // var rows = tableEle.insertRow(-1);
    fieldEle.appendChild(tableEle);
}

function onClickBoard(link){
    // boardの中身の変更
    var id = link.id;
    var id_num = id.split('_')[1]; // 一次元配列としたときの座標
    let x = id_num%board.width;
    let y=Math.floor(id_num/board.height)
    let tablecontentEle = document.getElementById(id);
    cnt = ""
    turn_num = board.turn%2
    if (turn_num == 0){cnt='0'}
    else {cnt='1'}
    tablecontentEle.textContent = cnt;
    board.field[y][x] = cnt
    board.turn+=1
    //turn の表示の変更
    //勝敗の確認
    res = board.check()
    // 状況に応じてメッセージを表示
    //決着
    if (res!=-1){
        alert(`player ${turn_num} win!!!!!`)
    }
    //未決着(turn の表示の変更)
    else{
        let turnEle = document.getElementById("turn");
        turnEle.textContent = `player ${turn_num}`
    }
}

function main(){
    // const canvas = document.getElementById('canvas_field');
    // const ctx = canvas.getContext('2d')
    init()
}