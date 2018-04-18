import React from 'react'
import Button from '../Buttons/Button'
import './Header.css'
import mainLogo from '../../images/logo.png'
import Popup from "../Popup/Popup";

class Header extends React.Component {

    state = {
        isMenuOpened: false,
        isPopupOpened: false,
        popupsState: null
    };

    render() {
        var popupInfo = [{
                caption: 'О программе',
                info: 'Программа в разработке'
            }, {

                caption: 'О программе',
                info: 'Программа в разработке'
            }, {

                caption: 'О программе',
                info: 'Программа в разработке'
            }
            ]
            , adaptiveMenu = this.state.isMenuOpened &&
            <div className="burger-menu">
                <Button caption={"О программе"} class={"Menu-button Burger-Menu-button"}/>
                <Button caption={"Справка"} class={"Menu-button Burger-Menu-button"}/>
                <Button caption={"Контакты"} class={"Menu-button Burger-Menu-button"}/>
            </div>,
            popupContent = this.state.popupOpened && <div>
                <div className=".controls-Popup__window-caption">
                    (this.state.popupsState === 0 ? {popupInfo[0].caption} : this.state.popupsState === 1 ? {popupInfo[1].caption} : {popupInfo[2].caption})
                </div>;
                <div className = ".controls-Popup__window-info" >
                    (this.popupState === 0 ? {popupInfo[0].info} : this.popupState === 1 ? {popupInfo[1].info} : {popupInfo[2].info})
                </div>
            </div>;
        return (
            <div
                className={'controls-'.concat(this.constructor.name + ' ').concat(this.state.isMenuOpened ? 'menu-opened' : '')}>
                <div className="header">
                    <div className="header-caption-logo">
                        <div className="header-caption">Ежедневная готовка</div>
                        <img src={mainLogo} alt="" className="header-logo"/>
                    </div>
                    <div className="header-Menu">
                        <Button caption={"О программе"} class={"Menu-button"} handler={this.showInfoPopup.bind(this)}/>
                        <Button caption={"Справка"} class={"Menu-button"}/>
                        <Button caption={"Контакты"} class={"Menu-button"}/>
                    </div>
                    <div className="header-Menu-burger" onClick={this.toggleMenu}>
                        <div className="burger-menu-slice"/>
                        <div className="burger-menu-slice"/>
                        <div className="burger-menu-slice"/>
                        <div className="burger-menu-slice"/>
                    </div>
                </div>
                {adaptiveMenu}
                <Popup opened={this.state.isPopupOpened} content={popupContent}/>
            </div>
        )
    }

    toggleMenu = () => {
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    }

    showInfoPopup = () => {
        this.setState({isPopupOpened: true, popupsState: 1});
    }
}

export default Header