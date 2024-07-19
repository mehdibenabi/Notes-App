import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './home.css'
import Card from '../../components/Cards/Card'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import NewCard from '../../components/NewCard/NewCard';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <div className="all-home">
        <Navbar />

        <div className="grid-and-btn">
          <div className="cards-grid">
            {/* <Card paragraph={paragraph} title={title} date={date} tags={tags} isPinned={isPinned}/> */}
            <Card isPinned={true}/>
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

        {isClicked && (<div className={isClicked ? "new-card-sec" : null}>
          <NewCard className="the-new-card" setIsClicked={setIsClicked}/>
        </div>)}
      </div>
    </>
  );
}

export default Home