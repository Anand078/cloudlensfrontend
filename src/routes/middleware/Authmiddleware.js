import React from "react";
import VerticalLayout from "components/VerticalLayout";

const Authmiddleware = (props) => {

  return (
    <React.Fragment>
      <VerticalLayout>{props.children}</VerticalLayout>
    </React.Fragment>);
};

export default Authmiddleware;
