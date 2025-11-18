import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amanLinen text-amanCharcoal mt-24 py-16 border-t border-amanCharcoal/15">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-wide opacity-70">THAIBK</h4>
          <p className="text-sm opacity-70 leading-relaxed">
            Live · Learn · Belong — A guide to making Thailand your real home.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide mb-4 opacity-70">Explore</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/lifestyle">Lifestyle</Link></li>
            <li><Link href="/learn">Learning</Link></li>
            <li><Link href="/belong">Community</Link></li>
            <li><Link href="/relocation">Relocation Guide</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide mb-4 opacity-70">Support</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/visas">Visa Guidance</Link></li>
            <li><Link href="/healthcare">Healthcare</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide mb-4 opacity-70">Social</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" target="_blank">Instagram</a></li>
            <li><a href="#" target="_blank">YouTube</a></li>
            <li><a href="#" target="_blank">Facebook</a></li>
            <li><a href="#" target="_blank">TikTok</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs opacity-60 mt-14">
        © {new Date().getFullYear()} THAIBK · All Rights Reserved
      </div>
    </footer>
  );
}
