import React, { useEffect } from "react";
import './toast.css'
import { AiOutlineCheck } from "react-icons/ai";
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({isShown,type,message,onClose}) => {

    useEffect(()=>{
    const timeOutId = setTimeout(()=>{
     onClose();
    },3000);
    return ()=>{
        clearTimeout(timeOutId);
    }
    },[onClose])

  return (
    <div className={isShown ? "Toast " : "Toast-isnt-show"}>
      <div className={type === "delete" ? "custom-class" : "custom-class2"}>
        <div className="side-sghira">
          <div
            className={
              type === "delete"
                ? "custom-size-flex-class"
                : "custom-size-flex-class2"
            }
          >
            {
              (type === "delete" ? (
                <MdDeleteOutline className="lu2" />
              ) : (
                <AiOutlineCheck className="lu" />
              ))
            }
          </div>

          <p className="msg-toast">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast