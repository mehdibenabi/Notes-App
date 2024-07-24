import React from "react";
import "./NoCards.css";
import noCards from "../../assets/images/noCards.svg";
import noData from "../../assets/images/noData.svg";
const NoCards = ({ isSearch }) => {
  return (
    <div className="sec-no-cords">
      <div className="section-sghira">
        <img
          src={isSearch ? noData : noCards}
          alt="no-cards"
          className="no-cards-img"
        />
        <p className="no-cards-text">
          
          {isSearch ? "Oops no notes found matching your search. " : "Start creating yout first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders Lets get started!" }
        </p>
      </div>
    </div>
  );
};

export default NoCards;
