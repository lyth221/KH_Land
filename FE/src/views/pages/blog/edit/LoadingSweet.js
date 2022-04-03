import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import "./loading.css";
const LoadingSweet = () => {
  return (
    <SweetAlert
      showCancel={false}
      onConfirm={()=>  null}
      onCancel={()=>  null}
      showConfirm={false}
      title=""
      style={{ zIndex: 1000 }}
    >
      <div className="loadingio-spinner-eclipse-1w3i2j2fvp1">
        <div className="ldio-172q2c5ufo">
          <div></div>
        </div>
      </div>
      <h3>Processing...</h3>
    </SweetAlert>
  );
};

export default LoadingSweet;
