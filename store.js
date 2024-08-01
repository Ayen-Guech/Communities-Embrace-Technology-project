document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous errors
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    // Get input values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple client-side validation
    let valid = true;
    
    if (username === '') {
        document.getElementById('usernameError').innerText = 'Username is required.';
        document.getElementById('usernameError').style.display = 'block';
        valid = false;
    }

    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    if (!valid) return; // Stop further execution if validation fails

    // Validate credentials
    if (username === 'yenyen@gmail.com' && password === '123456') {
        alert("Login successful!");
        window.location.href = 'index.html'; // Redirect to home page
    } else {
        alert("Invalid Username or Password");
    }
});
