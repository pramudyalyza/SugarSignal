import pickle
from fastapi import APIRouter
from schemas import InputData, PredictionResponse

router = APIRouter()

def predict(input_data: InputData):

    features = [
        input_data.Pregnancies,
        input_data.Glucose,
        input_data.BloodPressure,
        input_data.SkinThickness,
        input_data.Insulin,
        input_data.BMI,
        input_data.DiabetesPedigreeFunction,
        input_data.Age
    ]
    prediction = model.predict([features])
    
    return PredictionResponse(prediction=int(prediction[0]))

model = pickle.load(open('diabetes_model.sav', 'rb'))

@router.post("", response_model=PredictionResponse)
def make_prediction(input_data: InputData):
    return predict(input_data)
