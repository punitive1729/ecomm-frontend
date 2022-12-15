import './form-input.styles.scss';
const FormInput = ({ labelName, ...otherProps }) => {
  return (
    <div className='form-input-container'>
      <input className='form-input' {...otherProps} />
      {labelName && (
        <label
          className={`form-input-label ${
            otherProps.value.length ? 'shrink' : ''
          }`}
        >
          {labelName}
        </label>
      )}
    </div>
  );
};

export default FormInput;
