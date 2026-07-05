import './style.css';

window.doLogin = function() {
  const email = document.getElementById('inputEmail').value;
  const pass = document.getElementById('inputPass').value;
  const btn = document.getElementById('loginBtn');

  if (email && pass) {
    btn.innerText = "Autenticando...";
    btn.style.opacity = "0.7";

    // Simulate network delay for DB authentication
    setTimeout(() => {
      // Fake JWT token storage
      localStorage.setItem('eatsy_auth_token', 'fake-jwt-token-12345');
      
      // Redirect to protected app
      window.location.href = '/app.html';
    }, 1200);
  }
}
