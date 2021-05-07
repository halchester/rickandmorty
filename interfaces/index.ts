export interface CharacterProps {
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