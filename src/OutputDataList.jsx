import { OutputDataItem } from "./OutputDataItem"
import { useState } from "react";

export function OutputDataList({ datas, deleteData }) {
    const[analysisResult, setAnalysisResult] = useState([])

    // connect to flask backend
    const analyseData = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ data: data })
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonResult = await response.json();

            // Convert the JSON result to formatted text
            const formattedText = formatJsonToText(jsonResult);
            setAnalysisResult(formattedText);
            console.log('Set analysis result successful')
        } catch (error) {
            console.error('Error analyzing data:', error);
            setAnalysisResult('Error analyzing data');
        }
    };

    // Function to convert JSON object to formatted text
    const formatJsonToText = (jsonObject) => {
        return Object.entries(jsonObject).map(([key, value]) => {
            // Capitalize the key and format it
            const formattedKey = key.replace(/_/g, ' ')  // Replace underscores with spaces
                                    .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize each word

            if (typeof value === 'object' && !Array.isArray(value)) {
                // Handle nested objects (for revenue_by_category)
                return `${formattedKey}:\n${Object.entries(value).map(([subKey, subValue]) => 
                    `  ${subKey}: RM${subValue.toLocaleString()}`
                ).join('\n')}`;
            } else if (Array.isArray(value)) {
                // Handle arrays (if needed)
                return `${formattedKey}:\n${value.map(item => `  - ${item}`).join('\n')}`;
            }
            // Format simple values
            return `${formattedKey}: RM${value.toLocaleString()}`;
        }).join('\n');
    };

    return (
        <>
        <ul>
            {datas.map(data => {
                return (
                    <OutputDataItem 
                        id={data.id} 
                        data={data.data} 
                        deleteData={deleteData}
                    />
                )
            })} 
        </ul>
        <div className="analyse-btn-container">
            <button onClick={() => analyseData(datas.map(d => d.data))} className="analyse-btn">Analyse Data</button>
        </div>

        <div className="output-container">
            <label className="output-label">Analysis Results</label>
            <pre className="analyse-box">{analysisResult}</pre>
        </div> 
        </>
    )
}


// const analyseData = async (data) => {
//     try {
//         const response = await fetch('http://localhost:5173/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ data: data })
//         });
//         const result = await response.json();
//         setAnalysisResult(result);
//     } catch (error) {
//         console.error('Error analyzing data:', error);
//     }
// };

// // Function to convert JSON object to formatted text
// const formatJsonToText = (jsonObject) => {
//     // Define a mapping for the specific keys you want to format
//     const keyMapping = {
//         total_revenue: 'Total Revenue',
//         average_revenue: 'Average Revenue',
//         revenue_by_category: 'Revenue by Category'
//     };

//     // Map over the entries in the JSON object and format them
//     return Object.entries(jsonObject).map(([key, value]) => {
//         // Check for key mapping
//         if (keyMapping[key]) {
//             if (typeof value === 'object' && !Array.isArray(value)) {
//                 // Handle nested objects (for revenue_by_category)
//                 return `${keyMapping[key]}:\n${Object.entries(value).map(([cat, rev]) => `  ${cat}: RM${rev.toLocaleString()}`).join('\n')}`;
//             } else {
//                 // Handle simple values
//                 return `${keyMapping[key]}: RM${value.toLocaleString()}`;
//             }
//         }
//         return '';  // Return empty string if key doesn't match
//     }).filter(line => line.length > 0).join('\n');
// };