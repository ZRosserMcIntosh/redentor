export default function InquirePage() {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-white text-gray-800">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-4xl font-semibold mb-6">Inquire</h1>
          <p className="text-lg text-muted-foreground mb-10">
            A gateway for prospective capital partners
          </p>
  
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">Redentor Fund is not open to the public.</h2>
            <p className="text-muted-foreground">
              This is not an offer to invest. Redentor operates as a closed, performance-driven private fund. We do not accept external capital on a rolling basis. However, we maintain a private dialogue with qualified institutions, allocators, and aligned partners for future strategic expansion.
              <br /><br />
              If you’re here, it’s likely through a warm introduction or via Boundless. We value thoughtful capital, not passive inflows.
            </p>
          </section>
  
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">We are building for longevity, not volume.</h2>
            <p className="text-muted-foreground">
              Our edge lies in disciplined, asymmetric positioning within the SPX options market. We apply strict risk frameworks and proprietary signals with high confidence thresholds. Every dollar deployed reflects our personal capital, not abstractions.
              <br /><br />
              Redentor is optimized for long-term compounding — not short-term capital cycles.
            </p>
          </section>
  
          <section className="mb-12">
            <h2 className="text-2xl font-medium mb-4">A Word on Risk</h2>
            <p className="text-muted-foreground">
              Investing in derivative-based strategies involves substantial risk. The strategies employed by Redentor Fund involve leverage, and the potential for loss is significant. Past performance is not indicative of future results.
              <br /><br />
              This is not an offer to sell or a solicitation to buy any securities or fund interests. Any such offer, if made, will be pursuant to formal documentation and only available to accredited investors or qualified institutional buyers.
              <br /><br />
              <em>You should not consider the information presented here as investment advice.</em>
            </p>
          </section>
  
          <section className="mb-16">
            <h2 className="text-2xl font-medium mb-4">Reach Out Privately</h2>
            <p className="text-muted-foreground mb-6">
              We take alignment seriously. If you're interested in exploring a future dialogue, please express interest below or reach out via direct introduction.
            </p>
            <a href="mailto:contact@redentorfund.com" className="inline-block bg-black text-white px-6 py-3 rounded-2xl shadow hover:bg-opacity-80 transition">
              Submit Interest
            </a>
          </section>
  
          <footer className="text-sm text-muted-foreground border-t pt-6">
            Redentor Fund is managed by Boundless Capital. All rights reserved. This page is for informational purposes only.
          </footer>
        </div>
      </div>
    );
  }
  