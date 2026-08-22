# MediVision AI --- 24-Hour Hackathon Project Plan

## 1. Project Overview

### Project Title

**MediVision AI -- Medical Screening and Patient Guidance**

### Project Vision

MediVision AI is a computer-vision-based web application designed to
convert medical images and documents into structured, understandable
information for patients.

The current prototype focuses on three connected capabilities:

1.  **X-ray Screening**
2.  **Prescription Understanding**
3.  **Billing and Medication Information Summary**

The central idea is not to replace a doctor. The system acts as a
**screening and information-assistance layer** between medical documents
and the patient.

The project should demonstrate a complete workflow:

``` text
Medical Image / Document
          ↓
Computer Vision / OCR
          ↓
Information Extraction / Screening
          ↓
Probability / Structured Information
          ↓
Patient-Friendly Summary
          ↓
Relevant Next Step
```

The current scope is intentionally limited so that a working and
polished prototype can be completed within the remaining 24-hour
hackathon window.

------------------------------------------------------------------------

# 2. Problem Being Solved

Patients receive important information through different formats:

-   X-rays and medical images
-   Prescriptions
-   Hospital bills

Understanding these independently can be difficult, particularly when
medical terminology, medicine schedules, and billing information are
presented in technical or complicated formats.

Conventional solutions often handle these tasks separately. A
medical-image model may produce a prediction, OCR may extract text from
a prescription, and hospital billing software may show an amount. The
patient still has to interpret and connect this information themselves.

MediVision AI aims to bring these visual-information workflows together
in one patient-oriented interface.

The proposed workflow is:

``` text
X-ray
  ↓
Preliminary AI-assisted screening
  ↓
Primary result + probability distribution

Prescription
  ↓
OCR
  ↓
Medicine + dosage + frequency + duration
  ↓
Easy-to-understand summary

Bill
  ↓
OCR / structured extraction
  ↓
Total + paid + remaining + due information
```

The project therefore focuses on **understanding and organizing medical
information**, rather than claiming to replace professional medical
diagnosis or treatment.

------------------------------------------------------------------------

# 3. Current MVP Scope

## 3.1 Must-Have Features

The following features define the 24-hour MVP.

### Module A --- X-ray Screening

The user uploads a supported X-ray image.

The system should:

1.  Validate that the uploaded image is suitable for the supported
    workflow.
2.  Preprocess the image where required.
3.  Pass the image through an appropriate computer-vision model.
4.  Generate the supported classification/detection output.
5.  Display the primary model result.
6.  Display the class probability distribution.
7.  Display a model confidence/probability estimate.
8.  Provide a preliminary risk category if the selected model supports
    such an interpretation.
9.  Provide a relevant medical-specialty direction where the supported
    output allows it.
10. Clearly state that the result is a preliminary screening result and
    requires professional medical confirmation.

### Target Output

``` text
X-RAY SCREENING

Primary Result:
[Supported model result]

Class Probabilities:
Class A       XX%
Class B       XX%
Class C       XX%

Model Probability:
XX%

Suggested Specialty:
[Relevant specialty]

Status:
Preliminary screening — professional medical review required.
```

### Important Limitation

The MVP must not claim that it can definitively diagnose every disease
or determine disease stage from a single image.

The supported classes must be determined by the actual model and dataset
used by the team.

------------------------------------------------------------------------

# 4. Module B --- Prescription Understanding

The user uploads a photograph or scan of a prescription.

The system uses OCR to extract readable information.

## Information to Extract

Where the document is sufficiently clear:

-   Patient name
-   Medicine name
-   Dosage
-   Frequency
-   Duration
-   Doctor's instructions
-   Prescription date
-   Doctor information, if available

## Processing Pipeline

``` text
Prescription Image
        ↓
Image Preprocessing
        ↓
OCR
        ↓
Raw Text
        ↓
Field Extraction
        ↓
Structured Prescription
        ↓
Patient-Friendly Summary
```

## Example

``` text
PRESCRIPTION SUMMARY

Medicine: Medicine A
Dose: 500 mg
Frequency: 2 times/day
Duration: 5 days

Medicine: Medicine B
Dose: 1 tablet
Frequency: Once/day
Duration: 7 days
```

## Medication Schedule

The application may convert explicitly written instructions into a
simpler schedule.

For example:

``` text
Morning → Medicine A
Evening → Medicine A
```

However, the application must not invent a schedule when the
prescription does not explicitly provide enough information.

The application summarizes the doctor's existing prescription; it does
not create a new prescription.

------------------------------------------------------------------------

# 5. Module C --- Billing Information Summary

The user can upload a hospital bill or invoice image.

The system extracts available billing information.

## Required Fields

-   Total bill amount
-   Amount already paid
-   Amount remaining
-   Due/payment information, when explicitly available

## Processing Pipeline

``` text
Bill Image
    ↓
OCR
    ↓
Billing Field Extraction
    ↓
Amount Verification / Calculation
    ↓
Patient-Friendly Bill Summary
```

## Example

``` text
HOSPITAL BILL SUMMARY

Total Bill:       ₹8,500
Amount Paid:      ₹5,000
Amount Remaining: ₹3,500

Payment Status:
Partially Paid

Due Date:
25 August 2026
```

If a due date is not present:

``` text
Due Date:
Not available in uploaded document
```

The system must not invent a payment deadline.

------------------------------------------------------------------------

# 6. Unified Patient Dashboard

The three modules should be accessible from one web application.

## Proposed Navigation

``` text
MediVision AI
│
├── Home
│
├── X-ray Screening
│
├── Prescription Scanner
│
├── Bill Scanner
│
└── Patient Summary
```

## Unified Workflow

``` text
                    MEDIVISION AI
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
       X-RAY         PRESCRIPTION        BILL
      SCREENING        SCANNER          SCANNER
          │               │               │
          ↓               ↓               ↓
       CV MODEL           OCR             OCR
          │               │               │
          ↓               ↓               ↓
     AI Result        Medicine Data    Bill Data
     Probability       Schedule       Payment Data
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                  PATIENT DASHBOARD
                          ↓
                EASY-TO-UNDERSTAND
                     SUMMARY
```

------------------------------------------------------------------------

# 7. Core Innovation

## What is the innovation?

The project should not be presented as "an AI that diagnoses diseases."

Medical image classification and OCR already exist as technologies.

The value addition is the **integration of visual medical information
into a patient-oriented workflow**.

Instead of isolated outputs:

``` text
X-ray Model → Prediction

OCR → Raw Prescription Text

Bill OCR → Raw Amounts
```

MediVision AI aims to produce:

``` text
X-ray
  ↓
Preliminary screening
  ↓
Probability distribution
  ↓
Understandable result
  ↓
Relevant specialty direction

Prescription
  ↓
OCR
  ↓
Structured medicine information
  ↓
Patient-friendly schedule

Bill
  ↓
OCR
  ↓
Total / Paid / Remaining / Due
```

The central value proposition is:

> **Turn difficult medical images and documents into structured,
> understandable information without replacing the healthcare
> professional.**

------------------------------------------------------------------------

# 8. Technical Architecture

## High-Level Architecture

``` text
                    USER
                     │
                     ▼
              WEB FRONTEND
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     X-RAY       PRESCRIPTION     BILL
        │            │            │
        ▼            ▼            ▼
   Image Model      OCR           OCR
        │            │            │
        ▼            ▼            ▼
 Classification   Text/Field    Billing
 / Detection      Extraction    Extraction
        │            │            │
        └────────────┼────────────┘
                     ▼
              DECISION / FORMAT
                     LAYER
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       Result     Summary    Payment
       Output     Output      Output
          │          │          │
          └──────────┼──────────┘
                     ▼
             PATIENT DASHBOARD
```

## X-ray Pipeline

``` text
X-ray Image
     ↓
Validation
     ↓
Preprocessing
     ↓
Computer Vision Model
     ↓
Classification / Detection
     ↓
Probability Distribution
     ↓
Result Formatter
     ↓
Web UI
```

## Prescription/Bill Pipeline

``` text
Document Image
     ↓
Image Preprocessing
     ↓
OCR
     ↓
Text Cleaning
     ↓
Field Extraction
     ↓
Validation
     ↓
Structured JSON/Data
     ↓
Web UI
```

------------------------------------------------------------------------

# 9. Recommended Technology Strategy

The exact technology stack should be finalized by the team based on
existing familiarity.

A practical hackathon stack can be:

## Frontend

-   HTML/CSS/JavaScript, or
-   React if the team already knows it

## Backend

-   Python
-   FastAPI or Flask

## Computer Vision

-   A suitable pretrained/publicly available medical-image CV model
-   PyTorch or another framework supported by the selected model

## OCR

-   A reliable OCR library/API already available to the team

## Visualization

-   Probability bars/charts
-   Confidence cards
-   Highlighted OCR regions where feasible

## Storage

For the 24-hour MVP, persistent medical-record storage is not required.

Use temporary/session-level data unless secure storage is already
available.

### Important

Do not spend hackathon time building infrastructure that does not
improve the demo.

The core requirement is:

``` text
Upload → Process → Produce Reliable Demo Output
```

------------------------------------------------------------------------

# 10. Data and Model Strategy

## X-ray Model

The team should select **one supported X-ray use case**, rather than
attempting X-ray, CT, MRI and multiple unrelated diseases in the MVP.

The model's classes must be based on the dataset/model actually used.

Do not create unsupported disease classes just for presentation.

## Why One X-ray Workflow?

CT and MRI support are future-scope features in the current project
plan.

They require separate modality-appropriate datasets and models and
should not be treated as ordinary extensions of the X-ray model.

## Dataset Requirements

The selected dataset should have:

-   Clearly defined classes
-   Appropriate licensing/usage permissions for the hackathon
-   Sufficient examples for the selected task
-   Consistent image modality
-   Labels matching the model output

## Evaluation

Where possible, report:

-   Accuracy
-   Precision
-   Recall
-   F1-score
-   Confusion matrix

For a classification model, do not report a metric unless it has
actually been calculated.

------------------------------------------------------------------------

# 11. Probability and Confidence Design

The result page should distinguish between:

### Class Probability

The model's relative output across supported classes.

Example:

``` text
Normal:       15%
Class A:      72%
Class B:      13%
```

### Model Confidence

A simplified presentation of the model's strongest prediction.

The UI should avoid implying that:

> 72% model probability = 72% medical certainty.

The project should describe these as **model probability estimates**,
not guaranteed clinical probabilities.

------------------------------------------------------------------------

# 12. Patient-Facing Result Design

The result should be understandable to a non-technical user.

## Technical Result

``` text
Class A: 72%
```

## Patient-Facing Result

``` text
Preliminary screening:
Possible abnormal visual pattern detected.

Model probability estimate:
72%

Suggested next step:
Discuss the result with a qualified medical professional.
```

The application should not make unsupported statements such as:

-   "You definitely have this disease."
-   "You are in Stage 3."
-   "You do not need a doctor."
-   "Stop taking this medicine."
-   "Start taking this medicine."

------------------------------------------------------------------------

# 13. Error Handling

This is important for a medical-image demo.

The system should handle:

## Invalid Image

``` text
The uploaded image could not be processed.
Please upload a supported medical image.
```

## Low-Quality Image

``` text
Image quality is insufficient for reliable processing.
Please upload a clearer image.
```

## Unsupported Document

``` text
This document type is not currently supported.
```

## OCR Failure

``` text
Some information could not be read confidently.
Please verify the original document.
```

## Missing Bill Field

``` text
Due date was not found in the uploaded bill.
```

## Low Model Confidence

If the selected model supports such a threshold:

``` text
The model output is uncertain.
Professional review is recommended.
```

------------------------------------------------------------------------

# 14. Privacy and Safety for the Prototype

Because the project processes medical information, privacy must be
treated seriously.

For the hackathon MVP:

-   Avoid storing real patient information permanently.
-   Use sample/de-identified images for the demo.
-   Avoid collecting unnecessary personal information.
-   Do not expose uploaded medical documents publicly.
-   Clear temporary files after processing where practical.

The UI should include a clear disclaimer:

> **This system is an AI-assisted screening and information tool. It
> does not replace a qualified healthcare professional. Medical
> decisions should be made by a qualified doctor using complete clinical
> information.**

------------------------------------------------------------------------

# 15. 24-Hour Development Plan

## Phase 1 --- Hours 0--2

### Scope Freeze and Setup

Tasks:

-   Finalize one X-ray use case.
-   Finalize model.
-   Finalize OCR approach.
-   Create repository.
-   Set up frontend.
-   Set up backend.
-   Establish API structure.
-   Prepare sample images.

### Deliverable

Basic web page with:

``` text
X-ray Upload
Prescription Upload
Bill Upload
```

------------------------------------------------------------------------

# Phase 2 --- Hours 2--6

## X-ray Model Integration

Tasks:

1.  Load model.
2.  Test sample X-rays.
3.  Implement preprocessing.
4.  Implement inference.
5.  Return class probabilities.
6.  Identify top prediction.
7.  Connect model to backend.

### Deliverable

``` text
X-ray
 ↓
Model
 ↓
Prediction + Probabilities
```

------------------------------------------------------------------------

# Phase 3 --- Hours 6--9

## X-ray Results UI

Build:

-   X-ray preview
-   Primary result card
-   Probability chart
-   Confidence/probability display
-   Specialty suggestion
-   Disclaimer

### Deliverable

A complete X-ray demo from upload to result.

------------------------------------------------------------------------

# Phase 4 --- Hours 9--13

## Prescription OCR

Tasks:

1.  Upload prescription.
2.  Preprocess image.
3.  Run OCR.
4.  Clean OCR output.
5.  Extract medicine information.
6.  Display structured fields.

### Deliverable

``` text
Prescription
 ↓
OCR
 ↓
Medicine
Dose
Frequency
Duration
```

------------------------------------------------------------------------

# Phase 5 --- Hours 13--16

## Patient-Friendly Medication Summary

Tasks:

-   Convert structured prescription information into a readable format.
-   Build a schedule only from explicitly available instructions.
-   Add warning for uncertain/unreadable fields.
-   Display original extracted information alongside the simplified
    summary.

### Deliverable

``` text
MEDICATION SUMMARY

Medicine A
500 mg
Twice daily
5 days
```

------------------------------------------------------------------------

# Phase 6 --- Hours 16--18

## Bill Scanner

Tasks:

-   Upload bill.
-   OCR.
-   Extract total amount.
-   Extract amount paid.
-   Calculate remaining amount when appropriate.
-   Extract due date if present.
-   Display payment status.

### Deliverable

``` text
Total: ₹8,500
Paid: ₹5,000
Remaining: ₹3,500
Due: [document value]
```

------------------------------------------------------------------------

# Phase 7 --- Hours 18--20

## Unified Dashboard

Integrate all modules.

The dashboard should allow the judge to move through:

``` text
X-ray → Screening
Prescription → Medication Summary
Bill → Payment Summary
```

------------------------------------------------------------------------

# Phase 8 --- Hours 20--22

## Testing and Polish

Test:

-   Valid images
-   Invalid images
-   Blurry images
-   Different prescription layouts
-   Missing prescription fields
-   Different bill layouts
-   Missing due date
-   Incorrect uploads
-   Model failure
-   OCR failure

Improve:

-   UI
-   Loading states
-   Error messages
-   Result cards
-   Charts
-   Navigation

------------------------------------------------------------------------

# Phase 9 --- Hours 22--23

## Demo Preparation

Prepare one complete fictional/de-identified patient journey:

``` text
1. Upload X-ray
2. Receive preliminary screening
3. View probability distribution
4. View suggested specialty
5. Upload prescription
6. View medicine summary
7. Upload bill
8. View payment summary
```

Prepare screenshots/video backups for every critical feature.

------------------------------------------------------------------------

# Phase 10 --- Hours 23--24

## Final Validation and Pitch

Final checks:

-   Website starts correctly.
-   Model loads correctly.
-   Uploads work.
-   Results display correctly.
-   OCR works on demo documents.
-   Bill calculation is correct.
-   Disclaimer is visible.
-   Backup demo is available.

------------------------------------------------------------------------

# 16. Team Division

If there are four team members:

## Member 1 --- Computer Vision

Responsibilities:

-   X-ray dataset/model
-   Preprocessing
-   Inference
-   Probability output
-   Model evaluation

## Member 2 --- OCR and Document Processing

Responsibilities:

-   Prescription OCR
-   Bill OCR
-   Field extraction
-   Text cleaning
-   Structured output

## Member 3 --- Frontend

Responsibilities:

-   Upload UI
-   Dashboard
-   Result cards
-   Probability visualization
-   Prescription/bill displays

## Member 4 --- Backend and Integration

Responsibilities:

-   API
-   Model endpoint
-   OCR endpoint
-   Data flow
-   Error handling
-   Final integration

If the team has fewer members, combine roles rather than expanding the
project scope.

------------------------------------------------------------------------

# 17. Demo Flow

The demonstration should tell one coherent story.

## Step 1 --- X-ray

``` text
Patient uploads X-ray
        ↓
AI-assisted screening
        ↓
Primary result
        ↓
Class probabilities
        ↓
Suggested specialty
```

## Step 2 --- Prescription

``` text
Patient uploads prescription
        ↓
OCR
        ↓
Medicine extraction
        ↓
Patient-friendly schedule
```

## Step 3 --- Bill

``` text
Patient uploads bill
        ↓
OCR
        ↓
Total
Paid
Remaining
Due information
```

## Step 4 --- Unified Summary

``` text
Patient Information
        │
        ├── Screening Result
        ├── Medicine Summary
        └── Billing Summary
```

------------------------------------------------------------------------

# 18. What Should Be Demonstrated to Judges?

The judges should see actual computer-vision functionality rather than
only a polished website.

Demonstrate:

### X-ray

-   Actual uploaded image
-   Actual model inference
-   Actual prediction
-   Actual probability distribution

### Prescription

-   Actual uploaded image
-   OCR extraction
-   Structured medicine fields

### Bill

-   Actual uploaded bill
-   Extracted amounts
-   Remaining amount

This proves that the website is not merely a static interface.

------------------------------------------------------------------------

# 19. Features That Should NOT Be Built in the 24-Hour MVP

The following remain future scope:

-   CT analysis
-   MRI analysis
-   Ultrasound analysis
-   Mammography
-   Multiple advanced disease models
-   Definitive disease diagnosis
-   Disease staging
-   Autonomous treatment recommendations
-   Medication changes
-   Drug-interaction decisions
-   Real hospital database integration
-   Pharmacy ordering
-   Real payment gateway
-   Emergency ambulance coordination
-   Full electronic medical records
-   Voice assistant
-   Multilingual voice output

Trying to implement these now would increase complexity without
improving the reliability of the core demonstration.

------------------------------------------------------------------------

# 20. Future Scope Roadmap

The current files define a broad future vision. The project can evolve
in stages.

## Stage 1 --- Multilingual Patient Summaries

Support:

-   English
-   Telugu
-   Hindi
-   Tamil
-   Kannada
-   Urdu
-   Other languages

The underlying medical result should remain unchanged while the
patient-facing explanation is translated.

------------------------------------------------------------------------

## Stage 2 --- Voice Interaction

Allow questions such as:

``` text
"What did my X-ray screening show?"

"What medicines are on my prescription?"

"How much of my bill is remaining?"
```

The system can return a simple spoken explanation.

------------------------------------------------------------------------

## Stage 3 --- Text-to-Speech

Read the patient summary aloud.

This can be combined with multilingual support to improve accessibility.

------------------------------------------------------------------------

## Stage 4 --- Additional Imaging

Extend the platform to:

-   CT
-   MRI
-   Ultrasound
-   Mammography
-   Other specialized imaging

Each modality should have its own appropriate model and validation
process.

------------------------------------------------------------------------

## Stage 5 --- Advanced Medical Image Analysis

Possible future capabilities:

-   Abnormality localization
-   Image segmentation
-   Lesion detection
-   Clinically validated severity estimation
-   Previous/current scan comparison
-   Visual explanation
-   Temporal analysis

------------------------------------------------------------------------

## Stage 6 --- Doctor-in-the-Loop

Future workflow:

``` text
Patient Upload
      ↓
AI Preliminary Screening
      ↓
Doctor Review
      ↓
Doctor Confirmation / Correction
      ↓
Final Report
```

The doctor remains responsible for the final clinical interpretation.

------------------------------------------------------------------------

## Stage 7 --- Medical Record Integration

With appropriate authorization and security:

-   Previous reports
-   Previous scans
-   Prescriptions
-   Medical history
-   Relevant patient information

could be integrated into a patient dashboard.

------------------------------------------------------------------------

## Stage 8 --- Smart Medication Reminders

The system could generate reminders based strictly on the doctor's
prescription:

``` text
Morning → Medicine A
Afternoon → Medicine B
Night → Medicine A
```

The system should not independently modify the prescription.

------------------------------------------------------------------------

## Stage 9 --- Pharmacy Integration

Potential future workflow:

``` text
Prescription
     ↓
Medicine Extraction
     ↓
Availability Check
     ↓
Authorized Pharmacy
     ↓
Order / Collection
```

------------------------------------------------------------------------

## Stage 10 --- Hospital Billing Integration

Potential features:

-   Real-time bill updates
-   Amount paid
-   Outstanding amount
-   Payment deadline
-   Insurance information
-   Claim status
-   Receipts

------------------------------------------------------------------------

## Stage 11 --- Personalized Patient Dashboard

Long-term dashboard:

``` text
Patient
│
├── Medical Images
├── Screening Results
├── Reports
├── Prescriptions
├── Medication Schedule
├── Bills
├── Appointments
└── Doctor Information
```

------------------------------------------------------------------------

## Stage 12 --- Privacy and Security

A production system should eventually implement:

-   Secure authentication
-   Role-based access
-   Patient consent
-   Encryption
-   Audit logs
-   Secure medical-record storage
-   Data anonymization
-   Controlled sharing

------------------------------------------------------------------------

# 21. Long-Term Product Vision

The long-term system can evolve from a computer-vision prototype into a:

> **Multilingual, multimodal, voice-enabled patient healthcare
> information assistant.**

Future architecture:

``` text
                 PATIENT
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      Voice       Image      Document
        │           │           │
        └───────────┼───────────┘
                    ↓
              AI PROCESSING
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Screening      OCR       Extraction
        │           │           │
        └───────────┼───────────┘
                    ↓
             Patient Summary
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      Voice      Language    Dashboard
      Output     Translation
                    │
                    ↓
        Doctor / Hospital / Pharmacy
```

The long-term goal is to make medical information:

-   Easier to understand
-   Easier to access
-   Easier to organize
-   More accessible across languages
-   More accessible through voice
-   Better connected to professional healthcare workflows

while keeping qualified healthcare professionals responsible for
diagnosis and treatment decisions.

------------------------------------------------------------------------

# 22. Risk Management

## Risk 1 --- X-ray Model Does Not Perform Reliably

### Mitigation

-   Use a well-defined supported use case.
-   Use a suitable pretrained/public model or dataset.
-   Test early.
-   Keep the supported class list small.
-   Do not claim unsupported diagnoses.

------------------------------------------------------------------------

## Risk 2 --- OCR Fails on Handwritten Prescriptions

### Mitigation

-   Prepare clear sample prescriptions.
-   Use printed prescriptions for the primary demo if possible.
-   Display OCR confidence/uncertainty where available.
-   Allow the user to verify extracted information.
-   Keep the original document visible.

------------------------------------------------------------------------

## Risk 3 --- 24-Hour Time Limit

### Mitigation

Follow strict priority:

``` text
X-ray working
      ↓
Prescription OCR working
      ↓
Bill OCR working
      ↓
Integration
      ↓
UI polish
      ↓
Future features
```

Do not move to future features until the MVP works.

------------------------------------------------------------------------

## Risk 4 --- Medical Safety

### Mitigation

Always use:

> "Preliminary AI-assisted screening"

instead of:

> "Definitive diagnosis"

Use:

> "Extracted prescription information"

instead of:

> "AI-generated prescription"

Use:

> "Suggested specialty for follow-up"

instead of:

> "Doctor diagnosis"

------------------------------------------------------------------------

# 23. Definition of Done

The project should be considered complete for the hackathon when all of
the following work:

## X-ray

-   [ ] X-ray upload works.
-   [ ] Model inference works.
-   [ ] Primary result appears.
-   [ ] Class probabilities appear.
-   [ ] Appropriate disclaimer appears.
-   [ ] Specialty direction appears where supported.

## Prescription

-   [ ] Prescription upload works.
-   [ ] OCR works.
-   [ ] Medicine names are extracted.
-   [ ] Dosage is extracted where readable.
-   [ ] Frequency is extracted where readable.
-   [ ] Duration is extracted where readable.
-   [ ] Patient-friendly summary is displayed.

## Billing

-   [ ] Bill upload works.
-   [ ] Total amount is extracted.
-   [ ] Paid amount is extracted.
-   [ ] Remaining amount is calculated/displayed.
-   [ ] Due information is displayed only when available.

## Website

-   [ ] Navigation works.
-   [ ] Loading states work.
-   [ ] Error messages work.
-   [ ] Results are visually clear.
-   [ ] Demo data is ready.
-   [ ] Backup screenshots/video are ready.

## Safety

-   [ ] Medical disclaimer is visible.
-   [ ] No unsupported diagnosis claims are made.
-   [ ] No medication changes are recommended.
-   [ ] No invented due dates are displayed.
-   [ ] Unreadable information is identified as uncertain.

------------------------------------------------------------------------

# 24. Final 24-Hour Priority Matrix

  Feature                   Priority   Time Sensitivity Keep in MVP?
  ----------------------- ---------- ------------------ --------------
  X-ray CV model            Critical          Very High Yes
  X-ray probabilities       Critical               High Yes
  X-ray result UI           Critical               High Yes
  Specialty direction           High             Medium Yes
  Prescription OCR          Critical               High Yes
  Medicine extraction       Critical               High Yes
  Medication summary            High             Medium Yes
  Bill OCR                      High             Medium Yes
  Bill calculation              High                Low Yes
  Unified dashboard             High             Medium Yes
  CT                             Low          Very High No
  MRI                            Low          Very High No
  Disease staging                Low          Very High No
  Voice                       Future               High No
  Multilingual output         Future               High No
  Pharmacy integration        Future          Very High No
  Hospital database           Future          Very High No
  Emergency integration       Future          Very High No

------------------------------------------------------------------------

# 25. Final Project Strategy

The team should follow one principle throughout the hackathon:

> **Build fewer features, but make every implemented feature actually
> work.**

The final 24-hour product should demonstrate:

``` text
        MEDIVISION AI

X-RAY
  ↓
AI-assisted preliminary screening
  ↓
Prediction + Probability
  ↓
Specialty Direction

PRESCRIPTION
  ↓
OCR
  ↓
Medicine + Dose + Frequency + Duration
  ↓
Patient-Friendly Summary

BILL
  ↓
OCR
  ↓
Total + Paid + Remaining + Due Information
```

The hackathon MVP is the **foundation**.

The future product can expand toward:

``` text
Multilingual
      +
Voice
      +
CT/MRI/Ultrasound
      +
Advanced Image Analysis
      +
Doctor Verification
      +
Medical Records
      +
Medication Reminders
      +
Pharmacy
      +
Hospital Billing
      +
Secure Patient Dashboard
```

The immediate goal, however, is to deliver a **working, coherent, safe
and demonstrable computer-vision application within 24 hours**.
