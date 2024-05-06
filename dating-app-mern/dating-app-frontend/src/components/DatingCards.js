import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPeople } from '../actions/datingActions';
import DatingCard from 'react-tinder-card'
import './DatingCards.css'
class DatingCards extends Component {
    componentDidMount() {
        this.props.fetchPeople();
    }

    render() {
        const { people } = this.props;
        const swiped = (direction, nameToDelete) => {
            console.log("receiving " + nameToDelete)
        }
        const outOfFrame = (name) => {
            console.log(name + " left the screen!!")
        }
        return (
            <div className="datingCards">
                <div className="datingCards__container">
                    {people.map((person) => (
                        <DatingCard
                            className="swipe"
                            key={person.name}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, person.name)}
                            onCardLeftScreen={() => outOfFrame(person.name)} >
                            <div style={{ backgroundImage: `url(${person.imageUrl})`}} className="card">
                                <h3>{person.name}</h3>
                            </div>
                        </DatingCard>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    people: state.people.people,
    error: state.people.error
});

const mapDispatchToProps = {
    fetchPeople
};

export default connect(mapStateToProps, mapDispatchToProps)(DatingCards);
