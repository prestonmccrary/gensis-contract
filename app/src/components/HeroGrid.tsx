// grid that wraps left container and right container
import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  ButtonGroup,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  VStack,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import bluecloud from "./bluecloud.svg";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function HeroGrid() {
  const navigate = useNavigate();

  const navMarketPlace = () => {
    navigate("/marketplace");
  };

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      {/* overall grid */}
      <HStack justifyContent="center" spacing="50px">
        {/* left box */}
        <VStack spacing={10} justify="start">
          {/* left top text */}
          <Text fontSize={64} fontWeight={700} lineHeight={1} marginTop="-50px">
            ocean data insight
          </Text>
          {/* <left middle countdown */}
          <VStack
            paddingTop="25px"
            paddingBottom="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            width="400px"
            borderRadius="30px"
          >
            <Text fontSize={18} fontWeight={600}>
              Auction ending in
            </Text>
            <HStack spacing={5}>
              <VStack>
                <Text fontSize={45} fontWeight={700}>
                  04
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  Days
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={45} fontWeight={700}>
                  12
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  Hours
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={45} fontWeight={700}>
                  53
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  Mins
                </Text>
              </VStack>
              <VStack>
                <Text fontSize={45} fontWeight={700}>
                  45
                </Text>
                <Text fontSize={16} fontWeight={600}>
                  Secs
                </Text>
              </VStack>
            </HStack>
          </VStack>
          {/* left bottom buttons */}
          <Box width="371px" justifyContent="space-between">
            {/* button1 */}
            <Button
              variant="solid"
              width="170px"
              borderRadius={30}
              bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
              marginRight="30px"
              onClick={navMarketPlace}
            >
              <Text fontSize="14px">Bid tokens</Text>
            </Button>
            {/* button2 */}
            <Button
              colorScheme="Gray"
              variant="outline"
              width="170px"
              borderRadius={30}
              onClick={navMarketPlace}
            >
              <Text fontSize="14px" fontWeight={400}>
                Browse Start-ups
              </Text>
            </Button>
          </Box>
        </VStack>
        {/* right box */}
        <VStack spacing={10}>
          <Box
            display="flex"
            borderRadius="30px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            width="700px"
            paddingLeft="40px"
            paddingTop="20px"
            paddingBottom="20px"
          >
            <Box width="100px">
              <img src={bluecloud}></img>
            </Box>
            <SimpleGrid justifyContent="start" textAlign="left" width="480px">
              <Text textAlign="left" fontSize={20} fontWeight={700}>
                Analytics SaaS Start-up
              </Text>
              <Text textAlign="left" fontSize={14} fontWeight={700}>
                Palo Alto, CA, USA
              </Text>
              <Flex flexWrap="wrap" textAlign="left">
                Established Saas analytics platform with $400,000 in ARR and $3
                ML in GMV. Over 850,000 registered users to date.
              </Flex>
            </SimpleGrid>
          </Box>
          {/* right bottom box */}
          <HStack
            spacing="45px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            width="700px"
            padding="40px"
            borderRadius="30px"
          >
            {/* stack1 */}
            <SimpleGrid justifyContent="start">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  1 Token As Equity
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  0.01%
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Team Size
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  34
                </Text>
              </Box>
            </SimpleGrid>
            {/* stack2 */}
            <SimpleGrid justifyContent="start">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Founded In
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  June 2022
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Customer Count
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  50,000+
                </Text>
              </Box>
            </SimpleGrid>
            {/* stack 3 */}
            <SimpleGrid justifyContent="start">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Current Bid
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  630 SOL
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Genesis Valuation
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  $1.58M
                </Text>
              </Box>
            </SimpleGrid>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
}
