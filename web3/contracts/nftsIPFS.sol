// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable contractOwner =
        payable(0xcaB108CA64Fa6860750a4418A5b7c7B86288d6fe);
    uint256 public listingPrice = 0.0000000025 ether;

    struct NFTs {
        string title;
        string description;
        string category;
        uint256 fundraised;
        address creator;
        string image;
        uint256 timestamp;
        uint256 id;
    }

    mapping(uint256 => NFTs) public nftImages;
    uint256 public imagesCount = 0;

    function uploadIPFS(
        address _creator,
        string memory _image,
        string memory _title,
        string memory _description,
        string memory _category
    )
        public
        payable
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        imagesCount++;
        NFTs storage nft = nftImages[imagesCount];

        nft.title = _title;
        nft.category = _category;
        nft.description = _description;
        nft.image = _image;
        nft.creator = _creator;
        nft.timestamp = block.timestamp;
        nft.id = imagesCount;

        return (_title, _category, _description, _image, _creator);
    }

    function getAllNFTs() public view returns (NFTs[] memory) {
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function getImage(
        uint256 id
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            string memory,
            uint256,
            uint256
        )
    {
        NFTs memory nft = nftImages[id];

        return (
            nft.category,
            nft.image,
            nft.title,
            nft.fundraised,
            nft.creator,
            nft.image,
            nft.timestamp,
            nft.id
        );
    }

    // update lsiting price
    function updateListingPrice(
        uint256 _listingPrice,
        address owner
    ) public payable {
        require(
            contractOwner == owner,
            "Only owner can update the listing price"
        );

        listingPrice = _listingPrice;
    }

    // donate
    function donateToImage(uint256 _id) public payable {
        uint256 amount = msg.value;

        NFTs storage nft = nftImages[_id];
        (bool send, ) = payable(nft.creator).call{value: amount}("");
        if (send) {
            nft.fundraised = amount + nft.fundraised;
        }
    }

    function withdraw(address _owner) external{
        require(_owner == contractOwner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "no fund available");

        contractOwner.transfer(balance);
    }
}
