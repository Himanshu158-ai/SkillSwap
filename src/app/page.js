import Link from "next/link";

const stats = [
  { num: "5K+", label: "Active learners" },
  { num: "120+", label: "Skills available" },
  { num: "98%", label: "Successful matches" },
];

const steps = [
  { num: "01", title: "Create profile", desc: "Add your skills, interests, and learning goals. Let others know what you can teach." },
  { num: "02", title: "Connect", desc: "Discover people with matching interests and send learning requests." },
  { num: "03", title: "Grow together", desc: "Share knowledge, build relationships and learn faster together." },
];

const skillTags = ["React", "UI Design", "Node.js", "Python", "Figma"];

const footerLinks = [
  { title: "Product", links: ["Features", "Discover", "Community"] },
  { title: "Resources", links: ["Help center", "Privacy", "Terms"] },
  { title: "Company", links: ["About", "Contact", "Careers"] },
];

const perks = ["Free to join", "Secure connections", "Skill-based matching"];

const featureCards = [
  {
    wide: true,
    title: "Smart skill matching",
    desc: "Discover users based on skills they teach and skills they want to learn.",
    tags: true,
    accent: false,
  },
  {
    wide: false,
    title: "Privacy first",
    desc: "Contact info stays protected until both users mutually connect.",
    tags: false,
    accent: false,
  },
  {
    wide: false,
    title: "Secure requests",
    desc: "No spam. Every interaction starts with mutual approval from both sides.",
    tags: false,
    accent: false,
  },
  {
    wide: true,
    title: "Learn & teach together",
    desc: "Build meaningful relationships while sharing knowledge with people worldwide.",
    tags: false,
    accent: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1B1612] text-[#F6F3EE]" style={{ fontFamily: "'Geist', 'Inter', 'Manrope', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#1B1612]/80 backdrop-blur-2xl border-b border-white/[0.06] px-5 sm:px-10 h-[64px] flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="text-[15px] font-semibold text-[#F6F3EE] tracking-tight leading-none">SkillSwap</div>
          <div className="text-[9px] text-[#7F776E] mt-[3px] tracking-[0.5px]">Learn · Teach · Grow</div>
        </div>

        {/* Nav links — desktop only */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Community"].map((item, i) => (
            <a
              key={item}
              href={["#features", "#how", "#community"][i]}
              className="text-[13px] text-[#9D9489] hover:text-[#F6F3EE] transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/login"
            className="text-[12px] sm:text-[13px] px-4 sm:px-5 py-[7px] rounded-xl border border-white/[0.10] text-[#C9C1B7] hover:border-white/[0.18] hover:text-[#F6F3EE] transition-all duration-200"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-[12px] sm:text-[13px] font-semibold px-4 sm:px-5 py-[7px] rounded-xl bg-[#B68D5A] hover:bg-[#D6B37A] text-[#1B1612] transition-all duration-200 shadow-[0_2px_12px_rgba(182,141,90,0.25)]"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-5 sm:px-10 pt-16 sm:pt-24 lg:pt-[110px] pb-14 sm:pb-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#B68D5A]/10 border border-[#B68D5A]/20 text-[#D6B37A] text-[11px] px-4 py-[6px] rounded-full mb-8 tracking-[0.2px]">
          <span className="w-[5px] h-[5px] bg-[#B68D5A] rounded-full flex-shrink-0" />
          Join thousands of learners worldwide
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(34px,7vw,66px)] font-bold leading-[1.05] tracking-[-2px] text-[#F6F3EE] mb-6">
          Learn new skills.<br />
          Share what <span className="text-[#B68D5A]">you know.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[clamp(14px,2vw,17px)] text-[#9D9489] max-w-[480px] mx-auto mb-10 leading-[1.75]">
          SkillSwap connects learners and mentors through skill exchange. Teach what you're great at, learn from people who've mastered what you want.
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <Link
            href="/register"
            className="text-[13px] sm:text-[14px] font-semibold px-7 py-[12px] rounded-xl bg-[#B68D5A] hover:bg-[#D6B37A] text-[#1B1612] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98] shadow-[0_2px_12px_rgba(182,141,90,0.25)]"
          >
            Start learning
          </Link>
          <Link
            href="/discover"
            className="text-[13px] sm:text-[14px] font-medium px-7 py-[12px] rounded-xl border border-white/[0.10] text-[#C9C1B7] hover:border-white/[0.18] hover:text-[#F6F3EE] hover:bg-white/[0.03] transition-all duration-200"
          >
            Explore community
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px mt-12 sm:mt-20 bg-white/[0.05] rounded-2xl overflow-hidden shadow-[0_1px_40px_rgba(0,0,0,0.4)]">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#241D18] px-3 py-6 sm:p-10 text-center group hover:bg-[#2D241D] transition-colors duration-200"
            >
              <div className="text-[clamp(22px,5vw,38px)] font-bold text-[#F6F3EE] tracking-[-1.5px]">{s.num}</div>
              <div className="text-[11px] sm:text-[12px] text-[#7F776E] mt-1.5 tracking-[0.3px]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="px-5 sm:px-10 py-14 sm:py-20 text-center">
        <div className="text-[10px] tracking-[2px] text-[#B68D5A] uppercase mb-3 font-semibold">How it works</div>
        <h2 className="text-[clamp(26px,5vw,40px)] font-bold text-[#F6F3EE] tracking-[-1.2px] mb-3">
          Exchange skills in<br />three simple steps
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#9D9489] max-w-[400px] mx-auto leading-[1.75]">
          Find people with complementary skills and start learning through meaningful connections.
        </p>

        {/* Steps grid */}
        <div
          className="grid gap-px mt-10 sm:mt-14 bg-white/[0.05] rounded-2xl overflow-hidden shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="bg-[#241D18] p-6 sm:p-9 text-left group hover:bg-[#2D241D] transition-colors duration-200 relative"
            >
              {/* Step number — subtle top-right position */}
              <div className="text-[10px] text-[#6B655F] font-medium tracking-[1.5px] mb-6 sm:mb-10">{step.num}</div>
              {/* Thin accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#B68D5A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#F6F3EE] mb-2.5">{step.title}</h3>
              <p className="text-[13px] text-[#9D9489] leading-[1.7]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-5 sm:px-10 py-14 sm:py-20 text-center">
        <div className="text-[10px] tracking-[2px] text-[#B68D5A] uppercase mb-3 font-semibold">Features</div>
        <h2 className="text-[clamp(26px,5vw,40px)] font-bold text-[#F6F3EE] tracking-[-1.2px]">
          Everything you need<br />to learn better
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mt-10 sm:mt-14 bg-white/[0.05] rounded-2xl overflow-hidden shadow-[0_1px_40px_rgba(0,0,0,0.4)]">

          {/* Wide — smart skill matching */}
          <div className="sm:col-span-2 bg-[#241D18] p-6 sm:p-9 text-left group hover:bg-[#2D241D] transition-colors duration-200">
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#F6F3EE] mb-2">Smart skill matching</h3>
            <p className="text-[13px] text-[#9D9489] leading-[1.7] max-w-[520px]">Discover users based on skills they teach and skills they want to learn.</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#B68D5A]/10 border border-[#B68D5A]/20 text-[#D6B37A] tracking-[0.2px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#241D18] p-6 sm:p-9 text-left group hover:bg-[#2D241D] transition-colors duration-200">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#F6F3EE] mb-2">Privacy first</h3>
            <p className="text-[13px] text-[#9D9489] leading-[1.7]">Contact info stays protected until both users mutually connect.</p>
          </div>

          <div className="bg-[#241D18] p-6 sm:p-9 text-left group hover:bg-[#2D241D] transition-colors duration-200">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#F6F3EE] mb-2">Secure requests</h3>
            <p className="text-[13px] text-[#9D9489] leading-[1.7]">No spam. Every interaction starts with mutual approval from both sides.</p>
          </div>

          {/* Accent wide — warm brown tone instead of blue */}
          <div className="sm:col-span-2 bg-[#2D241D] border-t border-[#B68D5A]/10 p-6 sm:p-9 text-left">
            <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#D6B37A] mb-2">Learn & teach together</h3>
            <p className="text-[13px] text-[#9D9489] leading-[1.7]">Build meaningful relationships while sharing knowledge with people worldwide.</p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-5 sm:px-10 pb-10 sm:pb-14">
        <div className="rounded-2xl bg-[#241D18] border border-[#B68D5A]/15 px-6 sm:px-12 py-12 sm:py-18 text-center shadow-[0_8px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Subtle warm glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(182,141,90,0.06),transparent_70%)] pointer-events-none" />

          <h2 className="text-[clamp(26px,5vw,40px)] font-bold text-[#F6F3EE] tracking-[-1.2px] mb-3 relative">
            Ready to start<br />your skill journey?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#9D9489] max-w-[380px] mx-auto mb-8 leading-[1.75] relative">
            Join thousands of learners and mentors building meaningful connections through skill exchange.
          </p>
          <Link
            href="/register"
            className="relative inline-block text-[13px] sm:text-[14px] font-semibold px-8 py-[12px] rounded-xl bg-[#B68D5A] hover:bg-[#D6B37A] text-[#1B1612] transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.98] shadow-[0_2px_12px_rgba(182,141,90,0.25)]"
          >
            Create free account
          </Link>
          <div className="flex justify-center flex-wrap gap-5 sm:gap-10 mt-6 relative">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[#7F776E]">
                <span className="w-[5px] h-[5px] bg-[#B68D5A] rounded-full flex-shrink-0 opacity-80" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] px-5 sm:px-10 pt-12 pb-7 mt-2">
        <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-7 sm:gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[15px] font-semibold text-[#F6F3EE]">SkillSwap</div>
            <p className="text-[13px] text-[#7F776E] mt-3.5 leading-[1.7] max-w-[240px]">
              Learn faster by teaching others and connecting with people who share your passion.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold text-[#9D9489] mb-4 tracking-[0.5px] uppercase">{col.title}</h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[13px] text-[#6B655F] hover:text-[#C9C1B7] mb-2.5 transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}

        </div>

        <div className="border-t border-white/[0.05] pt-6 text-[11px] text-[#6B655F] text-center tracking-[0.3px]">
          © 2026 SkillSwap. All rights reserved.
        </div>
      </footer>

    </div>
  );
}