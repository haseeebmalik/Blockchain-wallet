import React,{useState} from 'react';
import { generateKeys,recoverAccount } from '../utils/accountUtils';
import AccountDetail from './AccountDetail';
import AccountRecovery from './RecoverAccount';


const AccountCreate = () => {

  // Declare a new state variable, which we'll call "account"
  const [account, setAccount] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState('');

 let keyPhrase
const createAccountHandler=async()=>{
  const keys=await generateKeys(keyPhrase)
  console.log("keys",keys)
  setAccount(keys);
  localStorage.setItem("seedPhrase", keys.seedPhrase);

}

const recoverAccountHandler = (seedPhrase) => {
  const result=recoverAccount(seedPhrase)
  console.log("result",result)
  setAccount(result);
  localStorage.setItem("seedPhrase", result.seedPhrase);


};
  return (
    <div>
      <button  className="btn btn-primary mr-3" onClick={()=>createAccountHandler()}>Create Account</button>
      <button className='btn btn-secondary' onClick={()=>recoverAccountHandler(seedPhrase)}>Recover account</button>
      <AccountRecovery recoverAccountHandler={recoverAccountHandler} account={account} setSeedPhrase={setSeedPhrase} seedPhrase={seedPhrase}/>
      <AccountDetail account={account}/>
    </div>
  );
};

export default AccountCreate;
