import React from 'react';
// import PropTypes from 'prop-types';
// import noop from 'lodash/noop';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Error from '../error/Error';

import ErrorFallback from '../error/ErrorFallback';
import LandingPage from '../../components/landingPage/LandingPage';
import AddComprehension from '../comprehension/AddComprehension';
import URL from '../../constants/urls';


function RoutesComponent() {
  // function RoutesComponent(props) {
  // const { setShowFooter } = props;



  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter className="mt-3">
       
      <Routes>
       <Route path={URL.HOME} element = { <LandingPage/>}/>
       <Route path={URL.COMPREHENSION} element = { <AddComprehension/>}/>
          <Route path="*" element={<Error />} />
        </Routes>

      </BrowserRouter>
    </ErrorBoundary>
  );
}

// RoutesComponent.propTypes = {
//   setShowFooter: PropTypes.func,
// };

// RoutesComponent.defaultProps = {
//   setShowFooter: noop,
// };

export default RoutesComponent;
