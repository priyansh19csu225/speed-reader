import { Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import classNames from 'classnames';
import styles from './header.module.css';
import ICON_LOGO from '../../img/logoread.png';
import URL from '../../constants/urls';
import getFirstPathName from './header.helper';
import { setUserRoleAndEmail } from '../../../redux/userSlice';
import { showSnackBar } from '../../../redux/snackBarSlice';

const KEBAB_LINK = `color-1F2830 ${styles.navLink} px-3 py-1 w-100 subtitle-1`;
const ACTIVE_KEBAB_LINK = styles.activeKebabLink;
const MENU_ITEM = 'px-0 py-0';
const MAIN_DIV = styles.mainDiv;

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, loginWithRedirect, isAuthenticated, logout, getIdTokenClaims } =
    useAuth0();
  const handleOpenActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const onSelectNavOption = () => {
    setAnchorEl(null);
  };
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState(URL.HOME);
  const [isAdminLogin, setAdminLogin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const { pathname } = location;
    const firstPathName = getFirstPathName(pathname);
    setActiveUrl(firstPathName);
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;
    const getToken = async () => {
      try {
        const accessToken = await getIdTokenClaims();

        if (accessToken['https://readmaster.net/roles']?.length === 1)
          setAdminLogin(true);
      } catch (error) {
        dispatch(
          showSnackBar({
            setopen: true,
            message: 'Some error occured, Please try again later!',
            severity: 'error',
          })
        );
      }
    };
    setTimeout(() => {
      getToken();
    }, 2000);
  }, [user]);

  useEffect(() => {
    const payload = {
      email: user?.email,
      isAdmin: isAdminLogin,
    };
    dispatch(setUserRoleAndEmail(payload));
  }, [user, isAdminLogin]);

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
        <div className="column">
          {user && (
            <Typography component="span" className="me-3" color="blue">
              {user?.email}
            </Typography>
          )}
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
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {isAdminLogin ? (
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
          ) : (
            <div>
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
                  Speed Read
                </Link>
              </MenuItem>
              {user && (
                <>
                  <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                    <Link
                      to={URL.DAILY_EXERCISE_COMPREHENSION}
                      className={classNames(KEBAB_LINK, {
                        [ACTIVE_KEBAB_LINK]:
                          activeUrl === URL.DAILY_EXERCISE_COMPREHENSION,
                      })}
                    >
                      Daily Exercise Comprehension
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                    <Link
                      to={URL.ALL_COMPREHENSIONS}
                      className={classNames(KEBAB_LINK, {
                        [ACTIVE_KEBAB_LINK]:
                          activeUrl === URL.ALL_COMPREHENSIONS,
                      })}
                    >
                      All Comprehensions
                    </Link>
                  </MenuItem>
                </>
              )}
            </div>
          )}
          <MenuItem>
            <Divider
              sx={{
                color: isAuthenticated ? 'red' : 'blue',
                width: '100%',
              }}
            >
              {isAuthenticated ? (
                <Typography
                  component="span"
                  onClick={() => {
                    localStorage.removeItem('persist:root');
                    return logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                  }}
                >
                  Log Out
                </Typography>
              ) : (
                <Typography
                  component="span"
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Typography>
              )}
            </Divider>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}

export default Header;
