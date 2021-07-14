import React, {useState}  from "react";
import { NavLink } from "react-router-dom";

export const Signup = () => {

    const [user, setUser] = useState({
        name: "", email:"", phone:"",password:"",cpassword:""
    });

    return (
          <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> Sign up </h2>
                            <form className = "register-form" if="register-form">
                                
                            <div className = "form-group">
                                    <input type="text" name="name" id="name" autoComplete="off" placeholder="Your Name"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="email" id="email" autoComplete="off" placeholder="Your email"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="phone" id="phone" autoComplete="off" placeholder="Your phone"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="password" id="password" autoComplete="off" placeholder="Your password"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="cpassword" id="cpassword" autoComplete="off" placeholder="Your cpassword"/>
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                                </div>
                                <NavLink to="/signin" className = "signup-image-link">Already a User</NavLink>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>  
 )
}
export default Signup;