import {MutationHookOptions, useMutation, useQuery} from "@apollo/client";
import {CREATE_DUTY, DELETE_DUTY, GET_DUTIES, UPDATE_DUTY} from "../../controllers/dutyController";
import {Button, Spin} from 'antd';
import React, {useEffect, useState} from "react";
import {DutyType} from "../../schemes/duty";
import {Duty} from "./Duty";
import {GraphQLError} from "graphql/error";

const apolloOptions: MutationHookOptions = {
  notifyOnNetworkStatusChange: true,
  errorPolicy: 'all',
}

export function Duties() {
  const {loading, error, data} = useQuery(GET_DUTIES, apolloOptions);
  const [createDuty] = useMutation(CREATE_DUTY, apolloOptions);
  const [updateDuty] = useMutation(UPDATE_DUTY, apolloOptions);
  const [deleteDuty] = useMutation(DELETE_DUTY, apolloOptions);


  const [duties , setDuties] = useState<DutyType[]>([]);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    if(data)setDuties(data.duties);
  }, [data]);

  const manageError = (errors: readonly GraphQLError[] | undefined) => {
    if(errors?.length){
      alert('Error ' + errors[0]?.message);
      return false;
    }
    return true;
  }


  const onAddDuty = async () => {
    const name = prompt('Enter duty name');
    if (!name) return;

    setAddLoading(true);
    const {data, errors} = await createDuty({
      variables: {
        name
      }
    });
    if(!manageError(errors))return;
    setDuties([...duties, data.createDuty]);
    setAddLoading(false);
  }

  const onChangeDuty = async (duty: DutyType) => {
    const {data, errors} = await updateDuty({
      variables: {
        ...duty
      }
    });
    if(!manageError(errors))return;
    setDuties(duties.map(d => d.id === data?.updateDuty?.id ? data.updateDuty : d));
  }

  const onDeleteDuty = async (duty: DutyType) => {
    if(confirm('Are you sure?')){
      const {data,errors} = await deleteDuty({
        variables: {
          id: duty.id
        }
      });

      if(!manageError(errors))return;
      setDuties(duties.filter(d => d.id !== data?.deleteDuty?.id));
    }
  }


  if (error) return <p>{error.message}</p>;


  if (loading) return <Spin/>;

  return <div style={{width: 600}}>


    {duties.map((duty: any) =>
      <Duty
        key={duty.id}
        duty={duty}
        onChange={onChangeDuty}
        className="w-full mb-5"
        onDelete={onDeleteDuty}
      />)}

    <Button onClick={() => onAddDuty()} loading={addLoading}>Add Duty</Button>
  </div>
}