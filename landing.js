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
  const height = document.getElementById('inputHeight').value;
  
  if(!weight || weight <= 0 || !height || height <= 0) {
    alert("Por favor, preencha seu peso e altura corretamente para o cálculo.");
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

  // --- Calculate Protein ---
  const weight = parseFloat(document.getElementById('inputWeight').value);
  const heightCm = parseFloat(document.getElementById('inputHeight').value);
  
  const multiplier = currentGoal === 'emagrecer' ? 1.8 : 2.1;
  const totalProtein = Math.round(weight * multiplier);
  document.getElementById('resultValue').innerText = totalProtein;

  // --- Calculate IMC ---
  const heightM = heightCm / 100;
  const imc = weight / (heightM * heightM);
  document.getElementById('imcValue').innerText = imc.toFixed(1);

  let imcText = "";
  let arrowPosition = 0; // percentage from left
  
  // Categorias baseadas na OMS e mapeamento da posição da seta (0 a 100%)
  if (imc < 18.5) {
    imcText = "Abaixo do Ideal (Magreza)";
    arrowPosition = 12.5; // Meio do primeiro bloco (0-25%)
  } else if (imc >= 18.5 && imc < 24.9) {
    imcText = "Peso Ideal (Normal)";
    arrowPosition = 37.5; // Meio do segundo bloco (25-50%)
  } else if (imc >= 25 && imc < 29.9) {
    imcText = "Acima do Ideal (Sobrepeso)";
    arrowPosition = 62.5; // Meio do terceiro bloco (50-75%)
  } else {
    imcText = "Alerta (Obesidade)";
    arrowPosition = 87.5; // Meio do quarto bloco (75-100%)
  }

  document.getElementById('imcLabel').innerText = imcText;
  document.getElementById('imcArrow').style.left = `calc(${arrowPosition}% - 7px)`;

  // Switch to step 3
  document.getElementById('step2').classList.remove('active-step');
  document.getElementById('step2').classList.add('hidden-step');
  
  document.getElementById('step3').classList.remove('hidden-step');
  document.getElementById('step3').classList.add('active-step');
}
