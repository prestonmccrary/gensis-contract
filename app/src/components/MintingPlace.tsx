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
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import usdc from "./usdc.svg";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
                <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
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
