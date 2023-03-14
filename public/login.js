const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username_id').value.trim();
    const password = document.querySelector('#password_input').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup_username').value.trim();
    const password = document.querySelector('#signup_password').value.trim();
  
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username,password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
      //   document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login_form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup_form')
    .addEventListener('submit', signupFormHandler);