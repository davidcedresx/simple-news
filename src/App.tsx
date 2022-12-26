import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Container,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface INew {
  title: string;
  description: string;
  image: string;
  id: string;
}

const App = () => {
  const [news, setNews] = useState<INew[]>([]);

  useEffect(() => {
    const descargarYGuardar = async () => {
      const fotos_feas = await fetch(
        "https://63a9e4217d7edb3ae61b5c33.mockapi.io/api/Article"
      ).then();

      const fotos_lindas = await fotos_feas.json();

      setNews(fotos_lindas);
    };

    descargarYGuardar();
  }, []);

  return (
    <Container mt={8}>
      <VStack spacing={12}>
        <Heading>Breaking News!</Heading>

        {news.map((new_) => (
          <Card maxW="sm" key={new_.id}>
            <CardBody>
              <Image
                src={new_.image}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{new_.title}</Heading>
                <Text>{new_.description}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button variant="ghost" colorScheme="blue">
                Read
              </Button>
            </CardFooter>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};

export default App;
