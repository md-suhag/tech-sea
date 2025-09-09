const tagline = "Explore Tech blog";
const menuItems = [
  {
    title: "Product",
    links: [
      { text: "Overview", url: "#" },
      { text: "Pricing", url: "#" },
      { text: "Features", url: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", url: "/about" },
      { text: "Contact", url: "/contact" },
      { text: "Privacy", url: "#" },
    ],
  },

  {
    title: "Social",
    links: [
      { text: "Twitter", url: "#" },
      { text: "Instagram", url: "#" },
      { text: "LinkedIn", url: "#" },
    ],
  },
];
const copyright = "© 2025 Tech Sea. All rights reserved.";
const bottomLinks = [
  { text: "Terms and Conditions", url: "#" },
  { text: "Privacy Policy", url: "#" },
];

import Link from "next/link";
export default function Footer() {
  return (
    <section className="py-5 ">
      <div className="container mx-auto px-4 ">
        <footer>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start text-xl font-bold">
                <Link href="/">
                  Tech <span className="text-primary">Sea</span>
                </Link>
              </div>
              <p className="mt-2 text-accent-foreground ">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-5 flex flex-col justify-between gap-4 border-t pt-5 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
}
