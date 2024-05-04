import React from 'react'
import Logo from '../Components/Logo/Logo'
import Button from '../Components/Button/Button'
import Card from '../Components/Card/Card'
import { CheckBox, Donate, Filter, Footer, Form, Header, Login, Notification, Profile, Upload } from '../Components'


// internal import
const layout = () => {
  return (
    <div className='home'>
      <Header />
      <Button />
      <Card /><Footer />
      <CheckBox /><Filter />
      <Donate /><Form />
      <Notification />
      <Profile />
      <Upload />
      <Login />
    </div>
  )
}

export default layout