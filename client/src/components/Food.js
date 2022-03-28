import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet , useParams  } from 'react-router-dom';

function FoodItem() {
    const [item, setItem] = useState([]);
    const {id}  = useParams();
    useEffect(() => {
    const fetchData = async() => {
        
      const result = await axios(
        'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/food/' + id,
      );
    
     setItem(result.data);
    };
    fetchData();
  }, []);
console.log(item);

    return (
        <>
            <div id="menu-banner">
                <div className="banner-text">
                    <h1>{item.name}</h1>
                    <p>Food.Fun.Variety</p>
                    <p className="mb-5">Life's too short for boring food</p>
                </div>
            </div>
            <div className="container pt-5 pb-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={"../images/" + item.image} alt={item.image}/>
                    </div>    
                    <div className="col-md-6">
                        <h2>{item.name}</h2>
                        <hr></hr>
                        <p style={{fontSize: "1.5rem"}}> ${item.price}</p>
                        <p className="lead">
                            {item.description}
                        </p>
                        <button className="btn btn-red">Add to Cart</button>                            
                        <hr/>
                        <p className="lead">Category : {item.category != undefined && item.category.name}</p>
                        <p className="lead">Rating : {item.rating} </p>
                    </div>
                    
                </div>
            </div>
        </>
        
    )
 

}


function Food() {
    return(
        <>
        <FoodItem></FoodItem>
        </>
    )
}

export default Food;