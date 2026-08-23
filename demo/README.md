# MediVision AI - Product Demo Guide

This directory holds guidelines and instructions on how to set up, launch, and walk through a demonstration of MediVision AI features using safe, synthetic demo files.

---

## ⚠️ Important Privacy Policy

> [!CAUTION]
> **Do not upload actual medical patient records, diagnostic images, or identifiable billing sheets containing real Protected Health Information (PHI) to this folder or the live application.**
>
> Use only synthetic, anonymized, or explicitly cleared demo data.

---

## 📋 Recommended Demo Walkthrough Steps

Follow these steps to demonstrate the three core modules of MediVision AI:

### Module 1: X-Ray Screening & Abnormality Visualization
1. **Prepare a Sample Image**:
   * Use an anonymized chest X-ray image (e.g. from public datasets like NIH ChestX-ray8 or MIMIC-CXR, or synthetic equivalents).
2. **Upload**:
   * Navigate to the **X-Ray Screening** section on the homepage dashboard.
   * Drag and drop or select the chest X-ray file.
3. **Inference**:
   * Watch the custom multi-stage processing stepper execute (Upload Received ➔ Preparing Document ➔ Running AI Inference ➔ Generating Patient Summary).
4. **Inspect Results**:
   * View the predicted classification (e.g., Pneumonia vs. Normal).
   * Hover over the **Grad-CAM visualizer** to inspect the heatmap activation overlay, pointing out the localized regions where the deep learning model flagged abnormalities.
   * Review the breakdown of probability scores for other lung pathologies.

---

### Module 2: Prescription Translation
1. **Prepare a Sample Image**:
   * Take a photo or scan of a mock prescription containing names of common medicines (e.g. `Paracetamol`, `Amoxicillin`, `Omeprazole`) and standard dosage instructions (e.g., `500 mg b.i.d. p.c. for 5 days`).
2. **Upload**:
   * Select **Prescription Understanding** from the sidebar.
   * Upload the mock prescription photo.
3. **Analyze Results**:
   * Check how EasyOCR reads the text.
   * Verify that the shorthand expressions are translated to patient-friendly guidelines (e.g. `b.i.d.` is translated to `Twice daily` and `p.c.` is translated to `after meals`).
   * Observe the visual daily intake schedule (Morning vs. Night).

---

### Module 3: Medical Bill Audit
1. **Prepare a Sample Image**:
   * Compile a mock hospital bill listing itemized charges such as `Consultation: ₹500`, `Chest X-Ray: ₹1,500`, `Pharmacy: ₹3,200`, and `Complete Blood Count: ₹800`.
2. **Upload**:
   * Select **Billing Summary** from the menu and upload the bill invoice.
3. **Analyze Results**:
   * Review the parsed breakdown of charges and totals.
   * Observe the auditing alert banner warning the user about any procedures exceeding the ₹4,000 threshold or flagging anomalies to verify with hospital billing desks.
