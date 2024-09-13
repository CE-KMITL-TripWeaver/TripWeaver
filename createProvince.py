import pandas as pd
from pymongo import MongoClient

# อ่านไฟล์ CSV
df = pd.read_csv('geocode.csv')

client = MongoClient('mongodb://tripweaver:I0heIrF4h9D6@103.245.164.53:27017/tripweaver?authSource=admin')
db = client['tripweaver']
table = db['subDistricts']

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
