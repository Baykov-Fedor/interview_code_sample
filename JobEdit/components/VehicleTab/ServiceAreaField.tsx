import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { MapPinIcon, ServiceAreaIcon, NoMapPinIcon } from '../../../../../components/Icons';
import { IProviderLocation } from '../../../../../components/Map/Map.interface';
import { OfflineStatusDot, OnlineStatusDot } from '../../../../../components/Dots';
import { useServiceAreaUpdate } from 'utils/hooks/useLocationUpdate';
import { useProvidersLocations } from '../../../../../contexts/ProvidersLocationsContext';
import { useServiceAreas } from 'utils/hooks/useServiceAreas';
import { findServiceArea } from 'utils/findMatchingServiceArea';
import { splitByActivity } from '../../../../../helpers/providerHelpers';
import { boldDefaultBorder, defaultBorder } from 'styles/commonStyles';
import { IServiceArea } from '../../../../../mainInterfaces';
import { currencyFormat } from '../../../../../helpers/formatHelpers';
import { useStyles } from './style';
import { useMap } from 'utils/hooks/Map/useMap';

interface JobCompanyDetails {
  name: string;
  override: boolean;
  base: number;
  callout: number;
  afterhour: number;
}

interface ServiceAreaFieldProps {
  jobCompanyDetails: JobCompanyDetails | null;
}

export const ServiceAreaField = ({ jobCompanyDetails }: ServiceAreaFieldProps) => {
  const { coordinates, address } = useMap();
  const { getProvidersFromArea } = useProvidersLocations();
  const updateServiceAreaField = useServiceAreaUpdate();
  const [matchedServiceArea, setMatchedServiceArea] = useState<any>();
  const [providersInServiceArea, setProvidersInServiceArea] = useState<any>();
  const { serviceAreas, isLoadingAreas } = useServiceAreas();
  const isOutsideServiceArea = !matchedServiceArea && address.value;

  useEffect(() => {
    if (serviceAreas) {
      const serviceArea = findServiceArea(coordinates, serviceAreas);
      setMatchedServiceArea(serviceArea);

      serviceArea && setProvidersInServiceArea(getProvidersFromArea(serviceArea));
    }
  }, [serviceAreas, coordinates, getProvidersFromArea]);

  useEffect(() => {
    updateServiceAreaField({ serviceArea: matchedServiceArea });
  }, [matchedServiceArea, updateServiceAreaField]);

  if (isLoadingAreas) return <Loader text="Loading" />;
  if (!serviceAreas) return null;

  const initialState = !address.value;
  const [onlineProviders, offlineProviders] = splitByActivity(providersInServiceArea);

  return (
    <Box mb={2}>
      {initialState && <ServiceAreaInitialState />}
      {matchedServiceArea && address.value && (
        <ServiceAreaMatchedState
          area={matchedServiceArea}
          providers={{ offlineProviders, onlineProviders }}
          jobCompanyDetails={jobCompanyDetails}
        />
      )}
      {isOutsideServiceArea && <ServiceAreaNotMatchedState />}
    </Box>
  );
};

export const ServiceAreaBadge = ({
  serviceAreaName,
  className,
}: {
  serviceAreaName: string;
  className?: string;
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" className={className}>
      <ServiceAreaIcon className={classes.serviceAreaIcon} />
      <Typography variant="body1" component="span" className={classes.boldText}>
        {serviceAreaName}
      </Typography>
    </Box>
  );
};

export const ServiceAreaStat = ({
  prefix,
  value,
  label,
}: {
  prefix?: any;
  value: number | string;
  label: string;
}) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" component="span" className={classes.statLabel}>
      {prefix}
      <Typography variant="body2" component="span" className={classes.statValue}>
        {value}
      </Typography>
      {label}
    </Typography>
  );
};

export const Loader = ({ text }: { text: string }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      border={boldDefaultBorder}
      py={5}
      px={3}
    >
      <CircularProgress className={classes.loader} size={16} />
      <Typography variant="body1" component="span" color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

export const ServiceAreaInitialState = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={5}
      px={3}
      className={classes.container}
    >
      <MapPinIcon className={classes.pinIcon} />
      <Box>
        <Typography variant="body2" component="span" className={classes.title}>
          Service Area details will appear here.
        </Typography>
        <Typography variant="caption" component="p" color="textSecondary">
          Enter the address to check if it’s within any of the supported areas.
        </Typography>
      </Box>
    </Box>
  );
};

interface ServiceAreaMatchedStateProps {
  area: IServiceArea;
  providers: {
    onlineProviders: IProviderLocation[];
    offlineProviders: IProviderLocation[];
  };
  jobCompanyDetails: JobCompanyDetails | null;
}

export const ServiceAreaMatchedState = ({
  area,
  providers: { onlineProviders, offlineProviders },
  jobCompanyDetails,
}: ServiceAreaMatchedStateProps) => {
  const classes = useStyles();

  let serviceAreaName = `${area.name} Service Area`;
  let perHourRate = currencyFormat(area.base);
  let calloutRate = currencyFormat(area.callout);
  let afterHourRate = currencyFormat(area.afterHour);
  if (jobCompanyDetails?.override) {
    serviceAreaName += ` - ${jobCompanyDetails?.name} Rates`;
    perHourRate = currencyFormat(jobCompanyDetails.base);
    calloutRate = currencyFormat(jobCompanyDetails.callout);
    afterHourRate = currencyFormat(jobCompanyDetails.afterhour);
  }
  return (
    <Box p={2} className={classes.container}>
      <ServiceAreaBadge serviceAreaName={serviceAreaName} />
      <Box borderTop={defaultBorder} pt={1.5} mt={1} display="flex" flexWrap="wrap">
        <ServiceAreaStat value={perHourRate} label="per hour" />
        <ServiceAreaStat value={calloutRate} label="travel (callout)" />
        <ServiceAreaStat value={afterHourRate} label="afterhour add" />
        <ServiceAreaStat
          prefix={<OnlineStatusDot />}
          value={onlineProviders.length}
          label="online providers"
        />
        <ServiceAreaStat
          prefix={<OfflineStatusDot />}
          value={offlineProviders.length}
          label="offline providers"
        />
      </Box>
    </Box>
  );
};

export const ServiceAreaNotMatchedState = () => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={5}
      px={3}
      className={classes.container}
    >
      <NoMapPinIcon className={classes.pinIcon} />
      <Box>
        <Typography
          variant="body2"
          component="span"
          className={classNames(classes.title, classes.errorTitle)}
        >
          Provided location is not within any of the supported areas.
        </Typography>
        <Typography variant="caption" component="p" color="textSecondary">
          Enter different location or create a new service area to support this location.
        </Typography>
      </Box>
    </Box>
  );
};
