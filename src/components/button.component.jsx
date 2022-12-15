import './button.styles.scss';
const BUTTON_TYPES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};
const Button = ({ text, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES[buttonType]}`}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default Button;
