import gql from 'graphql-tag';

export const DefaultFieldFragment = gql`
	fragment defaultFields on Field {
		... on TextField {
			id
			type
			key
			config {
				label
				placeholder
				required
			}
			value
		}
		... on DateField {
			id
			type
			key
			config {
				label
				placeholder
				required
			}
			value
		}
	}
`;

export const CreateFieldMutation = gql`
${DefaultFieldFragment}
mutation createField($type: String!, $key: String!, $label: String!, $required: Boolean!, $placeholder: String!) {
  createField(field: {type: $type, key: $key}, config: {label:$label, required: $required, placeholder: $placeholder}) {
    ...defaultFields
  }
}`;

export const UpdateFieldMutation = gql`
${DefaultFieldFragment}
mutation updateField($id: ID!, $type: String!, $key: String!, $label: String!, $required: Boolean!, $placeholder: String!) {
  updateField(field: {id: $id, type: $type, key: $key}, config: {label:$label, required: $required, placeholder: $placeholder}) {
    ...defaultFields
  }
}`;

export const RemoveFieldMutation = gql`
	mutation removeField($id: ID!, $type: String!) {
		removeField(id: $id, type: $type)
	}
`;

export const GetAllFieldsQuery = gql`
	${DefaultFieldFragment}
	query {
		fields {
			...defaultFields
		}
	}
`;

export const GetField = gql`
	${DefaultFieldFragment}
	query($id: ID!) {
		field(id: $id) {
			...defaultFields
		}
	}
`;
