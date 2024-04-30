const NFT = require("../Model/nftModel");

exports.getAllNfts = async function (req, res, next) {
    const nfts = await NFT.find();
    res.status(200).json({
        status: "Success",
        result: nfts.length,
        data: nfts
    });
}

exports.getNft = async (req, res, next) => {
    const nft = await NFT.findById(req.params.id);

    res.status(200).json({
        status: "Success",
        data: nft,
    })
}

exports.createNft = async (req, res, next) => {
    console.log(req.body)

    const newNft = await NFT.create(req.body);

    res.status(201).json({
        status: "Success",
        data: newNft
    })
}