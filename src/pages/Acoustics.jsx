import React from "react";
import AudioCard from "../components/layout/AudioCard";

const Acoustics = () => {
  return (
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
  );
};

export default Acoustics;
