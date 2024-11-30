
function addUser() {
    let name = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    alert("Usuário cadastrado com sucesso!");
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}