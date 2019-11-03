import React from 'react';
import logo from 'assets/logo.png';

const Logotype = ({ size = 30, style }) => {
  return <img src={logo} width={size} height={size} alt="" style={style} />;
};

export default Logotype;
