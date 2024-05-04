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

  return <div>index</div>;
};

export default index;
