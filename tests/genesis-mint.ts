import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GenesisMint } from "../target/types/genesis_mint";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';

import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createAccount,
  createFreezeAccountInstruction,
  createInitializeAccountInstruction
} from "@solana/spl-token"; 
import { assert } from "chai";
import { min } from "bn.js";

describe("genesis-mint", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  // Retrieve the TokenContract struct from our smart contract
  const program = anchor.workspace.GenesisMint as Program<GenesisMint>;
  // Generate a random keypair that will represent our token
  const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();
  // AssociatedTokenAccount for anchor's workspace wallet
  const key = anchor.AnchorProvider.env().wallet.publicKey;


  let activeAccount = undefined;
  let holdingAcount = undefined;
  
  it("Test", async () => {
    // Get the amount of SOL needed to pay rent for our Token Mint
    const lamports: number = await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );

 

  // Fires a list of instructions
  const mint_init = new anchor.web3.Transaction().add(
    // Use anchor to create an account from the mint key that we created
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: key,
      newAccountPubkey: mintKey.publicKey,
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
      lamports,
    }),
    createInitializeMintInstruction(
      mintKey.publicKey, 0, key, key
    ))


    const a = await anchor.AnchorProvider.env().sendAndConfirm(mint_init, [mintKey]);

  
  })


  it("account setup", async () => {
    activeAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      key,
    );

    let [hA, _] = await PublicKey
    .findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("holding-account"),
        key.toBuffer()
      ],
      program.programId
    );

    holdingAcount = hA

    await program.methods.createHolding()
    .accounts({
      mint: mintKey.publicKey,
      rent: SYSVAR_RENT_PUBKEY,
      myPda: holdingAcount,
      authority: key
    }).rpc()




    const create_account = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        key, activeAccount, key, mintKey.publicKey
      )
    );

    const res = await anchor.AnchorProvider.env().sendAndConfirm(create_account, []);

    console.log(
      await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
    );

    console.log("Account: ", res);
    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", key.toString());
  })



  it("Mint a token", async () => {

    await program.methods.mintToken().accounts({
      mint: mintKey.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: activeAccount,
      authority: key,
    }).rpc();

    let res2 =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(activeAccount)).value.data
    let res3 =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(holdingAcount)).value.data

    console.log(
      res2.parsed
    )
    console.log(
      res3.parsed
    )


    await program.methods
    .transfer(new anchor.BN(5))
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      from: activeAccount,
      to: holdingAcount,
      fromAuthority: key 
    }).rpc()

    let res4 =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(activeAccount)).value.data
    let res5 =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(holdingAcount)).value.data

    console.log(
      res4.parsed
    )
    console.log(
      res5.parsed
    )


  });

});