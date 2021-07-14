import { NavLink } from "react-router-dom";

const Add_task = () => {
    return (
        <>
           <section className = "signup">
                <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> ADD TASK </h2>
                            <form className = "register-form" if="register-form">
        
                                <div className = "form-group">
                                    <input type="text" name="task" id="task" autoComplete="off" placeholder="Your task"/>
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="SingIn"/>
                                </div>
                                <NavLink to="/todo" className = "signup-image-link">See Your ToDo</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Add_task;