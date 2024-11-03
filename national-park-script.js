const npsApiKey = 'y0pX2hy8ubpA4dYaNguanCS0WuEtLYvCBzOhAxsm';
const npsEndpoint = 'https://developer.nps.gov/api/v1/parks';

// Function to get location based on current GPS
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            findNearbyParks(latitude, longitude);
        }, showError);
    } else {
        document.getElementById("locationOutput").innerText = "Geolocation is not supported by this browser.";
    }
}

// Function to search by manually entered address
// async function searchByAddress() {
//     const address = document.getElementById("addressInput").value;
//     if (!address) {
//         document.getElementById("locationOutput").innerText = "Please enter a valid address.";
//         return;
//     }
//     const coords = await geocodeAddress(address);
//     if (coords) {
//         findNearbyParks(coords.latitude, coords.longitude);
//     } else {
//         document.getElementById("locationOutput").innerText = "Unable to find location for the provided address.";
//     }
// }

// Function to find nearby parks using the NPS API
async function findNearbyParks(latitude, longitude) {
    try {
        const response = await fetch(`${npsEndpoint}?lat=${latitude}&lon=${longitude}&api_key=${npsApiKey}&limit=50`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const parks = data.data;
            document.getElementById("locationOutput").innerHTML = `<h3 class="text-xl font-bold">Nearest National Parks:</h3>`;
            
            const parksWithDists = parks.map(park => {
                const parkLat = parseFloat(park.latitude);
                const parkLon = parseFloat(park.longitude);

                if (isNaN(parkLat) || isNaN(parkLon)) {
                    return null;
                }
                
                const distance = calculateDistance(latitude, longitude, parkLat, parkLon);

                if (isNaN(distance)) {
                    return null;
                }
        
                return { ...park, distance };
            })
            .filter(park => park !== null);

            const closestPark = parksWithDists.sort((a, b) => a.distance - b.distance)[0];
            document.getElementById("locationOutput").innerHTML = `
                <div class="bg-white text-gray-900 rounded-lg shadow-lg p-6 max-w-md mx-auto mt-6">
                    <h3 class="text-2xl font-mono font-bold mb-2">${closestPark.fullName}</h3>
                    <p class="text-gray-700 font-mono mb-4">${closestPark.distance.toFixed(2)} miles away</p>
                    <p class="text-gray-700 font-mono mb-4">${closestPark.description}</p>
                    <a href="${closestPark.url}" target="_blank" class="text-blue-500 font-mono hover:underline">Learn more</a>
                </div>
            `;
        } else {
            document.getElementById("locationOutput").innerText = "No parks found nearby.";
        }
    } catch (error) {
        document.getElementById("locationOutput").innerText = "Error fetching park data.";
        console.error("Error:", error);
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function getRandomPark() {
    try {
        const response = await fetch(`${npsEndpoint}?api_key=${npsApiKey}&limit=50`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.data.length);
            const randomPark = data.data[randomIndex];

            document.getElementById("locationOutput").innerHTML = `
                <div class="bg-white text-gray-900 rounded-lg shadow-lg p-6 max-w-md mx-auto mt-6">
                    <h3 class="text-2xl font-bold font-mono mb-2">${randomPark.fullName}</h3>
                    <p class="text-gray-700 font-mono mb-4">${randomPark.description}</p>
                    <a href="${randomPark.url}" target="_blank" class="text-blue-500 font-mono hover:underline">Learn more</a>
                </div>
            `;
        } else {
            document.getElementById("locationOutput").innerText = "No parks found.";
        }
    } catch (error) {
        document.getElementById("locationOutput").innerText = "Error fetching park data.";
        console.error("Error:", error);
    }
}

// Helper function to handle geocoding
// async function geocodeAddress(address) {
//     const apiKey = 'GEOCODING_API_KEY';
//     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     const response = await fetch(geocodeUrl);
//     const data = await response.json();
//     if (data.results && data.results.length > 0) {
//         const location = data.results[0].geometry.location;
//         return { latitude: location.lat, longitude: location.lng };
//     } else {
//         return null;
//     }
// }

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("locationOutput").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("locationOutput").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("locationOutput").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("locationOutput").innerText = "An unknown error occurred.";
            break;
    }
}
