import csv
import json
from datetime import datetime

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []

    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            row["tags"] = row["tags"].strip("[]").split(", ") 
            if len(row["timestamp"]) == 0:
                timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
                row["timestamp"] = timestamp
            jsonArray.append(row)

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

csvFilePath = r'articles.csv'
jsonFilePath = r'articles.json'
csv_to_json(csvFilePath, jsonFilePath)
