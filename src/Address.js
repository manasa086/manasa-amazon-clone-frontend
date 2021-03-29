import React,{useState,useEffect} from 'react'
import "./Address.css";
import {useHistory} from "react-router-dom";
import routes from "./routes";
function Address() {
    const history=useHistory();
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


    },[])
    if(addressData.length>0)
    {
        const addAddress=()=>{
            history.push("/addressForm")
        }
        const editAddress=(id)=>{
            history.push(routes.editAddress.replace(":id",id));

        }
        const removeAddress=(id)=>{
            let data={
                index:id,
                email:sessionStorage.getItem("email"),
                token:sessionStorage.getItem("token")
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
                if(data.message==="Data removed SuccessFully")
                    setaddressData(data.data)
                else{
                    
                }
            })
        }
        return (
            <>
            <div className="address1">
                Your Addresses
            </div>
            <div className="address">
                
                <div className="address__row" onClick={addAddress}>
                <div className="address__plus" > <p>➕ </p> 
                <br></br>
                <b>Add address</b>
                </div>
                </div>
                {addressData.map((each,index)=>{
                    return(
                        <div className="address__row1" key={index}>
                    <div className="address__content">
                <b>{each.name} </b>
                <p>{each.flatno} &nbsp;{each.area}</p>
                <p>{each?.landmark} {each.city}</p>
                <p>{each.state},{each.pin}</p>
                <p>{each.country}</p>
                <p>Phone number: {each.mobile}</p>
                </div>
                <div className="address__Edit">
                    <a href="#" onClick={()=>editAddress(each.index)}>Edit</a> &nbsp;| &nbsp;
                    <a href="#" onClick={()=>removeAddress(each.index)}>Remove</a>
                </div>
                </div>

                    )
                })}        
            </div>
            </>
        )
    }
    else{
        const addAddress=()=>{
            history.push("/addressForm")
        }
        return (
            <>
            <div className="address1">
                Your Addresses
            </div>
            <div className="address">
                
                <div className="address__row" onClick={addAddress}>
                <div className="address__plus" > <p>➕ </p> 
                <br></br>
                <b>Add address</b>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default Address
