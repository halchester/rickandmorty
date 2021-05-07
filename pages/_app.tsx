import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import theme from '../theme';
import Head from 'next/head';
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
