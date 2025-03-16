import Link from "next/link";
import { LoginContainer, LoginContent, LoginButton } from "./styles";

export default function Login() {
    return (
        <LoginContainer>
            <LoginContent>
                <h1>Entre ou Cadastre-se</h1>
                <LoginButton>Fazer Login</LoginButton>
                <Link href={"/cadastro"}>
                    <LoginButton>Criar Cadastro</LoginButton>
                </Link>
            </LoginContent>
        </LoginContainer>
    );
}