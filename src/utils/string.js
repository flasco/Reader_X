
export const isBlank = (str) => {
  if ('undefined' === typeof str || str.trim() === '') {
    return true;
  }
  return false;
}
