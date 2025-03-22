'use client'

import {Button, Checkbox, DatePicker, DatePickerProps, Form, type FormProps, Input, Select} from "antd";
import {CadastroContainer} from "@/app/cadastro/styles";
import {ClientRequest} from "@/types/client-types";
import {CreateOrder} from "@/app/api/actions/order";
import {CreateClient} from "@/app/api/actions/client";
import { format } from 'date-fns';
import {useState} from "react";
import {ProductResponse} from "@/types/product-types";
import PhoneInput from "antd-phone-input";
import {RuleObject, StoreValue} from "rc-field-form/es/interface";
// import ptBR from 'antd/es/locale/pt_BR'; // Ant Design em português
// import 'moment/locale/pt-br'; // Moment.js em português

export interface PhoneProps {
    phoneWithAreaCode: string;
}



export default function SignUpClientComponent () {
    const [form] = Form.useForm();
    const [phoneWithAreaCodeState, setPhoneWithAreaCodeState] = useState<string>('')
    const [cpfFieldState, setCpfState] = useState<string>('')
    


    const onFinish: FormProps<ClientRequest>['onFinish'] = async (request) => {



        if (request.birthDate) {
            request.birthDate = format(new Date(request.birthDate), 'yyyy-MM-dd')
        }
        
        request.phone = [{
                countryCode: '55',
                areaCode: phoneWithAreaCodeState.substring(0, 2),
                number: phoneWithAreaCodeState.substring(2, phoneWithAreaCodeState.length)
            }]
        
        const response = await CreateClient(request);
        console.log(response);
    };

    const onFinishFailed: FormProps<ClientRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneWithAreaCodeState(event.target.value); 
    };

    // const phoneValidator = (_: RuleObject, value: StoreValue) => {
    //     // Remove quaisquer espaços ou caracteres especiais da entrada
    //
    //     // Verifica se a entrada está vazia
    //     if (!cleanedValue) {
    //         return Promise.reject("Por favor, insira o número de celular");
    //     }
    //
    //     // Regex ajustada para validar DDD (2 dígitos) + Número (8-9 dígitos)
    //     const phoneRegex = /^\d{2}\d{8,9}$/;
    //
    //     if (!phoneRegex.test(cleanedValue)) {
    //         return Promise.reject("O número de celular é inválido. Certifique-se de incluir o DDD e o número.");
    //     }
    //
    //     return Promise.resolve();
    //
    // };





    return (
        <CadastroContainer>
            <h1>Novo Cadastro</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true, gender: 'male'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item<ClientRequest>
                    label="Nome Completo"
                    name="fullname"
                    rules={[{ required: true, message: 'Por favor, digite o seu nome completo' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="CPF"
                    name="document"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, digite o CPF'
                        },
                        {
                            pattern: /^[0-9]{11}$/,
                            message: 'O CPF deve conter exatamente 11 dígitos numéricos'
                        }
                    ]}
                >
                    <Input 
                        maxLength={11}
                        onChange={(e) => {
                            const onlyNumbers = e.target.value.replace(/\D/g, '');
                            form.setFieldsValue({ document: onlyNumbers });
                        }}
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Data de Nascimento"
                    name="birthDate"
                    rules={[{ required: true, message: 'Por favor, digite a sua data de nascimento' }]}
                >
                    <DatePicker format="DD/MM/YYYY"
                                onChange={onChangeDate} />
                </Form.Item>

                <Form.Item<ClientRequest>
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

                <Form.Item<PhoneProps>
                    label="Celular: "
                    rules={[
                        { required: true, message: 'Por favor, digite o seu número de celular.' },
                        // {validator: phoneValidator}                   
                    
                    ]}
                >
                    <PhoneInput
                        value={phoneWithAreaCodeState}
                        disableDropdown
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Cep: "
                    name={['address', 'zipCode']}
                    rules={[{ required: true, message: 'Por favor, digite o seu cep' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Endereço: "
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Por favor, digite o seu endereço' }]}
                >
                    <Input />

                </Form.Item>
                
                <Form.Item<ClientRequest>
                    label="Número: "
                    name={['address', 'number']}
                    rules={[{ required: true, message: 'Por favor, digite o seu número' }]}
                >
                    <Input />

                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Bairro: "
                    name={['address', 'neighborhood']}
                    rules={[{ required: true, message: 'Por favor, informe o seu bairro.' }]}
                >
                    <Input />

                </Form.Item>

                
                <Form.Item<ClientRequest>
                    label="Cidade: "
                    name={['address', 'city']}
                    rules={[{ required: true, message: 'Por favor, digite o nome da sua cidade' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Estado"
                    name={['address', 'state']}
                    rules={[{ required: true, message: 'Por favor, selecione o estado' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Complemento: "
                    name={['address', 'complement']}
                    rules={[{ required: false }]}
                >
                    <Input />

                </Form.Item>

                <Form.Item<ClientRequest>
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, digite o seu e-mail' }]}
                >
                    <Input />
                </Form.Item>
                
                
                <Form.Item<ClientRequest>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </CadastroContainer>
        
        
        
    )
}