import {it, describe} from 'vitest';
import {render} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import {GET_DUTIES} from "../../controllers/dutyController.js";
import {Duties} from "./Duties.js";


const mocks = [
	{
		request: {
			query: GET_DUTIES,
		},
		result: {
			data: {
				duties: [
					{
						id: "1",
						name: "test",
						completed: true
					}
				]
			}
		}
	}
];

describe('Duties', () => {
	it('renders without error', async () => {
		// ejemplo preparado para hacer testings
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Duties />
			</MockedProvider>
		);
		expect(1).toBe(1);

	});
})