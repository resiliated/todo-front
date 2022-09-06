import React, {useState, useContext} from 'react';
import { AuthContext } from '../Context.js';
import { Button, Form, Input, Checkbox, Layout, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import APIService from '../APIService.js'


export function Login(){

    const
    [error, setError] = useState(null),
    [authState, setAuthState] = useContext(AuthContext),
    navigate = useNavigate();

    function onFinish(values){
        APIService.login(values.username, values.password).then((response) => {
            if(response.status === 401){
                setError(response.statusText);
            }else if(!authState.logged){
                setAuthState({logged: true});
                navigate("/list");
            }
        });
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
            {error !== null ? <Alert message={error !==null ? error : ""} type="error" showIcon /> :null}
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        </Layout>
    );
}

export default Login;