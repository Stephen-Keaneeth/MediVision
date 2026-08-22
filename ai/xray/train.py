"""
ai/xray/train.py

Training pipeline for the ResNet18 X-ray classifier.

Usage
-----
    python -m ai.xray.train --dataset data/xray --epochs 10

Run ``python -m ai.xray.train --help`` for all options.

The best model checkpoint is saved to:
    models/resnet18_xray_best.pth

The checkpoint file includes the model state dict and the class-to-index
mapping needed for inference.
"""

import argparse
import json
import os

import torch
import torch.nn as nn
from torch.utils.data import DataLoader

from ai.preprocessing.transforms import get_xray_transform
from ai.xray.dataset import load_xray_dataset
from ai.xray.model import create_model


CHECKPOINT_PATH = os.path.join("models", "resnet18_xray_best.pth")


def train_one_epoch(
    model: nn.Module,
    loader: DataLoader,
    criterion: nn.Module,
    optimizer: torch.optim.Optimizer,
    device: torch.device,
) -> float:
    """Run one full training epoch and return the average loss."""
    model.train()
    running_loss = 0.0
    total_batches = len(loader)

    for i, (images, labels) in enumerate(loader):
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)
        
        # Print progress so it doesn't look frozen
        if (i + 1) % 10 == 0 or (i + 1) == total_batches:
            print(f"  Batch {i + 1:03d}/{total_batches:03d} | Current Batch Loss: {loss.item():.4f}", end="\r")

    print()  # newline after progress prints
    return running_loss / len(loader.dataset)


def validate(
    model: nn.Module,
    loader: DataLoader,
    criterion: nn.Module,
    device: torch.device,
) -> tuple[float, float]:
    """Evaluate the model on a validation split.

    Returns
    -------
    tuple[float, float]
        (average_loss, accuracy)
    """
    model.eval()
    running_loss = 0.0
    correct = 0

    with torch.no_grad():
        for images, labels in loader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)

            running_loss += loss.item() * images.size(0)
            preds = outputs.argmax(dim=1)
            correct += (preds == labels).sum().item()

    avg_loss = running_loss / len(loader.dataset)
    accuracy = correct / len(loader.dataset)
    return avg_loss, accuracy


def save_checkpoint(
    model: nn.Module,
    class_to_idx: dict,
    num_classes: int,
    path: str,
) -> None:
    """Save model weights and class mapping to *path*."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    torch.save(
        {
            "num_classes": num_classes,
            "class_to_idx": class_to_idx,
            "model_state_dict": model.state_dict(),
        },
        path,
    )
    print(f"  Checkpoint saved → {path}")


def train(
    dataset_path: str,
    epochs: int,
    batch_size: int,
    lr: float,
    num_workers: int,
) -> None:
    """Run the full training loop."""
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    transform = get_xray_transform()
    train_ds, val_ds, _ = load_xray_dataset(dataset_path, transform=transform)

    num_classes = len(train_ds.classes)
    print(f"Classes ({num_classes}): {train_ds.classes}")

    train_loader = DataLoader(
        train_ds, batch_size=batch_size, shuffle=True,
        num_workers=num_workers, pin_memory=(device.type == "cuda"),
    )
    val_loader = DataLoader(
        val_ds, batch_size=batch_size, shuffle=False,
        num_workers=num_workers, pin_memory=(device.type == "cuda"),
    )

    model = create_model(num_classes=num_classes).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    best_val_acc = 0.0

    for epoch in range(1, epochs + 1):
        train_loss = train_one_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc = validate(model, val_loader, criterion, device)

        print(
            f"Epoch {epoch:03d}/{epochs:03d} | "
            f"Train Loss: {train_loss:.4f} | "
            f"Val Loss: {val_loss:.4f} | "
            f"Val Acc: {val_acc:.4f}"
        )

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            save_checkpoint(
                model,
                class_to_idx=train_ds.class_to_idx,
                num_classes=num_classes,
                path=CHECKPOINT_PATH,
            )

    print(f"\nTraining complete. Best Val Acc: {best_val_acc:.4f}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Train ResNet18 on an X-ray ImageFolder dataset."
    )
    parser.add_argument(
        "--dataset", type=str, default="data/xray",
        help="Path to dataset root (must contain train/, val/, test/).",
    )
    parser.add_argument("--epochs",     type=int,   default=10)
    parser.add_argument("--batch-size", type=int,   default=32)
    parser.add_argument("--lr",         type=float, default=1e-4)
    parser.add_argument("--workers",    type=int,   default=4,
                        help="DataLoader worker processes.")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    train(
        dataset_path=args.dataset,
        epochs=args.epochs,
        batch_size=args.batch_size,
        lr=args.lr,
        num_workers=args.workers,
    )
