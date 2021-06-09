import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
} from "@chakra-ui/react";
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
    history.push(`/tribe/${tribeId}`);
  };
  return (
    <Stack spacing={1}>
      {tribes ? (
        tribes?.map((tribe) => (
          <TribeCard tribe={tribe} onTribeChange={HandleTribeChange} />
        ))
      ) : (
        <Alert status="warning" my="2">
          <AlertIcon />
          <AlertTitle mr={2}>No tribes to list!</AlertTitle>
        </Alert>
      )}
    </Stack>
  );
};

export default Tribelist;
