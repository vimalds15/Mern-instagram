import React,{useEffect,useState,useContext} from 'react'
import axios from "axios"
import {UserContext} from "../App"

const Profile = () => {
    const [posts,setPosts]=useState([])
    const {state,dispatch}=useContext(UserContext);

    const getData =async () => {
        try {
            const res = await axios.get("/api/posts/myposts/",{
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }
            })

            setPosts(res.data.posts)
        } catch (error) {
            console.log(error.response)
        }
    }

    console.log("state",state,state?.followers?.length)

    useEffect(()=>{
        getData();
    },[])
    
    return (
        <div className="profile-container">
            <div className="profile-head">
                <div>
                    <img className="profile-img" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="profilepic" />
                </div>
                <div>
                    <h4>{state?.name}</h4>
                    <div className="profile-stats">
                        <h6>{posts.length} posts</h6>
                        <h6>{state?.followers?.length} followers</h6>
                        <h6>{state?.following?.length} following</h6>
                    </div>
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
