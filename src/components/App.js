import React, {useEffect} from "react";
import '../index.css';
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api"
//import {useState, useEffect} from "react";

export default function App() {

    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setisImagePopupOpen] = React.useState(false);
    /*  const [isConfirmDeletePopup, setConfirmDeletePopup] = React.useState(false);*/
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isConfirmDeletePopup, setisConfirmDeletePopup] = React.useState(false);
    const [search, setSearch] = React.useState('');

    function getCardsPromise() {
        return api.getInitialCards();
    }

    function getUserInfoPromise() {
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
            setCurrentUser(userInfo);
            console.log('Got cards!');
            setCards(initialCards);
        })
            .catch((err) => {
                console.log('MAMA!!!: ' + err.toString())
            });
    }

    useEffect(fetchInitData, []);

    function handleEditAvatarClick(evt) {
        console.log("I'm a walrus!!!")
        setisEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(evt) {
        console.log("I'm a walrus 2!!!")
        setisEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(evt) {
        console.log("I'm a walrus 3!!!")
        setisAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        console.log("I'm a walrus 4!!!")
        setSelectedCard(card);
        setisImagePopupOpen(true);
    }

    function handleConfirmDeletePopup(evt) {
        console.log("I'm a walrus handleConfirmDeletePopup!!!")
        setisConfirmDeletePopup(true);
    }

    function closeAllPopups() {
        console.log("I was so close...")
        setisEditAvatarPopupOpen(false);
        setisEditProfilePopupOpen(false);
        setisAddPlacePopupOpen(false);
        setisImagePopupOpen(false);
/*        setisConfirmDeletePopup(false);*/
    }

    /*    //пока удаление не нужно
        function handleDeleteConfirm(){
            setisConfirmDeletePopup(true)
            closeAllPopups()
        }*/

    return (
        <>
            <body className="root">
            <Header/>
            <Main
                currentUser={currentUser}
                cards={cards}
                onCardClick={handleCardClick}
                setisEditAvatarPopupOpen={(evt) => {
                    console.log("I'm a superstar avatar!!!")
                    handleEditAvatarClick(evt)
                    /*  isEditAvatarPopupOpen = {isEditAvatarPopupOpen}*/
                }}

                setisEditProfilePopupOpen={(evt) => {
                    console.log("I'm a superstar too!!!")
                    handleEditProfileClick(evt)
                }}

                setisAddPlacePopupOpen={(evt) => {
                    console.log("I'm a superstar too too!!!")
                    handleAddPlaceClick(evt)
                }}

                setisConfirmDeletePopup={(evt) =>
                    handleConfirmDeletePopup(evt)
                }

                setisImagePopup={(evt) =>
                    handleCardClick(evt)
                }

                /*function handleSubmitProfileClick{(evt) =>
                evt.preventDefault()
                props.addProfile({title:handleName,
                                  name:handleJob})
            }*/
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                /*         onSubmit={handleSubmitAvatar}*/
                buttonText="Cохранить"/>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                buttonText="Сохранить"
                /*    isSubmit ={handleSubmitProfileClick}*/
                /*     addProfile =*/
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                buttonText="Добавить"/>

            <ConfirmDeletePopup
                isOpen={isConfirmDeletePopup}
                onClose={closeAllPopups}
                buttonText="Да"/>
            {/*  isRemove={handleRemoveClick}
             isSubmit={handleSubmitConfirmClick}*/}

            <ImagePopup
                isOpen={isImagePopupOpen}
                card={selectedCard}
                onClose={closeAllPopups}
                />
            <Footer/>
            </body>
        </>

    );
}