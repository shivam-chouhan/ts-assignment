import {DataType} from "./interface.js";
import {objUserTable } from "./userView.js";
import { addEvent } from "./ButtonsAction.js";
export async function dataFetch(){
    let users:DataType[]=  await fetch("db.json")
     .then(resp=>{return(resp.json())})
     objUserTable.getUsers(users);
     addEvent();
 }