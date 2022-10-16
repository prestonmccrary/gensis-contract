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
  Input,
  Divider,
} from "@chakra-ui/react";

import usdc from "./usdc.svg";

export default function MintingPlace() {
  return (
    <>
      <Box width="1200px" padding="40px">
        <Box>
          <Text fontSize={64} fontWeight={700} lineHeight={1}>
            Mint Genesis Tokens
          </Text>
        </Box>
        <HStack spacing="30px" marginTop="40px" marginBottom="40px">
          {/* token faq about total token minted & # of tokens required for conversion*/}
          <SimpleGrid
            width="400px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="30px"
            borderRadius="30px"
            spacing="40px"
            marginTop="30px"
          >
            <SimpleGrid>
              <Text fontSize={18} fontWeight={600}>
                Total Tokens Minted
              </Text>
              <Text fontSize={45} fontWeight={700}>
                2,347 / 10,000
              </Text>
            </SimpleGrid>
            <SimpleGrid>
              <Text fontSize={18} fontWeight={600}>
                # Tokens required for Conversion
              </Text>
              <Text fontSize={45} fontWeight={700}>
                1,000
              </Text>
            </SimpleGrid>
          </SimpleGrid>

          {/* bidding and selling */}
          <SimpleGrid
            bgGradient="linear(to-tl,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="30px"
            borderRadius="30px"
            width="750px"
            spacing="20px"
          >
            <HStack>
              {/* trading history */}
              {/* price */}
              <SimpleGrid width="200px" spacing="20px">
                {/* display prices in this column */}
                <Box>
                  <Text fontSize={18} fontWeight={600}>
                    Price
                  </Text>
                  {/* USDC/Sol Logo */}
                </Box>
                <HStack>
                  {/* USDC/Sol Logo */}
                  <img src={usdc}></img>
                  <Text fontWeight={600} fontSize={24}>
                    2,110 USDC
                  </Text>
                </HStack>
                <HStack>
                  {/* USDC/Sol Logo */}
                  <img src={usdc}></img>
                  <Text fontWeight={600} fontSize={24}>
                    1,983 USDC
                  </Text>
                </HStack>
                <HStack>
                  {/* USDC/Sol Logo */}
                  <img src={usdc}></img>
                  <Text fontWeight={600} fontSize={24}>
                    1,374 USDC
                  </Text>
                </HStack>
              </SimpleGrid>
              {/* from which wallet */}
              <SimpleGrid width="120px" spacing="20px">
                <Text fontSize={18} fontWeight={600}>
                  From
                </Text>
                {/* these are static wallet addresses */}
                <Text fontWeight={600} fontSize={24}>
                  0x7fn
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  6jPJf3
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  F93Lv
                </Text>
              </SimpleGrid>
              {/* to which wallet*/}
              <SimpleGrid width="120px" spacing="20px">
                <Text fontSize={18} fontWeight={600}>
                  To
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  5AQaX
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  GmmUP
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  2ec86C
                </Text>
              </SimpleGrid>
              {/* date */}
              <SimpleGrid width="200px" spacing="20px">
                <Text fontSize={18} fontWeight={600}>
                  Date
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  an hour ago
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  13 hours ago
                </Text>
                <Text fontWeight={600} fontSize={24}>
                  2 days ago
                </Text>
              </SimpleGrid>
            </HStack>
            <Divider></Divider>
            <HStack>
              {/* placing bid */}
              {/* Bid Amount */}
              <SimpleGrid width="200px">
                {/* this is static */}
                <Text fontSize={18} fontWeight={600}>
                  Bid Amount
                </Text>
                {/* this shows price in Sol/USDC */}
                <HStack>
                  <img src={usdc}></img>
                  {/* Price of token in sol */}
                  <text fontWeight={600} fontSize={24}>
                    USDC
                  </text>
                </HStack>
              </SimpleGrid>
              {/* this is input field for token amount */}
              <Input variant="outline" placeholder="# of Tokens"></Input>
              {/* Button for submitting token bidding */}
              <Button
                variant="solid"
                width="170px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
              >
                <Text fontSize="14px">Bid tokens</Text>
              </Button>
            </HStack>
          </SimpleGrid>
        </HStack>
      </Box>
    </>
  );
}
