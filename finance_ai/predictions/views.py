import os
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Load Models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
lstm_model = tf.keras.models.load_model(os.path.join(BASE_DIR, "predictions/models/lstm_model.h5"))
arima_model = joblib.load(os.path.join(BASE_DIR, "predictions/models/arima_model.pkl"))

@api_view(["GET"])
def predict_stock(request):
    stock = request.GET.get("stock", "AAPL")  # Get stock symbol from request

    # Sample input data (Modify this to match your actual model input)
    dummy_data = np.array([[100, 101, 102, 103, 104]])  # Replace with real stock data

    # LSTM Prediction
    lstm_pred = lstm_model.predict(dummy_data.reshape(1, 5, 1))
    lstm_pred = float(lstm_pred[0][0])

    # ARIMA Prediction
    arima_pred = arima_model.forecast(steps=1)[0]

    return JsonResponse({
        "stock": stock,
        "lstm_prediction": round(lstm_pred, 2),
        "arima_prediction": round(arima_pred, 2)
    })