import React from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

const Faqs = () => {
  const faqs = useSelector((state) => state.faqs.faqs);
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section className="terms_section">
      <div className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-lg-10 col-12">
            <Accordion defaultActiveKey="0">
              {sortedFaqs.map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.order.toString()}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    <p>{faq.answer}</p>
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

export default Faqs;
