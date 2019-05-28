export const SUBMIT = 'SUBMIT';
export const CHANGE = 'CHANGE';

export const onSubmitClick = text => ({
  type: SUBMIT,
  text: text,
});

export const handleChange = value => ({
  type: CHANGE,
  value: value,
});
