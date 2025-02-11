// filepath: /g:/Projects/nginxSite/Site/scripts/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Log the form data to the console
        console.log({ username, password });

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Login failed');
        })
        .then(data => {
            console.log(data);
            alert(data);
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
    });
});