import { Text } from '@chakra-ui/layout';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import React, { useState } from 'react';

interface CharacterProps {
	name: string;
	id: number;
	location: {
		id: number;
		name: string;
	};
	origin: {
		id: number;
		name: string;
	};
	episode: {
		id: number;
		episode: string;
		air_date: Date;
	};
	image: string;
}

interface Props {
	characters: CharacterProps[];
}

export default function Home(props: Props) {
	const { characters } = props;

	const [chars, setChars] = useState(characters);
	return (
		<div>
			<Text>Hi</Text>
		</div>
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
