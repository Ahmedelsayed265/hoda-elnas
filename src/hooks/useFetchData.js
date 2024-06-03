import { useEffect, useState } from "react";
import axios from "axios";

import { setCourses } from "../redux/slices/courses";
import { setHighLightedCourses } from "../redux/slices/highlightedCourses";
import { setHomeIntro } from "../redux/slices/homeIntro";
import { setStatistics } from "../redux/slices/statistics";
import { setWhyUs } from "../redux/slices/whyUs";
import { setFaqs } from "../redux/slices/faqs";
import { setTermsConditions } from "../redux/slices/termsConditions";
import { setPrivacy } from "../redux/slices/privacy";
import { setGrantees } from "../redux/slices/granteesObj";
import { setBody, setHeader } from "../redux/slices/comparsion";
import { setFeedBacks } from "../redux/slices/feedBacks";
import { setTitles } from "../redux/slices/sectionsTitles";
import { setHighLightedAudios } from "../redux/slices/highlightedAudios";
import { setPartners } from "../redux/slices/partners";

const useFetchData = (dispatch, lang) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // end points
        const endpoints = [
          "/learningcenter/list_courses/",
          "/learningcenter/list_courses/?highlight=true",
          "/learningcenter/list_sound_files/?highlight=true",
          "/landingpages/List_web_header/",
          "/landingpages/List_statistics_section/",
          "/landingpages/List_why_you_join_us/",
          "/landingpages/List_FAQ/",
          "/landingpages/List_TermsAndConditions/",
          "/landingpages/List_TermsAndConditions/",
          "/landingpages/List_grantees/",
          "/landingpages/List_comparsion_header/",
          "/landingpages/List_comparsion_body/",
          "/landingpages/List_reviews/?type=audio&status=published",
          "/landingpages/List_sections_title/",
          "/landingpages/List_partner/"
        ];

        // fetch all
        const responses = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint))
        );

        // dispatch
        responses.forEach((response, index) => {
          switch (index) {
            case 0:
              dispatch(setCourses(response?.data?.message));
              break;
            case 1:
              dispatch(setHighLightedCourses(response?.data?.message));
              break;
            case 2:
              dispatch(setHighLightedAudios(response?.data?.message));
              break;
            case 3:
              dispatch(setHomeIntro(response?.data?.message[0]));
              break;
            case 4:
              dispatch(setStatistics(response?.data?.message));
              break;
            case 5:
              dispatch(setWhyUs(response?.data?.message));
              break;
            case 6:
              dispatch(setFaqs(response?.data?.message));
              break;
            case 7:
              dispatch(setTermsConditions(response?.data?.message));
              break;
            case 8:
              dispatch(setPrivacy(response?.data?.message));
              break;
            case 9:
              dispatch(setGrantees(response?.data?.message[0]));
              break;
            case 10:
              dispatch(setHeader(response?.data?.message[0]));
              break;
            case 11:
              dispatch(setBody(response?.data?.message));
              break;
            case 12:
              dispatch(setFeedBacks(response?.data?.message));
              break;
            case 13:
              dispatch(setTitles(response?.data?.message[0]));
              break;
            case 14:
              dispatch(setPartners(response?.data?.message));
              break;
            default:
              break;
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, lang]);

  return loading;
};

export default useFetchData;
