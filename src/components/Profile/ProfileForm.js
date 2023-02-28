import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlUoLonh8jMlZG_rKIcWwwNNZUomjYShU', {

      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => {
      history.replace('/')
    })

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
