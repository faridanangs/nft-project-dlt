import React from 'react'
import Logo from '../Components/Logo/Logo'
import Button from '../Components/Button/Button'
import Card from '../Components/Card/Card'
import { CheckBox, Donate, Filter, Footer, Form, Header, Login, Notification, Product, Profile, SignUp, Upload } from '../Components'


// internal import
const layout = () => {
  return (
    <div className='home'>
      <Header />
      <Product />
      <Upload />
      <Button />
      <Notification />
      <Filter />
      <Card />
      <Donate />
      <Form />
      <Login />
      <SignUp/>
      {/* <CheckBox /> */}
      {/* <Profile /> */}
      <Footer />
    </div>
  )
}

export default layout