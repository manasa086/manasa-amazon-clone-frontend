import React from 'react';
import "./Search.css";
import {useParams} from "react-router-dom";
import staricon from "./staricon.png";
import { useStateValue } from './StateProvider';
import {useHistory} from "react-router-dom";

function Search() {
    let product_details=[
        {id:"12321341",title:"The Lean startup: How Constant Innovation Creates Radically Successful Businesses Paperback",price:29.99,image:"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_5Y400_.jpg",rating:5},{
            id:"49538094",title:"Kenwood kMix Stand Mixer for Baking,Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",price:239.0,image:"https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",rating:4},{
            id:"4903850",title:"Samsung LC49RG90SUXEN 49 Curved LED Gaming Monitor",price:199.99,image:"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_5X466_.jpg",rating:3},{
            id:"23445930",title:"Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",price:98.99,image:"https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",rating:5},{
            id:"3254354345",title:"New Apple iPad Pro (12.9-inch, Wi-Fi,128GB)- Silver (4th Generation)",price:598.99,image:"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX3B5_.jpg",rating:4},{
            id:"90829332",title:"Samsung LC49RG90SSUXEN 49 Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440",price:1094.98,image:"https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",rating:4
            }];
    let {id}=useParams();
    const history=useHistory();
    let search_product=product_details.filter((each)=>each.id==id);
    const [{basket},dispatch]=useStateValue();

    const navigateBack=()=>{
        history.push("/")
    }

    const addToBasket=()=>{
        //dispatch item into the datalayer
        if(sessionStorage.getItem("email"))
        {
        
        
        let data={id:search_product[0].id,
            title:search_product[0].title,
            image:search_product[0].image,
            price:search_product[0].price,
            rating:search_product[0].rating,
            email:sessionStorage.getItem("email"),
        token:sessionStorage.getItem("token")
        }
        // console.log(data)
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
                <p>{search_product[0].title}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{search_product[0].price}</strong>
                </p>
                <div className="product__rating">
                    {Array(search_product[0].rating).fill().map((_,i)=>(
                      <p><img className="star" src={staricon}></img></p>       
                    ))}
                </div>
            </div>
            <img src={search_product[0].image} alt="image not found"></img>
            <button onClick={addToBasket}>Add to Basket</button>
            <button onClick={navigateBack}>Navigate Back</button>
        </div>
    )
    
}

export default Search
