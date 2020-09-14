import React from "react";
import { CSVLink, CSVDownload } from "react-csv";

const csvExort = (props) =>{
    
    const CSVTable = [
        ["Git Fields","Count"]
    ]

    for (const key in props.data) {
        if (props.data.hasOwnProperty(key)) {
          CSVTable.push([key,props.data[key]])
        }
    }
    
    return(
        <div>
             <CSVLink data={CSVTable}>Export to Excel</CSVLink>
                <CSVDownload data={CSVTable} target="_blank" />
        </div>
    )
}

export default csvExort;