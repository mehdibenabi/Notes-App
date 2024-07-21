import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";
import Card from "../../components/Cards/Card";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import NewCard from "../../components/NewCard/NewCard";
import { useState } from "react";
import Modal from "react-modal";


Modal.setAppElement("#app");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const handleClick = () => {
    setOpenAddEditModal({
      isShown: true,
      type: "add",
      data: null,
    });
  };
  return (
    <>
      <div className="all-home">
        <Navbar />

        <div className="grid-and-btn">
          <div className="cards-grid">
            {/* <Card paragraph={paragraph} title={title} date={date} tags={tags} isPinned={isPinned}/> */}
            <Card isPinned={true} />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>

          <div className="btn-add-card">
            <button className="btn-add" onClick={handleClick}>
              <IoMdAdd className="add-icon" />
            </button>
          </div>
        </div>

        <Modal
          isOpen={openAddEditModal.isShown}
          onReqClose={() => {}}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          }}
          className="Modal-edit-add"
        >
          <NewCard
            className="the-new-card"
            setOpenAddEditModal={setOpenAddEditModal}
            type={openAddEditModal.type}
            data={openAddEditModal.data}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
