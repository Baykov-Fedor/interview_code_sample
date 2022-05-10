import { Form, Formik } from 'formik';
import { makePaymentsTabFormValues } from 'helpers/jobHelpers';
import { PaymentsTabFormValues } from 'helpers/types';
import { BottomToolbar } from 'pages/Jobs/BottomToolbar';
import { useDispatch } from 'react-redux';
import { patchJobReferenceNumber } from 'store/Jobs/jobsThunks';
import { useFormStyles } from 'styles/commonStyles';
import { JobTabProps } from '../../JobEdit.interfaces';
import { FormFields } from './FormFields';

export const PaymentsTab = ({ isJobLocked, tabValue, setTabValue, job }: JobTabProps) => {
  const dispatch = useDispatch();
  const basicClasses = useFormStyles();

  const handleSubmit = (values: PaymentsTabFormValues) => {
    if (values.referenceNumber) {
      dispatch(patchJobReferenceNumber({ jobId: job.id, refNumber: values.referenceNumber }));
    }
  };

  return (
    <Formik
      initialValues={makePaymentsTabFormValues(job)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values, handleSubmit }) => {
        return (
          <Form className={basicClasses.form}>
            <FormFields setFieldValue={setFieldValue} values={values} jobId={job.id} />
            <BottomToolbar
              isNextButtonDisabled={isJobLocked}
              onNextButtonClick={handleSubmit}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
          </Form>
        );
      }}
    </Formik>
  );
};
