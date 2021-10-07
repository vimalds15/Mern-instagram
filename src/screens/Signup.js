import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from "materialize-css"

const Signup = () => {
    const history = useHistory()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")

    const uploadPic = async() =>{
        const formdata = new FormData()
        formdata.append("file", image)
        formdata.append("upload_preset", "mern-instagram")
        formdata.append("cloud_name", "vimalds")

        const res = await axios.post("https://api.cloudinary.com/v1_1/vimalds/image/upload", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            const imageUrl = await res.data.url
    }

    const PostData = () => {

        fetch("/api/auth/register/", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.errors) {
                    data.errors.map(err => {
                        M.toast({ html: err.msg, classes: "red darken-1", displayLength: 1000 })
                    })
                } else if (data.error) {
                    M.toast({ html: data.error, classes: "red lighten-1", displayLength: 1000 })
                    history.push('/signup')
                } else {
                    M.toast({ html: data.msg, classes: "green darken-2", displayLength: 1000 })
                    history.push('/signin')
                }
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <div className="input-field">
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="file-field input-field">
                    <div className="btn grey darken-1">
                        <i className="material-icons">add_a_photo</i>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper ">
                        <input placeholder="Upload Profile Picture" className="file-path validate" type="text" />
                    </div>

                </div>
                <button onClick={() => PostData()} className="btn blue lighten-2 lgn-btn waves-effect waves-light">
                    Sign up
                </button>
                <p>Already a User? <Link to='/signin'> <span style={{ color: "#64B5F6" }}>SignIn</span></Link></p>
            </div>
        </div>
    )
}

export default Signup
