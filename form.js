const form = document.getElementById("register");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const markingsField = document.getElementById("markings");
const dateField = document.getElementById("birthday");
const colorField = document.getElementById("colors");
const errorContainer = document.getElementById("error-message");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const error4 = document.getElementById("error4");
const error5 = document.getElementById("error5");
const icon = '<span aria-hidden="true" class="fas fa-exclamation-triangle"></span><span class="visually-hidden">Error</span> ';

function clearErrors() {
let errors = document.getElementById("errors");
if (errors) {
errors.remove();
}
error1.innerHTML = "";
error2.innerHTML = "";
error3.innerHTML = "";
error4.innerHTML = "Birthday format is <em>mm/dd/yyyy</em>.";
error5.innerHTML = "";
nameField.removeAttribute("aria-invalid");
emailField.removeAttribute("aria-invalid");
markingsField.removeAttribute("aria-invalid");
dateField.removeAttribute("aria-invalid");
colorField.removeAttribute("aria-invalid");
error4.classList.remove("error");
error4.classList.add("help");
}

function validateForm() {
    clearErrors();
    let hasErrors = false;
    let errors = document.createElement("ul");
    errors.id = "errors";
    if (nameField.value === "") {
        const error = document.createElement("li");
        error.innerHTML = "<a href=\"#name\">Cat's name</a> is required.";
        errors.appendChild(error);
        nameField.setAttribute("aria-invalid", "true");
        error1.innerHTML = `${icon} Enter cat's name.`;
        hasErrors = true;
    }
    if (emailField.value === "") {
        const error = document.createElement("li");
        error.innerHTML = "<a href=\"#email\">Your email</a> is required.";
        errors.appendChild(error);
        emailField.setAttribute("aria-invalid", "true");
        error2.innerHTML = `${icon} Enter your email.`;
        hasErrors = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.value)) {
        const error = document.createElement("li");
        error.innerHTML = "<a href=\"#email\">Your email</a> address is not formatted correctly.";
        errors.appendChild(error);
        emailField.setAttribute("aria-invalid", "true");
        error2.innerHTML = `${icon} Email format is <em>address@domain.com</em>.`;
        hasErrors = true;
    }
    if (dateField.value !== "") {
        if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(dateField.value)) {
            const error = document.createElement("li");
            error.innerHTML = "<a href='#birthday'>Cat's birthday</a> is not in the correct format.";
            errors.appendChild(error);
            dateField.setAttribute("aria-invalid", "true");
            error4.classList.remove("help");
            error4.classList.add("error");            
            error4.innerHTML = `${icon} Birthday format is <em>mm/dd/yyyy</em>.`;
            hasErrors = true;
        }
    }
    if (markingsField.value === "") {
        const error = document.createElement("li");
        error.innerHTML = "<a href=\"#markings\">Cat's markings</a> is required.";
        errors.appendChild(error);
        markingsField.setAttribute("aria-invalid", "true");
        error3.innerHTML = `${icon} Select cat's markings.`;
        hasErrors = true;
    }
    let checkboxes = document.querySelectorAll("#colors input[type='checkbox']");
    let checked = false;
    checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
    checked = true;
    }
    });
    if (!checked) {
    const error = document.createElement("li");
    error.innerHTML = "<a href='#colors'>Cat's colors</a> is required.";
    errors.appendChild(error);
    error5.innerHTML = `${icon} Select at least one color.`;
    hasErrors = true;
    }
    if (hasErrors) {
        errorContainer.classList.add("errors");
        if(!errorContainer.querySelector("h2")) {
            const errorHeading = document.createElement("h2");
            errorHeading.innerHTML = "Fix these errors to continue:";
            errorContainer.appendChild(errorHeading);
        }
        errorContainer.appendChild(errors);
        errorContainer.focus();
        return false;
    }
    return true;
}

form.addEventListener("submit", function(e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Add slashes to birthday
dateField.addEventListener("keyup", function () {
  if (this.value.length === 2 || this.value.length === 5) {
    this.value += "/";
  }
});