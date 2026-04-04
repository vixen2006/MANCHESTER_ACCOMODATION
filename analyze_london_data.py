import json
import os

json_path = r'c:\Users\Vaishnavi Trivedi\OneDrive\Desktop\manchester\MANCHESTER_ACCOMODATION\london All Data.json'

def analyze_json():
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    print(f"Top-level keys: {list(data.keys())}")
    
    if 'data' in data:
        items = data['data']
        print(f"Type of 'data': {type(items)}")
        if isinstance(items, list):
            print(f"Number of items in 'data' list: {len(items)}")
            if len(items) > 0:
                 print(f"First item keys: {list(items[0].keys())}")
        elif isinstance(items, dict):
            print(f"Keys in 'data' dict: {list(items.keys())}")
            # Often data is like {"houses": [...]} or something similar
            for k, v in items.items():
                if isinstance(v, list):
                    print(f"Key '{k}' contains a list of length {len(v)}")
                    if len(v) > 0 and isinstance(v[0], dict):
                        print(f"Sample keys from '{k}[0]': {list(v[0].keys())}")

if __name__ == "__main__":
    analyze_json()
