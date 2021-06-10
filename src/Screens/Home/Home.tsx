import { Box, Grid, Spinner, Stack, Text } from "@chakra-ui/react";
import CreateTribe from "../../components/CreateTribe";
import Tribelist from "./Tribelist";
import get from "../../utils/get";
import { useQuery } from "react-query";
import { ITribelist } from "../../Types/tribe";
import MyPost from "./MyPost";
import CreateTribeBanner from "../../components/CreateTribeBanner";

const fetchtribe = async () => {
  return await get(`api/tribes?type=All`);
};
const Home = () => {
  const { data, status } = useQuery<ITribelist[]>("tribelist", fetchtribe);
  return (
    <Grid templateColumns="400px 1fr" h="100%">
      <Box bg="rgb(226,232,240)" overflowY="auto">
        {status === "error" ? (
          <Text>Failed to fetch the contents</Text>
        ) : status === "loading" ? (
          <Spinner />
        ) : status === "success" ? (
          <Tribelist tribes={data} />
        ) : undefined}
      </Box>
      <Box bg="rgb(226,232,240)">
        <Stack direction="column" mt={3}>
          <CreateTribeBanner />
          <MyPost />
        </Stack>
      </Box>
      <Box>CHAT BOX</Box>
    </Grid>
  );
};

export default Home;
