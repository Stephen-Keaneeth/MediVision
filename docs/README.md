# MediVision AI - Project Documentation

This directory contains developer guides, design specifications, and architecture references for MediVision AI.

---

## 📁 Document Index

* **Root Documentation**:
  * [README.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/README.md) — Comprehensive quick-start setup guide, project architecture workflow, environment variables configurations, and deep learning ResNet-18 training scripts usage.
* **Component References**:
  * [backend/README.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/backend/README.md) — FastAPI API endpoints list, AI model inference details (TorchXRayVision DenseNet-121, pytorch-grad-cam), EasyOCR parsing rules, and run instructions.
  * [frontend/README.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/frontend/README.md) — React Single Page Application layouts, components hierarchy directory, Vite script runner configurations, and port settings.
  * [ai/xray/README.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/ai/xray/README.md) — ResNet-18 model classifier layout, dataset image folder format guidelines, training command-line flags, testing scripts, and model metrics evaluation.
  * [models/README.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/models/README.md) — Information about pre-trained checkpoint loading (.pth weight state dicts) and Git version-control policy.
* **Prototyping Plans**:
  * [plan.md](file:///d:/My%20Coding%20Environment/Projects/MediVision/medivision-ai/plan.md) — Original 24-hour hackathon project roadmap, MVP features scope, design choices, and color palette tokens.

---

## 🗺️ Visual Architecture Diagram

Below is the layout of the directory structure mappings:

```text
medivision-ai/
  ├── ai/                     # AI classification & preprocessing scripts
  ├── backend/                # FastAPI Gateway API Server
  ├── frontend/               # React Vite client interface
  ├── docs/                   # Developer documentation and references (This folder)
  ├── models/                 # Neural network model checkpoints (.pth weights)
  └── data/                   # Dataset local folders placeholder
```

---

## ⚙️ How to contribute to Docs

1. Write guides using **GitHub-Flavored Markdown**.
2. For system diagrams, embed **Mermaid** blocks or reference SVG/PNG attachments saved under `docs/assets/`.
3. Keep descriptions up to date with any newly added REST endpoint routes or visual widgets.
