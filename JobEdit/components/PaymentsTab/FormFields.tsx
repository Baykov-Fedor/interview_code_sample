import { PaymentHistorySection } from './PaymentsHistorySection';
import { Loader } from 'components/Loader';
import { IFormFields } from 'interfaces';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { PaymentsTabFormValues } from 'helpers/types';
import PaymentDetailsSection from './PaymentDetailsSection';
import ChargeSection from './ChargeSection';
import { usePaymentsHistory } from 'utils/hooks/Jobs/usePaymentHistory';

type PaymentsFormFields = {
  jobId: number;
} & IFormFields<PaymentsTabFormValues>;

export const FormFields = ({ values, setFieldValue, jobId }: PaymentsFormFields) => {
  const { paymentHistory, isLoading } = usePaymentsHistory(jobId);

  if (isLoading) return <Loader />;

  return (
    <FormFieldsWrapper>
      <PaymentDetailsSection values={values} setFieldValue={setFieldValue} />
      <ChargeSection values={values} setFieldValue={setFieldValue} jobId={jobId} />
      <PaymentHistorySection payments={paymentHistory} jobId={jobId} />
    </FormFieldsWrapper>
  );
};
