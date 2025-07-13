from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/potencia-horaria")
def potencia(lat: float, lon: float, kwp: float):
    # Lógica de cálculo aquí
    return {"kwh": 1342}
