"""
ai/xray/model.py

ResNet18-based X-ray classification model.

Usage
-----
    from ai.xray.model import create_model

    model = create_model(num_classes=2)
"""

import torch.nn as nn
from torchvision import models
from torchvision.models import ResNet18_Weights


def create_model(num_classes: int) -> nn.Module:
    """
    Build a ResNet18 model for X-ray classification.

    The model is initialised with pretrained ImageNet weights and its
    final fully-connected layer is replaced with a new linear layer whose
    output size equals ``num_classes``.

    Parameters
    ----------
    num_classes : int
        Number of target classes (e.g. 2 for binary classification).

    Returns
    -------
    nn.Module
        A ResNet18 model ready for fine-tuning or inference.
    """
    model = models.resnet18(weights=ResNet18_Weights.DEFAULT)

    # Replace the classifier head.
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, num_classes)

    return model
