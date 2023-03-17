import * as yup from 'yup';

const COMPREHENSION_SCHEMA = yup.object().shape({
  title: yup.string(),
  comprehension: yup.string(),
  questions: yup.array(),
  level: yup.array(),
});

export default COMPREHENSION_SCHEMA;
