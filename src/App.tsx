import React, { FC } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/upload/Home";
import NotFound from "./components/NotFound";
import Tree from "./components/tree/Tree";
import CoreOfScience from "./components/vectors/CoreOfScience";
import TreeOfScience from "./components/vectors/TreeOfScience";

const AppLayout = styled.div`
  margin: 0 10px;
  max-width: 960px;

  @media (min-width: 720px) {
    & {
      margin-left: 10%;
    }
  }
`;

const Header = styled.header`
  color: var(--color-tree-leaf, green);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4em 0 1em 0;

  & h1 {
    margin-left: 0.5em;
  }

  & img {
    width: 80px;
    height: 80px;
  }
`;

const App: FC<{}> = () => {
  return (
    <Router>
      <AppLayout>
        <Header>
          <TreeOfScience />
          <h1>Tree of Science</h1>
        </Header>
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/tree/:treeId">
              <Tree />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer>
          <CoreOfScience />
        </footer>
      </AppLayout>
    </Router>
  );
};

export default App;
