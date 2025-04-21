'use client'

import {Button, Checkbox, DatePicker, DatePickerProps, Form, type FormProps, Input, Select} from "antd";
import {CadastroContainer} from "@/app/cadastro/styles";
import {ClientRequest} from "@/types/client-types";
import {CreateOrder} from "@/app/api/actions/order";
import {CreateClient} from "@/app/api/actions/client";
import { format } from 'date-fns';
import {useState, useEffect} from "react";
import {ProductResponse} from "@/types/product-types";
import PhoneInput from "antd-phone-input";
import {RuleObject, StoreValue} from "rc-field-form/es/interface";
import {BRAZILIAN_STATES} from "@/shared/common/constatnts/brazilian-states";
import {GetProductByName} from "@/app/api/actions/products";
import {SearchCep} from "@/app/api/actions/seachCep";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

export interface PhoneProps {
    phoneWithAreaCode: string;
}

type LayoutType = Parameters<typeof Form>[0]['layout'];


export default function SignUpClientComponent () {
    const [form] = Form.useForm();
    const [phoneWithAreaCodeState, setPhoneWithAreaCodeState] = useState<string>('')
    const [cpfFieldState, setCpfState] = useState<string>('')
    const [typingTimeout, setTypingTimeout] = useState<number>(0)
    const router = useRouter();
    const [isCreatingClientState, setisCreatingClientState] = useState(false);
    const [createClientFailedState, setCreateClientFailedState] = useState(false);
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    
    
    const { login, isAuthenticated } = useAuth();


    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'Esse e-mail é inválido.',
        },
    };

    const onFinish: FormProps<ClientRequest>['onFinish'] = async (request) => {

        setisCreatingClientState(true);

        try {
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
            const userDataAuth  = {
                userToken: response.clientToken,
                userData: {
                    userId: response.id,
                    fullname: response.fullname,
                    email: response.email
                }
            }
            login(userDataAuth);
            router.push('/');
        }catch (error) {
            setisCreatingClientState(false)
            setCreateClientFailedState(true);
            console.error('Erro ao cadastrar cliente:', error);
        }


       

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


    useEffect(() => {
            if (isAuthenticated) {
                router.push('/');
            }
    }, );

    return (
        <CadastroContainer>
            <h1>{isAuthenticated && !isCreatingClientState ? 'Você já está logado.' : 'Novo Cadastro'}</h1>
            <Form
                name="basic"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true, gender: 'male'
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                validateMessages={validateMessages}
                layout="horizontal"
            >
                <Form.Item<ClientRequest>
                    label="Nome Completo"
                    name="fullname"
                    rules={[{ required: true, message: 'Por favor, digite o seu nome completo' }]}
                >
                    <Input 
                    disabled={isAuthenticated || isCreatingClientState}
                    />
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
                        disabled={isAuthenticated || isCreatingClientState}
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Data de Nascimento"
                    name="birthDate"
                    rules={[{ required: true, message: 'Por favor, digite a sua data de nascimento' }]}
                >
                    <DatePicker 
                        format="DD/MM/YYYY"
                        onChange={onChangeDate} 
                        disabled={isAuthenticated || isCreatingClientState}
                    />
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
                        disabled={isAuthenticated || isCreatingClientState}
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
                        disabled={isAuthenticated || isCreatingClientState}
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
                        disabled={isAuthenticated || isCreatingClientState}
                    
                    />

                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Endereço: "
                    name={['address', 'street']}
                    rules={[{ required: true, message: 'Por favor, digite o seu endereço' }]}
                >
                    <Input 
                    disabled={isAuthenticated || isCreatingClientState}
                    />

                </Form.Item>
                
                <Form.Item<ClientRequest>
                    label="Número: "
                    name={['address', 'number']}
                    rules={[{ required: true, message: 'Por favor, digite o seu número' }]}
                >
                    <Input 
                    disabled={isAuthenticated || isCreatingClientState}
                    />

                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Bairro: "
                    name={['address', 'neighborhood']}
                    rules={[{ required: true, message: 'Por favor, informe o seu bairro.' }]}
                >
                    <Input
                    disabled={isAuthenticated || isCreatingClientState}
                    />

                </Form.Item>

                
                <Form.Item<ClientRequest>
                    label="Cidade: "
                    name={['address', 'city']}
                    rules={[{ required: true, message: 'Por favor, digite o nome da sua cidade' }]}
                >
                    <Input 
                    disabled={isAuthenticated || isCreatingClientState}
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Estado"
                    name={['address', 'state']}
                    rules={[{ required: true, message: 'Por favor, selecione o estado' }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={BRAZILIAN_STATES}
                        disabled={isAuthenticated || isCreatingClientState}
                    />
                </Form.Item>

                <Form.Item<ClientRequest>
                    label="Complemento: "
                    name={['address', 'complement']}
                    rules={[{ required: false }]}
                >
                    <Input 
                        disabled={isAuthenticated || isCreatingClientState}
                    />

                </Form.Item>

                <Form.Item<ClientRequest>
                    label="E-mail"
                    name="email"
                    rules={[{ required: true, message: 'Por favor, digite o seu e-mail' }, { type: 'email' }]}
                >
                    <Input 
                        disabled={isAuthenticated || isCreatingClientState}
                    />
                </Form.Item>
                
                
                <Form.Item<ClientRequest>
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor, digite a sua senha!' }]}
                >
                    <Input.Password 
                        disabled={isAuthenticated || isCreatingClientState}
                    />
                </Form.Item>

                <Form.Item label={null} style={{ textAlign: 'right' }}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        disabled={isCreatingClientState || isAuthenticated}
                        >
                        {isCreatingClientState ? 'Criando...' : 'Cadastrar'}
                    </Button>
                    {createClientFailedState && 
                        <p style={{color: 'red'}}>
                        Falha ao criar cliente, verifique os dados informados e tente novamente.
                        </p>}
                </Form.Item>
            </Form>
        </CadastroContainer>
        
        
        
    )
}