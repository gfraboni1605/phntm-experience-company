(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/PageTransition.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageTransition",
    ()=>PageTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// Each destination has its own curtain direction so the section reveal
// has a consistent gesture regardless of where you came from.
function directionFor(pathname) {
    if (pathname === "/" || pathname === "") return "up";
    if (pathname.startsWith("/work")) return "right";
    if (pathname.startsWith("/about")) return "left";
    if (pathname.startsWith("/contact")) return "down";
    return "down";
}
function PageTransition() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("down");
    const pendingHrefRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingPathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 1) Intercept anchor clicks in CAPTURE phase so we run before Next.js Link's
    //    onClick (which calls preventDefault + router.push in bubble phase).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            const onClick = {
                "PageTransition.useEffect.onClick": (e)=>{
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    if (e.button !== 0) return;
                    const anchor = e.target?.closest?.("a") ?? null;
                    if (!anchor) return;
                    if (anchor.target && anchor.target !== "_self") return;
                    if (anchor.hasAttribute("download")) return;
                    if (anchor.hasAttribute("data-copy-email")) return;
                    const href = anchor.getAttribute("href");
                    if (!href) return;
                    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || /^https?:\/\//i.test(href)) {
                        return;
                    }
                    let url;
                    try {
                        url = new URL(href, window.location.origin);
                    } catch  {
                        return;
                    }
                    if (url.origin !== window.location.origin) return;
                    if (url.pathname === window.location.pathname) return; // same-page anchor scroll
                    // preventDefault only — Next.js Link's onClick bails when defaultPrevented,
                    // so no double-push. We deliberately do NOT stopPropagation: SiteEffects'
                    // bubble-phase listener needs to fire on link clicks inside the open mobile
                    // nav so it can call closeNav() (which clears document.body.style.overflow).
                    // Without that, navigating from inside the mobile nav leaves the body locked.
                    e.preventDefault();
                    pendingHrefRef.current = href;
                    pendingPathRef.current = url.pathname;
                    setDirection(directionFor(url.pathname));
                    setPhase("covering");
                }
            }["PageTransition.useEffect.onClick"];
            document.addEventListener("click", onClick, true);
            return ({
                "PageTransition.useEffect": ()=>document.removeEventListener("click", onClick, true)
            })["PageTransition.useEffect"];
        }
    }["PageTransition.useEffect"], []);
    // 2) After the curtain covers, kick the actual navigation and move to "covered".
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            if (phase !== "covering") return;
            const t = window.setTimeout({
                "PageTransition.useEffect.t": ()=>{
                    const href = pendingHrefRef.current;
                    if (href) router.push(href);
                    setPhase("covered");
                }
            }["PageTransition.useEffect.t"], 200);
            return ({
                "PageTransition.useEffect": ()=>window.clearTimeout(t)
            })["PageTransition.useEffect"];
        }
    }["PageTransition.useEffect"], [
        phase,
        router
    ]);
    // 3) Hold the covered state for a beat so the P mark can flash, then uncover.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            if (phase !== "covered") return;
            if (pathname !== pendingPathRef.current) return;
            const t = window.setTimeout({
                "PageTransition.useEffect.t": ()=>setPhase("uncovering")
            }["PageTransition.useEffect.t"], 280);
            return ({
                "PageTransition.useEffect": ()=>window.clearTimeout(t)
            })["PageTransition.useEffect"];
        }
    }["PageTransition.useEffect"], [
        phase,
        pathname
    ]);
    // 4) After the uncover animation, clear state.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTransition.useEffect": ()=>{
            if (phase !== "uncovering") return;
            const t = window.setTimeout({
                "PageTransition.useEffect.t": ()=>{
                    pendingHrefRef.current = null;
                    pendingPathRef.current = null;
                    setPhase("idle");
                }
            }["PageTransition.useEffect.t"], 260);
            return ({
                "PageTransition.useEffect": ()=>window.clearTimeout(t)
            })["PageTransition.useEffect"];
        }
    }["PageTransition.useEffect"], [
        phase
    ]);
    if (phase === "idle") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `page-transition page-transition--${phase} page-transition--${direction}`,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            className: "page-transition__mark",
            src: "/brand/mark-white.svg",
            alt: ""
        }, void 0, false, {
            fileName: "[project]/components/PageTransition.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/PageTransition.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(PageTransition, "N/aYgGYOTCzHiJmy/ogXQvHI908=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = PageTransition;
var _c;
__turbopack_context__.k.register(_c, "PageTransition");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Preloader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Preloader",
    ()=>Preloader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Preloader() {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("initial");
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Preloader.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (sessionStorage.getItem("phntm-loaded") === "1") {
                setPhase("done");
                return;
            }
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                sessionStorage.setItem("phntm-loaded", "1");
                setPhase("done");
                return;
            }
            document.body.style.overflow = "hidden";
            // Eased counter ramp 0 → 100 across ~2.1s
            let counterStart = 0;
            let counterRaf = 0;
            const tickCounter = {
                "Preloader.useEffect.tickCounter": (ts)=>{
                    if (!counterStart) counterStart = ts;
                    const elapsed = ts - counterStart;
                    const t = Math.min(1, elapsed / 2100);
                    const eased = 1 - Math.pow(1 - t, 3);
                    setCount(Math.min(100, Math.round(eased * 100)));
                    if (t < 1) counterRaf = requestAnimationFrame(tickCounter);
                }
            }["Preloader.useEffect.tickCounter"];
            counterRaf = requestAnimationFrame(tickCounter);
            const t1 = window.setTimeout({
                "Preloader.useEffect.t1": ()=>setPhase("framing")
            }["Preloader.useEffect.t1"], 100);
            const t2 = window.setTimeout({
                "Preloader.useEffect.t2": ()=>setPhase("revealing")
            }["Preloader.useEffect.t2"], 280);
            const t3 = window.setTimeout({
                "Preloader.useEffect.t3": ()=>setPhase("settled")
            }["Preloader.useEffect.t3"], 1280);
            const t4 = window.setTimeout({
                "Preloader.useEffect.t4": ()=>setPhase("flashing")
            }["Preloader.useEffect.t4"], 2000);
            const t5 = window.setTimeout({
                "Preloader.useEffect.t5": ()=>setPhase("exiting")
            }["Preloader.useEffect.t5"], 2200);
            const t6 = window.setTimeout({
                "Preloader.useEffect.t6": ()=>{
                    setPhase("done");
                    document.body.style.overflow = "";
                    sessionStorage.setItem("phntm-loaded", "1");
                }
            }["Preloader.useEffect.t6"], 3100);
            return ({
                "Preloader.useEffect": ()=>{
                    [
                        t1,
                        t2,
                        t3,
                        t4,
                        t5,
                        t6
                    ].forEach({
                        "Preloader.useEffect": (id)=>window.clearTimeout(id)
                    }["Preloader.useEffect"]);
                    cancelAnimationFrame(counterRaf);
                    document.body.style.overflow = "";
                }
            })["Preloader.useEffect"];
        }
    }["Preloader.useEffect"], []);
    if (phase === "done") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `preloader preloader--${phase}`,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader__counter",
                children: String(count).padStart(3, "0")
            }, void 0, false, {
                fileName: "[project]/components/Preloader.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader__corner preloader__corner--tl",
                children: "PHNTM / 2018"
            }, void 0, false, {
                fileName: "[project]/components/Preloader.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader__corner preloader__corner--bl",
                children: "An Experience Company"
            }, void 0, false, {
                fileName: "[project]/components/Preloader.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader__center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "preloader__logo-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            className: "preloader__logo",
                            src: "/brand/logo-primary-white.svg",
                            alt: ""
                        }, void 0, false, {
                            fileName: "[project]/components/Preloader.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Preloader.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "preloader__eyebrow",
                        children: "Imagined. Realized."
                    }, void 0, false, {
                        fileName: "[project]/components/Preloader.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Preloader.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "preloader__flash"
            }, void 0, false, {
                fileName: "[project]/components/Preloader.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Preloader.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(Preloader, "cLv11KzI93VFuBVxKE4mXlJRr8Y=");
_c = Preloader;
var _c;
__turbopack_context__.k.register(_c, "Preloader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SiteEffects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteEffects",
    ()=>SiteEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SiteEffects() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteEffects.useEffect": ()=>{
            document.documentElement.classList.add("reveal-ready");
            document.documentElement.classList.remove("reveal-done");
        }
    }["SiteEffects.useEffect"], []);
    // Reveal animations — recompute when route changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteEffects.useEffect": ()=>{
            let nodes = Array.from(document.querySelectorAll("[data-reveal]"));
            if (!nodes.length) return;
            const check = {
                "SiteEffects.useEffect.check": ()=>{
                    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
                    nodes = nodes.filter({
                        "SiteEffects.useEffect.check": (n)=>{
                            const r = n.getBoundingClientRect();
                            if (r.top < vh * 0.92 && r.bottom > -40) {
                                n.classList.add("is-in");
                                return false;
                            }
                            return true;
                        }
                    }["SiteEffects.useEffect.check"]);
                }
            }["SiteEffects.useEffect.check"];
            let ticking = false;
            const onScroll = {
                "SiteEffects.useEffect.onScroll": ()=>{
                    if (ticking) return;
                    ticking = true;
                    requestAnimationFrame({
                        "SiteEffects.useEffect.onScroll": ()=>{
                            ticking = false;
                            check();
                        }
                    }["SiteEffects.useEffect.onScroll"]);
                }
            }["SiteEffects.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            window.addEventListener("resize", onScroll);
            check();
            requestAnimationFrame(check);
            const safety = window.setTimeout({
                "SiteEffects.useEffect.safety": ()=>{
                    document.documentElement.classList.add("reveal-done");
                    document.querySelectorAll("[data-reveal]").forEach({
                        "SiteEffects.useEffect.safety": (n)=>n.classList.add("is-in")
                    }["SiteEffects.useEffect.safety"]);
                }
            }["SiteEffects.useEffect.safety"], 1100);
            return ({
                "SiteEffects.useEffect": ()=>{
                    window.removeEventListener("scroll", onScroll);
                    window.removeEventListener("resize", onScroll);
                    window.clearTimeout(safety);
                }
            })["SiteEffects.useEffect"];
        }
    }["SiteEffects.useEffect"], [
        pathname
    ]);
    // Header hairline on scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteEffects.useEffect": ()=>{
            const head = document.querySelector(".site-head");
            if (!head) return;
            const update = {
                "SiteEffects.useEffect.update": ()=>{
                    head.classList.toggle("is-scrolled", (window.scrollY || 0) > 6);
                }
            }["SiteEffects.useEffect.update"];
            window.addEventListener("scroll", update, {
                passive: true
            });
            update();
            return ({
                "SiteEffects.useEffect": ()=>window.removeEventListener("scroll", update)
            })["SiteEffects.useEffect"];
        }
    }["SiteEffects.useEffect"], [
        pathname
    ]);
    // Active nav state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteEffects.useEffect": ()=>{
            const scale = (searchParams?.get("scale") || "").toLowerCase();
            let active = null;
            if (pathname === "/about") active = "/about";
            else if (pathname === "/contact") active = "/contact";
            else if (pathname === "/work" && (scale === "moments" || scale === "platforms" || scale === "venues")) {
                active = `scale=${scale}`;
            }
            const links = Array.from(document.querySelectorAll(".site-nav a, .nav-contact"));
            links.forEach({
                "SiteEffects.useEffect": (a)=>{
                    const href = a.getAttribute("href") || "";
                    a.classList.toggle("is-active", !!active && href.indexOf(active) > -1);
                }
            }["SiteEffects.useEffect"]);
        }
    }["SiteEffects.useEffect"], [
        pathname,
        searchParams
    ]);
    // Mobile nav + copy email + escape
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SiteEffects.useEffect": ()=>{
            const mnav = document.querySelector(".mobile-nav");
            const closeNav = {
                "SiteEffects.useEffect.closeNav": ()=>{
                    mnav?.classList.remove("is-open");
                    document.body.style.overflow = "";
                }
            }["SiteEffects.useEffect.closeNav"];
            const onClick = {
                "SiteEffects.useEffect.onClick": (e)=>{
                    const target = e.target;
                    if (target.closest("[data-menu-open]")) {
                        mnav?.classList.add("is-open");
                        document.body.style.overflow = "hidden";
                    } else if (target.closest("[data-menu-close]")) {
                        closeNav();
                    } else if (target.closest("a[href]") && mnav?.classList.contains("is-open")) {
                        closeNav();
                    }
                    const copyEl = target.closest("[data-copy-email]");
                    if (copyEl) {
                        e.preventDefault();
                        const email = copyEl.getAttribute("data-copy-email") || "hello@phntm.com";
                        const done = {
                            "SiteEffects.useEffect.onClick.done": ()=>showToast(`Copied · ${email}`)
                        }["SiteEffects.useEffect.onClick.done"];
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(email).then(done, {
                                "SiteEffects.useEffect.onClick": ()=>{
                                    window.location.href = `mailto:${email}`;
                                }
                            }["SiteEffects.useEffect.onClick"]);
                        } else {
                            window.location.href = `mailto:${email}`;
                        }
                    }
                }
            }["SiteEffects.useEffect.onClick"];
            const onKey = {
                "SiteEffects.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") closeNav();
                }
            }["SiteEffects.useEffect.onKey"];
            document.addEventListener("click", onClick);
            document.addEventListener("keydown", onKey);
            return ({
                "SiteEffects.useEffect": ()=>{
                    document.removeEventListener("click", onClick);
                    document.removeEventListener("keydown", onKey);
                }
            })["SiteEffects.useEffect"];
        }
    }["SiteEffects.useEffect"], [
        pathname
    ]);
    return null;
}
_s(SiteEffects, "YDVyypCRLgM/7rjhskFN7EKJ5zY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SiteEffects;
let toastEl = null;
let toastTimer = null;
function showToast(message) {
    if (typeof document === "undefined") return;
    if (!toastEl) {
        toastEl = document.createElement("div");
        toastEl.className = "toast";
        document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(()=>toastEl?.classList.add("is-on"));
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(()=>{
        toastEl?.classList.remove("is-on");
    }, 2200);
}
var _c;
__turbopack_context__.k.register(_c, "SiteEffects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_1mzzl8p._.js.map