'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { createScene } from './scene';
import { LINKS, PROJECTS } from './content';
import { instrument, jetbrains, syne } from './fonts';
import './space-hero.css';

function ContactLinks() {
  return (
    <>
      <a href={LINKS.gmail} target="_blank" rel="noopener noreferrer">{LINKS.email.replace('mailto:', '')}</a>
      <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
      <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
    </>
  );
}

export default function SpaceHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const dispose = createScene(root);
    if (!dispose) {
      root.classList.add('sh-nogl');
      return () => { root.classList.remove('sh-nogl'); };
    }
    return dispose;
  }, []);

  return (
    <div ref={rootRef} className={`space-hero ${syne.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <div className="track" id="track">
        <div className="stage" id="stage">
          <nav className="nav" aria-label="Primary">
            <button className="brand" type="button" data-go="home">MUSKAN</button>
            <ul>
              <li><button type="button" data-go="about">ABOUT</button></li>
              <li><button type="button" data-go="experience">EXPERIENCE</button></li>
              <li><button type="button" data-go="work">WORK</button></li>
              <li><button type="button" data-go="contact">CONTACT</button></li>
            </ul>
            <a className="resume-mini" href={LINKS.resume} target="_blank" rel="noopener">RESUME</a>
          </nav>

          <div className="copy" id="copy">
            <div className="eyebrow">SOFTWARE ENGINEER · THAPAR · 2026</div>
            <h1 className="wordmark">MUSKAN</h1>
            <p className="quote">I build software that <b>holds up under load</b>, from the interface to the infrastructure.</p>
            <div className="row">
              <span className="status"><i></i>OPEN TO SWE INTERNSHIPS</span>
              <a className="btn" href={LINKS.resume} target="_blank" rel="noopener">Resume</a>
            </div>
          </div>

          <div className="caption" id="caption" aria-live="polite">
            <div className="idx" id="capIdx"></div>
            <h2 id="capName"></h2>
            <p id="capDesc"></p>
            <p className="contact-closing" id="capClosing"></p>
            <div className="about-content" id="capAboutContent"></div>
            <div className="experience-content" id="capExperience"></div>
            <div className="contact-status status" id="capContactStatus"><i></i>OPEN TO SWE INTERNSHIPS</div>
            <div className="chips" id="chips"></div>
            <div className="tag" id="capTag"></div>
            <div className="links project-links" id="capProjectLinks"></div>
            <div className="ticks" id="ticks"></div>
            <a className="btn cta" id="capCta" href={LINKS.resume} target="_blank" rel="noopener">Resume</a>
            <div className="links" id="capLinks"><ContactLinks /></div>
          </div>

          <div className="dots" id="dots" aria-label="Destinations"></div>

          <div className="hud">
            <span>DISTANCE FROM HOME <b id="dist">0.0</b> LY</span>
            <span className="scroll">SCROLL TO TRAVEL <b>↓</b></span>
          </div>
        </div>
      </div>

      {/* Shown only when WebGL is unavailable (or JS is off). */}
      <div className="sh-fallback">
        <div className="sh-fb-inner">
          <div className="eyebrow">SOFTWARE ENGINEER · THAPAR · 2026</div>
          <h1 className="wordmark">MUSKAN</h1>
          <p className="quote">I build software that <b>holds up under load</b>, from the interface to the infrastructure.</p>
          <ul className="sh-fb-list">
            {PROJECTS.map((pj) => (
              <li key={pj.name}>
                <Image src={pj.img} alt={`${pj.name} landing page screenshot`} width={1400} height={788} sizes="(max-width: 900px) 100vw, 56rem" />
                <h2 style={{ color: pj.color }}>{pj.name}</h2>
                <p>{pj.desc}</p>
                <div className="chips">
                  {pj.metrics.map((m) => (
                    <span key={m} style={{ '--chip': pj.color + '66' } as CSSProperties}>{m}</span>
                  ))}
                </div>
                <div className="tag">{pj.tag}</div>
                <div className="links sh-fb-project-links project-links">
                  {pj.live ? <a href={pj.live} target="_blank" rel="noopener noreferrer">LIVE DEMO ↗</a> : null}
                  <a href={pj.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
                </div>
              </li>
            ))}
          </ul>
          <div className="sh-fb-end">
            <a className="btn" href={LINKS.resume} target="_blank" rel="noopener">Resume</a>
            <div className="links"><ContactLinks /></div>
          </div>
        </div>
      </div>

      <noscript>
        <style>{'.space-hero .track{display:none}.space-hero .sh-fallback{display:block}'}</style>
      </noscript>
    </div>
  );
}
