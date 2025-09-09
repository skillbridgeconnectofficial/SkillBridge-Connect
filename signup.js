const form = document.getElementById('signup-form');
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const username = document.getElementById('fullname').value.trim();
      const password = document.getElementById('password').value.trim();

      if(username === "" || password === ""){
        errorMsg.textContent = "⚠️ Please fill in all fields";
        successMsg.textContent = "";
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
          successMsg.textContent = data.msg;
          errorMsg.textContent = "";
          form.reset();
        } else {
          errorMsg.textContent = data.msg;
          successMsg.textContent = "";
        }
      } catch (err) {
        errorMsg.textContent = "⚠️ Server error";
        successMsg.textContent = "";
      }

    });
