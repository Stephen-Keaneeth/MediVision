
import torchxrayvision as xrv
import skimage
import torch
import torchvision
print('torchxrayvision version:', xrv.__version__)
model = xrv.models.DenseNet(weights='densenet121-res224-all')
print('Pathologies:', model.pathologies)
