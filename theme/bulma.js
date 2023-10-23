document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send a POST request to your authentication API
        fetch("https://asia-southeast2-testlogin-366704.cloudfunctions.net/function-16", {
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
                
                // After successful login, fetch user data and filter it
                fetch("https://asia-southeast2-testlogin-366704.cloudfunctions.net/getaaalll")
                .then(response => response.json())
                .then(userList => {
                    const user = userList.find(user => user.username === username);
                    if (user) {
                        // User found, navigate to the dashboard
                        window.location.href = "dashboard.html";
                    } else {
                        // User not found
                        message.textContent = "User not found in the database.";
                        message.style.color = "red";
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            } else {
                fetch("https://asia-southeast2-testlogin-366704.cloudfunctions.net/getaaalll")
                .then(response => response.json())
                .then(userList => {
                    const user = userList.find(user => user.username === username);
                    if (user) {
                        // User found, navigate to the dashboard
                        window.location.href = "dashboarduser.html";
                    } else {
                        // User not found
                        message.textContent = "User not found in the database.";
                        message.style.color = "red";
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});