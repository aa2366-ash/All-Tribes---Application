import { useInfiniteQuery } from "react-query";
import { IPost } from "../../Types/post";
import get from "../../utils/get";
import flattendeep from "lodash.flattendeep";
import { Box, Button, Skeleton, Stack, Text, VStack } from "@chakra-ui/react";
import PostEditCard from "../../components/PostEditCard";
import NoPost from "../../components/NoPost";

export interface IError {
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
  const { status, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IPost[],
    IError
  >(
    ["PostList", "MyPost"],
    ({ pageParam = 0, queryKey }) =>
      fetchPage(pageParam, queryKey[1] as string, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length === limit) return allPages.length;
        return false;
      },
    }
  );
  const postList = flattendeep(data?.pages);
  return (
    <Box>
      <VStack>
        {status === "error" ? (
          <Text>{error?.message}</Text>
        ) : status === "loading" ? (
          <Stack spacing={5}>
            <Skeleton height="120px" width="600px" />
            <Skeleton height="120px" width="600px" />
            <Skeleton height="120px" width="600px" />
            <Skeleton height="120px" width="600px" />
          </Stack>
        ) : status === "success" ? (
          postList.length > 0 ? (
            postList.map((post) => <PostEditCard {...post} />)
          ) : (
            <NoPost />
          )
        ) : (
          ""
        )}
        {postList.length > 0 && (
          <Button
            color="teal"
            variant="outline"
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
          >
            Load more posts..
          </Button>
        )}
      </VStack>
    </Box>
  );
};
export default MyPost;
