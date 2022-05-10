import { Box } from '@material-ui/core';
import { TextInput } from 'components/Inputs/TextInput';
import { InlineFieldsWrapper } from 'components/InlineFieldsWrapper';
import { VehicleTabFormValues } from 'helpers/types';
import { DictionaryResponse } from 'api/api.interfaces';
import { useSelector } from 'react-redux';
import { getVehicleManufacturers, getVehicleModels } from 'store/Dictionary/dictionarySelectors';
import { IFormFields } from 'interfaces';
import { SelectInput } from 'components/Inputs/SelectInput';

export const VehicleSection = ({ setFieldValue, values }: IFormFields<VehicleTabFormValues>) => {
  const manufacturers = useSelector(getVehicleManufacturers);
  const models = useSelector(getVehicleModels);

  const createOption = (data: DictionaryResponse[]) =>
    data.map((x) => ({
      name: x.value,
      id: x.id,
    }));

  return (
    <Box display="flex" flexDirection="column" pt={3} px={3}>
      <InlineFieldsWrapper flexBasis={30}>
        <TextInput
          source="vehicle.year"
          label="Year"
          onChange={(e) => setFieldValue('vehicle.year', e.target.value)}
          value={values.vehicle.year}
          type="number"
        />
        <SelectInput
          choices={createOption(manufacturers)}
          source="vehicle.manufacturer"
          label="Manufacturer"
          onChange={(e) => {
            setFieldValue('vehicle.manufacturer', e.target.value);
          }}
          value={values.vehicle.manufacturer}
        />
        <SelectInput
          choices={createOption(models)}
          source="vehicle.model"
          label="Model"
          onChange={(e) => setFieldValue('vehicle.model', e.target.value)}
          value={values.vehicle.model}
        />
      </InlineFieldsWrapper>
      <InlineFieldsWrapper>
        <TextInput
          source="vehicle.unit"
          label="Unit #"
          onChange={(e) => setFieldValue('vehicle.unit', e.target.value)}
          value={values.vehicle.unit}
        />
        <TextInput
          source="vehicle.vin"
          label="VIN / Serial #"
          onChange={(e) => setFieldValue('vehicle.vin', e.target.value)}
          value={values.vehicle.vin}
        />
      </InlineFieldsWrapper>
      <InlineFieldsWrapper>
        <TextInput
          source="vehicle.mileage"
          label="Mileage"
          onChange={(e) => setFieldValue('vehicle.mileage', e.target.value)}
          value={values.vehicle.mileage}
          type="number"
        />
        <TextInput
          source="vehicle.usdot"
          label="USDOT #"
          onChange={(e) => setFieldValue('vehicle.usdot', e.target.value)}
          value={values.vehicle.usdot}
        />
      </InlineFieldsWrapper>
    </Box>
  );
};
