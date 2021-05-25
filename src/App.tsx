import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import RegisterComp from "./Screens/Register/Register";
import HomeComp from "./Screens/Home/Home";
import Logincomp from "./Screens/Login/Login";
import Invitecomp from "./Screens/Invite/Invite";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/landing"></Route>
          <Route exact path="/register">
            <RegisterComp />
          </Route>
          <Route exact path="/invite">
            <Invitecomp />
          </Route>
          <Route exact path="/login">
            <Logincomp />
          </Route>
          <Route exact path="/forgotpwd"></Route>
          <Route exact path="/home">
            <HomeComp />
          </Route>
          <Route exact path="/tribe/:id"></Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
