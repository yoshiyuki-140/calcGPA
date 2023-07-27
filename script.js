var GPADataContole = new class {
    // constructor() {
    //     this.tableInfo = {}
    // }
    // storeTableInfo() {
    //     while (document.getElementById("table-subject")) {
    //         this.tableInfo[""]
    //     }
    // }
    updateTable() {
        var totalSubjects = document.getElementById("input-total-subjects").value;
        var table = document.getElementById("table-subject");
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
}

function clacGPA() {
}