import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { CharacterProps } from '../interfaces';
import Image from 'next/image'

interface CharacterCardProps {
	character: CharacterProps;
}

const CharacterCard = (props: CharacterCardProps) => {
	const { character } = props;
	return (
		<Box>
			<Flex alignItems='center' direction='row' justifyContent='center' py = {4}>
				<Image src={character.image} width = {200} height = {200}/>
			</Flex>
			<Heading as='h4' textAlign='center' size='md'>
				{character.name}
			</Heading>
			<Text align='center'>Origin : {character.origin.name}</Text>
			<Text align='center'>Location : {character.location.name}</Text>
		</Box>
	);
};

export default CharacterCard;
