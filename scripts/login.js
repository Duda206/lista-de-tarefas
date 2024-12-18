function loginUser() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("logged", JSON.stringify({ email: user.email, loggedIn: true }));

        document.getElementById("email").value = "";

        alert("Login bem-sucedido!");
        window.location.href = "/index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}
