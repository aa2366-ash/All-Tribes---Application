import { Box, Heading, Button, Text } from "@chakra-ui/react";
import React from "react";

const Description = () => {
  return (
    <Box maxW="32rem" bg="teal" color="white" alignContent="center">
      <Heading mb={4}>Tribe!</Heading>
      <Text fontSize="xl">
        Tribe is a collection of community. A tribe community can fall under any
        category. People within a tribe community share their thoughts among
        their community members. Thoughts can be a post, polls, quiz, stories.
        To create a tribe logon to tribe and create a tribe of your own. Members
        of the tribe can chat with their fellow tribe mates.
      </Text>
    </Box>
  );
};

export default Description;
