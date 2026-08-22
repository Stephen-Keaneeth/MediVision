# Models

This directory stores trained model artifacts for MediVision AI.

**IMPORTANT**: Trained model weights should generally NOT be committed directly to the repository unless the team decides otherwise. Use external storage for heavy model files.

---

## Expected Checkpoint

After training the X-ray classifier, the following file will be generated here:

| File | Description |
|------|-------------|
| `resnet18_xray_best.pth` | Best ResNet18 checkpoint from `ai/xray/train.py` |

The checkpoint contains:
- `num_classes` — number of output classes
- `class_to_idx` — mapping from class name to integer index (required for inference)
- `model_state_dict` — trained model weights

---

## Loading a Checkpoint

```python
import torch
checkpoint = torch.load("models/resnet18_xray_best.pth", map_location="cpu")
print(checkpoint["class_to_idx"])
```

Or simply run inference directly:

```bash
python -m ai.xray.predict path/to/xray.jpg
```

---

## Git Policy

Model weight files (`*.pt`, `*.pth`, `*.onnx`) are excluded from version control via `.gitignore`. This `README.md` is preserved.
