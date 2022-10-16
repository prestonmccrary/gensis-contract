import { ReactNode } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import pagebackground from "../../components/pagebackground.svg";
import BusinessFacts from "../../components/BusinessFacts";
import MintingPlace from "../../components/MintingPlace";
import DueDilligence from "../../components/DueDilligence";

export default function MarketPlace() {
  return (
    <>
      <Box>
        <VStack
          spacing={10}
          w="full"
          align="stretch"
          backgroundImage={pagebackground}
          backgroundSize="cover"
          paddingLeft={40}
          paddingRight={40}
        >
          {/* header */}
          <Header />
          {/* Business Facts */}
          <BusinessFacts />
          {/* minting place */}
          <MintingPlace />
          {/* due dilligence */}
          <DueDilligence />
          {/* footer */}
          <Footer />
        </VStack>
      </Box>
    </>
  );
}
