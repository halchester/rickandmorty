import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { NextApiResponse, NextApiRequest } from 'next';

const client = new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache: new InMemoryCache(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { query } = req.body;
	try {
		const { data } = await client.query({
			query: gql`
      # Write your query or mutation here
      query{
        characters(filter :{
          name : "${query}"
        }){
          info{
            count,
            pages
          }
          results{
            name,
            id,
            location{
              id,
              name
            }
            origin{
              id,name
              
            }
            episode{
              id,
              episode,
              air_date
            }
            image
          }
        }
      }
      `,
		});

		return res
			.status(200)
			.json({ success: true, data: data.characters.results, error: null });
	} catch (err) {
    if(err.message === "404: Not Found"){
      console.log(err);
      return res.status(200).json({ success: false, data: null, error : "No character found" });
    }else{
      return res.status(200).json({success : false, data : null, error : "Server error"})
    }
	}
};
