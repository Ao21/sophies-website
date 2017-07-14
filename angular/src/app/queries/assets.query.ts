import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const GetAllAssetsQuery = gql`
	query {
		assets {
			id
			path
			originalname
			dateCreated
		}
	}
`;


export const CreateAssetMutation = gql`
mutation createAsset($originalname: String, $path: String, $mimetype:String, $filename: String ){
  createAsset(asset:{originalname:$originalname, path: $path, mimetype: $mimetype, filename: $filename}){
    id
  }
}`;

export const RemoveAssetMutation = gql`
	mutation removeAsset($id: ID!) {
		removeAsset(id: $id)
	}
`;
