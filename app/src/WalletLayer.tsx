import App from "./App"
import { useMemo } from "react";

import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";


const WalletLayer = () => {

    const localNetwork = WalletAdapterNetwork.Testnet;
    const endpoint = useMemo(() => clusterApiUrl(localNetwork), [localNetwork]);
    // initialise all the wallets you want to use
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
        new SlopeWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        new SolletExtensionWalletAdapter(),
        new SolletWalletAdapter(),
      ],
      [localNetwork]
    );

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <App/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

    
export default WalletLayer