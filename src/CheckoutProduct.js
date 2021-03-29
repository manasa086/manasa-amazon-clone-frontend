import React from 'react';
import "./CheckoutProduct.css";
import {useHistory} from "react-router-dom";
import staricon from "./staricon.png";
import { useStateValue } from './StateProvider';
import routes from "./routes";
function CheckoutProduct({id,image,title,price,rating,index,cartDataSetting}) {
    const [{basket},dispatch]=useStateValue();
    const history=useHistory();

    const removeFromBasket=()=>{
        let data={
            id,
            image,
            title,
            price,
            rating,
            index,
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        
        fetch("https://manasa-amazon-clone.herokuapp.com/removeFromBasket",{
            method:"DELETE",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((data=>{
            if(data.message==="Data removed from cart"){
                cartDataSetting(data.data)
                dispatch({
                    type:"REMOVE_FROM_BASKET",
                    data:data.data
                })
                sessionStorage.setItem("basket",data.data.length);
            }
        }))
    }

    const placeOrder=()=>{
            history.push(routes.checkoutAddressById.replace(":id",index));

    }
    return (
        <div className="checkoutProduct">
            <img src={image} className="checkoutProduct__image  "/>
            <a><div className="chekoutProduct__info">
               <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                 <small>₹</small>
                 <strong>{price}</strong>   
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map(()=>{
                        return <p><img className="star" src={staricon}></img></p>
                    })}
                </div>
                <button className="checkoutProduct__button" onClick={placeOrder}>Proceed to Buy</button>&nbsp;
                <button  className="checkoutProduct__button" onClick={removeFromBasket}>Remove from Basket</button>
            </div>
            </a>
        </div>
    )
}

export default CheckoutProduct
