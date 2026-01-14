BASE_PRICE = {
    "PCB": 250,
    "Metal": 180,
    "Plastic": 30,
    "Mixed E-waste": 90
}

GRADE_MULTIPLIER = {
    "A": 1.0,
    "B": 0.75,
    "C": 0.5
}

MATERIAL_VALUE = {
    "Gold": 5000,
    "Copper": 700,
    "Lithium": 1200,
    "Aluminum": 200,
    "Iron": 100,
    "Plastic": 30,
    "Silicon": 150
}

def material_bonus(materials):
    bonus = 0
    for m in materials:
        bonus += MATERIAL_VALUE.get(m["material"], 0) * m["confidence"] * 0.01
    return bonus

def predict_price(waste_type, grade, materials):
    base = BASE_PRICE.get(waste_type, 50)
    multiplier = GRADE_MULTIPLIER[grade]
    bonus = material_bonus(materials)

    final = (base * multiplier) + bonus

    return {
        "price": round(final, 2),
        "range": [round(final*0.9,2), round(final*1.1,2)],
        "breakdown": {
            "base_price": base,
            "grade_multiplier": multiplier,
            "material_bonus": round(bonus, 2)
        }
    }
