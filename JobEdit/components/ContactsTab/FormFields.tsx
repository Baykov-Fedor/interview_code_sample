import React from 'react';
import { Box } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { HelperText } from 'pages/Jobs/HelperText';
import { defaultBorder } from 'styles/commonStyles';
import { DriverSection } from './DriverSection';
import { CompanySection } from './CompanySection';
import { DispatcherSection } from './DispatcherSection';
import { IFormFields } from 'interfaces';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { ContactsTabFormValues } from 'helpers/types';

export const FormFields = ({ values, setFieldValue }: IFormFields<ContactsTabFormValues>) => (
  <FormFieldsWrapper>
    <CompanySection values={values} setFieldValue={setFieldValue} />
    <Box display="flex" mx={3} py={1.5} pl={0.5} border={defaultBorder}>
      <HelperText
        icon={Info}
        text="Either dispatcher’s or driver’s name & phone are required to proceed."
      />
    </Box>
    <DispatcherSection values={values} setFieldValue={setFieldValue} />
    <DriverSection values={values} setFieldValue={setFieldValue} />
  </FormFieldsWrapper>
);
