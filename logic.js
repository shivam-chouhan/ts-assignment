import { objUserTable } from "./userView.js";
let loadDataBtn = document.getElementById("loadData");
loadDataBtn.onclick = dataFetch;
export async function dataFetch() {
    let users = await fetch("db.json")
        .then(resp => { return (resp.json()); });
    objUserTable.getUsers(users);
}
let table = document.getElementById("table");
table.addEventListener("click", function (e) {
    listen(e);
});
function listen(event) {
    let eid = event.target.id;
    let b = document.getElementById(eid);
    let c = b.parentNode.parentNode.rowIndex;
    console.log(c);
}
