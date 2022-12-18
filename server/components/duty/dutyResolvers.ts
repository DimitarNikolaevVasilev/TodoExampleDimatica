import pool from '../../db/connect';
import {DutyType} from "./dutySchema";
import {IResolvers} from "mercurius";
import {createUpdateQuery} from "../../helpers/util";

const resolvers: IResolvers = {
  Query: {
    /**
     * Get duty by id
     * @param root
     * @param id
     */
    duty: async (root: object, {id}: { id: string }) => {
      const {rows} = await pool.query('SELECT * FROM duty WHERE id = $1', [id]);
      return rows[0];
    },
    /**
     * Get all duties
     */
    duties: async () => {
      const {rows} = await pool.query('SELECT * FROM duty ORDER BY created_at');
      return rows;
    }
  },
  Mutation: {/**
     * Create duty
     * @param root
     * @param name
     */
    createDuty: async (root: object, {name = ''}: { name: string}) : Promise<DutyType> => {
      const {rows} = await pool.query('INSERT INTO duty (name) VALUES ($1)  RETURNING *', [name]);
      return rows[0];
    }, /**
     * Update duty
     * @param root
     * @param duty
     */
    updateDuty: async (root: object, duty: DutyType): Promise<DutyType> => {
      const {query, values} = createUpdateQuery('duty', duty, ['name', 'completed']);

      const {rows} = await pool.query(query, values);
      return rows[0];
    }, /**
     * Delete duty
     * @param  root
     * @param  id
     */
    deleteDuty: async (root: object, {id}: { id: number }): Promise<DutyType> => {
      const {rows} = await pool.query('DELETE FROM duty WHERE id = $1 RETURNING *', [id]);
      return rows[0];
    }}
}

export default resolvers;