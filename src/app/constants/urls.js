const URL = {
  HOME: '/',
  ADD_COMPREHENSION: '/add',
  DAILY_EXERCISE_COMPREHENSION: '/daily-exercise-comprehension',
  READ: '/read',
  READ_COMPREHENSION: '/read-comprehension',
  ALL_COMPREHENSIONS: '/comprehensions',
  QUESTIONS: '/questions',
  SEE_RESULTS: '/see-results',
};
export default URL;

const URL_TYPE = {
  USER: 1,
  ADMIN: 2,
  COMMON: 3,
  PUBLIC: 4,
};

export const ROLES_TYPES = {
  USER: [URL_TYPE.USER],
  ADMIN: [URL_TYPE.ADMIN],
  COMMON: [URL_TYPE.USER, URL_TYPE.ADMIN],
  PUBLIC: [URL_TYPE.PUBLIC],
};
