import { IJob } from 'mainInterfaces';
import { JobTabs } from 'utils/JobUtils';

export interface JobTabProps {
  job: IJob;
  isJobLocked: boolean;
  tabValue: number;
  setTabValue: React.Dispatch<React.SetStateAction<JobTabs>>;
}

export interface IBottomToolbar {
  pristine?: boolean;
  tabValue: number;
  setTabValue: (number: number) => void;
  onNextButtonClick: () => void;
  isNextButtonDisabled: boolean;
}

export interface IToolbarButton {
  tabValue: number;
  onClick: () => void;
}
