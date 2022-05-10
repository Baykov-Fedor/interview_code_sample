import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useServices } from 'utils/hooks/useServices';
import { SelectInput } from 'components/Inputs/SelectInput';
import { MultilineTextInput } from 'components/Inputs/MultilineTextInput';
import { useStyles } from './style';
import { RateTypeInfo } from './RateTypeInfo';
import { IServiceResponse } from 'api/api.interfaces';
import { IFormFields } from 'interfaces';
import { VehicleTabFormValues } from 'helpers/types';

export const ServiceSection = ({ setFieldValue, values }: IFormFields<VehicleTabFormValues>) => {
  const classes = useStyles();

  const { services } = useServices({ page: 0, size: 10 });
  const [selectedService, setSelectedService] = useState<IServiceResponse | null>(null);

  const findServiceInfo = (serviceId: number) =>
    services.find((service) => service.id === serviceId) || null;

  useEffect(() => {
    const serviceInfo = findServiceInfo(values.service.id as number);
    setSelectedService(serviceInfo);
  }, [values.service.id]);

  const onProblemChangeHandler = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setFieldValue('service.issue', event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" pt={3} px={3}>
      <SelectInput
        value={values.service?.id}
        source="service.id"
        label="Service type"
        choices={services}
        validation
        placeholder="Please select..."
        onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
          setFieldValue('service.id', event.target.value);

          const selectedService = services.find(
            (service) => service.id === event.target.value,
          ) as any;
          if (selectedService) setSelectedService(selectedService);
        }}
      />
      <MultilineTextInput
        source="service.issue"
        value={values.service?.issue}
        label="What problem is the vehicle having?"
        placeholder="Enter description of the vehicle malfunction that will be helpful for the job provider..."
        className={classes.serviceIssue}
        onChange={onProblemChangeHandler}
        rows={3}
      />

      {selectedService && <RateTypeInfo service={selectedService} />}
    </Box>
  );
};
