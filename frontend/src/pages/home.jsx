import React from "react";
import "../assets/home.css";
import Filemanager from "../components/filemanager";

function Homepage( {loggedin} ) {
  return (
    <div className="homepage">
      <div className="homeTop">
          <h1>Welcome to the File Uploader</h1>
      <p>Upload your files easily and securely. <br />
      View your folders and files below!</p>
      </div>
      
      <Filemanager loggedin={loggedin}/>
    </div>
  );
}

export default Homepage;
