export default function InquirePage() {
  // This is a placeholder for the actual content of the InquirePage component.
    return (
      <section className="mx-auto px-4 py-12 max-w-prose text-center">
  <div style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-gray-800 space-y-16 text-sm sm:text-base leading-relaxed">
     
    {/* Portuguese Version */}
    <div>
      <h2 className="text-2xl font-light mb-4">Acesso Somente por Convite</h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        O Redentor Fund opera sob a isenção da Regulação S da SEC e não oferece produtos ou serviços a cidadãos ou residentes dos Estados Unidos. O fundo está fechado ao público geral. A participação é estritamente por convite, condicionada à conclusão bem-sucedida de um processo abrangente de verificação de identidade (KYC) e conformidade contra lavagem de dinheiro (AML). O investimento inicial mínimo é de <strong>R$ 500.000 (reais brasileiros)</strong>, sujeito a um período de bloqueio e a um cronograma de resgate condicionado à liquidez do fundo, à estrutura da carteira e a outras restrições internas. O Redentor não é uma consultoria de investimentos registrada, corretora ou instituição financeira. Não solicitamos nem aceitamos capital não solicitado. Esta é uma estrutura privada — propositalmente inacessível, construída para alinhamento estratégico de longo prazo. 
        <br /><br />
        Se desejar manifestar interesse em uma futura alocação, entre em contato pelo e-mail <a href="mailto:boundlessgroup@proton.me" className="underline hover:text-black transition">boundlessgroup@proton.me</a>.
      </p>
    </div>
    {/* English Version */}
    <br /><br />
    <div>
      <h2 className="text-2xl font-normal mb-4">Access by Invitation Only</h2>
      <p className="text-muted-foreground text-xl leading-relaxed">
        Redentor Fund operates under a Regulation S exemption and does not offer products or services to U.S. citizens or residents.
        The fund is closed to the general public. Participation is strictly by invitation, and contingent upon the successful completion of a comprehensive KYC and AML onboarding process.
        The minimum initial allocation is <strong>R$ 500.000,00 Brazilian Reals (approximately $100,000 U.S. Dollars)</strong>, followed by a lockup period and a redemption schedule subject to fund liquidity, portfolio structure, and other internal constraints.
        Redentor is not a registered investment advisor, broker-dealer, or financial institution. We do not solicit, advertise, or accept unsolicited capital. This is a private structure — intentionally inaccessible, built for long-term strategic alignment. If you wish to express interest in a future allocation, you may contact us to request additional information.
      </p>
    </div>

  </div>
</section> );
}
