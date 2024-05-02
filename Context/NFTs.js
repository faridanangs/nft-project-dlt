import { useAddress, useContract, useDisconnect, useMetamask, useSigner } from '@thirdweb-dev/react'
import axios from 'axios'
import { ethers } from 'ethers'
import React, { createContext, useContext, useEffect, useState } from 'react'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0xaF80924f173F6D4FaB397d12FED636Bf0B376F6C");

    const address = useAddress();
    const connect = useMetamask();

    // frontend
    const disconnect = useDisconnect();
    const signer = useSigner();
    const [userBalance, setUserBalance] = useState();
    const [loading, setloading] = useState(false);

    const fetchData = async () => {
        try {
            // user balance
            const balance = await signer?.getBalance();
            const userBalance = address ? ethers.utils.formatEther(balance?.toString()) : "";
            setUserBalance(userBalance);
        } catch (error) {
            console.log(error)
        }

        useEffect(() => {
            fetchData();
        }, [])
    }

    // contract function
    // -- upload
    const UploadImage = async (imageInfo) => {
        const { title, description, category, image } = imageInfo;

        try {
            // charge
            const listingPrice = await contract.call("listingPrice");
            const createNft = await contract.call("uploadIPFS", [address, image, title, description, category], { value: listingPrice?.toString() });

            // api call
            const response = await axios({
                method: "POST",
                url: "/api/v1/nfts",
                data: {
                    title: title,
                    description: description,
                    category: category,
                    image: image,
                    address: address,
                }
            })
            console.log(response, "response");
            console.info("Contract call success", createNft)

            setloading(false);
            window.location.reload();
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    // get all image
    const getUploadImage = async () => {
        // all images
        const images = await contract.call("getAllNFTs");
        // total upload
        const totalUpload = await contract.call("imagesCount");
        // listing price
        const listingPrice = await contract.call("listingPrice");

        const allImages = images.map((image, i) => ({
            owner: image.owner,
            title: image.title,
            description: image.description,
            category: image.category,
            fundraised: image.fundraised,
            image: image.image,
            timestamp: image.timestamp.toNumber(),
            id: image.id.toNumber(),
            listedAmount: ethers.utils.formatEther(listingPrice.toString()),
            totalUpload: totalUpload.toNumber(),
        }))

        return allImages;
    }

    // get single image
    const getSingleImage = async (id) => {
        try {
            const data = await contract.call("getImage", [id]);

            const image = {
                category: data[0],
                image: data[1],
                title: data[2],
                fundraised: data[3],
                creatory: data[4],
                imageUrl: data[5],
                createdAt: data[6].toNumber(),
                imageID: data[7].toNumber()
            }

            return image;
        } catch (error) {
            console.log(error)
        }
    }

    // donate to image
    const donateFund = async (id, amount) => {
        try {
            const transaction = await contract.call("donateToImage", [id], { value: amount.toString() });
            console.log(transaction, "transaction");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    // get all api nfts
    const getApiNfts = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/v1/nfts"
            })
            console.log(response, "response all nfts api")
        } catch (error) {
            console.log(error);
        }
    }

    // get single api nft
    const getApiSingleNft = async (id) => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/v1/nfts/${id}`
            })
            console.log(response, "get single api nft")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StateContext.Provider value={{
            // contract
            address,
            connect,
            contract,
            disconnect,
            signer,
            loading,
            setloading,
            userBalance,

            // function
            UploadImage,
            donateFund,
            getSingleImage,
            getUploadImage,

            // api
            getApiSingleNft,
            getApiNfts

        }}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);