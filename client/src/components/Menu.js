import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div id="menu-banner">
                <div className="banner-text">
                    <h1>Our Menu</h1>
                    <p>Food.Fun.Variety</p>
                    <p className="mb-5">Life's too short for boring food</p>
                </div>
        </div>
    )
}


function ProductList(){
    const [list, setList] = useState([]);

    
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios(
        'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/food/',
      );
    
    setList(result.data)
    // setList(result.data)
    };
    fetchData();
  }, []);

  const [cat,setCat] = useState([]);

  useEffect(() => {
    const fetchData1 = async() => {
      const result1 = await axios(
        'https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/category',
      );
    
      setCat(result1.data)
    };
    fetchData1();
  }, []);

  
  function searchFood(){
    // s for searc , c for category filter
    let s = document.getElementById("searchfood").value;
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
    let c = [];
    if(markedCheckbox[0] != undefined){
      for (var checkbox of markedCheckbox) {
        c.push(checkbox.value);
      }
    }
    c = c.toString();
    const url = "https://6fdhemeqha.execute-api.ca-central-1.amazonaws.com/dev/api/food/search?s="+ s +"&cat="+c;
    const fetchData2 = async() => {
      const result2 = await axios(
        url
      );

      
    console.log(result2.data.Items);
    setList(result2.data.Items)
    };
     fetchData2();
    
  }

  return (
    <div className="container-fluid pb-5 pt-5">
                
    <div className="row">
        <div className="col-md-3">
            <form className="d-flex">
                <input className="form-control me-2" id='searchfood' type="search" style={{height: "43px"}} placeholder="Search Menu Here" aria-label="Search"/>
                <button className="btn btn-red" onClick={searchFood}  type="button">Search </button>
            </form>
            <div>
            <div className="card mt-4" style={{boxShadow: "0px 0px 8px 0px #00000038", padding:"10px"}}>
                 <div className="card-header">Browse Categories</div>
                <div className="body">
                  {
                    cat.map((catItem) => {
                      return(
                        <div className="form-check pt-1" key= {catItem.id}>
                          <input className="form-check-input" onChange={searchFood} name={catItem.name} type="checkbox" value={catItem.id} id={catItem.name} />
                          <label className="form-check-label" htmlFor={catItem.name}>{catItem.name} 
                          </label>
                        </div>
                      )
                    })
                  }
                    
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-9">
        <div className="row">
                        {list != undefined &&
                            list.map( (item)=>{
                                return (
                                  
                                    <div className="col-md-3" key = {item.id}>
                                      <Link to={"/food/" + item.id}>
                                    <div className="card">
                                        <img src={item.image} className="card-img-top" alt="..."/>
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.name} </h5>
                                            <p className=" main">{"$" + item.price }</p>    
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                                
                                )
                            })
                        }

                        {list =="" && (
                          <div className="main lead pt-4 text-center">No Dishes Found</div>
                        )}
        </div>
        </div>
    </div>

</div>
  ) 

}


class Menu extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return(
      <>
      <Banner></Banner>
      <ProductList></ProductList>
      </>
  )
  }
    
}


export default Menu;
