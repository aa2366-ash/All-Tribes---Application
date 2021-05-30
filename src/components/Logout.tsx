import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IStore } from "../Redux/rootReducer";
import { logoutCurrentUser } from "../Redux/User/userAction";

const Logout: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector<IStore>(
    (store) => store?.user?.currentUser?.id
  ) as string;

  const logout = () => {
    dispatch(logoutCurrentUser(userId));
  };
  return (
    <Button colorScheme="teal" size="sm" onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
