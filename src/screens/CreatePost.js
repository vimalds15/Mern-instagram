import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import M from "materialize-css"

const CreatePost = () => {
    const history = useHistory()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")



    const onSubmit = async () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "mern-instagram")
        formData.append("cloud_name", "vimalds")

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/vimalds/image/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            const imageUrl = await res.data.url

            const payload = { title, body, pic: imageUrl }

            console.log("payload", payload)
            const data = await axios.post("/api/posts/createpost/", payload, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem('token')
                },
            })

            if (data.status === 200) {
                M.toast({ html: "Posted Successfully", classes: "green darken-1", displayLength: 1000 })
                history.push('/')
            }

        } catch (error) {
            console.log("hello", error.request)
            const errors = error.response.data.errors
            if (errors) {
                errors.map(err => {
                    M.toast({ html: err.msg, classes: "red darken-1", displayLength: 1000 })
                })
            }
        }
    }



    return (
        <div className="create-post-container">
            <div className="card create-card input-field">
                <h2 className="brand-logo">Instagram</h2>
                <h5>Add New Post</h5>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="Caption" value={body} onChange={e => setBody(e.target.value)} />
                <div className="file-field input-field">
                    <div className="btn grey darken-1">
                        <i className="material-icons">add_a_photo</i>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper ">
                        <input className="file-path validate" type="text" />
                    </div>

                </div>
                <button className="btn blue darken-1 lgn-btn waves-effect waves-light" onClick={() => onSubmit()}>
                    Submit Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
