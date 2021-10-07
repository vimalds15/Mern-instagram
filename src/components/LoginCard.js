import React from 'react'

const LoginCard = () => {
    return (
        <div className="mycard">
            <div class="card auth-card">
               <h2 className="brand-logo">Instagram</h2>
               <div className="input-field">
               <input type="text" placeholder="Email" />
               <input type="password" placeholder="Password" />
               </div>
               <button className="btn blue lighten-2 lgn-btn waves-effect waves-light">
                   Login
               </button>
            </div>
        </div>
    )
}

export default LoginCard
