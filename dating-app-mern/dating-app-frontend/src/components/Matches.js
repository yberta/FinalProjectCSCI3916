import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches, createMatch } from '../actions/datingActions';  // Ensure these are imported

const Matches = () => {
    const dispatch = useDispatch();
    const { matches, loading, error } = useSelector(state => state.matches);
    const userId = useSelector(state => state.auth.user.id);
    useEffect(() => {
        if(userId) {
            dispatch(fetchMatches(userId));
        }
    }, [dispatch, userId]);

    const handleCreateMatch = () => {
        dispatch(createMatch());
    };

    return (
        <div>
            <h1>Your Matches</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {matches.map(match => (
                    <li key={match._id}>
                        Match with {match.userOneId.name} and {match.userTwoId.name} - Compatibility Score: {match.compatibilityScore}
                    </li>
                ))}
            </ul>
            <button onClick={handleCreateMatch}>Create New Match</button>
        </div>
    );
};

export default Matches;

