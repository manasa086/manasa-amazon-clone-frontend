import React,{useState,useEffect} from 'react'

function CartData() {
    const [cartData,setcartData]=useState("");
    useEffect(()=>{
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
            if(data.message!=="Error while fetching the data")
            {
                setcartData(data.message)
            }
            else{
                setcartData("Error while fetching the data")
            }
        })
    },[])
    if(cartData)
    {
        return (
           <p>{cartData.length}</p>
        )
    }
    else{
        return 0;
    }
}

export default CartData;
