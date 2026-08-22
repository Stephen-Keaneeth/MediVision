"""
ai/xray/evaluate.py

Evaluate a trained ResNet18 X-ray classifier on the test split.

Metrics reported
-----------------
* Accuracy
* Precision  (macro-averaged)
* Recall     (macro-averaged)
* F1 score   (macro-averaged)

Usage
-----
    python -m ai.xray.evaluate --dataset data/xray
    python -m ai.xray.evaluate --dataset data/xray --checkpoint models/resnet18_xray_best.pth
"""

import argparse

import torch
from torch.utils.data import DataLoader
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    f1_score,
    precision_score,
    recall_score,
)

from ai.preprocessing.transforms import get_xray_transform
from ai.xray.dataset import load_xray_dataset
from ai.xray.predict import load_model_from_checkpoint

DEFAULT_CHECKPOINT = "models/resnet18_xray_best.pth"


def collect_predictions(
    model: torch.nn.Module,
    loader: DataLoader,
    device: torch.device,
) -> tuple[list[int], list[int]]:
    """Run inference over the full loader and collect ground-truth + predictions."""
    model.eval()
    all_labels = []
    all_preds = []

    with torch.no_grad():
        for images, labels in loader:
            images = images.to(device)
            outputs = model(images)
            preds = outputs.argmax(dim=1).cpu().tolist()
            all_preds.extend(preds)
            all_labels.extend(labels.tolist())

    return all_labels, all_preds


def evaluate(
    dataset_path: str,
    checkpoint_path: str,
    batch_size: int,
    num_workers: int,
) -> None:
    """Load the test split, run inference, and print metrics."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    model, idx_to_class = load_model_from_checkpoint(checkpoint_path, device)

    transform = get_xray_transform()
    _, _, test_ds = load_xray_dataset(dataset_path, transform=transform)

    test_loader = DataLoader(
        test_ds, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=(device.type == "cuda"),
    )

    print(f"Evaluating on {len(test_ds)} test images …")
    all_labels, all_preds = collect_predictions(model, test_loader, device)

    class_names = [idx_to_class[i] for i in sorted(idx_to_class)]

    acc       = accuracy_score(all_labels, all_preds)
    precision = precision_score(all_labels, all_preds, average="macro", zero_division=0)
    recall    = recall_score(all_labels, all_preds, average="macro", zero_division=0)
    f1        = f1_score(all_labels, all_preds, average="macro", zero_division=0)

    print("\n── Evaluation Results ──────────────────")
    print(f"  Accuracy  : {acc:.4f}")
    print(f"  Precision : {precision:.4f}  (macro)")
    print(f"  Recall    : {recall:.4f}  (macro)")
    print(f"  F1 Score  : {f1:.4f}  (macro)")
    print("\n── Per-class Report ────────────────────")
    print(
        classification_report(
            all_labels, all_preds,
            target_names=class_names,
            zero_division=0,
        )
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Evaluate the ResNet18 X-ray classifier on the test split."
    )
    parser.add_argument(
        "--dataset", type=str, default="data/xray",
        help="Path to dataset root (must contain test/).",
    )
    parser.add_argument(
        "--checkpoint", type=str, default=DEFAULT_CHECKPOINT,
        help="Path to trained model checkpoint.",
    )
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--workers",    type=int, default=4)
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    evaluate(
        dataset_path=args.dataset,
        checkpoint_path=args.checkpoint,
        batch_size=args.batch_size,
        num_workers=args.workers,
    )
