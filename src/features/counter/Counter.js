import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCount } from './counterSlice'

 export default  function  Counter  () {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

  return (
    <div> export defaultCounter</div>
  )
}
