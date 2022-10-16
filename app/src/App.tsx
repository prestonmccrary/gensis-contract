import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { Landing, MarketPlace, BusinessInfo } from "./Pages";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "./App.css";

// import the styles
require("@solana/wallet-adapter-react-ui/styles.css");

const App = () => {
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [solNetwork]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/marketplace" element={<MarketPlace />} />
              <Route path="/businessinfo" element={<BusinessInfo />} />
            </Routes>
            <Footer />
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
