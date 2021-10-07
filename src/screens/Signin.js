import React, { useState,useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from "materialize-css"
import { UserContext } from '../App'

const Signin = () => {
    const history = useHistory()

    const {state,dispatch} = useContext(UserContext)

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    const PostData = () => {

        fetch("/api/auth/signin/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
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

                } else {
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "SignedIn Successfully!", classes: "green darken-2", displayLength: 1000 })
                    history.push('/')
                }
            }).catch(err => {
                console.log({ err })
            })
    }

    return (

        <div className="mycard">
            <div className="card auth-card">
                <h2 className="brand-logo">Instagram</h2>
                <div className="input-field">
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button onClick={() => PostData()} className="btn blue lighten-2 lgn-btn waves-effect waves-light">
                    Login
                </button>
                <p>Not a User? <Link to='/signup'> <span style={{ color: "#64B5F6" }}> SignUp</span></Link></p>
            </div>
        </div>
    )
}

export default Signin
