FROM python:3.10-slim-bookworm

# Set environment variables to prevent Python from writing .pyc files
# and to ensure stdout and stderr are unbuffered.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies required by opencv, easyocr, and torch
RUN apt-get update --allow-releaseinfo-change && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend /app/backend

# Copy the .env file if it exists, or let it run without one
COPY .env* /app/

# Expose the port
EXPOSE 8000

# Run the FastAPI server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
