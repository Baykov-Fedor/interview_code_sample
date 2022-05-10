import React from 'react';
import classnames from 'classnames';
import { Box } from '@material-ui/core';
import { TextInput } from 'components/Inputs/TextInput';
import { InlineFieldsWrapper } from 'components/InlineFieldsWrapper';
import { PhoneNumberInput } from 'components/Inputs/PhoneNumberInput';
import { IFormFields } from 'interfaces';
import { ContactLabel } from './ContactLabel';
import { useStyles } from './styles';
import { ContactsTabFormValues } from 'helpers/types';

export const DriverSection = ({ values, setFieldValue }: IFormFields<ContactsTabFormValues>) => {
  const classes = useStyles();
  const isRequired = !(values.dispatcherFirstName || values.dispatcherPhone);

  return (
    <Box className={classnames(classes.section, classes.driver)}>
      <ContactLabel text="Driver" />
      <InlineFieldsWrapper>
        <TextInput
          source="driverFirstName"
          label="First name"
          value={values.driverFirstName}
          validation={isRequired}
          onChange={(e) => setFieldValue('driverFirstName', e.target.value)}
        />
        <TextInput
          source="driverLastName"
          label="Last name"
          value={values.driverLastName}
          onChange={(e) => setFieldValue('driverLastName', e.target.value)}
        />
      </InlineFieldsWrapper>
      <InlineFieldsWrapper>
        <PhoneNumberInput
          source="driverPhone"
          value={values.driverPhone}
          isRequired={isRequired}
          onChange={(e) => setFieldValue('driverPhone', e.target.value)}
        />
        <TextInput
          source="driverEmail"
          label="E-mail address"
          value={values.driverEmail}
          onChange={(e) => setFieldValue('driverEmail', e.target.value)}
        />
      </InlineFieldsWrapper>
    </Box>
  );
};
