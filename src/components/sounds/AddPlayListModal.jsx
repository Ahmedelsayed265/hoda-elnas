import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import axios from "./../../util/axios";
import { toast } from "react-toastify";

const AddPlayListModal = ({
  showModal,
  setShowModal,
  setPlayLists,
  setPlayList,
  forEditPlayList
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");

  useEffect(() => {
    if (forEditPlayList) {
      setTitle(forEditPlayList.listname);
    }
  }, [forEditPlayList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = forEditPlayList?.id
        ? `/members/Edit_audio_list_name/${forEditPlayList.id}/`
        : "/members/Create_user_audio_list/";
      const res = await axios.request({
        url: url,
        method: forEditPlayList?.id ? "PUT" : "POST",
        data: {
          list_name: title
        }
      });
      if (res.status === 200 || res.status === 201) {
        setShowModal(false);
        setTitle("");
        forEditPlayList?.id
          ? setPlayLists((prev) => {
              return prev.map((list) => {
                if (list.id === forEditPlayList.id) {
                  return res?.data?.object;
                }
                return list;
              });
            })
          : setPlayLists((prevLists) => [...prevLists, res?.data?.object]);
        forEditPlayList?.id
          ? toast.success(t("sounds.playListUpdated"))
          : toast.success(t("sounds.playListCreated"));
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setPlayList({});
        setTitle("");
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>
          {forEditPlayList?.id
            ? t("sounds.renamePlayList")
            : t("sounds.createPlayList")}
        </h6>
      </Modal.Header>
      <Modal.Body className="subcribeModal">
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
          <SubmitButton
            name={forEditPlayList?.id ? t("sounds.rename") : t("sounds.create")}
            loading={loading}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPlayListModal;
