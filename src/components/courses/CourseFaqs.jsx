import React from "react";
import { Accordion } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CourseFaqs = ({ faqs }) => {
  const { t } = useTranslation();
  if (!faqs || !Array.isArray(faqs)) {
    return null;
  }
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
  const firstItemEventKey =
    sortedFaqs.length > 0 ? sortedFaqs[0].order.toString() : null;

  return (
    <section className="course_faqs">
      <div className="container">
        <h3 className="title">{t("faqs")}</h3>
        <div className="row m-0 justify-content-center">
          <div className="col-lg-10 col-12">
            <Accordion defaultActiveKey={firstItemEventKey}>
              {sortedFaqs.map((faq) => (
                <Accordion.Item
                  key={faq?.order}
                  eventKey={faq?.order?.toString()}
                >
                  <Accordion.Header>{faq?.question}</Accordion.Header>
                  <Accordion.Body>
                    <p>{faq?.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseFaqs;
