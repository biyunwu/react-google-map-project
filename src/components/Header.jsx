import React, { Component } from 'react'
import Burger from '../bar.svg'

export default class Header extends Component {
    render () {
        return(
            <header id='header'>
                <div className='title'>
                    <h1 id='titlecontent'>
                        <button onClick={() => this.props.onSetSidebarOpen(true)}>
                            {!this.props.sidebarDocked && <img id='menubar' src={Burger} alt='Menu icon'/>}
                        </button>
                        <span id='headertext'>Fav. Restaurants NYC</span>
                    </h1>
                </div>
            </header>
        )
    }
}