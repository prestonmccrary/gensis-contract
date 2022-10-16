import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, MarketPlace, BusinessInfo, FormPage } from "./Pages";
import { useAnchorWallet, AnchorWallet } from "@solana/wallet-adapter-react";

import "./App.css";
import { useEffect, useState } from "react";
import { Connection } from '@solana/web3.js';
import {AnchorProvider } from '@project-serum/anchor';
import { WalletKeypairError } from "@solana/wallet-adapter-base";


import mint_idl from '../genesis_mint.json';
import dex_idl from '../genesis.json';

// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");



const OWNER = "ywwQZFsBx2oCEbqnPoztH1vpQXJiNQE9QcVvaFwf4Vu"



const App = () => {
  // you can use Mainnet, Devnet or Testnet here

  const wallet = useAnchorWallet()
  const [hasInit, setInit] = useState(false)


  useEffect(() => {
    if(!hasInit && wallet){
      init()
    }
  }, [wallet, hasInit])

  const init = async () => {
    setInit(true)

    
    let userWallet = (wallet as AnchorWallet) 

    let provider = await getProvider(userWallet);



    // if(userWallet?.toBase58() === OWNER){
    //   console.log('owner')

    // } else {
    //   console.log('reg')
    // }
  }

  // const init_mint = () => {

  //   const mintProgram = new Program(mint_idl, programID, provider);


  // }

  async function getProvider(wallet : AnchorWallet) {
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network);

    return new AnchorProvider(connection, wallet, {})
  }

 
  
  return (
      <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/businessinfo" element={<BusinessInfo />} />
                <Route path="/form" element={<FormPage />} />
              </Routes>
            </Router>
          </div>
  );
};

export default App;
