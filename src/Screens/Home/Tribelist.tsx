import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import TribeCard from "../../components/TribeCard";
import { ITribelist } from "../../Types/tribe";
interface TribelistProps {
  tribes?: ITribelist[];
}
const Tribelist: React.FC<TribelistProps> = ({ tribes }) => {
  return (
    <Stack spacing={1}>
      {tribes?.map((tribe) => (
        <TribeCard tribe={tribe} />
      ))}
    </Stack>
  );
};

export default Tribelist;
