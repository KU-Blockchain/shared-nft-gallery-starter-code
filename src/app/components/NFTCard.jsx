import { Box, Image, Text, Link } from "@chakra-ui/react";

const NFTCard = ({ src, index, owner, label }) => {
  const renderMedia = (src) => {
    // if (src.endsWith(".pdf")) {
    //   return (
    //     <Box p={2} textAlign="center">
    //       <Link href={src} isExternal>
    //         View PDF
    //       </Link>
    //     </Box>
    //   );
      
    // } else 
    console.log(src);
    console.log("test: ", src.endsWith(".jpg") || src.endsWith(".jpeg") || src.endsWith(".png"));
    if (src.endsWith(".jpg") || src.endsWith(".jpeg") || src.endsWith(".png")) {
      return (
        <Image
          src={src}
          alt={`Gallery image ${index}`}
          objectFit="contain"
          maxH="300px"
          width="100%"
          alignSelf="center"
        />
      );
    } 
    else {
      return (
        <Text color="red.500" fontSize="sm" textAlign="center">
          Unsupported file type
        </Text>
      );
    }
  };

  return (
    <Box
      boxShadow="lg"
      borderRadius="md"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {renderMedia(src)}
      <Box p={2} textAlign="center">
        <Text color="gray.500" fontSize="sm">
          minted by {owner}
        </Text>
        <Text color="gray.400" fontSize="sm">
          {label}
        </Text>
      </Box>
    </Box>
  );
};

export default NFTCard;
