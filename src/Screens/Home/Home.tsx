import {
  Box,
  Button,
  Grid,
  useToast,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CreateTribe from "../../components/CreateTribe";
import Tribelist from "./Tribelist";
import get from "../../utils/get";
import { useQuery } from "react-query";
import { ITribelist } from "../../Types/tribe";

const fetchtribe = async () => {
  return await get("api/tribes?type=All");
};
const Home = () => {
  const { data, status } = useQuery<ITribelist[]>("tribelist", fetchtribe);
  return (
    <Grid templateColumns="300px 1fr" h="100%">
      <Box bg="rgb(226,232,240)" overflowY="auto">
        {status === "error" ? (
          <Text>Failed to fetch the contents</Text>
        ) : status === "loading" ? (
          <Spinner />
        ) : status === "success" ? (
          <Tribelist tribes={data} />
        ) : undefined}
      </Box>
      <Box bg="grey.200">
        <CreateTribe />
      </Box>
    </Grid>
  );
};

export default Home;
