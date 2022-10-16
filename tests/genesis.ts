import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Genesis } from "../target/types/genesis";
import { GenesisMint } from "../target/types/genesis_mint";
import { PublicKey } from '@solana/web3.js';
import { expect} from 'chai';

import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress
} from "@solana/spl-token";

const seed_name = (s: string) : string => {
  return s.slice(0,32)
}


describe("genesis", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Genesis as Program<Genesis>;

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


     let res = await program.methods
      .trade("Jimbo!", 25, 25)
      .accounts({
        user: provider.wallet.publicKey,
        companyData: companyDataLocation,
        companyDataOrders: companyOrderLocation,
        exchange: exchangeKeypair.publicKey
      })
      .rpc();

      console.log(res)

    let orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)



    const user1 = anchor.web3.Keypair.generate();
    const user2 = anchor.web3.Keypair.generate();


    await program.methods
    .trade("Jimbo!", 100, 27)
    .accounts({
      user: provider.wallet.publicKey,
      companyData: companyDataLocation,
      companyDataOrders: companyOrderLocation,
      exchange: exchangeKeypair.publicKey
    })
    .rpc();



     orderBook = (await program.account.orderBook.fetch(companyOrderLocation))
    console.log(orderBook)

    })




});
