import './style.css'

// --- Security Lock ---
const token = localStorage.getItem('eatsy_auth_token');
const role = localStorage.getItem('eatsy_role');

if (!token || role !== 'paciente') {
  window.location.href = '/login.html';
}

// Mock Data
const meals = [
  { id: 1, title: 'Café da Manhã', icon: '☕', items: ['2 Ovos Mexidos', '1 Pão Integral', 'Café'], checked: false },
  { id: 2, title: 'Almoço', icon: '🥗', items: ['150g Frango', '100g Batata Doce', 'Salada'], checked: false },
  { id: 3, title: 'Jantar', icon: '🌙', items: ['Sopa de Legumes', '1 Maçã'], checked: false }
];

let waterGlasses = 0;
const totalGlasses = 8;

// --- Progress Logic ---
const circle = document.querySelector('.progress-bar');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  
  const textElement = document.getElementById('progressText');
  let currentVal = parseInt(textElement.innerText) || 0;
  const targetVal = Math.round(percent);
  
  if (currentVal !== targetVal) {
    const duration = 600;
    const steps = 15;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const val = Math.round(currentVal + (targetVal - currentVal) * (step / steps));
      textElement.innerText = `${val}%`;
      if (step >= steps) {
        clearInterval(timer);
        textElement.innerText = `${targetVal}%`;
      }
    }, stepTime);
  }
}

function updateOverallProgress() {
  const total = meals.length;
  const completed = meals.filter(m => m.checked).length;
  const percentage = (completed / total) * 100;
  
  setProgress(percentage);

  // Gamification: 100% Celebration
  if(percentage === 100) {
    document.body.classList.add('celebration-mode');
    document.getElementById('progressLabel').innerText = 'Meta Atingida! 🎉';
  } else {
    document.body.classList.remove('celebration-mode');
    document.getElementById('progressLabel').innerText = 'Concluído';
  }
}

// --- Timeline Rendering ---
function renderTimeline() {
  const container = document.getElementById('mealTimeline');
  container.innerHTML = '';
  
  meals.forEach((meal, index) => {
    const card = document.createElement('div');
    card.className = `meal-card animate-pop ${meal.checked ? 'checked' : ''}`;
    card.style.animationDelay = `${index * 0.1}s`;
    
    const itemsHtml = meal.items.map(item => `<li class="meal-item">${item}</li>`).join('');
    card.innerHTML = `
      <div class="icon-box">${meal.icon}</div>
      <div class="card-content">
        <h3 class="meal-title">${meal.title}</h3>
        <ul class="meal-items">${itemsHtml}</ul>
      </div>
      <button class="check-btn" data-id="${meal.id}">
        ${meal.checked ? 'Feito ✓' : 'Check'}
      </button>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      toggleMealStatus(id, e.target);
    });
  });
}

function toggleMealStatus(id, buttonElement) {
  const meal = meals.find(m => m.id === id);
  if (meal) {
    meal.checked = !meal.checked;
    const card = buttonElement.closest('.meal-card');
    
    if (meal.checked) {
      card.classList.add('checked');
      buttonElement.innerText = 'Feito ✓';
      const icon = card.querySelector('.icon-box');
      icon.classList.remove('animate-celebrate');
      void icon.offsetWidth;
      icon.classList.add('animate-celebrate');
    } else {
      card.classList.remove('checked');
      buttonElement.innerText = 'Check';
    }
    updateOverallProgress();
  }
}

// --- Water Tracker Rendering ---
function renderWaterTracker() {
  const container = document.getElementById('waterTracker');
  container.innerHTML = '';
  for(let i=0; i<totalGlasses; i++) {
    const glass = document.createElement('div');
    glass.className = `water-glass ${i < waterGlasses ? 'filled' : ''}`;
    glass.addEventListener('click', () => {
      if (i === waterGlasses) {
        glass.classList.add('filled');
        waterGlasses++;
      } else if (i === waterGlasses - 1) {
        glass.classList.remove('filled');
        waterGlasses--;
      }
    });
    container.appendChild(glass);
  }
}

// --- Toast / Integration Listener ---
function setupIntegrationListener() {
  // Clear any old boost flag
  localStorage.removeItem('nutriBoost');
  
  // Listen for storage changes from the Nutri dashboard
  window.addEventListener('storage', (e) => {
    if (e.key === 'nutriBoost') {
      showToast();
    }
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    localStorage.removeItem('nutriBoost');
  }, 4000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderWaterTracker();
  setupIntegrationListener();
  setTimeout(() => updateOverallProgress(), 100);
});

// --- Dark Mode Logic ---
const savedTheme = localStorage.getItem('eatsy_theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  document.getElementById('themeToggle').innerText = '☀️';
}

window.toggleTheme = function() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  
  if (isDark) {
    localStorage.setItem('eatsy_theme', 'dark');
    document.getElementById('themeToggle').innerText = '☀️';
  } else {
    localStorage.setItem('eatsy_theme', 'light');
    document.getElementById('themeToggle').innerText = '🌙';
  }
}

// --- Chest Modal Logic ---
let hasShownChest = false;

function checkChestUnlock() {
  const allMealsChecked = meals.every(m => m.checked);
  if (allMealsChecked && !hasShownChest) {
    hasShownChest = true;
    setTimeout(() => {
      document.getElementById('chestModal').classList.add('active');
    }, 1000);
  }
}

window.closeChest = function() {
  document.getElementById('chestModal').classList.remove('active');
}

// Override checkMeal
const originalCheckMeal = window.checkMeal;
window.checkMeal = function(id) {
  originalCheckMeal(id); 
  checkChestUnlock();
}
