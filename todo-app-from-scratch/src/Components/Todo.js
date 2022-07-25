import React from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import { Divider, Typography } from 'antd';
import { StepForwardOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text, Link } = Typography;


export function Todo(props){

  function handleTodoDeletion(){
    props.onTodoDeletion(props.todo);
  }

  function handleNextState(){
    props.onNextState(props.todo);
  }

  function getNextStateContent(){
    return props.todo.state === "TODO" ? "Commencer" : "Terminer";
  }

  function getTodoClassNames(){
    return "container todo " + props.todo.state;
  }

  function handleReset(){
    props.onReset(props.todo);
  }

  //TODO use same button to next and reset state
  return (
    <Card
      className={getTodoClassNames()}
      title={props.todo.title}
      actions={[
        <StepForwardOutlined onClick={handleNextState} />,
        <EditOutlined />,
        <DeleteOutlined onClick={handleTodoDeletion}/>
      ]}
      >
      <Typography>
        <Paragraph>{props.todo.content}</Paragraph>
        <Text strong>Créée le: {props.todo.creation}</Text>
      </Typography>
    </Card>
  );
}

export default Todo;
