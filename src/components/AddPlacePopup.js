import React from 'react';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <div className={`popup ${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">
        <h3 className="popup__header">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={handleSubmit}>
          <fieldset className="popup__field">
            <div className="popup__input-label">
              <input className="popup__input popup__input_img_name" onChange={handleChangeName} type="text" name="imgname" id="imgname" required placeholder="Название" minLength="2" maxLength="30"/>
              <span className="popup__input-error imgname-error"></span>
            </div>
            <div className="popup__input-label">
              <input className="popup__input popup__input_img_link"  onChange={handleChangeLink} type="url" name="imglink" id="imglink" required placeholder="Ссылка на картинку"/>
              <span className="popup__input-error imglink-error"></span>
            </div>    
            <button className="button button_type_sub" type="submit">{props.buttonText}</button>
          </fieldset>
        </form>
        <button type="button" className="button button_type_close close-edit" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default AddPlacePopup;

