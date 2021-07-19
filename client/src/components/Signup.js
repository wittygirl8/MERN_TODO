import React, {useState}  from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email:"", phone:"",password:"",cpassword:""
    });
    const [userError, setUserError] = useState('');
    const [contactError, setContactError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cpasswordError, csetPasswordError] = useState('');     
    

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value});
    }

    const PostData = async (e) => {
        e.preventDefault();

        //Object Destructuring
        const { name, email, phone,password,cpassword } = user;

        setPasswordError('');

        if(name!=='')
            setUserError('');
        else
            setUserError('Required');
        if(email !==''){
            setEmailError('');
            if((email.indexOf('@')<=0) || (email.charAt(email.length - 4)!=".")&&(email.charAt(email.length - 4)!=".")){
                setEmailError('Invalid Email');
                return false;
            }
        }
        else{
            setEmailError('Required');
        }
        if(phone!==''){
            if(phone.length<10){
                setContactError('phone number must be 10 digit long');
            }
            setContactError('');
        }
        else
            setContactError('Required');
        
        if(password !== ''){
            if(password.length<6){
                setPasswordError('password must be minimum 6 digit long');
                return false;
            }
        }
        else
            setPasswordError('Required');

        if(cpassword !== ''){
            if(password !== cpassword){
                csetPasswordError('password doesn\'t match with conform password');
                return false;
            }
        }
        else
            csetPasswordError('Required');
        
        

        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name, email, phone,password,cpassword
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data ){
            window.alert("Invalid registration")
            console.log("Invalid registration");
        }
        else{
            window.alert("Registration Successfull")
            console.log("Successfull Registration");

            history.push("/signin");
        }
    }

    return (
          <>
            <section className = "signup">
            <div className = "container mt-5">
                    <div className = "signup-content">
                        <div className = "signup-form">
                            <h2 className = "form-title"> Sign up </h2>
                            <form method = "POST" className = "register-form" if="register-form">
                                
                            <div className = "form-group">
                                    {userError&&<div className="err-msg">{userError}</div>}
                                    <input type="text" name="name" id="name" autoComplete="off"
                                    value = {user.name}
                                    onChange = {handleInputs} 
                                    placeholder="Your Name"/>
                                    
                                </div>

                                <div className = "form-group">
                                    {emailError&&<div className="err-msg">{emailError}</div>}
                                    <input type="text" name="email" id="email" autoComplete="off"
                                    value = {user.email}
                                    onChange = {handleInputs} 
                                    placeholder="Your email"/>
                                </div>

                                <div className = "form-group">
                                    {contactError&&<div className="err-msg">{contactError}</div>} 
                                    <input type="text" name="phone" id="phone" autoComplete="off"
                                    value = {user.phone}
                                    onChange = {handleInputs} 
                                    placeholder="Your phone"/>
                                </div>

                                <div className = "form-group">
                                    {passwordError&&<div className="err-msg">{passwordError}</div>}
                                    <input type="text" name="password" id="password" autoComplete="off"
                                    value = {user.password}
                                    onChange = {handleInputs} 
                                    placeholder="Your password"/>
                                </div>

                                <div className = "form-group">
                                    {cpasswordError&&<div className="err-msg">{cpasswordError}</div>}
                                    <input type="text" name="cpassword" id="cpassword" autoComplete="off"
                                    value = {user.cpassword}
                                    onChange = {handleInputs} 
                                    placeholder="Your cpassword"/>
                                </div>

                                <div className = "form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" 
                                    onClick = {PostData}/>
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