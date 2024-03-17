import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import doct from '../assets/doct.gif'; // Import the image
import bot from '../assets/bot.png'; // Import the image

const supabase = createClient('https://vinsezijkogqvgujzlzv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpbnNlemlqa29ncXZndWp6bHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDIzMDEsImV4cCI6MjAyNjE3ODMwMX0.2DYKH_DbsOtTti_dK3kbIrVTK9Lz_IBl429uWSKHXMk');

function Authentication() {
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = supabase.auth.user();
        if (user) {
          setUserData({
            username: user.user_metadata.username,
            email: user.email,
          });
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({
        email: username, // Supabase uses email for authentication, so you need to adapt it
        password: password,
      });
      if (error) throw error;
      console.log('User:', user);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-700 p-10 rounded-xl shadow-lg max-w-sm w-full overflow-hidden relative">
          <div className="">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen  text-white">
    <div className="text-center">
      <img
 src={bot}        alt="Placeholder Image"
        className="mb-4 h-[500px]  "
      />
       <Link to="/talk" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
Talk Now    </Link>
    </div>
  </div>

    );
  }
}

export default Authentication;
