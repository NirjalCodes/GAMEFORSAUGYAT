// Game variables
let clickCount = 0;
let clickPower = 1;
let upgradeCost = 10;
let autoClickerCost = 50;
let autoClickerCount = 0;
let autoClickerPower = clickPower;
let clickSpeed = 1;
let clickSpeedCost = 100;
let rebirthCost = 1000;
let rebirthCount = 0;
let prestigeCost = 5000;
let prestigeMultiplier = 1;
let username = '';
let currentUser = null;
const leaderboard = [];
const adminCredentials = { username: 'nirjal', password: 'NirjalLOLxD' }; // Updated admin credentials

// Load game data
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem('gameData'));
    if (savedGame && savedGame.username === currentUser) {
        clickCount = savedGame.clickCount || 0;
        clickPower = savedGame.clickPower || 1;
        upgradeCost = savedGame.upgradeCost || 10;
        autoClickerCost = savedGame.autoClickerCost || 50;
        autoClickerCount = savedGame.autoClickerCount || 0;
        autoClickerPower = savedGame.autoClickerPower || 1;
        clickSpeed = savedGame.clickSpeed || 1;
        clickSpeedCost = savedGame.clickSpeedCost || 100;
        rebirthCost = savedGame.rebirthCost || 1000;
        rebirthCount = savedGame.rebirthCount || 0;
        prestigeCost = savedGame.prestigeCost || 5000;
        prestigeMultiplier = savedGame.prestigeMultiplier || 1;
        updateDisplay();
    }
}

// Save game data
function saveGame() {
    if (currentUser) {
        const gameData = {
            username: currentUser,
            clickCount,
            clickPower,
            upgradeCost,
            autoClickerCost,
            autoClickerCount,
            autoClickerPower,
            clickSpeed,
            clickSpeedCost,
            rebirthCost,
            rebirthCount,
            prestigeCost,
            prestigeMultiplier
        };
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }
}

// Update game display
function updateDisplay() {
    document.getElementById('click-count').textContent = clickCount;
    document.getElementById('click-power').textContent = clickPower;
    document.getElementById('upgrade-cost').textContent = upgradeCost;
    document.getElementById('auto-clicker-cost').textContent = autoClickerCost;
    document.getElementById('auto-clicker-count').textContent = autoClickerCount;
    document.getElementById('click-speed').textContent = clickSpeed;
    document.getElementById('click-speed-cost').textContent = clickSpeedCost;
    document.getElementById('rebirth-count').textContent = rebirthCount;
    document.getElementById('rebirth-cost').textContent = rebirthCost;
    document.getElementById('prestige-cost').textContent = prestigeCost;
    document.getElementById('prestige-multiplier').textContent = prestigeMultiplier;
    saveGame();
    updateLeaderboard();
}

// Handle clicking
document.getElementById('clicker').addEventListener('click', () => {
    clickCount += clickPower * prestigeMultiplier;
    updateDisplay();
});

// Upgrade click power
document.getElementById('upgrade').addEventListener('click', () => {
    if (clickCount >= upgradeCost) {
        clickCount -= upgradeCost;
        clickPower++;
        autoClickerPower = clickPower;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        updateDisplay();
    } else {
        alert('Not enough clicks to upgrade.');
    }
});

// Buy auto clicker
document.getElementById('auto-clicker').addEventListener('click', () => {
    if (clickCount >= autoClickerCost) {
        clickCount -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateDisplay();
    } else {
        alert('Not enough clicks to buy an auto-clicker.');
    }
});

// Increase click speed
document.getElementById('increase-click-speed').addEventListener('click', () => {
    if (clickCount >= clickSpeedCost && clickSpeed < 100) {
        clickCount -= clickSpeedCost;
        clickSpeed++;
        clickSpeedCost = Math.floor(clickSpeedCost * 1.5);
        updateDisplay();
    } else if (clickSpeed >= 100) {
        alert('Click speed is at maximum.');
    } else {
        alert('Not enough clicks to increase speed.');
    }
});

// Rebirth
document.getElementById('rebirth').addEventListener('click', () => {
    if (clickCount >= rebirthCost) {
        clickCount -= rebirthCost;
        rebirthCount++;
        clickPower = 1;
        autoClickerCount = 0;
        autoClickerPower = clickPower;
        upgradeCost = 10;
        autoClickerCost = 50;
        clickSpeed = 1;
        clickSpeedCost = 100;
        rebirthCost = Math.floor(rebirthCost * 2);
        updateDisplay();
    } else {
        alert('Not enough clicks to rebirth.');
    }
});

// Prestige
document.getElementById('prestige').addEventListener('click', () => {
    if (clickCount >= prestigeCost) {
        clickCount -= prestigeCost;
        prestigeMultiplier *= 2;
        prestigeCost = Math.floor(prestigeCost * 2);
        updateDisplay();
    } else {
        alert('Not enough clicks to prestige.');
    }
});

// Update leaderboard
function updateLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';

    // Sort leaderboard entries
    leaderboard.sort((a, b) => b.clickCount - a.clickCount);

    leaderboard.forEach((entry, index) => {
        const row = leaderboardTable.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = entry.username;
        row.insertCell(2).textContent = entry.clickCount;
    });
}

// Show/Hide Leaderboard
document.getElementById('show-leaderboard').addEventListener('click', () => {
    const leaderboardTab = document.getElementById('leaderboard-tab');
    leaderboardTab.style.display = leaderboardTab.style.display === 'none' ? 'block' : 'none';
});

// Register a new user
document.getElementById('register-button').addEventListener('click', () => {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const loginMessage = document.getElementById('login-message');

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            loginMessage.textContent = 'Username already exists.';
        } else {
            users[username] = { password, clickCount: 0 };
            localStorage.setItem('users', JSON.stringify(users));
            loginMessage.textContent = 'Registration successful. Please log in.';
        }
    } else {
        loginMessage.textContent = 'Please enter a username and password.';
    }
});

// Log in the user
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const loginMessage = document.getElementById('login-message');
    
    const users = JSON.parse(localStorage.getItem('users')) || {};

    console.log('Attempted Username:', username);
    console.log('Stored Users:', users);

    if (username in users && users[username].password === password) {
        currentUser = username;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        if (username === adminCredentials.username) {
            document.getElementById('admin-panel').style.display = 'block';
        }
        loadGame();
    } else {
        loginMessage.textContent = 'Invalid username or password.';
        console.log('Login failed for:', username);
    }
});

// Admin panel update
document.getElementById('admin-update').addEventListener('click', () => {
    const adminClickPower = parseInt(document.getElementById('admin-click-power').value) || clickPower;
    const adminUpgradeCost = parseInt(document.getElementById('admin-upgrade-cost').value) || upgradeCost;
    const adminAutoClickerCost = parseInt(document.getElementById('admin-auto-clicker-cost').value) || autoClickerCost;
    const adminClickSpeedCost = parseInt(document.getElementById('admin-click-speed-cost').value) || clickSpeedCost;
    const adminRebirthCost = parseInt(document.getElementById('admin-rebirth-cost').value) || rebirthCost;
    const adminPrestigeCost = parseInt(document.getElementById('admin-prestige-cost').value) || prestigeCost;

    console.log('Admin Update Clicked');
    console.log('Current User:', currentUser);

    if (currentUser === adminCredentials.username) {
        clickPower = adminClickPower;
        upgradeCost = adminUpgradeCost;
        autoClickerCost = adminAutoClickerCost;
        clickSpeedCost = adminClickSpeedCost;
        rebirthCost = adminRebirthCost;
        prestigeCost = adminPrestigeCost;
        updateDisplay();
        console.log('Admin settings updated.');
    } else {
        alert('You are not authorized to update the game settings.');
    }
});

// Admin panel visibility
document.getElementById('admin-toggle').addEventListener('click', () => {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        console.log('Admin panel toggled.');
    } else {
        console.log('Admin panel element not found.');
    }
});

// Auto clicker functionality
setInterval(() => {
    clickCount += autoClickerCount * autoClickerPower;
    updateDisplay();
}, 1000 / clickSpeed);
