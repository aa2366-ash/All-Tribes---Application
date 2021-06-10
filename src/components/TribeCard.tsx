import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  useColorModeValue,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { ITribelist, ITribe } from "../Types/tribe";

interface ITribelistProps {
  tribe: ITribe;
  type?: string;
  onTribeChange(tribeId: string): void;
}

const Tribelist: React.FC<ITribelistProps> = ({
  tribe,
  type,
  onTribeChange,
}) => {
  return (
    <Center
      py={2}
      onClick={() => {
        onTribeChange(tribe.id);
      }}
    >
      <Box
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        p={2}
        _hover={{
          boxShadow: "dark-lg",
          rounded: "md",
          bg: "white",
          cursor: "pointer",
        }}
      >
        <Stack direction={"row"} justify={"start"} spacing={2}>
          <Avatar
            size={"md"}
            src={tribe?.avatarUrl}
            css={{
              border: "2px solid white",
            }}
          />
          <Stack spacing={0} align={"start"} mb={5}>
            <Heading fontSize={"lg"} fontWeight={500} fontFamily={"body"}>
              {tribe.name}
            </Heading>
            <Stack direction={"row"}>
              <Text fontSize={"sm"} color={"gray.500"}>
                {tribe.members > 1 ? `${tribe.members} Members` : `1 Member`}
              </Text>
              {type && (
                <Tag
                  size="sm"
                  colorScheme={type == "Admin" ? "red" : "blue"}
                  borderRadius="full"
                >
                  <TagLabel>{type}</TagLabel>
                </Tag>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Box>
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            noOfLines={2}
            overflow={"hidden"}
          >
            {tribe.description}
          </Text>
        </Box>
      </Box>
    </Center>
  );
};

export default Tribelist;
