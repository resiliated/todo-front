import React, {useEffect} from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import {
  StepForwardOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

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
        setNextState();
        onNextState(todo);
    }

  function setNextState(){
    switch (todo.state) {
      case "TODO":
        todo.state = "PROGRESS";
        break;
      case "PROGRESS":
        todo.state = "DONE";
        break;
      case "DONE":
        todo.state = "TODO";
        break;
      default:
        break;
    }
  }

  function getStateColor(){
    var color;
    switch (todo.state) {
      case "TODO":
        color = "red";
        break;
      case "PROGRESS":
        color = "volcano";
        break;
      case "DONE":
        color = "green";
        break;
      default:
        break;
    }
    return color;
  }

  function getStateContent(){
      var content;
      switch (todo.state) {
        case "TODO":
          content = "A faire";
          break;
        case "PROGRESS":
          content = "En cours";
          break;
        case "DONE":
          content = "Fait";
          break;
        default:
          break;
      }
      return content;
    }

  return (
    <Card
      style={{ margin: '0 0 12px 0' }}
      title={<Row><Col span={21} >{todo.title}</Col><Col span={3} ><Tag color={getStateColor()}>{getStateContent()}</Tag></Col></Row>}
      actions={[
        <StepForwardOutlined onClick={handleNextState} className={"step-forward"}/>,
        <EditOutlined onClick={onEdit}/>,
        <DeleteOutlined onClick={handleTodoDeletion}/>
      ]}
      >
      <Typography>
        <Paragraph>{todo.content}</Paragraph>
        <Text strong>Créée le: {todo.creation}</Text>
      </Typography>
    </Card>
  );
}

export default Todo;
