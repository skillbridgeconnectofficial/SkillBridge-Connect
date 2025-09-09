// This function runs automatically when the page loads
async function fetchDashboardData() {
    try {
        // NOTE: The URL below is still incorrect and is the primary cause
        // of your current connection error.
        const res = await fetch("http://localhost:5000/dashboardpage", {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();

        if (res.ok) {
            // --- FIX #1: Check if the element exists before using it ---
            const welcomeElement = document.getElementById("welcomeMsg");
            if (welcomeElement) {
                welcomeElement.textContent = data.msg;
            } else {
                console.error("Could not find the 'welcomeMsg' element on the page.");
            }
        } else {
            alert(data.msg);
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert("Could not connect to the server. Please try again later.");
        window.location.href = "/login.html";
    }
}

async function logout() {
    try {
        // NOTE: The URL below is also incorrect.
        const res = await fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include"
        });

        // --- FIX #2: Check for a successful response before redirecting ---
        if (res.ok) {
            alert("You have been logged out.");
            window.location.href = "/login.html";
        } else {
            // If logout fails, inform the user.
            const data = await res.json();
            alert(`Logout failed: ${data.msg || 'Server error'}`);
        }
    } catch (error) {
        console.error('Logout error:', error);
        alert("Failed to connect to the server for logout.");
    }
}

// Call the function to fetch data when the page loads
fetchDashboardData();