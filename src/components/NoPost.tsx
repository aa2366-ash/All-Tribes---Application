import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";

const NoPost: React.FC = () => {
  return (
    <Alert
      status="warning"
      width="350px"
      variant="subtle"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mx="auto"
      my={3}
      borderRadius={10}
      height="40px"
    >
      <AlertIcon />
      <AlertTitle mr={2}>No Posts yet!</AlertTitle>
    </Alert>
  );
};

export default NoPost;
