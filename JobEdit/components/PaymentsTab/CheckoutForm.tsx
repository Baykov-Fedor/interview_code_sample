import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { colors } from 'styles';
import { useStyles } from './styles';
import { createStripePayment } from 'api/jobsApi';

export const CheckoutForm = ({
  amount,
  jobId,
  disabled,
  onSubmit,
}: {
  amount: number;
  jobId: number;
  disabled: boolean;
  onSubmit: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [error, setError]: [any, any] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement('card')!.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    try {
      const paymentIntent = await createStripePayment({
        amount: String(amount),
        jobId: String(jobId),
      });
      const payload = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });
      setProcessing(false);

      if (payload.error) {
        setError(payload.error);
        return;
      } else {
        setError(null);
      }

      onSubmit();
    } catch (error) {
      console.error(error);
      setError({ message: 'Something went wrong.' });
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.stripeForm}>
      <fieldset className={classes.formGroup}>
        <CardField
          onChange={(e: any) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error?.message}</ErrorMessage>}
      <SubmitButton
        processing={processing}
        error={error}
        disabled={!stripe || disabled || !cardComplete}
      >
        Charge now
      </SubmitButton>
    </form>
  );
};

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#6B7280',
      color: 'black',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: 'black',
      },
    },
    invalid: {
      iconColor: colors.bittersweet,
      color: colors.bittersweet,
    },
  },
};

const CardField = ({ onChange }: any) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }: any) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({ children }: any) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);
