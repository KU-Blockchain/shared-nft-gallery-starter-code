"use client";
import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  useDisclosure,
  Flex,
  VStack,
  Text,
  Link,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Gallery from "./components/Gallery";
import Minter from "./components/Minter";
import { AmoyProvider } from "./contexts/AmoyContext";
import About from "./components/About";
import theme from "./theme";
import { pinFileToIPFS } from "../utils/pinata"; // Import the Pinata utility function

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [showAddNetworkModal, setShowAddNetworkModal] = useState(false);

  const tutorialUrl =
    "https://kublockchain.notion.site/NFT-Gallery-dApp-tutorial-8ccbda66968b4b55b1808e8c2abe1272?pvs=4";

  const checkMetaMaskAndNetwork = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId === "0x13882") {
        setIsFileModalOpen(true);
      } else {
        setShowAddNetworkModal(true);
      }
    } else {
      setShowAddNetworkModal(true);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await pinFileToIPFS(file);
      console.log("File uploaded to IPFS:", response);
      // You can handle the response here (e.g., save the hash, etc.)
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsFileModalOpen(false); // Close the modal after uploading
  };

  return (
    <ChakraProvider theme={theme}>
      <AmoyProvider>
        <Box textAlign="center" marginTop="4">
          <Heading as="h1" size="2xl" marginBottom="8">
            SciChain Duplicate Page
          </Heading>
          <Box my={4}>
            <About />
          </Box>

          {/* Search Bar */}
          <Flex justify="center" marginBottom="8">
            <Input placeholder="Search..." width="50%" marginBottom="4" />
          </Flex>

          {/* Buttons */}
          <Flex justify="center" marginBottom="8">
            <Button colorScheme="teal" margin="2" onClick={checkMetaMaskAndNetwork}>
              Mint NFT
            </Button>
            <Button colorScheme="teal" margin="2">
              Marketplace
            </Button>
            <Button colorScheme="teal" margin="2">
              My Profile
            </Button>
          </Flex>
        </Box>

        <Gallery />
        <Minter isOpen={isOpen} onOpen={onOpen} onClose={onClose} uploadedFiles={[]} />

        {/* File Upload Modal */}
        <Modal isOpen={isFileModalOpen} onClose={() => setIsFileModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select a File to Mint NFT</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="file" onChange={handleFileChange} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpload}>
                Upload and Mint
              </Button>
              <Button variant="ghost" onClick={() => setIsFileModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Footer */}
        <Flex
          as="footer"
          direction="column"
          align="center"
          justify="center"
          marginTop="8"
          padding="8"
        >
          <Text fontSize="md" marginBottom="2">
            Made with 🔥 by the University of Kansas Blockchain Institute
          </Text>
          <Link href={tutorialUrl} isExternal>
            <Button colorScheme="blue" variant="outline" size="sm">
              View Tutorial
            </Button>
          </Link>
        </Flex>
      </AmoyProvider>
    </ChakraProvider>
  );
}
