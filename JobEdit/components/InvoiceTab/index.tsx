import React, { useState } from 'react';
import classnames from 'classnames';
import { Box, Typography } from '@material-ui/core';
import { FilledLogoIcon } from 'components/Icons';
import { PartsSection } from './PartsSection';
import { LaborSection } from './LaborSection';
import { PriceSection } from './PriceSection';
import { GeneralSection } from './GeneralSection';
import { DetailsSection } from './DetailsSection';
import { CommentsSection } from './CommentsSection';
import { useStyles } from './styles';
import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { InvoiceDataFormatter } from 'utils/InvoiceDataFormatter';
import { SendInvoiceButton } from './SendInvoiceButton';
import { useFormStyles } from 'styles/commonStyles';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { JobTabProps } from '../../JobEdit.interfaces';
import { useInvoice } from 'utils/hooks/Jobs/useInvoice';
import { BottomToolbar } from 'pages/Jobs/BottomToolbar';
import { Loader } from 'components/Loader';

export const InvoiceTab = ({ isJobLocked, tabValue, setTabValue, job }: JobTabProps) => {
  const basicClasses = useFormStyles();
  const classes = useStyles();
  const [isProcessingPdf, setProcessingPdf] = useState(false);

  const { invoiceData, isLoading, downloadInvoice } = useInvoice(job.id);
  if (isLoading) return <Loader />;
  if (!invoiceData) return <Typography align="center">Couldn't load invoice</Typography>;

  const formattedInvoiceData = new InvoiceDataFormatter(invoiceData).getInvoiceData();

  const dispatcherEmail: string | undefined = job?.dispatcher?.email;
  const driverEmail: string | undefined = job?.driver?.email;
  const predefinedEmailToSendInvoice = [dispatcherEmail, driverEmail].filter(
    (x) => !!x,
  ) as string[];

  const onDownloadClick = async () => {
    setProcessingPdf(true);
    try {
      await downloadInvoice();
    } catch (e) {
      console.error(e);
    }
    setProcessingPdf(false);
  };

  return (
    <Box className={basicClasses.form}>
      <FormFieldsWrapper px={3} className={basicClasses.form}>
        <Box className={classes.tabHeader}>
          <FilledLogoIcon />
          <Box>
            <SendInvoiceButton jobId={job.id} predefinedEmails={predefinedEmailToSendInvoice} />
            <PrimaryButton
              className={classes.downloadInvoiceButton}
              onClick={onDownloadClick}
              isProcessing={isProcessingPdf}
            >
              Download invoice
            </PrimaryButton>
          </Box>
        </Box>
        <PriceSection {...formattedInvoiceData} />
        <GeneralSection {...formattedInvoiceData} />
        <DetailsSection {...formattedInvoiceData} />
        <LaborSection formattedServices={formattedInvoiceData.formattedServices} />
        <PartsSection formattedParts={formattedInvoiceData.formattedParts} />
        <CommentsSection formattedComments={formattedInvoiceData.formattedComments} />
      </FormFieldsWrapper>
      <BottomToolbar
        isNextButtonDisabled={true}
        onNextButtonClick={() => ''}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
    </Box>
  );
};

interface InvoiceBlockProps {
  title?: string;
  className?: string;
}

export const InvoiceBlock: React.FC<InvoiceBlockProps> = ({ title, children, className }) => {
  const classes = useStyles();

  return (
    <Box className={classnames(classes.section, className)}>
      <Typography className={classes.title}>{title}</Typography>
      {children}
    </Box>
  );
};

export const InvoiceListItem = ({
  name,
  description,
  calculations,
  cost,
}: {
  name: string;
  description: string;
  calculations: string;
  cost: string;
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.fieldsWrapper}>
      <Box display="flex" flexDirection="column" flex="1 1 50%">
        <Typography className={classnames(classes.item, classes.name)}>{name}</Typography>
        <Typography className={classes.item}>{description}</Typography>
      </Box>
      <Typography className={classes.item}>{calculations}</Typography>
      <Typography className={classnames(classes.item, classes.cost)}>{cost}</Typography>
    </Box>
  );
};
