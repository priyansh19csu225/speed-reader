import React from 'react';
// import PropTypes from 'prop-types';
// import noop from 'lodash/noop';
import { useSelector } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuth0 } from '@auth0/auth0-react';
import Error from '../error/Error';
import ErrorFallback from '../error/ErrorFallback';
import LandingPage from '../../components/landingPage/LandingPage';
import AddComprehension from '../comprehension/AddComprehension';
import URL from '../../constants/urls';
import ReadMaster from '../../components/viewer/ReadMaster';
import Header from '../../components/headerComponent/Header';
import AllComprehensions from '../rsvp test/AllComprehensions';
import Questions from '../rsvp test/Questions';
import Footer from '../../components/footer/Footer';
import Results from '../rsvp test/Results';

function RoutesComponent() {
  // function RoutesComponent(props) {
  // const { setShowFooter } = props;
  const isAdmin = useSelector((state) => state?.user?.userInfo.isAdmin);
  const { user } = useAuth0();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter className="mt-3 ">
        <Header />
        <Routes>
          <Route path={URL.HOME} element={<LandingPage />} />
          <Route path={URL.READ} element={<ReadMaster customUserText />} />
          <Route path={URL.READ_COMPREHENSION} element={<ReadMaster />} />
          {user && (
            <>
              {isAdmin && (
                <Route
                  path={URL.ADD_COMPREHENSION}
                  element={<AddComprehension />}
                />
              )}
              <Route
                path={URL.DAILY_EXERCISE_COMPREHENSION}
                element={<ReadMaster randomComprehension />}
              />
              {/* <Route path={URL.DAILY_EXERCISE_COMPREHENSION} element={<ReadMaster />} /> */}
              <Route
                path={URL.ALL_COMPREHENSIONS}
                element={<AllComprehensions />}
              />
              <Route path={URL.QUESTIONS} element={<Questions />} />
              <Route path={URL.SEE_RESULTS} element={<Results />} />
            </>
          )}

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
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
