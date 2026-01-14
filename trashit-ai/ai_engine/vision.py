import google.generativeai as genai
from PIL import Image
import io, json, re, os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def analyze_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))

    prompt = """
You are an expert e-waste recycling analyst.

Return ONLY valid JSON.

{
  "waste_type": "PCB | Plastic | Metal | Mixed E-waste",
  "condition": "clean | mixed | damaged",
  "usability_score": 0.0,
  "materials_detected": [
    {
      "material": "Copper | Gold | Aluminum | Plastic | Lithium | Iron | Silicon",
      "confidence": 0.0
    }
  ]
}
"""

    response = model.generate_content([prompt, image])
    text = response.text.strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("Invalid AI response")

    return json.loads(match.group())
