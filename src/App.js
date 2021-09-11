import { HashRouter, Route, Switch } from "react-router-dom"
import Nav from "./components/nav/nav"
import Details from "./pages/details"
import Home from "./pages/home"
import './styles/app.scss'

const App = () => {

  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/details/:id' component={Details} />
        </Switch>
      </HashRouter>
      <footer>
        <div className='containerOpacity'></div>
      </footer>
    </div>
  );
}

export default App;
