function generatePassword() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let password = "";
    const length = 12;

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    document.getElementById("password").value = password;
}

function copyPassword() {
    let passwordField = document.getElementById("password");

    if (passwordField.value === "") {
        alert("Generate a password first!");
        return;
    }

    navigator.clipboard.writeText(passwordField.value);
    alert("Password copied!");
}