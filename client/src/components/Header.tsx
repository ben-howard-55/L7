import { Button, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { logout } from '../redux/authSlice/thunks/logoutThunk';
import { RootState, useAppDispatch } from '../redux/store';

const Header: React.FC = () => {
  const selector = (state: RootState) => state.auth.user;
  const dispatch = useAppDispatch();
  const username = useSelector(selector);

  return (
    <Navbar>
      <Navbar.Brand>L7</Navbar.Brand>
      <Nav.Link href={'/dashboard'}>Dashboard</Nav.Link>
      <Navbar.Collapse />
      <Nav.Item>
        Signed in as {username}{' '}
        <Button className={'ml-2'} variant={'outline-primary'} onClick={() => dispatch(logout())}>
          Sign Out
        </Button>
      </Nav.Item>
    </Navbar>
  );
};

export default Header;
