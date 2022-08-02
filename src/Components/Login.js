import React from 'react';
import { Button, Form, Input, Checkbox, Layout, Alert } from 'antd';

export function Login({onLogin, error}){

    function onFinish(values){
        onLogin(values);
    }

    return (
        <Layout>
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        }
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
                        message: 'Please input your password!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            {error !== null ? <Alert message={error !==null ? error.message : ""} type="error" showIcon /> :null}
        </Layout>
    );
}

export default Login;