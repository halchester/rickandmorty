import { Box, Heading, Text, Flex, useColorModeValue, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { CharacterProps } from '../interfaces';
import Image from 'next/image';

interface CharacterCardProps {
	character: CharacterProps;
}

const CharacterCard = (props: CharacterCardProps) => {
	const { character } = props;
	const textColor = useColorModeValue('white', 'black');
  const cardBgColor = useColorModeValue('gray.700','gray.500')

	return (
		<Box borderRadius='lg' backgroundColor={cardBgColor} p={3}>
			<Flex alignItems='center' direction='row' justifyContent='center' py={4}>
				<Image src={character.image} width={200} height={200} />
			</Flex>
			<Heading as='h4' textAlign='center' size='md' mb={4} color={textColor}>
				{character.name}
			</Heading>
			<Text align='center' color={textColor}>
				Origin : {character.origin.name}
			</Text>
			<Text align='center' color={textColor}>
				Location : {character.location.name}
			</Text>
		</Box>
	);
};

export default CharacterCard;
