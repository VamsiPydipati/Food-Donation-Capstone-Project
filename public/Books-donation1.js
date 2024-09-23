const statesAndCities = {
    Delhi: ["New Delhi", "North Delhi", "South Delhi"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubballi"]
};

// Populate states select dropdown
function populateStates() {
    const stateSelect = document.getElementById("state");
    stateSelect.innerHTML = '<option value="" disabled selected>Select State</option>';

    const states = Object.keys(statesAndCities).sort();
    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    updateCities(); // Populate cities based on the default selected state
}

// Update cities based on selected state
function updateCities() {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");
    const selectedState = stateSelect.value;

    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';
    if (statesAndCities[selectedState]) {
        const cities = statesAndCities[selectedState].sort();
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Add event listeners
document.getElementById("state").addEventListener("change", updateCities);
document.getElementById("nextButton").addEventListener("click", validateLocationForm);

// Form validation
function validateLocationForm() {
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    if (state && city) {
        document.getElementById('locationScreen').style.display = 'none';
        document.getElementById('donationFormScreen').style.display = 'block';
    } else {
        alert('Please select both state and city.');
    }
}

// Add book set
function addBookSet() {
    const bookSetContainer = document.getElementById("bookSetContainer");
    const newBookSet = document.createElement("div");
    newBookSet.classList.add("book-set");

    newBookSet.innerHTML = `
        <select name="bookType[]" required>
            <option value="" disabled selected>Type Of Book</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Mathematics">Mathematics</option>
        </select>
        <select name="language[]" required>
            <option value="" disabled selected>Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
        </select>
        <input type="number" name="numberOfBooks[]" placeholder="Number Of Books" required min="1">
    `;
    bookSetContainer.appendChild(newBookSet);
}

// Send OTP
document.getElementById("sendOtp").addEventListener("click", function() {
    const mobileNumber = document.getElementById("mobileNumber").value;
    if (mobileNumber.length === 10) {
        alert("OTP sent to " + mobileNumber);
        document.getElementById('donationFormScreen').style.display = 'none';
        document.getElementById('otpScreen').style.display = 'block';
    } else {
        alert("Please enter a valid 10-digit mobile number.");
    }
});

// Submit OTP
document.getElementById("submitOtp").addEventListener("click", function() {
    const otp = document.getElementById("otpInput").value;
    if (otp === "1234") { // Dummy OTP for testing
        alert("OTP Verified! Donation Completed.");
    } else {
        alert("Invalid OTP. Please try again.");
    }
});

// Initialize page by populating state dropdown
populateStates();