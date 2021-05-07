import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/landing"></Route>
          <Route path="/register"></Route>
          <Route path="/invite"></Route>
          <Route path="/login"></Route>
          <Route path="/forgotpwd"></Route>
          <Route path="/home"></Route>
          <Route path="/tribe/:id"></Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
