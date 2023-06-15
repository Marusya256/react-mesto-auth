import React from 'react';
import './../App.css';
import { CurrentUserContext } from './../context/CurrentUserContext';
import logoMesto from './../images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import Card from './../components/Card';
import api from './../utils/Api';
import ImagePopup from './../components/ImagePopup';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleAddPlaceClick() {
    props.openAddPlace();
  };

  function handleEditProfileClick() {
    props.openEditProfile();
  };

  function handleEditAvatarClick() {
    props.editAvatar();
  };

  //реализация постановки и снятия лайка

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.updateLike(card._id, isLiked).then((newCard) => {
        props.setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => {
      alert(`failed to update like, err: ${err}`);
    });
  }

  //зумирование картинки

  const [selectedCard, setSelectedCard] = React.useState(null);
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //удаление карточек

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(info => {
      props.setCards(props.cards.filter(item => item._id !== cardId));
      closeAllPopups();
    }).catch(err => {
      alert(`failed to set user info, err: ${err}`);
    })
  }

  //delete token

  const navigate = useNavigate();

  function signOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }

  //close popup
  
  function closeAllPopups() {
    setSelectedCard(null);
  }


  return (
    <main>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <div className="header">
        <img className="logo"  src={logoMesto} alt="Логотип"/>
        <div className="header__conteiner-user">
          <p className="header__user-email">{props.userEmail}</p>
          <button className="button_type_header button_type_profile-exit" onClick={signOut}>Выйти</button>
        </div>
      </div>
      <div className="content">
        <section className="profile">
          <img className="profile__photo" src={currentUser.avatar} alt="Фото пользователя"/>
          <button type="button" className="profile__button-edit-photo" onClick={handleEditAvatarClick}></button>
          <div className="profile__info">
              <div className="profile__cover">
                <h1 className="profile__info-name" id="infoname">{currentUser.name}</h1>
                <button type="button" className="button button_type_edit" onClick={handleEditProfileClick}></button>
              </div>
              <p className="profile__info-about" id="infoabout">{currentUser.about}</p>
          </div>
          <button type="button" className="button button_type_add" onClick={handleAddPlaceClick}></button>
        </section>
        <section className="gallery">
          <div className="gallery__list">
            {props.cards.map((card, i) => {
              return <Card card={card} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={card._id}/>
            })}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Main;

