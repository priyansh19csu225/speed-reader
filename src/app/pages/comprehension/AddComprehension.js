import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ComprehensionComponent from '../../components/comprehension/ComprehensionComponent';


function AddComprehension() {
  const methods = useForm();
  return (
    <div className="container">
      <FormProvider {...methods}>
        <ComprehensionComponent />
      </FormProvider>
    </div>
  );
}

export default AddComprehension;
