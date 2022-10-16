import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { GenesisMint } from "../genesis_mint"

const initUser = async ():Promise<[Number, Number]> => {
    return new Promise<[Number, Number]>((resolve, reject) => {
         setTimeout(() => {
            resolve([10, 10]);
          }, 200)
    })
}

export {initUser}