def verify_ai(materials):
    if not materials:
        return False
    avg_conf = sum(m["confidence"] for m in materials) / len(materials)
    return avg_conf >= 0.6
