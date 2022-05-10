import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { FormFields } from './FormFields';
import { BottomToolbar } from '../../../BottomToolbar';
import { useFormStyles } from 'styles/commonStyles';
import { createJob, patchJob } from 'store/Jobs/jobsThunks';
import {
  makeProperJobForPosting,
  makeVehicleTabFormValues,
  VehicleSchema,
} from 'helpers/jobHelpers';
import { VehicleTabFormValues } from 'helpers/types';
import { IJob } from 'mainInterfaces';
import { JobTabs } from 'utils/JobUtils';

type IVehicleTab = {
  job: IJob | null;
  isJobLocked: boolean;
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<JobTabs>>;
};

export const VehicleTab = ({ isJobLocked, tabValue, setTabValue, job }: IVehicleTab) => {
  const dispatch = useDispatch();
  const basicClasses = useFormStyles();

  const handleFormSubmit = async (values: VehicleTabFormValues) => {
    const requestBody = makeProperJobForPosting(values);
    if (!job) {
      dispatch(createJob(requestBody));
      return;
    }
    dispatch(patchJob({ id: job.id, params: requestBody }));
  };

  return (
    <Formik
      initialValues={makeVehicleTabFormValues(job)}
      onSubmit={handleFormSubmit}
      validationSchema={VehicleSchema}
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
