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


const { Text } = Typography;

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
      title={<Row><Col span={18}><Text ellipsis={true}>{todo.title}</Text></Col><Col span={6} ><Tag color={TodoHelpers.getStateColor(todo)}>{TodoHelpers.getStateContent(todo)}</Tag></Col></Row>}
      actions={[
        <StepForwardOutlined onClick={handleNextState}/>,
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
