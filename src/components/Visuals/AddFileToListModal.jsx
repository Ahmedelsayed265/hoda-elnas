import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "./../../util/axios";
import { toast } from "react-toastify";
import SubmitButton from "../ui/form-elements/SubmitButton";
import library from "../../assets/images/lib.svg";
import headPhone from "../../assets/images/Headphones.svg";
import DataLoader from "../ui/DataLoader";

const AddFileToListModal = ({ setShowModal, showModal, file }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [playLists, setPlayLists] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/members/Create_user_resources_list/", {
        list_name: title
      });
      if (res.status === 200 || res.status === 201) {
        const secondRes = await axios.put(
          `/members/Add_resouces_to_user_list/${res?.data?.object?.id}/`,
          {
            resource_id: file?.id
          }
        );
        if (secondRes.status === 200 || secondRes.status === 201) {
          setShowModal(false);
          setTitle("");
          toast.success(t("sounds.audioAddedToPlayList"));
        }
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAudioToList = async () => {
    try {
      if (!selectedList) {
        toast.error(t("sounds.selectPlayList"));
        return;
      }
      setLoading(true);
      const res = await axios.put(
        `/members/Add_resouces_to_user_list/${selectedList}/`,
        {
          resource_id: file?.id
        }
      );
      if (res.status === 200 || res.status === 201) {
        setShowModal(false);
        setSelectedList(null);
        toast.success(t("sounds.audioAddedToPlayList"));
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoader(true);
        const libraryResponse = await axios.get(`/members/List_resources_lists/`);
        if (libraryResponse.status === 200) {
          setPlayLists(libraryResponse?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setTitle("");
        setShowForm(false);
        setSelectedList(null);
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {showForm && (
          <button onClick={() => setShowForm(false)} className="back-btnNN">
            <i className="fa-regular fa-angle-right"></i>
          </button>
        )}
      </Modal.Header>
      <Modal.Body className="addAudioToPlayList">
        {showForm ? (
          <form onSubmit={handleSubmit} className="form-ui gap-1">
            <div className="input-field">
              <label htmlFor="title">{t("sounds.title")}</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("dashboard.writeHere")}
              />
            </div>
            <SubmitButton name={t("sounds.create")} loading={loading} />
          </form>
        ) : (
          <>
            {loader ? (
              <DataLoader minHeight="120px" />
            ) : (
              <>
                {playLists.length === 0 ? (
                  <div className="noPlayLists">
                    <h6>{t("sounds.noPlayLists")}</h6>
                    <button onClick={() => setShowForm(true)}>
                      {t("sounds.createPlayList")}
                    </button>
                  </div>
                ) : (
                  <div className="row m-0">
                    <div className="col-12 p-2 d-flex justify-content-start">
                      <button
                        onClick={() => setShowForm(true)}
                        className="add-btn"
                      >
                        <i className="fa-regular fa-plus"></i>
                        {t("sounds.createPlayList")}
                      </button>
                    </div>
                    {playLists.map((list) => (
                      <div className="col-lg-6 col-12 p-2" key={list?.id}>
                        <label htmlFor={list?.id} className="list_check_box">
                          <input
                            type="radio"
                            name="list"
                            id={list?.id}
                            value={list?.id}
                            checked={selectedList === list?.id}
                            onChange={() => setSelectedList(list?.id)}
                          />
                          <div className="content">
                            <div className="icon">
                              <img src={library} alt="library" />
                            </div>
                            <div className="contentt">
                              <h6>{list.listname}</h6>
                              <p>
                                <img src={headPhone} alt="headphone" />
                                {list?.files_count} {t("sounds.file")}
                              </p>
                              <p>{list?.date_create}</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                    <div className="col-12 p-2">
                      <SubmitButton
                        name={t("sounds.add")}
                        loading={loading}
                        onClick={handleAddAudioToList}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddFileToListModal;
