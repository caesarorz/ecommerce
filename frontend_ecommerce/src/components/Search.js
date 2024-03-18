import {React, useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, createSearchParams } from 'react-router-dom'

export default function Search() {

    const [keyword, setKeyword] = useState('')
    const navegate = useNavigate()
    const params = { search: keyword};

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword) {
            navegate({
                pathname: "/",
                search: `?${createSearchParams(params)}`
            })
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            placeholder="Search"
            type="search"
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='me-2'  //'mr-sm-2 ml-sm-5'
            aria-label="Search"
        >

        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'
        >
            Submit</Button>
    </Form>
  )
}




