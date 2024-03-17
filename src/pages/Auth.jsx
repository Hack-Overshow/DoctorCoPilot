import React, { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vinsezijkogqvgujzlzv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpbnNlemlqa29ncXZndWp6bHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDIzMDEsImV4cCI6MjAyNjE3ODMwMX0.2DYKH_DbsOtTti_dK3kbIrVTK9Lz_IBl429uWSKHXMk')

function Authentication() {
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


  
  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (<div>Logged in!</div>)
  }
}

export default Authentication;
