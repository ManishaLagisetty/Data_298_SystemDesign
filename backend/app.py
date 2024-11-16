from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io
from pydantic import BaseModel
import pandas as pd
import torch
from torchvision import transforms
from Models import CustomViTForDetection
from torchvision.transforms import functional as F
from torchvision.models.detection import ssd300_vgg16

# Initialize FastAPI app
app = FastAPI()

num_classes = 2
display = 'Severity'

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

animal_vit_model = CustomViTForDetection(num_classes=num_classes)
accident_vit_model = CustomViTForDetection(num_classes=num_classes)
construction_vit_model = CustomViTForDetection(num_classes=num_classes)

garbage_model = YOLO("best.pt", task='detect')

# Model preprocess
vit_preprocess = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
])

def ssd_preprocess(image_path):
    image = Image.open(image_path).convert("RGB")
    image_resized = F.resize(image, [300, 300])  # Resize to 300x300
    image_tensor = F.to_tensor(image_resized)  # Convert to tensor
    image_tensor = F.normalize(image_tensor, mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize
    return image_tensor.unsqueeze(0) 

# Define the response model using Pydantic for validation
class LocationData(BaseModel):
    latitude: float
    longitude: float
    zipcode: int
    severity: int

def preprocess_image(value, string):
    if value > 0.85:
        return f"High {display} {string}"
    elif value > 0.5:
        return f"Medium {display} {string}"
    return f"Low {display} {string}"

pothole_df = pd.read_csv('pothole_dash_map.csv')
pothole_data = pothole_df.to_dict(orient='records')

crack_df = pd.read_csv('crack_dash_map.csv')
crack_data = crack_df.to_dict(orient='records')

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
        image = Image.open(io.BytesIO(await file.read()))
        results = garbage_model(image)
        predictions = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                print(class_id)
                if class_id == target_class:
                    predictions.append({
                        "xmin": box.xyxy[0][0].item(),
                        "ymin": box.xyxy[0][1].item(),
                        "xmax": box.xyxy[0][2].item(),
                        "ymax": box.xyxy[0][3].item(),
                        "confidence": box.conf[0].item(),
                        "class": class_id,
                        "name": preprocess_image(box.conf[0].item(), garbage_model.names[class_id])
                    })
        return {"predictions": predictions}
    except Exception as e:
        return {"error": str(e)}

# Define a route for VIT image prediction
@app.post("/predict_vit/")
async def predict(file: UploadFile = File(...), target_class: int = Query(..., ge=0, le=6)):
    try:
        # Load models
        state_dict = torch.load("animal_vit_model_final.pt", map_location=torch.device('cpu'))
        accident_vit_model.load_state_dict(state_dict, strict=False)
        accident_vit_model.eval()

        state_dict = torch.load("accident_vit_model_final.pt", map_location=torch.device('cpu'))
        animal_vit_model.load_state_dict(state_dict, strict=False)
        animal_vit_model.eval()

        state_dict = torch.load("construction_vit_model_final.pt", map_location=torch.device('cpu'))
        construction_vit_model.load_state_dict(state_dict, strict=False)
        construction_vit_model.eval()

        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        input_tensor = vit_preprocess(image).unsqueeze(0) 
        predictions = []
        with torch.no_grad():
            bboxes, class_logits = animal_vit_model(input_tensor)
            bboxes, class_logits = construction_vit_model(input_tensor)
            bboxes, class_logits = accident_vit_model(input_tensor)
            image_size = 512
            class_names = ["class_0", "class_1", "class_2", "class_3", "class_4"]  # Replace with actual class names

            # Post-process bounding boxes
            bboxes = (bboxes + 1) / 2  # Normalize to [0, 1]
            bboxes = bboxes * image_size  # Convert to pixel coordinates

            # Post-process class logits
            probs = torch.nn.functional.softmax(class_logits, dim=-1)
            top_probs, top_classes = torch.max(probs, dim=-1)

            # Prepare predictions list
            predictions = []
            for i in range(bboxes.size(1)):  # Iterate over the number of queries
                confidence = top_probs[0, i].item()  # Confidence score of the top class
                class_id = top_classes[0, i].item()  # Class ID of the top class
                # print(i, confidence, class_id)
                if confidence > 0.8:
                    predictions.append({
                        "xmin": bboxes[0, i, 0].item(),  # x_min
                        "ymin": bboxes[0, i, 1].item(),  # y_min
                        "xmax": bboxes[0, i, 2].item(),  # x_max
                        "ymax": bboxes[0, i, 3].item(),  # y_max
                        "confidence": confidence,        # Confidence score
                        "class": class_id,               # Class ID
                        "name": class_names[class_id],   # Class name
                    })
            return {"predictions": predictions}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/predict_ssd/")
async def predict(file: UploadFile = File(...), target_class: int = Query(..., ge=0, le=6)):
    crack_ssd_model = ssd300_vgg16(pretrained=False)
    crack_ssd_model.load_state_dict(torch.load("ssd_cracks.pth", map_location=torch.device('cpu')))
    crack_ssd_model.eval()

    garbage_ssd_model = ssd300_vgg16(pretrained=False)
    garbage_ssd_model.load_state_dict(torch.load("ssd_garbage.pth", map_location=torch.device('cpu')))
    garbage_ssd_model.eval()

    pothole_ssd_model = ssd300_vgg16(pretrained=False)
    pothole_ssd_model.load_state_dict(torch.load("ssd_pothole.pth", map_location=torch.device('cpu')))
    pothole_ssd_model.eval()
    try:
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        input_tensor = vit_preprocess(image).unsqueeze(0) 
        predictions = []
        with torch.no_grad():
            bboxes, class_logits = garbage_ssd_model(input_tensor)
            bboxes, class_logits = pothole_ssd_model(input_tensor)
            bboxes, class_logits = crack_ssd_model(input_tensor)
            image_size = 512
            class_names = ["class_0", "class_1", "class_2", "class_3", "class_4"]  # Replace with actual class names

            # Post-process bounding boxes
            bboxes = (bboxes + 1) / 2  # Normalize to [0, 1]
            bboxes = bboxes * image_size  # Convert to pixel coordinates

            # Post-process class logits
            probs = torch.nn.functional.softmax(class_logits, dim=-1)
            top_probs, top_classes = torch.max(probs, dim=-1)

            # Prepare predictions list
            predictions = []
            for i in range(bboxes.size(1)):  # Iterate over the number of queries
                confidence = top_probs[0, i].item()  # Confidence score of the top class
                class_id = top_classes[0, i].item()  # Class ID of the top class
                # print(i, confidence, class_id)
                if confidence > 0.8:
                    predictions.append({
                        "xmin": bboxes[0, i, 0].item(),  # x_min
                        "ymin": bboxes[0, i, 1].item(),  # y_min
                        "xmax": bboxes[0, i, 2].item(),  # x_max
                        "ymax": bboxes[0, i, 3].item(),  # y_max
                        "confidence": confidence,        # Confidence score
                        "class": class_id,               # Class ID
                        "name": class_names[class_id],   # Class name
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
        return crack_data
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