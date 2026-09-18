import { useMemo, useState } from "react";

const stories = [
  "Ер Төстік",
  "Алпамыс батыр",
  "Қозы Көрпеш — Баян сұлу",
  "Қорқыт ата",
];
const storyInfo = {
  "Ер Төстік":
    "Жер асты әлеміне сапар шеккен батыр мен Шалқұйрық туралы қиял-ғажайып ертегі.",
  "Алпамыс батыр": "Елін қорғаған Алпамыс батырдың ерлігі мен серті.",
  "Қозы Көрпеш — Баян сұлу": "Қозы мен Баянның махаббаты, уәдесі және тағдыры.",
  "Қорқыт ата": "Мәңгілік өмірді іздеген Қорқыт атаның күйлері мен даналығы.",
};
const icon = (name) => (
  <span className="material-symbols-outlined">{name}</span>
);

function Header({ page, go, project }) {
  const items = [
    ["editor", "Редактор"],
    ["create", "Жаңа жоба"],
    ["dashboard", "Менің хикаяларым"],
    ["assets", "Медиа қор"],
  ];
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go("dashboard")}>
        <span className="brand-mark">✦</span>
        <span>QYRAN</span>
        <b>STUDIO</b>
      </button>
      <button className="project-pill" onClick={() => go("editor")}>
        {icon("auto_stories")}
        <span>{project}</span>
        <i>● САҚТАЛДЫ</i>
      </button>
      <nav>
        {items.map(([key, label]) => (
          <button
            key={key}
            onClick={() => go(key)}
            className={page === key ? "nav-active" : ""}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="top-actions">
        <button onClick={() => go("mobile")}>
          {icon("play_arrow")} Preview
        </button>
        <button className="publish">{icon("rocket_launch")} ЖАРИЯЛАУ</button>
      </div>
    </header>
  );
}
function Rail({ page, go }) {
  const items = [
    ["dashboard", "dashboard"],
    ["create", "add_box"],
    ["editor", "gesture"],
    ["mobile", "smartphone"],
    ["assets", "perm_media"],
  ];
  return (
    <aside className="rail">
      {items.map(([key, ic]) => (
        <button
          aria-label={key}
          key={key}
          onClick={() => go(key)}
          className={page === key ? "rail-active" : ""}
        >
          {icon(ic)}
        </button>
      ))}
    </aside>
  );
}
function Stat({ label, value, accent }) {
  return (
    <div className="metric">
      <small>{label}</small>
      <strong>{value}</strong>
      <i className={accent || ""}>●</i>
    </div>
  );
}

function Dashboard({ go }) {
  return (
    <section className="page dashboard-page">
      <div className="dash-hero">
        <div>
          <span className="eyebrow">STUDIO ARCHIVE // VOL. 04</span>
          <h1>
            Менің хикаяларым
            <br />
            мен комикстерім
          </h1>
          <p>
            Интерактивті қазақ комикстерін, аңыздар сериясын және сторибордтарды
            бір жерден басқарыңыз.
          </p>
        </div>
        <button onClick={() => go("create")} className="big-cta">
          {icon("add_box")} ЖАҢА КОМИКС
        </button>
      </div>
      <div className="filterbar">
        {icon("search")}
        <input placeholder="Атауы, тег немесе автор бойынша іздеу" />
        <button className="filter-on">БАРЛЫҒЫ (4)</button>
        <button>ЖАРИЯЛАНҒАН</button>
        <button>ӨҢДЕУДЕ</button>
        <button>СОҢҒЫ ӨЗГЕРІС</button>
      </div>
      <div className="metrics">
        <Stat label="ЖАЛПЫ ОҚЫЛЫМ" value="2,480,520" accent="yellow" />
        <Stat label="АЯҚТАУ ДЕҢГЕЙІ" value="78.6%" accent="cyan" />
        <Stat label="ОҚЫРМАН ӘРЕКЕТІ" value="642,190" accent="yellow" />
        <Stat label="ОРТАША ОҚУ УАҚЫТЫ" value="6М 42С" accent="cyan" />
      </div>
      <div className="section-label">
        <h2>БЕЛСЕНДІ ӨНДІРІСТЕГІ ХИКАЯЛАР</h2>
        <span>4 ХИКАЯ</span>
      </div>
      <div className="story-grid">
        {stories.map((story, i) => (
          <article className="story-card" key={story}>
            <div
              className="story-art art-{i}"
              style={{
                backgroundImage: "url('/assets/folklore-styles.png')",
                backgroundPosition: ["0% 0%", "100% 0%", "50% 100%", "0% 0%"][
                  i
                ],
              }}
            >
              <em>
                {i === 0
                  ? "LIVE WEB COMIC"
                  : i === 1
                    ? "ӨҢДЕУДЕ · 85%"
                    : "ҚАЗАҚ ФОЛЬКЛОРЫ"}
              </em>
            </div>
            <div className="story-body">
              <h2>{story}</h2>
              <p>{storyInfo[story]}</p>
              <div>
                <span>
                  САХНА
                  <br />
                  <b>{[8, 6, 5, 4][i]}</b>
                </span>
                <span>
                  КАДР
                  <br />
                  <b>{[24, 20, 16, 12][i]}</b>
                </span>
                <span>
                  ӨЗГЕРІС
                  <br />
                  <b>БҮГІН</b>
                </span>
              </div>
              <button onClick={() => go("editor")}>
                {icon("edit_document")} РЕДАКТОРДА АШУ
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="start-strip">
        <div>
          {icon("menu_book")}
          <span>
            <b>ЖАҢА ИНТЕРАКТИВТІ ХИКАЯНЫ БАСТАУ</b>
            <small>Мәтінді импорттаңыз немесе AI шеберін ашыңыз.</small>
          </span>
        </div>
        <button onClick={() => go("create")}>ШЕБЕРДІ АШУ</button>
      </div>
    </section>
  );
}

function Create({ project, setProject, go }) {
  const [style, setStyle] = useState(0);
  const [text, setText] = useState(
    `${project.toUpperCase()} · ҚАЗАҚ ЕРТЕГІСІ\n\n${storyInfo[project] || storyInfo["Ер Төстік"]}`,
  );
  const words = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text],
  );
  return (
    <section className="page create-page">
      <section className="hero">
        <span className="eyebrow">AI SEQUENTIAL PRODUCTION CORE V3.2</span>
        <h1>
          АҢЫЗДЫ <em>ИНТЕРАКТИВТІ КОМИКСКЕ</em> АЙНАЛДЫР.
        </h1>
        <p>
          Қолжазбаңызды, аңызды немесе ертегіңізді енгізіңіз. AI оны сюжеттік
          арка, кадрлар, диалог және дыбысы бар оқиғаға айналдырады.
        </p>
        <div className="stat-strip">
          <strong>10+</strong>
          <span>қазақ хикаясы</span>
          {stories.slice(0, 3).map((s) => (
            <label key={s}>{s}</label>
          ))}
        </div>
      </section>
      <div className="create-layout">
        <article className="card">
          <div className="card-title">
            <b>01</b>
            <h2>ХИКАЯНЫ ҚОСУ</h2>
            <span className="status">● СЦЕНАРИЙ ДАЙЫН</span>
          </div>
          <div className="tabs">
            <button className="selected">СЦЕНАРИЙДІ ЕНГІЗУ</button>
            <button>ҚҰЖАТ ЖҮКТЕУ</button>
            <button>СІЛТЕМЕ</button>
          </div>
          <div className="quick-stories">
            {stories.map((s) => (
              <button
                onClick={() => {
                  setProject(s);
                  setText(
                    `${s.toUpperCase()} · ҚАЗАҚ ФОЛЬКЛОРЫ\n\n${storyInfo[s]}`,
                  );
                }}
                key={s}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="script-box">
            <div className="script-head">
              <span>
                ● ● ● &nbsp; {project.toLowerCase().replaceAll(" ", "_")}.kaz
              </span>
              <b>AI ТІЛДІК ТАЛДАУ: ДАЙЫН</b>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="script-metrics">
            <span>
              <b>{words}</b> сөз
            </span>
            <span>
              <b>{Math.max(1, Math.ceil(words / 50))}</b> сахна / 6 кадр
            </span>
            <span>
              <b>2.5 мин</b> оқу
            </span>
          </div>
        </article>
        <aside className="settings">
          <article className="card">
            <div className="card-title">
              <b>02</b>
              <h2>ВИЗУАЛДЫ СТИЛЬ</h2>
            </div>
            <div className="style-grid">
              {["Эпикалық графика", "Manga / Anime", "Балалар анимациясы"].map(
                (n, i) => (
                  <button
                    key={n}
                    onClick={() => setStyle(i)}
                    className={`style-card ${style === i ? "chosen" : ""}`}
                  >
                    <span
                      className="style-image"
                      style={{
                        backgroundImage: "url('/assets/folklore-styles.png')",
                        backgroundPosition: ["0% 0%", "100% 0%", "50% 100%"][i],
                      }}
                    />
                    <strong>{n}</strong>
                    <small>
                      {i === 0
                        ? "Қалың тушь, драма, ою"
                        : "Қазақ фольклорына лайық"}
                    </small>
                  </button>
                ),
              )}
            </div>
            <div className="option-title">КАДР ФОРМАТЫ</div>
            <div className="format-row">
              <button className="selected-format">
                {icon("menu_book")}Классикалық бет
              </button>
              <button>{icon("swap_vert")}Вертикал scroll</button>
              <button>{icon("play_circle")}Кино кадры</button>
            </div>
          </article>
          <article className="generate-box">
            <div>3 САХНА · 9 КАДР · AI STORYBOARD</div>
            <button onClick={() => go("editor")}>
              СТОРИБОРДТЫ ГЕНЕРАЦИЯЛАУ →
            </button>
            <small>Шамамен 30 секунд · Кейін редакторда баптауға болады</small>
          </article>
        </aside>
      </div>
    </section>
  );
}

function Editor({ project, go }) {
  const [scene, setScene] = useState(3);
  const [selected, setSelected] = useState(3);
  return (
    <section className="editor-page">
      <aside className="scene-rail">
        <b>САХНАЛАР РЕЛЬСІ</b>
        {["Кіріспе", "Жолға шығу", "Жеті қат жер", "Шешуші сәт"].map((s, i) => (
          <button
            className={scene === i ? "scene-active" : ""}
            onClick={() => setScene(i)}
            key={s}
          >
            <span
              style={{
                backgroundImage: "url('/assets/folklore-styles.png')",
                backgroundPosition: i === 1 ? "100% 0%" : "0% 0%",
              }}
            ></span>
            <div>
              <strong>0{i + 1}</strong>
              <b>{s}</b>
              <small>
                {i + 3} кадр · {9 + i * 3}с
              </small>
            </div>
          </button>
        ))}
        <button className="add-scene" onClick={() => setScene(4)}>
          {icon("add_box")} САХНА ҚОСУ
        </button>
      </aside>
      <main className="canvas">
        <div className="toolrow">
          <button>{icon("near_me")} Select</button>
          <button>{icon("text_fields")} Text</button>
          <button>{icon("chat_bubble")} Bubble</button>
          <button>{icon("auto_awesome")} AI Gen</button>
          <button>{icon("animation")} Animate</button>
        </div>
        <div className="scene-title">
          <h1>САХНА 04: ШЕШУШІ СӘТ</h1>
          <span>ПАРАЛЛАКС ДИНАМИКАСЫ БЕЛСЕНДІ</span>
        </div>
        <div className="comic-canvas">
          <article className="wide-panel">
            <span>ЖЕТІНШІ ҚАБАТ · ТҮН</span>
            <b>ЕР ТӨСТІКТІҢ АЛДЫНДА ҚАРА ТАУ ҚОЗҒАЛДЫ.</b>
            <img
              src="/assets/folklore-styles.png"
              alt="Ер Төстік комикс сахнасы"
            />
          </article>
          <div className="split-panels">
            <article>
              <img src="/assets/folklore-styles.png" alt="Кейіпкер кадры" />
              <p>
                <b>ЕР ТӨСТІК</b>
                <br />
                «Жолымыз осы жерден басталады…»
              </p>
            </article>
            <article>
              <img src="/assets/folklore-catalog.png" alt="Аңыз әлемі" />
              <strong>ЖАРҚ!</strong>
            </article>
          </div>
          <article
            onClick={() => setSelected(4)}
            className={`focus-panel ${selected === 4 ? "panel-selected" : ""}`}
          >
            <img src="/assets/folklore-styles.png" alt="Комикс панелі" />
            <strong>ДУУУУ!</strong>
            <p>Шалқұйрық: «Бұл сынақтан өтеміз!»</p>
            <div className="panel-actions">
              <button>AI ҚАЙТА САЛУ</button>
              <button>БӨЛУ</button>
              <button>ДИАЛОГ</button>
            </div>
          </article>
        </div>
      </main>
      <aside className="inspector">
        <h2>
          AI STORY
          <br />
          DIRECTOR
        </h2>
        <section>
          <b>● COPILOT НҰСҚАУЫ</b>
          <p>
            «{project}» үшін шешуші эпизод дайын. 4 кадрлы асимметриялы
            композиция және төменгі ракурс қолданылды.
          </p>
          <button>⚡ Кернеуді арттыру</button>
          <button>▱ 3 панельге бөлу</button>
        </section>
        <section>
          <h2>ПАНЕЛЬ #04</h2>
          <label>ВИЗУАЛДЫ СТИЛЬ</label>
          <div>Эпикалық графика · Halftone</div>
          <label>КАМЕРА</label>
          <div>Low-angle Hero Shot</div>
          <label>ҚОЗҒАЛЫС</label>
          <div className="toggle-row">
            <button>ПАРАЛЛАКС ✓</button>
            <button>SCROLL ✓</button>
          </div>
        </section>
      </aside>
      <footer className="timeline">
        <b>▶ &nbsp; 00:15:24 / 01:45:00</b>
        {["Кіріспе", "Тұлпар", "Сигнал", "Шешуші сәт", "Қайту"].map((t, i) => (
          <span className={i === 3 ? "time-active" : ""} key={t}>
            {t}
          </span>
        ))}
      </footer>
    </section>
  );
}

function Mobile({ project }) {
  return (
    <section className="mobile-page">
      <div className="phone">
        <header>
          <b>QYRAN STUDIO</b>
          <button>{icon("add")} NEW COMIC</button>
        </header>
        <div className="mobile-project">
          <b>{project}</b>
          <small>☁ Autosaved 2m ago</small>
          <button>Edit</button>
          <button>Read</button>
        </div>
        <section className="mobile-scene">
          <h2>САХНА 04: ШЕШУШІ СӘТ</h2>
          <span>GRID 2×2 · WEAPON ACTIVATION</span>
        </section>
        <div className="mobile-panel">
          <img src="/assets/folklore-styles.png" alt="Мобильный кадр комикса" />
          <i>ДУУУУ!</i>
          <article>
            <small>● ЕР ТӨСТІК [ОЙЫ]</small>
            <p>«Бұл қауіптен өту үшін жол табуым керек…»</p>
          </article>
        </div>
        <div className="mobile-actions">
          <button>
            ✦<small>AI қайта салу</small>
          </button>
          <button>
            ▢<small>Баллон</small>
          </button>
          <button>
            ♪<small>SFX қосу</small>
          </button>
          <button>
            ▥<small>Grid бөлу</small>
          </button>
        </div>
        <section className="mobile-control">
          <h2>
            <b>4</b> КАДРДЫҢ ҚАСИЕТТЕРІ
          </h2>
          <p>Ink Weight: Medium · Halftone: 60 LPI</p>
          <div>
            <label>
              SFX PUNCH <b>+18dB</b>
              <input type="range" defaultValue="40" />
            </label>
            <label>
              TAIL ANGLE <b>-42°</b>
              <input type="range" defaultValue="55" />
            </label>
          </div>
          <button>Copilot-қа тапсырма жіберу {icon("send")}</button>
        </section>
        <nav>
          <button>
            ♧<small>Scenes</small>
          </button>
          <button className="mobile-active">
            ◇<small>Properties</small>
          </button>
          <button>
            ♧<small>Copilot</small>
          </button>
          <button>
            ▤<small>Timeline</small>
          </button>
        </nav>
      </div>
    </section>
  );
}
function Assets() {
  return (
    <section className="page assets-page">
      <h1>МЕДИА ҚОР</h1>
      <p>Кейіпкерлер, фондар, SFX және бұрын жасалған кадрлар.</p>
      <div className="asset-grid">
        {[
          "folklore-styles.png",
          "folklore-catalog.png",
          "folklore-styles.png",
          "folklore-catalog.png",
          "folklore-styles.png",
          "folklore-catalog.png",
        ].map((x, i) => (
          <article key={i}>
            <img src={`/assets/${x}`} />
            <b>
              {
                [
                  "Ер Төстік · батыр",
                  "Қазақ аңыздары",
                  "Шалқұйрық",
                  "Дала көрінісі",
                  "Қорқыт ата",
                  "Ою текстурасы",
                ][i]
              }
            </b>
            <small>AI GENERATED · PNG</small>
          </article>
        ))}
      </div>
    </section>
  );
}
export function App() {
  const [page, setPage] = useState("dashboard");
  const [project, setProject] = useState("Ер Төстік");
  const go = (p) => setPage(p);
  return (
    <main className="studio-shell">
      <Header page={page} go={go} project={project} />
      <Rail page={page} go={go} />
      {page === "dashboard" && <Dashboard go={go} />}{" "}
      {page === "create" && (
        <Create project={project} setProject={setProject} go={go} />
      )}{" "}
      {page === "editor" && <Editor project={project} go={go} />}{" "}
      {page === "mobile" && <Mobile project={project} />}{" "}
      {page === "assets" && <Assets />}
    </main>
  );
}
