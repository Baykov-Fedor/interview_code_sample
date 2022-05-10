import { Form, Formik } from 'formik';
import {
  ContactsSchema,
  makeContactsTabFormValues,
  makeProperContactsForPosting,
} from 'helpers/jobHelpers';
import { ContactsTabFormValues } from 'helpers/types';
import { BottomToolbar } from 'pages/Jobs/BottomToolbar';
import { useDispatch } from 'react-redux';
import { createJobContacts, patchJobContacts } from 'store/Jobs/jobsThunks';
import { useFormStyles } from 'styles/commonStyles';
import { JobTabProps } from '../../JobEdit.interfaces';
import { FormFields } from './FormFields';

export const ContactsTab = ({ isJobLocked, tabValue, setTabValue, job }: JobTabProps) => {
  const dispatch = useDispatch();
  const basicClasses = useFormStyles();

  const handleFormSubmit = (values: ContactsTabFormValues) => {
    const requestBody = makeProperContactsForPosting(values);
    if (job?.company?.id) {
      dispatch(patchJobContacts({ id: job.id, params: requestBody }));
      return;
    }
    dispatch(createJobContacts({ id: job.id, params: requestBody }));
  };

  return (
    <Formik
      initialValues={makeContactsTabFormValues(job)}
      onSubmit={handleFormSubmit}
      validationSchema={ContactsSchema}
      enableReinitialize
      validateOnMount
    >
      {({ setFieldValue, values, handleSubmit, isValid }) => {
        return (
          <Form className={basicClasses.form}>
            <FormFields setFieldValue={setFieldValue} values={values} />
            <BottomToolbar
              isNextButtonDisabled={isJobLocked || !isValid}
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
