import React from 'react';
import { Button, Form, Input, Checkbox, Layout } from 'antd';

export function Login({onLogin}){

    function onFinish(values){
        fetch("http://localhost:8080/login", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: values.username,password: values.password,})
            })
            .then(res => res.json())
            .then(
            (user) => {
                onLogin(user.id);
            },
            (error) => {
            }
        );
    }

    function onFinishFailed(errorInfo){
        console.log('Failed:', errorInfo);
    }

    return (
        <Layout>
        <Form
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        initialValues={{
        remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
        label="Username"
        name="username"
        rules={[
        {
        required: true,
        message: 'Please input your username!',
        },
        ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[
        {
        required: true,
        message: 'Please input your password!',
        },
        ]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
        offset: 8,
        span: 16,
        }}
        >
        <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
        wrapperCol={{
        offset: 8,
        span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </Form.Item>
        </Form>
        </Layout>
    );

}

export default Login;