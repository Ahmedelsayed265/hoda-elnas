import React from "react";
import pdf from "../../../../assets/images/intro.pdf";

const ReportView = () => {
  return (
    <section className="course_reports">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2 pt-3">
            <iframe src={pdf} title="PDF Viewer"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportView;
