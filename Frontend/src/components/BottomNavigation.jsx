import PropTypes from "prop-types";
import React from "react";

export const BottomNavigation = ({
  bottomnavigationVariant,
  className,
  overlapGroupClassName,
}) => {
  return (
    <div className={`bottom-navigation ${className}`}>
      <div className={`overlap-group ${overlapGroupClassName}`}>
        <img className="rectangle" alt="Rectangle" />

        <img className="img" alt="Rectangle" />

        <img className="captura-de-pantalla" alt="Captura de pantalla" />

        <img className="captura-de-pantalla-2" alt="Captura de pantalla" />

        <img className="captura-de-pantalla-3" alt="Captura de pantalla" />
      </div>
    </div>
  );
};

BottomNavigation.propTypes = {
  bottomnavigationVariant: PropTypes.oneOf(["default"]),
};
