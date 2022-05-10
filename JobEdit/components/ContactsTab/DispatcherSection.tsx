import { Box } from '@material-ui/core';
import { TextInput } from 'components/Inputs/TextInput';
import { InlineFieldsWrapper } from 'components/InlineFieldsWrapper';
import { PhoneNumberInput } from 'components/Inputs/PhoneNumberInput';
import { IFormFields } from 'interfaces';
import { ContactLabel } from './ContactLabel';
import { useStyles } from './styles';
import { ContactsTabFormValues } from 'helpers/types';

export const DispatcherSection = ({
  values,
  setFieldValue,
}: IFormFields<ContactsTabFormValues>) => {
  const classes = useStyles();
  const isRequired = !(values.driverFirstName || values.driverPhone);

  return (
    <Box className={classes.section}>
      <ContactLabel text="Dispatcher" />
      <InlineFieldsWrapper>
        <TextInput
          source="dispatcherFirstName"
          label="First name"
          value={values.dispatcherFirstName}
          validation={isRequired}
          onChange={(e) => setFieldValue('dispatcherFirstName', e.target.value)}
        />
        <TextInput
          source="dispatcherLastName"
          label="Last name"
          value={values.dispatcherLastName}
          onChange={(e) => setFieldValue('dispatcherLastName', e.target.value)}
        />
      </InlineFieldsWrapper>
      <InlineFieldsWrapper>
        <PhoneNumberInput
          source="dispatcherPhone"
          value={values.dispatcherPhone}
          isRequired={isRequired}
          onChange={(e) => setFieldValue('dispatcherPhone', e.target.value)}
        />
        <TextInput
          source="dispatcherEmail"
          value={values.dispatcherEmail}
          label="E-mail address"
          onChange={(e) => setFieldValue('dispatcherEmail', e.target.value)}
        />
      </InlineFieldsWrapper>
    </Box>
  );
};
