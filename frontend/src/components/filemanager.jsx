import "../assets/filemanager.css";
import { FaFolder } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

function Filemanager({ loggedin }) {
  //setting states
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [isopen, setisopen] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    parentId: null,
  });

  //handle change func
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  //use effect tov grab items for file manager at root
  useEffect(() => {
    const fetchitems = async () => {
      setError("");
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/graball",
          {
            method: "GET",
            credentials: "include",
          },
        );
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

  //handling form submit to add folders
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          parentId: formData.parentId,
        }),
      });

      if (!response.ok) {
        throw new Error("folder creation failed");
      }

      const newFolder = await response.json();

      setFolders((prev) => [...prev, newFolder]);
      setformData({ name: "", parentId: null });
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="fileManager">
      <div className="managerlayout">
        <div className="managerTop">
          <h1>File Manager</h1>
          <button
            title="add folder"
            onClick={() => setisopen(!isopen)}
            className="addfolderBtn"
          >
            <FaFolderPlus size={40} />
          </button>
          {isopen && (
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="folderDropdown"
            >
              <div className="inputcontainer">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength="30"
                />
              </div>
              <button type="submit">create</button>
            </form>
          )}
        </div>

        <div className="managerBody">
          {loggedin ? (
            <>
              {folders.map((folder) => (
                <div className="itemcard" key={folder.id}>
                  <p>
                    <span>
                      <FaFolder />
                    </span>
                    {folder.name}
                  </p>
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
