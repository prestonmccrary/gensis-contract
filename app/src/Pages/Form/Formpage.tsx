import { ReactNode } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import pagebackground from "../../components/pagebackground.svg";
import BusinessFacts from "../../components/BusinessFacts";
import MintingPlace from "../../components/MintingPlace";
import DueDilligence from "../../components/DueDilligence";
import Form from './Form'
export default function MarketPlace() {
  return (
    <>
      <Flex flexDirection="column" justifyContent="space-between" backgroundImage={pagebackground}>
      <VStack
          spacing={10}
          w="full"
          align="stretch"
          paddingLeft={40}
          paddingRight={40}
        >

        </VStack>
        <VStack
          spacing={10}
          w="100vw"
          align="stretch"
          paddingLeft={40}
          paddingRight={40}
          minH="100vh"
        >
          {/* header */}
        <Header />

            <Form/>

        </VStack>
        <Footer />

      </Flex>
    </>
  );
}
