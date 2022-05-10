import { Box, Typography } from '@material-ui/core';
import { SelectInput } from 'components/Inputs/SelectInput';
import { TextInput } from 'components/Inputs/TextInput';
import { currencyFormat } from 'helpers/formatHelpers';
import { PaymentsTabFormValues } from 'helpers/types';
import { IFormFields } from 'interfaces';
import { paymentMethods } from 'utils/JobUtils';
import { useStyles } from './styles';

const PaymentDetailsSection = ({ values, setFieldValue }: IFormFields<PaymentsTabFormValues>) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" pt={3} px={3}>
      <TextInput
        value={values.referenceNumber}
        source="referenceNumber"
        label="Reference number / P.O. number"
        onChange={(e) => setFieldValue('referenceNumber', e.target.value)}
        validation={false}
      />
      <SelectInput
        source="paymentMethod"
        label="Payment method"
        choices={paymentMethods}
        placeholder="Select payment method"
        value={values.paymentMethod}
        onChange={(e) => setFieldValue('paymentMethod', e.target.value)}
      />
      <Typography variant="subtitle2" className={classes.balanceTitle}>
        Balance due
      </Typography>
      <Typography className={classes.balanceAmount}>{currencyFormat(values.totalCost)}</Typography>
    </Box>
  );
};

export default PaymentDetailsSection;
