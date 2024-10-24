from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

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

# Define a route for prediction
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
