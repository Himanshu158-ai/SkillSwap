import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "var(--font-sans, sans-serif)", background: "#0D0D0D", color: "#E8E6E1", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(13,13,13,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        padding: "0 2rem", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 500, color: "#fff", letterSpacing: "-0.3px" }}>SkillSwap</div>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "1px" }}>Learn · Teach · Grow</div>
        </div>

        <div style={{ display: "flex", gap: "2rem" }} className="hidden md:flex">
          <a href="#features" style={{ fontSize: "13px", color: "#999", textDecoration: "none" }}>Features</a>
          <a href="#how" style={{ fontSize: "13px", color: "#999", textDecoration: "none" }}>How it works</a>
          <a href="#community" style={{ fontSize: "13px", color: "#999", textDecoration: "none" }}>Community</a>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/login" style={{
            fontSize: "13px", padding: "7px 18px", borderRadius: "8px",
            border: "0.5px solid rgba(255,255,255,0.12)", color: "#ccc",
            background: "transparent", textDecoration: "none",
          }}>
            Login
          </Link>
          <Link href="/register" style={{
            fontSize: "13px", padding: "7px 18px", borderRadius: "8px",
            background: "#5465FF", color: "#fff", textDecoration: "none",
          }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 2rem 80px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(84,101,255,0.1)", border: "0.5px solid rgba(84,101,255,0.25)",
          color: "#8B97FF", fontSize: "12px", padding: "6px 16px", borderRadius: "100px", marginBottom: "2rem",
        }}>
          <span style={{ width: "6px", height: "6px", background: "#5465FF", borderRadius: "50%", display: "inline-block" }} />
          Join thousands of learners worldwide
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 7vw, 62px)", fontWeight: 500, lineHeight: 1.07,
          letterSpacing: "-2px", color: "#fff", marginBottom: "1.5rem",
        }}>
          Learn new skills.<br />
          Share what <span style={{ color: "#5465FF" }}>you know.</span>
        </h1>

        <p style={{ fontSize: "17px", color: "#777", maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          SkillSwap connects learners and mentors through skill exchange. Teach what you're great at, learn from people who've mastered what you want.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/register" style={{
            fontSize: "14px", fontWeight: 500, padding: "12px 28px", borderRadius: "10px",
            background: "#5465FF", color: "#fff", textDecoration: "none",
          }}>
            Start learning
          </Link>
          <Link href="/discover" style={{
            fontSize: "14px", fontWeight: 500, padding: "12px 28px", borderRadius: "10px",
            background: "transparent", color: "#ccc",
            border: "0.5px solid rgba(255,255,255,0.12)", textDecoration: "none",
          }}>
            Explore community
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px", marginTop: "5rem",
          background: "rgba(255,255,255,0.06)", borderRadius: "14px", overflow: "hidden",
        }}>
          {[
            { num: "5K+", label: "Active learners" },
            { num: "120+", label: "Skills available" },
            { num: "98%", label: "Successful matches" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#141414", padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 500, color: "#fff", letterSpacing: "-1.5px" }}>{s.num}</div>
              <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" style={{ padding: "80px 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#5465FF", textTransform: "uppercase", marginBottom: "1rem" }}>
          How it works
        </div>
        <h2 style={{ fontSize: "38px", fontWeight: 500, color: "#fff", letterSpacing: "-1px", marginBottom: "1rem" }}>
          Exchange skills in<br />three simple steps
        </h2>
        <p style={{ fontSize: "15px", color: "#666", maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
          Find people with complementary skills and start learning through meaningful connections.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px", marginTop: "3.5rem",
          background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden",
        }}>
          {[
            { num: "01", title: "Create profile", desc: "Add your skills, interests, and learning goals. Let others know what you can teach." },
            { num: "02", title: "Connect", desc: "Discover people with matching interests and send learning requests." },
            { num: "03", title: "Grow together", desc: "Share knowledge, build relationships and learn faster together." },
          ].map((step) => (
            <div key={step.num} style={{ background: "#111", padding: "2rem", textAlign: "left" }}>
              <div style={{ fontSize: "11px", color: "#444", fontWeight: 500, letterSpacing: "1px", marginBottom: "2rem" }}>{step.num}</div>
              <h3 style={{ fontSize: "17px", fontWeight: 500, color: "#fff", marginBottom: "0.6rem" }}>{step.title}</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "80px 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#5465FF", textTransform: "uppercase", marginBottom: "1rem" }}>
          Features
        </div>
        <h2 style={{ fontSize: "38px", fontWeight: 500, color: "#fff", letterSpacing: "-1px" }}>
          Everything you need<br />to learn better
        </h2>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "1px", marginTop: "3.5rem",
          background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden",
        }}>
          {/* Wide card */}
          <div style={{ gridColumn: "span 2", background: "#111", padding: "2rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 500, color: "#fff", marginBottom: "0.6rem" }}>Smart skill matching</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>Discover users based on skills they teach and skills they want to learn.</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "1.2rem" }}>
              {["React", "UI Design", "Node.js", "Python", "Figma"].map((tag) => (
                <span key={tag} style={{
                  fontSize: "11px", padding: "4px 12px", borderRadius: "100px",
                  background: "rgba(84,101,255,0.1)", color: "#8B97FF",
                  border: "0.5px solid rgba(84,101,255,0.2)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: "#111", padding: "2rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 500, color: "#fff", marginBottom: "0.6rem" }}>Privacy first</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>Contact info stays protected until both users mutually connect.</p>
          </div>

          <div style={{ background: "#111", padding: "2rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 500, color: "#fff", marginBottom: "0.6rem" }}>Secure requests</h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65 }}>No spam. Every interaction starts with mutual approval from both sides.</p>
          </div>

          {/* Accent wide card */}
          <div style={{ gridColumn: "span 2", background: "#0E1240", border: "none", padding: "2rem", textAlign: "left" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 500, color: "#A5B4FF", marginBottom: "0.6rem" }}>Learn & teach together</h3>
            <p style={{ fontSize: "13px", color: "#5465FF", lineHeight: 1.65 }}>Build meaningful relationships while sharing knowledge with people worldwide.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 2rem 2rem" }}>
        <div style={{
          borderRadius: "16px", background: "#0E1240",
          border: "0.5px solid rgba(84,101,255,0.2)",
          padding: "60px 2rem", textAlign: "center",
        }}>
          <h2 style={{ fontSize: "38px", fontWeight: 500, color: "#fff", letterSpacing: "-1px", marginBottom: "1rem" }}>
            Ready to start<br />your skill journey?
          </h2>
          <p style={{ fontSize: "15px", color: "#666", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Join thousands of learners and mentors building meaningful connections through skill exchange.
          </p>
          <Link href="/register" style={{
            display: "inline-block", fontSize: "14px", fontWeight: 500,
            padding: "12px 28px", borderRadius: "10px",
            background: "#5465FF", color: "#fff", textDecoration: "none",
          }}>
            Create free account
          </Link>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1.5rem" }}>
            {["Free to join", "Secure connections", "Skill-based matching"].map((perk) => (
              <div key={perk} style={{ fontSize: "12px", color: "#555", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", background: "#5465FF", borderRadius: "50%", display: "inline-block" }} />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", padding: "3rem 2rem", marginTop: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 500, color: "#fff" }}>SkillSwap</div>
            <p style={{ fontSize: "13px", color: "#555", marginTop: "0.8rem", lineHeight: 1.65 }}>
              Learn faster by teaching others and connecting with people who share your passion.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Discover", "Community"] },
            { title: "Resources", links: ["Help center", "Privacy", "Terms"] },
            { title: "Company", links: ["About", "Contact", "Careers"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: "13px", fontWeight: 500, color: "#888", marginBottom: "1rem" }}>{col.title}</h4>
              {col.links.map((link) => (
                <a key={link} href="#" style={{ display: "block", fontSize: "13px", color: "#555", textDecoration: "none", marginBottom: "0.6rem" }}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", fontSize: "12px", color: "#444", textAlign: "center" }}>
          © 2026 SkillSwap. All rights reserved.
        </div>
      </footer>

    </div>
  );
}