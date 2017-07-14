import gql from 'graphql-tag';

// tslint:disable:max-line-length

export const FieldFragment = gql`
	fragment defaultFields on FieldInterface {
		id
		type
		key
		config {
			label
			placeholder
			required
			categories
		}
	}
`;

export const DefaultFieldFragment = gql`
	${FieldFragment}
	fragment allFields on Field {
  ... on TextField {
    ...defaultFields
    textValue: value
  }
  ... on AssetField {
    ...defaultFields
    assetValue: value {
      id
      originalname
      category
      dateCreated
      id
      path
      mimetype
    }
  }
  ... on DateField {
    ...defaultFields
    dateValue: value
  }
  ... on TextAreaField {
    ...defaultFields
    textareaValue: value
  }
  ... on ToggleField {
    ...defaultFields
    toggleValue: value
  }
  ... on CheckboxField {
    ... defaultFields
    checkboxValue: value
  }
}`;

export const CreateFieldMutation = gql`
	${DefaultFieldFragment}
mutation createField($type: String!, $key: String!, $id: ID, $label: String, $required: Boolean, $placeholder: String, $previousType: String, $categories: [String], $max: Int) {
  createField(field: {type: $type, key: $key, id: $id}, settings: {previousField: $previousType}, config: {label: $label, required: $required, placeholder: $placeholder, categories: $categories, max: $max}) {
    ... allFields
  }
}`;

export const UpdateFieldMutation = gql`
${DefaultFieldFragment}
mutation updateField($id: ID!, $type: String!, $key: String!, $label: String, $required: Boolean, $placeholder: String, $categories: [String], $max: Int) {
  updateField(field: {id: $id, type: $type, key: $key}, config: {label:$label, required: $required, placeholder: $placeholder, categories: $categories, max: $max}) {
    ...allFields
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
			...allFields
		}
	}
`;

export const GetField = gql`
	${DefaultFieldFragment}
	query($id: ID!) {
		field(id: $id) {
			...allFields
		}
	}
`;
