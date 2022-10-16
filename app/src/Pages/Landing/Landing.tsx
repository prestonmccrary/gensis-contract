import { Box, VStack } from "@chakra-ui/react";
import WithSubnavigation from "../../components/Header";
import CallToActionWithAnnotation from "../../components/Hero";
import HeroGrid from "../../components/HeroGrid";
import Categories from "../../components/Categories";
import Trending from "../../components/Trending";
import Footer from "../../components/Footer";
import pagebackground from "../../components/pagebackground.svg";

export default function Landing() {
  return (
    <Box bg="gray.50">
      <VStack
        spacing={10}
        w="full"
        align="stretch"
        backgroundImage={pagebackground}
        paddingLeft={40}
        paddingRight={40}
      >

        {/* hero text */}
        <CallToActionWithAnnotation />
        {/* hero grid */}
        <HeroGrid />
        {/* hero categories */}
        <Categories />
        {/* trending categories */}
        <Trending />
        {/* footer */}
      </VStack>
    </Box>
  );
}
