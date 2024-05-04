import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Filter, Footer, Form, Header, Logo, Notification, Profile, Upload } from "../Components"
import { useStateContext } from "../Context/NFTs"
import images from "../Components/Image/client/index"

const Home = () => {
  // state variables

  const {
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
  } = useStateContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);

  // get data
  const oldImages = [];

  const fetchImages = async () => {
    const images = await getUploadImage();
    setAllImages(images);

    // api nfts
    const apiImages = await getApiNfts();
    set
  }

  console.log("contract", contract)


  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract])

  if (allImages.length == 0) {
    console.log("Loading")
  } else {
    allImages.map(el => oldImages.push(el))
  }

  // image data
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value })
  }

  // upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setloading(true)
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjE2ZWE3OC1lYWFkLTQxYTAtYTExOC02MDc2NzFmZTZmNzgiLCJlbWFpbCI6ImY0cjFkYW5hbmdzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMTIwMjYyZTcyODg3MzFlYzEwYiIsInNjb3BlZEtleVNlY3JldCI6IjRjYzYyNDUzZmYxMzAxZWI1M2MxNTEyYjRhOTI2MTg5MWI5NTYwZWRhNGE1MTQ3YWYzMGYxY2RkOTkyYzc3ZTUiLCJpYXQiOjE3MTQxOTUzODB9.SJi0bb1vp_Rfzn2ChUDwrX39tvRiTaB1w_LrZW6cj74',
          },
        })
        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`

        console.log(image, "image url")
        await UploadImage({
          ...imageInfo,
          category: category,
          image: image
        })
        setFile(null)
      } catch (e) {
        console.log(e)
      }
    }

    setFile(null)
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }
    e.preventDefault();
  }

  // take image
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
    }
  }

  return <div className="home">
    <Header notification={notification} setNotification={setNotification} />
    <div className="header">
      <h1>Create 1000 NFTs for Free</h1>
    </div>
    {/* upload */}
    <div className="upload">
      <Upload onImageChange={onImageChange}
        display={display} address={address} retrieveFile={retrieveFile} />
      <div className="upload-info">
        <h1>Welcome to NFTs IPFS Upload</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab eum non, modi atque, eaque cumque laudantium repellendus animi adipisci debitis ullam provident ipsa ea ipsum distinctio quidem reiciendis exercitationem iusto.</p>
        <div className="avatar">
          <Button address={address} disconnect={disconnect} connect={connect} file={file} />
          {
            address && (
              <p>
                <Image className="avatar_img" alt="avatar image" src={images.client1} width={40} height={40} onClick={() => setOpenProfile(true)} />
              </p>
            )
          }
        </div>
      </div>
    </div>
    <h1 className="subheading">All NFTs of Marketplace</h1>
    {/* Card */}
    {allImages.length == 0 ? (
      <Logo />
    ) : allImages == undefined ? <h1>No Images</h1> : (
      <>
        <Filter
          setImagesCopy={setImagesCopy}
          imagesCopy={imagesCopy}
          setAllImages={setAllImages}
          allImages={allImages}
          oldImages={oldImages}
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
        />
        <div className="card">
          {
            allImages.map((image, i) => (
              <Card key={i} index={i} image={image} setNotification={setNotification} />
            ))
          }
        </div>
      </>
    )}

    <Footer />

    {/* Notification */}
    {
      notification != "" && (
        <Notification notification={notification} setNotification={setNotification} />
      )
    }

    {/* profle */}
    {
      openProfile && (
        <div className="profile">
          <Profile setOpenProfile={setOpenProfile} userBalance={userBalance} address={address} />
        </div>
      )
    }

    {/* loader */}
    {
      loading && (
        <div className="loader">
          <Logo />
        </div>
      )
    }

    {/* form */}
    {
      file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
              handleFieldChange={handleFormFieldChange}
            />
          </div>
        </div>
      )
    }
  </div>

};

export default Home;
