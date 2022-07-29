import React from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import {
  StepForwardOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import TodoHelpers from '../TodoHelpers.js'


const { Paragraph, Text } = Typography;

export function Todo({todo, onNextState, onTodoDeletion}){
    let navigate = useNavigate();

    function onEdit(){
        navigate("/add", {state: todo});
    }

    function handleTodoDeletion(){
        onTodoDeletion(todo);
    }

    function handleNextState(){
        todo = TodoHelpers.setNextState(todo);
        onNextState(todo);
    }


  return (
    <Card
      style={{ margin: '0 0 12px 0' }}
      title={<Row><Col span={21} >{todo.title}</Col><Col span={3} ><Tag color={TodoHelpers.getStateColor(todo)}>{TodoHelpers.getStateContent(todo)}</Tag></Col></Row>}
      actions={[
        <StepForwardOutlined onClick={handleNextState} className={"step-forward"}/>,
        <EditOutlined onClick={onEdit}/>,
        <DeleteOutlined onClick={handleTodoDeletion}/>
      ]}
      >
      <Typography>
        <Text strong>Créée le: {todo.creation}</Text>
      </Typography>
    </Card>
  );
}

export default Todo;
