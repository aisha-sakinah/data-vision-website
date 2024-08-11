export function OutputDataItem({ id, data, deleteData }) {
    return (
        <li key={data.id}>
            <div className="output-container">
                <label className="output-label">Business Details</label>
                <div className="output-box">{data}</div>
                <button onClick={() => deleteData(id)} className="delete-btn">Delete</button>
            </div>  
        </li>
    )
}