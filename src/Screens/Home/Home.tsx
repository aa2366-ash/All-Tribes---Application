import { Box, Grid, Skeleton, Stack, Text } from "@chakra-ui/react";
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
          <>
            <Stack spacing={5}>
              <Skeleton height="90px" width="300px" />
              <Skeleton height="90px" width="300px" />
              <Skeleton height="90px" width="300px" />
              <Skeleton height="90px" width="300px" />
            </Stack>
          </>
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
    </Grid>
  );
};

export default Home;
