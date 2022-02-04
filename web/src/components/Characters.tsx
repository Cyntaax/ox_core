import { Box, Text, Divider, Flex, IconButton } from '@chakra-ui/react';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { BsPersonDashFill } from 'react-icons/bs';
import { customTheme } from '../styles/theme';
import React from 'react';

interface Character {
  firstname: string;
  lastname: string;
  location: string;
  gender: string;
}

debugData([
  {
    action: 'sendCharacters',
    data: [
      {
        firstname: 'Peter',
        lastname: 'Linden',
        location: 'Galaxy far far away',
      },
      {
        firstname: 'Luke',
        lastname: 'Lindensson',
        gender: 'male',
        location: 'Pillbox Hill',
      },
    ],
  },
]);

const deleteCharacter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.stopPropagation();
  // Open delete character dialog here
};

const selectCharacter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  // Open select charcter dialog here
};

const Characters: React.FC = () => {
  const [characters, setCharacters] = React.useState<Character[]>([
    {
      firstname: '',
      lastname: '',
      location: '',
      gender: '',
    },
  ]);

  useNuiEvent('sendCharacters', (data: Character[]) => {
    setCharacters(data);
  });

  return (
    <>
      {characters.map((character: Character, index) => (
        <React.Fragment key={`character-${index}`}>
          <Flex
            p={3}
            w="100%"
            alignItems="center"
            position="relative"
            transition="0.3s"
            _hover={{ bg: customTheme.colors.sideHover }}
            onClick={(e) => selectCharacter(e)}
          >
            <IconButton
              aria-label="Delete character"
              icon={<BsPersonDashFill />}
              color="red.500"
              position="absolute"
              fontSize="xl"
              top="1vh"
              right="2vh"
              bg="none"
              _hover={{ color: 'red.300' }}
              onClick={(e) => deleteCharacter(e)}
            />
            <Box justifySelf="center" alignItems="center" maxW="80%">
              <Text fontSize="2xl">{`${character.firstname} ${character.lastname}`}</Text>
              <Text fontSize="sm">{`Location: ${character.location}`}</Text>
              <Text fontSize="sm">Last Played: 31/01/2022</Text>
            </Box>
          </Flex>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

export default Characters;