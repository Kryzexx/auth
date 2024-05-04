let password = document.querySelector(".passbar")

document.querySelector('.eye-svg').addEventListener('click', () => {
    if(password.type == 'password') {
        password.type = 'text'
    }
    else { password.type = 'password' }
})

document.querySelector('.reg-btn').addEventListener('click', () => {
    if(document.querySelector('#pass1').value != document.querySelector('#pass2').value) {
        return DisplayError('პაროლები არ ემთხვევა')
    }
    if(document.querySelector('.inputmail').value.includes("@") == false) {
        return DisplayError('არასწორი მეილი')
    }
})

let test = 2

if(test == 1) {
    document.querySelector('.login').style.display = 'flex'
    document.querySelector('.register').style.display = 'none'
}
else if (test == 2) {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'flex'
}
else {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'none'
} 

function DisplayError(errormsg) {
    document.querySelector('.error').style.display = 'flex'
    document.querySelector('.error-text span').textContent = errormsg
    setTimeout(() => {
        document.querySelector('.error').style.display = 'none'
        document.querySelector('.error-text span').textContent = ''
    }, 2500);
}
