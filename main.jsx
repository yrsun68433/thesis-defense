import { useState } from "react";

// ── helpers ────────────────────────────────────────────────────────────────
const empty = (v) => !v || v.toString().trim() === "";

const TRANSPORT_TYPES = [
  "不需要",
  "火車/高鐵（憑票）",
  "捷運（實報）",
  "自行開車（公里數）",
  "計程車（憑收據）",
];

function initCommittee() {
  return {
    name: "", title: "", affiliation: "", type: "校內",
    bankCode: "", bankName: "", account: "", accountName: "",
    phone: "", email: "", transport: "不需要", transportNote: "",
  };
}

const formatDate = (d) => {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${parseInt(y) - 1911}年${parseInt(m)}月${parseInt(day)}日`;
};
const minguo = (d) => {
  if (!d) return "";
  const [y] = d.split("-");
  return `民國${parseInt(y) - 1911}年`;
};

// ── palette ────────────────────────────────────────────────────────────────
const C = {
  bg:       "#f4f2f7",
  surface:  "#ffffff",
  header:   "#d0cad8",
  headerBorder: "#b0a8bc",
  border:   "#ccc4d4",
  borderLight: "#ddd6e6",
  accent:   "#5e5472",
  accentMid:"#706880",
  accentSoft:"#e2dcea",
  accentTag: "#d4cede",
  label:    "#6a6278",
  text:     "#28243c",
  textMid:  "#4a4458",
  muted:    "#999",
  tabActive:"#4a4060",
  tabLine:  "#706880",
  btnBg:    "#e2dcea",
  btnBorder:"#a89cb8",
  btnText:  "#403858",
  inputBg:  "#faf8fc",
};

// ── shared styles ──────────────────────────────────────────────────────────
const inputStyle = {
  border: `1px solid ${C.border}`,
  borderRadius: 6,
  padding: "7px 10px",
  fontSize: 13,
  color: C.text,
  background: C.inputBg,
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle = {
  fontSize: 11,
  color: C.label,
  marginBottom: 3,
  display: "block",
  fontWeight: 500,
};

const fieldGroup = { display: "flex", flexDirection: "column", gap: 2 };

const sectionStyle = {
  background: C.surface,
  borderRadius: 12,
  padding: 24,
  border: `1px solid ${C.border}`,
  boxShadow: "0 2px 8px rgba(100,90,120,.07)",
};

const sectionTitle = {
  fontSize: 13,
  fontWeight: "bold",
  color: C.textMid,
  marginBottom: 16,
  paddingBottom: 8,
  borderBottom: `1px solid ${C.borderLight}`,
};

// ── sub-components ─────────────────────────────────────────────────────────
function ApplicationDoc({ student, defense, committees, chairIdx }) {
  return (
    <div style={{
      fontFamily: "'Noto Serif TC', serif",
      fontSize: 13,
      lineHeight: 1.9,
      color: C.text,
      maxWidth: 680,
      margin: "0 auto",
      padding: "32px 40px",
      background: "#fff",
      border: "1px solid #ddd",
    }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: C.label, marginBottom: 4 }}>
          國立臺灣大學經濟學系
        </div>
        <div style={{ fontSize: 17, fontWeight: "bold", letterSpacing: 3 }}>
          研究生學位考試（口試）申請單
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
          {minguo(defense.date)} 學年度第 {student.semester} 學期
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
        {[
          ["學生姓名", student.name, "學號", student.studentId],
          ["系所", `${student.dept}　${student.degree}班`, "指導教授",
            student.advisor + (student.coAdvisor ? `　/ ${student.coAdvisor}` : "")],
          ["論文題目（中）", defense.thesisTitle, "", ""],
          ["論文題目（英）", defense.thesisTitleEn, "", ""],
          ["口試日期", formatDate(defense.date), "時間", `${defense.startTime}–${defense.endTime}`],
          ["口試地點", `${defense.venueBuilding} ${defense.venueRoom}`, "場地借用單位", defense.venue],
        ].map(([l1, v1, l2, v2], i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
            <td style={{ padding: "5px 8px", width: "15%", color: C.textMid, fontSize: 12, whiteSpace: "nowrap" }}>{l1}</td>
            <td style={{ padding: "5px 8px", width: l2 ? "35%" : "85%" }} colSpan={l2 ? 1 : 3}>
              {v1 || <span style={{ color: "#ccc" }}>—</span>}
            </td>
            {l2 && (
              <>
                <td style={{ padding: "5px 8px", width: "15%", color: C.textMid, fontSize: 12, whiteSpace: "nowrap" }}>{l2}</td>
                <td style={{ padding: "5px 8px", width: "35%" }}>{v2 || <span style={{ color: "#ccc" }}>—</span>}</td>
              </>
            )}
          </tr>
        ))}
      </table>

      <div style={{ fontSize: 12, fontWeight: "bold", color: C.textMid, marginBottom: 6, marginTop: 12 }}>
        口試委員名單
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: C.accentSoft }}>
            {["角色", "姓名", "職稱", "服務單位", "類別"].map(h => (
              <th key={h} style={{ padding: "5px 8px", textAlign: "left", color: C.textMid, fontWeight: "normal", borderBottom: `2px solid ${C.border}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {committees.map((c, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
              <td style={{ padding: "5px 8px" }}>{i === chairIdx ? "主席" : `委員${i + 1}`}</td>
              <td style={{ padding: "5px 8px" }}>{c.name || <span style={{ color: "#ccc" }}>—</span>}</td>
              <td style={{ padding: "5px 8px" }}>{c.title || <span style={{ color: "#ccc" }}>—</span>}</td>
              <td style={{ padding: "5px 8px" }}>{c.affiliation || <span style={{ color: "#ccc" }}>—</span>}</td>
              <td style={{ padding: "5px 8px" }}>
                <span style={{
                  background: c.type === "校外" ? C.accentTag : "#e8f0fe",
                  borderRadius: 4,
                  padding: "1px 6px",
                  color: c.type === "校外" ? C.textMid : "#1a56a8",
                  fontSize: 11,
                }}>
                  {c.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "space-around", fontSize: 12 }}>
        {["學生簽名", "指導教授簽名", "系所核章"].map(l => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ borderBottom: "1px solid #bbb", width: 120, marginBottom: 4 }}>&nbsp;</div>
            <div style={{ color: "#888" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "right", fontSize: 10, color: "#ccc", marginTop: 24 }}>
        列印日期：{new Date().toLocaleDateString("zh-TW")}
      </div>
    </div>
  );
}

function VenueInfo({ student, defense, committees }) {
  return (
    <div style={{ background: "#f8f6fb", borderRadius: 12, padding: 24, border: `1px solid ${C.borderLight}` }}>
      <h3 style={{ fontSize: 14, fontWeight: "bold", color: C.textMid, marginBottom: 16, borderBottom: `1px solid ${C.borderLight}`, paddingBottom: 8, margin: "0 0 16px" }}>
        場地借用資訊整理
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
        {[
          ["借用單位/系統", defense.venue || "—"],
          ["建築/教室", `${defense.venueBuilding || "—"} ${defense.venueRoom || ""}`.trim()],
          ["借用日期", formatDate(defense.date) || "—"],
          ["借用時段", `${defense.startTime || "—"} – ${defense.endTime || "—"}`],
          ["使用人", student.name || "—"],
          ["使用目的", `${student.degree}學位口試`],
          ["預計人數", `${committees.length + 1} 人（口委 ${committees.length} 人 + 學生）`],
          ["備註", "需投影設備、白板"],
        ].map(([l, v]) => (
          <div key={l} style={{ background: "#fff", borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.borderLight}` }}>
            <div style={{ fontSize: 11, color: C.label, marginBottom: 2 }}>{l}</div>
            <div style={{ fontWeight: 500, color: C.text }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: C.muted, background: C.accentSoft, borderRadius: 8, padding: "10px 14px" }}>
        💡 請至 NTU 場地借用系統（spacescc.ntu.edu.tw）或各館室線上申請，申請成功後附上確認截圖。
      </div>
    </div>
  );
}

function ReimbursementDoc({ defense, committees, externalCommittees }) {
  return (
    <div style={{ fontFamily: "'Noto Serif TC', serif", fontSize: 13, lineHeight: 1.9, color: C.text, maxWidth: 720, margin: "0 auto" }}>
      {/* 費用明細 */}
      <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 4, padding: "28px 36px", marginBottom: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.label, letterSpacing: 2 }}>國立臺灣大學經濟學系</div>
          <div style={{ fontSize: 16, fontWeight: "bold", letterSpacing: 3 }}>學位口試費用核銷明細表</div>
          <div style={{ fontSize: 11, color: C.muted }}>
            {formatDate(defense.date) || "　　　　年　　月　　日"}
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 16 }}>
          <thead>
            <tr style={{ background: C.accentSoft }}>
              {["項目", "對象", "說明", "金額（元）", "備註"].map(h => (
                <th key={h} style={{ padding: "6px 10px", textAlign: "left", color: C.textMid, fontWeight: "normal", borderBottom: `2px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {committees.map((c, i) => (
              <tr key={`審${i}`} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: "6px 10px" }}>口試審查費</td>
                <td style={{ padding: "6px 10px" }}>{c.name || `委員${i + 1}`}</td>
                <td style={{ padding: "6px 10px", color: "#888" }}>{c.type}委員</td>
                <td style={{ padding: "6px 10px", borderBottom: "1px solid #bbb", minWidth: 80 }}></td>
                <td style={{ padding: "6px 10px", color: "#888" }}>依規定</td>
              </tr>
            ))}
            {externalCommittees.map((c, i) => (
              <tr key={`交${i}`} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: "6px 10px" }}>交通費</td>
                <td style={{ padding: "6px 10px" }}>{c.name || `校外委員${i + 1}`}</td>
                <td style={{ padding: "6px 10px", color: "#888" }}>
                  {c.transport}{c.transportNote ? `（${c.transportNote}）` : ""}
                </td>
                <td style={{ padding: "6px 10px", borderBottom: "1px solid #bbb", minWidth: 80 }}></td>
                <td style={{ padding: "6px 10px", color: "#888" }}>憑票/收據</td>
              </tr>
            ))}
            <tr style={{ borderBottom: `1px solid ${C.borderLight}` }}>
              <td style={{ padding: "6px 10px" }}>餐費</td>
              <td style={{ padding: "6px 10px", color: "#888" }}>全體口委</td>
              <td style={{ padding: "6px 10px", color: "#888" }}>口試當日</td>
              <td style={{ padding: "6px 10px", borderBottom: "1px solid #bbb" }}></td>
              <td style={{ padding: "6px 10px", color: "#888" }}>憑發票</td>
            </tr>
            <tr style={{ background: "#f5f3f8", fontWeight: "bold" }}>
              <td colSpan={3} style={{ padding: "8px 10px", textAlign: "right", color: C.textMid }}>合計</td>
              <td style={{ padding: "8px 10px", borderBottom: `2px solid ${C.accentMid}` }}></td>
              <td style={{ padding: "8px 10px" }}></td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "space-around", fontSize: 12, marginTop: 24 }}>
          {["申請人（學生）", "指導教授", "系所主管核章"].map(l => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ borderBottom: "1px solid #bbb", width: 110, marginBottom: 4 }}>&nbsp;</div>
              <div style={{ color: "#888" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 匯款資料 */}
      {externalCommittees.length > 0 && (
        <div style={{ background: "#f8f6fb", border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "20px 28px" }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: C.textMid, marginBottom: 12, borderBottom: `1px solid ${C.borderLight}`, paddingBottom: 6 }}>
            校外委員匯款資料彙整
          </div>
          {externalCommittees.map((c, i) => (
            <div key={i} style={{ marginBottom: 14, background: "#fff", borderRadius: 8, padding: "12px 16px", border: `1px solid ${C.borderLight}` }}>
              <div style={{ fontWeight: "bold", color: C.text, marginBottom: 6 }}>
                {c.name || `校外委員 ${i + 1}`}
                <span style={{ fontWeight: "normal", fontSize: 12, color: C.label, marginLeft: 8 }}>
                  {c.affiliation} {c.title}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12 }}>
                {[
                  ["銀行代碼", c.bankCode],
                  ["銀行名稱", c.bankName],
                  ["帳號", c.account],
                  ["戶名", c.accountName],
                  ["聯絡電話", c.phone],
                  ["Email", c.email],
                ].map(([l, v]) => (
                  <div key={l}>
                    <span style={{ color: C.label }}>{l}：</span>
                    <span style={{ fontWeight: v ? 500 : "normal", color: v ? C.text : "#ddd" }}>{v || "—"}</span>
                  </div>
                ))}
              </div>
              {c.transport !== "不需要" && (
                <div style={{ marginTop: 8, fontSize: 12, background: C.accentSoft, borderRadius: 6, padding: "6px 10px", color: C.textMid }}>
                  🚌 交通費：{c.transport}{c.transportNote ? ` — ${c.transportNote}` : ""}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── main ───────────────────────────────────────────────────────────────────
export default function App() {
  const [student, setStudent] = useState({
    name: "", studentId: "", dept: "經濟學系", degree: "碩士",
    year: "114", semester: "2", advisor: "", coAdvisor: "",
  });
  const [defense, setDefense] = useState({
    date: "", startTime: "", endTime: "", venue: "",
    venueRoom: "", venueBuilding: "", thesisTitle: "", thesisTitleEn: "",
  });
  const [committees, setCommittees] = useState([initCommittee(), initCommittee(), initCommittee()]);
  const [chairIdx, setChairIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("form");
  const [copied, setCopied] = useState("");

  const setS = (k, v) => setStudent(p => ({ ...p, [k]: v }));
  const setD = (k, v) => setDefense(p => ({ ...p, [k]: v }));
  const setC = (i, k, v) => setCommittees(p => p.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  const addCommittee = () => setCommittees(p => [...p, initCommittee()]);
  const removeCommittee = (i) => {
    setCommittees(p => p.filter((_, idx) => idx !== i));
    if (chairIdx >= i && chairIdx > 0) setChairIdx(chairIdx - 1);
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const externalCommittees = committees.filter(c => c.type === "校外");
  const allFilled = !empty(student.name) && !empty(defense.date) && !empty(defense.venue);

  const excelRow = [
    student.studentId, student.name, student.degree, defense.thesisTitle,
    formatDate(defense.date), defense.startTime, defense.endTime,
    defense.venueBuilding, defense.venueRoom,
    ...committees.flatMap(c => [c.name, c.type]),
  ].join("\t");

  const tabs = [
    { id: "form",          label: "📝 填寫資料" },
    { id: "application",   label: "📄 申請單" },
    { id: "excel",         label: "📊 Excel 紀錄" },
    { id: "venue",         label: "🏛 場地資訊" },
    { id: "reimbursement", label: "💴 核銷文件" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Noto Sans TC', sans-serif" }}>

      {/* ── header ── */}
      <div style={{ background: C.header, borderBottom: `1px solid ${C.headerBorder}` }}>
        <div style={{ padding: "24px 32px 20px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: C.label, marginBottom: 4 }}>
            NATIONAL TAIWAN UNIVERSITY · DEPARTMENT OF ECONOMICS
          </div>
          <h1 style={{ fontSize: 22, fontWeight: "bold", color: "#221e30", margin: "0 0 4px", letterSpacing: 1 }}>
            研究生學位口試行政工具
          </h1>
          <div style={{ fontSize: 12, color: C.label }}>
            Graduate Thesis Defense Administrative Assistant
          </div>
        </div>
      </div>

      {/* ── tabs ── */}
      <div style={{ display: "flex", background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 24px", overflowX: "auto" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "12px 18px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              color: activeTab === t.id ? C.tabActive : "#888",
              fontWeight: activeTab === t.id ? "bold" : "normal",
              borderBottom: activeTab === t.id ? `2.5px solid ${C.tabLine}` : "2.5px solid transparent",
              whiteSpace: "nowrap",
              transition: "all .15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── content ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* FORM */}
        {activeTab === "form" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <section style={sectionStyle}>
              <div style={sectionTitle}>👤 學生基本資料</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                <div style={fieldGroup}><label style={labelStyle}>姓名 *</label><input style={inputStyle} value={student.name} onChange={e => setS("name", e.target.value)} placeholder="王大明" /></div>
                <div style={fieldGroup}><label style={labelStyle}>學號 *</label><input style={inputStyle} value={student.studentId} onChange={e => setS("studentId", e.target.value)} placeholder="R12345678" /></div>
                <div style={fieldGroup}><label style={labelStyle}>學位</label>
                  <select style={inputStyle} value={student.degree} onChange={e => setS("degree", e.target.value)}>
                    <option>碩士</option><option>博士</option>
                  </select>
                </div>
                <div style={fieldGroup}><label style={labelStyle}>學年度</label><input style={inputStyle} value={student.year} onChange={e => setS("year", e.target.value)} placeholder="114" /></div>
                <div style={fieldGroup}><label style={labelStyle}>學期</label>
                  <select style={inputStyle} value={student.semester} onChange={e => setS("semester", e.target.value)}>
                    <option value="1">第一學期</option><option value="2">第二學期</option>
                  </select>
                </div>
                <div style={fieldGroup}><label style={labelStyle}>指導教授</label><input style={inputStyle} value={student.advisor} onChange={e => setS("advisor", e.target.value)} placeholder="張教授" /></div>
                <div style={{ ...fieldGroup, gridColumn: "1/-1" }}>
                  <label style={labelStyle}>共同指導教授（選填）</label>
                  <input style={inputStyle} value={student.coAdvisor} onChange={e => setS("coAdvisor", e.target.value)} placeholder="李教授" />
                </div>
              </div>
            </section>

            <section style={sectionStyle}>
              <div style={sectionTitle}>📋 論文題目 & 口試資訊</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={fieldGroup}><label style={labelStyle}>論文題目（中文）</label><input style={inputStyle} value={defense.thesisTitle} onChange={e => setD("thesisTitle", e.target.value)} placeholder="台灣勞動市場的…" /></div>
                <div style={fieldGroup}><label style={labelStyle}>論文題目（英文）</label><input style={inputStyle} value={defense.thesisTitleEn} onChange={e => setD("thesisTitleEn", e.target.value)} placeholder="The Effect of..." /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <div style={fieldGroup}><label style={labelStyle}>口試日期 *</label><input type="date" style={inputStyle} value={defense.date} onChange={e => setD("date", e.target.value)} /></div>
                  <div style={fieldGroup}><label style={labelStyle}>開始時間</label><input type="time" style={inputStyle} value={defense.startTime} onChange={e => setD("startTime", e.target.value)} /></div>
                  <div style={fieldGroup}><label style={labelStyle}>結束時間</label><input type="time" style={inputStyle} value={defense.endTime} onChange={e => setD("endTime", e.target.value)} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <div style={fieldGroup}><label style={labelStyle}>借用系統/單位 *</label><input style={inputStyle} value={defense.venue} onChange={e => setD("venue", e.target.value)} placeholder="社科院辦公室" /></div>
                  <div style={fieldGroup}><label style={labelStyle}>建築名稱</label><input style={inputStyle} value={defense.venueBuilding} onChange={e => setD("venueBuilding", e.target.value)} placeholder="社科大樓" /></div>
                  <div style={fieldGroup}><label style={labelStyle}>教室/會議室</label><input style={inputStyle} value={defense.venueRoom} onChange={e => setD("venueRoom", e.target.value)} placeholder="101室" /></div>
                </div>
              </div>
            </section>

            <section style={sectionStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 8, borderBottom: `1px solid ${C.borderLight}` }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: C.textMid }}>👥 口試委員名單</div>
                <button onClick={addCommittee} style={{ background: C.btnBg, border: `1px solid ${C.btnBorder}`, borderRadius: 6, padding: "5px 14px", color: C.btnText, fontSize: 12, cursor: "pointer" }}>
                  ＋ 新增委員
                </button>
              </div>
              {committees.map((c, i) => (
                <div key={i} style={{ background: C.accentSoft, borderRadius: 10, padding: 16, marginBottom: 12, border: `1px solid ${C.borderLight}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: "bold", color: C.textMid }}>委員 {i + 1}</span>
                      <label style={{ fontSize: 12, color: C.label, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                        <input type="radio" name="chair" checked={chairIdx === i} onChange={() => setChairIdx(i)} style={{ accentColor: C.accentMid }} />
                        設為主席
                      </label>
                      {chairIdx === i && (
                        <span style={{ background: C.accentTag, borderRadius: 12, padding: "1px 8px", fontSize: 11, color: C.textMid }}>主席</span>
                      )}
                    </div>
                    {committees.length > 1 && (
                      <button onClick={() => removeCommittee(i)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 100px", gap: 10, marginBottom: 10 }}>
                    <div style={fieldGroup}><label style={labelStyle}>姓名</label><input style={inputStyle} value={c.name} onChange={e => setC(i, "name", e.target.value)} placeholder="陳教授" /></div>
                    <div style={fieldGroup}><label style={labelStyle}>職稱</label><input style={inputStyle} value={c.title} onChange={e => setC(i, "title", e.target.value)} placeholder="教授" /></div>
                    <div style={fieldGroup}><label style={labelStyle}>服務單位</label><input style={inputStyle} value={c.affiliation} onChange={e => setC(i, "affiliation", e.target.value)} placeholder="臺大經濟系" /></div>
                    <div style={fieldGroup}><label style={labelStyle}>類別</label>
                      <select style={inputStyle} value={c.type} onChange={e => setC(i, "type", e.target.value)}>
                        <option>校內</option><option>校外</option>
                      </select>
                    </div>
                  </div>

                  {c.type === "校外" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        <div style={fieldGroup}><label style={labelStyle}>交通費類型</label>
                          <select style={inputStyle} value={c.transport} onChange={e => setC(i, "transport", e.target.value)}>
                            {TRANSPORT_TYPES.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div style={fieldGroup}><label style={labelStyle}>交通費補充說明（選填）</label><input style={inputStyle} value={c.transportNote} onChange={e => setC(i, "transportNote", e.target.value)} placeholder="起訖站、公里數…" /></div>
                      </div>
                      <div style={{ fontSize: 11, color: C.label, marginBottom: 8, background: "#ece8f4", borderRadius: 6, padding: "6px 10px" }}>
                        校外委員匯款資料
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        <div style={fieldGroup}><label style={labelStyle}>銀行代碼</label><input style={inputStyle} value={c.bankCode} onChange={e => setC(i, "bankCode", e.target.value)} placeholder="007" /></div>
                        <div style={fieldGroup}><label style={labelStyle}>銀行名稱</label><input style={inputStyle} value={c.bankName} onChange={e => setC(i, "bankName", e.target.value)} placeholder="第一銀行" /></div>
                        <div style={fieldGroup}><label style={labelStyle}>帳號</label><input style={inputStyle} value={c.account} onChange={e => setC(i, "account", e.target.value)} placeholder="1234567890" /></div>
                        <div style={fieldGroup}><label style={labelStyle}>戶名</label><input style={inputStyle} value={c.accountName} onChange={e => setC(i, "accountName", e.target.value)} placeholder="陳○○" /></div>
                        <div style={fieldGroup}><label style={labelStyle}>聯絡電話</label><input style={inputStyle} value={c.phone} onChange={e => setC(i, "phone", e.target.value)} placeholder="0912345678" /></div>
                        <div style={fieldGroup}><label style={labelStyle}>Email</label><input style={inputStyle} value={c.email} onChange={e => setC(i, "email", e.target.value)} placeholder="chen@ntu.edu.tw" /></div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>

            {!allFilled && (
              <div style={{ textAlign: "center", fontSize: 12, color: C.label }}>
                請填寫學生姓名、口試日期與場地後，即可切換產出頁面 ✦
              </div>
            )}
            {allFilled && (
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setActiveTab("application")}
                  style={{ background: `linear-gradient(135deg, ${C.accentMid}, ${C.accent})`, color: "#fff", border: "none", borderRadius: 8, padding: "12px 32px", fontSize: 14, cursor: "pointer", boxShadow: "0 3px 10px rgba(90,80,110,.3)" }}
                >
                  查看產出文件 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* APPLICATION */}
        {activeTab === "application" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button onClick={() => window.print()} style={{ background: C.btnBg, border: `1px solid ${C.btnBorder}`, borderRadius: 6, padding: "7px 20px", color: C.btnText, fontSize: 13, cursor: "pointer" }}>
                🖨 列印申請單
              </button>
            </div>
            <ApplicationDoc student={student} defense={defense} committees={committees} chairIdx={chairIdx} />
          </div>
        )}

        {/* EXCEL */}
        {activeTab === "excel" && (
          <div style={{ background: C.surface, borderRadius: 12, padding: 28, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 13, fontWeight: "bold", color: C.textMid, marginBottom: 16 }}>
              📊 Excel 紀錄列（一鍵複製貼上）
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>
              複製後直接貼到 Excel 追蹤表，欄位順序如下：
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              {["學號", "姓名", "學位", "論文題目", "口試日期", "開始", "結束", "建築", "教室",
                ...committees.flatMap((_, i) => [`口委${i + 1}`, "類別"])
              ].map((h, i) => (
                <span key={i} style={{ background: C.accentSoft, borderRadius: 4, padding: "3px 8px", fontSize: 11, color: C.textMid }}>{h}</span>
              ))}
            </div>
            <pre style={{ background: C.accentSoft, border: `1px solid ${C.borderLight}`, borderRadius: 8, padding: "14px 16px", fontSize: 12, overflowX: "auto", color: C.text, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {excelRow || "（請先填寫資料）"}
            </pre>
            <button
              onClick={() => copyText(excelRow, "excel")}
              style={{ marginTop: 12, background: copied === "excel" ? "#d4e8d4" : C.btnBg, border: `1px solid ${C.btnBorder}`, borderRadius: 6, padding: "8px 22px", color: copied === "excel" ? "#2a7a2a" : C.btnText, fontSize: 13, cursor: "pointer", transition: "all .2s" }}
            >
              {copied === "excel" ? "✓ 已複製！" : "複製此列"}
            </button>
          </div>
        )}

        {/* VENUE */}
        {activeTab === "venue" && (
          <VenueInfo student={student} defense={defense} committees={committees} />
        )}

        {/* REIMBURSEMENT */}
        {activeTab === "reimbursement" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button onClick={() => window.print()} style={{ background: C.btnBg, border: `1px solid ${C.btnBorder}`, borderRadius: 6, padding: "7px 20px", color: C.btnText, fontSize: 13, cursor: "pointer" }}>
                🖨 列印核銷文件
              </button>
            </div>
            <ReimbursementDoc defense={defense} committees={committees} externalCommittees={externalCommittees} />
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        input:focus, select:focus {
          border-color: ${C.accentMid} !important;
          box-shadow: 0 0 0 3px rgba(100,90,120,.15);
        }
        @media print {
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
