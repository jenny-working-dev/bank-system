document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    document.getElementById("message").textContent = data.message || data.error;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  });
