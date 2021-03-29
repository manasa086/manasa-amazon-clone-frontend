import React,{useState,useEffect} from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';



function Checkout() {
    
    let [{basket,user},dispatch]=useStateValue();
    let [cartData,setcartData]=useState([]);
  
    useEffect(()=>{
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/cartDetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="No items exists in cart for the given user"){

                setcartData([]);
            }
            else{
                setcartData(data.message);
                
            }

        })

    },[])
    
    const cartDataSetting=(data)=>{
        setcartData(data)
    }
    if(sessionStorage.getItem("email"))
    {
        if(cartData.length>0)
        {
            return (
                <div className="checkout">
                    <div className="checkout__left">
                        <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349266B_.jpg" alt="image not found"></img>
                    <div>
                        {user?<h3>Hello {user}</h3>:null}
                        <h2 className="checkout__title">Your shopping Basket</h2>
                        {cartData.map(item=>(
                            <CheckoutProduct cartDataSetting={setcartData} id={item.id} index={item.index} title={item.title} image={item.image} price={item.price} rating={item.rating}>
                                
                            </CheckoutProduct>
                            
                        ))}
                    </div>
                    </div>

                    <div className="checkout__right">
                    <Subtotal cartData={cartData} ></Subtotal>
                        
                    </div>
                </div>
                )
        }
        else{
            return (
                <div className="checkout">
                    <div className="checkout__left">
                        <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349266B_.jpg" alt="image not found"></img>
                    </div>
                </div>
            )
        }
    }
    else{
        return(
            <>
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349266B_.jpg" alt="image not found"></img>
            </div>
            
        </div>
        <h2 className="checkout__title1">Kindly Sign In to add Items to the Cart</h2>
        </>
        )
    }
}

export default Checkout
