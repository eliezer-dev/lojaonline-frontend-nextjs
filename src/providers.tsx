"use client"

import StyledComponentsRegistry from "@/lib/registry"
import {GlobalStyles} from "@/styles/global";
import {ThemeProvider} from "styled-components";
import {theme} from "@/styles";
import { AntdRegistry } from '@ant-design/nextjs-registry';

function Providers(props: React.PropsWithChildren) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <AntdRegistry>{props.children}</AntdRegistry>

                
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}

export default Providers