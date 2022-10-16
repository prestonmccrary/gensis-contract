import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, MarketPlace, BusinessInfo, FormPage } from "./Pages";
import { useAnchorWallet, AnchorWallet } from "@solana/wallet-adapter-react";

import "./App.css";
import * as anchor from "@project-serum/anchor";
import {  useEffect, useState } from "react";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import {
  Program, web3
} from '@project-serum/anchor';

import { WalletKeypairError } from "@solana/wallet-adapter-base";
import { GenesisMint } from "./genesis_mint";
import { Genesis } from "./genesis";

import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createInitializeMintInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction
} from "@solana/spl-token"; 


import mint_idl from './genesis_mint.json';
import dex_idl from './genesis.json';
import { MinKey } from "mongodb";

// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");

const MintKey = anchor.web3.Keypair.generate();

const OWNER = "ywwQZFsBx2oCEbqnPoztH1vpQXJiNQE9QcVvaFwf4Vu"
const MINT_PROGRAM_PUBLIC = "DJi3Dy9Z55HqoDQDwMqvW9d7nRGSdf5Rb5Kcafkh9KjE"


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
    const secret = new Uint8Array([193,58,199,251,240,201,38,227,31,149,14,228,243,231,62,242,2,135,197,155,136,1,4,49,122,100,198,50,44,6,24,66,194,117,149,155,58,139,197,39,3,122,22,74,127,0,48,198,210,226,78,230,207,224,98,42,121,26,229,133,143,80,43,108])

    let MintKey = anchor.web3.Keypair.fromSecretKey(secret)
    
    console.log('wow')



    //@ts-ignore
    const mintProgram = new Program(mint_idl, MINT_PROGRAM_PUBLIC) as Program<GenesisMint>
    try {
      if(userWallet.publicKey.toBase58() === OWNER){
        await init_mint(mintProgram, userWallet, MintKey)
      }
      console.log("INIT ACC")
    } catch(err) {
      console.log(err)
    }

  }

  const init_mint = async (mintProgram : Program<GenesisMint>, userWallet : AnchorWallet, MintKey: Keypair) => {

    // const mint_init = new anchor.web3.Transaction().add(
    //     anchor.web3.SystemProgram.createAccount({
    //     fromPubkey: wallet?.publicKey as PublicKey,
    //     newAccountPubkey: MintKey.publicKey,
    //     space: MINT_SIZE,
    //     programId: TOKEN_PROGRAM_ID,
    //     lamports,
    //   }),
    //   createInitializeMintInstruction(
    //     MintKey.publicKey, 0, userWallet.publicKey, userWallet.publicKey
    //   )
    // )

    // //@ts-ignore
    // await provider.sendAndConfirm(mint_init, [MintKey])
  }

  // const init_accounts = async (mintProgram : Program<GenesisMint>, userWallet : AnchorWallet, MintKey: Keypair) => {
  //   const activeAccount = await getAssociatedTokenAddress(
  //     MintKey.publicKey,
  //     userWallet.publicKey,
  //   );

  //   const [holdingAccount, ] = await PublicKey
  //   .findProgramAddress(
  //     [
  //       anchor.utils.bytes.utf8.encode("holding-account"),
  //       (wallet?.publicKey as PublicKey).toBuffer()
  //     ],
  //     mintProgram.programId
  //   );
  //   console.log(holdingAccount,activeAccount)
  // }


    // await mintProgram.methods.createHolding()
    // .accounts({
    //   mint: MintKey.publicKey,
    //   rent: SYSVAR_RENT_PUBKEY,
    //   myPda: holdingAccount,
    //   authority: userWallet.publicKey
    // }).rpc()

    // const create_account = new anchor.web3.Transaction().add(
    //   createAssociatedTokenAccountInstruction(
    //     userWallet.publicKey, activeAccount, userWallet.publicKey, MintKey.publicKey
    //   )
    // );

    // const result = await wallet.provider.sendAndConfirm(create_account, []);

    // console.log(
    //   await mintProgram.provider.connection.getParsedAccountInfo(MintKey.publicKey)
    // );

    // console.log(
    //   await mintProgram.provider.connection.getParsedAccountInfo(MintKey.publicKey)
    // );

    // console.log("Account: ", result);
    // console.log("Mint key: ", MintKey.publicKey.toString());
    // console.log("User: ", userWallet.publicKey.toString());
  // }

 
  
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
