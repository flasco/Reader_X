
export const isBlank = (str) => {
  if ('undefined' !== typeof str && 'string' !== typeof str ) {
    return false;
  }
  if ('undefined' === typeof str || str.trim() === '') {
    return true;
  }
  return false;
}
