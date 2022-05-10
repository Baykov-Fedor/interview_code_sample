import { Box } from '@material-ui/core';
import { useStyles } from './styles';
import { InvoiceBlock, InvoiceListItem } from './index';
import { IInvoiceDetail } from 'utils/InvoiceDataFormatter';

interface PartsSectionProps {
  formattedParts?: IInvoiceDetail[];
}

export const PartsSection = ({ formattedParts }: PartsSectionProps) => {
  const classes = useStyles();
  if (!formattedParts?.length) return <InvoiceBlock title="Parts">-</InvoiceBlock>;

  return (
    <InvoiceBlock title="Parts" className={classes.parts}>
      <Box>
        {formattedParts.map((part: IInvoiceDetail) => (
          <InvoiceListItem
            name={part.name}
            description={part.description}
            calculations={part.calculations}
            cost={part.cost}
            key={part.name}
          />
        ))}
      </Box>
    </InvoiceBlock>
  );
};
