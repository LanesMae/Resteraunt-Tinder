import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import '../Login/login.css'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    goodPassword = (password) => {
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const minLengthRegExp   = /.{8,}/;
        if(password.match(uppercaseRegExp) && password.match(lowercaseRegExp) && password.match(digitsRegExp) && password.match(minLengthRegExp)){
            return true;
        }
        return false;
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(!this.goodPassword(this.state.password)){
            alert("one capital letter, one lower, one number, minimum of 8 characters")
        }else if(this.state.password === this.state.confirmPassword){
            axios.post(baseUrl + "/register", data)
                .then(response => {
                    if (response.status === 201) {
                        alert("Account created successfully")
                    }
                })
                .catch((error) => alert(error.response.data.message))
        }
        else{
            alert("Password and Confirm Password must match!!!")
        }
        
    }

    render(){
        return(
            <div className='register'>
                <h1>Create Account</h1>
                <Form>
                <label class="sr-only">Username</label>
                <FormGroup>
                <Input
                    type="email"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <FormGroup>
                <label class="sr-only">Password</label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <FormGroup>
                <Input
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                </FormGroup>
                <br/>
                <Button color='primary' type="submit" onClick={this.handleSubmit}>Register</Button>
                </Form>
                <Link to="/login">Have an account?</Link>

            </div>
        )
    }
}

export default Register;