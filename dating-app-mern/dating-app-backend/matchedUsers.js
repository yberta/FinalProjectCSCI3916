import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

//mongoose.connect(process.env.DB, { useNewUrlParser: true });
try {
    mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

const matchSchema = new Schema({
    userOneId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userTwoId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    compatibilityScore: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Match = mongoose.model('Match', matchSchema);
export default Match;
