import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { IPost } from "../../Types/post";
import get from "../../utils/get";
import flattendeep from "lodash.flattendeep";

const fetchPage = async (
  pageParam: number,
  queryKey: string,
  limit: number
) => {
  return await get(
    `api/tribes/${queryKey}/posts/?pageParam=${pageParam}&limit=${limit}`
  );
};
const Postlist = () => {
  const { tribeId } = useParams<{ tribeId: string }>();
  const limit = 10;
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IPost[]>(
    ["PostList", tribeId],
    ({ pageParam = 0, queryKey }) =>
      fetchPage(pageParam, queryKey[1] as string, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === limit) return allPages.length;
        return false;
      },
    }
  );
  const postList = flattendeep(data?.pages);
  return (
    <Box>
      {postList ? (
        postList.map((post) => <PostCard {...post} />)
      ) : (
        <Text>No post to display.</Text>
      )}
      <Button
        color="teal"
        variant="solid"
        disabled={!hasNextPage}
        onClick={() => fetchNextPage()}
      >
        Load more post..
      </Button>
    </Box>
  );
};

export default Postlist;
