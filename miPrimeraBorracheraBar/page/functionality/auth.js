document.addEventListener("DOMContentLoaded", function () {
  // Define BASE_URL based on the environment
  const BASE_URL = (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") 
  ? "http://localhost:8080" 
  : "https://lonely-cackle-9pw6q9474r93wxr-8080.app.github.dev";

  console.log(BASE_URL);
  
  // Get the current URL
  const currentUrl = window.location.pathname;

  if (currentUrl.includes("login.html")) {
    // Specific code for the login page
    const loginForm = document.getElementById("formUserToken");
    const loginUserNameInput = document.getElementById("adminToken");
    const loginPasswordInput = document.getElementById("passwordToken");

    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const userName = loginUserNameInput.value;
      const password = loginPasswordInput.value;

      const loginFormData = new FormData();
      loginFormData.append("username", userName);
      loginFormData.append("password", password);

      await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`,
      })
        .then((response) => {
          if (!response.ok) {
            alert("Incorrect username or password");
            throw new Error("Error obtaining login token. HTTP status code:" + response.status);
          }
          return response.text(); 
        })
        .then((token) => {
          sessionStorage.setItem("jwtToken", token.trim()); //Save the JWT token in sessionStorage
          
            // Decode the JWT token to get the role
            const decodedToken = jwt_decode(token.trim());
            const userRole = decodedToken.role; // Assuming the role is stored under "role" claim
  
            // Redirect based on the role
            if (userRole === 'administrador') {
              window.location.href = "index.html";
            } else if (userRole === 'cajero') {
              window.location.href = "cajero.html";
            } else if (userRole === 'mesero'){
              window.location.href = "mesero.html"; // Default page if no matching role
            }
        })
        .catch((error) => {
          console.error("Error obtaining login token:", error);
          loginUserNameInput.value = ''; 
          loginPasswordInput.value = ''; 
        });
    });
  } else if (currentUrl.includes("register.html")) {
    // Specific code for the registration page
    const registerButton = document.getElementById("btnRegister");
    const registerUserNameInput = document.getElementById("adminUser");
    const registerPasswordInput = document.getElementById("passwordUser");

    registerButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const userName = registerUserNameInput.value;
      const password = registerPasswordInput.value;

      const registerFormData = {
        username: userName,
        password: password,
      };

      await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Successful Register");
          window.location.href = "login.html";
        })
        .catch((error) => {
          console.error("Registry error:", error);
        });
    });
  }
});
