import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './header.module.css';
import ICON_LOGO from '../../img/logoread.png';
import URL from '../../constants/urls';
import getFirstPathName from './header.helper';

const KEBAB_LINK = `color-1F2830 ${styles.navLink} px-3 py-1 w-100 subtitle-1`;
const ACTIVE_KEBAB_LINK = styles.activeKebabLink;
const MENU_ITEM = 'px-0 py-0';
const MAIN_DIV = styles.mainDiv;

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const onSelectNavOption = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState(URL.HOME);

  useEffect(() => {
    window.scrollTo(0, 0);
    const { pathname } = location;
    const firstPathName = getFirstPathName(pathname);
    setActiveUrl(firstPathName);
  }, [location.pathname]);

  return (
    <nav className={`${styles.header} background-ffffff mb-2`}>
      <div
        className={`container d-flex align-items-center justify-content-between ${MAIN_DIV}`}
      >
        <Link to={URL.HOME} className={`${styles.logo} color-1D8FF2 col-2`}>
          <img
            src={ICON_LOGO}
            alt="READ MASTER"
            className="ms-2"
            width="200px"
          />
        </Link>
        <IconButton onClick={handleOpenActionMenu}>
          <div className={`background-1D8FF2 ${styles.groupedRoutes} px-2 `}>
            <Typography
              component="span"
              sx={{ fontSize: '1rem', color: 'white', margin: '0.5rem' }}
            >
              Menu
            </Typography>
          </div>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
            <Link
              to={URL.HOME}
              className={classNames(KEBAB_LINK, {
                [ACTIVE_KEBAB_LINK]: activeUrl === URL.HOME,
              })}
            >
              Homepage
            </Link>
          </MenuItem>
          <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
            <Link
              to={URL.READ}
              className={classNames(KEBAB_LINK, {
                [ACTIVE_KEBAB_LINK]: activeUrl === URL.READ,
              })}
            >
              RSVP Test
            </Link>
          </MenuItem>
          <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
            <Link
              to={URL.ADD_COMPREHENSION}
              className={classNames(KEBAB_LINK, {
                [ACTIVE_KEBAB_LINK]: activeUrl === URL.ADD_COMPREHENSION,
              })}
            >
              Add Comprehension
            </Link>
          </MenuItem>
          <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
            <Link
              to={URL.COMPREHENSION}
              className={classNames(KEBAB_LINK, {
                [ACTIVE_KEBAB_LINK]: activeUrl === URL.COMPREHENSION,
              })}
            >
              Daily Exercise Comprehension
            </Link>
          </MenuItem>
          <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
            <Link
              to={URL.ALL_COMPREHENSIONS}
              className={classNames(KEBAB_LINK, {
                [ACTIVE_KEBAB_LINK]: activeUrl === URL.ALL_COMPREHENSIONS,
              })}
            >
              All Comprehensions
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}

export default Header;
