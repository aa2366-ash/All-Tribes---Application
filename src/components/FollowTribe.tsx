import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import post from "../utils/post";

const FollowTribe = () => {
  const queryClient = useQueryClient();

  const { tribeId } = useParams<{ tribeId: string }>();
  const toast = useToast();

  const followRequest = async () => {
    console.log("hi");
    try {
      const result = await post(`/api/tribes/${tribeId}/follow`, {});
      queryClient.invalidateQueries(["PostList", tribeId]);
      toast({
        title: `Joined Tribe!`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: `Error`,
        description: err?.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      mx="auto"
      my="auto"
      width="600px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Follow tribe!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Click the follow button to post in the tribe and chat with the tribe
        members
      </AlertDescription>
      <Button my={2} onClick={followRequest}>
        Follow
      </Button>
    </Alert>
  );
};

export default FollowTribe;
