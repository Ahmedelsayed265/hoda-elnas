import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";
import DataLoader from "./../ui/DataLoader";
import useUserLocation from "../../hooks/useUserLocation";
import Plan from "./Plan";
import SubscribeModal from "./SubscribeModal";

const LibirarySubscribe = () => {
  const { t } = useTranslation();
  const locationData = useUserLocation();
  const location = locationData?.country;
  const { lang } = useSelector((state) => state.language);
  const [plans, setPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/learningcenter/list_library_pricingplans/"
        );
        if (response.status === 200 || response.status === 201) {
          setPlans(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang]);

  const subscribe = (planeId) => {
    setPlanId(planeId);
    setShowModal(true);
  };

  return (
    <section className="libirary_subscribe">
      <div className="container">
        <div className="row m-0">
          <div className="col-12">
            <div className="title_section">
              <h1>{t("sounds.hodaElnasLibirarySubscribe")}</h1>
              <p>{t("sounds.hodaElnasLibirarySubscribeDesc")}</p>
            </div>
          </div>
        </div>
        {loading ? (
          <DataLoader minHeight="300px" />
        ) : (
          <div className="row m-0 justify-content-center mt-4">
            {plans?.map((plan) => (
              <Plan
                plan={plan}
                location={location}
                key={plan.id}
                onSubscribe={subscribe}
              />
            ))}
          </div>
        )}
      </div>
      <SubscribeModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default LibirarySubscribe;
