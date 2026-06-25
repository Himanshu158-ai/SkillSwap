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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E6E1]">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-8 h-[60px] flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="text-[16px] font-medium text-white tracking-tight leading-none">SkillSwap</div>
          <div className="text-[10px] text-[#666] mt-[2px]">Learn · Teach · Grow</div>
        </div>

        {/* Nav links — desktop only */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-[#999] hover:text-white transition-colors duration-150">Features</a>
          <a href="#how" className="text-[13px] text-[#999] hover:text-white transition-colors duration-150">How it works</a>
          <a href="#community" className="text-[13px] text-[#999] hover:text-white transition-colors duration-150">Community</a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/login"
            className="text-[12px] sm:text-[13px] px-3 sm:px-[18px] py-[7px] rounded-[8px] border border-white/[0.12] text-[#ccc] hover:border-white/20 hover:text-white transition-colors duration-150"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-[12px] sm:text-[13px] px-3 sm:px-[18px] py-[7px] rounded-[8px] bg-[#5465FF] hover:bg-[#4354ee] text-white transition-colors duration-150"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-4 sm:px-8 pt-14 sm:pt-20 lg:pt-[100px] pb-12 sm:pb-16 lg:pb-20 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#5465FF]/10 border border-[#5465FF]/25 text-[#8B97FF] text-[11px] px-4 py-[5px] rounded-full mb-6 sm:mb-8">
          <span className="w-[5px] h-[5px] bg-[#5465FF] rounded-full flex-shrink-0" />
          Join thousands of learners worldwide
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(32px,7vw,62px)] font-medium leading-[1.07] tracking-[-1.5px] text-white mb-5 sm:mb-6">
          Learn new skills.<br />
          Share what <span className="text-[#5465FF]">you know.</span>
        </h1>

        {/* Subtext */}
        <p className="text-[clamp(14px,2vw,17px)] text-[#777] max-w-[500px] mx-auto mb-8 sm:mb-10 leading-[1.7]">
          SkillSwap connects learners and mentors through skill exchange. Teach what you're great at, learn from people who've mastered what you want.
        </p>

        {/* CTA buttons */}
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <Link
            href="/register"
            className="text-[13px] sm:text-[14px] font-medium px-6 py-[11px] rounded-[10px] bg-[#5465FF] hover:bg-[#4354ee] text-white transition-colors duration-150"
          >
            Start learning
          </Link>
          <Link
            href="/discover"
            className="text-[13px] sm:text-[14px] font-medium px-6 py-[11px] rounded-[10px] border border-white/[0.12] text-[#ccc] hover:border-white/20 hover:text-white transition-colors duration-150"
          >
            Explore community
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px mt-10 sm:mt-16 lg:mt-20 bg-white/[0.06] rounded-[14px] overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#141414] px-3 py-5 sm:p-8 text-center">
              <div className="text-[clamp(22px,5vw,36px)] font-medium text-white tracking-[-1.5px]">{s.num}</div>
              <div className="text-[11px] sm:text-[13px] text-[#555] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="px-4 sm:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="text-[10px] tracking-[1.5px] text-[#5465FF] uppercase mb-3">How it works</div>
        <h2 className="text-[clamp(24px,5vw,38px)] font-medium text-white tracking-[-1px] mb-3">
          Exchange skills in<br />three simple steps
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#666] max-w-[400px] mx-auto leading-[1.7]">
          Find people with complementary skills and start learning through meaningful connections.
        </p>

        {/* Steps grid — stacks on mobile */}
        <div
          className="grid gap-px mt-8 sm:mt-12 lg:mt-14 bg-white/[0.06] rounded-[16px] overflow-hidden"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}
        >
          {steps.map((step) => (
            <div key={step.num} className="bg-[#111] p-5 sm:p-8 text-left">
              <div className="text-[10px] text-[#444] font-medium tracking-[1px] mb-5 sm:mb-8">{step.num}</div>
              <h3 className="text-[16px] sm:text-[17px] font-medium text-white mb-2">{step.title}</h3>
              <p className="text-[13px] text-[#666] leading-[1.65]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-4 sm:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="text-[10px] tracking-[1.5px] text-[#5465FF] uppercase mb-3">Features</div>
        <h2 className="text-[clamp(24px,5vw,38px)] font-medium text-white tracking-[-1px]">
          Everything you need<br />to learn better
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mt-8 sm:mt-12 lg:mt-14 bg-white/[0.06] rounded-[16px] overflow-hidden">

          {/* Wide — skill matching */}
          <div className="sm:col-span-2 bg-[#111] p-5 sm:p-8 text-left">
            <h3 className="text-[16px] sm:text-[17px] font-medium text-white mb-2">Smart skill matching</h3>
            <p className="text-[13px] text-[#666] leading-[1.65]">Discover users based on skills they teach and skills they want to learn.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1 rounded-full bg-[#5465FF]/10 border border-[#5465FF]/20 text-[#8B97FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#111] p-5 sm:p-8 text-left">
            <h3 className="text-[16px] sm:text-[17px] font-medium text-white mb-2">Privacy first</h3>
            <p className="text-[13px] text-[#666] leading-[1.65]">Contact info stays protected until both users mutually connect.</p>
          </div>

          <div className="bg-[#111] p-5 sm:p-8 text-left">
            <h3 className="text-[16px] sm:text-[17px] font-medium text-white mb-2">Secure requests</h3>
            <p className="text-[13px] text-[#666] leading-[1.65]">No spam. Every interaction starts with mutual approval from both sides.</p>
          </div>

          {/* Accent wide */}
          <div className="sm:col-span-2 bg-[#0E1240] p-5 sm:p-8 text-left">
            <h3 className="text-[16px] sm:text-[17px] font-medium text-[#A5B4FF] mb-2">Learn & teach together</h3>
            <p className="text-[13px] text-[#5465FF] leading-[1.65]">Build meaningful relationships while sharing knowledge with people worldwide.</p>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-8 pb-8 sm:pb-12">
        <div className="rounded-[16px] bg-[#0E1240] border border-[#5465FF]/20 px-4 sm:px-8 py-10 sm:py-16 text-center">
          <h2 className="text-[clamp(24px,5vw,38px)] font-medium text-white tracking-[-1px] mb-3">
            Ready to start<br />your skill journey?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#666] max-w-[380px] mx-auto mb-7 leading-[1.7]">
            Join thousands of learners and mentors building meaningful connections through skill exchange.
          </p>
          <Link
            href="/register"
            className="inline-block text-[13px] sm:text-[14px] font-medium px-7 py-[11px] rounded-[10px] bg-[#5465FF] hover:bg-[#4354ee] text-white transition-colors duration-150"
          >
            Create free account
          </Link>
          <div className="flex justify-center flex-wrap gap-4 sm:gap-8 mt-5">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-[6px] text-[11px] sm:text-[12px] text-[#555]">
                <span className="w-[5px] h-[5px] bg-[#5465FF] rounded-full flex-shrink-0" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.07] px-4 sm:px-8 pt-10 sm:pt-12 pb-6 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-6 sm:gap-8 mb-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 sm:col-span-1">
            <div className="text-[16px] font-medium text-white">SkillSwap</div>
            <p className="text-[13px] text-[#555] mt-3 leading-[1.65] max-w-[260px]">
              Learn faster by teaching others and connecting with people who share your passion.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-medium text-[#888] mb-3">{col.title}</h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[13px] text-[#555] hover:text-[#999] mb-2 transition-colors duration-150"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}

        </div>

        <div className="border-t border-white/[0.06] pt-5 text-[11px] text-[#444] text-center">
          © 2026 SkillSwap. All rights reserved.
        </div>
      </footer>

    </div>
  );
}