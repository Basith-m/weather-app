import React from 'react'
import './auth.css'
import AuthForm from '../../components/authForm/AuthForm'

const Auth = ({ register }) => {
  return (
    <div className="auth">
      <section className="section container auth_container grid">
        <div className="auth_container-left">
          <div>
            <h6>Hello user</h6>
            <h1>Welcome to Weather App</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque iusto quas vero architecto exercitationem minima vitae eveniet suscipit reprehenderit cumque consequuntur.</p>
          </div>
        </div>
        <div className="auth_container-right">
          <div>
            <h2>{ register ? "Register Account" : "Login Accout" }</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque iusto quas vero architecto exercitationem minima vitae eveniet suscipit reprehenderit cumque consequuntur.</p>
            <AuthForm register={register} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Auth