import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoIosPeople } from "react-icons/io";
import { useParams } from "react-router-dom";
import Createpost from "./Createpost";
import { ITribe } from "../../Types/tribe";
import { useQuery } from "react-query";
import get from "../../utils/get";
import Postlist from "./PostList";

interface ITribeResult {
  data: ITribe;
  message: string;
  err?: {};
}
const getTribedata = async (tribeId: string) => {
  return await get(`api/tribes/${tribeId}`);
};
const Tribe = () => {
  const { tribeId } = useParams<{ tribeId: string }>();
  const { data, status, error } = useQuery<ITribeResult>(
    ["tribe", tribeId],
    () => getTribedata(tribeId)
  );

  const tribe = data?.data;

  return (
    <Grid templateColumns="70% 1fr" h="100%">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={tribe?.coverUrl}
          objectFit={"cover"}
        />
        <Stack direction={"row"} spacing="2px">
          <Flex mt={-6} ml={4}>
            <Avatar
              size={"xl"}
              src={tribe?.avatarUrl}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>
          <Stack direction={"column"} spacing={0} align={"start"}>
            <Stack direction={"row"} align={"start"} mt={2}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {tribe?.name}
              </Heading>
              <IoIosPeople />
              <Text fontSize="xs">{tribe?.members}</Text>
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <Text color={"gray.500"}>{tribe?.description}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Postlist />
      </Box>
      <Box
        bg={useColorModeValue("teal.400", "teal.200")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Heading color="white" mx={3}>
          CHAT BOX!
        </Heading>
      </Box>
    </Grid>
  );
};

export default Tribe;
