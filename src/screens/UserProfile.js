import React,{useEffect,useLayoutEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import {UserContext} from "../App"

const Profile = () => {
    const [user,setUser] = useState([])
    const [posts,setPosts]=useState([])
    const {state,dispatch}=useContext(UserContext);
    const {id} = useParams()
    const [isFollow,setIsFollow] = useState(state?state.following.includes(id):false)

    console.log("object",id)

    const getData =async () => {
        try {
            const res = await axios.get(`/api/user/${id}`,{
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }
            })
            setPosts(res.data.posts)
            setUser(res.data.user)

        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(()=>{
        getData();
    },[])


    const follow = async(id) => {
        const payload = {followId:id}
        try {
            const res = await axios.put(`/api/user/follow`,payload,{
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("token")
                }
            })
            console.log(res.data)
            dispatch({type:"UPDATE",payload:{following:res.data.result.following,followers:res.data.result.followers}})
            localStorage.setItem("user",JSON.stringify(res.data.result))
            setUser((prevState)=>{
                return{
                ...prevState,
                followers:[...prevState.followers,res.data._id]
            }})
            setIsFollow(true)
            console.log("user",user)
        } catch (error) {
            console.log(error.response)
        }
    }

    const unfollow = async(id) => {
        const payload = {unfollowId:id}
        try {
            const res = await axios.put(`/api/user/unfollow`,payload,{
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("token")
                }
            })
            console.log(res.data)
            dispatch({type:"UPDATE",payload:{following:res.data.result.following,followers:res.data.result.followers}})
            localStorage.setItem("user",JSON.stringify(res.data.result))
            setUser((prevState)=>{
                const newFollower = prevState.followers.filter(item => item !=res.data._id)
                return{
                ...prevState,
                followers:newFollower
            }})
            setIsFollow(false);
        } catch (error) {
            console.log(error.response)
        }
    }
    
    return (
        <div className="profile-container">
            <div className="profile-head">
                <div>
                    <img className="profile-img" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="profilepic" />
                </div>
                <div>
                    <h4>{user?.name}</h4>
                    <div className="profile-stats">
                        <h6>{posts?.length} posts</h6>
                        <h6>{user?.followers?.length} followers</h6>
                        <h6>{user?.following?.length} following</h6>
                    </div>
                    {isFollow
                        ? <button onClick={() => unfollow(user._id)} className="btn blue lighten-2 lgn-btn waves-effect waves-light">
                        Unfollow
                    </button>
                        : <button onClick={() => follow(user._id)} className="btn blue lighten-2 lgn-btn waves-effect waves-light">
                        Follow
                    </button>
                    }
                
                </div>
            </div>
            <hr />
            <div className="profile-gallery">
                {posts.map(post =>  { 
                    return(
                    <img key={post._id} alt="img" src={post.photo} className="item" />
                )})}

            </div>
        </div>
    )
}

export default Profile
