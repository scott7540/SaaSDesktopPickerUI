import { useState, useRef, useEffect } from "react"

const TAGS = [
  "全部",
  "Prompt-Engineering",
  "Thinking-Frameworks",
  "Research-Analysis",
  "Content-Summary",
  "Business-Startup",
  "AI-Build-Coding",
  "Daily-Intelligence",
]

const ALL_ITEMS = [
  {
    id: 1,
    title: "洞见专家",
    body: "深度分析与洞察力提升框架，突破认知盲区",
    pinned: true,
    tag: "Thinking-Frameworks",
    shortcut: "⌘1",
  },
  {
    id: 2,
    title: "第一性原理思维导师 · 终极通用版",
    body: "还原事物本质，从基础假设重构解决方案",
    pinned: false,
    tag: "Thinking-Frameworks",
    shortcut: "⌘2",
  },
  {
    id: 3,
    title: "反方教练",
    body: "挑战你的每一个假设，强化论证的逻辑严密性",
    pinned: false,
    tag: "Prompt-Engineering",
    shortcut: "⌘3",
  },
  {
    id: 4,
    title: "提问专家",
    body: "生成精准问题序列，引导深层思考与探索",
    pinned: false,
    tag: "Prompt-Engineering",
    shortcut: "⌘4",
  },
  {
    id: 5,
    title: "商业模式分析师",
    body: "拆解竞争格局、价值主张与盈利逻辑",
    pinned: false,
    tag: "Business-Startup",
    shortcut: "⌘5",
  },
  {
    id: 6,
    title: "AI 产品需求文档生成器",
    body: "将模糊想法转化为结构化 PRD 文档",
    pinned: false,
    tag: "AI-Build-Coding",
    shortcut: "",
  },
  {
    id: 7,
    title: "每日情报摘要",
    body: "聚合多源信息，提炼关键信号与趋势判断",
    pinned: false,
    tag: "Daily-Intelligence",
    shortcut: "",
  },
]

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 1h3v3M11 1 6.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.5 7.5A5.5 5.5 0 0 1 6.5 13 5.5 5.5 0 0 1 1 7.5 5.5 5.5 0 0 1 6.5 2c-.5 1-.8 2.2-.8 3.5a5.3 5.3 0 0 0 6.8 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M10.01 3.99l1.06-1.06M2.93 11.07l1.06-1.06" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M4 5l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTag, setActiveTag] = useState("全部")
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [pasted, setPasted] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = ALL_ITEMS.filter((item) => {
    const matchesTag = activeTag === "全部" || item.tag === activeTag
    const matchesQuery =
      query === "" ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.body.toLowerCase().includes(query.toLowerCase())
    return matchesTag && matchesQuery
  })

  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  useEffect(() => {
    setFocusedIndex(0)
  }, [query, activeTag])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((i) => Math.min(i + 1, sorted.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      handlePaste()
    } else if (e.key === "Escape") {
      setQuery("")
    }
  }

  const handlePaste = () => {
    setPasted(true)
    setTimeout(() => setPasted(false), 1800)
  }

  const visibleTags = tagsExpanded ? TAGS : TAGS.slice(0, 5)

  return (
    <div
      className={`size-full flex items-center justify-center transition-colors duration-300 ${dark ? "bg-[#0d0d0d]" : "bg-[#f0f0ee]"}`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      onKeyDown={handleKeyDown}
    >
      {/* Theme toggle — outside the card */}
      <button
        onClick={() => setDark((d) => !d)}
        className={`absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
          dark
            ? "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80"
            : "bg-black/8 text-black/50 hover:bg-black/12 hover:text-black/70"
        }`}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
        {dark ? "Light" : "Dark"}
      </button>

      {/* Card */}
      <div
        className={`w-[420px] rounded-[12px] flex flex-col overflow-hidden transition-all duration-300 ${
          dark
            ? "bg-[#161616] border border-white/[0.08]"
            : "bg-white border border-black/[0.07]"
        }`}
        style={{
          boxShadow: dark
            ? "0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)"
            : "0 0 0 1px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 pt-4 pb-3`}>
          <span
            className={`text-base font-semibold tracking-[-0.01em] ${dark ? "text-white" : "text-[#111]"}`}
          >
            Picker
          </span>
          <a
            href="#"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer select-none ${
              dark
                ? "text-white/45 hover:text-white/75 hover:bg-white/[0.07]"
                : "text-black/40 hover:text-black/65 hover:bg-black/[0.05]"
            }`}
          >
            Library
            <ExternalLinkIcon />
          </a>
        </div>

        {/* Search */}
        <div className="px-3 pb-2.5">
          <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-[8px] transition-all duration-200 ${
              dark
                ? `bg-white/[0.06] border ${searchFocused ? "border-white/20 shadow-[0_0_0_3px_rgba(255,255,255,0.07)]" : "border-white/[0.08]"}`
                : `bg-black/[0.04] border ${searchFocused ? "border-black/20 shadow-[0_0_0_3px_rgba(0,0,0,0.06)]" : "border-transparent"}`
            }`}
          >
            <SearchIcon className={`shrink-0 ${dark ? "text-white/30" : "text-black/30"}`} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="搜索标题或正文"
              className={`flex-1 bg-transparent text-sm outline-none placeholder:font-normal leading-none ${
                dark
                  ? "text-white placeholder:text-white/25"
                  : "text-[#111] placeholder:text-black/30"
              }`}
              style={{ fontSize: "14px" }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                  dark ? "text-white/30 hover:text-white/60" : "text-black/30 hover:text-black/55"
                }`}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="px-3 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer select-none leading-none ${
                  activeTag === tag
                    ? dark
                      ? "bg-white text-[#111]"
                      : "bg-[#111] text-white"
                    : dark
                    ? "bg-white/[0.07] text-white/50 hover:bg-white/[0.11] hover:text-white/70"
                    : "bg-black/[0.06] text-black/50 hover:bg-black/[0.09] hover:text-black/70"
                }`}
              >
                {tag}
              </button>
            ))}
            <button
              onClick={() => setTagsExpanded((v) => !v)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer select-none leading-none flex items-center gap-0.5 ${
                dark
                  ? "bg-white/[0.07] text-white/40 hover:bg-white/[0.11] hover:text-white/60"
                  : "bg-black/[0.06] text-black/35 hover:bg-black/[0.09] hover:text-black/55"
              }`}
            >
              <ChevronIcon
                className={`transition-transform duration-200 ${tagsExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={`mx-3 mb-1 h-px ${dark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`} />

        {/* List */}
        <div className="px-2 py-1 max-h-[280px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {sorted.length === 0 ? (
            <div
              className={`py-10 text-center text-sm ${dark ? "text-white/20" : "text-black/25"}`}
            >
              没有匹配的提示词
            </div>
          ) : (
            sorted.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setFocusedIndex(index)
                  handlePaste()
                }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`flex items-center gap-3 px-2.5 rounded-[8px] cursor-pointer transition-all duration-100 group ${
                  focusedIndex === index
                    ? dark
                      ? "bg-white/[0.08]"
                      : "bg-black/[0.05]"
                    : "bg-transparent"
                }`}
                style={{ height: "50px" }}
              >
                {/* Title & body */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium leading-snug truncate ${
                      dark ? "text-white/90" : "text-[#111]"
                    }`}
                  >
                    {item.title}
                  </div>
                  <div
                    className={`text-xs leading-snug truncate mt-0.5 ${
                      dark ? "text-white/35" : "text-black/38"
                    }`}
                  >
                    {item.body}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.pinned && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold leading-none"
                      style={{
                        background: dark ? "rgba(251,191,36,0.18)" : "rgba(251,191,36,0.15)",
                        color: dark ? "#fbbf24" : "#b45309",
                        border: `1px solid ${dark ? "rgba(251,191,36,0.25)" : "rgba(251,191,36,0.3)"}`,
                      }}
                    >
                      置顶
                    </span>
                  )}
                  {focusedIndex === index && item.shortcut && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono leading-none transition-opacity duration-100 ${
                        dark
                          ? "bg-white/[0.08] text-white/40 border border-white/[0.1]"
                          : "bg-black/[0.06] text-black/40 border border-black/[0.08]"
                      }`}
                    >
                      {item.shortcut}
                    </span>
                  )}
                  {focusedIndex === index && !item.shortcut && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono leading-none transition-opacity duration-100 ${
                        dark
                          ? "bg-white/[0.08] text-white/40 border border-white/[0.1]"
                          : "bg-black/[0.06] text-black/40 border border-black/[0.08]"
                      }`}
                    >
                      ↵
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className={`mt-1 px-4 py-3 flex items-center justify-between border-t ${
            dark ? "border-white/[0.07]" : "border-black/[0.07]"
          }`}
        >
          {/* Status */}
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${pasted ? "bg-amber-400" : "bg-emerald-400"}`}
              style={{
                boxShadow: pasted
                  ? "0 0 0 3px rgba(251,191,36,0.2)"
                  : "0 0 0 3px rgba(52,211,153,0.2)",
              }}
            />
            <span
              className={`text-xs font-medium ${dark ? "text-white/35" : "text-black/35"}`}
            >
              {pasted ? "已粘贴" : "已就绪"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuery("")}
              className={`px-3 py-1.5 rounded-[7px] text-xs font-medium transition-all duration-150 cursor-pointer ${
                dark
                  ? "text-white/40 hover:text-white/65 hover:bg-white/[0.07]"
                  : "text-black/40 hover:text-black/60 hover:bg-black/[0.05]"
              }`}
            >
              取消 <span className={`font-normal ${dark ? "text-white/25" : "text-black/25"}`}>(Esc)</span>
            </button>
            <button
              onClick={handlePaste}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-xs font-semibold transition-all duration-150 cursor-pointer ${
                dark
                  ? "bg-white text-[#111] hover:bg-white/90 active:scale-[0.97]"
                  : "bg-[#111] text-white hover:bg-[#222] active:scale-[0.97]"
              }`}
              style={{ letterSpacing: "-0.01em" }}
            >
              粘贴
              <span
                className={`text-[10px] font-mono font-normal opacity-60`}
              >
                ↵
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
