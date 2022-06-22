import './Navbar.css';
import { UserCirclePlus, ChatCenteredDots, BellSimple } from "phosphor-react";

function Navbar() {

  return (

    <nav className='navbar'>
      <a href="/chat">
        <img className="navbarLogo" src={`${process.env.PUBLIC_URL}/images/chatbox-navbar.svg`} alt="Logo"></img>
        <span className='navbar-chatbox-text'>ChatBox</span>
      </a>
      <ul>
        <li>
          <a href="#" className="findFriends"> 
            <UserCirclePlus size={32} />
          </a>
        </li>
        <li>
          <a href="/chat" className="chat">
            <ChatCenteredDots size={32} weight="duotone" />
          </a>
        </li>
        <li>
          <a href="#" className="notifications">
            <BellSimple size={32} />
          </a>
        </li>
      </ul>
    </nav>


  );
}

export default Navbar;
