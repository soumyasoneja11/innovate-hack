INDUSTRY_MAP = {
    "Gold": ["Precious Metal Refiners"],
    "Copper": ["Wire & Cable Manufacturers"],
    "Plastic": ["Polymer Recycling Units"],
    "Lithium": ["Battery Recyclers"],
    "Aluminum": ["Metal Smelters"]
}

def match_industries(materials):
    buyers = set()
    for m in materials:
        buyers.update(INDUSTRY_MAP.get(m["material"], []))
    return list(buyers)
