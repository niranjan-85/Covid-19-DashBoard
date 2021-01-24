// Dom elements 

const SubmitBtn = document.getElementById('submit');
const Username = document.getElementById('username');
const Password = document.getElementById('password');
const ErrorElem = document.querySelector('.error');
const AlertElem = document.querySelector('.alert');
const MessageElem = document.getElementById('error-msg')

//Error messages
const INPUT_ERR = "Invalid Input";
const PASSWORD_ERR = "Password should be atleast 8 characters long";
const SUCCESS = "Successful"


function CheckError(password){
    if(password.length < 8 && password.length > 0){
        PropogateMessage(0,PASSWORD_ERR)
    }
    else{
        PropogateMessage(0,INPUT_ERR);
    }
}

// Input invalid :

function PropogateMessage(isvalid,message){
    ErrorElem.style.display = "block";
    if(isvalid){
        AlertElem.classList.replace('alert-danger','alert-success');
    }
    MessageElem.innerHTML = message;
}

// Validation 

function isInvalid(username,password){
    if(username === "" || password === "" || password.length < 8){
        CheckError(password);
        return 1;
    }
    return 0;
}

SubmitBtn.addEventListener('click',(event)=>{
    if(isInvalid(Username.value,Password.value)){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        PropogateMessage(1,SUCCESS)
    }
})

