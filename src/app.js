import React, { useState } from 'react';
import { ethers } from 'ethers';
import './style.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setWalletAddress(address);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('MetaMask not found. Please install it.');
    }
  };

  return (
    <div className="zen-container">
      <h1>ZenArt</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && (
        <>
          <p>Your address: {walletAddress}</p>
          <p>Your balance: {balance} ZETH</p>
        </>
      )}
    </div>
  );
}

export default App;
