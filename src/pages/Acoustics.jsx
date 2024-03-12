import React from 'react'
import AudioCard from '../components/layout/AudioCard'
import SectionHeader from '../components/layout/SectionHeader'
import { useTranslation } from 'react-i18next';

const Acoustics = () => {
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    }
  ]
  return (
    <>
    <SectionHeader pageName={t("audios")} backLinks={backLinks} />
    <section className="courses">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="search">
              <form action="" className="inner_search__form">
                <input type="text" placeholder="إبحث عن كورس" />
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <AudioCard />
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Acoustics