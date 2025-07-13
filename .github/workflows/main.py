from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(root_path="/api")  # para proxy inverso

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

@app.get("/potencia-horaria")
def potencia(lat: float, lon: float, kwp: float):
    # Aquí llamarías a pvlib o tu modelo
    return {"kwh": 1342}

app.mount("/", StaticFiles(directory="dist", html=True), name="static")
