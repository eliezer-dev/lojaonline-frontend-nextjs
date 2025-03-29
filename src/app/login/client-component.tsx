'use client'

import {Button, Checkbox, DatePicker, DatePickerProps, Form, type FormProps, Input, Select} from "antd";
import Link from "next/link";
import { LoginContainer, LoginContent } from "./styles";
import { AuthenticateUser } from "../api/actions/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";	

export interface AuthRequest {
    email: string;
    password: string;
}


export default function SignInClientComponent () {

    const [form] = Form.useForm();

    const { login } = useAuth();

    const router = useRouter();

   const onFinish: FormProps<AuthRequest>['onFinish'] = async (request) => {
        const response = await AuthenticateUser(request);
        if (response) {
            login(response);
            router.push('/');
        }
       
    };

 

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} is required!',
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
                        //labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
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
                        //wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button className="login_button" block htmlType="submit">
                                Entrar
                            </Button>
                            Não tem cadastro? <Link href="/cadastro">Cadastre-se agora!</Link>
                        </Form.Item>

                    </Form>
        
            </LoginContent>
        </LoginContainer>
    );
}