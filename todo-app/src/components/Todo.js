import React from 'react';
import {Button, Card} from 'react-bootstrap';

const Todo = ({
  id,
  title,
  description
}) => {
  return (
  <Card>
    <div>Title: {title} </div>
    <div>Description: {description} </div>
    <Button/>
  </Card>);
}

export default Todo;
