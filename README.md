# 🏥 MediVision AI

## Medical Screening and Patient Guidance Platform
### AI-Powered Medical Document and Image Understanding System

> **Hackathon:** LaunchPadX  
> **Academic Year:** 2026  
> **Team Name:** HackStorm

---

## 👥 Team Members

* **N. Stephen Keaneeth** (HackStorm)
* **P. Chandra Teja** (HackStorm)
* **S. Tarun** (HackStorm)
* **M. Varshitha** (HackStorm)
* **G. Meena** (HackStorm)

---

## 📌 Overview

**MediVision AI** is an AI-powered medical document understanding and patient guidance platform designed to make complex healthcare information easier to understand for patients and caregivers.

The platform provides a unified, accessible, and responsive web interface for interpreting:
* 🩻 **X-Ray Images**: Visual detection of abnormalities (such as Pneumonia) with neural network saliency heatmaps (Grad-CAM).
* 💊 **Medical Prescriptions**: Extracting drug names, dosages, timings, frequencies, and translation of Latin medical abbreviations (e.g. *b.i.d.*, *p.c.*) into patient-friendly instructions.
* 🧾 **Hospital and Medical Bills**: Auditing procedures, summarizing charges, and flagging high/aberrant bills to protect patients from billing errors.

---

## ⚠️ Medical Safety Disclaimer

> [!IMPORTANT]
> **AI-generated information is for educational guidance only and is not a medical diagnosis, prescription, or treatment recommendation. Always consult a qualified healthcare professional.**
>
> MediVision AI is designed to help users **understand medical documents**, not to replace clinical judgment or make independent medical decisions.

---

## 💡 System Architecture & Workflow

The platform bridges frontend interfaces with backend AI inference pipelines:

```text
                  Medical Image / Document Upload
                                │
                                ▼
                       FastAPI API Gateway
                                │
        ┌───────────────────────┼────────────────────────┐
        │ (X-Ray Module)        │ (Prescription Module)  │ (Billing Module)
        ▼                       ▼                        ▼
TorchXRayVision DenseNet     EasyOCR Text Reader       EasyOCR Text Reader
   & Grad-CAM Heatmap           │                        │
        │                       ▼                        ▼
        │              Latin Abbreviation Map    Charge Auditing Heuristic
        │                       │                        │
        └───────────────────────┼────────────────────────┘
                                ▼
                   Patient-Friendly Visualizer
```

1. **Frontend (React + Vite)**: A modular user interface implementing a drag-and-drop file uploader, interactive step processing state, and separate visual results dashboards tailored for X-rays, prescriptions, and bills.
2. **Backend (FastAPI)**: An API server that handles uploaded files, coordinates visual understanding pipelines, caches history, and structures JSON outputs.
3. **AI Core**:
   * **X-Ray Pathology Detection**: Uses a pre-trained **TorchXRayVision DenseNet** model to calculate pathology scores (detecting indicators like Pneumonia, Infiltration, and Consolidation).
   * **Grad-CAM Saliency Maps**: Generates an overlay heatmap highlighting the spatial activation area responsible for the highest-scoring pathology.
   * **OCR Core**: Uses **EasyOCR** for reading handwriting and print from prescriptions and hospital bills.

---

## 📁 Repository Structure

```text
medivision-ai/
├── ai/                      # AI training, inference, and preprocessing
│   ├── preprocessing/       # Shared image transformations
│   │   └── transforms.py    # Preprocessing Compose pipelines for CV
│   └── xray/                # Independent ResNet-18 model training scripts
│       ├── model.py         # ResNet-18 architecture definition
│       ├── dataset.py       # Custom dataset loader wrapper
│       ├── train.py         # Local model fine-tuning loop
│       ├── evaluate.py      # Classifier evaluation split metrics
│       └── predict.py       # Command-line image predictor
├── backend/                 # FastAPI REST API implementation
│   ├── main.py              # Main app entrypoint, endpoints, and OCR/DL inference
│   └── test_groq_api.py     # Groq API check tool
├── frontend/                # React / TypeScript client app
│   ├── src/                 # Codebase including pages, types, components
│   │   ├── components/      # UI components (Header, Disclaimer, Stepper, etc.)
│   │   ├── pages/           # Pages (Home, Upload, Results, History, Settings)
│   │   └── services/        # Service requests and API connections
│   ├── package.json         # Frontend configuration and script runners
│   └── Dockerfile           # Frontend image configuration
├── data/                    # Local training data folder placeholder
├── models/                  # Holds fine-tuned model checkpoints (e.g. resnet18_xray_best.pth)
├── Dockerfile               # Backend docker image config
├── docker-compose.yml       # Complete multi-container orchestration
├── requirements.txt         # Python backend dependencies
├── start.bat                # Windows startup batch script
└── start.sh                 # Linux/macOS startup bash script
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` in the root directory:
```bash
cp .env.example .env
```

Define the following variable if you wish to run LLM verification scripts:
* `GROQ_API_KEY`: API key used to test Groq integrations.

For the frontend, environment configurations can be set in `frontend/.env.local` or injected via Docker:
* `VITE_API_URL`: Points the frontend to the backend server.
  * Defaults to `http://localhost:8001` for Windows scripts and Docker Compose.
  * Defaults to `http://localhost:8000` when running backend directly or via `start.sh`.

---

## 🚀 Getting Started

### Method 1: Using Startup Scripts (Simplest)

#### On Windows (PowerShell/CMD):
Run the batch script from the project root:
```cmd
start.bat
```
* Binds the Backend to: `http://localhost:8001`
* Binds the Frontend to: `http://localhost:5173`

#### On Linux / macOS:
Make the script executable and run:
```bash
chmod +x start.sh
./start.sh
```
* Binds the Backend to: `http://localhost:8000`
* Binds the Frontend to: `http://localhost:5173`

---

### Method 2: Manual Setup

#### 1. Backend Setup
1. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   python backend/main.py
   ```
   The backend will start listening on `http://localhost:8000`.

#### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`. Make sure the backend port in `frontend/.env.local` matches the running server.

---

### Method 3: Using Docker Compose (Containerized)

To build and launch the frontend and backend in isolated containers:
```bash
docker compose up --build
```
* **Frontend**: Accessible at `http://localhost:5173`
* **Backend**: Accessible at `http://localhost:8001` (container runs on `8000` mapped to host `8001`)

---

## 📊 Deep Learning Model Training & Command-Line Usage

The repository includes a secondary modular pipeline inside `ai/` to fine-tune a standard **ResNet-18** model on custom dataset splits.

### 1. Dataset Directory Format
Organize your dataset under `data/xray/`:
```text
data/xray/
├── train/
│   ├── Normal/
│   └── Pneumonia/
├── val/
│   ├── Normal/
│   └── Pneumonia/
└── test/
    ├── Normal/
    └── Pneumonia/
```

### 2. Training
Fine-tune the model (saves the best weights checkpoint to `models/resnet18_xray_best.pth`):
```bash
python -m ai.xray.train --dataset data/xray --epochs 10 --batch-size 32
```

### 3. Evaluation
Report accuracy, precision, recall, and F1 score against the test partition:
```bash
python -m ai.xray.evaluate --dataset data/xray --checkpoint models/resnet18_xray_best.pth
```

### 4. Direct CLI Inference
Predict the class label and confidence score of a single X-ray image file:
```bash
python -m ai.xray.predict path/to/xray_image.jpg --checkpoint models/resnet18_xray_best.pth
```
