import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const zenChainParams = {
    chainId: '0x7a69', // Chain ID تستی ZenChain (مثال: 31337)
    chainName: 'ZenChain Testnet',
    nativeCurrency: {
      name: 'ZenETH',
      symbol: 'ZETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.zenchain.io'], // آدرس واقعی ZenChain
    blockExplorerUrls: ['https://explorer.zenchain.io'],
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask نصب نیست');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));

      const network = await provider.getNetwork();
      if (network.chainId !== parseInt(zenChainParams.chainId, 16)) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [zenChainParams],
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="zen-container">
      <h1>ZenArt</h1>
      <p>هنر آزاد روی بلاکچین ZenChain</p>
      <button onClick={connectWallet}>🔗 اتصال به کیف پول</button>
      {walletAddress && (
        <div>
          <p>آدرس کیف پول: {walletAddress}</p>
          <p>موجودی: {balance} ZETH</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
