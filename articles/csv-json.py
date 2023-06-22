import csv
import textstat
import sys
import json
from datetime import datetime


def cround(number: float):
    if number - int(number) >= 0.5:
        return int(number) + 1
    else:
        return int(number)


def get_stats(file: str):
    reading_ease = -1

    grade_level = []
    text_level = -1

    difficulty = {
        "Very Easy": range(90, 100),
        "Easy": range(80, 89),
        "Fairly Easy": range(70, 79),
        "Standard": range(60, 69),
        "Fairly Difficult": range(50, 59),
        "Difficult": range(30, 49),
        "Very Difficult": range(0, 29)
    }

    with open(file, "r") as mark_file:
        text = mark_file.read()
        reading_ease = int(textstat.flesch_reading_ease(text))

        grade_level.append(textstat.flesch_kincaid_grade(text))
        grade_level.append(textstat.gunning_fog(text))
        grade_level.append(textstat.smog_index(text))
        grade_level.append(textstat.automated_readability_index(text))
        grade_level.append(textstat.coleman_liau_index(text))
        grade_level.append(textstat.linsear_write_formula(text))
        grade_level.append(textstat.dale_chall_readability_score(text))

        text_level = textstat.text_standard(text, float_output=True)

    readability = next(i for i in difficulty if reading_ease in difficulty[i])

    return readability, cround((text_level + sum(grade_level)/7)/2)


def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            row["tags"] = row["tags"].split(", ") 
            row["grade_level"] = get_stats(f"articles/{row['contentUrl']}.html")
            if len(row["timestamp"]) == 0:
                timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                row["timestamp"] = timestamp
            jsonArray.append(row)

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray[::-1], indent=4)
        jsonf.write(jsonString)


if __name__ == "__main__":
    csvFilePath = r'articles.csv'
    jsonFilePath = r'articles.json'
    csv_to_json(csvFilePath, jsonFilePath)
