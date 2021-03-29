import React,{useRef,useEffect,useState} from 'react';
import "./CheckoutAddress.css"; 
import {useHistory, useParams} from "react-router-dom";
import routes from './routes';
import "./Address.css";
import './Header.css';
// import {useHistory} from "react-router-dom"; 
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import CartData from "./CartData";


function CheckoutAddressById() {
    const history=useHistory();
    const ref_val=useRef();
    const [inputValue,setInputValue]=useState("");
    const {id}=useParams();
    const [price,setPrice]=useState("");
    const [changeStatus,setchangeStatus]=useState(false);
    const [message,setMessage]=useState("")
    
    const [addressData,setaddressData]=useState([]);
    const [{basket,user},dispatch]=useStateValue();
    let product_details=[
        {id:"12321341",title:"The Lean startup: How Constant Innovation Creates Radically Successful Businesses Paperback",price:29.99,image:"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_5Y400_.jpg",rating:5},{
            id:"49538094",title:"Kenwood kMix Stand Mixer for Baking,Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",price:239.0,image:"https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",rating:4},{
            id:"4903850",title:"Samsung LC49RG90SUXEN 49 Curved LED Gaming Monitor",price:199.99,image:"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_5X466_.jpg",rating:3},{
            id:"23445930",title:"Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",price:98.99,image:"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",rating:5},{
            id:"3254354345",title:"New Apple iPad Pro (12.9-inch, Wi-Fi,128GB)- Silver (4th Generation)",price:598.99,image:"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX3B5_.jpg",rating:4},{
            id:"90829332",title:"Samsung LC49RG90SSUXEN 49 Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",price:1094.98,image:"https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",rating:4
            }]
    useEffect(()=>{
        let data1={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")

        }
        fetch("https://manasa-amazon-clone.herokuapp.com/addressData",{
            method:"POST",
            body:JSON.stringify(data1),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="No Address Found"){
                setaddressData([]);
                setMessage("Add Address")
            }
            else{
                setaddressData(data.message);
            }
            // console.log(data.message);
        })


    },[changeStatus])
    const signOut=()=>{
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("basket");
        // console.log(sessionStorage.getItem("email"));
        dispatch({
            type:"EMPTY_BASKET",
        })
        dispatch({
            type:"SET_USER",
            user:null
        })
        
    }

    const submitMethod=(e)=>{
        // alert(e.key)
        if(e.keyCode==13 || e.key=="Enter")
        {
            let searchproduct=product_details.filter((each)=>each.title.toLowerCase()===inputValue.toLowerCase())
            // console.log(searchproduct)
           history.push(routes.search.replace(":id",searchproduct[0].id));
        }
    }

    const changeInput=(e)=>{
        setInputValue(e.target.value);
    }
    const deleteAddressById=(index)=>{
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token"),
            index
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/removeAddressById",{
            method:"DELETE",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message=="Data removed SuccessFully")
            {
                setchangeStatus(!changeStatus)
            }
        })
    }
   
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            document.body.appendChild(script);
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            
        });
      }
    async function displayRazorpay(addressIndex) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
  
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token"),
            index:id
        }
        // creating a new order
        const result=await fetch("https://manasa-amazon-clone.herokuapp.com/orders1",{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res)=>res.json())
        const options = {
            key: "rzp_test_pz7viYBiCcvI1Z", // Enter the Key ID generated from the Dashboard
            amount: result.amount.toString(),
            currency: result.currency,
            name: "Manasa Somisetty",
            description: "Test Transaction",
            order_id: result.id,
            handler: function (response) { 
                    
                  if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature){
                    let data={
                      email:sessionStorage.getItem("email"),
                      token:sessionStorage.getItem("token"),
                        addressIndex,
                        index:id,
                    }
                    // alert("Hello");
                    fetch("https://manasa-amazon-clone.herokuapp.com/placeOrder1",{
                      method:"POST",
                      body:JSON.stringify(data),
                      headers:{
                        "Content-Type":"application/json"
                      }
                    })
                    .then((res)=>res.json())
                    .then((data)=>{
                        sessionStorage.setItem("basket",data.cart.length);
                      if(data.message==="Order has been Placed")
                      {
                        alert("Order Placed SuccessFully")
                        history.push("/");
                      }
                    })
                  }
            },
            prefill: {
                name: "Manasa Somisetty",
            },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    const EditAddressById=(index)=>{
            history.push(routes.editAddress.replace(":id",index));
    }
    if(addressData.length>0)
    {
        return (
            <div>
                <p className="checkout__paragraph">Select a delivery Address</p>
                <div className="checkout__horizontal"></div>
                {addressData.map((each,index)=>{
                    return (
                        <>
                        <div className="checkout__address">
                            <b>{each.name}</b>
                            <p>{each.flatno},{each.area}{each?.landmark}</p>
                            <p>{each.city},{each.state}</p>
                            <p>{each.pin}</p>
                            <p>{each.country}</p>
                        </div>
                        <button className="checkoutAddress__button" onClick={()=>displayRazorpay(each.index)}>Deliver to this address</button><br></br>
                        <span><button className="checkoutAddress__buttons1" onClick={()=>EditAddressById(each.index)}>Edit</button><button className="checkoutAddress__buttons2" onClick={()=>deleteAddressById(each.index)}>Delete</button></span>
                        </>

                    )
                })
                }
            </div>
        )
    }
    else if(message==="Add Address"){
        const addAddress=()=>{
            history.push("/addressForm")
        }
        return (
            <>
            <div className="header">
            <Link to="/">
            <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" className="header_logo"></img>
            </Link>
            {sessionStorage.getItem("email")?
            <Link to="/address"><div className='header__optionLineTwo1'>Add<br></br>Address</div></Link>:""}
           
            <div className="header__search">
                &nbsp;&nbsp;&nbsp;<input className="header__searchInput" type="text" ref={ref_val} onKeyDown={submitMethod} onChange={changeInput} value={inputValue}></input>
                <SearchIcon className="header__searchIcon"></SearchIcon>
            </div>
            <div className="header__nav">
                
                {sessionStorage.getItem("email")?
                <div className='header__option1' onClick={signOut}>
                    <span className='header__optionLineOne'>
                        Hello User
                    </span>
                    <span className='header__optionLineTwo'>
                       Sign Out
                    </span>
                </div>:<Link to="/login">
                <div className='header__option1'>
                    <span className='header__optionLineOne'>
                        Hello Guest
                    </span>
                    <span className='header__optionLineTwo'>
                       Sign In
                    </span>
                </div>
                </Link>}
                {sessionStorage.getItem("email")?
                <Link to="/orderPage">
                <div className='header__option1'>
                    <span className='header__optionLineOne'>
                       Returns
                    </span>
                    <span className='header__optionLineTwo'>
                       & Orders
                    </span>
                    
                </div>
                </Link>:<div className='header__option'>
                    <span className='header__optionLineOne'>
                       Returns
                    </span>
                    <span className='header__optionLineTwo'>
                       & Orders
                    </span>
                    
                </div>}
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                       Prime
                    </span>
                </div>
                <Link to="/checkout">
              <div className="header__optionBasket">
                <ShoppingBasketIcon/>
                {/* <span className="header__optionLineTwo header__basketCount">{sessionStorage.getItem("email")?sessionStorage.getItem("basket"):0}</span> */}
             </div>
             </Link> 
            </div>
        </div>
            <div className="address1">
               
            </div>
            <div className="address">
                
                <div className="address__row" onClick={addAddress}>
                <div className="address__plus" > <p>➕ </p> 
                <br></br>
                <b>Add address</b>
                </div>
                </div>
            </div>
            </>
        )
    }
    else{
        return null;
    }
}

export default CheckoutAddressById
