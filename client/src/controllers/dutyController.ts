import {gql} from "@apollo/client";


export const GET_DUTY = gql`
    query Duty($id: ID!) {
        duty(id: $id) {
            id
            name
            completed
        }
    }
`;

export const GET_DUTIES = gql`
    query GetDuties{
        duties {
            id
            name
            completed
        }
    }
`;

export const CREATE_DUTY = gql`
    mutation CreateDuty($name: String) {
        createDuty(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_DUTY = gql`
    mutation UpdateDuty($id: ID!, $name: String, $completed: Boolean) {
        updateDuty(id: $id, name: $name, completed: $completed) {
            id
            name
            completed
        }
    }
`;

export const DELETE_DUTY = gql`
    mutation DeleteDuty($id: ID!) {
        deleteDuty(id: $id) {
            id
        }
    }
`;