import { Box, makeStyles, Typography } from '@material-ui/core';
import { JobActions } from '../../JobActions';
import { IJob } from '../../../../mainInterfaces';
import { colors, font } from 'styles';
import { parseJobNumber } from '../../../../helpers/jobHelpers';
import JobStatusChip from '../../../../components/Chips/JobStatusChip';
import { PendingReviewChip } from 'components/Chips/PendingReviewChip';
import { closedJobStatuses } from 'utils/JobUtils';

export const Header = ({ isCreatePage, job }: { isCreatePage?: boolean; job: IJob | null }) => {
  const classes = useStyles();
  const jobNumber = job?.id ? parseJobNumber(job.id) : '';

  return (
    <Box pt={3} pl={3} alignItems="left" className={classes.root}>
      <Box display="flex" px={1} justifyContent="space-between">
        <Typography variant="h4" className={classes.title}>
          {isCreatePage ? 'New Job' : `Job #${jobNumber}`}
        </Typography>
        {job && <JobDetails job={job} />}
      </Box>
    </Box>
  );
};

const JobDetails = ({ job }: { job: IJob }) => {
  return (
    <Box display="flex" alignItems="center" pr={3}>
      {job.isPendingReview && closedJobStatuses.includes(job.status) && (
        <PendingReviewChip fontSize={12} />
      )}
      <JobStatusChip status={job.status} fontSize={16} />
      <JobActions job={job} />
    </Box>
  );
};

export const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.common.white,
  },
  title: {
    fontWeight: font.weight.bold,
  },
  icon: {
    height: '11px',
    width: '12px',
    color: colors.texasRose,
  },
  rating: {
    marginLeft: spacing(1),
  },
}));
