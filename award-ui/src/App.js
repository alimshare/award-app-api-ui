import "./App.css";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Email from './Email';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Email} />
        <Route exact path="/email" component={Email} />
        <Route exact path="/home" component={Home} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

function PageNotFound() {
  return (
    <h1>Not Found</h1>
  )
}

export default App;
