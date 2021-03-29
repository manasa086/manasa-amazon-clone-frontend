import React,{useEffect,useState} from 'react'
import OrderProduct from './OrderProduct';
import CancelProduct from './CancelProduct'
import "./Orders.css";
function Orders() {
    const [orderData,setOrderData]=useState([]);
    const [message,setMessage]=useState("orders");
    const [cancelorders,setCancelorders]=useState([])
    const [getClassName,setClassName]=useState("orders__text1");
    const [getClassName1,setClassName1]=useState("orders__text");

    useEffect(()=>{
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
            console.log(data);
            if(data.message.length>0)
            {
                setOrderData(data.message)
            }
            
        })
    },[])
    const viewOrders=()=>{
        setMessage("orders");
        setClassName("orders__text1")
        setClassName1("orders__text")
    }
    const cancelOrders=()=>{
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        fetch("https://manasa-amazon-clone.herokuapp.com/getCancelOrders",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setCancelorders(data.message);
            console.log(data.message)
        })
        setMessage("cancelorders")
        setClassName("orders__text")
        setClassName1("orders__text1")
    }
    if(orderData.length>0)
    {
        return (
            <div>
            <p className="orders__heading">Your Orders</p>
            <div className="orders__bottomline">
               
            <a className={getClassName} onClick={viewOrders} >Orders ▼</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className={getClassName1}onClick={cancelOrders}>Cancelled Orders ▼</a></div>
            {message=="orders"?
                <div>
                {orderData.map((item,index)=>{
                    
                return <OrderProduct setOrderData={setOrderData} key={index} index={item.index} email={item.email} addressName={item.addressName} addressCountry={item.addressCountry} addressState={item.addressState} addressCity={item.addressCity} addressMobile={item.addressMobile} addressPin={item.addressPin} addressFlatno={item.addressFlatno} addressArea={item.addressArea} addressEmail={item.addressEmail} id={item.product[0].id}  title={item.product[0].title} image={item.product[0].image} price={item.product[0].price} rating={item.product[0].rating}>
                            
                </OrderProduct>
            })}</div>:<div>{cancelorders.map((item,index)=>{
                return <CancelProduct email={item.email} id={item.id} image={item.image} title={item.title} addressState={item.addressState} addressCity={item.addressCity} price={item.price} rating={item.rating} addressName={item.addressName} addressCountry={item.addressCountry} addressMobile={item.addressMobile} addressPin={item.addressPin} addressFlatno={item.addressFlatno} addressArea={item.addressArea} addressEmail={item.addressEmail}></CancelProduct>
            })
            }</div>}
            </div>
        )
    }
    else 
    {
        return null;
    }
    
}

export default Orders
