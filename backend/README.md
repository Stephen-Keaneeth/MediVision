# MediVision AI - Backend Service

This is the API server and AI processing backend for **MediVision AI**, built using FastAPI and PyTorch.

---

## 🛠️ Tech Stack & Libraries

* **Core Framework**: [FastAPI](https://fastapi.tiangolo.com/) (high-performance asynchronous Python web framework)
* **Server Runner**: [Uvicorn](https://www.uvicorn.org/) (ASGI web server) & [Gunicorn](https://gunicorn.org/) (production process manager)
* **Deep Learning Core**: [PyTorch](https://pytorch.org/) & [TorchVision](https://pytorch.org/vision/stable/index.html)
* **X-Ray Analysis Model**: [TorchXRayVision](https://github.com/mlmed/torchxrayvision) (pre-trained DenseNet-121 model fine-tuned on multiple public medical chest X-ray datasets)
* **Saliency Interpretation**: [pytorch-grad-cam](https://github.com/jacobgil/pytorch-grad-cam) (saliency heatmap extraction tool)
* **OCR engine**: [EasyOCR](https://github.com/JaidedAI/EasyOCR) (handwriting and print OCR engine using PyTorch)
* **Utilities**: `pillow` (image handling), `numpy` (array processing), `opencv-python-headless` (visual rendering), `python-dotenv` (configuration loader).

---

## 🚀 Key Modules & Internals

### 1. X-Ray Image Understanding
* **Pathology Classification**: 
  The FastAPI endpoint loads a `DenseNet` model from `torchxrayvision` (weights: `densenet121-res224-all`). It normalizes the chest X-ray and runs forward inference to generate score probabilities across 18 common chest pathologies (e.g. Pneumonia, Infiltration, Pleural Effusion, Atelectasis).
* **Grad-CAM Visualization**: 
  It extracts the activations from the final feature convolutional layer of the DenseNet (`model.features[-1]`) targeted on the highest scoring infection marker. It then overlays a colorized saliency heatmap representing where the model was looking, converting this map to a Base64-encoded JPEG to be rendered in the frontend.

### 2. Prescription Understanding (OCR & Parsing)
* Runs EasyOCR text detection on prescription images.
* Parses extracted words against list dictionaries of common medicines (e.g. Paracetamol, Amoxicillin, Pantoprazole, Omeprazole).
* Translates Latin medical shorthand patterns like:
  * `b.i.d.` -> Twice daily (approx. 12 hours apart)
  * `t.i.d.` -> Three times a day (approx. 8 hours apart)
  * `q.d.` -> Take once every day
  * `p.c.` -> Take after meals
  * `a.c.` -> Take before meals
* Formulates a structured medication schedule (Morning, Afternoon, Night) based on timings found, along with safety guidelines.

### 3. Billing & Hospital Charge Parsing
* Extracts tabular numeric charge entries, currency amounts, and service names from invoice/bill photos using EasyOCR.
* Sums total and categorized procedure charges, pharmacy/medication charges, laboratory fees, and consultation costs.
* Triggers auditing flags (e.g. warning if procedures exceed a threshold ₹4,000 limit, or notifying the patient to verify itemized billing summaries with hospital desks).

---

## 🔌 API Endpoints Reference

### 1. Health Check
* **Route**: `GET /health`
* **Response**: `{"status": "healthy"}`

### 2. X-Ray Screening
* **Route**: `POST /api/analyze/xray`
* **Request**: Multipart Form Data
  * `file`: `UploadFile` (Chest X-ray image)
* **Response**:
  ```json
  {
    "id": "xr-...",
    "documentType": "xray",
    "prediction": "PNEUMONIA" | "NORMAL",
    "confidence": 0.895,
    "abnormalityLocation": "Left & Right Lung Fields",
    "heatmapImage": "data:image/jpeg;base64,...",
    "pathologies": {
      "Pneumonia": 0.895,
      "Lung Opacity": 0.74,
      ...
    },
    "timestamp": "Aug 23, 2026, 03:44 PM"
  }
  ```

### 3. Prescription Understanding
* **Route**: `POST /api/analyze/prescription`
* **Request**: Multipart Form Data
  * `file`: `UploadFile` (Prescription photo)
* **Response**:
  ```json
  {
    "id": "rx-...",
    "documentType": "prescription",
    "patientName": "Patient",
    "doctorName": "Dr. Aris Thorne",
    "clinicName": "Metro Health Care Clinic",
    "date": "Aug 23, 2026",
    "medicines": [
      {
        "id": "med-...",
        "name": "Paracetamol",
        "purpose": "Pain relief & fever reduction",
        "dosage": "500 mg",
        "frequency": "Twice daily (b.i.d.)",
        "duration": "5 days",
        "timing": ["Morning", "Night"],
        "instructions": "Take 500 mg after meals."
      }
    ],
    "scheduleHighlights": [
      {
        "timeOfDay": "Morning (8:00 AM)",
        "medicinesToTake": ["Paracetamol (500 mg)"],
        "note": "Take with breakfast."
      }
    ],
    "safetyWarning": "Never adjust dosages or stop antibiotics early without consulting your doctor.",
    "timestamp": "Aug 23, 2026, 03:44 PM"
  }
  ```

### 4. Billing Analysis
* **Route**: `POST /api/analyze/bill`
* **Request**: Multipart Form Data
  * `file`: `UploadFile` (Bill image)
* **Response**:
  ```json
  {
    "id": "bill-...",
    "documentType": "bill",
    "institutionName": "City General Hospital",
    "totalAmount": 12500.0,
    "date": "Aug 23, 2026",
    "items": [
      {
        "name": "Consultation",
        "amount": 500.0,
        "category": "Consultation"
      }
    ],
    "categorizedTotals": {
      "Consultation": 500.0
    },
    "billingAlerts": [
      "Total amount matches itemized summary sum.",
      "Please verify this item with the hospital billing desk."
    ],
    "timestamp": "Aug 23, 2026, 03:44 PM"
  }
  ```

---

## 🏃 Run Backend Independently

Ensure you have created and activated the virtual environment and installed `requirements.txt`.

Start the development server with hot-reloading:
```bash
python backend/main.py
```
By default, the backend will listen on **`http://localhost:8000`**.

If you wish to run on a custom port (e.g. `8001`), you can set it directly in the uvicorn call or run via uvicorn CLI:
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8001 --reload
```
