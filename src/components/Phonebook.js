import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import phonebook from '../images/phonebook.png'
import './Phonebook.css'

const PhoneBook = () => {
    const [contacts, updateContacts] = useState([])
    const [name, setName] = useState("")
    const [contact_number, setNumber] = useState("")

    useEffect(() => {
        axios.get('https://phonebooks-testing.herokuapp.com/api/v1/users/')
        .then(function(response){
            console.log(response.data)
            updateContacts(response.data)
        })
    },[])

    const refreshPage = () => {window.location.reload(false)}

    const handleSubmit = event => {
        event.preventDefault()
        if (name !== "" && contact_number !==""){
            axios.post('https://phonebooks-testing.herokuapp.com/api/v1/users/',{
                name,
                contact_number,
            })
            .then(response => {
                if (response.data){
                console.log(response.data)
                refreshPage()
                
              } else {
                toast.warn("Name or contact number cannot be blanked", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
              } 
          })
          .catch(error => {
            console.error(error.response) // so that we know what went wrong if the request failed
            toast.warn("Seems like you entered some invalid information, please check! 😉", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          })
        }
    }
    

    return (
        <>
        <Container className="pb-5 mt-5 phonebook">
            <Row className="justify-content-center pt-4 pb-4">
                <img src={phonebook}></img>
               <h1 className="title">Phonebook</h1> 
            </Row>
            
            <Row className="justify-content-around">
                <Col lg={3} sm={5} xs={12}>
                    <form onSubmit = {(e) => handleSubmit(e)}>
                        <label for="name">Name :</label>
                        <br></br>
                        <input className="w-100" type="text" placeholder="John Ellis" id="name" onChange = {(e) => setName(e.target.value)} value = {name}/>
                        <br></br>
                        <br></br>
                        <label for="contact_number">Contact Number :</label>
                        <br></br>
                        <input className="w-100" type="text" placeholder="+60123456789" id="contact_number" onChange = {(e) => setNumber(e.target.value)} value = {contact_number}/>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Save" className="btn btn-dark w-100"/>
                    </form>
                </Col>
                <Col sm={5} xs={12}>
                    <div>
                        {contacts.map((contact) => {
                            return (
                                <>
                                <div className="border-bottom border-dark-2 pt-3">
                                    <h5>{contact.name}</h5>
                                    <p>{contact.contact_number}</p>
                                </div>
                                
                                </>
                            )
                        })}
                    </div>
                </Col>
            </Row>
            
        </Container>
            
        
        
        </>
    )
}

export default PhoneBook