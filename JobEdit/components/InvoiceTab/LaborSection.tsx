import { InvoiceBlock, InvoiceListItem } from './index';
import { IFormattedInvoiceData } from 'utils/InvoiceDataFormatter';

interface LaborSectionProps {
  formattedServices?: IFormattedInvoiceData['formattedServices'];
}

export const LaborSection = ({ formattedServices }: LaborSectionProps) => {
  if (!formattedServices?.length) return <InvoiceBlock title="Labor">-</InvoiceBlock>;

  return (
    <InvoiceBlock title="Labor">
      {formattedServices.map((service) => (
        <InvoiceListItem
          name={service.name}
          description={service.description}
          calculations={service.calculations}
          cost={service.cost}
          key={service.name}
        />
      ))}
    </InvoiceBlock>
  );
};
