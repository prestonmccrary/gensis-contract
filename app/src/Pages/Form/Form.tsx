import React from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import './index.css';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Box,
  Flex,
  Link,
  Button,
  ButtonGroup,
  useDisclosure,
  useColorModeValue,
  Stack,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";

import { message, Upload } from 'antd';

const projectId = '2GBr5BXc9XvEsaqcSbQKKxbtnt2';
const projectSecret = '1b56b477b19aa2d323648b4d3d690fe7';
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const SecondPage = () => {
  const [legalName, setLegalName] = React.useState("")
  const [twitterHandle, setTwitterHandle] = React.useState("")
  const [websiteURL, setWebsiteURL] = React.useState("")
  const [registrationURL, setRegistrationURL] = React.useState("")
  const [setting, setSetting] = React.useState(0)
  const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);

  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  

  /**
   * @description event handler that uploads the file selected by the user
   */
  const onSubmitHandler = async (file: any) => {
    const result = await (ipfs as IPFSHTTPClient).add(file);

    const uniquePaths = new Set([
      ...images.map((image) => image.path),
      result.path,
    ]);
    const uniqueImages = [...uniquePaths.values()]
      .map((path) => {
        return [
          ...images,
          {
            cid: result.cid,
            path: result.path,
          },
        ].find((image) => image.path === path);
      });
    
      // @ts-ignore
    setImages(uniqueImages);
  };


//@ts-ignore
const dummyRequest = ({ file  , onSuccess  }) => {

  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};


  const { Dragger } = Upload;
  const props = {
    name: 'file',
    multiple: true,
    customRequest: dummyRequest,
    onChange(info: any) {

      console.log('crazy')
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setSetting(setting => setting + 1)
        onSubmitHandler(info.file.originFileObj);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    
  };

  return (
    <>
        <Text fontSize='36px'>Step 2 - Business Info</Text>
            <div className="inputWrapper">
            <Flex width="90%">
            <input
                type="legalName"
                style={{width: '50%'}}
                className="inputs"
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="Your full legal name"
            />
            <input
                type="twitterHandle"
                style={{width: '39%'}}
                className="inputs"
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="Your Twitter Handle"
            />
            </Flex>
            <Flex width="90%">
                <input
                    type="websiteURL"
                    style={{width: '92%'}}
                    className="inputs"
                    onChange={(e) => setWebsiteURL(e.target.value)}
                    placeholder="URL to your company website"
                />
            </Flex>
            <Flex width="90%">
                <input
                    type="registrationURL"
                    style={{width: '92%'}}
                    className="inputs"
                    onChange={(e) => setRegistrationURL(e.target.value)}
                    placeholder="URL to your company's registration on your Secretary of State Website"
                />
            </Flex>
            {ipfs && (
            <>
                <Flex width="90%">
                  <p style={{color: "white", margin: "16px", fontWeight: "bold"}}>Upload File using IPFS</p>
                </Flex>
                <div className="row" style={setting >= 2 ? {display: "flex", flexDirection:"row", alignItems:"center"} : {}}>
                <div className="row" style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <span style={{color: setting === 0 ? "#D0312D" : "#95bb72", marginBottom: "16px", marginLeft: "16px", marginRight: "16px", fontWeight: "bold"}}> • Operating Agreement</span>
                    <span style={{color: setting <= 1 ? "#D0312D" : "#95bb72", marginBottom: "16px", marginLeft: "16px", marginRight: "16px", fontWeight: "bold"}}>	• Driver's License</span>
                </div>
                {/* @ts-ignore */}
                    {setting < 2 && <Dragger {...props} style={{width: "92%", margin:"12px", backgroundColor: "transparent", borderRadius: "16px", border: "solid", borderColor: "#868686", borderWidth: "3px"}}>
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined style={{color:"white"}}/>
                    </p>
                    <p className="ant-upload-text" style={{color:"white", fontWeight:"600"}}>{setting === 0 ? "Upload your Operating Agreement" : "Upload a picture of your Driver's License"}</p>
                    </Dragger>}
                    {setting >= 2 && <div style={{display: "flex", justifyContent: "flex-end", marginRight: "48px"}}>
                    <button onClick={() => {return}} style={{height: "45px", backgroundColor: "white", color: "white", fontSize: "larger", fontWeight: "600", borderStyle: "none"}}>Submit</button>
                    </div>}
                </div>
            </>
            )}

            {!ipfs && (
            <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
            )}
        </div>
        </>
  )
}

function Form() {
  const [companyName, setCompanyName] = React.useState("");
  const [date, setDate] = React.useState("")
  const [customers, setCustomers] = React.useState("")
  const [members, setMembers] = React.useState("")
  const [equity, setEquity] = React.useState("")
  const [tokens, setTokens] = React.useState("")
  const [relation, setRelation] = React.useState("")
  const [firstScreen, setFirstScreen] = React.useState(true)
  const [warning, setWarning] = React.useState(false)


  const nextStepHandler = () => {
    if (companyName && date && customers && members && equity && tokens && relation) {
      setFirstScreen(false)
    } else {
      setWarning(true)
    }
  }

  return (
    <Flex direction="row" justifyContent="center" alignItems="center">
      <VStack marginTop="4%" width="80%" background="radial-gradient(131.48% 1096.24% at 108.6% 129.84%, #202229 0%, rgba(35, 38, 47, 0) 100%)" backdropFilter="blur(61.5px)" borderRadius="30px" paddingBottom="24px" marginBottom="10%">
        {
          firstScreen ?
            <>
              <Text marginLeft="64px" marginTop="32px" marginBottom="24px" fontStyle="normal" fontWeight="700" fontSize="36px" lineHeight="100%" color="white">Step 1 - Minting Info</Text>
              <VStack>
                <HStack width="90%">
                  <input
                    type="name"
                    style={{width: '50%'}}
                    className="inputs"
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company name"
                  />
                  <input
                    type="date"
                    style={{width: '35%'}}
                    className="inputs"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Founding date"
                  />
                </HStack>
                <HStack width="90%">
                  <input
                    type="customers"
                    style={{width: '60%'}}
                    className="inputs"
                    onChange={(e) => setCustomers(e.target.value)}
                    placeholder="# of customers"
                  />
                  <input
                    type="members"
                    style={{width: '25%'}}
                    className="inputs"
                    onChange={(e) => setMembers(e.target.value)}
                    placeholder="# of team members"
                  />
                </HStack>
                <Flex width="90%">
                  <input
                    type="equity"
                    style={{width: '92%'}}
                    className="inputs"
                    onChange={(e) => setEquity(e.target.value)}
                    placeholder="What % of your equity would you like to liquidate?"
                  />
                </Flex>
                <Flex width="90%">
                  <input
                      type="tokens"
                      style={{width: '92%'}}
                      className="inputs"
                      onChange={(e) => setTokens(e.target.value)}
                      placeholder="How many tokens would you like to mint? (Up to 5,000)"
                    />
                </Flex>
                <Flex width="90%">
                  <input
                    type="relation"
                    style={{width: '92%'}}
                    className="inputs"
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="How many tokens would someone need to hold to legally own the corresponding equity? (Up to 100%)"
                  />
                </Flex>
                <div style={{display: "flex", justifyContent: "flex-end"}} className="row">
                  <button onClick={nextStepHandler} style={{margin: "24px", height: "45px", backgroundColor: "white", color: "white", fontSize: "larger", fontWeight: "600", borderStyle: "none"}}>Next Step</button>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", textAlign: "end"}} className="row">
                  {warning ? <div className="warning">Fill out all input fields before proceeding.</div> : <></>}
                </div>
              </VStack>
            </>
          :
          <SecondPage /> 
        }
      </VStack>
    </Flex>
  );
}

export default Form;