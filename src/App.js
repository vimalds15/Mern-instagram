import React,{useEffect,createContext,useReducer,useContext} from 'react'
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch,useHistory } from 'react-router-dom'
import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Profile from './screens/Profile';
import CreatePost from './screens/CreatePost';
import UserProfile from "./screens/UserProfile";
import { reducer,initialState } from './reducers/userReducer'
import SubscribedUserPosts from './screens/SubscribedUserPosts';


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }else{
      history.push('/signin')
    }
  },[])

  return(
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/createpost' component={CreatePost} />
        <Route exact path='/profile/:id' component={UserProfile} />
        <Route exact path='/followingpost' component={SubscribedUserPosts} />
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
    <Router>
      <NavBar />
      <Routing />
    </Router>
    </UserContext.Provider>

  );
}

export default App;
