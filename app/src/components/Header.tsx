import { ReactNode } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Connection from "./Connection";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
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
} from "@chakra-ui/react";
import genesislogo from "./genesislogo.svg";
import App from "../App";

export default function Nav() {
  const navigate = useNavigate();

  const navMarketPlace = () => {
    navigate("/marketplace");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const navForm = () => {
    navigate("/form");
  };

  const navbusinessInfo = () => {
    navigate("/businessinfo");
  };

  return (
    <>
      <Box bg="black" px={4}>
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
                <ButtonGroup gap="4">
                  <Button
                    colorScheme="Gray"
                    width="150px"
                    height="50px"
                    variant="outline"
                    borderRadius={30}
                    onClick={navMarketPlace}
                  >
                    Market Place
                  </Button>
                  <Button
                    colorScheme="Gray"
                    width="150px"
                    height="50px"
                    variant="outline"
                    borderRadius={30}
                    onClick={navForm}
                  >
                    Mint Genesis
                  </Button>
                  <Button
                    backgroundColor="#4C2FA2"
                    variant="fill"
                    width="200px"
                    height="55px"
                    borderRadius={30}
                  >
                    <WalletMultiButton></WalletMultiButton>
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
