// Initialize history array
let calculationHistory = [];

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('calculator-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('calculator-theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    var display = document.getElementById('display');
    try {
        let expression = display.value;
        let result = eval(expression);
        display.value = result;
        
        // Add to history
        addToHistory(expression, result);
    } catch (error) {
        display.value = 'Error';
    }
}

function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(historyItem);
    updateHistoryDisplay();
    
    // Keep only last 10 calculations
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    calculationHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `${item.expression} = ${item.result} <small>(${item.timestamp})</small>`;
        historyItem.onclick = () => {
            document.getElementById('display').value = item.expression;
        };
        historyList.appendChild(historyItem);
    });
}

// Initialize theme when the page loads
document.addEventListener('DOMContentLoaded', initTheme); 