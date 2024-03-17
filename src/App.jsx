import React, { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Onboard, NotFound, Authentication, Talk , Pre } from './pages';

const supabase = createClient('https://vinsezijkogqvgujzlzv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpbnNlemlqa29ncXZndWp6bHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDIzMDEsImV4cCI6MjAyNjE3ODMwMX0.2DYKH_DbsOtTti_dK3kbIrVTK9Lz_IBl429uWSKHXMk')

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 2-second loading time, replace this with actual loading logic
    return () => clearTimeout(timer);
  }, []);

  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <Pre />;
  }

  
  if (!session) {
    return (<div><div className="App">
    <Router>
      
      <Routes>
        <Route path="/" element={<Onboard />} />
         <Route path="/onboarding" element={<Onboard />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/p" element={<Pre />} />

         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </div></div>)
  } else {
    return (<div><div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Talk />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/onboarding" element={<Onboard />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/p" element={<Pre />} />

         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </div></div>)
  }
}

export default App;
