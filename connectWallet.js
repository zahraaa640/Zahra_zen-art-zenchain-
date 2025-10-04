async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      console.log("Wallet connected:", userAddress);
      return userAddress;
    } catch (error) {
      console.error("Connection error:", error);
    }
  } else {
    alert("MetaMask not found. Please install it.");
  }
}
