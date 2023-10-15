import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const buyCheemz = async() => {
    if (atm) {
      let tx = await atm.withdraw(50);
      await tx.wait()
      getBalance();
    }
  }
  const buyPoggers = async() => {
    if (atm) {
      let tx = await atm.withdraw(150);
      await tx.wait()
      getBalance();
    }
  }
  const buyFlapperz = async() => {
    if (atm) {
      let tx = await atm.withdraw(2000);
      await tx.wait()
      getBalance();
    }
  }

  const deposit = async() => {
    if (atm) {
      const withdrawAmount = parseInt(document.getElementById("withdrawAmount").value);
      alert("Do you want to withdraw "+withdrawAmount+"?");
      let tx = await atm.deposit(withdrawAmount);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
      <div>
        <br/><br/><br/>
      <button className="rbutton" onClick={connectAccount}>Please connect your Metamask wallet</button>
      
      <style>{
          `
          button{
            display: inline-block;
            outline: 0;
            cursor: pointer;
            border-radius: 8px;
            box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
            background: #FFD814;
            border: 1px solid #FCD200;
            font-size: 13px;
            height: 31px;
            padding: 0 11px;
            text-align: center;
            min-width: 200px;
            font-weight: 500;
            color: #0F1111;        
          }
          button:hover{
            background: #F7CA00;
            border-color: #F2C200;
            box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
        }
          `}

        </style>
      </div>
      )
      
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>

        <input id="withdrawAmount"></input><br/><br/>
        <button onClick={deposit}>Deposit Money</button>

        <h1>Plushie Shop</h1>

        <div className="object-container">
          <img width="150px" src="https://m.media-amazon.com/images/I/51qkR61T95L._AC_UL640_FMwebp_QL65_.jpg" alt="plushie" />
          <h2>Cheemz</h2>
          <p>Price: 50 HETH</p>
          <button onClick={buyCheemz}>Buy</button>
        </div><br/><br/>
        <div className="object-container">
          <img width="150px" src="https://m.media-amazon.com/images/I/51rctvRgqeL._AC_UL640_FMwebp_QL65_.jpg" alt="plushie" />
          <h2>PeppaPoggers</h2>
          <p>Price: 150 HETH</p>
          <button onClick={buyPoggers}>Buy</button>
        </div><br/><br/>
        <div className="object-container">
          <img width="150px" src="https://m.media-amazon.com/images/I/61MCJ3XzAKL._AC_UL640_FMwebp_QL65_.jpg" alt="plushie" />
          <h2>Miss Flapperz</h2>
          <p>Price: 2000 HETH</p>
          <button onClick={buyFlapperz}>Buy</button>
        </div><br/><br/>

        <style>{
          `
          button{
            display: inline-block;
            outline: 0;
            cursor: pointer;
            border-radius: 8px;
            box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
            background: #FFD814;
            border: 1px solid #FCD200;
            font-size: 13px;
            height: 31px;
            padding: 0 11px;
            text-align: center;
            min-width: 200px;
            font-weight: 500;
            color: #0F1111;        
          }
          button:hover{
            background: #F7CA00;
            border-color: #F2C200;
            box-shadow: 0 2px 5px 0 rgb(213 217 217 / 50%);
        }
          `}

        </style>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header>
        <h1 className="heading">HITHEREUM</h1></header>
      {initUser()}
      <style jsx>{`
      
        .container {
          text-align: center;
          font-family: "Lucida Console", "Courier New", monospace;
        }
        .heading{
          color: red;
          background-color: orange;
          border-style: groove;
          border-color: green;
          margin: 10px 10px 10px 10px;
          border-width : 3px;
          margin-top: 10vh;
        }
        
      `}
      </style>
    </main>
  )
}
