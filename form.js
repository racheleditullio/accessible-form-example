const form = document.getElementById("register");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const markingsField = document.getElementById("markings");
const errorContainer = document.getElementById("error-message");
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const icon =
  '<span aria-hidden="true" class="fas fa-exclamation-triangle"></span> ';

function clearErrors() {
    let errors = document.getElementById("errors");
    if (errors) {
        errors.remove();
    }
    error1.innerHTML = "";
    error2.innerHTML = "";
    error3.innerHTML = "";
    nameField.removeAttribute("aria-invalid");
    emailField.removeAttribute("aria-invalid");
    markingsField.removeAttribute("aria-invalid");
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
        error.innerHTML = "Your email is required.";
        errors.appendChild(error);
        emailField.setAttribute("aria-invalid", "true");
        error2.innerHTML = `${icon} Enter your email.`;
        hasErrors = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.value)) {
        const error = document.createElement("li");
        error.innerHTML = "Your email address is not formatted correctly.";
        errors.appendChild(error);
        emailField.setAttribute("aria-invalid", "true");
        error2.innerHTML = `${icon} Email format is <em>address@domain.com</em>.`;
        hasErrors = true;
    }
    if (markingsField.value === "") {
        const error = document.createElement("li");
        error.innerHTML = "Cat's markings is required.";
        errors.appendChild(error);
        markingsField.setAttribute("aria-invalid", "true");
        error3.innerHTML = `${icon} Select cat's markings.`;
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
const dateField = document.getElementById("birthday");
dateField.addEventListener("keyup", function () {
  if (this.value.length === 2 || this.value.length === 5) {
    this.value += "/";
  }
});