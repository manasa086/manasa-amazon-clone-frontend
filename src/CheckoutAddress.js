import React,{useEffect,useState} from 'react';
import "./CheckoutAddress.css"; 
import {useHistory} from "react-router-dom";
import routes from './routes';

function CheckoutAddress() {

    const history=useHistory();
    const [price,setPrice]=useState("");
    const [changeStatus,setchangeStatus]=useState(false);
    
    const [addressData,setaddressData]=useState([]);
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
            }
            else{
                setaddressData(data.message);
            }
            // console.log(data.message);
        })


    },[changeStatus])
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
    const placeOrder=()=>{
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/getCartData",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
                if(data.message==="Error while fetching the data")
                {
                    setPrice(data.message.reduce((initial,each)=>{
                        return  initial+each.price
                    },0))
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
            token:sessionStorage.getItem("token")}
        // creating a new order
        const result=await fetch("https://manasa-amazon-clone.herokuapp.com/orders",{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res)=>res.json())
        console.log(result);
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
                        addressIndex
                    }
                    // alert("Hello");
                    fetch("https://manasa-amazon-clone.herokuapp.com/placeOrder",{
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
    else{
        return null;;
    }
}

export default CheckoutAddress
