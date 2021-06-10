import { useInfiniteQuery } from "react-query";
import { IPost } from "../../Types/post";
import get from "../../utils/get";
import flattendeep from "lodash.flattendeep";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import PostEditCard from "../../components/PostEditCard";

interface IError {
  message: string;
}
const fetchPage = async (
  pageParam: number,
  queryKey: string,
  limit: number
) => {
  return await get(
    `api/tribes/${queryKey}/posts/?pageParam=${pageParam}&limit=${limit}`
  );
};
const MyPost: React.FC = () => {
  const limit = 5;
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IPost[], IError>(
    ["PostList", "MyPost"],
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
      {status === "error" ? (
        <Text>{error?.message}</Text>
      ) : status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        postList.length > 0 ? (
          postList.map((post) => <PostEditCard {...post} />)
        ) : (
          <Text>No post to display.</Text>
        )
      ) : (
        ""
      )}
      {postList.length > 0 && (
        <Box mx="auto">
          <Button
            color="teal"
            variant="outline"
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more posts..
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default MyPost;
