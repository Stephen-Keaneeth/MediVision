"""
ai/xray/predict.py

Single-image inference for the ResNet18 X-ray classifier.

Usage
-----
    python -m ai.xray.predict path/to/xray.jpg
    python -m ai.xray.predict path/to/xray.jpg --checkpoint models/resnet18_xray_best.pth

Returns a JSON dict:
    {"prediction": "<class_name>", "confidence": 0.91}
"""

import argparse
import json
import sys

import torch
import torch.nn.functional as F
from PIL import Image

from ai.preprocessing.transforms import get_xray_transform
from ai.xray.model import create_model

DEFAULT_CHECKPOINT = "models/resnet18_xray_best.pth"


def load_model_from_checkpoint(
    checkpoint_path: str,
    device: torch.device,
) -> tuple[torch.nn.Module, dict]:
    """
    Load the ResNet18 model and class-to-index mapping from a checkpoint.

    Parameters
    ----------
    checkpoint_path : str
        Path to the ``.pth`` checkpoint saved by ``train.py``.
    device : torch.device
        Device to load the model onto.

    Returns
    -------
    tuple[nn.Module, dict]
        (model, idx_to_class) where idx_to_class maps integer index → class name.

    Raises
    ------
    FileNotFoundError
        If the checkpoint file does not exist.
    """
    if not __import__("os").path.isfile(checkpoint_path):
        raise FileNotFoundError(
            f"Checkpoint not found: '{checkpoint_path}'.\n"
            "Train the model first with:\n"
            "  python -m ai.xray.train --dataset data/xray"
        )

    checkpoint = torch.load(checkpoint_path, map_location=device)
    num_classes = checkpoint["num_classes"]
    class_to_idx = checkpoint["class_to_idx"]

    # Invert mapping: index → class name.
    idx_to_class = {v: k for k, v in class_to_idx.items()}

    model = create_model(num_classes=num_classes)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(device)
    model.eval()

    return model, idx_to_class


def predict(image_path: str, checkpoint_path: str = DEFAULT_CHECKPOINT) -> dict:
    """
    Run inference on a single X-ray image.

    Parameters
    ----------
    image_path : str
        Path to the input X-ray image (JPEG, PNG, etc.).
    checkpoint_path : str
        Path to the trained model checkpoint.

    Returns
    -------
    dict
        ``{"prediction": "<class_name>", "confidence": <float>}``
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model, idx_to_class = load_model_from_checkpoint(checkpoint_path, device)

    transform = get_xray_transform()
    image = Image.open(image_path)
    tensor = transform(image).unsqueeze(0).to(device)  # add batch dim

    with torch.no_grad():
        logits = model(tensor)
        probabilities = F.softmax(logits, dim=1)

    confidence, predicted_idx = probabilities.max(dim=1)
    class_name = idx_to_class[predicted_idx.item()]

    return {
        "prediction": class_name,
        "confidence": round(confidence.item(), 4),
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run X-ray classification inference on a single image."
    )
    parser.add_argument("image", type=str, help="Path to the X-ray image.")
    parser.add_argument(
        "--checkpoint", type=str, default=DEFAULT_CHECKPOINT,
        help="Path to the trained model checkpoint.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    result = predict(image_path=args.image, checkpoint_path=args.checkpoint)
    print(json.dumps(result, indent=2))
