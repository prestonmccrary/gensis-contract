import React from "react";
import { useTimer } from "react-timer-hook";

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

export default function Timer({ expiryTimestamp }: any) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <HStack spacing={5}>
      <VStack>
        <Text fontSize={45} fontWeight={700}>
          {days}
        </Text>
        <Text fontSize={16} fontWeight={600}>
          Days
        </Text>
      </VStack>
      <VStack>
        <Text fontSize={45} fontWeight={700}>
          {hours}
        </Text>
        <Text fontSize={16} fontWeight={600}>
          Hours
        </Text>
      </VStack>
      <VStack>
        <Text fontSize={45} fontWeight={700}>
          {minutes}
        </Text>
        <Text fontSize={16} fontWeight={600}>
          Mins
        </Text>
      </VStack>
      <VStack>
        <Text fontSize={45} fontWeight={700}>
          {seconds}
        </Text>
        <Text fontSize={16} fontWeight={600}>
          Secs
        </Text>
      </VStack>
    </HStack>
    // <div style={{ textAlign: "center" }}>
    //   <h1>react-timer-hook </h1>
    //   <p>Timer Demo</p>
    //   <div style={{ fontSize: "100px" }}>
    //     <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
    //     <span>{seconds}</span>
    //   </div>
    //   <p>{isRunning ? "Running" : "Not running"}</p>
    //   <button onClick={start}>Start</button>
    //   <button onClick={pause}>Pause</button>
    //   <button onClick={resume}>Resume</button>
    //   <button
    //     onClick={() => {
    //       // Restarts to 5 minutes timer
    //       const time = new Date();
    //       time.setSeconds(time.getSeconds() + 300);
    //       restart(time);
    //     }}
    //   >
    //     Restart
    //   </button>
    // </div>
  );
}
