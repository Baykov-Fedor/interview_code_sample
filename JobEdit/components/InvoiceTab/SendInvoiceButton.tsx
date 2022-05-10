import { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { Modal } from 'components/Modal';
import { InputWithLabel } from 'components/InputWithLabel';
import theme from 'styles/theme';
import { useStyles } from './styles';
import { EmailValidator } from 'shared/EmailValidator';
import { Autocomplete, IAutocompleteOption } from 'components/Autocomplete/Autocomplete';
import { formatDate } from 'helpers/timeHelpers';
import { Loader } from 'components/Loader';

interface IInvoiceEmailHistoryItemDto {
  sentAt: string | null;
  to: string;
  subject: string;
  attachmentUrl: string;
}

interface SendInvoiceButtonProps {
  jobId: number;
  predefinedEmails: string[];
}

export const SendInvoiceButton = ({ jobId, predefinedEmails }: SendInvoiceButtonProps) => {
  const classes = useStyles();
  const [invoiceEmailsHistoryItems, setInvoiceEmailsHistoryItems] = useState<
    IInvoiceEmailHistoryItemDto[]
  >([]);
  const [invoiceEmailsHistoryLoading, setInvoiceEmailsHistoryLoading] = useState<boolean>(false);

  const fetchInvoiceEmailsHistory = useCallback(async () => {}, [/* functions, */ jobId]);

  useEffect(() => {
    fetchInvoiceEmailsHistory();
  }, [fetchInvoiceEmailsHistory]);

  const [isModalOpen, _toggleModalOpen] = useState(false);
  const [isModalProcessing, _toggleIsModalProcessing] = useState(false);

  const [to, setTo] = useState<string>('');
  const isEmailValid = !!to && EmailValidator.isEmailValid(to);

  const [subject, setSubject] = useState<string>(`Invoice for job #${jobId} — Truckup`);
  const isSubjectValid = !!subject;
  const [body, setBody] = useState<string>(
    `Invoice for job #${jobId}. \n\nThank you for choosing Truckup.`,
  );
  const isBodyValid = !!body;

  const openModal = () => _toggleModalOpen(true);
  const closeModal = () => _toggleModalOpen(false);
  const startModalProcessing = () => _toggleIsModalProcessing(true);
  const stopModalProcessing = () => _toggleIsModalProcessing(false);

  const handleSubmit = useCallback(async () => {
    try {
      startModalProcessing();
      const sendInvoiceEmail = () => {}; /////TODO ADD MOCK functions.httpsCallable('sendInvoiceEmail');
      await sendInvoiceEmail();
      closeModal();
      await fetchInvoiceEmailsHistory();
    } catch (error) {
      console.error(error);
    } finally {
      stopModalProcessing();
    }
  }, [fetchInvoiceEmailsHistory]);

  const isFormValid = isEmailValid && isSubjectValid && isBodyValid;
  const autocompleteValue: IAutocompleteOption | null = to ? { id: to, name: to } : null;
  return (
    <>
      <PrimaryButton onClick={openModal}>Send Invoice</PrimaryButton>

      <Modal
        title="Send Invoice"
        open={isModalOpen}
        disabled={!isFormValid}
        isProcessing={isModalProcessing}
        handleClose={closeModal}
        handleConfirm={handleSubmit}
        confirmText="Send"
      >
        <InputWithLabel label="To:" value={to}>
          <Autocomplete
            value={autocompleteValue}
            options={predefinedEmails.map((x) => ({ id: x, name: x }))}
            onChange={(value) => setTo((value as string) || '')}
            onIntensionToAddNewOption={setTo}
            placeholder="example@email.com"
            error={!isEmailValid}
          />
        </InputWithLabel>
        <InputWithLabel label="Subject:" value={to}>
          <TextField
            value={subject}
            onChange={(props) => setSubject(props.target.value)}
            variant="filled"
            InputProps={{ margin: 'dense' }}
            style={{ marginTop: theme.spacing(1) }}
            error={!isSubjectValid}
          />
        </InputWithLabel>
        <InputWithLabel label="Body:" value={to}>
          <TextField
            value={body}
            onChange={(props) => setBody(props.target.value)}
            variant="filled"
            multiline
            rows={4}
            error={!isBodyValid}
            className={classes.multilineTextField}
          />
        </InputWithLabel>
        <InvoiceEmailsHistory
          items={invoiceEmailsHistoryItems}
          isLoading={invoiceEmailsHistoryLoading}
        />
      </Modal>
    </>
  );
};

interface InvoiceEmailsHistoryProps {
  items: IInvoiceEmailHistoryItemDto[];
  isLoading: boolean;
}

const InvoiceEmailsHistory = (props: InvoiceEmailsHistoryProps) => {
  if (props.isLoading) return <Loader text="Loading..." />;
  return (
    <TableContainer style={{ maxHeight: 300 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none">Date</TableCell>
            <TableCell padding="none">To</TableCell>
            <TableCell padding="none">Subject</TableCell>
            <TableCell padding="none" align="center">
              Attachments
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((invoiceEmail, i) => (
            <TableRow key={i}>
              <TableCell>
                {invoiceEmail.sentAt ? formatDate(new Date(invoiceEmail.sentAt)) : null}
              </TableCell>
              <TableCell>{invoiceEmail.to}</TableCell>
              <TableCell style={{ whiteSpace: 'normal' }}>{invoiceEmail.subject}</TableCell>
              <TableCell align="center">
                <a href={invoiceEmail.attachmentUrl} target="_blank" rel="noopener noreferrer">
                  open
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
