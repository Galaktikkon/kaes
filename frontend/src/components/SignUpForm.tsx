"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");

  const handleSignUp = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_HOST + "/auth/register/",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          repeat_password,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const user = await res.json();

    // If no error and we have user data, return it
    if (res.ok && user) {
      return user;
    }
    // Return null if user data could not be retrieved
    return null;
  };

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
          <Input
            type="text"
            placeholder="yourusername"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>E-mail address</FormLabel>
          <Input
            type="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <FormControl id="confirmPassword">
          <FormLabel>Re-enter password</FormLabel>
          <Input
            type="password"
            placeholder="re-enter your password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button
          colorScheme="blue"
          type="submit"
          onClick={handleSignUp}
          isDisabled={
            username.length === 0 &&
            email.length === 0 &&
            password.length === 0 &&
            repeat_password.length === 0
          }
        >
          Sign-up
        </Button>
        <Link href={"/signin"}>Sign-in</Link>
      </VStack>
    </Flex>
  );
}

export default SignUpForm;
