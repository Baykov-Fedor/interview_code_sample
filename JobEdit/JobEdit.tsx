import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Box, Tab, Tabs } from '@material-ui/core';
import { PaymentsTab } from './components/PaymentsTab';
import { ContactsTab } from './components/ContactsTab';
import { Header } from 'pages/Jobs/JobEdit/components/Header';
import { JobMap } from 'components/JobMap';
import { VehicleTab } from 'pages/Jobs/JobEdit/components/VehicleTab';
import { JobDrawer } from 'pages/Jobs/JobDrawer';
import { JobTabs } from 'utils/JobUtils';
import { JobFormWrapper } from './components/JobFormWrapper';
import { TabLabel } from '../../../components/TabLabel';
import theme from 'styles/theme';
import { ProvidersLocationsContextProvider } from 'contexts/ProvidersLocationsContext';
import { cameFromCreate } from '../../../helpers/jobHelpers';
import { InvoiceTab } from './components/InvoiceTab';
import { useJobEdit } from 'utils/hooks/Jobs/useJobEdit';
import { Loader } from 'components/Loader';
import { getAllVehicleDomains } from 'store/Dictionary/dictionaryThunks';
import { useDispatch } from 'react-redux';
import { ROUTES } from 'config/routes';
import { clearSelectedJob } from 'store/Jobs/jobsSlice';
import { clearMap } from 'store/Map/mapSlice';

const JobEdit = (props: any) => {
  const history = useHistory();
  const params = useParams<any>();
  const isThisCreateJobPage = cameFromCreate(params);
  const { job, isLoading } = useJobEdit(params.id);
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(JobTabs.VEHICLE);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isContactFulfilled = job?.driver?.phoneNumber || job?.dispatcher?.phoneNumber;
  const isJobLocked = job ? !job.isPendingReview : false;

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    dispatch(getAllVehicleDomains());
    return () => {
      dispatch(clearSelectedJob());
      dispatch(clearMap());
    };
  }, [dispatch]);

  useEffect(() => {
    if (job) history.push(`${ROUTES.JOBS}/${job.id}`);
  }, [job?.id]);

  if (isLoading) return <Loader text="Loading job info..." />;

  return (
    <ProvidersLocationsContextProvider>
      <Box display="flex" flexBasis="100%" minHeight="100vh">
        <JobFormWrapper>
          <Box
            borderBottom={`1px solid ${theme.palette.primary.light}`}
            boxShadow={`0px 0px 3px ${theme.palette.primary.light}`}
            zIndex={1}
          >
            <Header job={job} />
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label={<TabLabel text="Vehicle" />} value={JobTabs.VEHICLE} />
              <Tab
                label={<TabLabel text="Contacts" alertBadge={!isContactFulfilled} />}
                value={JobTabs.CONTACTS}
                disabled={isThisCreateJobPage}
              />
              <Tab
                label={<TabLabel text="Payments" />}
                value={JobTabs.PAYMENTS}
                disabled={isThisCreateJobPage}
              />
              <Tab
                label={<TabLabel text="Invoice" />}
                value={JobTabs.INVOICE}
                disabled={isThisCreateJobPage}
              />
            </Tabs>
          </Box>
          {tabValue === JobTabs.VEHICLE && (
            <VehicleTab
              tabValue={tabValue}
              setTabValue={setTabValue}
              job={job}
              isJobLocked={isJobLocked}
            />
          )}
          {tabValue === JobTabs.CONTACTS && job && (
            <ContactsTab
              tabValue={tabValue}
              setTabValue={setTabValue}
              job={job}
              isJobLocked={isJobLocked}
            />
          )}
          {tabValue === JobTabs.PAYMENTS && job && (
            <PaymentsTab
              tabValue={tabValue}
              setTabValue={setTabValue}
              isJobLocked={isJobLocked}
              job={job}
            />
          )}
          {tabValue === JobTabs.INVOICE && job && (
            <InvoiceTab
              tabValue={tabValue}
              setTabValue={setTabValue}
              isJobLocked={isJobLocked}
              job={job}
            />
          )}
        </JobFormWrapper>
        <Box width="100%">
          <JobMap job={job} isJobMarkerDraggable={tabValue === JobTabs.VEHICLE} />
          {job && (
            <JobDrawer
              job={job}
              isOpen={isDrawerOpen}
              openDrawer={() => setDrawerOpen(true)}
              closeDrawer={() => setDrawerOpen(false)}
              isJobLocked={isJobLocked}
              props={props}
            />
          )}
        </Box>
      </Box>
    </ProvidersLocationsContextProvider>
  );
};

export default JobEdit;
