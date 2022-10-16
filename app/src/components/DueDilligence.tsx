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

export default function DueDilligence() {
  return (
    <>
      <Box width="1200px" padding="40px">
        <Box marginBottom="40px">
          <Text fontSize={64} fontWeight={700} lineHeight={1}>
            Due Dilligence
          </Text>
        </Box>
        <SimpleGrid spacing="40px">
          <HStack>
            <SimpleGrid>
              {/* static, don't change */}
              <Text fontSize={18} fontWeight={600}>
                Founder Name
              </Text>
              {/* place holder, change this one */}
              <Text fontSize={45} fontWeight={700}>
                Preston Johansson
              </Text>
            </SimpleGrid>
            <Spacer />
            <Button
              colorScheme="Gray"
              variant="outline"
              borderRadius={30}
              width="220px"
            >
              <Text>Twitter Handle</Text>
            </Button>
          </HStack>
          <HStack>
            <SimpleGrid>
              {/* static, don't change */}
              <Text fontSize={18} fontWeight={600}>
                Company's Legal Name
              </Text>
              {/* place holder, change this one */}
              <Text fontSize={45} fontWeight={700}>
                Alt Cloud Analytica, LLC.
              </Text>
            </SimpleGrid>
            <Spacer />
            <Button
              colorScheme="Gray"
              variant="outline"
              borderRadius={30}
              width="300px"
            >
              <Text>Access Operating Agreement</Text>
            </Button>
          </HStack>
          <HStack>
            <SimpleGrid>
              {/* static, don't change */}
              <Text fontSize={18} fontWeight={600}>
                Company is registered in
              </Text>
              {/* place holder, change this one */}
              <Text fontSize={45} fontWeight={700}>
                Delaware, USA
              </Text>
            </SimpleGrid>
            <Spacer />
            <Button
              colorScheme="Gray"
              variant="outline"
              borderRadius={30}
              width="500px"
            >
              <Text>Access company registration from government site</Text>
            </Button>
          </HStack>
        </SimpleGrid>
      </Box>
    </>
  );
}
