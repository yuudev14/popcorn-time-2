import { HashRouter, Route, Switch } from "react-router-dom"
import Nav from "./components/nav/nav"
import Home from "./pages/home"

const App = () => {

  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <Switch>
          <Route exact path='' component={Home} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
