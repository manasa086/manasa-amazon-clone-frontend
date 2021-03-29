import React,{useState,useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from "./Home";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Address from './Address';
import AddressForm from './AddressForm';
import { auth } from "./firebase";
import {useStateValue} from "./StateProvider";

import routes from "./routes";
import EditAddress from "./EditAddress";
import CheckoutAddress from "./CheckoutAddress";
import CartData from "./CartData";
import CheckoutAddressById from "./CheckoutAddressById";
import Orders from "./Orders";
import Search from "./Search";

function App() {
   const [{},dispatch]=useStateValue();
   
  // const [authMsg,setAuthMsg]=useState("");
  //   useEffect(()=>{
  //      if(sessionStorage.getItem("token")!="undefined")
  //      {
  //       let data={token:sessionStorage.getItem("token")}
  //       fetch("https://manasa-amazon-clone.herokuapp.com/authenticate",{
  //           method:"POST",
  //           body:JSON.stringify(data),
  //           headers:{
  //               "Content-Type":"application/json"
  //           }
  //       })
  //       .then((res)=>res.json())
  //       .then((data)=>{
  //           if(data.message==="Authenticated"){
  //               setAuthMsg("Authenticated")
  //           }
  //           else{
  //               setAuthMsg("Not Authenticated")
  //           }
  //       })
  //     }
  //     else{
  //       setAuthMsg("No need to Authenticate");
  //     }

  //   },[])
  //   if(sessionStorage.getItem("email")!="undefined")
  //   {
  //         if(authMsg==="Authenticated"){
  //           return (
  //             <Router>
  //             <div className="App">
              
  //               <Switch>
  //               <Route path="/login">
  //                 <Login></Login>
  //               </Route>
  //               <Route path="/checkout">
  //                 <Header/>
  //                 <Checkout/>
  //               </Route>
  //               <Route path="/">
  //                 <Header/>
  //                 <Home />
  //               </Route> 
  //               </Switch>
  //               </div>
  //             </Router>
              
  //           );
            
  //         }
  //         else if(authMsg==="Not Authenticated"){
  //              return (<h4>User Not Authenticated, Sign In Again 🙁</h4>);
  //         }
  //         else{
  //           return (
  //             <Router>
  //             <div className="App">
              
  //               <Switch>
  //               <Route path="/login">
  //                 <Login></Login>
  //               </Route>
  //               <Route path="/checkout">
  //                 <Header/>
  //                 <Checkout/>
  //               </Route>
  //               <Route path="/">
  //                 <Header/>
  //                 <Home />
  //               </Route> 
  //               </Switch>
  //               </div>
  //             </Router>
              
  //           );
  //         }
  //   }
  //   else{
  //     return (
  //       <Router>
  //       <div className="App">
        
  //         <Switch>
  //         <Route path="/login">
  //           <Login></Login>
  //         </Route>
  //         <Route path="/checkout">
  //           <Header/>
  //           <Checkout/>
  //         </Route>
  //         <Route path="/">
  //           <Header/>
  //           <Home />
  //         </Route> 
  //         </Switch>
  //         </div>
  //       </Router>
        
  //     );






  //   }
    //=====================================CP===================================
  // useEffect(() => {
  //   auth.onAuthStateChanged(authUser=>{
  //    // console.log('user',authUser);
  //     if(authUser){
  //       //user logged in
  //       dispatch({
  //         type:'SET_USER',
  //         user:authUser
  //       })
  //     }
  //     else{
  //       //the user is logged out
  //       dispatch({
  //         type:'SET_USER',
  //         user:null
  //       })
  //     }
  //   })
  // }, [])

 
  return (
    <Router>
    <div className="App">
    
      <Switch>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/orderPage">
        <Header></Header>
       <Orders></Orders>
      </Route>
      <Route path="/cartData">
        <CartData></CartData>
      </Route>
      <Route path={routes.search}>
        <Header></Header>
      <Search></Search>
      </Route>
      <Route path={routes.checkoutAddressById}>
        <CheckoutAddressById></CheckoutAddressById>
      </Route>
      <Route path="/address">
        <Header/>
        <Address/>
      </Route>
      <Route path="/addressForm">
        <Header/>
        <AddressForm></AddressForm>
      </Route>
      <Route path="/checkout">
        <Header/>
        <Checkout/>
      </Route>
      <Route path={routes.editAddress}>
        <Header/>
        <EditAddress></EditAddress>
      </Route>
      
      <Route path="/checkoutAddress">
        <CheckoutAddress></CheckoutAddress>
      </Route>
      <Route path="/">
        <Header/>
        <Home />
      </Route> 
      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
