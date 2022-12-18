import React from "react";
import s from './duties.module.css';

import {DutyType} from "../../schemes/duty";
import {Checkbox, Input} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

interface Props {
  duty: DutyType;
  onChange: (duty: DutyType) => void;
  onDelete: (duty: DutyType) => void;
  className?: string;
}


export const Duty = ({duty, onChange, onDelete, className} : Props) => {
  return <div className={`flex w-full items-center gap-x-3 ${className}`}>
      <Checkbox checked={duty.completed} onChange={(e) => onChange({
        id: duty.id,
        completed: e.target.checked
      })}/>
      <Input value={duty.name} onChange={(e) => onChange({
        id: duty.id,
        name: e.target.value
      })}/>
      <DeleteOutlined onClick={() => onDelete(duty)} className={s.deleteIcon} />

  </div>
}