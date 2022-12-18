/**
 *
 * @param table table name
 * @param obj object to be updated
 * @param keys the keys to be updated
 */
export function createUpdateQuery<T extends {id: string}>(table: string, obj: T, keys: Array<keyof T>): {query: string, values: Array<any>} {
  let query = `UPDATE ${table} SET `;
  let values: any[] = [];

  let prev = false;
  keys.forEach((key) => {
    const value = obj[key];
    if (value !== undefined) {
      values.push(value);
      query += `${prev ? ',' : ''} ${key as string} = $${values.length}`;
      prev = true;
    }else {
      prev = false;
    }
  });

  values.push(obj.id);
  query += ` WHERE id = $${values.length} RETURNING *`;

  return {query, values};
}