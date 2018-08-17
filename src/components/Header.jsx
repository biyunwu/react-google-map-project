import React, { Component } from 'react'
import Burger from '../bar.svg'

export default class Header extends Component {
    render () {
        return(
            <header id='header'>
                <div className='title'>
                    <h1>
                        <button onClick={() => this.props.onSetSidebarOpen(true)}>
                            <img id='menubar' src={Burger} alt='Menu icon'/>
                        </button>
                        Favourite Restaurants in NYC
                    </h1>
                </div>
            </header>
        )
    }
}