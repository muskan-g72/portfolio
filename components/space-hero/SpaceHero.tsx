'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { createScene } from './scene';
import { EXPERIENCE_SLIDES, LINKS, PROJECTS } from './content';
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
            <a
              className="github-mini"
              href={LINKS.repository}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub repository"
              title="View GitHub repository"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-1.026-.013-1.86-2.782.604-3.369-1.18-3.369-1.18-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.912.831.091-.646.349-1.087.635-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.092.39-1.985 1.029-2.685-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.756a9.56 9.56 0 0 1 2.504.337c1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.7 1.028 1.593 1.028 2.685 0 3.842-2.339 4.687-4.566 4.935.359.31.678.92.678 1.855 0 1.34-.012 2.421-.012 2.751 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>
            </a>
          </nav>

          <div className="copy" id="copy">
            <div className="eyebrow">SOFTWARE ENGINEER</div>
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
          <div className="eyebrow">SOFTWARE ENGINEER</div>
          <h1 className="wordmark">MUSKAN</h1>
          <p className="quote">I build software that <b>holds up under load</b>, from the interface to the infrastructure.</p>
          <section className="sh-fb-experience" aria-labelledby="sh-fb-experience-title">
            <p id="sh-fb-experience-title" className="sh-fb-label">EXPERIENCE</p>
            {EXPERIENCE_SLIDES.map((experience) => (
              <div className="experience-entry" key={experience.company}>
                <div className="experience-role-row">
                  <div className="experience-role">{experience.title}</div>
                  {experience.tag === 'INCOMING' ? <div className="experience-incoming">{experience.tag}</div> : null}
                </div>
                <div className="experience-company">{experience.company}</div>
                <div className="experience-meta">{experience.location ? `${experience.location} · ${experience.dates}` : experience.dates}</div>
                {experience.lines.length ? <ul className="experience-bullets">{experience.lines.map((line) => <li key={line}>{line}</li>)}</ul> : null}
              </div>
            ))}
          </section>
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
