import React from 'react'
import Button from '../Buttons/Button'
import './Header.css'
import mainLogo from '../../images/logo.png'

class Header extends React.Component {

    state = {
        isMenuOpened: false
    };

    render() {
        var adaptiveMenu = this.state.isMenuOpened &&
            <div className="burger-menu">
                <Button caption={"О программе"} class={"Menu-button Burger-Menu-button"}/>
                <Button caption={"Справка"} class={"Menu-button Burger-Menu-button"}/>
                <Button caption={"Контакты"} class={"Menu-button Burger-Menu-button"}/>
            </div>;

        return (
            <div className={this.state.isMenuOpened ? 'menu-opened' : ''}>
                <div className="header">
                    <div className="header-caption-logo">
                        <div className="header-caption">Ежедневная готовка</div>
                        <img src={mainLogo} alt="" className="header-logo"/>
                    </div>
                    <div className="header-Menu">
                        <Button caption={"О программе"} class={"Menu-button"}/>
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
            </div>
        )
    }

    toggleMenu = () => {
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    }
}

export default Header