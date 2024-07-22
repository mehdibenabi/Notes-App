import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";
import Card from "../../components/Cards/Card";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import NewCard from "../../components/NewCard/NewCard";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";

Modal.setAppElement("#app");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState("");
  const [notes, setNotes] = useState([]);

  const handleClick = () => {
    setOpenAddEditModal({
      isShown: true,
      type: "add",
      data: null,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (!response.data.error) {
        console.log(response.data.user);
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");
      if (!response.data.error) {
        console.log(response.data.data);
        setNotes(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditNote = (note) =>{
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: note,
    });
  }

  const onDelete = async (note) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${note._id}`);
      if (!response.data.error) {
        console.log(response.data.data);
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);
  return (
    <>
      <div className="all-home">
        <Navbar userInfo={userInfo} />

        <div className="grid-and-btn">
          <div className="cards-grid">
            {/* <Card paragraph={paragraph} title={title} date={date} tags={tags} isPinned={isPinned}/> */}
            {notes.map((note,index) => {
              return (
                <Card
                  key={index}
                  note={note}
                  tags={note.tags}
                  // setOpenAddEditModal={setOpenAddEditModal}
                  onEdit={()=>{EditNote(note)}}
                  onDelete={()=>{onDelete(note)}}
                  getAllNotes={getAllNotes}
                />
              );
            })}
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
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
