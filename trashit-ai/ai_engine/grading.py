def assign_grade(condition, usability_score):
    if condition == "clean" and usability_score >= 0.8:
        return "A"
    elif usability_score >= 0.6:
        return "B"
    else:
        return "C"
