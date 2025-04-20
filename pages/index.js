// pages/index.js
import {
    Box,
    Heading,
    Text,
    Flex,
    Button,
    Grid,
    GridItem,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  export default function Home() {
    const bg = useColorModeValue("gray.100", "gray.800");
  
    return (
      <Box bg={bg} minH="100vh" px={6} py={4}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">Boundless Dashboard</Heading>
          <Button onClick={() => alert("Coming soon!")}>Launch Module</Button>
        </Flex>
  
        {/* Main Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem p={5} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={2}>
              CRM Overview
            </Heading>
            <Text>Client pipeline, deal flow, and latest touchpoints.</Text>
          </GridItem>
  
          <GridItem p={5} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={2}>
              Signal Engine
            </Heading>
            <Text>Live SPX vertical spread insights and trade recs.</Text>
          </GridItem>
  
          <GridItem p={5} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={2}>
              Portfolio Snapshot
            </Heading>
            <Text>Performance metrics, open positions, and risk overview.</Text>
          </GridItem>
  
          <GridItem p={5} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={2}>
              Analytics
            </Heading>
            <Text>Interactive charts, P&L, and quantitative summaries.</Text>
          </GridItem>
        </Grid>
  
        {/* Footer */}
        <Box textAlign="center" mt={10} color="gray.500">
          <Text fontSize="sm">© {new Date().getFullYear()} Boundless Platform</Text>
        </Box>
      </Box>
    );
  }
