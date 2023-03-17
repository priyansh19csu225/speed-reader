import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/styles.css';
import RoutesComponent from './Routes';

import { showSnackBar } from '../../../redux/snackBarSlice';
import ErrorSnackBar from '../../components/snackBar/ErrorSnackBar';
import Footer from '../../components/footer/Footer';

function App() {
  const snackBarShow = useSelector((state) => state.globalSnackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      showSnackBar({
        setopen: false,
        message: '',
        severity: 'success',
      })
    );
  };

  return (
    <>
      <RoutesComponent setShowFooter />
      <Footer />
      <ErrorSnackBar opensnackbar={snackBarShow} handleClose={handleClose} />
    </>
  );
}

export default App;
