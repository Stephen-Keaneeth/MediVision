
import sys
import os
import torch
from PIL import Image
import numpy as np
from ai.xray.model import create_model
from ai.preprocessing.transforms import get_xray_transform
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
def test():
    try:
        img = Image.new('RGB', (224, 224), color = 'white')
        transform = get_xray_transform()
        tensor = transform(img).unsqueeze(0)
        model = create_model(num_classes=2)
        model.eval()
        target_layers = [model.layer4[-1]]
        cam = GradCAM(model=model, target_layers=target_layers)
        targets = [ClassifierOutputTarget(1)]
        grayscale_cam = cam(input_tensor=tensor, targets=targets)
        print('Success! CAM shape:', grayscale_cam.shape)
    except Exception as e:
        import traceback
        traceback.print_exc()
test()
