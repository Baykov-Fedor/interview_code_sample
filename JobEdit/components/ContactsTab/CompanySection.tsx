import { Box } from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './styles';
import { IFormFields } from 'interfaces';
import { ContactsTabFormValues } from 'helpers/types';
import { useCompanies } from 'utils/hooks/Companies/useCompanies';
import { AutoCompleteWithModal } from 'components/Inputs/AutoCompleteWithModal';
import { useDispatch } from 'react-redux';
import { CreateCompanyParams } from 'api/api.interfaces';
import { createCompany } from 'api/companiesApi';
import { updateCompaniesList } from 'store/Companies/companiesSlice';

export const CompanySection = ({ values, setFieldValue }: IFormFields<ContactsTabFormValues>) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { companies } = useCompanies();

  return (
    <Box className={classnames(classes.section, classes.company)}>
      <AutoCompleteWithModal
        data={companies}
        source="company.id"
        modalTitle="Create company"
        label="Company"
        onChange={(value) => setFieldValue('company.id', value)}
        onSubmit={async (value) => {
          const params: CreateCompanyParams = {
            name: value,
          };
          const data = await createCompany(params);
          dispatch(updateCompaniesList(data));
          return data;
        }}
        value={values.company.id as number}
      />
    </Box>
  );
};
