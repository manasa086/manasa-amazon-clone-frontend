import React,{useState} from 'react';
import "./CancelProduct.css";
import staricon from "./staricon.png";

function CancelProduct({email, id, image, title, price, rating, addressName, addressCountry,addressState,addressCity, addressMobile, addressPin, addressFlatno, addressArea,addressEmail}) {
   
    const [deliveryAddress,setdeliveryAddress]=useState("");
    const setDeliveryAddress=()=>{
        if(!deliveryAddress)
        {
        setdeliveryAddress({
            addressName,addressCountry,addressState,addressCity,addressMobile,addressPin,addressFlatno,addressArea,addressEmail,addressState,addressCity
        })
        }
        else{
            setdeliveryAddress("");
        }
    }
    return (
        <div className="cancelProduct">
            <img src={image} className="cancelProduct__image  "/>
            <div className="cancelProduct__info">
               <p className="cancelProduct__title">{title}</p>
               <a className="cancelProduct__anchor"onClick={setDeliveryAddress}>➡Delivery Address</a><br></br>
               {deliveryAddress?<><b>{deliveryAddress.addressName}</b>
                            <p>{deliveryAddress.addressFlatno},{deliveryAddress.addressArea}</p>
                            <p>{deliveryAddress.addressCity},{deliveryAddress.addressState}</p>
                            <p>{deliveryAddress.addressPin},{deliveryAddress.addressCountry}</p></>:null}
                <p className="cancelProduct__price">
                 <small>₹</small>
                 <strong>{price}</strong>   
                </p>
                <div className="cancelProduct__rating">
                    {Array(rating).fill().map(()=>{
                        return <p><img className="star" src={staricon}></img></p>
                    })}
                </div>
                
            </div>
           
        </div>
    )
}

export default CancelProduct
