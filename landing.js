import './style.css';

let currentGoal = 'emagrecer';
let selectedCalculator = ''; // 'proteina' or 'imc'

window.chooseCalculator = function(type) {
  selectedCalculator = type;
  document.getElementById('step0').classList.remove('active-step');
  document.getElementById('step0').classList.add('hidden-step');
  
  const stepId = type === 'proteina' ? 'step1-proteina' : 'step1-imc';
  document.getElementById(stepId).classList.remove('hidden-step');
  document.getElementById(stepId).classList.add('active-step');
}

window.goBackToStep0 = function() {
  document.getElementById('step1-proteina').classList.add('hidden-step');
  document.getElementById('step1-proteina').classList.remove('active-step');
  document.getElementById('step1-imc').classList.add('hidden-step');
  document.getElementById('step1-imc').classList.remove('active-step');
  
  document.getElementById('step0').classList.remove('hidden-step');
  document.getElementById('step0').classList.add('active-step');
}

window.setGoal = function(goal) {
  currentGoal = goal;
  const buttons = document.querySelectorAll('.toggle-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

window.goToCapture = function(type) {
  let weight, height;
  
  if (type === 'proteina') {
    weight = document.getElementById('inputWeightProt').value;
    if(!weight || weight <= 0) {
      alert("Por favor, digite seu peso atual para o cálculo.");
      return;
    }
  } else {
    weight = document.getElementById('inputWeightImc').value;
    height = document.getElementById('inputHeightImc').value;
    if(!weight || weight <= 0 || !height || height <= 0) {
      alert("Por favor, preencha seu peso e altura corretamente.");
      return;
    }
  }

  // Switch to step 2 (Capture)
  const stepId = type === 'proteina' ? 'step1-proteina' : 'step1-imc';
  document.getElementById(stepId).classList.remove('active-step');
  document.getElementById(stepId).classList.add('hidden-step');
  
  document.getElementById('step2').classList.remove('hidden-step');
  document.getElementById('step2').classList.add('active-step');

  // Simulate loading
  document.getElementById('calcBox').style.display = 'flex';
  document.getElementById('leadCapture').classList.add('hidden-step');
  
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

  // Show correct result blocks
  if (selectedCalculator === 'proteina') {
    document.getElementById('resultBlockProteina').style.display = 'flex';
    document.getElementById('resultBlockImc').style.display = 'none';
    
    const weight = parseFloat(document.getElementById('inputWeightProt').value);
    const multiplier = currentGoal === 'emagrecer' ? 1.8 : 2.1;
    const totalProtein = Math.round(weight * multiplier);
    document.getElementById('resultValue').innerText = totalProtein;
    
  } else {
    document.getElementById('resultBlockProteina').style.display = 'none';
    document.getElementById('resultBlockImc').style.display = 'block';
    
    const weight = parseFloat(document.getElementById('inputWeightImc').value);
    const heightCm = parseFloat(document.getElementById('inputHeightImc').value);
    const heightM = heightCm / 100;
    const imc = weight / (heightM * heightM);
    document.getElementById('imcValue').innerText = imc.toFixed(1);

    let imcText = "";
    let arrowPosition = 0; 
    
    if (imc < 18.5) {
      imcText = "Abaixo do Ideal (Magreza)";
      arrowPosition = 12.5; 
    } else if (imc >= 18.5 && imc < 24.9) {
      imcText = "Peso Ideal (Normal)";
      arrowPosition = 37.5; 
    } else if (imc >= 25 && imc < 29.9) {
      imcText = "Acima do Ideal (Sobrepeso)";
      arrowPosition = 62.5; 
    } else {
      imcText = "Alerta (Obesidade)";
      arrowPosition = 87.5; 
    }

    document.getElementById('imcLabel').innerText = imcText;
    document.getElementById('imcArrow').style.left = `calc(${arrowPosition}% - 7px)`;
  }

  // Switch to step 3
  document.getElementById('step2').classList.remove('active-step');
  document.getElementById('step2').classList.add('hidden-step');
  
  document.getElementById('step3').classList.remove('hidden-step');
  document.getElementById('step3').classList.add('active-step');
}

window.shareViral = function() {
  let message = "";
  if (selectedCalculator === 'imc') {
    const imc = document.getElementById('imcValue').innerText;
    message = `Fiz meu teste metabólico no Eatsy e meu IMC deu ${imc}! Duvido você bater minha pontuação. Faz o teste aqui: eatsy-d.vercel.app`;
  } else {
    const prot = document.getElementById('resultValue').innerText;
    message = `Minha meta diária para atingir o shape é comer ${prot}g de proteína! Descubra a sua aqui: eatsy-d.vercel.app`;
  }
  
  const encodedUrl = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedUrl}`, '_blank');
}
