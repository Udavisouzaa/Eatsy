import './style.css';

let currentGoal = 'emagrecer';

window.setGoal = function(goal) {
  currentGoal = goal;
  const buttons = document.querySelectorAll('.toggle-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // Highlight the clicked one
  event.target.classList.add('active');
}

window.goToStep2 = function() {
  const weight = document.getElementById('inputWeight').value;
  
  if(!weight || weight <= 0) {
    alert("Por favor, digite seu peso atual para o cálculo.");
    return;
  }

  // Switch to step 2
  document.getElementById('step1').classList.remove('active-step');
  document.getElementById('step1').classList.add('hidden-step');
  
  document.getElementById('step2').classList.remove('hidden-step');
  document.getElementById('step2').classList.add('active-step');

  // Simulate loading
  setTimeout(() => {
    document.getElementById('calcBox').style.display = 'none';
    document.getElementById('leadCapture').classList.remove('hidden-step');
  }, 1500);
}

window.showResult = function() {
  const phone = document.getElementById('inputPhone').value;
  
  if(!phone || phone.length < 8) {
    alert("Por favor, digite um WhatsApp válido para continuar.");
    return;
  }

  // Calculate Protein
  // Emagrecimento: ~1.8g/kg
  // Ganho de Massa: ~2.1g/kg
  const weight = parseFloat(document.getElementById('inputWeight').value);
  const multiplier = currentGoal === 'emagrecer' ? 1.8 : 2.1;
  const totalProtein = Math.round(weight * multiplier);

  document.getElementById('resultValue').innerText = totalProtein;

  // Switch to step 3
  document.getElementById('step2').classList.remove('active-step');
  document.getElementById('step2').classList.add('hidden-step');
  
  document.getElementById('step3').classList.remove('hidden-step');
  document.getElementById('step3').classList.add('active-step');
}
