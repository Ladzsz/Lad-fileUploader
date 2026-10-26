import '../assets/filemanager.css'
import { useState, useEffect } from "react";

function Filemanager( {loggedin} ) {
    //setting states
  const [folders, setFolders] = useState([]);
const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

//use effect tov grab items for file manager at root
  useEffect(() => {
    const fetchitems = async () => {
      setError("");
      try {
        const response = await fetch('http://localhost:3000/api/users/graball', {
            method: 'GET',
            credentials: 'include'
        })
        if (!response.ok) throw new Error("uh oh noothing in root");
        const data = await response.json();
        setFolders(data.folders);
        setFiles(data.files);
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
    };
    
    fetchitems();
  }, []);
  return (
  <div className="fileManager">
    <div className="managerlayout">
      <div className="managerTop">
        <h1>File Manager</h1>
      </div>

      <div className="managerBody">
  {loggedin ? (
     <>
    {folders.map((folder) => (
      <div className="itemcard" key={folder.id}>
        <p>{folder.name}</p>
      </div>
    ))}

    {files.map((file) => (
      <div className="itemcard" key={file.id}>
        <p>{file.name}</p>
      </div>
    ))}
  </>
  ) : (
    <div className="itemcard-footer">
      <p>Please login to see folders and files.</p>
    </div>
  )}
</div>
    </div>
  </div>
);
}

export default Filemanager;
