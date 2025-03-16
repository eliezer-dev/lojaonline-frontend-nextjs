'use client'

import {Button, Checkbox, DatePicker, DatePickerProps, Form, type FormProps, Input, Select} from "antd";
import {CadastroContainer} from "@/app/cadastro/styles";
// import ptBR from 'antd/es/locale/pt_BR'; // Ant Design em português
// import 'moment/locale/pt-br'; // Moment.js em português


export default function SignUpClientComponent () {

    type FieldType = {
        fullname: string;
        email: string;
        document: string;
        gender: string;
        password?: string;
        remember?: string;
        birthdate?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    return (
        <CadastroContainer>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true, gender: 'male'}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Nome Completo"
                    name="fullname"
                    rules={[{ required: true, message: 'Por favor, digite o seu nome completo' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item<FieldType>
                    label="CPF"
                    name="document"
                    rules={[{ required: true, message: 'Por favor, digite o seu nome completo' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Data de Nascimento"
                    name="birthdate"
                    rules={[{ required: true, message: 'Por favor, digite a sua data de nascimento' }]}
                >
                    <DatePicker format="DD/MM/YYYY"
                                onChange={onChangeDate} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Gênero"
                    name="gender"
                    rules={[{ required: true, message: 'Por favor, selecione o seu gênero' }]}
                >
                    <Select
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'male', label: 'Masculino' },
                            { value: 'female', label: 'Feminino' },
                            { value: 'outros', label: 'Outros' }
                        ]}
                    />
                </Form.Item>

                <Form.Item<FieldType>
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, digite o seu e-mail' }]}
                >
                    <Input />
                </Form.Item>
                
                
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </CadastroContainer>
        
        
        
    )
}