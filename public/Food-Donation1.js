let generatedOTP;

const statesAndCities = {
    "Delhi": ["Delhi"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati"],
    "Gujarat": ["Ahmedabad", "Gandhinagar", "Surat"],
    "Telangana": ["Hyderabad"],
    "West Bengal": ["Kolkata"]
};

// Populate states select dropdown
function populateStates() {
    const stateSelect = document.getElementById("state");
    stateSelect.innerHTML = '<option value="" disabled selected>Select State</option>'; // Clear previous options

    const states = Object.keys(statesAndCities).sort();

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// Populate cities based on selected state
function updateCities() {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");
    const selectedState = stateSelect.value;

    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>'; // Clear previous options

    if (selectedState && statesAndCities[selectedState]) {
        const cities = statesAndCities[selectedState].sort();
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        citySelect.innerHTML = '<option value="" disabled selected>No cities available</option>';
    }
}

// Validate location form
function validateLocationForm() {
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;

    if (!state || !city) {
        alert("Please select both state and city.");
        return false;
    }

    document.getElementById("locationScreen").classList.add("hidden");
    document.getElementById("donationFormScreen").classList.remove("hidden");
    return true;
}

// Add a new set of food donation fields
function addFoodSet() {
    const foodSetContainer = document.getElementById("foodSetContainer");

    const newFoodSet = document.createElement("div");
    newFoodSet.classList.add("horizontal-group");

    newFoodSet.innerHTML = `
        <select name="foodType[]" required>
            <option value="" disabled selected>Type Of Food</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
            <option value="Cooked Meals">Cooked Meals</option>
        </select>
        <input type="number" name="quantity[]" placeholder="Quantity (in kg)" required>
    `;

    foodSetContainer.appendChild(newFoodSet);
}

// Generate and send OTP
function sendOTP() {
    const mobileNumber = document.getElementById("mobileNumber").value;

    if (!mobileNumber || mobileNumber.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`Your OTP is: ${generatedOTP}`);

    document.getElementById("donationFormScreen").classList.add("hidden");
    document.getElementById("otpScreen").classList.remove("hidden");
}

// Validate OTP
function validateOTP() {
    const enteredOTP = document.getElementById("otp").value;

    if (enteredOTP === generatedOTP) {
        document.getElementById("otpScreen").classList.add("hidden");
        document.getElementById("confirmationScreen").classList.remove("hidden");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

// Go back to the home screen
function goHome() {
    document.getElementById("confirmationScreen").classList.add("hidden");
    document.getElementById("locationScreen").classList.remove("hidden");
    document.getElementById("locationForm").reset();
    document.getElementById("donationForm").reset();
    document.getElementById("otpForm").reset();
}

// Initialize the app by populating states and adding event listeners
window.onload = function() {
    populateStates();
    document.getElementById("state").addEventListener("change", updateCities);
};
