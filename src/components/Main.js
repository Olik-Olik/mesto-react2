import React, {useState, useContext, useEffect} from "react";
import Card from './Card';
import api from "../utils/Api";
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
//Имеем функц.компонент и подписываем его на контекст
 const currentUser1 = useContext(CurrentUserContext);
 const [cards, setCards] = useState([]);

 /*   function getCardsPromise() {
           return api.getInitialCards();
       }*/
     // function fetchInitData() {
    useEffect(() =>{
          Promise.all([ api.getInitialCards()]).then((values) => {
              const initialCards = values[0];
              console.log('Got cards!');
              setCards(initialCards);
          })
              .catch((err) => {
                  console.log('MAMA!!!: ' + err.toString())
              });
      })
    //  useEffect(fetchInitData, []);
//вместе и юзеры и карточки
    /*useEffect(() => {
        Promise.all([api.getInitialCards(),  api.getUserInfo()])
            .then(( [initialCards, userInfo]) => {
                console.log('Got cards!');
                setCurrentUser(userInfo);
                setCards(initialCards);

            })
            .catch((err) => {
                console.log('MAMA!!!: ' + err.toString());
            }, []);
    })*/





    // useEffect(() =>{api.getInitialCards();},[]);
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser1._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleEditAvatarOpen = (evt) => {
        console.log("I'm a superstar 1!!!")
        props.setisEditAvatarPopupOpen(true)
    }
    const handleEditProfileOpen = (evt) => {
        console.log("I'm a superstar 2!!!")
        props.setisEditProfilePopupOpen(true)
    }

    const handleAddPlaceOpen = (evt) => {
        console.log("I'm a superstar 3!!!")
        props.setisAddPlacePopupOpen(true)
    }

    const handleDeleteConfirmOpen = (evt) => {
        console.log("handleConfirmDeletePopup")
        props.setisEditProfilePopupOpen(true)
    }

    const handleImagePopupOpen = (evt) => {
        console.log("handleImagePopupOpen")
        props.setisImagePopup(true)
    }

    return (
        <CurrentUserContext.Provider value={currentUser1}>
        <main className="container">
            <section className="profile">
                <div className="profile__person-info">
                    <div className="profile__person-infobox">
                        <img alt="Аватар того, кто его вносит" className="profile__avatar"
                             src={currentUser1.avatar}
                            //в ТЗ сказано установить именно так, хотя src лучше
                            /*            style={{ backgroundImage: `url(${userAvatar})` }}*/

                        />
                        <div className="profile__avatar-edit-container">
                            <button className="profile__foto-edit-button" type="button"
                                    onClick={handleEditAvatarOpen}/>
                        </div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title-edit-button">
                            <h1 className="profile__title">{currentUser1.name}</h1>
                            <button className="profile__edit-button" type="button"
                                    onClick={handleEditProfileOpen}
                            />
                        </div>
                        <p className="profile__subtitle">{currentUser1.about} </p>
                    </div>
                </div>
                <div className="profile__button-container">
                    <button className="profile__add-button" type="button"
                            onClick={handleAddPlaceOpen}/>
                </div>
                {/*<div className="popup__container-delete-confirm">
                    <form action="#" aria-label='Вы уверены, что хотите удалить карточку?' className="popup__form"
                          id="popup-delete-card" name="deleteConfirmCard" noValidate>
                        <label className="popup__label"><h2 className="popup__page">Вы уверены?</h2></label>
                        <button aria-label='Кнопка уверенности в закрытии' className="popup__save" type="submit">Да
                        </button>
                    </form>
                </div>*/}
            </section>
            {/*Для этого его нужно «пробросить» в компонент Card сквозь компонент Main —
в виде пропса onCardClick.*/}
            <section className="elements">
                {cards &&
                cards.map(card => (
                    <Card card={card}
                          key={card._id}
                          src={card.link}
                          title={card.name}
                          alt={card.name}

                          onCardClick={props.onCardClick}
                          onCardDelete={props.onCardDelete}
                          onCardLike={props.onCardLike}

                    />)
                )
                }
            </section>
        </main>
      </CurrentUserContext.Provider>
    );
}
export default Main;



/*     function getUserInfoPromise() {
          return api.getUserInfo();
      }

      function fetchInitData() {
          Promise.all([getUserInfoPromise(), getCardsPromise()]).then((values) => {
              const initialCards = values[1];
              const userProfileInfo = values[0];
              const userInfo = {
                  'name': userProfileInfo.name,
                  'about': userProfileInfo.about,
                  'avatar': userProfileInfo.avatar,
                  'id': userProfileInfo._id
              }
        //меняю .user ---- карточки не вываливаются, что логично
            setCurrentUser(userInfo);
             currentUser1(userInfo);// Юзер с контекстом.
              console.log('Got cards!');
              setCards(initialCards);
          })
              .catch((err) => {
                  console.log('MAMA!!!: ' + err.toString())
              });
      }

      React.useEffect(fetchInitData, []);*/
