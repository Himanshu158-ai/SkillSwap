import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FCFF] text-slate-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#BFD7FF]/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-bold text-xl">
                SkillSwap
              </h1>

              <p className="text-xs text-slate-500">
                Learn • Teach • Grow
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-[#5465FF] transition">
              Features
            </a>

            <a href="#how" className="hover:text-[#5465FF] transition">
              How It Works
            </a>

            <a href="#community" className="hover:text-[#5465FF] transition">
              Community
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-[#5465FF]/20 hover:bg-white transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-[#5465FF] text-white hover:bg-[#4354ee] shadow-lg shadow-[#5465FF]/20 transition"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#5465FF]/10 rounded-full blur-[120px]" />

        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#9BB1FF]/30 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">

          <div className="text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-[#BFD7FF] px-5 py-2 text-sm text-[#5465FF] shadow-sm">

              <span className="h-2 w-2 rounded-full bg-[#5465FF]" />

              Join thousands of learners worldwide

            </span>

            <h1 className="mt-8 text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight">

              Learn New Skills.
              <br />

              Share What
              <span className="text-[#5465FF]">
                {" "}You Know.
              </span>

            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-xl text-slate-600 leading-relaxed">

              SkillSwap helps learners and mentors connect through
              skill exchange. Teach what you're great at and learn
              from people who already master the skills you want.

            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-12">

              <Link
                href="/register"
                className="bg-[#5465FF] hover:bg-[#4354ee] text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-[#5465FF]/20 transition-all hover:-translate-y-1"
              >
                Start Learning
              </Link>

              <Link
                href="/discover"
                className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-semibold hover:border-[#5465FF]/30 transition-all"
              >
                Explore Community
              </Link>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-24">

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">

              <h3 className="text-4xl font-bold text-[#5465FF]">
                5K+
              </h3>

              <p className="mt-2 text-slate-500">
                Active Learners
              </p>

            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">

              <h3 className="text-4xl font-bold text-[#5465FF]">
                120+
              </h3>

              <p className="mt-2 text-slate-500">
                Skills Available
              </p>

            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">

              <h3 className="text-4xl font-bold text-[#5465FF]">
                98%
              </h3>

              <p className="mt-2 text-slate-500">
                Successful Matches
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* How It Works */}
      <section
        id="how"
        className="max-w-7xl mx-auto px-6 py-28"
      >
        <div className="text-center">

          <span className="text-[#5465FF] font-semibold">
            HOW IT WORKS
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Exchange Skills In
            <br />
            Three Simple Steps
          </h2>

          <p className="text-slate-500 mt-5 max-w-2xl mx-auto">
            Find people with complementary skills and start
            learning through meaningful connections.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="group bg-white rounded-[32px] p-8 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">

            <div className="h-14 w-14 rounded-2xl bg-[#5465FF]/10 flex items-center justify-center text-[#5465FF] font-bold text-lg">
              01
            </div>

            <h3 className="text-2xl font-bold mt-8">
              Create Profile
            </h3>

            <p className="text-slate-500 mt-4 leading-relaxed">
              Add your skills, interests and learning goals.
              Let others know what you can teach.
            </p>

          </div>

          <div className="group bg-white rounded-[32px] p-8 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">

            <div className="h-14 w-14 rounded-2xl bg-[#5465FF]/10 flex items-center justify-center text-[#5465FF] font-bold text-lg">
              02
            </div>

            <h3 className="text-2xl font-bold mt-8">
              Connect
            </h3>

            <p className="text-slate-500 mt-4 leading-relaxed">
              Discover people with matching interests and
              send learning requests.
            </p>

          </div>

          <div className="group bg-white rounded-[32px] p-8 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">

            <div className="h-14 w-14 rounded-2xl bg-[#5465FF]/10 flex items-center justify-center text-[#5465FF] font-bold text-lg">
              03
            </div>

            <h3 className="text-2xl font-bold mt-8">
              Grow Together
            </h3>

            <p className="text-slate-500 mt-4 leading-relaxed">
              Share knowledge, build relationships and
              learn faster together.
            </p>

          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="text-center">

          <span className="text-[#5465FF] font-semibold">
            FEATURES
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Everything You Need
            <br />
            To Learn Better
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="md:col-span-2 bg-white rounded-[32px] p-10 border border-slate-100 hover:shadow-[0_20px_50px_rgba(84,101,255,0.12)]">

            <h3 className="text-3xl font-bold">
              Smart Skill Matching
            </h3>

            <p className="text-slate-500 mt-4 max-w-xl">
              Discover users based on skills they teach and
              skills they want to learn.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">

              <span className="bg-[#E2FDFF] px-4 py-2 rounded-full text-sm">
                React
              </span>

              <span className="bg-[#E2FDFF] px-4 py-2 rounded-full text-sm">
                UI Design
              </span>

              <span className="bg-[#E2FDFF] px-4 py-2 rounded-full text-sm">
                Node.js
              </span>

            </div>

          </div>

          <div className="bg-white rounded-[32px] p-10 border border-slate-100 hover:shadow-[0_20px_50px_rgba(84,101,255,0.12)]">

            <h3 className="text-2xl font-bold">
              Privacy First
            </h3>

            <p className="text-slate-500 mt-4">
              Contact information stays protected until
              both users connect.
            </p>

          </div>

          <div className="bg-white rounded-[32px] p-10 border border-slate-100 hover:shadow-[0_20px_50px_rgba(84,101,255,0.12)]">

            <h3 className="text-2xl font-bold">
              Secure Requests
            </h3>

            <p className="text-slate-500 mt-4">
              No spam. Every interaction starts with
              mutual approval.
            </p>

          </div>

          <div className="md:col-span-2 bg-gradient-to-r from-[#5465FF] to-[#788BFF] rounded-[32px] p-10 text-white">

            <h3 className="text-3xl font-bold">
              Learn & Teach Together
            </h3>

            <p className="mt-4 text-white/80 max-w-xl">
              Build meaningful relationships while sharing
              knowledge with people worldwide.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="relative overflow-hidden rounded-[40px] bg-[#5465FF] p-14 md:p-20">

          <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-[100px]" />

          <div className="relative z-10 text-center">

            <h2 className="text-5xl font-bold text-white">
              Ready To Start
              <br />
              Your Skill Journey?
            </h2>

            <p className="text-white/80 mt-6 max-w-2xl mx-auto text-lg">
              Join thousands of learners and mentors building
              meaningful connections through skill exchange.
            </p>

            <Link
              href="/register"
              className="
        inline-flex
        items-center
        justify-center
        mt-10
        px-8
        py-4
        bg-white
        text-[#5465FF]
        rounded-2xl
        font-semibold
        hover:scale-105
        transition-all
        "
            >
              Create Free Account
            </Link>

          </div>

        </div>

      </section>
      <div className="flex justify-center gap-8 mt-10 text-sm text-slate-500">

        <span>✓ Free To Join</span>

        <span>✓ Secure Connections</span>

        <span>✓ Skill-Based Matching</span>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-4 gap-12">

            <div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-xl">
                  SkillSwap
                </span>

              </div>

              <p className="text-slate-500 mt-5">
                Learn faster by teaching others and connecting
                with people who share your passion.
              </p>

            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Product
              </h4>

              <div className="space-y-3 text-slate-500">
                <p>Features</p>
                <p>Discover</p>
                <p>Community</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Resources
              </h4>

              <div className="space-y-3 text-slate-500">
                <p>Help Center</p>
                <p>Privacy</p>
                <p>Terms</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Company
              </h4>

              <div className="space-y-3 text-slate-500">
                <p>About</p>
                <p>Contact</p>
                <p>Careers</p>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-200 mt-12 pt-8 text-center text-slate-500">
            © 2026 SkillSwap. All rights reserved.
          </div>

        </div>

      </footer>
    </div>
  );
}