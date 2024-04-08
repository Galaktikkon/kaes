import SignUpForm from "@/src/components/SignUpForm";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container size={"md"} h={"100vh"} centerContent justifyContent={"center"}>
      <SignUpForm />
    </Container>
  );
}
