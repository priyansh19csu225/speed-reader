import React from 'react';
import { Link } from '@mui/material';

import URL from '../../constants/urls';
import ICON_LOGO from '../../img/logoreaddark.png';

function Footer() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center   background-1F2830 mt-auto">
      <Link href={`${URL.HOME}`} underline="none" className="color-1D8FF2">
        <img src={ICON_LOGO} alt="READ MASTER" className="ms-2" width="200px" />
      </Link>
    </div>
  );
}

export default Footer;
