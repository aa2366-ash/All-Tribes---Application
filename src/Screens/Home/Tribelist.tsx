import { SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import TribeCard from "../../components/TribeCard";
import { ITribelist, ISearchTribeList } from "../../Types/tribe";
import debounce from "lodash.debounce";
import get from "../../utils/get";

interface TribelistProps {
  tribes?: ITribelist[];
}

const fetchSearchResult = async (search: string) => {
  if (search == "") return [];
  else return await get(`api/tribes?search=${search}`);
};
const Tribelist: React.FC<TribelistProps> = ({ tribes }) => {
  const history = useHistory();
  const [search, setsearch] = useState("");
  const { data, status, error } = useQuery<ISearchTribeList[]>(
    ["searchTribe", search],
    ({ queryKey }) => fetchSearchResult(queryKey[1] as string)
  );
  console.log(data);
  const HandleTribeChange = (tribeId: string) => {
    history.push(`/tribe/${tribeId}`);
  };

  const debouncedSearch = useCallback(
    debounce((nextSearch) => setsearch(nextSearch), 1000),
    []
  );
  const handleChange = (nextSearch: string) => {
    debouncedSearch(nextSearch);
  };

  return (
    <Stack spacing={1}>
      <Box m={2}>
        <form>
          <InputGroup size="md">
            <Input
              type={"text"}
              placeholder="Search tribe.."
              variant="filled"
              onChange={(e) => handleChange(e.target.value)}
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
      {data?.length ?? 0 > 0 ? (
        data?.map((tribe) => (
          <TribeCard
            tribe={tribe}
            type={tribe.isMember?.type}
            onTribeChange={HandleTribeChange}
          />
        ))
      ) : tribes?.length ?? 0 > 0 ? (
        tribes?.map((tribe) => (
          <TribeCard
            tribe={tribe.tribe}
            type={tribe.type}
            onTribeChange={HandleTribeChange}
          />
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
