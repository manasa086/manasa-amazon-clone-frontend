import React,{useEffect,useState} from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from "./StateProvider";
import { getBasketTotal } from './reducer';
import {useHistory} from "react-router-dom";


function Subtotal({cartData}) {


    const [{basket},dispatch]=useStateValue();
    // const [cartData,setcartData]=useState("");
    // const [cartPrice,setcartPrice]=useState(0);
    const history=useHistory();

    // useEffect(()=>{
    //     fetch("https://manasa-amazon-clone.herokuapp.com/getCartData")
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         setcartData(data.message.length)
    //         setcartPrice(data.message.reduce((each,item)=>{
    //             return each+Number(item.price)
    //         },0))
    //     })
        
    // },[])

    

    const checkOut=()=>{
        
        if(sessionStorage.getItem("email")){
            let data={
                email:sessionStorage.getItem("email"),
                token:sessionStorage.getItem("token"),      
            }
            fetch("https://manasa-amazon-clone.herokuapp.com/checkout",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.message==="Data available in the cart"){
                    history.push("/checkoutAddress");
                }
                else{
                    alert("Cart Data is Empty.Kindly,add items to Cart for buying");
                }
            })
        }
        else{
             
              history.push("/login");
        }
    }
    return (
        <div className="subtotal"> 
            
           <CurrencyFormat 
                renderText={(value)=>(
                    <>
                        <p>
                            {/* Part of the homework */}
                            {sessionStorage.setItem("basket",cartData?.length)}
                            Subtotal ({cartData?.length} items): <strong>₹{cartData.reduce((each,item)=>{
                                return each+item.price
                            },0)}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>This Order Contains a gift
                        </small>
                    </>

                )}  
                decimalScale={2}
                value={getBasketTotal(basket)}// Part of the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={checkOut}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;
