const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Get values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const course = document.getElementById("course").value;

  // Validation
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === "" ||
    course === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Create object
  const userData = {
    username,
    email,
    password,
    course
  };

  // Save to local storage
  localStorage.setItem("userData", JSON.stringify(userData));

  // Success message
  alert("Registration Successful!");

  // Reset form
  form.reset();

  console.log("Saved Data:", userData);
});