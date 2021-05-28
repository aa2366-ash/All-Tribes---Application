import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import RegisterComp from "./Screens/Register/Register";
import HomeComp from "./Screens/Home/Home";
import Logincomp from "./Screens/Login/Login";
import Invitecomp from "./Screens/Invite/Invite";
import { useSelector } from "react-redux";
import { IStore } from "./Redux/rootReducer";
import TopNavBar from "./components/Navbar";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const refreshtoken = useSelector<IStore>((store) => store.user.refreshtoken);
  if (refreshtoken) return <Route {...rest}> {children}</Route>;
  else return <Redirect to="/login" />;
};

const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const refreshtoken = useSelector<IStore>((store) => store.user.refreshtoken);
  if (!refreshtoken) return <Route {...rest}> {children} </Route>;
  else return <Redirect to="/home" />;
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <RegisterComp />
        </Route>
        <Route exact path="/invite">
          <Invitecomp />
        </Route>
        <PublicRoute exact path="/login">
          <Logincomp />
        </PublicRoute>
        <Route exact path="/forgotpwd"></Route>
        <PrivateRoute exact path="/home">
          <TopNavBar>
            <HomeComp />
          </TopNavBar>
        </PrivateRoute>
        <Route exact path="/tribe/:id"></Route>
      </Switch>
    </Router>
  );
}

export default App;
