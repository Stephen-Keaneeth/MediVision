# 🏥 MediVision AI

## Medical Screening and Patient Guidance

### AI-Powered Medical Document and Image Understanding System

> **Hackathon:** LaunchPadX  
> **Academic Year:** 2026  
> **Team Name:** HackStorm

---

## 👥 Team Members

- N. Stephen Keaneeth
- P. Chandra Teja
- S. Tarun
- M. Varshitha
- G. Meena

---

# 📌 Overview

**MediVision AI** is an AI-powered medical document understanding and patient guidance platform designed to make complex healthcare information easier to understand.

The platform provides a unified, accessible, and responsive web interface for understanding:

- 🩻 X-Ray images
- 💊 Medical prescriptions
- 🧾 Hospital and medical bills

MediVision AI combines modern web technologies with AI-oriented document processing concepts such as **Computer Vision, OCR, Natural Language Processing, information extraction, and AI-generated summaries**.

The frontend is built using a modular architecture so that the current mock AI services can later be replaced with real backend and AI APIs without requiring major changes to the user interface.

> **MediVision AI is an educational guidance platform. It does not replace doctors, radiologists, pharmacists, or other qualified healthcare professionals.**

---

# ⚠️ Medical Safety Disclaimer

> **AI-generated information is for educational guidance only and is not a medical diagnosis, prescription, or treatment recommendation. Consult a qualified healthcare professional.**

This disclaimer is prominently displayed across medical analysis result pages and relevant modals.

MediVision AI is designed to help users **understand medical information**, not to make independent medical decisions.

Users should consult qualified healthcare professionals for:

- Diagnosis
- Treatment decisions
- Medication decisions
- Medical image interpretation
- Medical report interpretation
- Urgent or concerning symptoms

---

# 🎯 Problem Statement

Healthcare information can often be difficult for patients and caregivers to understand.

X-ray reports, prescriptions, medication instructions, and hospital bills may contain:

- Complex medical terminology
- Medicine abbreviations
- Dosage and frequency instructions
- Medical procedures
- Laboratory tests
- Multiple billing categories
- Technical descriptions
- Difficult-to-read documents

Patients may struggle to answer questions such as:

- What does my X-ray indicate?
- What medicines have been prescribed?
- How should I understand my prescription?
- What is the total amount mentioned in my medical bill?
- What medicines or services are included in the bill?
- What does a particular medical term mean?

This creates an **information gap between healthcare professionals and patients**.

---

# 💡 Proposed Solution

MediVision AI provides a unified platform where users can upload medical images and documents and receive structured, patient-friendly information.

The platform consists of three primary modules:

```text
                    MediVision AI
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      X-Ray          Prescription      Medical
     Screening       Understanding       Bills
          │              │              │
          ▼              ▼              ▼
    Image Analysis       OCR          OCR + AI
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                 Patient-Friendly
                     Summary
Medicine       Dosage       Frequency       Duration
----------------------------------------------------
Paracetamol    500 mg       Twice daily     5 days
Morning
Afternoon
Night
Before Food
After Food
b.i.d.  → Twice daily
p.c.    → After meals
Medical Bill Summary
--------------------------------
Total Amount       ₹12,500
Medicines          ₹3,200
Tests              ₹4,300
Procedures         ₹5,000
Please verify this item with the hospital billing desk.
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Footer.tsx
│   │   ├── MedicalDisclaimerBanner.tsx
│   │   ├── UploadMedicalFile.tsx
│   │   ├── ProcessingStepper.tsx
│   │   ├── ResultsLayout.tsx
│   │   ├── GuidancePanel.tsx
│   │   ├── LanguageSelector.tsx
│   │   │
│   │   └── results/
│   │       ├── XRayResultView.tsx
│   │       ├── PrescriptionResultView.tsx
│   │       └── BillResultView.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── UploadPage.tsx
│   │   ├── ProcessingPage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── HistoryPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── services/
│   │   └── apiMock.ts
│   │
│   ├── types/
│   │   └── medivision.ts
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   └── ...
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
Purpose	Color
Primary Medical Teal	#0f766e
Secondary Teal	#0e7490
Soft Cyan	#06b6d4
Emerald	#10b981
Light Slate	#f8fafc
Light Blue-Green	#f0fdfa
Muted Blue	#e0f2fe
Muted Teal	#ccfbf1
English
Additional languages coming soon
AI-generated information is for educational guidance only
and is not a medical diagnosis, prescription, or treatment
recommendation. Consult a qualified healthcare professional.
1. Upload received
        ↓
2. Preparing document
        ↓
3. Extracting information
        ↓
4. Patient summary
Coming Soon
English
Additional languages coming soon
src/components/results/XRayResultView.tsx
Image Quality
✓ Optimal Resolution
✓ Good Contrast
Sample AI Observation
Scan Clarity
src/components/results/PrescriptionResultView.tsx
src/components/results/BillResultView.tsx
src/types/medivision.ts
MedicalDocument
XRayAnalysis
PrescriptionAnalysis
BillAnalysis
HistoryItem
src/services/apiMock.ts
analyzeXRay()
analyzePrescription()
analyzeBill()
fetchHistory()
src/data/mockData.ts
Paracetamol 500 mg
Amoxicillin 500 mg
Pantoprazole 40 mg
Consultation
Complete Blood Count
Chest X-Ray
Pharmacy
                 ResultsPage
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
        X-Ray    Prescription    Bill
          │           │           │
          ▼           ▼           ▼
       XRayResult  RxResult    BillResult
┌─────────────────────┐
│      Home Page      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Select Medical     │
│      Service        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Upload Document   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   File Validation   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Processing Page    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Mock AI API      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Information         │
│ Extraction          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ AI Interpretation    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Patient-Friendly    │
│ Summary             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Results Page     │
└─────────────────────┘
node --version
npm --version
git clone https://github.com/YOUR-USERNAME/MediVision-AI.git
cd MediVision-AI/frontend
npm install
npm run dev
npm run build
npx tsc --noEmit
npx tsc --noEmit
No TypeScript errors
npm run build
1280px+
768px+
375px+
User Interface
      +
Responsive Design
      +
Document Upload
      +
Mock AI Processing
      +
Structured Results
      +
Patient Guidance
Components
Pages
Types
Services
Mock Data
"Explain this prescription to me."
![MediVision AI Dashboard](screenshots/home.png)
![X-Ray Screening](screenshots/xray.png)
![Prescription Understanding](screenshots/prescription.png)
![Medical Bill Summary](screenshots/bill.png)
![Processing Screen](screenshots/processing.png)
![AI Results](screenshots/results.png)
Team Member	Team
N. Stephen Keaneeth	HackStorm
P. Chandra Teja	HackStorm
S. Tarun	HackStorm
M. Varshitha	HackStorm
G. Meena	HackStorm
MIT License




