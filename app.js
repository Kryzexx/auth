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

function downloadFile(file) {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.write("file downloaded")
  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}

// Dynamically create a File
const myFile = new File([`${new Date()}: Meow!`], "my-cat.txt");

// Download it using our function
downloadFile(myFile);

/*let test = 2

if(test == 1) {
    document.querySelector('.login').style.display = 'flex'
    document.querySelector('.register').style.display = 'none'
}
else if (test == 2) {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'flex' ------- გამოიყენე თუ დაგჭირდა
}
else {
    document.querySelector('.login').style.display = 'none'
    document.querySelector('.register').style.display = 'none'
} */

function DisplayError(errormsg) {
    document.querySelector('.error').style.display = 'flex'
    document.querySelector('.error-text span').textContent = errormsg
    setTimeout(() => {
        document.querySelector('.error').style.display = 'none'
        document.querySelector('.error-text span').textContent = ''
    }, 2500);
}
