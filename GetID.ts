import { objUserTable } from "./userView.js";
export class ClassGetID{
    passID(ID:string){
    let length = ID.length;
    let IDno = ID.charAt(length-1);
    if(ID=="delete"+IDno){
        let rowElement :Node= document.getElementById(ID)!;
        objUserTable.deleteRecord(rowElement)
    }
    else if(ID=="edit"+IDno){
        let rowElement:Node=document.getElementById(ID)!;
        let rowNumber = parseInt(IDno)
        objUserTable.editRecord(rowElement , rowNumber);
    }
    }
}
export let objClassGetID = new ClassGetID();