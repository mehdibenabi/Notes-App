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
import NoCards from "../../components/NoCards/NoCards";
import Toast from "../../components/Toast.jsx/Toast";

Modal.setAppElement("#app");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message:""
  });
  const [userInfo, setUserInfo] = useState("");
  const [notes, setNotes] = useState([]);
  const [isSearch,setIsSearch] = useState(false);


  const showToastMessage = (message,type) =>{
    setShowToastMsg({
      isShown:true,
      message:message,
      type:type,
    });
  } 
  
  const handleOncloseToast = () =>{
    setShowToastMsg({
      isShown:false,
      message:""
    });
  }

  const handleClick = () => {
    setOpenAddEditModal({
      isShown: true,
      type: "add",
      data: null,
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(
        "https://notes-app-back-end-mu.vercel.app/get-user"
      );
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
      const response = await axiosInstance.get(
        "https://notes-app-back-end-mu.vercel.app/get-notes"
      );
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

    const Search = async (query) => {
      try {
        const response = await axiosInstance.get(
          "https://notes-app-back-end-mu.vercel.app/search-notes",
          {
            params: { query },
          }
        );

        if (response.data && response.data.notes) {
          setNotes(response.data.notes);
          setIsSearch(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleSearch = () =>{
      setIsSearch(false);
      getAllNotes();
    }



  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);
  return (
    <>
      <div className="all-home">
        <Navbar
          userInfo={userInfo}
          onSearch={Search}
          handleSearch2={handleSearch}
        />

        <div className="grid-and-btn">
          {notes.length > 0 ? (
            <div className="cards-grid">
              {notes.map((note, index) => {
                return (
                  <Card
                    key={index}
                    note={note}
                    tags={note.tags}
                    // setOpenAddEditModal={setOpenAddEditModal}
                    onEdit={() => {
                      EditNote(note);
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                  />
                );
              })}
            </div>
          ) : (
            <NoCards isSearch={isSearch}/>
          )}

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
            showToastMessage={showToastMessage}
          />
        </Modal>

        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleOncloseToast}
        />
      </div>
    </>
  );
};

export default Home;
