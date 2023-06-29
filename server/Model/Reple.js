const mongoose = require("mongoose");

const repleSchema = new mongoose.Schema(
    {
    reple: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
      //ref를 설정해주지 않는 이유는 단순히 어떠한 포스트에 등록되었는지만 알아도되기 때문에
    },
    },
    { collection: "reples", timestamps: true }
);

const Reple = mongoose.model("Reple", repleSchema);

module.exports = { Reple };
