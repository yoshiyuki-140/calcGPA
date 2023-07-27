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
        this.storeData();
        this.initTable(table); // コンテンツの初期化


        for (let i = 0; i < parseInt(totalSubjects, 10); i++) {
            var newRow = document.createElement("tr");

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
            table.appendChild(newRow);
        }
    }

    initTable(parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    storeData() {
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

