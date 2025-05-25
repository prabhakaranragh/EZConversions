document.addEventListener('DOMContentLoaded', () => {

    // --- Currency Converter ---
    const currencyAmountInput = document.getElementById('currencyAmount');
    const currencyFromSelect = document.getElementById('currencyFrom');
    const currencyToSelect = document.getElementById('currencyTo');
    const convertCurrencyBtn = document.getElementById('convertCurrency');
    const currencyResultDiv = document.getElementById('currencyResult');

    const API_KEY_EXCHANGE_RATE = '39d304192bab2993243ce46b'; // Replace with your actual API key
    const API_URL_EXCHANGE_RATE = `https://v6.exchangerate-api.com/v6/${API_KEY_EXCHANGE_RATE}/latest/USD`; // Using USD as base for initial fetch

    let exchangeRates = {}; // To store fetched rates

    async function fetchCurrenciesAndRates() {
        try {
            const response = await fetch(API_URL_EXCHANGE_RATE);
            const data = await response.json();

            if (data.result === 'success') {
                exchangeRates = data.conversion_rates;
                const currencies = Object.keys(exchangeRates);

                // Populate select options
                currencies.forEach(currency => {
                    const optionFrom = document.createElement('option');
                    optionFrom.value = currency;
                    optionFrom.textContent = currency;
                    currencyFromSelect.appendChild(optionFrom);

                    const optionTo = document.createElement('option');
                    optionTo.value = currency;
                    optionTo.textContent = currency;
                    currencyToSelect.appendChild(optionTo);
                });

                // Set default selections
                currencyFromSelect.value = 'USD'; // Or a popular currency
                currencyToSelect.value = 'EUR';  // Or another popular currency

                // Perform an initial conversion
                convertCurrency();

            } else {
                currencyResultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
                console.error('ExchangeRate-API error:', data['error-type']);
            }
        } catch (error) {
            currencyResultDiv.textContent = 'Could not load currency data.';
            console.error('Fetch currency error:', error);
        }
    }

    async function convertCurrency() {
        const amount = parseFloat(currencyAmountInput.value);
        const fromCurrency = currencyFromSelect.value;
        const toCurrency = currencyToSelect.value;

        if (isNaN(amount) || amount <= 0) {
            currencyResultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        if (Object.keys(exchangeRates).length === 0) {
            currencyResultDiv.textContent = 'Exchange rates not loaded yet. Please wait.';
            return;
        }

        // Fetch updated rates if base currency changes (more efficient to use a single base like USD and convert)
        // For simplicity, we'll assume USD is the base for all rates fetched once.
        // A more robust solution would re-fetch if `fromCurrency` changes or use a library that handles cross-rate calculations.
        const rateFromUSD = 1 / exchangeRates[fromCurrency];
        const rateToUSD = exchangeRates[toCurrency];

        const convertedAmount = amount * rateFromUSD * rateToUSD;

        currencyResultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }

    convertCurrencyBtn.addEventListener('click', convertCurrency);
    // Add listeners for input/select changes for instant conversion if desired
    currencyAmountInput.addEventListener('input', convertCurrency);
    currencyFromSelect.addEventListener('change', convertCurrency);
    currencyToSelect.addEventListener('change', convertCurrency);

    // Initial fetch for currency
    fetchCurrenciesAndRates();


    // --- Length Converter ---
    const lengthValueInput = document.getElementById('lengthValue');
    const lengthFromSelect = document.getElementById('lengthFrom');
    const lengthToSelect = document.getElementById('lengthTo');
    const convertLengthBtn = document.getElementById('convertLength');
    const lengthResultDiv = document.getElementById('lengthResult');

    const lengthUnits = {
        meters: 1,      // Base unit
        feet: 3.28084,
        inches: 39.3701,
        cm: 100,
        km: 0.001,
        miles: 0.000621371
    };

    function convertLength() {
        const value = parseFloat(lengthValueInput.value);
        const fromUnit = lengthFromSelect.value;
        const toUnit = lengthToSelect.value;

        if (isNaN(value)) {
            lengthResultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        // Convert value to base unit (meters)
        const valueInMeters = value / lengthUnits[fromUnit];
        // Convert from base unit (meters) to target unit
        const convertedValue = valueInMeters * lengthUnits[toUnit];

        lengthResultDiv.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
    }

    convertLengthBtn.addEventListener('click', convertLength);
    lengthValueInput.addEventListener('input', convertLength);
    lengthFromSelect.addEventListener('change', convertLength);
    lengthToSelect.addEventListener('change', convertLength);
    // Initial conversion on load
    lengthValueInput.value = 10; // Default value
    convertLength();


    // --- Weight Converter ---
    const weightValueInput = document.getElementById('weightValue');
    const weightFromSelect = document.getElementById('weightFrom');
    const weightToSelect = document.getElementById('weightTo');
    const convertWeightBtn = document.getElementById('convertWeight');
    const weightResultDiv = document.getElementById('weightResult');

    const weightUnits = {
        kg: 1,          // Base unit
        pounds: 2.20462,
        grams: 1000,
        ounces: 35.274
    };

    function convertWeight() {
        const value = parseFloat(weightValueInput.value);
        const fromUnit = weightFromSelect.value;
        const toUnit = weightToSelect.value;

        if (isNaN(value)) {
            weightResultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        const valueInKg = value / weightUnits[fromUnit];
        const convertedValue = valueInKg * weightUnits[toUnit];

        weightResultDiv.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
    }
    convertWeightBtn.addEventListener('click', convertWeight);
    weightValueInput.addEventListener('input', convertWeight);
    weightFromSelect.addEventListener('change', convertWeight);
    weightToSelect.addEventListener('change', convertWeight);
    weightValueInput.value = 10;
    convertWeight();


    // --- Temperature Converter ---
    const tempValueInput = document.getElementById('tempValue');
    const tempFromSelect = document.getElementById('tempFrom');
    const tempToSelect = document.getElementById('tempTo');
    const convertTempBtn = document.getElementById('convertTemp');
    const tempResultDiv = document.getElementById('tempResult');

    function convertTemperature() {
        const value = parseFloat(tempValueInput.value);
        const fromUnit = tempFromSelect.value;
        const toUnit = tempToSelect.value;

        if (isNaN(value)) {
            tempResultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        let valueInCelsius;

        // Convert to Celsius first
        if (fromUnit === 'celsius') {
            valueInCelsius = value;
        } else if (fromUnit === 'fahrenheit') {
            valueInCelsius = (value - 32) * 5 / 9;
        } else if (fromUnit === 'kelvin') {
            valueInCelsius = value - 273.15;
        }

        let convertedValue;
        // Convert from Celsius to target unit
        if (toUnit === 'celsius') {
            convertedValue = valueInCelsius;
        } else if (toUnit === 'fahrenheit') {
            convertedValue = (valueInCelsius * 9 / 5) + 32;
        } else if (toUnit === 'kelvin') {
            convertedValue = valueInCelsius + 273.15;
        }

        tempResultDiv.textContent = `${value} ${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} = ${convertedValue.toFixed(2)} ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`;
    }
    convertTempBtn.addEventListener('click', convertTemperature);
    tempValueInput.addEventListener('input', convertTemperature);
    tempFromSelect.addEventListener('change', convertTemperature);
    tempToSelect.addEventListener('change', convertTemperature);
    tempValueInput.value = 25;
    convertTemperature();


    // --- Data Size Converter ---
    const dataValueInput = document.getElementById('dataValue');
    const dataFromSelect = document.getElementById('dataFrom');
    const dataToSelect = document.getElementById('dataTo');
    const convertDataBtn = document.getElementById('convertData');
    const dataResultDiv = document.getElementById('dataResult');

    const dataUnits = {
        bits: 1, // Base unit
        bytes: 8,
        kilobytes: 8 * 1024,
        megabytes: 8 * 1024 * 1024,
        gigabytes: 8 * 1024 * 1024 * 1024,
        terabytes: 8 * 1024 * 1024 * 1024 * 1024
    };

    function convertData() {
        const value = parseFloat(dataValueInput.value);
        const fromUnit = dataFromSelect.value;
        const toUnit = dataToSelect.value;

        if (isNaN(value)) {
            dataResultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        const valueInBits = value * dataUnits[fromUnit];
        const convertedValue = valueInBits / dataUnits[toUnit];

        dataResultDiv.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
    }
    convertDataBtn.addEventListener('click', convertData);
    dataValueInput.addEventListener('input', convertData);
    dataFromSelect.addEventListener('change', convertData);
    dataToSelect.addEventListener('change', convertData);
    dataValueInput.value = 1;
    convertData();

    // --- Time Unit Converter ---
    const timeValueInput = document.getElementById('timeValue');
    const timeFromSelect = document.getElementById('timeFrom');
    const timeToSelect = document.getElementById('timeTo');
    const convertTimeBtn = document.getElementById('convertTime');
    const timeResultDiv = document.getElementById('timeResult');

    const timeUnits = {
        seconds: 1,
        minutes: 60,
        hours: 3600,
        days: 86400,
        weeks: 604800,
        years: 31536000 // Approximate, not accounting for leap years
    };

    function convertTime() {
        const value = parseFloat(timeValueInput.value);
        const fromUnit = timeFromSelect.value;
        const toUnit = timeToSelect.value;

        if (isNaN(value)) {
            timeResultDiv.textContent = 'Please enter a valid number.';
            return;
        }

        const valueInSeconds = value * timeUnits[fromUnit];
        const convertedValue = valueInSeconds / timeUnits[toUnit];

        timeResultDiv.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`;
    }
    convertTimeBtn.addEventListener('click', convertTime);
    timeValueInput.addEventListener('input', convertTime);
    timeFromSelect.addEventListener('change', convertTime);
    timeToSelect.addEventListener('change', convertTime);
    timeValueInput.value = 1;
    convertTime();

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});