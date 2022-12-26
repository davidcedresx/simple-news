import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  Container,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface INew {
  title: string;
  description: string;
  id: string;
}

const App = () => {
  const [news, setNews] = useState<INew[]>([]);
  const [nombreQueSeEstaEscribiendo, setearNombreQueSeEscribe] =
    useState<string>();
  const [MODALABIERTO, SETEARMODALABIERTO] = useState<boolean>(false);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [caption, setCaption] = useState<string>();

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

  const onInput = (e: any) => {
    setearNombreQueSeEscribe(e.target.value);
  };

  const saveNewThing = () => {
    alert("guardandooOOOO " + nombreQueSeEstaEscribiendo);
  };

  const abrirmodal = () => {
    SETEARMODALABIERTO(true);
  };

  const cerralModal = () => {
    SETEARMODALABIERTO(false);
  };

  const ONSUBMNTUI = async (e: any) => {
    e.preventDefault();

    await fetch("https://63a9e4217d7edb3ae61b5c33.mockapi.io/api/Article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        caption,
      }),
    });

    SETEARMODALABIERTO(false);
  };

  return (
    <Container py={8}>
      <VStack spacing={12} align="left">
        <HStack display="flex" justifyContent="space-between">
          <Heading>Breaking News!</Heading>
          <Button onClick={abrirmodal}>Add</Button>
        </HStack>

        {news.length === 0 && <Text>Nope!</Text>}

        {news.map((new_) => (
          <Card maxW="xs" key={new_.id}>
            <CardBody>
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

      <Modal isOpen={MODALABIERTO} onClose={cerralModal}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Hola</ModalHeader>

          <ModalBody>
            <form onSubmit={ONSUBMNTUI}>
              <VStack>
                <Input
                  name="title"
                  placeholder="Titulo"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  name="description"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  name="caption"
                  placeholder="Caption"
                  onChange={(e) => setCaption(e.target.value)}
                />
                <Button type="submit">Save</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
