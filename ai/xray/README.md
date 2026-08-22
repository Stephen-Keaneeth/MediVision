# AI - X-Ray Module

This is the **PRIMARY Computer Vision module** for MediVision AI.

---

## Purpose

This module performs preliminary X-ray image classification using a real Computer Vision model (ResNet18). It accepts an X-ray image as input and outputs a predicted class label and a confidence score. This satisfies the hackathon CV track requirements for image input, a real CV architecture, automated visual understanding, and measurable output.

---

## Current Model

**ResNet18** — pretrained on ImageNet, fine-tuned on the target X-ray dataset.

---

## Input

A single X-ray image (JPEG, PNG, or any Pillow-supported format).

---

## Output

```json
{
  "prediction": "<class_name>",
  "confidence": 0.91
}
```

---

## Dataset

The dataset must follow the `torchvision.datasets.ImageFolder` convention:

```
data/xray/
├── train/
│   ├── class_a/
│   └── class_b/
├── val/
│   ├── class_a/
│   └── class_b/
└── test/
    ├── class_a/
    └── class_b/
```

The dataset is **not** committed to this repository. See `data/README.md` for guidance on where to source X-ray datasets.

---

## Training

Run from the repository root:

```bash
python -m ai.xray.train --dataset data/xray --epochs 10
```

All options:

```
--dataset     Path to dataset root (default: data/xray)
--epochs      Number of training epochs (default: 10)
--batch-size  Mini-batch size (default: 32)
--lr          Learning rate (default: 1e-4)
--workers     DataLoader worker processes (default: 4)
```

The best checkpoint is saved to `models/resnet18_xray_best.pth`.

---

## Evaluation

```bash
python -m ai.xray.evaluate --dataset data/xray
```

Reports accuracy, precision, recall, and F1 score on the test split.

---

## Inference

```bash
python -m ai.xray.predict path/to/xray.jpg
```

With a custom checkpoint:

```bash
python -m ai.xray.predict path/to/xray.jpg --checkpoint models/resnet18_xray_best.pth
```

---

## Module Structure

```
ai/xray/
├── __init__.py
├── model.py       — create_model(num_classes) → ResNet18
├── dataset.py     — load_xray_dataset(path, transform)
├── train.py       — training loop, saves best checkpoint
├── predict.py     — single-image inference
└── evaluate.py    — test-split metrics
```

Shared preprocessing lives in `ai/preprocessing/transforms.py`.

---

## Limitations

> ⚠️ **This is a hackathon prototype and is NOT a validated medical diagnostic system.**
>
> - Results must not be used for clinical decisions.
> - The model has not been validated against a certified medical benchmark.
> - Performance depends entirely on the quality and size of the training dataset.
> - No regulatory clearance (e.g. FDA, CE) has been obtained or sought.
