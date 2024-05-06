import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import './register.css';
class Register extends Component {

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                name: '',
                username: '',
                password: '',
                age: '',  // Demographic information
                gender: '',  // Demographic information
                personalityTraits: {  // Example of personality traits
                    openness: 0,
                    conscientiousness: 0,
                    extroversion: 0,
                    agreeableness: 0,
                    neuroticism: 0
                }
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);
        const {id, value} = event.target;
        if (id in updateDetails.personalityTraits) {
            updateDetails.personalityTraits[id] = value;
        } else {
            updateDetails[id] = value;
        }
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <div className={"register-container"}>
            <Form className='form-control'>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group controlId="username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.password}  type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.age} type="number" placeholder="Age" />
                </Form.Group>

                <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.gender} as="select">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>

                <Form.Label>Personality Traits</Form.Label>
                {Object.keys(this.state.details.personalityTraits).map(trait => (
                    <Form.Group controlId={trait} key={trait}>
                        <Form.Label>{trait.charAt(0).toUpperCase() + trait.slice(1)}</Form.Label>
                        <Form.Control type="range" min="0" max="100" value={this.state.details.personalityTraits[trait]} onChange={this.updateDetails} />
                    </Form.Group>
                ))}
                <Button onClick={this.register}>Register</Button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);