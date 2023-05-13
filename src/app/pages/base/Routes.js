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
import ReadMaster from '../../components/viewer/ReadMaster';
import Header from '../../components/headerComponent/Header';
import AllComprehensions from '../rsvp test/AllComprehensions';
import Questions from '../rsvp test/Questions';

function RoutesComponent() {
  // function RoutesComponent(props) {
  // const { setShowFooter } = props;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter className="mt-3">
        <Header />
        <Routes>
          <Route path={URL.HOME} element={<LandingPage />} />
          <Route path={URL.READ} element={<ReadMaster />} />
          <Route path={URL.ADD_COMPREHENSION} element={<AddComprehension />} />
          <Route path={URL.COMPREHENSION} element={<ReadMaster />} />
          <Route
            path={URL.ALL_COMPREHENSIONS}
            element={<AllComprehensions />}
          />
          <Route path={URL.QUESTIONS} element={<Questions />} />
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
