/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs: any) {
  return fieldASTs.selectionSet.selections.reduce((projections: any, selection: any) => {
    projections[selection.name.value] = 1;

    return projections;
  }, {});
}
