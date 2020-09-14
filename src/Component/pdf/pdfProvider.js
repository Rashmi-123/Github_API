import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

const pdfProvider = (props) =>{

    const csvData = [];
    for (const key in props.data) {
       if (props.data.hasOwnProperty(key)) {
           csvData.push({"gitfield":key,"count":props.data[key]})
       }
   }
 
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["Repository Fields", "Count"]];

    const data = csvData.map(elt=> [elt.gitfield, elt.count]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }


    return (
      <div>
        <button onClick={exportPDF}>Export To PDF</button>
      </div>
    );
  
}

export default pdfProvider;