import React from 'react'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-secondary/20 border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Refund Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Digital Product Policy</h2>
              <p>
                Due to the nature of digital products, all sales are final. Once you have received access to download our video editing bundle (LUTs, animations, presets, and templates), we cannot offer refunds as the digital content cannot be returned.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. 30-Day Satisfaction Guarantee</h2>
              <p>
                We stand behind the quality of our products. If you are not completely satisfied with your purchase, we offer a 30-day satisfaction guarantee under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must contact us within 30 days of purchase</li>
                <li>You must provide a detailed explanation of the issue</li>
                <li>You must demonstrate that you have attempted to use the products</li>
                <li>Technical issues must be reported and we must be unable to resolve them</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Eligible Refund Scenarios</h2>
              <p>
                Refunds may be considered in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical issues preventing download or use of the products</li>
                <li>Products significantly different from what was described</li>
                <li>Duplicate purchases made in error</li>
                <li>Unauthorized charges or fraudulent transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Non-Refundable Situations</h2>
              <p>
                Refunds will NOT be provided in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Change of mind after successful download</li>
                <li>Lack of technical skills to use the products</li>
                <li>Incompatibility with older software versions</li>
                <li>Failure to read product descriptions or system requirements</li>
                <li>Requests made after the 30-day guarantee period</li>
                <li>Products that have been shared or redistributed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. How to Request a Refund</h2>
              <p>
                To request a refund under our satisfaction guarantee:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact us at refunds@vidsreels.com within 30 days of purchase</li>
                <li>Include your order number and purchase email address</li>
                <li>Provide a detailed explanation of the issue</li>
                <li>Include screenshots or documentation if applicable</li>
                <li>Allow us 48-72 hours to investigate and respond</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Refund Processing</h2>
              <p>
                If your refund request is approved:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds will be processed to the original payment method</li>
                <li>Processing time: 5-10 business days for credit cards</li>
                <li>You will receive email confirmation when the refund is processed</li>
                <li>Access to download links will be revoked</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Partial Refunds</h2>
              <p>
                In some cases, we may offer partial refunds or store credit as an alternative solution. This will be determined on a case-by-case basis depending on the circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Chargebacks and Disputes</h2>
              <p>
                Before initiating a chargeback with your bank or credit card company, please contact us directly. Chargebacks can result in additional fees and may affect your ability to make future purchases. We are committed to resolving any issues fairly and promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Technical Support</h2>
              <p>
                Before requesting a refund for technical issues, please take advantage of our free technical support:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email support with detailed troubleshooting guides</li>
                <li>Video tutorials and documentation</li>
                <li>Compatibility assistance for different software versions</li>
                <li>Installation and setup guidance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Policy Updates</h2>
              <p>
                We reserve the right to update this refund policy at any time. Changes will be effective immediately upon posting. Your purchase constitutes acceptance of the refund policy in effect at the time of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
              <p>
                For refund requests or questions about this policy:
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  Support: support@vidsreels.com
                </p>
              </div>
              <p className="mt-4">
                We typically respond to all refund requests within 24-48 hours during business days.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 