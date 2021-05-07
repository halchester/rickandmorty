import { Text } from '@chakra-ui/layout';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import React, { useState } from 'react';
import {
	Heading,
	Box,
	Flex,
	Input,
	useToast,
	IconButton,
	Stack,
	useColorMode,
	useColorModeValue,
	SimpleGrid,
} from '@chakra-ui/react';
import { CharacterProps } from '../interfaces';
import CharacterCard from '../components/CharacterCard';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface Props {
	characters: CharacterProps[];
}

export default function Home(props: Props) {
	const { characters } = props;
	const [chars, setChars] = useState(characters);
	const [query, setQuery] = useState('');
	const toast = useToast();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await axios.post('/api/SearchCharacters', { query });
		const { data, error } = response.data;
		if (error) {
			toast({
				position: 'bottom',
				title: 'Error Occured',
				description: error,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} else {
			setChars(data);
		}
	};

	return (
		<Flex direction='column' justify='center' align='center' m={4}>
			<Heading my={2}>Rick and Morty!</Heading>
			<form onSubmit={handleSubmit}>
				<Stack direction='row' maxWidth='500px'>
					<Input onChange={(e) => setQuery(e.target.value)} value={query} />
					<IconButton
						aria-label='search'
						icon={<SearchIcon />}
						colorScheme='green'
						disabled={query.length === 0}
						type='submit'
					/>
					<IconButton
						aria-label='search'
						icon={<DeleteIcon />}
						colorScheme='red'
						disabled={query.length === 0}
						onClick={(e) => {
							setQuery('');
							setChars(characters);
						}}
					/>
				</Stack>
			</form>

			<Box m={2} py={8}>
				<SimpleGrid columns={[1, 2, 3]} spacing={8}>
					{chars.map((char, _) => (
						<CharacterCard character={char} key={char.id} />
					))}
				</SimpleGrid>
			</Box>
		</Flex>
	);
}

export async function getStaticProps() {
	const client = new ApolloClient({
		uri: 'https://rickandmortyapi.com/graphql/',
		cache: new InMemoryCache(),
	});
	const { data } = await client.query({
		query: gql`
			query {
				characters(page: 1) {
					info {
						count
						pages
					}
					results {
						name
						id
						location {
							id
							name
						}
						origin {
							id
							name
						}
						episode {
							id
							episode
							air_date
						}
						image
					}
				}
			}
		`,
	});
	return {
		props: {
			characters: data.characters.results,
		},
	};
}
