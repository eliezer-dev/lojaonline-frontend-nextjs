import styled   from "styled-components";
import {FooterContainer, FooterContent, FooterSection} from "@/app/components/footer/styles";
import {MailOutlined} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import cardAmericanExpress from "@/assets/cards/card1AmericanExpress.svg"
import cardVisa from "@/assets/cards/card2Visa.svg"
import cardMastercard from "@/assets/cards/card3MasterCard.svg"
import cardDinners from "@/assets/cards/card4Dinners.svg"
import googlePay from "@/assets/cards/Google Pay.webp"

export default function Footer() {
  return (
      <FooterContainer>
          <FooterSection>
             <FooterContent>
                 <div className={'title'}>
                     <MailOutlined />
                     <h1>Contato</h1>
                 </div>
               
                 <p>58.630.606 ELIEZER RAMOS PALHAO</p>
                 <p>CNPJ: 58.630.606/0001-90</p>
                 <p>Avenida Pascoal Piconi 124</p>
                 <p>Jardim São Manoel, Nova Odessa - SP</p>
                 <p>CEP: 13.386-036</p>
             </FooterContent>
              <FooterContent>
                  <div className={'title'}>
                      <h1>Informações</h1>
                  </div>
                  <div className={'links'}>
                      <Link href={"#"}>Institucional</Link>
                      <Link href={"#"}>Blog</Link>
                      <Link href={"#"}>Política de Privacidade</Link>
                      <Link href={"#"}>Trabalhe Conosco</Link>
                  </div>
  
      
              </FooterContent>
              <FooterContent>
                  <div className={'title'}>
                      <h1>Dúvidas</h1>
                  </div>
                  <div className={'links'}>
                    <Link href={"#"}>Perguntas Frequentes</Link>
                    <Link href={"#"}>Frete e Prazos de Entrega</Link>
                    <Link href={"#"}>Política de Devolução e Reembolso</Link>
                  </div>

              </FooterContent>  
              
              
             
          </FooterSection>
          <FooterSection>
              <FooterContent>
                  <div className={'title'}>
                      <h1>Formas de Pagamento</h1>
        
                  </div>
                  <div className={'cards'}>
                      <Image src={cardAmericanExpress} alt={"Imagem do cartão American Express"}/>
                      <Image src={cardVisa} alt={"Imagem do cartão Visa"}/>
                      <Image src={cardMastercard} alt={"Imagem do cartão MasterCard"}/>
                      <Image src={cardDinners} alt={"Imagem do cartão Dinners"}/>
                      <Image src={googlePay} alt={"Imagem do Google Pay"} width={32} height={32}/>
                  </div>
              </FooterContent>
          </FooterSection>
      
      </FooterContainer>
  
  );
}