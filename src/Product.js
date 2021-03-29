import React from 'react'
import "./Product.css";
import staricon from "./staricon.png";
import { useStateValue } from './StateProvider';

function Product({id,title,image,price,rating}) {
    const [{basket},dispatch]=useStateValue();


    const addToBasket=()=>{
        //dispatch item into the datalayer
        if(sessionStorage.getItem("email"))
        {
        let data={id,
            title,image,price,rating,email:sessionStorage.getItem("email"),
        token:sessionStorage.getItem("token")
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/addToCart",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="Item added to Cart"){
                dispatch({
                    type:'ADD_TO_BASKET',
                    item:{
                        id:id,
                        title:title,
                        image:image,
                        price:price,
                        rating:rating,
                        index:data.index
                    },
                });
                alert("Product added to Cart");
                sessionStorage.setItem("basket",data.getData.length)

            }
            else{
                alert("Error while adding item to cart")
            }
        })
    }
    else{
        alert("Kindly Sign In to add Items to the cart ")
    }

        
    };
    
    return (
        <div className='product'>
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_,i)=>(
                      <p><img className="star" src={staricon}></img></p>       
                    ))}
                </div>
            </div>
            <img src={image} alt="image not found"></img>
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
