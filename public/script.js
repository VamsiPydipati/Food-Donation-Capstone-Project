// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYzg_sJxni3gsZQtcprkObr3d9S-OSGuo",
    authDomain: "vamsi-d4f93.firebaseapp.com",
    projectId: "vamsi-d4f93",
    storageBucket: "vamsi-d4f93.appspot.com",
    messagingSenderId: "1080818323625",
    appId: "1:1080818323625:web:9ae0181676d099b96199b8",
    measurementId: "G-4TZPJESW1P"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// States and Cities Data with default cities
const statesAndCities = {
    Delhi: ["Delhi City 1", "Delhi City 2", "Delhi City 3"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli"],
    Tamil Nadu: ["Chennai", "Coimbatore", "Madurai"],
    Andhra Pradesh: ["Hyderabad", "Visakhapatnam", "Vijayawada"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Telangana: ["Hyderabad", "Warangal", "Khammam"],
    West Bengal: ["Kolkata", "Howrah", "Siliguri"]
};

// Populate states select dropdown and sort options
function populateStates() {
    const stateSelect = document.getElementById("state");
    const states = Object.keys(statesAndCities).sort(); // Sort states alphabetically

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Set default state and update cities
    const defaultState = "Delhi"; // Default state
    stateSelect.value = defaultState;
    updateCities(defaultState);
}

// Update cities based on selected state
function updateCities(selectedState) {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    console.log("Selected State:", selectedState); // Debugging line

    // Clear previous city options
    citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';

    // Populate city options based on selected state and sort them
    if (statesAndCities[selectedState]) {
        const cities = statesAndCities[selectedState].sort(); // Sort cities alphabetically
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        // Set default city
        const defaultCity = cities[0]; // Default city
        citySelect.value = defaultCity;
    } else {
        console.log("No cities found for the selected state."); // Debugging line
    }
}

// Validate location form and show donation form
function validateLocationForm() {
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;

    if (!state || !city) {
        alert("Please select both state and city.");
        return;
    }

    // Hide location screen and show donation form screen
    document.getElementById("locationScreen").classList.add("hidden");
    document.getElementById("donationFormScreen").classList.remove("hidden");
}

// Add a new book set
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
            <option value="Literature">Literature</option>
            <option value="History">History</option>
        </select>
        <select name="language[]" required>
            <option value="" disabled selected>Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
        </select>
        <input type="number" name="numberOfBooks[]" placeholder="Number Of Books" required min="1">
        <button type="button" class="remove-btn" onclick="removeBookSet(this)">x</button>
    `;

    bookSetContainer.appendChild(newBookSet);
}

// Remove a book set
function removeBookSet(button) {
    const bookSet = button.parentElement;
    bookSet.remove();
}

// OTP generation and validation
let generatedOTP;

function sendOTP() {
    const mobileNumber = document.getElementById("mobileNumber").value;

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    alert("OTP Sent: " + generatedOTP);

    document.getElementById("donationFormScreen").classList.add("hidden");
    document.getElementById("otpScreen").classList.remove("hidden");
}

async function validateOTP() {
    const enteredOTP = document.getElementById("otp").value;

    if (enteredOTP === generatedOTP) {
        try {
            const donorName = document.getElementById("donorName").value;
            const mobileNumber = document.getElementById("mobileNumber").value;
            const address = document.getElementById("address").value;
            const state = document.getElementById("state").value;
            const city = document.getElementById("city").value;

            const bookTypes = Array.from(document.getElementsByName("bookType[]")).map(select => select.value);
            const languages = Array.from(document.getElementsByName("language[]")).map(select => select.value);
            const numberOfBooks = Array.from(document.getElementsByName("numberOfBooks[]")).map(input => input.value);

            const bookDonationData = {
                donorName,
                mobileNumber,
                address,
                state,
                city,
                books: bookTypes.map((type, index) => ({
                    type,
                    language: languages[index],
                    numberOfBooks: numberOfBooks[index]
                }))
            };

            console.log("Collected Data: ", bookDonationData);

            // Save data to Firestore
            await setDoc(doc(collection(db, "bookDonations")), bookDonationData);
            console.log("Data successfully written to Firestore.");

            alert("Donation data saved successfully!");
            document.getElementById("otpScreen").classList.add("hidden");
            document.getElementById("confirmationScreen").classList.remove("hidden");

        } catch (error) {
            console.error("Error saving donation data to Firestore: ", error.message);
            alert(`Failed to save donation data. Error: ${error.message}`);
        }
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

function goHome() {
    document.getElementById("locationForm").reset();
    document.getElementById("donationForm").reset();
    document.getElementById("otpForm").reset();
    document.getElementById("locationScreen").classList.remove("hidden");
    document.getElementById("donationFormScreen").classList.add("hidden");
    document.getElementById("otpScreen").classList.add("hidden");
    document.getElementById("confirmationScreen").classList.add("hidden");
}

// Populate states and update cities on page load
window.onload = populateStates;

// Attach event listener to state select to update cities dynamically
document.getElementById("state").addEventListener("change", function() {
    updateCities(this.value);
});
