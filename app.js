let password = document.querySelector("#passbar")

document.querySelector('.eye-svg').addEventListener('click', () => {
    if(password.type == 'password') {
        password.type = 'text'
    }
    else { password.type = 'password' }
})

document.querySelector('.reg-btn').addEventListener('click', () => {
    if(document.querySelector('#pass1').value.length < 6) {
        return DisplayError('პაროლი უნდა იყოს მინიმუმ 6 ასო')
    }
    if(document.querySelector('#pass1').value != document.querySelector('#pass2').value) {
        return DisplayError('პაროლები არ ემთხვევა')
    }
    if(document.querySelector('.inputmail').value.includes("@") == false) {
        return DisplayError('არასწორი მეილი')
    }
    else {
        // - success, ამას რო მიიღებ მერე უკვე სქესი და რეებიცაა, ამ CEF'ს destroybrowser-ი უქენი
        cef.emit('data:pool:sucreg', document.querySelector('#pass1').value)
    }
})

let authname = document.querySelector("#namebar1")
cef.emit("data:pool:authname");
cef.on("data:pool:authname", (newname) => {
    authname.placeholder = `${newname}`
})

let regname = document.querySelector("#namebar2")
cef.emit("data:pool:regname")
cef.on("data:pool:regname", (newname) => {
    regname.placeholder = `${newname}`
})

/* -- თუ უკვე რეგისტრირებულია, Response სახით დააბრუნე 1 ხოლო თუ არაა დააბრუნე 2;
1 = Log In
2 = Register */
cef.emit("data:pool:auth");
cef.on('data:pool:auth', (response) => { 
    if(response == 1) {
        document.querySelector('.login').style.display = 'flex'
        document.querySelector('.register').style.display = 'none'
    }
    else {
        document.querySelector('.login').style.display = 'none'
        document.querySelector('.register').style.display = 'flex'
    }
}) 

// depiction of error
function DisplayError(errormsg) {
    document.querySelector('.error').style.display = 'flex'
    document.querySelector('.error-text span').textContent = errormsg
    setTimeout(() => {
        document.querySelector('.error').style.display = 'none'
        document.querySelector('.error-text span').textContent = ''
    }, 2500);
}

// AUTH

const logbtn = document.querySelector('.login-btn')

logbtn.addEventListener('click', () => {
    if(password.value == '') {
        DisplayError('შეიყვანეთ პაროლი')
    }
    cef.emit('data:pool:getpass', password.value)
})


// თუ პაროლი არასწორია პავნოდან უბრალოდ დააემიტე "data:pool:wrongpass"
cef.on('data:pool:wrongpass', () => {
    return DisplayError('პაროლი არასწორია')
})
