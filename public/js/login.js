document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert(data.message || "Invalid username or password");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
  document.getElementById("message").textContent = data.message || data.error;
});
