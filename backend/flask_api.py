import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from analyse_data import analyse_data  # Import the analysis function

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/', methods=['POST'])
def analyse_data_route():
    # Receive the JSON data from the POST request
    data = request.json
    
    # Convert the incoming JSON data to a string format required by the analysis function
    json_data_str = json.dumps(data)

    # Call the analysis function with the JSON data
    result = analyse_data(json_data_str)

    # Return the analysis result as a JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)



# from flask import Flask, request, jsonify
# import json

# app = Flask(__name__)

# @app.route('/', methods=['POST'])
# def analyse_data():
#     data = request.json  # Receive the JSON data from React
#     # Perform your data analysis here by calling your script or logic
#     # For example:
#     result = perform_analysis(data)  # Replace this with your actual analysis function

#     return jsonify(result)  # Return the result as a JSON response

# def perform_analysis(data):
#     # Mock analysis function. Replace with your actual data analysis code.
#     analysis_result = {
#         "summary": f"Analyzed {len(data)} items.",
#         "details": "Detailed analysis output..."
#     }
#     return analysis_result

# if __name__ == '__main__':
#     app.run(debug=True)
