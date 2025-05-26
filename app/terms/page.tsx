import React from 'react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-secondary/20 border border-border rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website and purchasing our video editing bundle, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Product Description</h2>
              <p>
                Our video editing bundle includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>70+ Professional Cinematic LUTs</li>
                <li>1000+ Minimalist Animations</li>
                <li>Video editing presets and templates</li>
                <li>Digital assets for content creation</li>
              </ul>
              <p>
                All products are delivered digitally upon successful payment completion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. License and Usage Rights</h2>
              <p>
                Upon purchase, you receive a non-exclusive, non-transferable license to use the digital assets for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal and commercial video projects</li>
                <li>Social media content creation</li>
                <li>Client work and freelance projects</li>
                <li>YouTube, TikTok, Instagram, and other platform content</li>
              </ul>
              <p className="font-semibold text-foreground">
                You may NOT:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resell, redistribute, or share the assets</li>
                <li>Claim ownership of the original assets</li>
                <li>Use assets in competing products or services</li>
                <li>Share login credentials or download links</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment and Pricing</h2>
              <p>
                All prices are listed in USD and are subject to change without notice. Payment is processed securely through our payment providers. By completing a purchase, you authorize us to charge your payment method for the total amount.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Digital Delivery</h2>
              <p>
                Digital products are delivered immediately after successful payment via email download links. It is your responsibility to download and save the files. Download links may expire after a certain period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p>
                All content, including but not limited to LUTs, animations, presets, and templates, are protected by copyright and other intellectual property laws. We retain all rights, title, and interest in our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-semibold text-foreground">
                Email: support@vidsreels.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 