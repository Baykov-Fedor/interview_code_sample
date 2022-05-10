import React from 'react';
import { Edit, SimpleForm } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { BottomToolbar } from '../BottomToolbar';
import { useFormStyles } from 'styles/commonStyles';
import theme from 'styles/theme';

export const JobEditForm = (props: any) => {
  const classes = useStyles();
  const basicClasses = useFormStyles();
  const formClasses = classnames(basicClasses.form, classes.form);

  return (
    <Edit {...props} className={classnames(basicClasses.root, props.className)} undoable={false}>
      <SimpleForm
        toolbar={<BottomToolbar {...props} disabled={props.isJobLocked} />}
        className={formClasses}
        validate={props.validation}
      >
        {props.children}
      </SimpleForm>
    </Edit>
  );
};

export const useStyles = makeStyles(() => ({
  form: {
    backgroundColor: theme.palette.common.white,
  },
}));
