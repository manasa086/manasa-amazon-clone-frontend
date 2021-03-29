import React, { useState } from 'react';
import "./Login.css";
import {Link,useHistory} from "react-router-dom";
import { auth } from './firebase';
import {useStateValue} from "./StateProvider";

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState("");
    const history=useHistory();
    const [{},dispatch]=useStateValue();
    const signIn=(e)=>{
        e.preventDefault();
           
        //=====================CP=====================================
        // auth.signInWithEmailAndPassword(email,password)
        // .then(auth=>{
        //     history.push("/");
        // })
        // .catch(error=>alert(error.message));
        let data={
            email,
            password
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.message==="Success"){
                sessionStorage.setItem("email",email);
                sessionStorage.setItem("token",data.token);
                    dispatch({
                        type:"SET_USER",
                        user:email
                    })
                    // dispatch({
                    //     type:"EMPTY_BASKET",
                    // })
                history.push("/")
                
                // if(sessionStorage.getItem("basket")){
                //     let data1={
                //         email,
                //         token:sessionStorage.getItem("token"),
                //         basket:JSON.parse(JSON.stringify(sessionStorage.getItem("basket")))
                //     }
                //     fetch("https://manasa-amazon-clone.herokuapp.com/checkout",{
                //         method:"POST",
                //         body:JSON.stringify(data1),
                //         headers:{
                //             "Content-Type":"application/json"
                //         }
                //     })
                //     .then((res)=>res.json())
                //     .then((data)=>{
                //         if(data.message==="Data SuccessFully Inserted into Database"){      
                //             history.push("/Address")

                //         }
                //     })
                // }
                // else{
                   
                //         alert("Hello")
                //         let data1={
                //             email:sessionStorage.getItem("email"),
                //             token:sessionStorage.getItem("token")
                        
                //         }
                //         fetch("https://manasa-amazon-clone.herokuapp.com/getCartData",{
                //             method:"POST",
                //             body:JSON.stringify(data1),
                //             headers:{
                //                 "Content-Type":"application/json"
                //             }
                //         })
                //         .then((res)=>res.json())
                //         .then((data)=>{
                //             if(data.message!=="Error while fetching the data"){
                //                 sessionStorage.setItem("basket",data.message.length);
                //                 history.push("/")
    
                //             }
                //         })
                    
                    
                   
                // }

            }
            else if(data.message==="UserName or Password Incorrect"){
                setMessage("UserName or Password Incorrect 🙁")
            }
            else 
            {
                setMessage("User Not Found 🙁")
            }

         
               
    })
}

    // const test=()=>{
    //     fetch("http://localhost:5000/test",{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json",
    //         }
    //     })
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log(data);
    //     })
    // }
    
    const register=(e)=>{
        e.preventDefault();
        ///Firebase Register =====================CP=====================================
        // auth.createUserWithEmailAndPassword(email,password)
        // .then((auth)=>{
        //     if(auth){
        //         history.push("/")
        //     }
        // })
        // .catch(error=>alert(error.message))
        if(email=="" || email==" ")
        {
            setMessage("Email Cannot be Empty 😐.Kindly, Provide Valid Email Address");
        }
        else{
            let data={
                email,
                password
            }
            fetch("https://manasa-amazon-clone.herokuapp.com/register",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.message==="Data SuccessFully Inserted into Database"){
                    setMessage("Your Account is Create SuccessFully 🙂")
                }
                else if(data.message==="Email Already Exists, Provide a new Email Address"){
                    setMessage("Email Already Exists,Kindly Provide a new Email Address 😐")
                }
                else{
                    setMessage("Error while creating Account.Try Again 🙁")
                }
            
            })
        }
    }
    return (
        <div className="login">
            <Link to="/"><img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"></img>
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text"  onChange={e=>setEmail(e.target.value)} value={email}></input>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
                    <button  className="login__signInButton" onClick={signIn} >Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE
                    Conditions of Use & Sale. Please see our Privacy Notice,
                    our Cookies Notice and our Interest Based Ads Notice.
                </p>
                <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
                {message?<b>{message}</b>:null}
                
            </div>
        </div>
    )
}

export default Login
