import 'dotenv/config'
import express from 'express'
//import mongoose from 'mongoose'
import authJwtController from './auth_jwt.js'
import jwt  from 'jsonwebtoken'
import Cors from 'cors'
import User from './Users.js'
import Cards from './dbCards.js'
import Match from './matchedUsers.js'
//App Config
const app = express()
const port = process.env.PORT || 8001
//const connection_url = 'mongodb+srv://yeabbert:5552471@cluster0.bmyhr4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
/*mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})*/

//API Endpoints
app.get('/matches/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const matches = await Match.find({
            $or: [{ userOneId: userId }, { userTwoId: userId }]
        }).populate('userOneId userTwoId', 'name personalityTraits');
        res.json(matches);
    } catch (error) {
        res.status(500).send(error);
    }
});



app.post('/matches', async (req, res) => {
    try {
        const users = await User.find(); // Find all users
        if (users.length < 2) {
            return res.status(400).send('Not enough users to create a match');
        }
        // Simple random matching logic
        const randomIndex = Math.floor(Math.random() * users.length);
        const userOne = users[randomIndex];
        const userTwo = users[(randomIndex + 1) % users.length]; // Simple pairing logic

        const compatibilityScore = calculateCompatibility(userOne.personalityTraits, userTwo.personalityTraits);

        const match = new Match({
            userOneId: userOne._id,
            userTwoId: userTwo._id,
            compatibilityScore
        });
        await match.save();
        res.json(match);
    } catch (error) {
        res.status(500).send(error);
    }
});

function calculateCompatibility(traitsOne, traitsTwo){
    let score = 0;
    Object.keys(traitsOne).forEach(trait => {
        score += Math.abs(traitsOne[trait] - traitsTwo[trait]);
    });
    return 100-score;
}

app.post('/datingCards',authJwtController.isAuthenticated, (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.get('/datingCards',authJwtController.isAuthenticated, (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});
app.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.personalityTraits = req.body.personalityTraits;
        user.personalityScore = req.body.personalityScore || 0;

        user.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }

            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

app.post('/signin', function (req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) {
            res.send(err);
        }

        user.comparePassword(userNew.password, function(isMatch) {
            if (isMatch) {
                var userToken = { id: user.id, username: user.username };
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json ({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed.'});
            }
        })
    })
});
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))
