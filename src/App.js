import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import closeIcon from './images/Close__Icon.png';
import CurrentUserContext from './components/CurrentUserContext';
import api from './utils/api';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup'


function App() {
   
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);
const [currentUser, setCurrentUser] = useState({});
const [cards, setCards] = useState([]);

useEffect(() => {
  api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => console.log(err));


api.getCards()
  .then((cardData) => {
    console.log(cardData);
    setCards(cardData);
  })
  .catch((err) => console.log(err));
}, []);
console.log(cards);

const handleEditAvatarClick = () => {
  setEditAvatarPopupOpen(true);
};

const handleEditProfileClick = () => {
  setEditProfilePopupOpen(true);
};

const handleAddPlaceClick = () => {
  setAddPlacePopupOpen(true);
}

const handleCardClick = (card) => {
  setSelectedCard(card);
}

const closeAllPopups = () => {
  setEditProfilePopupOpen(false);
  setAddPlacePopupOpen(false);
  setEditAvatarPopupOpen(false);
  setSelectedCard(null);
};

const handleUpdateUser =(userData) => {
  api.updateUserInfo(userData)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

const handleUpdateAvatar = (avatarData) => {
  api.setUserAvatar(avatarData)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}



const handleCardLike = (card) => {
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch((err) => console.log(err));
}

const handleCardDelete = (card) => {
  if(card.owner._id === currentUser._id) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => console.log(err));
  } else {
    console.log('You can only delete your own cards');
  }
}

const handleAddPlaceSubmit = (newCard) => {
  api.addCard(newCard)
    .then((addedCard) => {
      setCards([addedCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <Footer />

      <EditProfilePopup 
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      /> 

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      

  
  </div>
  </CurrentUserContext.Provider>
);
}

export default App;
