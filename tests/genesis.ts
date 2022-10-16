import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Genesis } from "../target/types/genesis";
import { GenesisMint } from "../target/types/genesis_mint";
import { PublicKey, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { expect} from 'chai';
import {MintKey} from './mint'

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


const seed_name = (s: string) : string => {
  return s.slice(0,32)
}


describe("genesis", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Genesis as Program<Genesis>;

  const mintProgram =  anchor.workspace.GenesisMint as Program<GenesisMint>;

  const exchangeKeypair = anchor.web3.Keypair.generate();



  it("Initialize and works!", async () => {


    // Add your test here.
     await program.methods
     .initializeExchange()
     .accounts({
      user: provider.wallet.publicKey,
      exchange: exchangeKeypair.publicKey
     })
     .signers([
      exchangeKeypair
     ])
     .rpc()
    
     expect((await program.account.exchangeData.fetch(exchangeKeypair.publicKey)).nextId).to.equal(1);

    })

  it("Initializes companies", async () => {

    const company_name = "Jimbo!"

    const [companyDataLocation, _] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("company-data"),
          anchor.utils.bytes.utf8.encode(seed_name(company_name))
        ],
        program.programId
      );

      const [companyOrderLocation, _x] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("company-data-orders"),
          anchor.utils.bytes.utf8.encode(seed_name(company_name))
        ],
        program.programId
      );


    await program.methods
      .createCompanyListing("Jimbo!", 100, 25, 5)
      .accounts({
        user: provider.wallet.publicKey,
        companyData: companyDataLocation,
        companyDataOrders: companyOrderLocation,
        exchange: exchangeKeypair.publicKey
      })
      .rpc();

    const res = await program.account.companyData.fetch(companyDataLocation)
    expect(res.name).to.equal("Jimbo!")
    expect(res.id).to.equal(1)
    expect(res.shares).to.equal(100)
    expect((await program.account.exchangeData.fetch(exchangeKeypair.publicKey)).nextId).to.equal(2);


    let orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)

    })

    it("Allows for buy orders", async () => {



    const company_name = "Jimbo!"

    const [companyDataLocation, _] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("company-data"),
          anchor.utils.bytes.utf8.encode(seed_name(company_name))
        ],
        program.programId
      );

      const [companyOrderLocation, _x] = await PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("company-data-orders"),
          anchor.utils.bytes.utf8.encode(seed_name(company_name))
        ],
        program.programId
      );




  

    let activeAddress = await getAssociatedTokenAddress(
      MintKey.publicKey,
      provider.wallet.publicKey,
    );

    let [holdingAddress, x_] = await PublicKey
    .findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("holding-account"),
        provider.publicKey.toBuffer()
      ],
      mintProgram.programId
    )


    let orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)


     await program.methods
    .trade("Jimbo!", 25, 25)
    .accounts({
      user: provider.wallet.publicKey,
      companyData: companyDataLocation,
      companyDataOrders: companyOrderLocation,
      exchange: exchangeKeypair.publicKey,
      main: activeAddress,
      holding: holdingAddress,
      mintProgram:  mintProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID
    })
    .rpc();

    let res2 =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(activeAddress)).value.data

    console.log(
      res2.parsed
    )

    orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)

    // next


    const user1 = anchor.web3.Keypair.generate();


    let activeAddress2 = await getAssociatedTokenAddress(
      MintKey.publicKey,
      user1.publicKey,
    );
    let [holdingAddress2, x2_] = await PublicKey
    .findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("holding-account"),
        user1.publicKey.toBuffer()
      ],
      mintProgram.programId
    )


    await mintProgram.methods.createHolding()
    .accounts({
      mint: MintKey.publicKey,
      rent: SYSVAR_RENT_PUBKEY,
      myPda: holdingAddress2,
      authority: user1.publicKey,
      payer: provider.wallet.publicKey
    }).signers([user1])
    .rpc()


    const create_account = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey, activeAddress2, user1.publicKey, MintKey.publicKey
      )
    );

    const res = await anchor.AnchorProvider.env().sendAndConfirm(create_account, []);


    await mintProgram.methods.mintToken().accounts({
      mint: MintKey.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: activeAddress2,
      authority: provider.wallet.publicKey
    }).rpc();


    let result =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(activeAddress2)).value.data

    console.log(result.parsed)





    await program.methods
    .trade("Jimbo!", 80, 25)
    .accounts({
      user: user1.publicKey,
      companyData: companyDataLocation,
      companyDataOrders: companyOrderLocation,
      exchange: exchangeKeypair.publicKey,
      main: activeAddress2,
      holding: holdingAddress2,
      mintProgram:  mintProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID
    })
    .signers([user1])
    .rpc();



    result =  <anchor.web3.ParsedAccountData> (await program.provider.connection.getParsedAccountInfo(activeAddress2)).value.data

    console.log(result.parsed)


    orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)


    })




});
