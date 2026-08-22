"""
ai/xray/dataset.py

X-ray dataset loader using torchvision's ImageFolder convention.

Expected directory layout
--------------------------
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

Usage
-----
    from ai.xray.dataset import load_xray_dataset

    train_ds, val_ds, test_ds = load_xray_dataset("data/xray")
    print(train_ds.classes)
"""

import os
from torchvision.datasets import ImageFolder
from torchvision import transforms


def load_xray_dataset(
    dataset_root: str,
    transform: transforms.Compose | None = None,
):
    """
    Load the train, val, and test splits from an ImageFolder dataset.

    Parameters
    ----------
    dataset_root : str
        Path to the root dataset directory that contains ``train/``,
        ``val/``, and ``test/`` subdirectories.
    transform : transforms.Compose, optional
        Torchvision transform to apply to every image.  If *None*, images
        are returned as un-normalised tensors (not recommended for training).

    Returns
    -------
    tuple[ImageFolder, ImageFolder, ImageFolder]
        The (train, val, test) datasets.

    Raises
    ------
    FileNotFoundError
        If any of the required subdirectories are missing.
    """
    splits = ["train", "val", "test"]
    missing = [
        s for s in splits
        if not os.path.isdir(os.path.join(dataset_root, s))
    ]
    if missing:
        raise FileNotFoundError(
            f"Dataset directory '{dataset_root}' is missing the following "
            f"required subdirectories: {missing}.\n\n"
            "Expected layout:\n"
            "  <dataset_root>/\n"
            "  ├── train/<class_name>/image.jpg\n"
            "  ├── val/<class_name>/image.jpg\n"
            "  └── test/<class_name>/image.jpg\n\n"
            "Please place your dataset in the correct structure before "
            "running training or evaluation."
        )

    datasets = {}
    for split in splits:
        split_path = os.path.join(dataset_root, split)
        datasets[split] = ImageFolder(root=split_path, transform=transform)

    return datasets["train"], datasets["val"], datasets["test"]
