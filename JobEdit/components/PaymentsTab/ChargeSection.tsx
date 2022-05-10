import { useEffect, useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Typography } from '@material-ui/core';
import { PaymentMethod } from 'utils/JobUtils';
import { CurrencyInput } from 'components/Inputs/CurrencyInput';
import { AddPaymentButton } from './AddPaymentButton';
import { CheckoutForm } from './CheckoutForm';
import { useStyles } from './styles';
import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { Modal } from 'components/Modal';
import { PaymentsTabFormValues } from 'helpers/types';
import { IFormFields } from 'interfaces';
import { useDispatch } from 'react-redux';
import { createPaymentHistory } from 'store/Jobs/jobsThunks';

type IChargeSection = {
  jobId: number;
} & IFormFields<PaymentsTabFormValues>;

const ChargeSection = ({ values, setFieldValue, jobId }: IChargeSection) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [amountError, setAmountError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!), []);

  const isDisabled =
    !values.amountToPay ||
    !!amountError ||
    (values.paymentMethod === PaymentMethod.CASH && !values.providerId);

  const isCash = values.paymentMethod === PaymentMethod.CASH;
  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  };

  const validateAmountAndReturnErrorMessage = (amount: string): string | null => {
    if (amount === '') {
      return 'Amount is required';
    }
    if (parseFloat(amount) < 0.5) {
      return 'Amount is too small.';
    }
    return null;
  };

  const handleStripeSubmit = () => {
    setFieldValue('amountToPay', '');
    setModalOpen(false);
    const newPayment = {
      amount: values.amountToPay,
      method: values.paymentMethod,
      provider: values.providerId ? String(values.providerId) : undefined,
      job: String(jobId),
    };
    dispatch(createPaymentHistory(newPayment));
    return;
  };

  return (
    <Box display="flex" flexDirection="column" pt={3} px={3}>
      <Box display="flex" alignItems="center">
        <CurrencyInput
          label="Amount to charge"
          className={classes.charge}
          value={values.amountToPay}
          source="amountToPay"
          onChange={(e) => {
            const error = validateAmountAndReturnErrorMessage(e.target.value);
            setAmountError(error);
            setFieldValue('amountToPay', e.target.value);
          }}
        />
        {amountError && (
          <Typography variant="body2" className={classes.amountError}>
            {amountError}
          </Typography>
        )}
      </Box>
      {values.paymentMethod !== PaymentMethod.CARD ? (
        <AddPaymentButton
          jobId={jobId}
          amount={values.amountToPay}
          disabled={isDisabled}
          method={values.paymentMethod}
          text={isCash ? 'Add cash' : 'Add payment'}
          providerId={isCash ? values.providerId : null}
        />
      ) : (
        <>
          <PrimaryButton className={classes.addPayment} onClick={() => setModalOpen(true)}>
            Pay
          </PrimaryButton>
          <Modal
            title="Enter your credit card information"
            open={isModalOpen}
            handleClose={() => setModalOpen(false)}
          >
            <Box display="flex" justifyContent="center">
              <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <CheckoutForm
                  amount={values.amountToPay}
                  jobId={jobId}
                  disabled={!values.amountToPay || !!amountError}
                  onSubmit={handleStripeSubmit}
                />
              </Elements>
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default ChargeSection;
