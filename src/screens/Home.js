import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { UserContext } from "../App"
import { Link } from 'react-router-dom'

const Home = () => {
    const { state, dispatch } = useContext(UserContext)

    const [data, setData] = useState([])
    useEffect(async () => {
        try {
            const res = await axios.get("/api/posts/", {
                headers: {
                    'x-auth-token': localStorage.getItem("token")
                }
            })
            const { posts } = res.data
            setData(posts)
            console.log("dafdsata",data[0])
        } catch (error) {
            console.log(error.response)
        }

    }, [])

    const likePost = async (id) => {
        const payload = { postId: id }
        try {
            const res = await axios.put("/api/posts/like/", payload, {
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': localStorage.getItem("token")
                }
            })

            const newData = data.map(item => {
                if (item._id == res.data._id) return res.data
                else return item
            })

            setData(newData)
            console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const unlikePost = async (id) => {
        const payload = { postId: id }
        console.log(payload)
        try {
            const res = await axios.put("/api/posts/unlike/", payload, {
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': localStorage.getItem("token")
                }
            })

            const newData = data.map(item => {
                if (item._id == res.data._id) return res.data
                else return item
            })

            setData(newData)

        } catch (error) {
            console.log("eeror", error.response)
        }
    }

    const makeComment = async (text, postId) => {
        const payload = { text: text, postId: postId }


        try {
            const res = await axios.put("/api/posts/comment/", payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': localStorage.getItem("token")
                    }
                })

            console.log(res)

            const newData = data.map(item => {
                if (item._id == res.data._id) return res.data
                else return item
            })

            setData(newData)


        } catch (error) {
            console.error(error.response)
        }
    }

    const deletePost = async(postId) => {
        console.log("object",postId)
        try {
            const res = await axios.delete(`/api/posts/delete/${postId}`,{
                headers:{
                    'x-auth-token': localStorage.getItem("token")
                }
            })

            console.log(res)

            const newData = data.filter(item => {
                return (item._id !== res.data._id)
            })

            setData(newData)

        } catch (error) {

            console.log("hiii",error)
        }
    }

    return (
        <div className="home-container">
            {data.map(dat => (
                <div key={dat._id} className="card home-card">
                    <h5 className="user-name"><Link to={dat?.postedBy?._id === state._id ?`profile`:`/profile/${dat.postedBy._id}`}>{dat?.postedBy?.name} {dat?.postedBy?._id === state._id && (<i className="material-icons" style={{float:'right'}} onClick={() => deletePost(dat._id)}>delete</i>)}</Link></h5>
                    <div className="card-image">
                        <img src={dat.photo} />
                    </div>
                    <div className="card-content">
                        <i className="material-icons" >favorite</i>
                        {dat.likes.includes(state._id)
                            ? <i className="material-icons" onClick={() => unlikePost(dat._id)}>thumb_down</i>
                            : <i className="material-icons" onClick={() => likePost(dat._id)}>thumb_up</i>
                        }


                        <h6>{dat.likes.length}</h6>
                        <h6>{dat.title}</h6>
                        <p>{dat.body}</p>
                        {dat.comments.map(comment => {
                            return (
                                <h6><span><strong>{comment.postedBy.name} </strong></span> {comment.text}</h6>
                            )
                        })

                        }
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            makeComment(e.target[0].value, dat._id)
                        }}>
                            <input type="text" placeholder="Add a comment" />
                        </form>
                    </div>
                </div>

            ))

            }
        </div>
    )
}

export default Home
