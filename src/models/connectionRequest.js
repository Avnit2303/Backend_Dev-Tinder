const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromuserid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    touserid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored", "interested", "accepeted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
    },
},
    {
        timestamps: true,
    }
);

connectionRequestSchema.pre("save", function (next) {
    const ConnectionRequestModel = this
    if (ConnectionRequestModel.fromuserid.equals(ConnectionRequestModel.touserid)) {
        throw new Error("Cannot send connection req your self")
    }
    next()
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel
