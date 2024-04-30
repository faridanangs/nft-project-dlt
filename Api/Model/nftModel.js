const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the NFT"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the NFT"]
    },
    category: {
        type: String,
        required: [true, "Please provide a category for the NFT"]
    },
    address: {
        type: String,
        required: [true, "Please provide an address"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, "Please provide a creation date for the NFT"]
    },
    image: {
        type: String,
        required: [true, "Please provide an image URL for the NFT"]
    }
});

const Nft = mongoose.model('nft', nftSchema);
module.exports = Nft;
