import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const GetAllAssetsQuery = gql`
	query {
		assets {
			id
			path
			originalname
		}
	}
`;
