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
import genesislogo from "./genesislogo.svg";

export default function Footer() {
  return (
    <>
      <SimpleGrid
        justifyContent="center"
        paddingTop="30px"
        paddingBottom="30px"
        bgColor="black"
      >
        <img src={genesislogo}></img>
      </SimpleGrid>
    </>
  );
}
