import React,{useState} from 'react';
import "./OrderProduct.css";
import staricon from "./staricon.png";

function OrderProduct({id,setOrderData,image,title,price,rating,index,addressName,addressCountry,addressState,addressCity,addressMobile,addressPin,addressFlatno,addressArea,addressEmail,email}) {

    const [deliveryAddress,setdeliveryAddress]=useState("");

    const setDeliveryAddress=()=>{
        if(!deliveryAddress)
        {
        setdeliveryAddress({
            addressName,addressCountry,addressState,addressCity,addressMobile,addressPin,addressFlatno,addressArea,addressEmail
        })
        }
        else{
            setdeliveryAddress("");
        }
    }
    const cancelOrder=()=>{
            let data={
                email,
                token:sessionStorage.getItem("token"),
                id,image,title,price,rating,
                index,addressName,addressCountry,addressState,addressCity,addressMobile,addressPin,addressFlatno,addressArea,addressEmail
            }
            fetch("https://manasa-amazon-clone.herokuapp.com/cancelOrder",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then((res)=>res.json())
            .then((data)=>{
                if(data.message=="Order Cancelled SuccessFully"){
                    let data={
                        email:sessionStorage.getItem("email"),
                        token:sessionStorage.getItem("token")
                    }
                    fetch("https://manasa-amazon-clone.herokuapp.com/getordersData",{
                        method:"POST",
                        body:JSON.stringify(data),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                    .then((res)=>res.json())
                    .then((data)=>{
                        if(data.message.length>0)
                        {
                            setOrderData(data.message)
                        }
                        
                    })
                }
                else{
                    alert("Error while cancelling Order, Kindly try Again")
                }
            })
    }

    return (
        <div className="orderProduct">
            <img src={image} className="orderProduct__image  "/>
            <div className="orderProduct__info">
               <p className="orderProduct__title">{title}</p>
               <a className="orderProduct__anchor"onClick={setDeliveryAddress}>➡Delivery Address</a><br></br>
               {deliveryAddress?<><b>{deliveryAddress.addressName}</b>
                            <p>{deliveryAddress.addressFlatno},{deliveryAddress.addressArea}</p>
                            <p>{deliveryAddress.addressCity},{deliveryAddress.addressState}</p>
                            <p>{deliveryAddress.addressPin},{deliveryAddress.addressCountry}</p></>:null}
                <p className="orderProduct__price">
                 <small>₹</small>
                 <strong>{price}</strong>   
                </p>
                <div className="orderProduct__rating">
                    {Array(rating).fill().map(()=>{
                        return <p><img className="star" src={staricon}></img></p>
                    })}
                </div>
                <button className="orderProduct__button" onClick={cancelOrder}>Cancel Order</button>
                
            </div>
           
        </div>
    )
}

export default OrderProduct
