import { Box } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { HelperText } from 'pages/Jobs/HelperText';
import { locationDetailsOptions } from 'utils/JobUtils';
import { InputWithLabel } from '../../../../../components/InputWithLabel';
import { AddressField } from '../../../AddressField';
import { SelectInput } from '../../../../../components/Inputs/SelectInput';
import { MultilineTextInput } from '../../../../../components/Inputs/MultilineTextInput';
import { useStyles } from './style';
import { IFormFields } from 'interfaces';
import { VehicleTabFormValues } from 'helpers/types';

export const LocationSection = ({ values, setFieldValue }: IFormFields<VehicleTabFormValues>) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" pt={3} px={3} className={classes.locationSection}>
      <InputWithLabel
        label="Where the vehicle is located?"
        value={values.location?.address}
        required
      >
        <AddressField
          source="location.address"
          value={values.location.address}
          setFieldValue={setFieldValue}
        />
      </InputWithLabel>
      <HelperText
        icon={HelpOutline}
        text="If address is unknown, enter nearby location—city or road—then drag & drop map pin to a more precise location."
      />
      <Box className={classes.locationDetailsWrapper}>
        <SelectInput
          label="Location details"
          source="location.details"
          choices={locationDetailsOptions}
          value={values.location.details}
          className={classes.locationDetailsSelect}
          placeholder="Select"
          onChange={(e) => setFieldValue('location.details', e.target.value)}
          validation
        />
        <MultilineTextInput
          source="location.notes"
          value={values.location.notes}
          placeholder="Helpful info to locate & identify the vehicle."
          validation={false}
          className={classes.locationNotes}
          onChange={(e) => setFieldValue('location.notes', e.target.value)}
        />
      </Box>
    </Box>
  );
};
