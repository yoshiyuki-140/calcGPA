
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

}


window.onload = function () {
    GPADataContole.setTableColumn();
    GPADataContole.addRow();
}
