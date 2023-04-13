import {Route, Switch} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Shelf from './components/Shelf'
import BookDetailedView from './components/BookDetailedView'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/Login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Shelf} />
    <ProtectedRoute exact path="/books/:id" component={BookDetailedView} />
    <Route exact path="/not-found" component={NotFound} />
    <NotFound />
  </Switch>
)

export default App
