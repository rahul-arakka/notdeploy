import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Alert = () => {
  const context = useContext(noteContext);
  const { alert } = context;

  console.log("Alert");
  return (
    <div>
      {/* setTimeout(()=> {
        }, timeout); */}
      <div style={{ height: "50px" }}>
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{alert.message}</strong> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
