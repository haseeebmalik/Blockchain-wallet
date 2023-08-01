import React, { useState } from 'react';
import { ethers } from 'ethers';

const AccountRecovery = ({recoverAccountHandler, setSeedPhrase, seedPhrase,account}) => {
  


  const handleSeedPhraseChange = (event) => {
    setSeedPhrase(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // recoverAccount();
      recoverAccountHandler(seedPhrase)
    }
  };


  return (

    <div className="container mt-4">
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={seedPhrase}
        onChange={handleSeedPhraseChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter Seed Phrase"
      />
    </div>
  

 
  </div>
  );
};

export default AccountRecovery;