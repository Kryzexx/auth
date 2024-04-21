let password = document.querySelector(".passbar")

document.querySelector('.eye-svg').addEventListener('click', () => {
    if(password.type == 'password') {
        password.type = 'text'
    }
    else { password.type = 'password' }
})