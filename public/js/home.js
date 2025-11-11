//dashboard button
const dashboardBtn = document.querySelector(".menu-btn button:nth-child(1)");
dashboardBtn.addEventListener("click", () => {
  fetch("dashboard.html").then((res) =>
    res
      .text()
      .then((html) => {
        document.querySelector(".main").innerHTML = html;
      })
      .catch((err) => console.error("Error loading dashboard page:", err))
  );
});

//deposit button
const depositBtn = document.querySelector(".menu-btn button:nth-child(2)");
depositBtn.addEventListener("click", () => {
  fetch("deposit.html").then((res) =>
    res
      .text()
      .then((html) => {
        document.querySelector(".main").innerHTML = html;
      })
      .catch((err) => console.error("Error loading deposit page:", err))
  );
});

const withdrawBtn = document.querySelector(".menu-btn button:nth-child(3)");
withdrawBtn.addEventListener("click", () => {
  fetch("withdraw.html").then((res) =>
    res
      .text()
      .then((html) => {
        document.querySelector(".main").innerHTML = html;
      })
      .catch((err) => console.error("Error loading withdraw page", err))
  );
});

// transactions
const transactionBtn = document.querySelector(".menu-btn button:nth-child(4)");
transactionBtn.addEventListener("click", () => {
  fetch("transaction.html").then((res) =>
    res
      .text()
      .then((html) => {
        document.querySelector(".main").innerHTML = html;
      })
      .catch((err) => console.error("Error loading transaction page", err))
  );
});

//logout
const logoutBtn = document.querySelector(".menu-btn button:nth-child(5)");
logoutBtn.addEventListener("click", () => {
  const confirmDialog = confirm("Are you sure you want to logout?");
  if (confirmDialog) {
    window.location.href = "login.html";
  }
});
