'use client'

import {Button, Checkbox, DatePicker, DatePickerProps, Form, type FormProps, Input, Select} from "antd";
import Link from "next/link";
import { LoginContainer, LoginContent } from "./styles";
import { AuthenticateUser } from "../api/actions/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";	
import { useState } from "react";

export interface AuthRequest {
    email: string;
    password: string;
}


export default function SignInClientComponent () {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const [form] = Form.useForm();

    const { login } = useAuth();

    const router = useRouter();

   const onFinish: FormProps<AuthRequest>['onFinish'] = async (request) => {
        setIsLoggingIn(true)
        
        try {
            const response = await AuthenticateUser(request);
            if (response) {
                login(response);
                router.push('/');
            }
        } catch (error) {
            setIsLoggingIn(false);
            setLoginFailed(true);
            console.error('Erro ao fazer login:', error);
        }
       
    };

 

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} é obrigatório.',
        types: {
            email: 'Esse e-mail é inválido.',
        },
    };


    return (
        <LoginContainer>
           <LoginContent>
                    <h1>Entre ou Cadastre-se</h1>
                    <Form
                        name="basic"
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true, gender: 'male'
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                        validateMessages={validateMessages}
                    >

                        <Form.Item<AuthRequest>
                            label="E-mail"
                            name="email"
                            rules={[{ required: true, message: 'Por favor, digite o seu e-mail.' }, { type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<AuthRequest>
                            label="Senha"
                            name="password"
                            rules={[{ required: true, message: 'Por favor, digite a sua senha.' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item 
                        >
                            <Button className="login_button" block htmlType="submit">
                                {isLoggingIn ? 'Entrando...': 'Entrar'}
                            </Button>
                            Não tem cadastro? <Link href="/cadastro">Cadastre-se agora!</Link>
                            {loginFailed && <p style={{color: 'red'}}>E-mail ou senha inválidos.</p>}
                        </Form.Item>

                    </Form>
        
            </LoginContent>
        </LoginContainer>
    );
}