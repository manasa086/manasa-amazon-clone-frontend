import React,{useState} from 'react';
import "./AddressForm.css";
import csc from 'country-state-city';

function AddressForm() {

    const [data,setData]=useState({country:"",name:"",state:"",city:"",mobile:"",pin:"",flatno:"",area:""});
    const countries=csc.getAllCountries();
    const [message,setMessage]=useState("");
    const [countryData,setCountryData]=useState(countries)
    const [stateData,setStateData]=useState([]);
    const [cityData,setCityData]=useState([]);
    const [errors,setErrors]=useState({});
    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
        
        
    }
    const handleValidation=()=>{
        let formIsValid = true;
        let localerrors={};
        console.log(data);
        if(!data.name)
        {
            localerrors["name"]="Cannot be Empty"
            formIsValid=false;
            
        }
         if(!data.country)
        {
            localerrors["country"]="Cannot be Empty"
            formIsValid=false;

        }
        if(!data.state)
        {
            localerrors["state"]="Cannot be Empty"
            formIsValid=false;

        }
        if(!data.city){
            localerrors["city"]="Cannot be Empty"
            formIsValid=false;
            
        }
        if(!data.mobile){
            localerrors["mobile"]="Cannot be Empty"
            formIsValid=false; 

        }
        if(!data.pin){
            localerrors["pin"]="Cannot be Empty"
            formIsValid=false; 

        }
        if(!data.flatno){
            localerrors["flatno"]="Cannot be Empty"
            formIsValid=false; 

        }
        if(!data.area){
            localerrors["area"]="Cannot be Empty"
            formIsValid=false; 

        }
        setErrors({localerrors})
        // console.log(errors);
        return formIsValid;
    }
    const changeState=(event)=>{
        setData({
            ...data,
            [event.target.name]:csc.getCountryById(event.target.value).name
        })
        setStateData(csc.getStatesOfCountry(event.target.value));
    
      }
      const changeCity=(event)=>{
        setData({
            ...data,
            [event.target.name]:csc.getStateById(event.target.value).name
        })
        setCityData(csc.getCitiesOfState(event.target.value));

      }
      const changeCityName=(event)=>{
        setData({
            ...data,
            [event.target.name]:csc.getCityById(event.target.value).name
        })
      }
      const addressSubmit=(e)=>{
          e.preventDefault();
          data.email=sessionStorage.getItem("email");
          data.token=sessionStorage.getItem("token");
        //   console.log(data);
          if(handleValidation())
          {
            fetch("https://manasa-amazon-clone.herokuapp.com/addAddress",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }  
            })
            .then((res)=>res.json())
            .then((result)=>{
                // console.log(result)
                if(result.message==="Address SuccessFully Inserted in to database")
                {
                    setMessage("Address added successfully 😊")
                }
                else if(result.message==="Address already exists, Add another address")
                {
                    setMessage("Address already exists, Add another address 😐")
                }
                else{
                    setMessage("Error while adding address 🙁, Kindly try again")
                
                }
            })
          }
          else{
              alert("Form has Errors")
          }
      }
    return (
        <div className="address__Form">
            <form name="addressForm" onSubmit={addressSubmit}>
                <div className="addressForm__row">
                <b className="addressForm__address">Add a address</b>
                </div>
                <br></br>
            <div className="addressForm__row">
          <label><b>Country/Region</b></label><br></br>
          <select name="country" onChange={changeState}>
              <option key={0} value="default">--select--</option>
            {   countryData.map((country,index)=>{
                    return <option key={index+1} value={country.id}>{country.name}</option>    
                })

              }
          </select>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.country}</span>
          </div>
          <div className="addressForm__row">
          <label><b>Full name (First and Last name)</b></label><br></br>
          <input type="text" name="name" value={data.name} onChange={handleChange}></input>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.name}</span>
          </div>
          <div className="addressForm__row">
          <label><b>Mobile number</b></label><br></br>
          <input type="text" name="mobile" value={data.mobile} onChange={handleChange}></input>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.mobile}</span>
          </div>
          <div className="addressForm__row">
          <label><b>PIN code</b></label><br></br>
          <input type="text" name="pin" value={data.pin} onChange={handleChange}></input>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.pin}</span>
          </div>
          <div className="addressForm__row">
          <label><b>Flat, House no., Building, Company, Apartment</b></label><br></br>
          <input type="text" name="flatno" value={data.flatno} onChange={handleChange}></input>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.pin}</span>
          </div>
          <div className="addressForm__row">
          <label><b>Area, Colony, Street, Sector, Village</b></label><br></br>
          <input type="text" name="area" value={data.area} onChange={handleChange}></input>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.area}</span>
          </div>
          <div className="addressForm__row">
          <label><b>State</b></label><br></br>
          <select name="state" id="state" onChange={changeCity}>
          <option key={0} value="default">--select--</option>
            {   stateData.map((state,index)=>{
                    return <option key={index+1} value={state.id}>{state.name}</option>    
                })

              }
          </select>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.state}</span>
          </div>
          <div className="addressForm__row">
          <label><b>City</b></label><br></br>
          <select name="city" id="city" onChange={changeCityName}>
          <option key={0} value="default">--select--</option>
            {   cityData.map((city,index)=>{
                    return <option key={index+1} value={city.id}>{city.name}</option>    
                })

              }
          </select>
          <br></br><span style={{color: "red"}}>{errors?.localerrors?.city}</span>
          </div>
          <button className="addressForm__button" type="submit" name="submit">Add address</button>
          <div className="addressForm__row">
              <b>{message}</b>
          </div>
          </form>
     
        </div>
    )
}

export default AddressForm
