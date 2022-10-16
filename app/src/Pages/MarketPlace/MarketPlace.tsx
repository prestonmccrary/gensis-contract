import { ReactNode } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import pagebackground from "../../components/pagebackground.svg";
import MarketPlaceHero from "../../components/MarketPlaceHero";
import IndustrySearch from "../../components/IndustrySearch";

export default function MarketPlace() {
  return (
    <>
      <Box>
        <VStack
          spacing={10}
          w="full"
          align="stretch"
          backgroundImage={pagebackground}
          paddingLeft={40}
          paddingRight={40}
        >
          {/* Header */}
          {/* Hero */}
          <Box textAlign="center">
            <Text fontWeight={700} fontSize={50}>
              Startup investing, democratized
            </Text>
          </Box>
          {/* By Industry */}
          <IndustrySearch />
          {/* Results */}
          <MarketPlaceHero />
          {/* Footer */}
          <Footer />
        </VStack>
      </Box>
    </>
  );
}
