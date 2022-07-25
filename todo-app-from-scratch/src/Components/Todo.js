import React from 'react';
import { Card, Row, Col, Tag } from 'antd';
import { Typography } from 'antd';
import {
  StepForwardOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export function Todo(props){

  function handleTodoDeletion(){
    props.onTodoDeletion(props.todo);
  }

  function handleNextState(){
    props.onNextState(props.todo);
  }

  function getStateColor(){
    var color;
    switch (props.todo.state) {
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
      switch (props.todo.state) {
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

  //TODO use same button to next and reset state
  return (
    <Card
      style={{ margin: '0 0 12px 0' }}
      title={<Row><Col span={21} >{props.todo.title}</Col><Col span={3} ><Tag color={getStateColor()}>{getStateContent()}</Tag></Col></Row>}
      actions={[
        <StepForwardOutlined onClick={handleNextState} className={"step-forward"}/>,
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
