// app/risk-disclosure/page.tsx

import React from 'react';

export default function RiskDisclosurePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-4 py-8 lg:px-24">
      <h1 className="text-red-500 text-6xl">Tailwind is working!</h1>
      <h1 className="text-5xl text-red-500 font-extrabold text-center mb-12"      >Risk Disclosure Statement / Declaração de Divulgação de Riscos</h1>

      <div className="flex flex-col items-center gap-12">
        {/* English Column */}n
        <div className="w-full max-w-3xl">
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-4">English</h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-center">
              <p><strong>IMPORTANT NOTICE</strong><br />
              The following Risk Disclosure Statement is intended to provide clients, investors, and other users of Boundless ("the Platform") with a comprehensive understanding of the potential risks associated with using the Platform and engaging in investment and trading activities. By accessing or using the Platform, you acknowledge that you have read, understood, and accepted the terms outlined below.</p>

              <p><strong>1. General Investment Risks</strong><br />
              - No Guarantee of Returns<br />
              - Market Risk<br />
              - Liquidity Risk</p>

              <p><strong>2. Derivatives and Leverage Risks</strong><br />
              - Leverage Amplifies Risk<br />
              - Options and Spread Trading<br />
              - Margin Calls</p>

              <p><strong>3. Algorithmic and Quantitative Strategies</strong><br />
              - System Risk<br />
              - Overfitting and Bias<br />
              - Execution Risk</p>

              <p><strong>4. Alternative Investments & Emerging Market Risks</strong><br />
              - Non-Standard Asset Classes<br />
              - Regulatory Risk<br />
              - Currency and Conversion Risk</p>

              <p><strong>5. Operational and Platform Risks</strong><br />
              - Cybersecurity and Data Risks<br />
              - Third-Party Providers<br />
              - Downtime and Maintenance</p>

              <p><strong>6. Legal and Regulatory Disclaimer</strong><br />
              - No Investment Advice<br />
              - Suitability<br />
              - Compliance Obligations</p>

              <p><strong>7. Conflicts of Interest and Fees</strong><br />
              - Performance Fees and Incentives<br />
              - Disclosure of Interests</p>

              <p><strong>8. Force Majeure and Systemic Events</strong><br />
              - Extraordinary Circumstances</p>

              <p><strong>9. Risk Acknowledgment</strong><br />
              - You understand the nature of the risks<br />
              - You are financially capable of bearing potential losses<br />
              - You are solely responsible for the consequences of your investment decisions</p>

              <p><strong>10. Contact and Further Information</strong><br />
              If you have questions about this Risk Disclosure or need additional clarification, please contact us at:<br />
              compliance@boundless.fund or via the investor support section of the Platform.</p>
            </div>
          </section>
        </div>

        {/* Portuguese Column */}
        <div className="w-full max-w-3xl">
          <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Português</h2>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-center">
              <p><strong>AVISO IMPORTANTE</strong><br />
              A seguinte Declaração de Divulgação de Riscos destina-se a fornecer aos clientes, investidores e demais usuários da Boundless ("a Plataforma") uma compreensão abrangente dos riscos potenciais associados ao uso da Plataforma e à participação em atividades de investimento e negociação. Ao acessar ou utilizar a Plataforma, você reconhece que leu, entendeu e aceitou os termos descritos abaixo.</p>

              <p><strong>1. Riscos Gerais de Investimento</strong><br />
              - Sem Garantia de Retornos<br />
              - Risco de Mercado<br />
              - Risco de Liquidez</p>

              <p><strong>2. Riscos de Derivativos e Alavancagem</strong><br />
              - Alavancagem Amplifica o Risco<br />
              - Negociação de Opções e Spreads<br />
              - Chamadas de Margem</p>

              <p><strong>3. Estratégias Algorítmicas e Quantitativas</strong><br />
              - Risco de Sistema<br />
              - Overfitting e Viés<br />
              - Risco de Execução</p>

              <p><strong>4. Riscos de Investimentos Alternativos e Mercados Emergentes</strong><br />
              - Classes de Ativos Não Convencionais<br />
              - Risco Regulatória<br />
              - Risco Cambial e de Conversão</p>

              <p><strong>5. Riscos Operacionais e da Plataforma</strong><br />
              - Cibersegurança e Dados<br />
              - Fornecedores Terceirizados<br />
              - Manutenção e Interrupções</p>

              <p><strong>6. Isenção Legal e Regulatória</strong><br />
              - Sem Consultoria de Investimentos<br />
              - Adequação<br />
              - Cumprimento de Normas</p>

              <p><strong>7. Conflitos de Interesse e Taxas</strong><br />
              - Taxas de Performance e Incentivos<br />
              - Divulgação de Interesses</p>

              <p><strong>8. Força Maior e Eventos Sistêmicos</strong><br />
              - Circunstâncias Extraordinárias</p>

              <p><strong>9. Reconhecimento de Risco</strong><br />
              - Compreende os riscos descritos acima<br />
              - Está financeiramente apto a suportar possíveis perdas<br />
              - É o único responsável pelas consequências de suas decisões de investimento</p>

              <p><strong>10. Contato e Informações Adicionais</strong><br />
              Caso tenha dúvidas sobre esta Declaração de Riscos ou deseje esclarecimentos, entre em contato através de:<br />
              compliance@boundless.fund ou pela seção de suporte ao investidor da Plataforma.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
