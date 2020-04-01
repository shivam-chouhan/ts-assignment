 interface DataType {
    firstName: string;
    middleName:string;
    lastName : string;
    email:string;
    phone:number;
    role:Role;
    address:string;
    length:number;
    data : Array<string>;
}
enum Role {ADMIN, DEVELOPER , MANAGER}
async function dataFetch(){
    let users:DataType[]=  await fetch("db.json")
     .then(resp=>{return(resp.json())})
     objUserTable.getUsers(users);
 }
class UserTable{
     getUsers(users:DataType[]){
        document.getElementById("loadData")!.style.display="none";
        document.getElementById("refreshData")!.style.display="block";
        document.getElementById("table")!.style.display="block";

     let tableData: HTMLTableElement = document.getElementById("userData") as HTMLTableElement;
        for(let i=0;i<users.length;i++)
        {
            let row:HTMLTableRowElement = tableData.insertRow();
            row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].firstName}</span>`
                  row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].middleName}</span>`
                  row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].lastName}</span>`
                  row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].email}</span>`
                  row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].phone}</span>`
                  row.insertCell().innerHTML = `<span id = "role${+i}"> ${Role[users[i].role]}</span>`
                  row.insertCell().innerHTML = `<span class = "element${+i}"> ${users[i].address}</span>`
                  row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "edit${+i}" value = "EDIT" onclick ="objUserTable.editRecord(this,${+i})" >`;
                  row.insertCell().innerHTML = `<input type = "button" class = "w3-button" id = "delete${+i}" value = "DELETE" onclick ="objUserTable.deleteRecord(this)" >`;
        }
    }
    deleteRecord(row:Node){
       let table :HTMLTableElement= document.getElementById("userData") as HTMLTableElement;
       let current:number = objUserTable.currentRow(row);
       table.deleteRow(current);
       
    }
    editRecord(rowElement:Node, rowNumber:number){
        let cloneData:Array<string>=[];
        let editButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
        editButton.setAttribute("value", "SAVE");
        editButton.onclick = function(){
            objUserTable.saveRecord(rowElement, rowNumber);
        }
        let deleteButton:HTMLButtonElement = document.getElementById("delete"+rowNumber) as HTMLButtonElement;
        deleteButton.setAttribute("value","CANCEL");
        deleteButton.onclick = function(){
            objUserTable.cancel(rowElement, cloneData,rowNumber);
        }
        for(let i=0;i<6;i++)
        {
            let selectedElements=document.getElementsByClassName("element"+rowNumber)[i];
            cloneData[i]=selectedElements.textContent!;
            selectedElements.setAttribute("contentEditable", "true");
        }
    }
    cancel(rowElement:Node , cloneData:string[], rowNumber:number){
        let current:number = objUserTable.currentRow(rowElement);
        console.log(current);
        for(let i=0;i<6;i++)
        {
            let selectedElements = document.getElementsByClassName("element"+rowNumber)[i];
            selectedElements.innerHTML = cloneData[i];
            selectedElements.setAttribute("contentEditable", "false");
        }
        let editButton :HTMLButtonElement=document.getElementById("edit"+rowNumber) as HTMLButtonElement;
        editButton.setAttribute("value", "EDIT");
        editButton.onclick=function(){
            objUserTable.editRecord(rowElement, rowNumber);
        }
        let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber) as HTMLButtonElement;
        deleteButton.setAttribute("value","DELETE");
        deleteButton.onclick = function(){
            objUserTable.deleteRecord(rowElement);
        }
    }
    currentRow(rowElement:Node){
        let currentRow :number= ((rowElement.parentNode as HTMLTableElement).parentNode as HTMLTableRowElement).rowIndex-2;
        return currentRow;
    }
    saveRecord(rowElement:Node,rowNumber:number){
        for(let i=0;i<6;i++)
        {
            let selectedElements = document.getElementsByClassName("element"+rowNumber)[i];
            selectedElements.setAttribute("contentEditable", "false");
        }
        let saveButton:HTMLButtonElement = document.getElementById("edit"+rowNumber) as HTMLButtonElement;
        saveButton.setAttribute("value", "EDIT");
        saveButton.onclick = function(){
            objUserTable.editRecord(rowElement,rowNumber);
        }
        let deleteButton:HTMLButtonElement=document.getElementById("delete"+rowNumber)as HTMLButtonElement;
        deleteButton.setAttribute("value", "DELETE");
        deleteButton.onclick = function(){
            objUserTable.deleteRecord(rowElement);
        }
    }
    refreshTable(){
        let table:HTMLTableElement= document.getElementById("userData")as HTMLTableElement;
        table.innerHTML="";
        dataFetch();
    }
}
let objUserTable = new UserTable();

