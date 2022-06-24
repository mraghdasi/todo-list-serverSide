import { forwardRef } from 'react';
const InputText = forwardRef((props, ref) => {
  return <input ref={ref} type='text' {...props} />;
});

InputText.displayName = 'InpuText';

export default InputText;
