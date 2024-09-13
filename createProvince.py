import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# อ่านไฟล์ CSV
df = pd.read_csv('geocode.csv')

client = MongoClient(os.getenv('MONGDB_URI'))
print(os.getenv('MONGDB_URI'))
db = client['tripweaver']
table = db['subdistricts']

zip_codes = df['zip_code']
geo_codes = df['geo_code']

subDistrict_th = df['subDistrict_th']

for geo_codes, zip_code, subDistrict_th in zip(geo_codes, zip_codes, subDistrict_th):

    document = table.find_one({"name": subDistrict_th})

    if(not document): #not found in db
        print(f"Added ISO Code: {geo_codes}, District: {subDistrict_th}")
        body = {
            "districtRefID": zip_code,
            "idRef": geo_codes,
            "name": subDistrict_th
        }
        table.insert_one(body)
