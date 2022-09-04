import * as React from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import validateEmails from "../../utils/validateEmails";
import Box from "@mui/material/Box";

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
    <Box sx={{ px: 1 }}>
      <form onSubmit={handleSubmit(onSurveySubmit)}>
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

        <Stack spacing={1} direction="row">
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
        </Stack>
      </form>
    </Box>
  );
};

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
