const getFirstPathName = (pathname) => {
  const firstPathName = pathname?.split('/')?.[1];
  if (firstPathName) {
    return `/${firstPathName}`;
  }
  return '/';
};
export default getFirstPathName;
