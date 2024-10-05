import React from "react";

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
