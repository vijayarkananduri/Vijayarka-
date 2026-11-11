import type { ReactNode } from 'react';
import type { Project } from './data/projects';

export function ForgeMark() {
  return <svg className="forge-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M9 9 22 37 34 10" />
    <path d="M22 37 39 12v25" />
    <path d="M6 39c8 3 18 2 28-1" />
    <circle cx="38.5" cy="8.5" r="2" />
  </svg>;
}

export function HeroArtwork() {
  return <svg className="hero-sketch" viewBox="0 0 720 560" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="workbench-paper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4ead6" /><stop offset="1" stopColor="#d9c8aa" /></linearGradient>
      <filter id="workbench-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#080807" floodOpacity=".52" /></filter>
      <pattern id="workbench-lines" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 13.5H14" stroke="#6f6252" strokeOpacity=".13" strokeWidth=".7" /></pattern>
    </defs>
    <g className="workbench-sheet" filter="url(#workbench-shadow)">
      <path d="m131 99 354-27 83 52 25 304-349 42-96-63z" fill="#8d4c31" opacity=".7" transform="translate(18 18) rotate(-5 355 275)" />
      <path d="m126 85 354-27 83 52 25 304-349 42-96-63z" fill="url(#workbench-paper)" stroke="#f6eddb" strokeWidth="2" transform="rotate(-5 355 275)" />
      <path d="m126 85 354-27 83 52 25 304-349 42-96-63z" fill="url(#workbench-lines)" opacity=".72" transform="rotate(-5 355 275)" />
      <path d="m477 58 6 69 80-17" fill="#bca98c" stroke="#6b5747" strokeOpacity=".55" strokeWidth="1.5" transform="rotate(-5 355 275)" />
      <path d="m477 58 6 69 80-17" fill="none" stroke="#f9f2e3" strokeWidth="2" transform="rotate(-5 355 275)" />
    </g>
    <g className="workbench-ink" transform="rotate(-5 355 275)">
      <text x="174" y="145" fill="#705944" className="art-label">FIELD NOTES / 01</text>
      <path d="M174 165h152" stroke="#a65332" strokeWidth="3" strokeLinecap="round" />
      <text x="174" y="205" fill="#29231d" className="art-title">An idea,</text>
      <text x="174" y="245" fill="#29231d" className="art-title">given a form.</text>
      <path d="M176 283c34-9 50 10 76 2s43-25 71-9 43 17 65 0 38-12 56 2" fill="none" stroke="#a65332" strokeWidth="3" strokeLinecap="round" className="ink-drawn-path" />
      <path d="M177 313c39-8 67 4 93 0m-93 18c34-7 51 4 80 0m-80 18c24-4 41 1 58-2" fill="none" stroke="#635746" strokeOpacity=".58" strokeWidth="2" strokeLinecap="round" />
      <circle cx="179" cy="285" r="5" fill="#a65332" /><circle cx="444" cy="278" r="5" fill="#a65332" />
      <text x="176" y="392" fill="#705944" className="art-label">RESEARCH</text>
      <text x="303" y="392" fill="#705944" className="art-label">BUILD</text>
      <text x="407" y="392" fill="#705944" className="art-label">WRITE</text>
      <path d="M174 407h73m47 0h48m29 0h54" stroke="#705944" strokeOpacity=".46" strokeWidth="1" />
    </g>
    <g className="workbench-pencil" transform="rotate(36 576 274)">
      <rect x="559" y="192" width="23" height="204" rx="10" fill="#c27a4d" stroke="#f2c08c" strokeWidth="2" />
      <path d="M559 212h23M559 373h23" stroke="#f0d6ae" strokeWidth="4" />
      <path d="m559 396 11 30 12-30" fill="#d9c8aa" stroke="#f0d6ae" strokeWidth="2" />
      <path d="m568 426 2 9 3-9" fill="#171514" />
    </g>
    <g className="workbench-tape" transform="rotate(-12 190 92)">
      <path d="M145 75h104v27H145z" fill="#c57847" opacity=".76" />
      <path d="M150 80h96" stroke="#f0c69e" strokeOpacity=".65" strokeWidth="1" strokeDasharray="3 5" />
    </g>
    <text x="94" y="508" fill="#d4c5ad" className="art-caption">A SMALL STUDIO FOR BIG QUESTIONS</text>
  </svg>;
}

const projectMarks: Record<string, ReactNode> = {
  mawo: <g className="mark-mawo" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M82 237c67-29 111-54 164-51s81 31 126 7 81-72 164-61" fill="none" stroke="var(--art-accent)" strokeWidth="5" />
    <path d="M193 187c-2-38 10-66 34-88 9 24 10 48-3 69m3-24c13-24 32-38 56-42-3 25-18 43-43 54" fill="none" strokeWidth="4" />
    <path d="M217 199v40m-16 0h33m116-45v42m-16 3h33m119-86v86m-17 0h36" fill="none" strokeWidth="3" />
    <circle cx="87" cy="236" r="8" fill="var(--art-paper)" strokeWidth="3" /><circle cx="533" cy="131" r="9" fill="var(--art-accent)" strokeWidth="3" />
    <path d="M463 86h74M471 98h57" fill="none" strokeWidth="2" opacity=".62" />
  </g>,
  khata: <g className="mark-khata" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M202 57h220l45 40v192H202z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M422 57v43h45" fill="none" strokeWidth="3" />
    <path d="M223 115h215M223 152h215M223 189h215M223 226h215" strokeWidth="2" opacity=".38" />
    <path d="M320 108v128" strokeWidth="2" opacity=".38" />
    <path d="M240 135h47m-47 36h57m-57 36h39m91-68h42m-42 36h31m-31 36h48" strokeWidth="4" />
    <circle cx="378" cy="136" r="11" fill="var(--art-accent)" strokeWidth="2" />
    <path d="M199 73h-27v196h278" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
    <text x="236" y="91" className="art-small" fill="var(--art-accent)" stroke="none">DAILY LEDGER / 07</text>
  </g>,
  metabasis: <g className="mark-metabasis" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M122 230h100l30-36 40 36h143l25-29 38 29h64" fill="none" strokeWidth="4" />
    <path d="M264 174c18-41 64-67 111-55 34 8 58 34 65 68" fill="none" stroke="var(--art-accent)" strokeWidth="5" />
    <path d="M279 166c14-26 42-43 74-41 22 1 42 13 54 32" fill="none" strokeWidth="2" opacity=".48" />
    <circle cx="354" cy="174" r="34" fill="var(--art-paper)" strokeWidth="3" />
    <path d="m353 173 21-20m-22 21-1 19" strokeWidth="4" />
    <circle cx="353" cy="174" r="4" fill="var(--art-accent)" stroke="none" />
    <path d="M142 261h63m213 0h78" strokeWidth="2" opacity=".48" />
  </g>,
  almara: <g className="mark-almara" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M170 87h294v181H170z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M170 142h294M170 197h294" strokeWidth="3" />
    <path d="M193 102h18v24h-18zM193 157h18v24h-18zM193 212h18v24h-18z" fill="var(--art-accent)" strokeWidth="2" />
    <path d="M232 111h91m-91 13h147m-147 41h116m-116 13h82m-82 42h137m-137 13h99" strokeWidth="3" opacity=".7" />
    <path d="M443 91v172" strokeWidth="2" strokeDasharray="4 7" opacity=".43" />
    <circle cx="420" cy="171" r="10" fill="var(--art-accent)" strokeWidth="2" />
  </g>,
  examflow: <g className="mark-examflow" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M170 76h293v199H170z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M170 121h293M218 76v199M267 76v199M316 76v199M365 76v199M414 76v199" strokeWidth="1.5" opacity=".28" />
    <path d="M185 138h25v26h-25zm50 34h25v26h-25zm49-39h25v55h-25zm99 29h25v27h-25z" fill="var(--art-accent)" strokeWidth="2" />
    <path d="M183 227c40-25 71-14 99-7s43-21 72-22 52 22 90-9" fill="none" strokeWidth="3" />
    <circle cx="444" cy="189" r="7" fill="var(--art-paper)" strokeWidth="3" />
  </g>,
  'centrum-os': <g className="mark-centrum" stroke="var(--art-paper)" strokeLinecap="round" strokeLinejoin="round">
    <rect x="139" y="73" width="369" height="204" rx="7" fill="#22211e" strokeWidth="3" />
    <path d="M139 111h369" strokeWidth="2" opacity=".48" />
    <circle cx="162" cy="92" r="5" fill="var(--art-accent)" stroke="none" /><circle cx="181" cy="92" r="5" fill="#e7ddc6" stroke="none" opacity=".7" />
    <path d="M173 145h106m-106 33h165m-165 34h75" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="m415 208 22 23 43-53" fill="none" stroke="var(--art-paper)" strokeWidth="6" />
    <rect x="282" y="138" width="10" height="10" fill="var(--art-paper)" stroke="none" className="art-caret" />
  </g>,
  draftbook: <g className="mark-draftbook" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="m154 84 179-17 10 193-175 20z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="m333 67 152 22-18 193-149-22z" fill="#f0dfc3" strokeWidth="3" />
    <path d="M333 67v194m-139-141 103-10m-102 31 117-11m-116 33 84-8m81-67 92 13m-95 13 103 14m-105 10 73 10" fill="none" strokeWidth="2.5" opacity=".62" />
    <path d="m427 55 20-15 76 158-20 12z" fill="var(--art-accent)" strokeWidth="3" />
    <path d="m503 210 12-12 12 25-20 10z" fill="var(--art-paper)" strokeWidth="2" />
    <path d="M207 211c32-14 53-4 79-12" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
  </g>,
  tenet: <g className="mark-tenet" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M191 67h237l30 31v184H191z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M428 67v34h30" fill="none" strokeWidth="3" />
    <path d="M215 124h183M215 146h111" strokeWidth="3" opacity=".5" />
    <path d="M218 205c25-34 47 32 71-5s42-33 61-5 39 1 64-39" fill="none" stroke="var(--art-accent)" strokeWidth="5" />
    <path d="M216 228h194" strokeWidth="2" opacity=".35" />
    <circle cx="220" cy="206" r="6" fill="var(--art-accent)" strokeWidth="2" /><circle cx="414" cy="157" r="6" fill="var(--art-accent)" strokeWidth="2" />
    <path d="M181 94h-21v194h285" fill="none" stroke="var(--art-accent)" strokeWidth="3" />
  </g>,
  designrx: <g className="mark-designrx" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <rect x="148" y="67" width="322" height="199" rx="6" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M148 102h322" strokeWidth="2" opacity=".4" />
    <circle cx="170" cy="84" r="4" fill="var(--art-accent)" stroke="none" /><circle cx="186" cy="84" r="4" fill="var(--art-accent)" stroke="none" />
    <rect x="177" y="125" width="104" height="111" fill="none" strokeWidth="2" />
    <path d="M194 146h71m-71 17h56m-56 17h62m0 22h-36" strokeWidth="3" />
    <path d="m316 156 34-28 32 27 45-18m-111 52 35-21 40 22 43-13" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="M309 128v104m148-104v104M296 123h171M296 237h171" strokeWidth="1.5" strokeDasharray="3 6" opacity=".55" />
    <circle cx="427" cy="136" r="7" fill="var(--art-accent)" strokeWidth="2" />
  </g>,
  echo: <g className="mark-echo" stroke="var(--art-paper)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M139 78h355v194H139z" fill="#211e20" strokeWidth="3" />
    <path d="M139 113h355" strokeWidth="2" opacity=".35" />
    <path d="M158 181h35l17-28 24 64 24-92 27 117 23-75 18 32h35l19-47 18 51 20-22h40" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="M177 145h84m-84 71h53m213-71h27" strokeWidth="2" opacity=".33" />
    <circle cx="318" cy="181" r="7" fill="var(--art-accent)" stroke="none" />
    <path d="M318 126v110M263 181h110" strokeWidth="1" strokeDasharray="3 7" opacity=".36" />
  </g>,
  'ek-indian-bacha': <g className="mark-eib" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M157 78h176v112H157z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="m181 190-14 29 45-29" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M294 173h171v98H294z" fill="#e7c8a2" strokeWidth="3" />
    <path d="m413 271 21 26 15-26" fill="#e7c8a2" strokeWidth="3" />
    <path d="M181 113h91m-91 22h62m82 68h104m-104 21h78" strokeWidth="4" />
    <path d="M338 109h91" stroke="var(--art-accent)" strokeWidth="5" />
    <path d="m384 95 15 14-15 14" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
  </g>,
  logbook: <g className="mark-logbook" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M182 66h252v217H182z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M217 66v217" strokeWidth="3" />
    <path d="M183 111h34m-34 45h34m-34 45h34" stroke="var(--art-accent)" strokeWidth="7" />
    <path d="M244 111h157m-157 27h133m-133 38h171m-171 27h105m-105 38h152" strokeWidth="3" opacity=".63" />
    <path d="m407 71 48 48" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="m401 77 14-14 55 55-14 14z" fill="var(--art-accent)" strokeWidth="2" />
  </g>,
  'writers-assistant': <g className="mark-writer" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M168 75h293v199H168z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M207 119h200m-200 26h168m-168 26h116" strokeWidth="3" opacity=".52" />
    <path d="M208 212h48v37h-48zM274 212h48v37h-48zM340 212h48v37h-48z" fill="none" strokeWidth="2" />
    <path d="M219 227h25m42 0h26m42 0h25" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="m414 80 35 35-68 68-40 8 8-40z" fill="var(--art-accent)" strokeWidth="3" />
    <path d="m355 151 27 26" stroke="var(--art-paper)" strokeWidth="3" />
  </g>,
  'tailored-poems': <g className="mark-poems" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M183 64h253v219H183z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M212 104h186m-186 29h137m-137 29h165m-165 29h110" strokeWidth="3" opacity=".5" />
    <path d="M204 238c35-22 44 19 76-4s44 14 81-6" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="M417 97v116m-7 0h14" strokeWidth="3" />
    <path d="M451 76h29v209h-29z" fill="var(--art-accent)" strokeWidth="3" />
    <path d="M451 91h29m-29 17h29m-29 17h29" stroke="var(--art-paper)" strokeWidth="2" />
  </g>,
  sylph: <g className="mark-sylph" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M130 220c42-25 78-15 117 0s77 17 111-1 67-17 115 3" fill="none" strokeWidth="3" />
    <path d="M223 173c-1-26 17-45 42-45 8-31 58-32 69 2 28-1 40 17 34 40z" fill="var(--art-paper)" strokeWidth="3" />
    <path d="m252 194-7 21m39-21-7 21m39-21-7 21" stroke="var(--art-accent)" strokeWidth="4" />
    <path d="M164 127c29-23 61-29 94-27m130 8c34 8 62 22 86 44" fill="none" stroke="var(--art-accent)" strokeWidth="3" />
    <path d="M192 92v31m-12-19h24m204 29v30m-12-18h24" strokeWidth="2" opacity=".5" />
  </g>,
  kosha: <g className="mark-kosha" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <rect x="236" y="62" width="170" height="210" rx="10" fill="var(--art-paper)" strokeWidth="3" transform="rotate(-9 321 167)" opacity=".55" />
    <rect x="236" y="62" width="170" height="210" rx="10" fill="var(--art-paper)" strokeWidth="3" transform="rotate(7 321 167)" opacity=".8" />
    <rect x="236" y="62" width="170" height="210" rx="10" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M262 108h72m-72 22h118m-118 22h96" strokeWidth="3" opacity=".6" />
    <rect x="292" y="190" width="58" height="46" rx="6" fill="var(--art-accent)" strokeWidth="3" /><path d="M303 190v-14a18 18 0 0 1 36 0v14" fill="none" strokeWidth="4" /><circle cx="321" cy="212" r="5" fill="var(--art-paper)" stroke="none" />
  </g>,
  'nslv-19': <g className="mark-nslv" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M60 262c120-24 240-24 520 0" fill="none" strokeWidth="3" opacity=".5" />
    <ellipse cx="320" cy="108" rx="62" ry="74" fill="var(--art-paper)" strokeWidth="3" /><path d="M320 34v148M262 90c40 14 76 14 116 0" fill="none" strokeWidth="2" opacity=".45" />
    <path d="M308 182l-12 34m36-34 12 34M296 216h48" fill="none" strokeWidth="3" /><rect x="296" y="216" width="48" height="32" rx="3" fill="var(--art-accent)" strokeWidth="3" />
    <path d="M470 80h40m-40 52h40m-40 52h40" strokeWidth="2" opacity=".5" /><circle cx="150" cy="86" r="5" fill="var(--art-accent)" stroke="none" /><path d="M118 60h64" strokeWidth="2" strokeDasharray="3 7" opacity=".5" />
  </g>,
  flexrun: <g className="mark-flexrun" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M110 262H530" fill="none" strokeWidth="3" opacity=".5" />
    <circle cx="320" cy="92" r="20" fill="var(--art-paper)" strokeWidth="4" />
    <path d="M320 112v70m0-58-52 28m52-28 58-30m-58 88-44 62m44-62 52 54" fill="none" strokeWidth="5" />
    {[[320,124],[268,152],[378,94],[276,244],[372,236]].map(([x,y]) => <circle key={x+'-'+y} cx={x} cy={y} r="7" fill="var(--art-accent)" stroke="var(--art-ink)" strokeWidth="2" className="flex-joint" />)}
    <path d="M150 140c-20 20-20 60 0 80m-30-110c-34 36-34 106 0 142" fill="none" strokeWidth="3" opacity=".45" />
  </g>,
  epochs: <g className="mark-epochs" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <rect x="150" y="64" width="340" height="204" rx="5" fill="var(--art-paper)" strokeWidth="3" />
    <path d="M186 98v140h272" fill="none" strokeWidth="3" /><path d="M200 112c40 6 54 78 96 98s90 24 150 26" fill="none" stroke="var(--art-accent)" strokeWidth="4" />
    <circle cx="256" cy="176" r="7" fill="var(--art-accent)" stroke="none" /><circle cx="338" cy="222" r="7" fill="var(--art-accent)" stroke="none" />
    <path d="M214 258h40m26 0h26" strokeWidth="2" opacity=".4" /><path d="M376 120h58m-58 20h40" strokeWidth="3" opacity=".5" />
  </g>,
  klar: <g className="mark-klar" stroke="var(--art-ink)" strokeLinecap="round" strokeLinejoin="round">
    <path d="M150 74h220a14 14 0 0 1 14 14v84a14 14 0 0 1-14 14H226l-48 38v-38h-28a14 14 0 0 1-14-14V88a14 14 0 0 1 14-14z" fill="var(--art-paper)" strokeWidth="3" />
    <text x="176" y="140" fill="var(--art-ink)" stroke="none" fontSize="54" style={{ fontFamily: 'var(--font-signature)' }}>Hallo</text>
    <path d="M286 214h190a14 14 0 0 1 14 14v28a14 14 0 0 1-14 14H452l-26 26v-26h-140a14 14 0 0 1-14-14v-28a14 14 0 0 1 14-14z" fill="var(--art-accent)" strokeWidth="3" />
    <circle cx="346" cy="242" r="5" fill="var(--art-paper)" stroke="none" className="klar-dot" /><circle cx="372" cy="242" r="5" fill="var(--art-paper)" stroke="none" className="klar-dot" /><circle cx="398" cy="242" r="5" fill="var(--art-paper)" stroke="none" className="klar-dot" />
  </g>,
};

export function ProjectArtwork({ project, large = false }: { project: Project; large?: boolean }) {
  return <svg className={`project-art art-${project.slug}`} viewBox="0 0 640 320" preserveAspectRatio={large ? 'xMidYMid meet' : 'xMidYMid slice'} aria-hidden="true" focusable="false">
    <defs>
      <pattern id={`grain-${project.slug}`} width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="3" cy="5" r=".7" fill="var(--art-ink)" opacity=".13" /><circle cx="13" cy="12" r=".55" fill="var(--art-ink)" opacity=".1" /></pattern>
      <pattern id={`paper-lines-${project.slug}`} width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 9.5H10" stroke="var(--art-ink)" strokeOpacity=".13" strokeWidth=".6" /></pattern>
    </defs>
    <rect width="640" height="320" rx="4" fill="var(--art-bg)" />
    <path d="M0 256c102-44 162 13 254-4s180-68 386-3v71H0z" fill="var(--art-shade)" opacity=".42" />
    <rect width="640" height="320" fill={`url(#grain-${project.slug})`} opacity=".48" />
    <path d="M30 36h45m-45 7h24M548 269h62" stroke="var(--art-ink)" strokeOpacity=".32" strokeWidth="1" />
    <g className="project-art-mark">{projectMarks[project.slug] ?? <g stroke="var(--art-ink)" fill="none" strokeLinecap="round" strokeWidth="3"><path d="M181 75h278v195H181z" fill="var(--art-paper)" /><path d="M215 118h194m-194 27h157m-157 27h102" /><path d="m250 226 45-38 42 24 56-53" stroke="var(--art-accent)" strokeWidth="5" /><circle cx="393" cy="159" r="7" fill="var(--art-accent)" /></g>}</g>
    {project.slug !== 'nslv-19' && <text x="32" y="292" fill="var(--art-ink)" className="art-label">{String(project.sort).padStart(2, '0')} / {project.category.toUpperCase()}</text>}
    <path d="M32 51v24m0-24h24m552 194v24m0-24h-24" fill="none" stroke="var(--art-accent)" strokeWidth="2" />
  </svg>;
}

export function IntroArtwork({ scene }: { scene: number }) {
  return <svg className="intro-artwork" data-scene={scene} viewBox="0 0 620 390" aria-hidden="true" focusable="false">
    <defs>
      <filter id="intro-paper-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#080706" floodOpacity=".4" /></filter>
      <pattern id="intro-paper-lines" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 13.5H14" stroke="#655847" strokeOpacity=".15" strokeWidth=".7" /></pattern>
    </defs>
    <path d="M75 63c71-26 128-8 195 2s129-15 205 0 68 48 78 111-4 126-65 143-137-2-206 8-147 23-198-13-46-94-50-153 5-82 41-98z" fill="#c47a4d" opacity=".12" />
    <g className="intro-art-scene intro-art-scene-0" filter="url(#intro-paper-shadow)">
      <path d="m148 65 307-20 50 48 13 200-317 21-54-42z" fill="#efe5d1" stroke="#faf3e6" strokeWidth="2" transform="rotate(-4 330 190)" />
      <path d="m148 65 307-20 50 48 13 200-317 21-54-42z" fill="url(#intro-paper-lines)" transform="rotate(-4 330 190)" />
      <text x="193" y="121" fill="#796650" className="intro-art-label">A SHORT INTRODUCTION</text>
      <path d="M195 151h100" stroke="#aa5936" strokeWidth="3" strokeLinecap="round" />
      <path d="M195 193c43-28 68 15 102-5s56-21 93 4" fill="none" stroke="#29231d" strokeWidth="4" strokeLinecap="round" className="intro-signature-line" />
      <text x="194" y="239" fill="#29231d" className="intro-art-name">Vijayarka</text>
      <text x="196" y="266" fill="#80644b" className="intro-art-label">RESEARCH / BUILD / WRITE</text>
    </g>
    <g className="intro-art-scene intro-art-scene-1" filter="url(#intro-paper-shadow)">
      <path d="M142 89h338v198H142z" fill="#eee3cf" stroke="#faf3e6" strokeWidth="2" transform="rotate(2 310 188)" />
      <path d="M183 125h164m-164 16h118m-118 17h141" stroke="#75634e" strokeOpacity=".52" strokeWidth="3" strokeLinecap="round" />
      <path d="M185 221c44-41 74 24 122-19s70-35 105-1 56-11 76-32" fill="none" stroke="#a65332" strokeWidth="4" strokeLinecap="round" />
      <circle cx="186" cy="221" r="5" fill="#a65332" /><circle cx="488" cy="169" r="6" fill="#a65332" />
      <text x="184" y="105" fill="#796650" className="intro-art-label">IDEAS IN THREE DIRECTIONS</text>
      <text x="183" y="260" fill="#796650" className="intro-art-label">PAPER  /  TOOL  /  STORY</text>
    </g>
    <g className="intro-art-scene intro-art-scene-2" filter="url(#intro-paper-shadow)">
      <path d="M156 91h310v197H156z" fill="#e8ddc5" stroke="#faf3e6" strokeWidth="2" />
      <path d="M189 245h243" stroke="#2b2923" strokeWidth="4" strokeLinecap="round" />
      <path d="M310 245v-87m0 48c-35-3-54-24-57-57 32 4 52 20 57 48m0 10c32-12 51-35 51-68-32 8-49 27-51 55" fill="none" stroke="#405942" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M192 122h102m-102 16h82" stroke="#77634b" strokeWidth="3" strokeLinecap="round" opacity=".65" />
      <text x="191" y="105" fill="#796650" className="intro-art-label">ALIVE UI / MAWO</text>
      <circle cx="414" cy="120" r="18" fill="#c47a4d" />
      <path d="M414 90v-9m0 78v-9m-30-30h-9m78 0h-9" stroke="#a65332" strokeWidth="2" />
    </g>
    <g className="intro-art-scene intro-art-scene-3" filter="url(#intro-paper-shadow)">
      <path d="M131 88h177v203H131z" fill="#efe5d1" stroke="#faf3e6" strokeWidth="2" transform="rotate(-3 220 190)" />
      <path d="M308 88h177v203H308z" fill="#e7d8be" stroke="#faf3e6" strokeWidth="2" transform="rotate(3 396 190)" />
      <path d="M308 88v202" stroke="#957b61" strokeWidth="2" />
      <path d="M162 133h113m-113 17h92m-92 17h100m67-34h111m-111 17h99m-99 17h75" stroke="#665849" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <path d="M160 227c35-23 51 14 80-8s47 14 80-8 49 7 75-5" fill="none" stroke="#aa5936" strokeWidth="4" strokeLinecap="round" />
      <text x="161" y="114" fill="#796650" className="intro-art-label">A STORY, STILL OPEN</text>
    </g>
    <g className="intro-art-scene intro-art-scene-4" filter="url(#intro-paper-shadow)">
      <path d="M131 74h361v218H131z" fill="#eee3cf" stroke="#faf3e6" strokeWidth="2" transform="rotate(-2 310 183)" />
      <path d="M179 234c50-69 92-39 132-79s61 37 106-4 60-13 84-46" fill="none" stroke="#aa5936" strokeWidth="4" strokeLinecap="round" strokeDasharray="7 8" className="intro-route-line" />
      <path d="M174 224h11m301-124h11" stroke="#29231d" strokeWidth="2" />
      <circle cx="178" cy="235" r="9" fill="#aa5936" stroke="#f7eddd" strokeWidth="4" />
      <path d="M505 83c-16 0-28 12-28 27 0 18 28 44 28 44s28-26 28-44c0-15-12-27-28-27z" fill="#aa5936" />
      <circle cx="505" cy="110" r="7" fill="#f4ead8" />
      <text x="172" y="106" fill="#796650" className="intro-art-label">TAKE THE NEXT TURN</text>
      <text x="174" y="273" fill="#796650" className="intro-art-label">THE STUDIO IS OPEN</text>
    </g>
  </svg>;
}


export function CreativeArtwork({ title, index }: { title: string; index: number }) {
  return <svg className={`creative-drawing creative-drawing-${index + 1}`} viewBox="0 0 260 245" aria-hidden="true" focusable="false">
    <defs><filter id={`creative-shadow-${index}`} x="-30%" y="-20%" width="160%" height="160%"><feDropShadow dx="0" dy="9" stdDeviation="7" floodColor="#35271d" floodOpacity=".2" /></filter></defs>
    {index === 0 && <g filter={`url(#creative-shadow-${index})`} transform="rotate(-5 130 122)">
      <path d="M57 29h139l19 17v171H57z" fill="#a9603d" stroke="#523a2d" strokeWidth="2" />
      <path d="M75 44h102v1H75zM75 187h101" stroke="#f1d5b2" strokeOpacity=".6" />
      <path d="M187 29v18h28" fill="#ce9671" stroke="#523a2d" strokeWidth="1.5" />
      <text x="78" y="78" fill="#f7ead6" className="creative-art-small">A PROSE POEM</text>
      <text x="78" y="114" fill="#fff0d9" className="creative-art-title">Newton’s</text>
      <text x="78" y="143" fill="#fff0d9" className="creative-art-title">Law of Love</text>
      <path d="M78 160c24-16 39 9 60-3s26 5 42-2" fill="none" stroke="#eac9a8" strokeWidth="2" />
      <text x="78" y="179" fill="#f0d7b8" className="creative-art-small">VIJAYARKA NANDURI</text>
    </g>}
    {index === 1 && <g filter={`url(#creative-shadow-${index})`} transform="rotate(4 130 122)">
      <path d="M58 27h137l22 20v170H58z" fill="#66594d" stroke="#3b312a" strokeWidth="2" />
      <path d="M195 27v21h22" fill="#b97750" stroke="#3b312a" strokeWidth="1.5" />
      <circle cx="131" cy="85" r="25" fill="none" stroke="#d9b17d" strokeWidth="1.5" />
      <path d="M112 85c12-18 28 18 41 0" fill="none" stroke="#d9b17d" strokeWidth="2" />
      <text x="78" y="132" fill="#f1e7d6" className="creative-art-title">The Chemistry</text>
      <text x="78" y="159" fill="#f1e7d6" className="creative-art-title">of Love</text>
      <path d="M78 178h96" stroke="#d4b795" strokeWidth="1" />
      <text x="78" y="196" fill="#d4b795" className="creative-art-small">NOTES ON WHAT REMAINS</text>
    </g>}
    {index === 2 && <g filter={`url(#creative-shadow-${index})`} transform="rotate(-3 130 122)">
      <path d="M42 34h176v177H42z" fill="#eee2cc" stroke="#655642" strokeWidth="2" />
      <path d="M42 68h176" stroke="#a65332" strokeWidth="2" />
      <text x="60" y="57" fill="#665542" className="creative-art-small">FIELD GUIDE / 01</text>
      <text x="61" y="102" fill="#2f2922" className="creative-art-title">Write it</text>
      <text x="61" y="128" fill="#2f2922" className="creative-art-title">right.</text>
      <path d="M62 148h121m-121 13h96m-96 13h109" stroke="#82745f" strokeWidth="2" strokeLinecap="round" opacity=".72" />
      <path d="m181 88 9 8 17-21" fill="none" stroke="#a65332" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
    {index === 3 && <g filter={`url(#creative-shadow-${index})`} transform="rotate(3 130 122)">
      <rect x="44" y="63" width="172" height="117" rx="5" fill="#6c5346" stroke="#352b25" strokeWidth="2" />
      <rect x="58" y="77" width="144" height="88" rx="2" fill="#d6c8ad" stroke="#352b25" strokeWidth="2" />
      <circle cx="91" cy="120" r="24" fill="#9f8b6e" stroke="#493b31" strokeWidth="2" />
      <circle cx="169" cy="120" r="24" fill="#9f8b6e" stroke="#493b31" strokeWidth="2" />
      <circle cx="91" cy="120" r="8" fill="#483c33" /><circle cx="169" cy="120" r="8" fill="#483c33" />
      <path d="M103 120h54m-42-28 23 56m0-56-23 56" stroke="#473b31" strokeWidth="2" />
      <path d="M65 152h130" stroke="#a65332" strokeWidth="3" />
      <text x="70" y="204" fill="#f1e5d2" className="creative-art-small">ANCIENT ECHOES / AUDIO FICTION</text>
    </g>}
    <text x="130" y="231" textAnchor="middle" fill="#5a4b3b" className="creative-art-index">{String(index + 1).padStart(2, '0')} / {title.toUpperCase()}</text>
  </svg>;
}
