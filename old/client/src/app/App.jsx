import { useEffect } from 'react';
import Login from '../components/auth/Login';
import { login,logout } from '../store/actions/actions';
import Logo from '../components/Logo'
import BrainDump from '../components/BrainDump'
import Time from '../components/Time'
import TopPriorities from '../components/TopPriorities'

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';

function App() {
  const isLoggedIn = useSelector(state => state.user.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/me');
        const userData = response.data;
        dispatch(login(userData));
        console.log(userData.user)
        // message.success('Logged in successfully');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          message.error('Not authorized please login');
          // dispatch(logout())
          // Handle unauthorized error here, e.g., redirect to login page
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>

      {!isLoggedIn ? (
        <div className="wrapper">
        <Logo />
        <div className="left">
          <TopPriorities />
          <BrainDump />
        </div>
        <Time />
      </div>
      ) : (
        <Login/>
      )}
    </>
  );
}

export default App;
