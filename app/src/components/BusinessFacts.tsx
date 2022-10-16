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

import Timer from "./Timer";

import orangeCompany from "./orangeCompany.svg";

export default function BusinessFacts() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 259200); // 10 minutes timer
  return (
    <>
      {/* overall grid */}
      <HStack justifyContent="center" spacing="50px">
        {/* left box */}
        <VStack spacing={10} justify="start">
          {/* left top text */}
          <Text
            fontSize={64}
            fontWeight={700}
            lineHeight={1}
            marginTop="10px"
            paddingBottom="10px"
            marginLeft="10px"
          >
            alt cloud analytica
          </Text>
          {/* <left middle countdown */}
          <VStack
            paddingTop="60px"
            paddingBottom="60px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            width="400px"
            borderRadius="30px"
          >
            <Text fontSize={18} fontWeight={600}>
              Auction ending in
            </Text>
            <Timer expiryTimestamp={time} />
          </VStack>
          {/* left bottom buttons */}
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
              <img src={orangeCompany}></img>
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
            <SimpleGrid justifyContent="start" spacing="20px">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  1 Token As Equity
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  0.003%
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Team Size
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  48
                </Text>
              </Box>
            </SimpleGrid>
            {/* stack2 */}
            <SimpleGrid justifyContent="start" spacing="20px">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Founded In
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  Mar 2018
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Customer Count
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  1000+
                </Text>
              </Box>
            </SimpleGrid>
            {/* stack 3 */}
            <SimpleGrid justifyContent="start" spacing="20px">
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Current Bid
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  2,114 SOL
                </Text>
              </Box>
              <Box>
                <Text fontWeight={600} fontSize={14}>
                  Genesis Valuation
                </Text>
                <Text fontWeight={700} fontSize={40}>
                  $59.58M
                </Text>
              </Box>
            </SimpleGrid>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
}
