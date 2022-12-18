import Server from '../app';
import {gql} from "mercurius-codegen";
import {expect} from "chai";

const server = new Server();

describe('Graphql Duty Mutations', () => {
  server.config();
  const instance = server.instance;

  const post = async (payload: object) => instance.inject({
    method: 'POST',
    url: '/graphql',
    payload
  })

  beforeEach(async () => {
    // wait for server to be ready to accept requests
    await instance.ready();
  });

	describe('Query', () => {
		it('should return all duties', async () => {
			const query = gql`
          query GetDuties {
              duties {
                  id
                  name
                  completed
              }
          }
      `;

      const response = await post({query, operationName: 'GetDuties'});
      expect(response.statusCode).to.equal(200);
		});
	})

});