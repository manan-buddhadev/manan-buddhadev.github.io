import { profile, experience, skills, education, publications, COMMANDS, FILE_COMMANDS } from '../data/resume.js'

function Divider() {
  return <div style={{ borderTop: '1px solid var(--c-border)', margin: '12px 0' }} />
}

function Muted({ children }) {
  return <span style={{ color: 'var(--c-muted)' }}>{children}</span>
}

export function HighlightsSection() {
  const projects = experience.flatMap((job) =>
    (job.projects || []).map((p) => ({ ...p, company: job.company, period: job.period }))
  )
  return (
    <div className="space-y-5">
      {projects.map((p, i) => (
        <div key={i} className="text-sm">
          <div style={{ color: 'var(--c-text)', fontWeight: 600, lineHeight: '1.5' }}>{p.name}</div>
          {p.year && <div className="text-xs mt-0.5 mb-2" style={{ color: 'var(--c-muted)' }}>{p.year}</div>}
          <ul className="space-y-0.5">
            {p.bullets.map((b, j) => (
              <li key={j} className="flex gap-2" style={{ color: 'var(--c-text-code)', lineHeight: '1.65' }}>
                <span style={{ color: 'var(--c-dim)', flexShrink: 0 }}>→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function AboutSection() {
  return (
    <div className="space-y-3">
      <div className="grid gap-y-1 text-sm" style={{ gridTemplateColumns: '80px 1fr' }}>
        <Muted>NAME</Muted>
        <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>{profile.name}</span>
        <Muted>ROLE</Muted>
        <span style={{ color: 'var(--c-text)' }}>{profile.title} · <span style={{ color: 'var(--c-orange)' }}>{profile.badge}</span></span>
        <Muted>LOC</Muted>
        <span style={{ color: 'var(--c-text)' }}>{profile.location}</span>
      </div>
      <Divider />
      <p style={{ color: 'var(--c-text-code)', lineHeight: '1.7', fontSize: '13px' }}>
        {profile.summary}
      </p>
      <Divider />
      <div className="space-y-1 text-sm">
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer"
           style={{ color: 'var(--c-orange)' }} className="hover:opacity-75 transition-opacity">
          [linkedin]
        </a>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer"
           style={{ color: 'var(--c-orange)' }} className="hover:opacity-75 transition-opacity">
          [github]
        </a>
        <a href={profile.scholarUrl} target="_blank" rel="noreferrer"
           style={{ color: 'var(--c-orange)' }} className="hover:opacity-75 transition-opacity">
          [scholar]
        </a>
        <a href={`mailto:${profile.email}`}
           style={{ color: 'var(--c-orange)' }} className="hover:opacity-75 transition-opacity">
          [email]
        </a>
      </div>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <div className="space-y-5">
      {experience.map((job, i) => (
        <div key={i}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
            <span style={{ color: 'var(--c-orange)', fontWeight: 600 }}>{job.company.toUpperCase()}</span>
            <span style={{ color: 'var(--c-text)' }}>{job.role}</span>
            <Muted>{job.period}</Muted>
            <Muted>· {job.location}</Muted>
          </div>
          {job.highlight && (
            <div className="ml-2 mb-2 flex items-start gap-2 text-xs"
                 style={{ color: 'var(--c-orange)', lineHeight: '1.6' }}>
              <span style={{ flexShrink: 0 }}>★</span>
              <span>{job.highlight}</span>
            </div>
          )}
          <ul className="space-y-0.5 ml-2 mb-2">
            {job.bullets.map((b, j) => (
              <li key={j} className="flex gap-2 text-sm" style={{ color: 'var(--c-text-code)', lineHeight: '1.65' }}>
                <span style={{ color: 'var(--c-dim)', flexShrink: 0 }}>→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="ml-2 mt-2 text-xs" style={{ color: 'var(--c-dim)' }}>
            <span style={{ color: 'var(--c-border)' }}>stack</span>
            {'  '}{job.stack}
          </div>
          {i < experience.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  )
}

export function SkillsSection() {
  return (
    <div className="space-y-2">
      {Object.entries(skills).map(([cat, items]) => (
        <div key={cat} className="grid gap-2 text-sm items-start"
             style={{ gridTemplateColumns: '110px 1fr' }}>
          <Muted>{cat.toUpperCase()}</Muted>
          <span style={{ lineHeight: '1.6' }}>
            {items.map((item, i) => (
              <span key={i}>
                <span style={{ color: 'var(--c-orange)' }}>{item}</span>
                {i < items.length - 1 && <Muted>  ·  </Muted>}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

export function EducationSection() {
  return (
    <div className="space-y-3">
      {education.map((e, i) => (
        <div key={i} className="text-sm">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span style={{ color: 'var(--c-orange)', fontWeight: 600 }}>{e.school.toUpperCase()}</span>
            <span style={{ color: 'var(--c-text)' }}>{e.degree}</span>
            {e.year && <Muted>{e.year}</Muted>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function PublicationsSection() {
  return (
    <div className="space-y-3">
      {publications.map((p, i) => (
        <div key={i} className="text-sm">
          {p.url ? (
            <a href={p.url} target="_blank" rel="noreferrer"
               style={{ color: 'var(--c-blue)' }} className="hover:opacity-75 transition-opacity">
              ◆ {p.title}
            </a>
          ) : (
            <span style={{ color: 'var(--c-green)' }}>◆ {p.title}</span>
          )}
          <div className="ml-4" style={{ color: 'var(--c-muted)' }}>{p.venue}</div>
        </div>
      ))}
    </div>
  )
}

export function ContactSection() {
  const contacts = [
    {
      label: 'email',
      href: `mailto:${profile.email}`,
      value: profile.email,
      desc: 'best for quick questions'
    },
    {
      label: 'linkedin',
      href: profile.linkedinUrl,
      value: profile.linkedin,
      desc: 'for professional inquiries',
      target: '_blank'
    },
    {
      label: 'github',
      href: profile.githubUrl,
      value: profile.github,
      desc: 'check out my work',
      target: '_blank'
    },
    {
      label: 'scholar',
      href: profile.scholarUrl,
      value: 'Google Scholar',
      desc: 'research & publications',
      target: '_blank'
    },
  ]

  return (
    <div className="space-y-4">
      <div style={{ color: 'var(--c-muted)', marginBottom: '8px' }}>
        I typically respond within 24 hours. Choose the best channel for your needs:
      </div>

      {contacts.map((contact) => (
        <div key={contact.label} className="space-y-1">
          <div>
            <a href={contact.href}
               target={contact.target}
               rel={contact.target ? 'noreferrer' : undefined}
               style={{ color: 'var(--c-orange)' }}
               className="hover:opacity-75 transition-opacity text-sm">
              [<span>{contact.label}</span>]
            </a>
            <span style={{ color: 'var(--c-dim)', marginLeft: '8px', fontSize: '12px' }}>
              {contact.value}
            </span>
          </div>
          <div style={{ color: 'var(--c-muted)', fontSize: '12px', marginLeft: '4px' }}>
            → {contact.desc}
          </div>
        </div>
      ))}

      <Divider />

      <div>
        <div style={{ color: 'var(--c-dim)', marginBottom: '8px' }}>Location:</div>
        <div style={{ color: 'var(--c-text)' }}>{profile.location}</div>
      </div>
    </div>
  )
}

export function HelpSection() {
  const all = [
    ...COMMANDS,
    ...FILE_COMMANDS,
    { cmd: 'clear', desc: 'clear terminal' },
    { cmd: 'help',  desc: 'show this menu' },
  ]
  return (
    <div className="space-y-1 text-sm">
      <div className="mb-2" style={{ color: 'var(--c-muted)' }}>Available commands:</div>
      {all.map(({ cmd, desc }) => (
        <div key={cmd} className="grid gap-2" style={{ gridTemplateColumns: '120px 1fr' }}>
          <span style={{ color: 'var(--c-orange)' }}>{cmd}</span>
          <span style={{ color: 'var(--c-muted)' }}>{desc}</span>
        </div>
      ))}
    </div>
  )
}

export function ViewPdfOutput() {
  return <span style={{ color: 'var(--c-green)' }}>Opening resume PDF in a new tab...</span>
}

export function DownloadOutput() {
  return <span style={{ color: 'var(--c-green)' }}>Downloading Manan_Buddhadev_Resume.pdf...</span>
}
