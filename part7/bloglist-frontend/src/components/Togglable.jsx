/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'



const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      {/* Show the button when visible is false */}
      {!visible && (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}
      {/* Show children and the cancel button when visible is true */}
      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;