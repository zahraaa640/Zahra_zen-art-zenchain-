// app.js

document.addEventListener("DOMContentLoaded", () => {
  const connectWalletButton = document.getElementById("connectWallet");

  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      // نمایش آدرس کوتاه‌شده روی دکمه
      const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
      connectWalletButton.innerText = shortAddress;
      connectWalletButton.disabled = true;

      console.log("Wallet connected:", account);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Connection failed. Please try again.");
    }
  }

  connectWalletButton.addEventListener("click", connectWallet);

  // چک کن اگر از قبل ولت وصله، خودش آدرس رو نشون بده
  async function checkConnection() {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const account = accounts[0];
        const shortAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
        connectWalletButton.innerText = shortAddress;
        connectWalletButton.disabled = true;
      }
    }
  }

  checkConnection();
});
