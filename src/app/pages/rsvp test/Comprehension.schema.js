import * as yup from 'yup';

const COMPREHENSION_SCHEMA = yup.object().shape({
  title: yup.string(),
  comprehension: yup.string(),
  questions: yup.array(),
  level: yup.array(),
  wordCount: yup.number(),
});

export default COMPREHENSION_SCHEMA;
