import torchxrayvision as xrv
import torchvision
import torch
from PIL import Image
import numpy as np
import glob

# Use a test image from the dataset
img_path = 'data/xray/test/PNEUMONIA/'
files = glob.glob(img_path + '*.jpeg')
if not files:
    print('No test images found.')
else:
    file = files[0]
    img = Image.open(file).convert('L')
    img_arr = np.array(img)
    img_arr = xrv.datasets.normalize(img_arr, 255)
    img_arr = img_arr[None, ...]
    transform = torchvision.transforms.Compose([xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)])
    img_arr = transform(img_arr)
    tensor = torch.from_numpy(img_arr).unsqueeze(0)
    
    model = xrv.models.DenseNet(weights='densenet121-res224-all')
    model.eval()
    with torch.no_grad():
        preds = model(tensor).cpu().numpy()[0]
    
    pathology_scores = dict(zip(model.pathologies, preds))
    print(f'Test image: {file}')
    print(f'Pneumonia score: {pathology_scores.get("Pneumonia", 0.0)}')
    for k,v in sorted(pathology_scores.items(), key=lambda x:x[1], reverse=True)[:3]:
        print(f'{k}: {v}')
