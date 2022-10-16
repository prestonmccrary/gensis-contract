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
  Input,
  chakra,
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
            <VStack width="90%" padding="32px">
            <Text width="90%" marginLeft="8px" marginTop="32px" marginBottom="24px" fontStyle="normal" fontWeight="600" fontSize="28px" lineHeight="100%" color="white" textAlign="start">Step 2 - Business Info</Text>

            <Flex width="90%">
            <Input
                _focus={{boxShadow: 'none'}}
                type="legalName"
                width="55%"
                fontWeight="500"
                borderRadius="8px"
                margin="4px"
                color="#fff"
                focusBorderColor="white"
                size='md'
                height="45px"
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="Your full legal name"
            />
            <Input
              _focus={{boxShadow: 'none'}}
              type="twitterHandle"
              width="45%"
              fontWeight="500"
              borderRadius="8px"
              margin="4px"
              color="#fff"
              focusBorderColor="white"
              size='md'
              height="45px"
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="Your Twitter Handle"
            />
            </Flex>
            <Flex width="90%">
                <Input
                  _focus={{boxShadow: 'none'}}
                  type="websiteURL"
                  width="100%"
                  fontWeight="500"
                  borderRadius="8px"
                  margin="4px"
                  color="#fff"
                  focusBorderColor="white"
                  size='md'
                  height="45px"
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  placeholder="URL to your company website"
                />
            </Flex>
            <Flex width="90%">
                <Input
                    _focus={{boxShadow: 'none'}}
                    type="websiteURL"
                    width="100%"
                    fontWeight="500"
                    borderRadius="8px"
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setRegistrationURL(e.target.value)}
                    placeholder="URL to your company's registration on your Secretary of State Website"
                />
            </Flex>
            {ipfs && (
            <>
                <HStack width="90%" alignItems="center">
                  <Text width="100%" color="white" margin="12px" fontSize="18px" fontWeight="bold">Upload File using IPFS</Text>
                  <chakra.div width="90%" fontSize="18px" style={{display:"flex", flexDirection:"row", alignItems:"center",     justifyContent:"flex-end"}}>
                    <chakra.span bgGradient={setting !== 0 ? `linear(to-tr,#9DCCF9, #908DF0, #E28695)` : `linear(to-tr,#fff, #fff`} bgClip='text' style={{marginTop:"12px", marginBottom: "16px", marginLeft: "8px", marginRight: "8px", fontWeight: "500"}}> • Operating Agreement</chakra.span>
                    <chakra.span bgGradient={setting > 1 ? `linear(to-tr,#9DCCF9, #908DF0, #E28695)` : `linear(to-tr,#fff, #fff`} bgClip='text' style={{marginTop:"12px", marginBottom: "16px", marginLeft: "8px", marginRight: "8px", fontWeight: "500"}}>	• Driver's License</chakra.span>
                  </chakra.div>
                </HStack>
                <chakra.div width="90%" fontSize="18px" style={setting >= 2 ? {display: "flex", flexDirection:"row", alignItems:"center"} : {}}>
                {/* @ts-ignore */}
                    {setting < 2 && <Dragger {...props} style={{width: "98%", margin:"12px", backgroundColor: "transparent", borderRadius: "16px", border: "solid", borderColor: "#868686"}}>
                    <chakra.p className="ant-upload-drag-icon">
                        <UploadOutlined style={{color:"white"}}/>
                    </chakra.p>
                    <chakra.p className="ant-upload-text" style={{color:"white", fontWeight:"500"}}>{setting === 0 ? "Upload your Operating Agreement" : "Upload a picture of your Driver's License"}</chakra.p>
                    </Dragger>}
                    {setting >= 2 && <chakra.div style={{display: "flex", justifyContent: "flex-end"}}>
                      <Button onClick={() => {return}} margin="12px" variant="solid" width="170px" height="48px" borderRadius={30} bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)">Submit</Button>
                    </chakra.div>}
                </chakra.div>
            </>
            )}

            {!ipfs && (
            <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
            )}
          </VStack>
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
      setTimeout(() => setWarning(false), 2000)
    }
  }

  return (
    <Flex direction="row" justifyContent="center" alignItems="center">
      <VStack marginTop="4%" width="100%" background="radial-gradient(131.48% 1096.24% at 108.6% 129.84%, #202229 0%, rgba(35, 38, 47, 0) 100%)" backdropFilter="blur(61.5px)" borderRadius="30px" padding="24px" marginBottom="10%">
        {
          firstScreen ?
            <>
              <VStack width="90%" padding="32px">
              <Text width="100%" marginLeft="100px" marginTop="32px" marginBottom="24px" fontStyle="normal" fontWeight="600" fontSize="24px" lineHeight="100%" color="white" textAlign="start">Step 1 - Minting Info</Text>
                <HStack width="90%">
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="name"
                    width="45%"
                    fontWeight="500"
                    borderRadius="8px"
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your company name"
                  />
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="dateTime"
                    width="55%"
                    fontWeight="500"
                    borderRadius="8px"
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Founding date"
                  />
                </HStack>
                <HStack width="90%">
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="customers"
                    width="55%"
                    fontWeight="500"
                    borderRadius="8px "
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setCustomers(e.target.value)}
                    placeholder="# of customers"
                  />
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="members"
                    width="45%"
                    fontWeight="500"
                    borderRadius="8px "
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setMembers(e.target.value)}
                    placeholder="# of team members"
                  />
                </HStack>
                <Flex width="90%">
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="equity"
                    fontWeight="500"
                    borderRadius="8px "
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setEquity(e.target.value)}
                    placeholder="What % of your equity would you like to liquidate?"
                  />
                </Flex>
                <Flex width="90%">
                  <Input
                      _focus={{boxShadow: 'none'}}
                      type="tokens"
                      fontWeight="500"
                      borderRadius="8px "
                      margin="4px"
                      color="#fff"
                      focusBorderColor="white"
                      size='md'
                      height="45px"
                      onChange={(e) => setTokens(e.target.value)}
                      placeholder="How many tokens would you like to mint? (Up to 5,000)"
                    />
                </Flex>
                <Flex width="90%">
                  <Input
                    _focus={{boxShadow: 'none'}}
                    type="relation"
                    fontWeight="500"
                    borderRadius="8px "
                    margin="4px"
                    color="#fff"
                    focusBorderColor="white"
                    size='md'
                    height="45px"
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="How many tokens would someone need to hold to legally own the corresponding equity? (Up to 100%)"
                  />
                </Flex>
                <Flex justifyContent="flex-end" width="90%">
                  <Button onClick={nextStepHandler} margin="16px" variant="solid" width="170px" height="48px" borderRadius={30} bgGradient="linear(to-tr,#9DCCF9, #908DF0, #E28695)">Next Step</Button>
                </Flex>
                <Flex justifyContent="flex-end" textAlign="end" width="90%">
                  {warning ? <Text color="#D0312D" marginRight="8px">Fill out all input fields before proceeding.</Text> : <></>}
                </Flex>
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