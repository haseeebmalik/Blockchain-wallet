import { Wallet } from 'ethers'
export const generateKeys =async (seedPhrase) => {
   
  console.log("seedPhrase",seedPhrase)
    if (seedPhrase) {
      // Create a wallet instance from the provided seed phrase
     let wallet =await Wallet.fromMnemonic(seedPhrase);
    } else {
      try {
      // Generate a random 12-word mnemonic seed phrase
     let wallet =await Wallet.createRandom();
      console.log("randomWallet",wallet)
      // wallet = randomWallet.connect(ethers.getDefaultProvider());
      seedPhrase = wallet.mnemonic.phrase;
      console.log("seedPhrase",seedPhrase)
      const address = wallet.address;
      const priavateKey=wallet.privateKey
  
    
      return { seedPhrase, address, priavateKey };
    
      }catch(err){
        console.log("err",err)
        return err
      }
    }
  
  
    
  
  };

 export const recoverAccount = (seedPhrase) => {
    try {
      console.log("seedPhrase",seedPhrase)
      let wallet = Wallet.fromPhrase(seedPhrase);
      
  
      // setAccount({
      //   publicKey: wallet.publicKey,
      //   address:wallet.address,
      //   privateKey: wallet.privateKey,
      // });
      return wallet
    } catch (error) {
      console.error('Error recovering account:', error);
      // setAccount(null);
      return error
    }
    
  };
  export function toFixedIfNecessary( value, decimalPlaces = 2 ){
    return +parseFloat(value).toFixed( decimalPlaces );
  }
  export function shortenAddress(str, numChars=4) {
    return `${str.substring(0, numChars)}...${str.substring(str.length - numChars)}`;
  }
  
  
  
  
  
  
  
  
  
  
