
var GPADataContole = new class {
    constructor() {
        this.scoreInfo = { "S": 4, "A": 3, "B": 2, "C": 1, "R": 0 };
        // this.tableInfo = { "subjects": [], "score": [], "credit": [] };
        this.tableInfo = [];
    }
    initTable(parentElement) {
        // 引数に指定された親要素のすべての要素を消去する
        this.setTableColumn
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }
    updateTable() {
        var totalSubjects = document.getElementById("input-total-subjects").value;
        var table = document.getElementById("table-subject");
        this.initTable(table); // コンテンツの初期化
        this.setTableColumn();

        for (let i = 0; i < parseInt(totalSubjects, 10); i++) {
            this.addRow()
        }
    }


    addRow() {
        var newRow = document.createElement("tr");
        newRow.className = "tr-content";
        let Scores = Object.keys(this.scoreInfo);

        for (let j = 0; j < 3; j++) {
            var newTd = document.createElement("td");
            switch (j) {
                case 0:
                    var newInput = document.createElement("input");
                    newInput.className = "subject";
                    newInput.value = "";
                    newInput.type = "text"
                    newTd.appendChild(newInput);
                    break;
                case 1:
                    var newSelect = document.createElement("select");
                    for (let i = 0; i < Scores.length; ++i) {
                        let newOption = document.createElement("option");
                        newOption.value = Scores[i];    // これはvalueだけど一応評語の文字入れる
                        newOption.text = Scores[i];
                        newSelect.appendChild(newOption);
                    }
                    newSelect.className = "score";
                    newTd.appendChild(newSelect);
                    break;
                case 2:
                    var newSelect = document.createElement("select");
                    for (let i = 1; i <= 4; ++i) {
                        let newOption = document.createElement("option");
                        newOption.value = i;
                        newOption.text = i;
                        newSelect.appendChild(newOption);
                    }
                    newSelect.className = "credit";
                    newSelect.value = 2;
                    newTd.appendChild(newSelect);
                    break;
            }
            newRow.appendChild(newTd);
        }
        document.getElementById("table-subject").appendChild(newRow);
    }


    setTableColumn() {
        //  各要素のカラムを指定
        let newTr = document.createElement("tr");
        for (let i = 0; i < 3; ++i) {
            let newTh = document.createElement("th");
            switch (i) {
                case 0:
                    newTh.textContent = "科目"
                    break;
                case 1:
                    newTh.textContent = "評語"
                    break;
                case 2:
                    newTh.textContent = "単位"
                    break;
            }
            newTr.appendChild(newTh);
        }
        // 対象のtableタグに上で設定したtr要素を追加する
        document.getElementById("table-subject").appendChild(newTr);
    }



    // 取得したデータを計算時に使いやすいように配列にまとめる
    updatetableInfo() {
        this.tableInfo.splice(0);   // 要素0以上の要素をすべて削除
        let table = document.getElementById("table-subject");
        // let tableRowLength = table.rows.length;
        for (let i = 1; i < table.rows.length; ++i) {
            // this.tableInfo.push(["subject","score","scregit"])
            let tdArray = Array.from(table.rows[i].querySelectorAll("td"));
            // this.tableInfo.push([tdArray[0].querySelector("input").value, tdArray[1].querySelector("input").value, tdArray[2].querySelector("input").value]);
            let tdArrayInfo = [];

            tdArrayInfo.push(Array.from(tdArray[0].querySelectorAll("input"))[0].value)
            tdArrayInfo.push(Array.from(tdArray[1].querySelectorAll("select"))[0].value)
            tdArrayInfo.push(Array.from(tdArray[2].querySelectorAll("select"))[0].value)

            this.tableInfo.push(tdArrayInfo);
        }
    }

    getGPA() {
        this.updatetableInfo(); // 計算前に計算用のデータを作るこれでthis.tableInfoの内容が更新される



        // これが最終的なGPA
        let gpa = this.sum_Of_ProductsPointAndCredit() / this.sumTotalCreadits();
        return gpa;
    }
    sum_Of_ProductsPointAndCredit() {
        // scoreに入るのは,"S"とか"A"とか
        // 戻り値はpoint
        // 指定したscore以外の値を入れた時の例外とか入れるならここかな
        // https://www.kanazawa-it.ac.jp/campus_guide/2021/chapter_3/list_3/page_2.html
        // にあるGPA計算方法の表の分子部分の計算
        let result = 0;
        for (let i = 0; i < this.tableInfo.length; ++i) {
            result += this.scoreInfo[this.tableInfo[i][1]] * parseInt(this.tableInfo[i][2], 10);
        }
        return result;
    }
    sumTotalCreadits() {
        // https://www.kanazawa-it.ac.jp/campus_guide/2021/chapter_3/list_3/page_2.html
        // にあるGPA計算方法の表の分母部分の計算
        let result = 0;
        for (let i = 0; i < this.tableInfo.length; ++i) {
            result += parseInt(this.tableInfo[i][2], 10);   // creditの値を取得
        }
        return result;
    }
}


// htmlから呼び出し用のラッパーコード

function updateTable() {
    GPADataContole.updateTable();
}
function getGpa() {
    document.getElementById("gpa").textContent = GPADataContole.getGPA();
}

// 普通に関数として定義したかった奴ら
function initTotalSubjectsVariable() {
    // 7 * 5 = 35 だから最大値を35にした、一週間にとれる最大数(たぶん)
    let Select = document.getElementById("select-total-subjects");
    for (let i = 1; i < 35; ++i) {
        let newOption = document.createElement("option");
        newOption.value = i;
        newOption.text = i;
        Select.appendChild(newOption);
    }
}

window.onload = function () {
    GPADataContole.setTableColumn();
    GPADataContole.addRow();
    initTotalSubjectsVariable();
}

