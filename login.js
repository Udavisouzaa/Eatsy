import './style.css';

let currentRole = 'paciente';

window.setRole = function(role) {
  currentRole = role;
  document.getElementById('btnRolePaciente').classList.remove('active');
  document.getElementById('btnRoleNutri').classList.remove('active');
  
  if (role === 'paciente') {
    document.getElementById('btnRolePaciente').classList.add('active');
  } else {
    document.getElementById('btnRoleNutri').classList.add('active');
  }
}

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
      
      // Save role
      localStorage.setItem('eatsy_role', currentRole);
      
      // Redirect to correct dashboard
      if (currentRole === 'nutri') {
        window.location.href = '/nutri.html';
      } else {
        window.location.href = '/app.html';
      }
    }, 1200);
  }
}
