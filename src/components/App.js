import './../App.css';
import React, { useEffect } from 'react';
import Main from './../components/Main';
import Footer from './../components/Footer';
import EditProfilePopup from './../components/EditProfilePopup';
import EditAvatarPopup from './../components/EditAvatarPopup';
import AddPlacePopup from './../components/AddPlacePopup';
import DeleteCard from './../components/DeleteCard';
import api from './../utils/Api';
import mestoAuth from './../utils/mestoAuth';
import { CurrentUserContext } from './../context/CurrentUserContext';
import { CurrentCardContext } from './../context/CurrentCardContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './../components/Login';
import Register from './../components/Register';
import InfoTooltip from './../components/InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";

function App() {

  //проверка токена

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const [currentUser, setСurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    //получение информации о текущем пользователе
    api.getInfoOwner().then(info => {
      setСurrentUser(info);
    }).catch(err => {
      alert(`failed to get owner info, err: ${err}`);
    })
    //получение карточек с сервера
    api.getInitialCards().then(cards => {
      setCards(cards);
    }).catch(err => {
      alert(`failed to get card info, err: ${err}`);
    })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth.getContent(jwt)
      .then(res => {
        handleLogin(res.data.email);
        navigate('/my-profile', {replace: true});
      })
      .catch(err => {
        alert(`failed to check token, err: ${err}`);
      })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  //реализация открытия поапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  //реализация закрытия поапов

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  //редактирование данных о пользователе

  function handleUpdateUser({name, about}) {
    api.setInfoUser(name, about).then(info => {
      setСurrentUser(info);
      closeAllPopups();
    }).catch(err => {
      alert(`failed to set user info, err: ${err}`);
    })
  }

  //редактирование аватара пользователя

  function handleUpdateAvatar(info) {
    api.updateAvatar(info.avatar).then(info => {
      setСurrentUser(info);
      closeAllPopups();
    }).catch(err => {
      alert(`failed to set user avatar, err: ${err}`);
    })
  }

  //реализация добавления карточки

  function handleAddPlace(item) {
    api.postCards(item).then(newCard => {
      setCards([newCard, ...cards]);      
      closeAllPopups();
    }).catch(err => {
      alert(`failed to set user info, err: ${err}`);
    })
  }
  
  // проверка запроса на регистрацию

  const [isGoodRequest, setIsGoodRequest] = React.useState(false); 

  function handleRegisteredFailed() {
    setIsGoodRequest(false);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleRegisteredSuccess() {
    setIsGoodRequest(true);
    setIsInfoTooltipPopupOpen(true);
  }

  return (
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardContext.Provider value={cards}>
            <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isGoodRequest={isGoodRequest} openInfoTooltip={handleInfoTooltipClick}/>
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
            <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>      
            <DeleteCard title="Вы уверены?" name="popup-delete" buttonText={'Да'}/>
            <Routes>
              <Route  path="/sign-up" element={<Register onRegisteredFailed={handleRegisteredFailed} onRegisteredSuccess={handleRegisteredSuccess}/>}/>
              <Route  path="/sign-in" element={<Login handleLogin={tokenCheck}/>}/>
              <Route  path="/" element={loggedIn ? <Navigate to="/my-profile" replace /> : <Navigate to="/sign-in" replace />} />
              <Route path="/my-profile" element={<ProtectedRoute loggedIn={loggedIn} cards={cards} setCards={setCards} openEditProfile={handleEditProfileClick} openAddPlace={handleAddPlaceClick} editAvatar={handleEditAvatarClick} userEmail={userEmail} element={Main}/>}/>
            </Routes>
            <Footer />            
          </CurrentCardContext.Provider>
        </CurrentUserContext.Provider>
      </div>
  )
  };

export default App;