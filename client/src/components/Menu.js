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

  
  function searchFood(){
    let name = document.getElementById("searchfood").value;
    
    // let data1 = [];
    // const pattern = new RegExp(name.toLowerCase());
    // console.log(pattern);
    // list.filter((listitem) => {
    //   console.log(listitem);
    //   let a = pattern.test(listitem.name.toLowerCase());
    //   console.log(a);
    //   if(a == true){
    //     data1.push(listitem);
    //   }
    // });
    // if(name != "" && data1 != ""){
    //   setList(data1)
    // }

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
                    <div className="form-check pt-1">
                      <input className="form-check-input" name="Categories" type="checkbox" value="" id="chinese" />
                      <label className="form-check-label" htmlFor="Chinese">Mexican 
                      </label>
                    </div>
                    <div className="form-check pt-1">
                      <input className="form-check-input" name="Categories1" type="checkbox" value="" id="Indian" />
                      <label className="form-check-label" htmlFor="Indian">Gujarati Thali
                      </label>
                  </div >
                  <div className="form-check pt-1">
                      <input className="form-check-input" name="Categories2" type="checkbox" value="" id="Rice" />
                      <label className="form-check-label" htmlFor="rice">Rice
                      </label>
                    </div>
                    <div className="form-check pt-1">
                      <input className="form-check-input" name="Categories2" type="checkbox" value="" id="Italian" />
                      <label className="form-check-label" htmlFor="Italian">Curries
                      </label>
                    </div>
                    <div className="form-check pt-1">
                      <input className="form-check-input" name="Categories2" type="checkbox" value="" id="Chinese" />
                      <label className="form-check-label" htmlFor="Chinese">Chinese
                      </label>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="col-md-9">
        <div className="row">
                        {
                            list.map( (item)=>{
                                return (
                                  
                                    <div className="col-md-3" key = {item.id}>
                                      <Link to={"/food/" + item.id}>
                                    <div className="card">
                                        <img src={'images/' + item.image} className="card-img-top" alt="..."/>
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
        </div>
    <nav aria-label="Page navigation" >
      <ul  className="text-center main pagination">
        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
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
