import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import {AuthProvider } from './context/auth'
import "./App.css";
import { Home, Login, Register,SinglePost} from "./pages";
import { MenuBar } from './components'
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
      <MenuBar/>
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route exact path="/posts/:postId" component={SinglePost} />

      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
