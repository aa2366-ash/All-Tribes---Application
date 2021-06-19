import { Box, Button, Spinner, Stack } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { IPost } from "../../Types/post";
import get from "../../utils/get";
import flattendeep from "lodash.flattendeep";
import Createpost from "./Createpost";
import FollowTribe from "../../components/FollowTribe";
import NoPost from "../../components/NoPost";
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
const Postlist = () => {
  const { tribeId } = useParams<{ tribeId: string }>();
  const limit = 10;
  const { status, data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IPost[],
    IError
  >(
    ["PostList", tribeId],
    ({ pageParam = 0, queryKey }) =>
      fetchPage(pageParam, queryKey[1] as string, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === limit) return allPages.length;
        return false;
      },
      retry: false,
    }
  );
  const postList = flattendeep(data?.pages);
  return (
    <Box>
      {status === "success" && <Createpost />}
      {status === "error" ? (
        <FollowTribe />
      ) : status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        postList.length > 0 ? (
          postList.map((post) => <PostCard {...post} />)
        ) : (
          <NoPost />
        )
      ) : (
        ""
      )}
      {postList.length > 0 && (
        <Stack>
          <Button
            color="teal"
            variant="solid"
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            mx="auto"
          >
            Load more post..
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Postlist;
