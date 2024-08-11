import pandas as pd
import json

def analyse_data(json_data):
    # Parse the JSON data
    data = json.loads(json_data)

    # Check data -----------------------------------------------------------------
    
    # Check if the data is a list or dictionary and determine its length
    if isinstance(data, list):
        if len(data) < 3:
            return {"error": "Not enough data"}
    elif isinstance(data, dict):
        if len(data) < 3:
            return {"error": "Not enough data"}
    else:
        return {"error": "Invalid data format"}

    # Function to check if 'RM' is present in any value
    def contains_rm(data):
        if isinstance(data, dict):
            return any('RM' in str(value) for value in data.values())
        elif isinstance(data, list):
            return any('RM' in str(item) for item in data)
        return 'RM' in str(data)

    # Check if 'RM' is present in the data
    if not contains_rm(data):
        return {"error": "Incorrect data"}

    # ----------------------------------------------------------------------------

    # Function to clean and convert revenue to integer
    def parse_revenue(revenue_str):
        # Remove 'RM' and 'per day', and commas
        return int(revenue_str.replace('RM', '').replace('per day', '').replace(',', '').strip())

    # Convert the list of dictionaries to a DataFrame
    df = pd.DataFrame(data)

    # Apply the parse_revenue function to the Revenue column
    df['Revenue'] = df['Revenue'].apply(parse_revenue)

    # Basic Analysis
    total_revenue = df['Revenue'].sum()
    average_revenue = df['Revenue'].mean()
    revenue_by_category = df.groupby('Category')['Revenue'].sum()

    # Prepare the results in a dictionary
    result = {
        "total_revenue": f"RM{total_revenue:,.2f}",
        "average_revenue": f"RM{average_revenue:,.2f}",
        "revenue_by_category": revenue_by_category.to_dict()
    }

    # Display Results
    print("Total Revenue: RM{:,.2f}".format(total_revenue))
    print("Average Revenue: RM{:,.2f}".format(average_revenue))
    print("\nRevenue by Category:")
    print(revenue_by_category)

    return result


# Sample input data in JSON format
# json_data = '''
# [
#     {"Name": "Auntie Annes", "Category": "Dessert", "Revenue": "RM5000 per day"},
#     {"Name": "Home Bakery", "Category": "Pastries", "Revenue": "RM5,000 per day"},
#     {"Name": "KFC", "Category": "Fast Food", "Revenue": "RM20,000 per day"}
# ]