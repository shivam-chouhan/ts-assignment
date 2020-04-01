import { objAfterValidation } from "./afterValidation.js";
import { objShowError } from "./showError.js";

class Validate {
    validateFirstNlast(name:string){
        let firstNameRGEX = /[A-z]{1,10}$/;
    let firstNameResult = firstNameRGEX.test(name.trim());
    return firstNameResult;
    }
    validateEmail(email:string){
        let emailRGEX = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        let emailResult = emailRGEX.test(email.trim()); 
        return emailResult;
    }
    validatePhone(phone:string){
        let phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    let phoneResult = phoneRGEX.test(phone.trim());
    return phoneResult;
    }
    formValidate(rowElement:Node,rowNumber :number ,cloneData:string[]){
        let editedData:string[]=[];
let firstName = (document.getElementsByClassName("inputData")[0]as HTMLInputElement);
let middleName = (document.getElementsByClassName("inputData")[1]as HTMLInputElement);
let lastName= (document.getElementsByClassName("inputData")[2]as HTMLInputElement);
let email = (document.getElementsByClassName("inputData")[3]as HTMLInputElement);
let phone = (document.getElementsByClassName("inputData")[4]as HTMLInputElement);
let address = (document.getElementsByClassName("inputData")[5]as HTMLInputElement);
    let phoneResult = objValidation.validatePhone(phone.value);
    if(phoneResult)
    {
        editedData[4] = phone.value;
    }
    else{
        objShowError.passPhone(phone);
    }
    let firstNameResult = this.validateFirstNlast(firstName.value);
    if(firstNameResult)
    {
        editedData[0] = firstName.value;
    }
    else{
        objShowError.passFirst(firstName);
    }
    let middleNameResult = this.validateFirstNlast(middleName.value);
    if(middleNameResult||middleName.value.trim()==""){
        middleNameResult= true;
        editedData[1] = middleName.value;
    }
    else{
        objShowError.passMiddle(middleName);
    }
    let lastNameResult = this.validateFirstNlast(lastName.value);
    if(lastNameResult){
        editedData[2] = lastName.value;
    }
    else{
        objShowError.passLast(lastName);
    }
    let emailResult = this.validateEmail(email.value);
    if(emailResult)
    {
        editedData[3] = email.value;
    }
    else{
        objShowError.passEmail(email);
    }
        editedData[5]=address.value;
    if(phoneResult===false||firstNameResult===false||middleNameResult===false||lastNameResult===false||emailResult===false){
        return;
    }
    else{
        objAfterValidation.afterValidation(rowNumber,editedData)
        return 1;
    }
    }
    
}
export let objValidation = new Validate();
