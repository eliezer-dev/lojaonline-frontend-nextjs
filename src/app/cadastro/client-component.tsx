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
import {BRAZILIAN_STATES} from "@/shared/common/constatnts/brazilian-states";
import {GetProductByName} from "@/app/api/actions/products";
import {SearchCep} from "@/app/api/actions/seachCep";
import { useAuth } from "@/context/AuthContext";

export interface PhoneProps {
    phoneWithAreaCode: string;
}



export default function SignUpClientComponent () {
    const [form] = Form.useForm();
    const [phoneWithAreaCodeState, setPhoneWithAreaCodeState] = useState<string>('')
    const [cpfFieldState, setCpfState] = useState<string>('')
    const [typingTimeout, setTypingTimeout] = useState<number>(0)
    
    const { login } = useAuth();


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'Esse e-mail é inválido.',
        },
    };

    const onFinish: FormProps<ClientRequest>['onFinish'] = async (request) => {

        if (request.birthDate) {
            request.birthDate = format(new Date(request.birthDate), 'yyyy-MM-dd')
        }
       
        if ('phoneWithAreaCode' in request) {
            request.phone = [{
                countryCode: '+55',
                areaCode: (request as any).phoneWithAreaCode.areaCode,
                number: (request as any).phoneWithAreaCode.phoneNumber
            }]
            
            delete (request as any).phoneWithAreaCode;
        }
        
        const response = await CreateClient(request);

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

    const handleChangeCep = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valor = event.target.value.replace(/\D/g, ''); 

        if (valor.length > 8) {
            valor = valor.substring(0, 8); // Limita o CEP a no máximo 8 dígitos
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout); 
        }

        setTypingTimeout(
            window.setTimeout(() => { 
                if (valor.length === 8) {
                    const cepFormatado = valor.replace(/^(\d{5})(\d{3})$/, "$1-$2"); 
                    form.setFieldValue(["address", "zipCode"], cepFormatado); 
                    fetchCep(valor); 
                }
            }, 500) // Debounce: 500ms
        );


    };

    
    const phoneValidator = (_: any, value: any) => {
        
        let cleanedValue:string = ''
        
        //se pelo area code ou o numero do telefone estiver preenchido
        if (value && (value.areaCode || value.phoneNumber)) {
            cleanedValue = `${value.areaCode}${value.phoneNumber}`;

            // Regex para validar formato: DDD (2 dígitos) + Número (9 dígitos)
            const phoneRegex = /^\d{11}$/;

            if (!phoneRegex.test(cleanedValue)) {
                return Promise.reject("Por favor, insira o número de celular válido.");
            }

            return Promise.resolve();

       }

       return Promise.reject();
    
 

    };


    const fetchCep = async (cep:string) => {
        const response = await SearchCep(cep);
        form.setFieldValue(['address', 'street'], response.logradouro);
        form.setFieldValue(['address', 'number'], response.complemento);
        form.setFieldValue(['address', 'city'], response.localidade);
        form.setFieldValue(['address', 'neighborhood'], response.bairro);
        form.setFieldValue(['address', 'state'], response.uf);
        console.log(response);

    };



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
                validateMessages={validateMessages}
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
                            message: 'O CPF deve conter 11 dígitos numéricos'
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
                    name="phoneWithAreaCode"
                    rules={[
                        { required: true, message: 'Por favor, informe o número do celular.' },
                        { validator: phoneValidator}                   
                    
                    ]}
                >
                    <PhoneInput
                        disableDropdown
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Cep: "
                    name={['address', 'zipCode']}
                    rules={[
                        { required: true, message: 'Por favor, digite o seu cep' },
                        {
                            pattern: /^\d{5}-\d{3}$/,
                            message: 'O CEP deve estar no formato XXXXX-XXX'
                        }
                    
                    ]}
                >
                    <Input
                        maxLength={9}
                        onChange={handleChangeCep}
                    
                    />

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
                    <Select
                        style={{ width: 120 }}
                        options={BRAZILIAN_STATES}
                    />
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
                    rules={[{ required: true, message: 'Por favor, digite o seu e-mail' }, { type: 'email' }]}
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