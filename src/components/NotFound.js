import React from "react";
const notFoud =require('../img/not-found.jpg')
const NotFound = () => {
  return (
    <div>
    
      <img style={{width:"70%",height:"600px",marginLeft:"15%"}} src={notFoud} alt="Not found"/>
    </div>
  );
};

export default NotFound;
