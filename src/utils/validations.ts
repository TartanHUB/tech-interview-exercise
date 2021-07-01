export const requiredField = (value: string) => {
  if (!value || String(value).trim() === '') {
    return 'This field is required';
  }
  return undefined;
};
