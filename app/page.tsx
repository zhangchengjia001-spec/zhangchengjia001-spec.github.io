import { MotionController } from "./MotionController";

const models = [
  { name: "AURA 9", type: "智能旗舰轿跑", range: "720 km", image: "/em06-model-transparent.png" },
  { name: "AURA 7", type: "全场景智能 SUV", range: "680 km", image: "/em06-side.jpg" },
  { name: "AURA 5", type: "都市纯电新成员", range: "610 km", image: "/em06-rear.jpg" },
];

export default function Home() {
  return (
    <main>
      <MotionController />
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="AURA 首页">
          <img src="/ezi-logo-white.png" alt="EZI" />
        </a>
        <nav aria-label="主导航">
          <a href="#models">车型</a>
          <a href="#technology">科技</a>
          <a href="#service">服务</a>
          <a href="#community">社区</a>
          <a href="#about">关于我们</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-cta" href="#contact"><span className="download-icon" aria-hidden="true" />下载 App</a>
        </div>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/aura-car.png"
          aria-hidden="true"
        >
          <source src="/em05-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-copy">
          <p className="eyebrow">BORN FOR THE NEXT JOURNEY</p>
          <h1>新境，由你抵达</h1>
          <p>全新智能纯电出行体验</p>
        </div>
        <div className="hero-actions">
          <a className="button button-line" href="#models">探索车型</a>
          <a className="button button-line" href="#contact">立即预约</a>
        </div>
        <a className="scroll-cue" href="#models" aria-label="浏览车型">
          <span>SCROLL</span><i />
        </a>
      </section>

      <section className="model-section" id="models">
        <div className="section-heading">
          <div><p className="kicker">OUR MODELS</p><h2>探索 AURA 全系车型</h2></div>
          <p>以智能、设计与性能，重新定义每一次出发。</p>
        </div>
        <div className="model-grid">
          {models.map((model, index) => (
            <article className={`model-card model-${index + 1}`} key={model.name}>
              <div className="model-info">
                <span>0{index + 1}</span>
                <h3>{model.name}</h3>
                <p>{model.type}</p>
              </div>
              <img src={model.image} alt={`${model.name} 车型`} />
              <div className="model-meta"><span>CLTC 续航</span><strong>{model.range}</strong><a href="#contact">了解更多 ↗</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="tech-copy">
          <p className="kicker">INTELLIGENCE, REIMAGINED</p>
          <h2>科技，让驾驶更有温度</h2>
          <p>从感知到决策，从座舱到补能。AURA 智能系统持续学习，让每一次同行都更懂你。</p>
          <a className="text-link" href="#contact">探索智能科技 <span>→</span></a>
        </div>
        <div className="tech-orbit" aria-hidden="true"><span className="orbit-one"/><span className="orbit-two"/><b>A</b></div>
      </section>

      <section className="service" id="service">
        <div className="service-visual"><img src="/aura-car.png" alt="全天候出行服务" /></div>
        <div className="service-copy">
          <p className="kicker">BEYOND THE DRIVE</p>
          <h2>从拥有一辆车，<br/>到拥有一种生活</h2>
          <p>便捷补能、专属服务与活力社区，让愉悦体验延伸至旅程之外。</p>
          <div className="service-links"><a href="#contact">补能服务 ↗</a><a href="#community">用户社区 ↗</a></div>
        </div>
      </section>

      <section className="community" id="community">
        <p className="kicker">A COMMUNITY THAT INSPIRES</p>
        <h2>一起，创造更好的日常</h2>
        <p>连接有趣的人，分享真实的故事，在每一次相遇中发现新的可能。</p>
        <a className="button button-dark" href="#contact">加入 AURA 社区</a>
      </section>

      <section className="contact" id="contact">
        <div><p className="kicker">START YOUR JOURNEY</p><h2>准备好，开启下一程</h2></div>
        <div className="contact-actions"><a className="button button-light" href="mailto:hello@example.com">预约试驾</a><a className="button button-line" href="mailto:hello@example.com">联系我们</a></div>
      </section>

      <footer id="about">
        <div className="footer-brand"><img className="footer-logo" src="/ezi-logo-white.png" alt="EZI" /><p>为更好的未来而来</p></div>
        <div className="footer-cols"><div><b>探索</b><a href="#models">全部车型</a><a href="#technology">智能科技</a><a href="#service">服务体验</a></div><div><b>关于</b><a href="#about">品牌故事</a><a href="#community">用户社区</a><a href="#contact">联系我们</a></div><div><b>关注我们</b><a href="#contact">微信</a><a href="#contact">微博</a><a href="#contact">视频号</a></div></div>
        <div className="footer-bottom"><span>© 2026 AURA. Prototype website.</span><span>隐私政策　法律声明</span></div>
      </footer>
    </main>
  );
}
