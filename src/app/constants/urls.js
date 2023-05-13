const URL = {
  HOME: '/',
  ADD_COMPREHENSION: '/add',
  COMPREHENSION: '/comprehension',
  READ: '/read',
  READ_COMPREHENSION: '/readComprehension',
  ALL_COMPREHENSIONS: '/comprehensions',
  QUESTIONS: '/questions',
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
