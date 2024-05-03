import React from 'react'
import Logo from '../Components/Logo/Logo'
import Button from '../Components/Button/Button'
import Card from '../Components/Card/Card'
import { CheckBox, Donate, Filter, Footer, Form } from '../Components'


// internal import
const layout = () => {
  return (
    <div className='home'><Logo /><Button /><Card /><Footer /><CheckBox /><Filter /><Donate /><Form /></div>
  )
}

export default layout