import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
} from "@chakra-ui/react";

function SignUpForm() {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      gap="2"
      margin={[0, 0, 0, 10]}
    >
      <VStack spacing="4" align="stretch" maxW="md" m="auto">
        <FormControl id="name">
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="yourusername" />
        </FormControl>

        <FormControl id="email">
          <FormLabel>E-mail address</FormLabel>
          <Input type="email" placeholder="example@email.com" />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Twoje hasło" />
        </FormControl>

        <FormControl id="confirmPassword">
          <FormLabel>Re-enter password</FormLabel>
          <Input type="password" placeholder="Potwierdź swoje hasło" />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Sign-up
        </Button>
      </VStack>
    </Flex>
  );
}

export default SignUpForm;
