import React from 'react';
import { CurrentUserContext } from './../context/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <div className={`popup ${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">
        <h3 className="popup__header">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={handleSubmit}>
          <fieldset className="popup__field">
            <div className="popup__input-label">
              <input className="popup__input popup__input_user_name" onChange={handleChangeName} type="text" name="username" id="username" required placeholder="Введите имя" minLength="2" maxLength="40" value={name || ''}/>
              <span className="popup__input-error username-error"></span>
            </div>      
            <div className="popup__input-label">
              <input className="popup__input popup__input_user_about" onChange={handleChangeDescription} type="text" name="aboutuser" id="aboutuser" required placeholder="Напишите о себе" minLength="2" maxLength="200" value={description || ''}/>
              <span className="popup__input-error aboutuser-error"></span>
            </div>
            <button className="button button_type_sub" type="submit">{props.buttonText}</button>
          </fieldset>
        </form>
        <button type="button" className="button button_type_close close-edit" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default EditProfilePopup;