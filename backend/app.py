from fastapi import FastAPI, File, UploadFile, HTTPException, Query
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

yolo_class_dict = {0: 'pothole', 1: 'crack', 2: 'crash', 3: '-', 4: 'animal', 5: 'construction', 6: 'garbage'}
garbage_model = YOLO('yolov8_trained_model_finaled.pt', task='detect')

# Define the response model using Pydantic for validation
class LocationData(BaseModel):
    latitude: float
    longitude: float
    zipcode: int
    severity: int

pothole_df = pd.read_csv('pothole_dash_map.csv')
pothole_data = pothole_df.to_dict(orient='records')

vehicle_df = pd.read_csv('vehicle_dash_map.csv')
vehicle_data = vehicle_df.to_dict(orient='records')

construction_df = pd.read_csv('construction_dash_map.csv')
construction_data = construction_df.to_dict(orient='records')

animal_df = pd.read_csv('animal_dash_map.csv')
animal_data = animal_df.to_dict(orient='records')

illegal_dumping_df = pd.read_csv('illegal_dumping_data.csv')
illegal_dumping_data = illegal_dumping_df.to_dict(orient='records')


# Define a route for image prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...), target_class: int = Query(..., ge=0, le=6)):
    try:
        # Read the image file
        image = Image.open(io.BytesIO(await file.read()))
        
        results = garbage_model(image)
        predictions = []

        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                if class_id == target_class:
                    predictions.append({
                        "xmin": box.xyxy[0][0].item(),
                        "ymin": box.xyxy[0][1].item(),
                        "xmax": box.xyxy[0][2].item(),
                        "ymax": box.xyxy[0][3].item(),
                        "confidence": box.conf[0].item(),
                        "class": class_id,
                        "name": garbage_model.names[class_id]
                    })
        return {"predictions": predictions}

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
        return pothole_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/map_data/car_accident/", response_model=list[LocationData])
def get_map_data():
    try:
        return vehicle_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/wildlife/", response_model=list[LocationData])
def get_map_data():
    try:
        return animal_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/map_data/construction/", response_model=list[LocationData])
def get_map_data():
    try:
        return construction_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))