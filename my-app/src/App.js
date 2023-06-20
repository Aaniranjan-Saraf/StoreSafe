import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, ListGroup } from "react-bootstrap";
import axios from "axios";
import "./App.css"; // Import the custom CSS file

function App() {
  const site = "https://timeo.serveo.net";
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(`${site}/upload`, formData)
        .then((res) => {
          console.log(res.data);
          setUploadStatus("success");
          fetchFileList(); // Update the file list after successful upload
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response);
          setUploadStatus("error");
        });
    }
  };

  const fetchFileList = () => {
    axios
      .get(`${site}/files`)
      .then((res) => {
        console.log(res.data);
        setFileList(res.data.files);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDownload = (fileName) => {
    window.open(`${site}/download/${fileName}`, "_blank");
  };

  const handleRemove = (fileName) => {
    axios
      .delete(`${site}/remove/${fileName}`)
      .then((res) => {
        console.log(res.data);
        fetchFileList(); // Update the file list after successful removal
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="heading">StoreSafe</h1>
      {uploadStatus === "success" && (
        <Alert
          variant="success"
          onClose={() => setUploadStatus(null)}
          dismissible
        >
          File uploaded successfully.
        </Alert>
      )}
      {uploadStatus === "error" && (
        <Alert
          variant="danger"
          onClose={() => setUploadStatus(null)}
          dismissible
        >
          Error uploading file. Please try again.
        </Alert>
      )}
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select a file</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group>
          <Button
            className="d-flex justify-content-start"
            variant="outline-dark"
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Form.Group>
      </Form>

      <h2 className="heading">Files</h2>
      {fileList.length > 0 ? (
        <ListGroup>
          {fileList.map((fileName, index) => (
            <ListGroup.Item key={index} className="file-item">
              <div className="file-name">{fileName}</div>
              <div className="button-container">
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleDownload(fileName)}
                >
                  Download
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemove(fileName)}
                >
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div className="no-files">No files uploaded.</div>
      )}
    </Container>
  );
}

export default App;
