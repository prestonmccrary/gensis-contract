import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  createIcon,
} from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function CallToActionWithAnnotation() {
  const navigate = useNavigate();

  const navMarketPlace = () => {
    navigate("/marketplace");
  };

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <Box px={4} paddingBottom="40px">
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 4 }}
            py={{ base: 20, md: 15 }}
          >
            <Text color={"gray.500"} fontWeight={800} fontSize={20}>
              TOKENIZE, AUCTION, & INVEST IN STARTUP EQUITY
            </Text>
            <Text
              fontWeight={700}
              fontSize={50}
              lineHeight={"110%"}
              paddingBottom="15px"
            >
              Start-up equity, now liquid.
            </Text>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button
                colorScheme="Gray"
                variant="outline"
                width="200px"
                height="55px"
                borderRadius={30}
                onClick={navMarketPlace}
                leftIcon={<SearchIcon />}
                iconSpacing="10px"
              >
                Browse Startups
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
