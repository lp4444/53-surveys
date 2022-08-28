import * as React from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import validateEmails from "../../utils/validateEmails";

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={meta.touched && !!meta.error}
    helperText={meta.touched ? meta.error : ""}
    onChange={(event, value) => input.onChange(event.target.value)}
  />
);

const required = (value) => (value ? undefined : "Required");

const SurveyForm = (props) => {
  const { onSurveySubmit, handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="mx-1">
      <form onSubmit={handleSubmit(onSurveySubmit)}>
        <div>
          <Field
            name="subject"
            label="survey title"
            multiline
            variant="standard"
            margin="normal"
            fullWidth
            component={TextFieldAdapter}
            validate={required}
          />
        </div>
        <div>
          <Field
            name="body"
            label="survey body"
            multiline
            minRows={2}
            variant="standard"
            margin="normal"
            fullWidth
            component={TextFieldAdapter}
            validate={required}
          />
        </div>
        <div>
          <Field
            name="recipients"
            label="recipient list (email)"
            multiline
            minRows={2}
            variant="standard"
            margin="normal"
            fullWidth
            component={TextFieldAdapter}
            validate={validateEmails}
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            Submit
          </Button>

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={reset}
            disabled={submitting || pristine}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
