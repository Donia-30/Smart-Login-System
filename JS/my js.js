var users = JSON.parse(localStorage.getItem("users")) || [];

//Regex check password
function isValidEmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

//password has capital character
function hasUpperCase(password) {
    var regex = /[A-Z]/;
    return regex.test(password);
}
 
//password has number
function hasNumber(password) {
    var regex = /\d/;
    return regex.test(password);
}

//password has special character?
function hasSpecialCharacter(password) {
    var regex = /[\W_]/;  // الرموز الخاصة مثل !, @, #, $, %
    return regex.test(password);
}

// length of password
function isValidLength(password) {
    return password.length >= 8;
}

// (Sign Up)
function signUp() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    var incorrectMessage = document.getElementById("incorrect");

    // check entered inputs
    if (!name || !email || !password) {
        incorrectMessage.textContent = "All inputs are required.";
        return;
    }

    // check email
    if (!isValidEmail(email)) {
        incorrectMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // check password
    if (!isValidLength(password)) {
        incorrectMessage.textContent = "Password must be at least 8 characters long.";
        return;
    }
    if (!hasUpperCase(password)) {
        incorrectMessage.textContent = "Password must contain at least one uppercase letter.";
        return;
    }
    if (!hasNumber(password)) {
        incorrectMessage.textContent = "Password must contain at least one number.";
        return;
    }
    if (!hasSpecialCharacter(password)) {
        incorrectMessage.textContent = "Password must contain at least one special character.";
        return;
    }

    // account is already exists
    var userExists = users.find(u => u.email === email);
    if (userExists) {
        incorrectMessage.textContent = "Email already exists.";
        return;
    }

    // add user account and save in localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // after sign up go to login page
    window.location.href = "index.html";
}

// (Login)
function login() {
    var email = document.getElementById("signinEmail").value;
    var password = document.getElementById("signinPassword").value;
    var incorrectMessage = document.getElementById("incorrect");

    // user entered all inputs
    if (!email || !password) {
        incorrectMessage.textContent = "All inputs are required.";
        return;
    }

    // is validition email?
    if (!isValidEmail(email)) {
        incorrectMessage.textContent = "Please enter a valid email address.";
        return;
    }

    //is validition password?
    if (!isValidLength(password)) {
        incorrectMessage.textContent = "Password must be at least 8 characters long.";
        return;
    }
    if (!hasUpperCase(password)) {
        incorrectMessage.textContent = "Password must contain at least one uppercase letter.";
        return;
    }
    if (!hasNumber(password)) {
        incorrectMessage.textContent = "Password must contain at least one number.";
        return;
    }
    if (!hasSpecialCharacter(password)) {
        incorrectMessage.textContent = "Password must contain at least one special character.";
        return;
    }

    // localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // acount user in localStorage
    var user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // coorect data => go to home page
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "home.html";
    } else {
        incorrectMessage.textContent = "Incorrect email or password.";
    }
}

// (Check Login)
function checkLogin() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "index.html";
    }
    document.getElementById("welcomeMessage").textContent = "Welcome " + currentUser.name;
}

// (Logout)
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html"; // go to login page when user 
}
