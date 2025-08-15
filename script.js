const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");
const history = document.getElementById("history");
const amountInput = document.getElementById("amount");

const API_URL = "https://open.er-api.com/v6/latest/";

const currencies = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "ALL", "AUD", "CNY", "AED", "ARS", "BGN ", "BDT", "BHD", "BRL", "CHF", "CLP", "CNY", "COP", "CZK", "DKK", "GBP", "HKD", "HUF", "IDR", "ILS", "ISK", "KRW", "MAD", "MXN", "MXV", "MYR", "NAD", "NGN", "NOK", "NZD", "OTH", "PEN", "PHP", "PLN", "RON", "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "VES", "VND", "XOF", "ZAR"];

window.onload = () =>{
    currencies.forEach((currency) =>{
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });

    fromCurrency.value = "AED";
    toCurrency.value = "USD";
};

function convertCurrency(){
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(`${API_URL}${from}`)
    .then((res) => res.json())
    .then((data) =>{
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        result.textContent = `${amount} ${from} = ${converted} ${to}`;
        addToHistory(amount, from, to, converted);
    })
    .catch(() => {
        result.textContent = "Conversion failed. Please try again.";
    });
}
function addToHistory(amount, from, to, converted){
    const item = document.createElement("p");
    item.textContent = `${amount} ${from} ➡️ ${converted} ${to}`;
    history.prepend(item);
}
