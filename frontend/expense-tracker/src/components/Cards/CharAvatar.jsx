import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width} ${height} rounded-full bg-primary text-white flex items-center justify-center ${style}`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
