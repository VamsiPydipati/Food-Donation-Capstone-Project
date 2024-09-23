        let generatedOTP;

        // Object containing states and cities
        const statesAndCities = {
            "Delhi": ["Delhi"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
            "Karnataka": ["Bangalore", "Mysore", "Hubli"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "West Bengal": ["Kolkata", "Darjeeling", "Siliguri"]
        };

        // Populate states in the dropdown
        window.onload = function() {
            const stateSelect = document.getElementById('state');
            for (const state in statesAndCities) {
                let option = document.createElement('option');
                option.value = state;
                option.text = state;
                stateSelect.appendChild(option);
            }
        };

        // Update cities based on the selected state
        function updateCities() {
            const stateSelect = document.getElementById('state');
            const citySelect = document.getElementById('city');
            const selectedState = stateSelect.value;

            // Clear current options in the city dropdown
            citySelect.options.length = 1; // Keep the "Select City" option

            if (selectedState in statesAndCities) {
                const cities = statesAndCities[selectedState];
                cities.forEach(city => {
                    let option = document.createElement('option');
                    option.value = city;
                    option.text = city;
                    citySelect.appendChild(option);
                });
            }
        }

        // Validate the location form
        function validateLocationForm() {
            const state = document.getElementById('state').value;
            const city = document.getElementById('city').value;

            if (state && city) {
                document.getElementById('locationScreen').classList.add('hidden');
                document.getElementById('donationFormScreen').classList.remove('hidden');
            } else {
                alert('Please select a state and city.');
            }
        }

        // Add a new clothing set form
        function addClothingSet() {
            const container = document.getElementById('clothesSetContainer');
            const clothingSetHTML = `
                <div class="book-set">
                    <select name="clothingType[]" required>
                        <option value="" disabled selected>Type Of Clothing</option>
                        <option value="Shirt">Shirt</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Pants">Pants</option>
                        <option value="Shorts">Shorts</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Sweater">Sweater</option>
                        <option value="Dress">Dress</option>
                        <option value="Skirt">Skirt</option>
                        <option value="Suits">Suits</option>
                        <option value="Coat">Coat</option>
                    </select>
                    <select name="gender[]" required>
                        <option value="" disabled selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select name="size[]" required>
                        <option value="" disabled selected>Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <input type="number" name="numberOfClothes[]" placeholder="Number Of Clothes" required>
                    <button type="button" class="remove-btn" onclick="removeClothingSet(this)">x</button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', clothingSetHTML);
        }

        // Remove clothing set form
        function removeClothingSet(button) {
            button.parentElement.remove();
        }

        // Send OTP
        function sendOTP() {
            const mobileNumber = document.getElementById('mobileNumber').value;
            const isValidMobile = /^[6-9]\d{9}$/.test(mobileNumber);

            if (!isValidMobile) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            generatedOTP = Math.floor(1000 + Math.random() * 9000);
            alert('Your OTP is: ' + generatedOTP); // Simulate sending OTP via SMS

            document.getElementById('donationFormScreen').classList.add('hidden');
            document.getElementById('otpScreen').classList.remove('hidden');
        }

        // Validate OTP
        function validateOTP() {
            const otpInput = document.getElementById('otp').value;

            if (otpInput == generatedOTP) {
                document.getElementById('otpScreen').classList.add('hidden');
                document.getElementById('confirmationScreen').classList.remove('hidden');
            } else {
                alert('Incorrect OTP, please try again.');
            }
        }

        // Return to Home after confirmation
        function goHome() {
            document.getElementById('confirmationScreen').classList.add('hidden');
            document.getElementById('locationScreen').classList.remove('hidden');
            document.getElementById('locationForm').reset();
            document.getElementById('donationForm').reset();
            document.getElementById('otpForm').reset();
        }
