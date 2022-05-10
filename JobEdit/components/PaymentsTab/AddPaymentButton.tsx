import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { PaymentMethod } from 'utils/JobUtils';
import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getIsPaymentHistoryLoading } from 'store/Jobs/jobsSelectors';
import { createPaymentHistory } from 'store/Jobs/jobsThunks';

export const AddPaymentButton = ({
  jobId,
  amount,
  disabled,
  text,
  method,
  providerId,
}: {
  jobId: number;
  amount: number;
  disabled: boolean;
  text: string;
  method: PaymentMethod;
  providerId: number | null;
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isLoading = useSelector(getIsPaymentHistoryLoading);

  const onClick = async () => {
    const newPayment = {
      amount,
      method,
      provider: providerId ? String(providerId) : undefined,
      job: String(jobId),
    };
    dispatch(createPaymentHistory(newPayment));
    return;
  };

  return (
    <PrimaryButton
      className={classes.addPayment}
      disabled={disabled}
      onClick={onClick}
      isProcessing={isLoading}
    >
      {text}
    </PrimaryButton>
  );
};
