import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { DefaultFieldFragment } from './fields.query';

import { BaseField } from './../components/form/models/field.model';

export interface Block {
	name: string;
	fields: [BaseField<any>];
	img: [{
		id: string;
		path: string;
	}];
	tag: string;
	singleOnly: boolean;
}

export const CreateBlockMutation = gql`
	mutation createBlock(
		$name: String!
		$fields: [ID]
		$img: [String]
		$tag: String
		$singleOnly: Boolean
	) {
		createBlock(
			block: {
				name: $name
				fields: $fields
				img: $img
				tag: $tag
				singleOnly: $singleOnly
			}
		) {
			id
		}
	}
`;

export const UpdateBlockMutation = gql`
	mutation updateBlock(
		$id: ID
		$name: String!
		$fields: [ID]
		$img: [String]
		$tag: String
		$singleOnly: Boolean
	) {
		updateBlock(
			block: {
				id: $id
				name: $name
				fields: $fields
				img: $img
				tag: $tag
				singleOnly: $singleOnly
			}
		) {
			id
		}
	}
`;

export const RemoveBlockMutation = gql`
	mutation removeBlock($id: ID!) {
		removeBlock(id: $id)
	}
`;

export const GetAllBlocksQuery = gql`
${DefaultFieldFragment}
query {
  blocks{
    id,
		name, 
		tag,
		singleOnly
		img {
			id
			path
			
			},
    fields{
      ... allFields
    }
  }
}`;

export const GetBlockQuery = gql`
${DefaultFieldFragment}
	query($id: ID!) {
		block(id: $id) {
            id,
			name,
			tag,
			singleOnly
			img {
				id
				path
			},
			fields {
				...allFields
			}
		}
	}
`;
