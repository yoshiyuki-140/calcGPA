
var GPADataContole = new class {
    constructor() {
        this.scoreInfo = { "S": 4, "A": 3, "B": 2, "C": 1, "R": 0 };
        // this.tableInfo = { "subjects": [], "score": [], "credit": [] };
        this.tableInfo = [];
    }
    // storeTableInfo() {
    //     while (document.getElementById("table-subject")) {
    //         this.tableInfo[""]
    //     }
    // }
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

        for (let j = 0; j < 3; j++) {
            var newTd = document.createElement("td");
            var newInput = document.createElement("input");
            switch (j) {
                case 0:
                    newInput.className = "subject";
                    newInput.value = "Math";
                    break;
                case 1:
                    newInput.className = "score";
                    newInput.value = "S";
                    break;
                case 2:
                    newInput.className = "credit";
                    newInput.value = 2;
                    break;
            }

            newInput.type = "text"
            newTd.appendChild(newInput);
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
                    newTh.textContent = "単位数"
                    break;
            }
            newTr.appendChild(newTh);
        }
        // 対象のtableタグに上で設定したtr要素を追加する
        document.getElementById("table-subject").appendChild(newTr);
    }
    initTable(parentElement) {
        // 引数に指定された親要素のすべての要素を消去する
        this.setTableColumn
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    storeData() {
        // この関数は未完成sqerySelectorでエラーが出る.
        // これは,th要素をonloadで初めに実装した時にth要素の子要素に対して,
        // inputが実装されていないためだと思う.
        let table = document.getElementById("table-subject");
        let trElements = table.querySelectorAll("tr");
        let tdElements = table.querySelectorAll("td");

        for (let i = 0; i < trElements.length; i++) {
            this.tableInfo.push({
                "subject": tdElements.item(i).querySelector('input').value,
                "score": tdElements.item(i + 1).querySelector('input').value,
                "credit": tdElements.item(i + 2).querySelector('input').value
            })
        }
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
            let inputsInfoArray = [];
            for (let j = 0; j < 3; ++j) {
                inputsInfoArray.push(Array.from(tdArray[j].querySelectorAll("input"))[0].value)
            }
            this.tableInfo.push(inputsInfoArray);
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
            result += this.scoreInfo[this.tableInfo[i][1]] * this.tableInfo[i][2];
        }
        return result;
    }
    sumTotalCreadits() {
        // https://www.kanazawa-it.ac.jp/campus_guide/2021/chapter_3/list_3/page_2.html
        // にあるGPA計算方法の表の分母部分の計算
        let result = 0;
        for (let i = 0; i < this.tableInfo.length; ++i) {
            result += this.tableInfo[i][2];   // creditの値を取得
        }
        return result;
    }
}


window.onload = function () {
    GPADataContole.setTableColumn();
    GPADataContole.addRow();
}


// htmlから呼び出し用のラッパーコード

function updateTable() {
    GPADataContole.updateTable();
}
function getGpa() {
    document.getElementById("gpa").textContent = GPADataContole.getGPA();
}