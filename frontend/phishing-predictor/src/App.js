import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hello

    try {
      // Send the URL to the Flask backend for prediction
      const response = await axios.post("http://localhost:5000/predict", {
        url: url,
      });

      // Set the prediction result
      setResult(response.data.result);
    } catch (error) {
      console.error("Error making prediction:", error);
      setResult("Error predicting the URL");
    }
    console.log("Sending URL:", url);
    const response = await axios.post("http://localhost:5000/predict", {
      url: url,
    });
    console.log("Response from backend:", response);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Phishing URL Detector</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Check URL
          </button>
        </form>

        {result && (
          <div style={styles.resultContainer}>
            <h2>Prediction Result: {result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles for centering
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  },
  formContainer: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  resultContainer: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#555",
  },
};

export default App;
