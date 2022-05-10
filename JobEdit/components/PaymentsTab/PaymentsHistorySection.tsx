import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { DeleteButton } from 'pages/Jobs/JobDrawer/components/DeleteButton';
import { PaymentStatus } from 'utils/JobUtils';
import { currencyFormat } from 'helpers/formatHelpers';
import theme from 'styles/theme';
import { colors } from 'styles';
import { formatDate, formatTime } from 'helpers/timeHelpers';
import { PaymentStatusChip } from './PaymentStatusChip';
import { useStyles } from './styles';
import { PaymentHistoryProjectionResponse } from 'api/api.interfaces';
import { useDispatch } from 'react-redux';
import { deletePaymentHistory } from 'store/Jobs/jobsThunks';

interface PaymentHistorySectionProps {
  jobId: number;
  payments: PaymentHistoryProjectionResponse[];
}

export const PaymentHistorySection = ({ payments, jobId }: PaymentHistorySectionProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" p={3}>
      <Typography className={classes.title}>Payment history</Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell>amount</TableCell>
              <TableCell>payment method</TableCell>
              <TableCell>provider</TableCell>
              <TableCell>date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {payments.map((payment) => (
              <PaymentItem payment={payment} key={payment.id} jobId={jobId} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

interface PaymentItemProps {
  jobId: number;
  payment: PaymentHistoryProjectionResponse;
}

const PaymentItem = ({ payment, jobId }: PaymentItemProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isCard = payment.method.toLowerCase().includes('card');
  const paymentSucceeded = payment.status === PaymentStatus.SUCCEEDED;
  const paymentStatusName = payment?.status || '';

  const onClick = async () => {
    dispatch(deletePaymentHistory({ paymentId: payment.id, jobId }));
  };

  return (
    <TableRow className={classes.paymentItem}>
      <TableCell component="th" scope="row" className={classes.amount}>
        <span>{currencyFormat(payment.amount)}</span>
        {isCard && (
          <PaymentStatusChip
            name={paymentStatusName}
            fontColor={paymentSucceeded ? theme.palette.primary.main : colors.red}
            backgroundColor={paymentSucceeded ? colors.lightGreen : colors.bittersweetLight}
          />
        )}
      </TableCell>
      <TableCell component="th" scope="row">
        {payment.method}
      </TableCell>
      <TableCell component="th" scope="row">
        {payment.providerName}
      </TableCell>
      <TableCell component="th" scope="row">
        <Box className={classes.actionWrapper}>
          {`${formatDate(payment.dateTime)} ${formatTime(payment.dateTime)}`}
          {!isCard && <DeleteButton className={classes.deleteButton} onClick={onClick} />}
        </Box>
      </TableCell>
    </TableRow>
  );
};
