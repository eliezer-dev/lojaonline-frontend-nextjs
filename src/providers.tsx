"use client"

import StyledComponentsRegistry from "@/lib/registry"
import {GlobalStyles} from "@/styles/global";
import {ThemeProvider} from "styled-components";
import {theme} from "@/styles";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import PhoneInput from "antd-phone-input";

function Providers(props: React.PropsWithChildren) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <ConfigProvider locale={ptBR}>
                    <AntdRegistry>{props.children}</AntdRegistry>
                </ConfigProvider>

                
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}

export default Providers