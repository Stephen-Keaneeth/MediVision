
import asyncio
from fastapi import UploadFile
from backend.main import analyze_xray
from PIL import Image
import io

async def test():
    # create dummy image bytes
    img = Image.new('RGB', (224, 224), color = 'white')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_bytes = img_byte_arr.getvalue()
    
    class MockUploadFile:
        async def read(self):
            return img_bytes
            
    file = MockUploadFile()
    try:
        res = await analyze_xray(file)
        print('SUCCESS!')
        print(res['diagnosis'])
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(test())
