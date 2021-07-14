import { NavLink } from "react-router-dom";

const todo = () => {
    return (
        <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> TODO </h2>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>Riddhi </h5>
                                    <h6>riddhisi.it@gmail.com</h6>
                                </div>
                                
                                
                            </div>
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
                                <NavLink to="/add-task" className = "signup-image-link">Add Task</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default todo;
