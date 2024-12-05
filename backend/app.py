from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for React frontend

# Load model and scaler
def load_model_and_scaler():
    with open('phishing_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    with open('scaler.pkl', 'rb') as scaler_file:
        scaler = pickle.load(scaler_file)
    return model, scaler

# Extract features from the URL
def extract_features(url):
    features = []
    features.append(len(url))  # Length of URL
    features.append(url.count('.'))  # Number of dots
    features.append(url.count('-'))  # Number of hyphens
    features.append(url.count('@'))  # Number of '@' symbols
    features.append(url.count('/'))  # Number of slashes
    features.append(sum(c.isdigit() for c in url))  # Number of digits
    features.append(sum(c.isdigit() for c in url) / len(url) if len(url) > 0 else 0)  # Ratio of digits in URL
    
    while len(features) < 23:
        features.append(0)
    return features

# Prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get JSON data from the frontend
    url = data['url']  # Get the URL from the data
    
    # Load model and scaler
    model, scaler = load_model_and_scaler()
    
    # Extract features from the URL
    features = extract_features(url)
    features = np.array([features])
    
    # Scale the features
    features_scaled = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features_scaled)
    
    # Return the result
    if prediction == 1:
        return jsonify({'result': 'Phishing'})
    else:
        return jsonify({'result': 'Legitimate'})

if __name__ == '__main__':
    app.run(debug=True)
