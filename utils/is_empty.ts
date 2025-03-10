const IsEmpty = (value: string | undefined) => {
  if (value === undefined || value === null || value.length === 0) {
    return true;
  }
  return false;
}
export default IsEmpty;