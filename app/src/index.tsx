import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import WalletLayer from "./WalletLayer";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <WalletLayer/>
    </ChakraProvider>
  </React.StrictMode>
);
