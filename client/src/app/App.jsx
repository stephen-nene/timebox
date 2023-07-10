import { useEffect } from 'react';
import './App.css';
import Login from '../components/auth/Login';
import Home from '../components/Home';
import { login } from '../store/actions/actions';
import { Route, Routes } from 'react-router-dom';
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
        // message.success('Logged in successfully');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          message.error('Not authorized');
          // Handle unauthorized error here, e.g., redirect to login page
        } else {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
