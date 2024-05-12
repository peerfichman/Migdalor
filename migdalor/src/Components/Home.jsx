import React, {useState}from 'react';
import styled from 'styled-components';
import yourImage from './Image/magnifying-glass.png';
import Icons from './Image/לוגו.png';


const PageContainer = styled.div`
  background-color: #f0e6d2;
  color: #333;
  font-family: 'Arial', sans-serif;
`;

const SearchIcon = styled.button`
background-image: url(${yourImage});
  width: 50px; // גודל הכפתור
  height: 50px; // גודל הכפתור
  border: none;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem;
  background-size: cover; 
  background-position: center;
`;

const SearchInput = styled.input`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  left: 0;
  top: 0;
  padding: 1rem;
`;




const BurgerButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  cursor: pointer;
`;


const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffd700;
  padding: 0.5rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
    margin-right: 0.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #add8e6;
  border: none;
  padding: 1rem;
  margin: 0.5rem;
`;

const HomePage = () => {
    const [isSearchOpen, setSearchOpen] = useState(false);
  
  return (
    <PageContainer>
         <SearchIcon onClick={() => setSearchOpen(!isSearchOpen)} />
         <SearchInput isOpen={isSearchOpen} placeholder='חיפוש...' />
         <BurgerButton>☰</BurgerButton>

      <NavBar>
        <NavItem>
          <Icon src={Icons} alt='icon' />
          דף הבית
        </NavItem>
        {/* Repeat NavItem for other icons and text */}
      </NavBar>
      <ButtonRow>
        <Button>כפתור 1</Button>
        <Button>כפתור 2</Button>
        <Button>כפתור 3</Button>
        <Button>כפתור 4</Button>
        <Button>כפתור 5</Button>
        <Button>כפתור 6</Button>
        <Button>כפתור 7</Button>
        <Button>כפתור 8</Button>
        {/* Repeat Button for other rows and text */}
      </ButtonRow>
    </PageContainer>
  );
};

export default HomePage;
















