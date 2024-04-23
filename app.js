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

function downloadTextFile() {
    // Text content of the file
    const textContent = "This is the content of your text file.";

    // Create a Blob object from the text content
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor tag
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yourfile.txt'; // Set the desired filename

    // Append the anchor tag to the document body and click it programmatically
    document.body.appendChild(a);
    a.click();

    // Cleanup by revoking the temporary URL
    URL.revokeObjectURL(url);
}


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
