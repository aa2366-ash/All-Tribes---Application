import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import TribeCard from "../../components/TribeCard";
import { ITribelist } from "../../Types/tribe";
interface TribelistProps {
  tribes?: ITribelist[];
}
const Tribelist: React.FC<TribelistProps> = ({ tribes }) => {
  const history = useHistory();

  const HandleTribeChange = (tribeId: string) => {
    history.push(`/tribes/${tribeId}`);
  };
  return (
    <Stack spacing={1}>
      {tribes?.map((tribe) => (
        <TribeCard tribe={tribe} onTribeChange={HandleTribeChange} />
      ))}
    </Stack>
  );
};

export default Tribelist;
