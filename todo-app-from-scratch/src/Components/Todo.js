import React from 'react';

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
