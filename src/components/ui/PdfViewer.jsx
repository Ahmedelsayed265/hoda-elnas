import React from "react";

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div>
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        title="pdf"
        frameborder="0"
        className="w-100 h-100"
      ></iframe>
    </div>
  );
};

export default PdfViewer;
