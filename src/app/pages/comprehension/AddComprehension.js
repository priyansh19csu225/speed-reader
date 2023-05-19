import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ComprehensionComponent from '../../components/comprehension/ComprehensionComponent';

function AddComprehension() {
  const methods = useForm();
  return (
    <div className="container mb-5 pb-3">
      <FormProvider {...methods}>
        <ComprehensionComponent />
      </FormProvider>
    </div>
  );
}

export default AddComprehension;
