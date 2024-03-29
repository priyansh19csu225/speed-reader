import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Dialog, Typography, DialogActions } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import EditorController from '../../components/RichTextEditor/EditorController';
import API_URL from '../../constants/apiUrls';
import { getRequest } from '../../services';
import { none, toolbarOptions } from '../../constants/toolbar.constants';
import COMPREHENSION_SCHEMA from './Comprehension.schema';
import URL from '../../constants/urls';
import { setComprehensionRedux } from '../../../redux/apiCalls';

function GetData(props) {
  const { emptyEditor, randomComprehension } = props;
  const methods = useForm({
    resolver: yupResolver(COMPREHENSION_SCHEMA),
    mode: 'onChange',
  });
  const { setValue, control } = methods;
  const [open, setOpen] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const divRef = 'getData';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(URL.READ_COMPREHENSION, {
      state: {
        text: document.getElementById(divRef).innerText,
        emptyEditor,
      },
    });
  };

  const comprehension = useSelector(
    (state) => state.user?.selectedComprehension?.comprehension
  );

  const { user } = useAuth0();
  const dispatch = useDispatch();
  const isStaticreader = useSelector((state) => state.user?.isStaticReader);

  useEffect(() => {
    if (emptyEditor) {
      setIsLoading(true);
      setValue('comprehension', '');
      setTimeout(() => setIsLoading(false), 1000);
      return;
    }
    if (!randomComprehension) {
      setValue('comprehension', comprehension);
      return;
    }
    setIsLoading(true);
    getRequest(`${API_URL.GET_RANDOM_COMPREHENSION}?email=${user?.email}`)
      .then((res) => {
        if (res.data.showDialog) {
          setOpen(true);
          setResponseMsg(res.data.msg);
          return;
        }
        setValue('comprehension', res.data.comprehension);
        setComprehensionRedux(dispatch, res.data);
      })
      .finally(() => setIsLoading(false));
  }, [emptyEditor, randomComprehension]);

  return (
    <div className="d-flex w-100 justify-content-center">
      <div className="subHeader p-2 m-2 container d-flex justify-content-center flex-column">
        {isLoading ? (
          <div className="d-flex w-100 justify-content-center pt-5 pb-5">
            <CircularProgress size="4rem" />
          </div>
        ) : (
          <>
            <h4 className="center-text m-2 p-2">
              {isStaticreader ? 'Static Read Test' : 'RSVP Speed Reading Tool'}
            </h4>
            {emptyEditor && (
              <Typography className="center-text ">
                Paste your text here to speed read it
              </Typography>
            )}
            <FormProvider {...methods}>
              <div
                id={divRef}
                className={`${
                  emptyEditor ? 'mt-2 mb-4 pt-2 pb-4' : 'mb-2 pb-2'
                }`}
              >
                <EditorController
                  name="comprehension"
                  control={control}
                  toolbarOptions={emptyEditor ? toolbarOptions : none}
                  editorHeight="520px"
                  emptyEditor={emptyEditor}
                  // placeholder={getValues('comprehension')}
                  readOnly={!emptyEditor}
                />
              </div>
            </FormProvider>
            <div className="m-2 p-2 d-flex justify-content-center">
              <Button
                variant="contained"
                onClick={() => handleClick()}
                type="button"
              >
                Speed Read Now
              </Button>
            </div>
          </>
        )}
      </div>
      <Dialog fullWidth open={open}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <div>
            <Warning style={{ color: 'orange', fontSize: '50px' }} />
          </div>
          <div style={{ margin: '10px', padding: '10px' }}>
            <h5>{responseMsg}</h5>
          </div>
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              navigate(URL.HOME);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

GetData.propTypes = {
  emptyEditor: PropTypes.bool,
  randomComprehension: PropTypes.bool,
};
GetData.defaultProps = {
  emptyEditor: false,
  randomComprehension: false,
};

export default GetData;
