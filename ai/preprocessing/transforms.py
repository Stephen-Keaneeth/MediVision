"""
ai/preprocessing/transforms.py

Reusable image transformations for the X-ray classification pipeline.

The same transform is used during both training and inference so that
the preprocessing is always consistent.

ImageNet mean/std are used because the initial model uses pretrained
ResNet18 weights that were trained on ImageNet.
"""

from torchvision import transforms

# ResNet18 expects 224x224 input.
RESNET_INPUT_SIZE = 224

# Standard ImageNet normalisation values.
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]


def to_rgb(img):
    """Convert a PIL Image to RGB (needed for picklability on Windows)."""
    return img.convert("RGB")


def get_xray_transform() -> transforms.Compose:
    """
    Return the standard preprocessing pipeline for X-ray images.

    Steps
    -----
    1. Resize the shorter edge to RESNET_INPUT_SIZE, then centre-crop.
    2. Convert to RGB (handles grayscale DICOM-derived PNGs/JPGs).
    3. Convert PIL Image to a float32 tensor in [0, 1].
    4. Normalise using ImageNet statistics.

    Returns
    -------
    transforms.Compose
        A composed torchvision transform ready for use with a Dataset or
        a single PIL Image.
    """
    return transforms.Compose([
        transforms.Resize(RESNET_INPUT_SIZE),
        transforms.CenterCrop(RESNET_INPUT_SIZE),
        transforms.Lambda(to_rgb),
        transforms.ToTensor(),
        transforms.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
    ])
