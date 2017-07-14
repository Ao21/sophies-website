import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { DefaultFieldFragment } from './fields.query';

import { Block } from './blocks.query';

export interface Entry {
	id: string;
	slug: string;
	visible: boolean;
	title: string;
	blocks: [Block];
}

export const GetAllEntriesQuery = gql`
${DefaultFieldFragment}
query {
  articles {
    title
    slug
    id
    visible
    blocks {
	  id,
	  tag
      fields {
        ... allFields
      }
    }
  }
}`;

export const GetEntryQuery = gql`
${DefaultFieldFragment}
	query($id: ID!) {
		article(id: $id) {
		  id
		  title
          slug
          visible
            title
            blocks {
                id,
				name
				tag
                fields {
                    ... allFields
                }
            }
		}
	}
`;

export const CreateEntryMutation = gql`
${DefaultFieldFragment}
	mutation createArticle(
		$title: String!
		$blocks: String
		$visible: Boolean
		$slug: String
		$name: String
	) {
		createArticle(
			article: {
				title: $title
				blocks: $blocks
				visible: $visible
				slug: $slug
				name: $name
			}
		) {
			id
          slug
          visible
            title
            blocks {
                id,
				name
				tag
                fields {
                    ... allFields
                }
            }
		}
	}
`;

export const UpdateEntryMutation = gql`
${DefaultFieldFragment}
	mutation updateArticle(
		$id: ID
		$title: String!
		$blocks: String
		$visible: Boolean
		$slug: String
		$name: String
	) {
		updateArticle(
			article: {
				id: $id
				title: $title
				blocks: $blocks
				visible: $visible
				slug: $slug
				name: $name
			}
		) {
			id
          slug
          visible
            blocks {
                id,
				name
				tag
                fields {
                    ... allFields
                }
            }
		}
	}
`;

export const RemoveArticleMutation = gql`
	mutation removeArticle($id: ID!) {
		removeArticle(id: $id)
	}
`;
