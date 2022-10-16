import { ReactNode } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
} from "@chakra-ui/react";
import genesislogo from "./genesislogo.svg";

export default function Nav() {
  const navigate = useNavigate();

  const navMarketPlace = () => {
    navigate("/marketplace");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const navbusinessInfo = () => {
    navigate("/businessinfo");
  };
  return (
    <>
      <Box bg="black" px={4} w="full" paddingLeft={40} paddingRight={40}>
        <Flex h="125px" alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Link onClick={navigateHome}>
              <img src={genesislogo}></img>
            </Link>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                py={12}
                mb={2}
              >
                <Link onClick={navMarketPlace} marginRight="25px">
                  <Text>Market Place</Text>
                </Link>
                <ButtonGroup gap="4">
                  <Button
                    variant="solid"
                    borderRadius={30}
                    bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)"
                    width="140px"
                  >
                    <Text fontSize="14px">Mint</Text>
                  </Button>
                  <Button
                    colorScheme="Gray"
                    variant="outline"
                    borderRadius={30}
                    width="140px"
                  >
                    <Text fontSize="14px">Connect Wallet</Text>
                  </Button>
                </ButtonGroup>
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
