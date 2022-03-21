import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/carousel';
import './main.css';


function Banner(){
    return (
        
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="images/home-banner.png" className="d-block w-100" alt="..."/>
              <div className="banner-text">
                    <h1>Cuisine De Palace</h1>
                    <p>Get home cooked meal at your door step. Just one click away!!</p>     
                    <a href="#" className="btn btn-red">Contact Now</a>
                </div>
            </div>


            <div className="carousel-item">
              <img src="images/home-banner.png" className="d-block w-100" alt="..."/>
            </div>
            
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
    </div>
    )
  }

  function LatestProduct() {
    return (
        <div className="container-fluid mb-5">
                <div className="container mb-1">
                    <div className="text-center pb-5 mt-5">
                        <h2 className="underline">Latest Product</h2>   
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <img src="images/sizzler.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Mexican Sizzler </h5>
                                    <p className=" main">$15 </p>    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img src="images/strawberry.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Mexican Sizzler </h5>
                                    <p className=" main">$15 </p>    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img src="images/lasagna.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Mexican Sizzler </h5>
                                    <p className=" main">$15 </p>    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card">
                                <img src="images/sizzler.png" className="card-img-top" alt="..."/>
                                <div className="card-body text-center">
                                    <h5 className="card-title">Mexican Sizzler </h5>
                                    <p className=" main">$15 </p>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center ">
                        <a href="" className="main lead">Browse All 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </a>    
                    </div>
                </div>
            </div>
    )
  }

  function Categories() {
      return(
        <div className="container-fluid bg-main2 pt-5 pb-3" style={{padding: 0}}>
        <div className="text-center pb-5">
                <h2 className="underline">Explore Category</h2>   
        </div>
        <div className="card-group pb-5">
          <div className="card hover-img">
            <img src="images/lasagna.png" className="card-img-top img-ver2" alt="..."/>
            <div className="hover-text">
                <div className="text">
                    <p>Paneer Shaslik Sizzler</p>
                </div>
            </div>
          </div>
          <div className="card hover-img">
            <img src="images/strawberry.png" className="card-img-top img-ver2" alt="..."/>
            <div className="hover-text">
                <div className="text">
                    <p>Paneer Shaslik Sizzler</p>
                </div>
            </div>
          </div>
          <div className="card hover-img">
            <img src="images/sizzler.png" className="card-img-top img-ver2" alt="..."/>
            <div className="hover-text">
                <div className="text">
                    <p>Paneer Shaslik Sizzler</p>
                </div>
            </div>
          </div>
          <div className="card hover-img">
            <img src="images/lasagna.png" className="card-img-top img-ver2" alt="..."/>
            <div className="hover-text">
                <div className="text">
                    <p>Paneer Shaslik Sizzler</p>
                </div>
            </div>
          </div>
        </div>
    </div>
      )
  }

  function Newsletter() {
      return(
        <div className="container-fluid" style={{backgroundColor: "rgb(180 128 13)"}}>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4 py-4 py-md-5 aside-stretch d-flex align-items-center">
                    <div className="w-100">
                        <span className="subheading">Subscribe to our</span>
                        <h3 className="heading-section">Newsletter</h3>
                    </div>
                </div>
                <div className="col-md-8 py-4 py-md-5 d-flex align-items-center pl-md-5">
                <form action="#" className="subscribe-form w-100">
                <div className="form-group d-flex">
                    <input type="text" className="form-control rounded-left" placeholder="Enter email address"/>
                    <button type="submit" className="form-control submit"><span>Submit</span></button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>
      )
  }

  function Homepage() {
      return(
          <>
          <Banner></Banner>
          <LatestProduct></LatestProduct>
          <Categories></Categories>
          <Newsletter></Newsletter>
          </>
      )
  }
  
  
  export default Homepage;
  