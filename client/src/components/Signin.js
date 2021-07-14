import { NavLink } from "react-router-dom";

const Signin = () => {
    return (
        <div>
            <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> Sign In </h2>
                            <form className = "register-form" if="register-form">
        
                                <div className = "form-group">
                                    <input type="text" name="email" id="email" autoComplete="off" placeholder="Your email"/>
                                </div>

                                <div className = "form-group">
                                    <input type="text" name="password" id="password" autoComplete="off" placeholder="Your password"/>
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="SingIn"/>
                                </div>
                                <NavLink to="/signup" className = "signup-image-link">New User</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            </>
        </div>
    )
}

export default Signin;