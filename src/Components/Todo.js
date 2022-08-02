import React from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { Typography } from 'antd';
import {
  StepForwardOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import TodoHelpers from '../TodoHelpers.js'


const { Text } = Typography;

export function Todo({todo, onTodoUpdate, onTodoDelete, onTodoEdit}){

    function handleTodoEdit(){
        onTodoEdit(todo)
    }

    function handleTodoDelete(){
        onTodoDelete(todo);
    }

    function handleNextState(){
        todo = TodoHelpers.setNextState(todo);
        onTodoUpdate(todo);
    }

    return (
        <Card
          title={<Row><Col span={18}><Text ellipsis={true}>{todo.title}</Text></Col><Col span={6} ><Tag color={TodoHelpers.getStateColor(todo)}>{TodoHelpers.getStateContent(todo)}</Tag></Col></Row>}
          actions={[
            <StepForwardOutlined onClick={handleNextState}/>,
            <EditOutlined onClick={handleTodoEdit}/>,
            <DeleteOutlined onClick={handleTodoDelete}/>
          ]}
          >
          <Typography>
            <Text strong>Créée le: {todo.creation}</Text>
          </Typography>
        </Card>
    );
}

export default Todo;
