import { Box, Text, Link, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      bg="gray.700"
      color="white"
      py={4}
      px={0}
      // position="sticky"
      bottom={0}
      boxShadow="0 -2px 5px rgba(0, 0, 0, 0.2)"
      textAlign="center"
    >
      <HStack
        justifyContent="center"
        spacing={6}
        fontSize="sm"
        flexWrap="nowrap"
      >
        <Text whiteSpace="nowrap">© {new Date().getFullYear()} iEden</Text>
        <Link href="/privacy" _hover={{ textDecoration: "underline" }}>
          Privacy Policy
        </Link>
        <Link href="/terms" _hover={{ textDecoration: "underline" }}>
          Terms of Service
        </Link>
        <Link href="https://github.com/webdeveden?tab=repositories" isExternal>
          GitHub
        </Link>
      </HStack>
    </Box>
  );
};

export default Footer;
