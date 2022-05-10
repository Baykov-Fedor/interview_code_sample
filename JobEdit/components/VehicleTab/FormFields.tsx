import React from 'react';
import { ServiceSection } from './ServiceSection';
import { VehicleSection } from './VehicleSection';
import { LocationSection } from './LocationSection';
import { VehicleTabFormValues } from 'helpers/types';
import { IFormFields } from 'interfaces';
import { FormFieldsWrapper } from '../FormFieldsWrapper';

export const FormFields = ({ setFieldValue, values }: IFormFields<VehicleTabFormValues>) => {
  return (
    <FormFieldsWrapper>
      <LocationSection setFieldValue={setFieldValue} values={values} />
      <ServiceSection setFieldValue={setFieldValue} values={values} />
      <VehicleSection setFieldValue={setFieldValue} values={values} />
    </FormFieldsWrapper>
  );
};
