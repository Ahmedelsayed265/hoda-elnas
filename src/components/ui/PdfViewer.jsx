import React from "react";

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div>
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        title="pdf"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
