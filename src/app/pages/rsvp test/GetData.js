import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import EditorController from '../../components/RichTextEditor/EditorController';
import { EMPTY_ARRAY } from '../../constants';
import { API_URL } from '../../constants/apiUrls';
import { getRequest } from '../../services';
import { none, toolbarOptions } from '../../constants/toolbar.constants';
import COMPREHENSION_SCHEMA from './Comprehension.schema';
import URL from '../../constants/urls';

function GetData(props) {
  const { emptyEditor } = props;
  const methods = useForm({
    resolver: yupResolver(COMPREHENSION_SCHEMA),
    mode: 'onChange',
  });
  const { setValue, control } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const divRef = 'getData';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(URL.READ, {
      state: {
        text: document.getElementById(divRef).innerText,
        emptyEditor,
      },
    });
  };

  const comprehension = useSelector(
    (state) => state.user?.userInfo?.selectedComprehension?.comprehension
  );

  const isStaticreader = useSelector((state) => state.user?.isStaticReader);

  useEffect(() => {
    if (emptyEditor) return;
    if (comprehension) {
      setValue('comprehension', comprehension);
      return;
    }
    setIsLoading(true);
    getRequest(`${API_URL.GET_COMPREHENSION}?id=6408c08bb9a5a78c243a5f64`)
      .then((res) => {
        setValue('comprehension', res.data.comprehension);
      })
      .finally(() => setIsLoading(false));
  }, EMPTY_ARRAY);

  return (
    <div className="d-flex w-100 justify-content-center">
      <div className="subHeader p-2 m-2 container d-flex justify-content-center flex-column">
        {isLoading ? (
          <CircularProgress />
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
    </div>
  );
}

GetData.propTypes = {
  emptyEditor: PropTypes.bool,
};
GetData.defaultProps = {
  emptyEditor: false,
};

export default GetData;
