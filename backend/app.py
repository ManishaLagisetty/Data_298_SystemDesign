from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
from pydantic import BaseModel
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-built YOLOv8 model (e.g., 'yolov8s.pt')
model = YOLO('yolov8s.pt')  # This will automatically download the model if not available locally

# Define the response model using Pydantic for validation
class LocationData(BaseModel):
    latitude: float
    longitude: float
    zipcode: int
    severity: int

pothole_df = pd.read_csv('pothole_data.csv')
pothole_data = pothole_df.to_dict(orient='records')

illegal_dumping_df = pd.read_csv('illegal_dumping_data.csv')
illegal_dumping_data = illegal_dumping_df.to_dict(orient='records')


# Define a route for image prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the image file
        image = Image.open(io.BytesIO(await file.read()))

        # Run inference using YOLOv8 model
        results = model(image)

        # Filter out predictions to include only cars (class ID might differ)
        # For COCO dataset, 'car' typically corresponds to class ID 2. Adjust if needed.
        car_class_id = 2  # Adjust this ID based on your model's label mapping
        car_predictions = []

        # Extract predictions related to cars
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                if class_id == car_class_id:
                    car_predictions.append({
                        "xmin": box.xyxy[0][0].item(),
                        "ymin": box.xyxy[0][1].item(),
                        "xmax": box.xyxy[0][2].item(),
                        "ymax": box.xyxy[0][3].item(),
                        "confidence": box.conf[0].item(),
                        "class": class_id,
                        "name": model.names[class_id]  # Get the class name using the model's labels
                    })

        # Return predictions related to cars in JSON format
        return {"predictions": car_predictions}

    except Exception as e:
        return {"error": str(e)}

@app.get("/map_data/pothole/", response_model=list[LocationData])
def get_map_data():
    try:
        return pothole_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/illegal_dumping/", response_model=list[LocationData])
def get_map_data():
    try:
        return illegal_dumping_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/crack/", response_model=list[LocationData])
def get_map_data():
    try:
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/map_data/car_accident/", response_model=list[LocationData])
def get_map_data():
    try:
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/wildlife/", response_model=list[LocationData])
def get_map_data():
    try:
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/construction/", response_model=list[LocationData])
def get_map_data():
    try:
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))