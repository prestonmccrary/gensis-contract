// grid that wraps left container and right container
import { ReactNode } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";

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
  Spacer,
} from "@chakra-ui/react";

import greenCompany from "./greenCompany.svg";
import orangeCompany from "./orangeCompany.svg";
import purpleCompany from "./purpleCompany.svg";
import blueCompany from "./blueCompany.svg";
import oliveCompany from "./oliveCompany.svg";

export default function Trending() {
  const navigate = useNavigate();

  const navMarketPlace = () => {
    navigate("/marketplace");
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box>
        <VStack margin="30px" spacing="30px">
          <Text fontSize={40} fontWeight={700}>
            Trending Companies
          </Text>
          <HStack
            width="1200px"
            spacing="50px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="40px"
            borderRadius="30px"
          >
            <img src={greenCompany}></img>
            <SimpleGrid width="520px">
              <Text fontWeight="700" fontSize={20}>
                Subcription Box E-Commerce Start-up
              </Text>
              <Text fontWeight="700" fontSize={14}>
                San Francisco, CA, USA
              </Text>
              <Text fontWeight="400" fontSize={15}>
                Profitable, socially conscious eCommerce subscription box
                shipping handsqueezed juices every month. $100,000 ARR to date.
              </Text>
            </SimpleGrid>
            <Spacer />
            <Box>
              <Button
                variant="solid"
                width="130px"
                height="50px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
                onClick={navMarketPlace}
                leftIcon={<AddIcon />}
                // leftIcon={<EmailIcon />}
              >
                Bid Now
              </Button>
              <Button
                colorScheme="Gray"
                width="150px"
                height="50px"
                variant="outline"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
              >
                Learn More
              </Button>
            </Box>
          </HStack>
          <HStack
            width="1200px"
            spacing="50px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="40px"
            borderRadius="30px"
          >
            <img src={orangeCompany}></img>
            <SimpleGrid width="520px">
              <Text fontWeight="700" fontSize={20}>
                Data Analytics Start-up
              </Text>
              <Text fontWeight="700" fontSize={14}>
                San Francisco, CA, USA
              </Text>
              <Text fontWeight="400" fontSize={15}>
                New data analytics firm that provides GUI for configuring API
                endpoints when building a front-end application
              </Text>
            </SimpleGrid>
            <Spacer />
            <Box>
              <Button
                variant="solid"
                width="130px"
                height="50px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
                onClick={navMarketPlace}
                leftIcon={<AddIcon />}
              >
                Bid Now
              </Button>
              <Button
                colorScheme="Gray"
                width="150px"
                height="50px"
                variant="outline"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
              >
                Learn More
              </Button>
            </Box>
          </HStack>
          <HStack
            width="1200px"
            spacing="50px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="40px"
            borderRadius="30px"
          >
            <img src={purpleCompany}></img>
            <SimpleGrid width="520px">
              <Text fontWeight="700" fontSize={20}>
                Biotech Start-up
              </Text>
              <Text fontWeight="700" fontSize={14}>
                Berkeley, CA, USA
              </Text>
              <Text fontWeight="400" fontSize={15}>
                New bio tech startup that produces FDA-approved pain reliever,
                $945,000 ARR to date.
              </Text>
            </SimpleGrid>
            <Spacer />
            <Box>
              <Button
                variant="solid"
                width="130px"
                height="50px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
                onClick={navMarketPlace}
                leftIcon={<AddIcon />}
              >
                Bid Now
              </Button>
              <Button
                colorScheme="Gray"
                width="150px"
                height="50px"
                variant="outline"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
              >
                Learn More
              </Button>
            </Box>
          </HStack>
          <HStack
            width="1200px"
            spacing="50px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="40px"
            borderRadius="30px"
          >
            <img src={blueCompany}></img>
            <SimpleGrid width="520px">
              <Text fontWeight="700" fontSize={20}>
                Analytics SaaS Start-up
              </Text>
              <Text fontWeight="700" fontSize={14}>
                Palo Alto, CA, USA
              </Text>
              <Text fontWeight="400" fontSize={15}>
                Established Saas analytics platform with $400,000 in ARR and $3
                ML in GMV. Over 850,000 registered users to date.
              </Text>
            </SimpleGrid>
            <Spacer />
            <Box>
              <Button
                variant="solid"
                width="130px"
                height="50px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
                onClick={navMarketPlace}
                leftIcon={<AddIcon />}
              >
                Bid Now
              </Button>
              <Button
                colorScheme="Gray"
                width="150px"
                height="50px"
                variant="outline"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
              >
                Learn More
              </Button>
            </Box>
          </HStack>
          <HStack
            width="1200px"
            spacing="50px"
            bgGradient="linear(to-tr,rgba(35, 38, 47, 1), rgba(35, 38, 47, 0))"
            padding="40px"
            borderRadius="30px"
          >
            <img src={oliveCompany}></img>
            <SimpleGrid width="520px">
              <Text fontWeight="700" fontSize={20}>
                No-code SaaS Start-up
              </Text>
              <Text fontWeight="700" fontSize={14}>
                San Francisco, CA, USA
              </Text>
              <Text fontWeight="400" fontSize={15}>
                Simple, no-code, waitlist builder that sync to a startup???s
                current CRM through zapier zaps. Over 200,000 users.
              </Text>
            </SimpleGrid>
            <Spacer />
            <Box>
              <Button
                variant="solid"
                width="130px"
                height="50px"
                borderRadius={30}
                bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                marginRight="30px"
                onClick={navMarketPlace}
                leftIcon={<AddIcon />}
              >
                Bid Now
              </Button>
              <Button
                colorScheme="Gray"
                width="150px"
                height="50px"
                variant="outline"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
              >
                Learn More
              </Button>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
