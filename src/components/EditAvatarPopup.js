import React from 'react';

function EditAvatarPopup(props) {

  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
  }

  return (
    <div className={`popup ${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">
        <h3 className="popup__header">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={handleSubmit}>
          <fieldset className="popup__field">
            <div className="popup__input-label">
              <input className="popup__input popup__input_img_update" ref={userAvatar} type="url" name="imgupdate" id="imgupdate" required placeholder="Ссылка на картинку"/>
              <span className="popup__input-error imgupdate-error"></span>
            </div>   
            <button className="button button_type_sub" type="submit">{props.buttonText}</button>
          </fieldset>
        </form>
        <button type="button" className="button button_type_close close-edit" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default EditAvatarPopup;

