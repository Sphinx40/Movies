import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [activeItem, setActiveItem] = useState('home')
    

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }
    return (
      <Segment attached inverted >
        <Menu inverted pointing secondary >
          <Menu.Item
            icon='home'
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
          <Menu.Item
            name='favourites'
            active={activeItem === 'favourites'}
            onClick={handleItemClick}
            as={Link}
            to='/Favourites'
          />
          
        </Menu>
      </Segment>
    )
}
export default Navbar;