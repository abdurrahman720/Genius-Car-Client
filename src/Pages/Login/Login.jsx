import React, { useContext } from "react";
import { Link } from "react-router-dom";
import login from '../../assets/images/login/login.svg'
import { AuthContext } from "../../Authentication/Context/AuthProvider";

const Login = () => {

    const {emailSignIn} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        emailSignIn(email, password)
            .then(user => {
            console.log(user)
            })
            .catch(err => {
            console.log(err);
            })
        
    }


  return (
    <div className="hero w-full ">
      <div className="hero-content grid md:grid-cols-2 gap-20 my-10 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
         <img className="w-3/4" src={login} alt="" />
        </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-10 ">
              <h1 className="text-5xl font-bold text-center">Login</h1>
          <form onsubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
                      <div className="form-control mt-6">
                          <input className="btn btn-primary" type="submit" value="Login" />
              
            </div>
                  </form>
                  <p className="mx-5">New to Genius Car? <Link className="text-orange-600 font-semibold" to="/register">Sign Up</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
