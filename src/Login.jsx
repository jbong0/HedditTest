import React, { Component } from 'react'
import { Form, FormControl, FormGroup, Row, Button } from 'react-bootstrap'
// import Background from '../images/binaryRain.mp4'
import Logo from '../images/heddit.png'
import './Login.css'



class Login extends Component {
    constructor(){
        super()
        this.state = {
            // videoURL: Background
        }
      }
    
    render() {
        return (
            <body className='login-body'> 
                <div className="login-form">
                <Form horizontal>
                <a href='/'>
                    <img className='eye-logo' src={Logo} alt='Heddit Logo'/>
                </a>
                <FormGroup controlId="Email">
                    <Row sm={10}>
                    <FormControl type="email" placeholder="Email" />
                    </Row>
                </FormGroup>

                <FormGroup controlId="Password">
                    <Row sm={10}>
                    <FormControl type="password" placeholder="Password" />
                    </Row>
                </FormGroup>
                <Button type="submit" href="/TextEditor">Login</Button>
                <Button type="post" bsStyle='success'>Sign Up</Button>
                </Form>
                </div>    
            </body>
        );
    }
}

export default Login;