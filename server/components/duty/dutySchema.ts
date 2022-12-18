import {gql} from "mercurius-codegen";
import {Maybe, Scalars} from "../../types";

export const graphql = gql`
    type Duty {
        id: ID!
        # The name of the duty no more than 255 characters
        name: String!
        completed: Boolean
    }
    type Query {
        duty(id: ID!): Duty
        duties: [Duty]
    }
    type Mutation {
        createDuty(name: String): Duty
        updateDuty(id: ID!, name: String, completed: Boolean): Duty
        deleteDuty(id: ID!): Duty
    }
`;

export type DutyType = {
  __typename?: 'Duty';
  id: Scalars['ID'];
  name: Maybe<Scalars['String']>;
  completed: Maybe<Scalars['Boolean']>;
}