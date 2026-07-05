import './style.css';

// --- Security Lock ---
const token = localStorage.getItem('eatsy_auth_token');
const role = localStorage.getItem('eatsy_role');

if (!token || role !== 'nutri') {
  window.location.href = '/login.html';
}

// Mock Patient Data
const patients = [
  {
    id: 1,
    name: 'Ana Carolina',
    progress: '100%',
    status: 'green',
    lastMeal: 'Há 10 minutos'
  },
  {
    id: 2,
    name: 'Você (Aba do Paciente)', // O paciente simulado da outra aba
    progress: '0%',
    status: 'yellow',
    lastMeal: 'Aguardando'
  },
  {
    id: 3,
    name: 'Marcos Silva',
    progress: '0%',
    status: 'red',
    lastMeal: 'Há 2 dias'
  }
];

function renderTable() {
  const tbody = document.getElementById('patientsTableBody');
  tbody.innerHTML = '';

  patients.forEach(patient => {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td>
        <div class="patient-name">
          <span class="status-dot status-${patient.status}"></span>
          ${patient.name}
        </div>
      </td>
      <td><strong>${patient.progress}</strong></td>
      <td style="color: var(--color-text-secondary)">${patient.lastMeal}</td>
      <td>
        <button class="boost-btn" onclick="sendBoost(${patient.id})">
          Enviar Incentivo ✨
        </button>
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}

// Attach to window so it can be called from inline onclick
window.sendBoost = function(patientId) {
  // We use localStorage to trigger an event in the other open tab
  localStorage.setItem('nutriBoost', Date.now().toString());
  
  // Visual feedback on the dashboard
  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = 'Enviado! ✅';
  btn.style.background = '#E8F5E9';
  btn.style.color = '#2E7D32';
  
  setTimeout(() => {
    btn.innerText = originalText;
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
}

document.addEventListener('DOMContentLoaded', renderTable);

// --- Auto Pilot Logic ---
window.toggleAutoPilot = function() {
  const toggle = document.getElementById('autoPilotToggle');
  if (toggle.checked) {
    alert("🤖 Robô Anti-Churn ativado com sucesso! A partir de agora, o Eatsy cuidará da motivação dos seus pacientes enquanto você dorme.");
  } else {
    alert("Robô desativado. O acompanhamento voltou para o modo manual.");
  }
}
