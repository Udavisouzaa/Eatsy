import './style.css'

// Mock Data for MVP
const meals = [
  {
    id: 1,
    title: 'Café da Manhã',
    icon: '☕',
    items: ['2 Ovos Mexidos', '1 Fatia de Pão Integral', 'Café Preto sem açúcar'],
    checked: false
  },
  {
    id: 2,
    title: 'Almoço',
    icon: '🥗',
    items: ['150g de Frango Grelhado', '100g de Batata Doce', 'Salada de folhas'],
    checked: false
  },
  {
    id: 3,
    title: 'Jantar',
    icon: '🌙',
    items: ['Sopa de Legumes', '1 Maçã'],
    checked: false
  }
];

// Progress Ring Logic
const circle = document.querySelector('.progress-bar');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  
  // Animate the text counting up
  const textElement = document.getElementById('progressText');
  let currentVal = parseInt(textElement.innerText) || 0;
  const targetVal = Math.round(percent);
  
  if (currentVal !== targetVal) {
    const duration = 800; // ms
    const steps = 20;
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
}

// Render Timeline
function renderTimeline() {
  const container = document.getElementById('mealTimeline');
  container.innerHTML = '';
  
  meals.forEach((meal, index) => {
    const card = document.createElement('div');
    card.className = `meal-card animate-pop ${meal.checked ? 'checked' : ''}`;
    card.style.animationDelay = `${index * 0.15}s`;
    
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

  // Attach event listeners to buttons
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
    meal.checked = !meal.checked; // Toggle state
    
    // Animate Card
    const card = buttonElement.closest('.meal-card');
    if (meal.checked) {
      card.classList.add('checked');
      buttonElement.innerText = 'Feito ✓';
      // Add celebrate animation to icon
      const icon = card.querySelector('.icon-box');
      icon.classList.remove('animate-celebrate');
      void icon.offsetWidth; // trigger reflow
      icon.classList.add('animate-celebrate');
    } else {
      card.classList.remove('checked');
      buttonElement.innerText = 'Check';
    }
    
    updateOverallProgress();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  // Initial progress is 0, animated to 0
  setTimeout(() => updateOverallProgress(), 100);
});
