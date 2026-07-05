import './style.css';

window.generatePrediction = function() {
  const current = parseFloat(document.getElementById('inputCurrentWeight').value);
  const target = parseFloat(document.getElementById('inputTargetWeight').value);
  
  if (!current || !target || current <= 0 || target <= 0) {
    alert("Por favor, preencha os pesos corretamente para gerar sua previsão.");
    return;
  }

  const difference = Math.abs(current - target);
  let weeks = 0;

  // Calculo de Future Pacing
  if (current > target) {
    // Emagrecimento (Média saudável de 0.7kg/semana)
    weeks = Math.ceil(difference / 0.7);
  } else if (current < target) {
    // Hipertrofia (Média saudável de 0.3kg/semana)
    weeks = Math.ceil(difference / 0.3);
  } else {
    // Já está no peso
    weeks = 1; // Manutenção
  }

  // Se a diferença for muito grande, o cálculo de semanas fica assustador, vamos limitar para o MVP
  if (weeks > 50) weeks = 50; 
  if (weeks < 1) weeks = 1;

  document.getElementById('predictionWeeks').innerText = weeks;
  document.getElementById('targetText').innerText = target;

  // Troca de Passo
  document.getElementById('step1').classList.remove('active-step');
  document.getElementById('step1').classList.add('hidden-step');
  
  document.getElementById('step2').classList.remove('hidden-step');
  document.getElementById('step2').classList.add('active-step');
}

window.doRegister = function() {
  const name = document.getElementById('inputName').value;
  const email = document.getElementById('inputEmail').value;
  const btn = document.getElementById('registerBtn');

  if (name && email) {
    btn.innerText = "Criando sua dieta...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
      // Mock Auth for SaaS simulation
      localStorage.setItem('eatsy_auth_token', 'fake-jwt-token-12345');
      localStorage.setItem('eatsy_role', 'paciente');
      
      // Go to app
      window.location.href = '/app.html';
    }, 1500);
  } else {
    alert("Preencha seu nome e e-mail para finalizar.");
  }
}
