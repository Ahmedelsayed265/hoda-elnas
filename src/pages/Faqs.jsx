import React from "react";
import SectionHeader from "./../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const Faqs = () => {
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    }
  ];
  return (
    <>
      <SectionHeader pageName={t("faqs")} backLinks={backLinks} />
      <section className="terms_section">
        <div className="container">
          <div className="row m-0 justify-content-center">
            <div className="col-lg-10 col-12">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    كيف يمكنني الوصول إلى المحتوى على المنصة؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      يمكنك الوصول إلى المحتوى عن طريق التسجيل في حساب على
                      المنصة وشراء اشتراك أو باقة.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    هل يمكنني الحصول على الوصول إلى المحتوى عندما أكون مشتركًا؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، يمكنك الوصول إلى جميع المحتوى المتاح على المنصة بمجرد
                      الاشتراك والدفع.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>هل يمكنني إلغاء اشتراكي؟</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، يمكنك إلغاء اشتراكك في أي وقت. ستظل الخدمة نشطة حتى
                      نهاية فترة الاشتراك الحالية.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    هل هناك فترة تجريبية مجانية؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، نقدم فترة تجريبية مجانية للمستخدمين الجدد لتجربة
                      المنصة قبل الاشتراك.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    هل يمكنني الوصول إلى المحتوى على المنصة عبر الهواتف الذكية؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، يمكنك الوصول إلى المنصة وجميع المحتوى عبر موقعنا
                      الإلكتروني المتوافق مع الهواتف الذكية.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    هل يتوفر دعم فني إذا واجهت مشكلة؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، لدينا فريق دعم فني متاح لمساعدتك في حال واجهتك أي
                      مشكلة أو استفسار.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                    هل يتوفر المحتوى بلغات أخرى؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نحن نركز حاليًا على المحتوى باللغة العربية، ولكن قد نضيف
                      لغات أخرى في المستقبل.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                    هل يمكنني مشاركة حسابي مع الآخرين؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      لا، يجب على كل مستخدم الاشتراك في حسابه الخاص للوصول إلى
                      المحتوى. مشاركة الحساب تعتبر مخالفة لشروط الاستخدام.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                    هل يتوفر لديكم برنامج شراكة للمدرسين أو المؤسسات؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      نعم، لدينا برنامج شراكة يمكن للمدرسين والمؤسسات الانضمام
                      إليه للحصول على خصومات ومزايا إضافية.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="9">
                  <Accordion.Header>
                    كيف يمكنني الاتصال بفريق الدعم الفني؟
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      يمكنك الاتصال بفريق الدعم الفني عن طريق البريد الإلكتروني
                      <Link to="mailto:info@hodallnas.com">
                        info@hodallnas.com
                      </Link>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faqs;
