import { HashRouter, Route, Switch } from "react-router-dom"
import Nav from "./components/nav/nav"
import Details from "./pages/details"
import Home from "./pages/home"
import './styles/app.scss'
import { connect } from "react-redux"
import { getGenreAction } from "./store/action/genreAction"
import { useEffect } from "react"
const App = (props) => {
  const {
    getGenreDispatch,
    genres

  } = props;

  useEffect(() => {
    getGenreDispatch();
  }, [])

  return (
    <div className="App">
      {genres.length > 0 && (
        <HashRouter>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/details/:id' component={Details} />
          </Switch>
        </HashRouter>

      )}
      
      
      <footer>
        <div className='containerOpacity'></div>
      </footer>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    genres : state.genres,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getGenreDispatch : () => dispatch(getGenreAction()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
