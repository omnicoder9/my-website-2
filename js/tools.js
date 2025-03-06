//password generator
function generatePassword() {
    //const length = document.getElementById("length").value;
    let length = document.getElementById("length").value;
    length = Math.max(8, Math.min(40, parseInt(length, 10) || 8));
    document.getElementById("length").value = length;
    const includeSpecial = document.getElementById("specialChars").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeCapitals = document.getElementById("capitalLetters").checked;

    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeSpecial) chars += "!@#$%^&*()_+{}[]|:;<>,.?/";
    if (includeNumbers) chars += "0123456789";
    if (includeCapitals) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("password").textContent = password;
}

function copyPassword() {
    const passwordText = document.getElementById("password").textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Password copied to clipboard!");
    });
}