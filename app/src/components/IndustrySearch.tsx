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

import aiml from "./aiml.svg";
import sassicon from "./sassicon.svg";
import web3 from "./web3.svg";
import datascience from "./datascience.svg";
import ecommerce from "./ecommerce.svg";

export default function IndustrySearch() {
  return (
    <>
      <VStack padding="40px">
        {/* categories cloud */}
        <HStack spacing="50px">
          <VStack
            height="185px"
            width="195px"
            padding="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            borderRadius="30"
            stroke="2px"
          >
            <img src={sassicon}></img>
            <SimpleGrid>
              <Text fontSize={20} fontWeight={700}>
                SaaS
              </Text>
              <Text fontSize={12} fontWeight={600}>
                Successful and innovative Softwares
              </Text>
            </SimpleGrid>
          </VStack>
          <VStack
            height="185px"
            width="195px"
            padding="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            borderRadius="30"
          >
            <img src={web3}></img>
            <SimpleGrid>
              <Text fontSize={20} fontWeight={700}>
                Web 3.0
              </Text>
              <Text fontSize={12} fontWeight={600}>
                Pioneers of the next generation of internet
              </Text>
            </SimpleGrid>
          </VStack>
          <VStack
            height="185px"
            width="195px"
            padding="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            borderRadius="30"
          >
            <img src={aiml}></img>
            <SimpleGrid>
              <Text fontSize={20} fontWeight={700}>
                AI & ML
              </Text>
              <Text fontSize={12} fontWeight={600}>
                New and ground breaking companies
              </Text>
            </SimpleGrid>
          </VStack>
          <VStack
            height="185px"
            width="195px"
            padding="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            borderRadius="30"
          >
            <img src={ecommerce}></img>
            <SimpleGrid>
              <Text fontSize={20} fontWeight={700}>
                E-Commerce
              </Text>
              <Text fontSize={12} fontWeight={600}>
                Profitable online brands & vendors
              </Text>
            </SimpleGrid>
          </VStack>
          <VStack
            height="185px"
            width="195px"
            padding="25px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            borderRadius="30"
          >
            <img src={datascience}></img>
            <SimpleGrid>
              <Text fontSize={20} fontWeight={700}>
                Data Science
              </Text>
              <Text fontSize={12} fontWeight={600}>
                Profitable B2B companies of tomorrow
              </Text>
            </SimpleGrid>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}
