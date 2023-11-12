document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send a POST request to the updated authentication API
        fetch("https://asia-southeast2-testlogin-366704.cloudfunctions.net/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                const token = data.token;
                const welcomeMessage = data.message;
                message.textContent = welcomeMessage;
                message.style.color = "green";
                console.log(token);

                const user = data.data; // Assuming user data is in the 'data' property

                if (user) {
                    // User found, navigate to the dashboard
                    window.location.href = "../index.html";
                } else {
                    // User not found
                    handleUserNotFound();
                }
            } else {
                // If authentication fails, handle it accordingly
                handleUserNotFound();
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });

    function handleUserNotFound() {
        message.textContent = "User not found in the database.";
        message.style.color = "red";
    }
});
