function validateAndCalculate() {
    
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    
    var length = document.getElementById("length").value;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;

   
    let isValid = true;

  
    function checkIfNumber(value, errorElementId) {
        if (isNaN(value) || value <= 0) {
            document.getElementById(errorElementId).textContent = "Proszę wpisać prawidłową dodatnią liczbę.";
            isValid = false;
        }
    }

    
    checkIfNumber(length, "lengthError");
    checkIfNumber(width, "widthError");
    checkIfNumber(height, "heightError");
    checkIfNumber(weight, "weightError");

    
    if (isValid) {
        calculatePrices();
    }
}
function calculatePrices() {
    
    var length = parseFloat(document.getElementById("length").value);
    var width = parseFloat(document.getElementById("width").value);
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var deliveryType = document.getElementById("deliveryType").value;

    
    let extraCost = 0;
    let estimatedTimes = {
        pocztex: "2-3 dni",
        dhl: "1-2 dni",
        inpost: "1-3 dni",
        ups: "1-2 dni",
        orlen: "3-5 dni",
        dpd: "1-3 dni"
    };

    if (deliveryType === "home") {
        extraCost = 5; 
    } else if (deliveryType === "pickup") {
        extraCost = 2; 
    }

    
    var pocztexPrice = 10 + weight * 1 + extraCost;
    var dhlPrice = 15 + weight * 2 + extraCost;
    var inpostPrice = 12 + weight * 1.5 + extraCost;
    var upsPrice = 20 + weight * 2.5 + extraCost;
    var orlenPrice = 8 + weight * 1 + extraCost;
    var dpdPrice = 18 + weight * 2 + extraCost;

   
    var priceTable = document.getElementById("priceTable");
    priceTable.innerHTML = `
        <tr><td>Pocztex</td><td>${pocztexPrice} zł</td><td>${estimatedTimes.pocztex}</td></tr>
        <tr><td>DHL</td><td>${dhlPrice} zł</td><td>${estimatedTimes.dhl}</td></tr>
        <tr><td>InPost</td><td>${inpostPrice} zł</td><td>${estimatedTimes.inpost}</td></tr>
        <tr><td>UPS</td><td>${upsPrice} zł</td><td>${estimatedTimes.ups}</td></tr>
        <tr><td>Orlen Paczka</td><td>${orlenPrice} zł</td><td>${estimatedTimes.orlen}</td></tr>
        <tr><td>DPD</td><td>${dpdPrice} zł</td><td>${estimatedTimes.dpd}</td></tr>
    `;
}

function register() {
    const username = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerPasswordConfirm").value;
    const errorElement = document.getElementById("registerError");

    if (password !== confirmPassword) {
        errorElement.textContent = "Hasła nie są zgodne!";
        return;
    }

    if (localStorage.getItem(username)) {
        errorElement.textContent = "Użytkownik już istnieje!";
    } else {
        localStorage.setItem(username, password);
        errorElement.textContent = "Rejestracja udana! Możesz się zalogować.";
    }
}


function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const errorElement = document.getElementById("loginError");

    
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        errorElement.textContent = "Zalogowano pomyślnie!";
    } else {
        errorElement.textContent = "Błędna nazwa użytkownika lub hasło.";
    }
}