import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import InfoTooltip from './components/InfoTooltip';
import { register, login, checkToken } from './utils/auth';


function App() {
   
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);
const [currentUser, setCurrentUser] = useState({});
const [cards, setCards] = useState([]);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [tooltipMessage, setToolTipMessage] = useState('');
const [isTooltipOpen, setIsTooltipOpen] = useState(false);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    checkToken(token)
      .then((data) => {
        setCurrentUser(data.data);
        setIsAuthenticated(true);
      })
      .catch((err) => console.log(err));
  }
}, []);

useEffect(() => {
  if (isAuthenticated) {
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
  }
}, [isAuthenticated]);
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
};

const handleCardDelete = (card) => {
  if(card.owner._id === currentUser._id) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => console.log(err));
  } else {
    console.log('You can only delete your own cards');
  }
};

const handleAddPlaceSubmit = (newCard) => {
  api.addCard(newCard)
    .then((addedCard) => {
      setCards([addedCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
};

const  handleRegister = (email, password) => {
    register(email, password).then((data) => {
      if(data) {
        setToolTipMessage('Registration succesful');
        setIsTooltipOpen(true);
      } else {
        setToolTipMessage('Registration failed');
        setIsTooltipOpen(true);
      }
    }).catch((err) => {
      setToolTipMessage('Registration failed');
      setIsTooltipOpen(true);
    });
  };

  const handleLogin = (email, password) => {
    login(email, password).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        setIsAuthenticated(true);
      } else {
        setToolTipMessage('Login failed');
        setIsTooltipOpen(true);
      }
    }).catch((err) => {
      setToolTipMessage('Login failed!');
      setIsTooltipOpen(true);
    });
  };

const handleLogout = () => {
  setIsAuthenticated(false);
  setCurrentUser({});
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
}



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <Router>
    <div className="page">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route path="/signin"element={<Login onLogin={handleLogin} />} />
        
<Route path="/" element= {<ProtectedRoute isAuthenticated={isAuthenticated} component={Main}/>}/>
</Routes>
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
      <InfoTooltip
        isOpen={isTooltipOpen}
        message={tooltipMessage}
        onClose={() => setIsTooltipOpen(false)}
      />

  
  </div>
  </Router>
  </CurrentUserContext.Provider>
);
}

export default App;
