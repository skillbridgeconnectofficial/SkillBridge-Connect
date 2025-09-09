

const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if(username === "" || password === ""){
    errorMsg.textContent = "⚠️ Please fill in all fields";
    return;
  }

  try {
    const res = await fetch("https://skillbridge-connect.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if(res.ok){
      alert("✅ Login successful!");
      window.location.href = "/student_dashboard.html";
    }
    else {
      errorMsg.textContent = data.msg;
    }
  } catch (err) {
    errorMsg.textContent = "⚠️ Server error";
  }
});

