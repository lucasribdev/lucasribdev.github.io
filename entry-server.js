import { renderToString } from "react-dom/server";
import { ArrowUpRight, BarChart3, BriefcaseBusiness, Download, FolderGit2, Gamepad2, Github, HeartHandshake, Linkedin, Mail, ShieldCheck, X } from "lucide-react";
import { motion, useInView } from "motion/react";
import * as React$2 from "react";
import React, { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AWS, Cypress, Electron, GoogleCloud, Jest, NestJS, NextJs, NodeJs, PostgreSQL, Prisma, React as React$1, ReactQuery, Storybook, Supabase, TailwindCSS, TypeScript, Zod } from "developer-icons";
//#region src/components/TextFade.tsx
function TextFade({ direction, children, className = "", staggerChildren = .1 }) {
	const FADE_DOWN = {
		show: {
			opacity: 1,
			y: 0,
			transition: { type: "spring" }
		},
		hidden: {
			opacity: 0,
			y: direction === "down" ? -18 : 18
		}
	};
	const ref = React$2.useRef(null);
	const isInView = useInView(ref, { once: true });
	return /* @__PURE__ */ jsx(motion.div, {
		ref,
		initial: "hidden",
		animate: isInView ? "show" : "hidden",
		variants: {
			hidden: {},
			show: { transition: { staggerChildren } }
		},
		className,
		children: React$2.Children.map(children, (child) => React$2.isValidElement(child) ? /* @__PURE__ */ jsx(motion.div, {
			variants: FADE_DOWN,
			children: child
		}) : child)
	});
}
//#endregion
//#region src/components/LogoLoop.tsx
var ANIMATION_CONFIG = {
	SMOOTH_TAU: .25,
	MIN_COPIES: 2,
	COPY_HEADROOM: 2
};
var toCssLength = (value) => typeof value === "number" ? `${value}px` : value ?? void 0;
var cx = (...parts) => parts.filter(Boolean).join(" ");
var isNodeLogoItem = (item) => "node" in item;
var useResizeObserver = (callback, containerRef, seqRef, logos, gap, logoHeight, isVertical) => {
	useEffect(() => {
		if (!window.ResizeObserver) {
			const handleResize = () => callback();
			window.addEventListener("resize", handleResize);
			callback();
			return () => window.removeEventListener("resize", handleResize);
		}
		const observers = [containerRef, seqRef].map((ref) => {
			if (!ref.current) return null;
			const observer = new ResizeObserver(callback);
			observer.observe(ref.current);
			return observer;
		});
		callback();
		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [
		callback,
		containerRef,
		seqRef,
		logos,
		gap,
		logoHeight,
		isVertical
	]);
};
var useImageLoader = (seqRef, onLoad, logos, gap, logoHeight, isVertical) => {
	useEffect(() => {
		const images = seqRef.current?.querySelectorAll("img") ?? [];
		if (images.length === 0) {
			onLoad();
			return;
		}
		let remainingImages = images.length;
		const handleImageLoad = () => {
			remainingImages -= 1;
			if (remainingImages === 0) onLoad();
		};
		images.forEach((img) => {
			const htmlImg = img;
			if (htmlImg.complete) handleImageLoad();
			else {
				htmlImg.addEventListener("load", handleImageLoad, { once: true });
				htmlImg.addEventListener("error", handleImageLoad, { once: true });
			}
		});
		return () => {
			images.forEach((img) => {
				img.removeEventListener("load", handleImageLoad);
				img.removeEventListener("error", handleImageLoad);
			});
		};
	}, [
		seqRef,
		onLoad,
		logos,
		gap,
		logoHeight,
		isVertical
	]);
};
var useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
	const rafRef = useRef(null);
	const lastTimestampRef = useRef(null);
	const offsetRef = useRef(0);
	const velocityRef = useRef(0);
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const seqSize = isVertical ? seqHeight : seqWidth;
		if (seqSize > 0) {
			offsetRef.current = (offsetRef.current % seqSize + seqSize) % seqSize;
			const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
			track.style.transform = transformValue;
		}
		if (prefersReduced) {
			track.style.transform = isVertical ? "translate3d(0, 0, 0)" : "translate3d(0, 0, 0)";
			return () => {
				lastTimestampRef.current = null;
			};
		}
		const animate = (timestamp) => {
			if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
			const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1e3;
			lastTimestampRef.current = timestamp;
			const target = isHovered && hoverSpeed !== void 0 ? hoverSpeed : targetVelocity;
			const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
			velocityRef.current += (target - velocityRef.current) * easingFactor;
			if (seqSize > 0) {
				let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
				nextOffset = (nextOffset % seqSize + seqSize) % seqSize;
				offsetRef.current = nextOffset;
				const transformValue = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
				track.style.transform = transformValue;
			}
			rafRef.current = requestAnimationFrame(animate);
		};
		rafRef.current = requestAnimationFrame(animate);
		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			lastTimestampRef.current = null;
		};
	}, [
		trackRef,
		targetVelocity,
		seqWidth,
		seqHeight,
		isHovered,
		hoverSpeed,
		isVertical
	]);
};
var LogoLoop = React.memo(({ logos, speed = 120, direction = "left", width = "100%", logoHeight = 28, gap = 32, pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor, scaleOnHover = false, renderItem, ariaLabel = "Partner logos", className, style }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const seqRef = useRef(null);
	const [seqWidth, setSeqWidth] = useState(0);
	const [seqHeight, setSeqHeight] = useState(0);
	const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
	const [isHovered, setIsHovered] = useState(false);
	const effectiveHoverSpeed = useMemo(() => {
		if (hoverSpeed !== void 0) return hoverSpeed;
		if (pauseOnHover === true) return 0;
		if (pauseOnHover === false) return void 0;
		return 0;
	}, [hoverSpeed, pauseOnHover]);
	const isVertical = direction === "up" || direction === "down";
	const targetVelocity = useMemo(() => {
		const magnitude = Math.abs(speed);
		let directionMultiplier;
		if (isVertical) directionMultiplier = direction === "up" ? 1 : -1;
		else directionMultiplier = direction === "left" ? 1 : -1;
		const speedMultiplier = speed < 0 ? -1 : 1;
		return magnitude * directionMultiplier * speedMultiplier;
	}, [
		speed,
		direction,
		isVertical
	]);
	const updateDimensions = useCallback(() => {
		const containerWidth = containerRef.current?.clientWidth ?? 0;
		const sequenceRect = seqRef.current?.getBoundingClientRect?.();
		const sequenceWidth = sequenceRect?.width ?? 0;
		const sequenceHeight = sequenceRect?.height ?? 0;
		if (isVertical) {
			const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
			if (containerRef.current && parentHeight > 0) {
				const targetHeight = Math.ceil(parentHeight);
				if (containerRef.current.style.height !== `${targetHeight}px`) containerRef.current.style.height = `${targetHeight}px`;
			}
			if (sequenceHeight > 0) {
				setSeqHeight(Math.ceil(sequenceHeight));
				const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
				const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
				setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
			}
		} else if (sequenceWidth > 0) {
			setSeqWidth(Math.ceil(sequenceWidth));
			const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
			setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
		}
	}, [isVertical]);
	useResizeObserver(updateDimensions, containerRef, seqRef, logos, gap, logoHeight, isVertical);
	useImageLoader(seqRef, updateDimensions, logos, gap, logoHeight, isVertical);
	useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);
	const cssVariables = useMemo(() => ({
		"--logoloop-gap": `${gap}px`,
		"--logoloop-logoHeight": `${logoHeight}px`,
		...fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }
	}), [
		gap,
		logoHeight,
		fadeOutColor
	]);
	const rootClasses = useMemo(() => cx("relative group", isVertical ? "overflow-hidden h-full inline-block" : "overflow-x-hidden", "[--logoloop-gap:32px]", "[--logoloop-logoHeight:28px]", "[--logoloop-fadeColorAuto:#ffffff]", "dark:[--logoloop-fadeColorAuto:#0b0b0b]", scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]", className), [
		isVertical,
		scaleOnHover,
		className
	]);
	const handleMouseEnter = useCallback(() => {
		if (effectiveHoverSpeed !== void 0) setIsHovered(true);
	}, [effectiveHoverSpeed]);
	const handleMouseLeave = useCallback(() => {
		if (effectiveHoverSpeed !== void 0) setIsHovered(false);
	}, [effectiveHoverSpeed]);
	const renderLogoItem = useCallback((item, key, isDuplicate) => {
		if (renderItem) return /* @__PURE__ */ jsx("li", {
			className: cx("flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]", isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]", scaleOnHover && "overflow-visible group/item"),
			role: "listitem",
			children: renderItem(item, key)
		}, key);
		const isNodeItem = isNodeLogoItem(item);
		const itemTitle = isNodeItem ? item.title : item.title ?? item.alt;
		const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;
		const visual = isNodeItem ? /* @__PURE__ */ jsx("span", {
			"aria-hidden": !!itemTitle,
			children: item.node
		}) : /* @__PURE__ */ jsx("img", {
			className: cx("h-[1em] w-auto block object-contain", "[-webkit-user-drag:none] pointer-events-none", "[image-rendering:-webkit-optimize-contrast]"),
			src: item.src,
			srcSet: item.srcSet,
			sizes: item.sizes,
			width: item.width,
			height: item.height,
			alt: itemTitle ? "" : item.alt ?? "",
			title: item.title,
			loading: "lazy",
			decoding: "async",
			draggable: false
		});
		const content = /* @__PURE__ */ jsxs("span", {
			className: cx("inline-flex items-center gap-3 whitespace-nowrap", "motion-reduce:transition-none", scaleOnHover && "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"),
			children: [/* @__PURE__ */ jsx("span", {
				className: "inline-flex h-[var(--logoloop-logoHeight)] items-center text-[length:var(--logoloop-logoHeight)] leading-none",
				children: visual
			}), itemTitle && /* @__PURE__ */ jsx("span", {
				className: "text-base font-medium leading-none text-muted-foreground",
				children: itemTitle
			})]
		});
		const inner = item.href ? /* @__PURE__ */ jsx("a", {
			className: cx("inline-flex items-center no-underline rounded", "transition-opacity duration-200 ease-linear", "hover:opacity-80", "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"),
			href: item.href,
			"aria-label": itemAriaLabel || "logo link",
			target: "_blank",
			rel: "noreferrer noopener",
			tabIndex: isDuplicate ? -1 : void 0,
			children: content
		}) : content;
		return /* @__PURE__ */ jsx("li", {
			className: cx("flex-none text-[length:var(--logoloop-logoHeight)] leading-[1]", isVertical ? "mb-[var(--logoloop-gap)]" : "mr-[var(--logoloop-gap)]", scaleOnHover && "overflow-visible group/item"),
			role: "listitem",
			children: inner
		}, key);
	}, [
		isVertical,
		scaleOnHover,
		renderItem
	]);
	const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => /* @__PURE__ */ jsx("ul", {
		className: cx("flex items-center", isVertical && "flex-col"),
		role: "list",
		"aria-hidden": copyIndex > 0,
		inert: copyIndex > 0 ? true : void 0,
		ref: copyIndex === 0 ? seqRef : void 0,
		children: logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`, copyIndex > 0))
	}, `copy-${copyIndex}`)), [
		copyCount,
		logos,
		renderLogoItem,
		isVertical
	]);
	return /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: rootClasses,
		style: useMemo(() => ({
			width: isVertical ? toCssLength(width) === "100%" ? void 0 : toCssLength(width) : toCssLength(width) ?? "100%",
			...cssVariables,
			...style
		}), [
			width,
			cssVariables,
			style,
			isVertical
		]),
		role: "region",
		"aria-label": ariaLabel,
		children: [fadeOut && /* @__PURE__ */ jsx(Fragment, { children: isVertical ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: cx("pointer-events-none absolute inset-x-0 top-0 z-10", "h-[clamp(24px,8%,120px)]", "bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]")
		}), /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: cx("pointer-events-none absolute inset-x-0 bottom-0 z-10", "h-[clamp(24px,8%,120px)]", "bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]")
		})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: cx("pointer-events-none absolute inset-y-0 left-0 z-11", "w-[clamp(24px,8%,120px)]", "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]")
		}), /* @__PURE__ */ jsx("div", {
			"aria-hidden": true,
			className: cx("pointer-events-none absolute inset-y-0 right-0 z-11", "w-[clamp(24px,8%,120px)]", "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]")
		})] }) }), /* @__PURE__ */ jsx("div", {
			className: cx("flex will-change-transform select-none relative z-10", "motion-reduce:transform-none", isVertical ? "flex-col h-max w-full" : "flex-row w-max"),
			ref: trackRef,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			children: logoLists
		})]
	});
});
LogoLoop.displayName = "LogoLoop";
//#endregion
//#region src/assets/bra.svg
var bra_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2036%2036'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--twemoji'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cpath%20fill='%23009B3A'%20d='M36%2027a4%204%200%200%201-4%204H4a4%204%200%200%201-4-4V9a4%204%200%200%201%204-4h28a4%204%200%200%201%204%204v18z'%3e%3c/path%3e%3cpath%20fill='%23FEDF01'%20d='M32.728%2018L18%2029.124L3.272%2018L18%206.875z'%3e%3c/path%3e%3ccircle%20fill='%23002776'%20cx='17.976'%20cy='17.924'%20r='6.458'%3e%3c/circle%3e%3cpath%20fill='%23CBE9D4'%20d='M12.277%2014.887a6.406%206.406%200%200%200-.672%202.023c3.995-.29%209.417%201.891%2011.744%204.595c.402-.604.7-1.28.883-2.004c-2.872-2.808-7.917-4.63-11.955-4.614z'%3e%3c/path%3e%3cpath%20fill='%2388C9F9'%20d='M12%2018.233h1v1h-1zm1%202h1v1h-1z'%3e%3c/path%3e%3cpath%20fill='%2355ACEE'%20d='M15%2018.233h1v1h-1zm2%201h1v1h-1zm4%202h1v1h-1zm-3%201h1v1h-1zm3-6h1v1h-1z'%3e%3c/path%3e%3cpath%20fill='%233B88C3'%20d='M19%2020.233h1v1h-1z'%3e%3c/path%3e%3c/svg%3e";
//#endregion
//#region src/assets/ss.png
var ss_default = "/assets/ss-CDmv5OXS.png";
//#endregion
//#region src/assets/templo.png
var templo_default = "/assets/templo-lp_Ntac2.png";
//#endregion
//#region src/assets/usa.svg
var usa_default = "/assets/usa-CE65NKaW.svg";
//#endregion
//#region src/components/CookieConsent.tsx
var analyticsConsentKey = "analytics-consent";
var googleAnalyticsMeasurementId = "G-KKH0GEG07W";
var analyticsConsentChangeEvent = "analytics-consent-change";
function getStoredConsent() {
	if (typeof window === "undefined") return null;
	try {
		const value = window.localStorage.getItem(analyticsConsentKey);
		return value === "accepted" || value === "rejected" ? value : null;
	} catch {
		return null;
	}
}
function updateGoogleAnalyticsConsent(value) {
	const accepted = value === "accepted";
	window[`ga-disable-${googleAnalyticsMeasurementId}`] = !accepted;
	if (accepted) window.gtag?.("event", "page_view");
}
function applyAnalyticsConsent(value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(analyticsConsentKey, value);
	} catch {}
	updateGoogleAnalyticsConsent(value);
	window.dispatchEvent(new CustomEvent(analyticsConsentChangeEvent, { detail: { accepted: value === "accepted" } }));
}
function subscribeToConsentChange(onStoreChange) {
	window.addEventListener(analyticsConsentChangeEvent, onStoreChange);
	window.addEventListener("storage", onStoreChange);
	return () => {
		window.removeEventListener(analyticsConsentChangeEvent, onStoreChange);
		window.removeEventListener("storage", onStoreChange);
	};
}
function getConsentSnapshot() {
	return getStoredConsent();
}
function getServerConsentSnapshot() {
	return "pending";
}
function LegalDialog({ onClose, text, view }) {
	const content = text.legal[view];
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-50 flex items-end bg-background/75 px-4 py-5 backdrop-blur-sm sm:items-center sm:justify-center",
		role: "presentation",
		onClick: onClose,
		children: /* @__PURE__ */ jsxs("section", {
			"aria-labelledby": `${view}-title`,
			"aria-modal": "true",
			className: "max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-2xl sm:p-6",
			role: "dialog",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "font-mono text-xs uppercase tracking-[0.22em] text-primary",
					children: text.legal.eyebrow
				}), /* @__PURE__ */ jsx("h2", {
					id: `${view}-title`,
					className: "mt-2 text-xl font-semibold text-foreground",
					children: content.title
				})] }), /* @__PURE__ */ jsx("button", {
					type: "button",
					"aria-label": text.closeLabel,
					title: text.closeLabel,
					onClick: onClose,
					className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground",
				children: content.sections.map((section) => /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h3", {
					className: "text-base font-semibold text-foreground",
					children: section.title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-2",
					children: section.body
				})] }, section.title))
			})]
		})
	});
}
function CookieConsent({ text }) {
	const consent = useSyncExternalStore(subscribeToConsentChange, getConsentSnapshot, getServerConsentSnapshot);
	const [legalView, setLegalView] = useState(null);
	useEffect(() => {
		if (consent === "accepted" || consent === "rejected") updateGoogleAnalyticsConsent(consent);
	}, [consent]);
	function handleConsent(value) {
		applyAnalyticsConsent(value);
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [consent === null ? /* @__PURE__ */ jsx("aside", {
		"aria-label": text.ariaLabel,
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-4 shadow-2xl backdrop-blur md:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary sm:flex",
					children: /* @__PURE__ */ jsx(BarChart3, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-base font-semibold text-foreground",
						children: text.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground",
						children: text.description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							onClick: () => setLegalView("privacy"),
							children: text.privacyLabel
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							onClick: () => setLegalView("terms"),
							children: text.termsLabel
						})]
					})
				] })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex shrink-0 flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => handleConsent("rejected"),
					children: text.rejectLabel
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => handleConsent("accepted"),
					children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }), text.acceptLabel]
				})]
			})]
		})
	}) : null, legalView ? /* @__PURE__ */ jsx(LegalDialog, {
		onClose: () => setLegalView(null),
		text,
		view: legalView
	}) : null] });
}
function LegalLinks({ text }) {
	const [legalView, setLegalView] = useState(null);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap gap-x-4 gap-y-2",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			onClick: () => setLegalView("privacy"),
			children: text.privacyLabel
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			onClick: () => setLegalView("terms"),
			children: text.termsLabel
		})]
	}), legalView ? /* @__PURE__ */ jsx(LegalDialog, {
		onClose: () => setLegalView(null),
		text,
		view: legalView
	}) : null] });
}
//#endregion
//#region src/i18n/translations.ts
var translations = {
	pt: {
		languageToggleLabel: "Trocar idioma para inglês",
		role: "Engenheiro Frontend Sênior",
		hero: {
			greeting: "Olá, eu sou",
			summary: [
				{ text: "Desenvolvendo " },
				{
					text: "plataformas escaláveis",
					highlight: true
				},
				{ text: ", " },
				{
					text: "arquiteturas frontend distribuídas",
					highlight: true
				},
				{ text: " e " },
				{
					text: "aplicações web de alta performance",
					highlight: true
				},
				{ text: " com " },
				{
					text: "TypeScript",
					highlight: true
				},
				{ text: " e " },
				{
					text: "React",
					highlight: true
				},
				{ text: " há mais de " },
				{
					text: "7 anos",
					highlight: true
				},
				{ text: "." }
			]
		},
		downloadResume: "Baixar currículo",
		viewPdf: "ver currículo",
		experience: "Experiência",
		featuredProjects: "Projetos Selecionados",
		viewAll: "Ver projetos",
		contactLinks: "Contato & Links",
		contact: "Contato & Links",
		links: { projects: {
			label: "Projetos",
			value: "Ver repositórios"
		} },
		featured: [{
			id: "templo",
			title: "Templo",
			description: "Plataforma para descoberta de comunidades, clãs e grupos de jogadores, com autenticação via Discord, busca avançada, filtros inteligentes, métricas de relevância e navegação otimizada com scroll infinito. A experiência foi projetada para facilitar conexões entre jogadores com interesses em comum."
		}, {
			id: "social-skate",
			title: "Social Skate",
			description: "Plataforma institucional desenvolvida para a ONG Social Skate utilizando arquitetura serverless e Decap CMS com fluxo de conteúdo baseado em Git. O projeto foi pensado para oferecer alta performance, baixo custo operacional e autonomia na gestão de conteúdo."
		}],
		experienceItems: [
			{
				company: "Arcotech",
				role: "Engenheiro de Software III",
				period: "2024 - 2025",
				location: "Remoto",
				url: "https://www.arcoeducacao.com.br/",
				description: "Projetei e mantive uma arquitetura distribuída de micro-frontends com React, TypeScript, Webpack Module Federation e bibliotecas compartilhadas, permitindo deploys independentes entre squads. Também implementei mecanismos de prevenção à fraude e validação de integridade de dados para aumentar a confiabilidade de plataformas educacionais de larga escala."
			},
			{
				company: "Alliança",
				role: "Engenheiro Frontend Sênior",
				period: "2022 - 2024",
				location: "Remoto",
				url: "https://www.cdb.com.br/",
				description: "Liderei a arquitetura e o desenvolvimento frontend de uma plataforma SaaS para o setor de saúde, com foco em dados sensíveis, escalabilidade e evolução contínua do produto. Atuei em interfaces seguras e performáticas para fluxos operacionais de larga escala, colaborando com produto e backend para melhorar confiabilidade, eficiência e conformidade regulatória."
			},
			{
				company: "BBL e-SPORTS",
				role: "Engenheiro Frontend Pleno",
				period: "2019 - 2021",
				location: "São Paulo, Brasil",
				url: "https://bbl.gg/",
				description: "Desenvolvi plataformas web de alto tráfego para eventos de e-sports, com foco em performance, escalabilidade e experiência do usuário. Construí interfaces em tempo real preparadas para picos elevados de acesso durante transmissões e eventos ao vivo, contribuindo para estabilidade e alta disponibilidade das aplicações."
			}
		],
		cookieConsent: {
			ariaLabel: "Consentimento de cookies",
			title: "Cookies de analytics",
			description: "Uso cookies e tecnologias similares apenas para entender visitas, páginas acessadas e melhorar este portfolio. O analytics só é ativado se você aceitar.",
			acceptLabel: "Aceitar analytics",
			rejectLabel: "Recusar",
			privacyLabel: "Política de privacidade",
			termsLabel: "Termos de uso",
			closeLabel: "Fechar",
			legal: {
				eyebrow: "Informações legais",
				privacy: {
					title: "Política de privacidade",
					sections: [
						{
							title: "Dados coletados",
							body: "Quando o analytics é aceito, posso coletar dados agregados de navegação, como páginas acessadas, origem do acesso, dispositivo, navegador e eventos básicos de interação. Não vendo dados pessoais e não uso esses dados para publicidade comportamental."
						},
						{
							title: "Finalidade",
							body: "Os dados são usados para medir audiência, identificar problemas de usabilidade e melhorar conteúdo, performance e navegação do site."
						},
						{
							title: "Cookies e consentimento",
							body: "O analytics permanece desativado até o aceite. Sua escolha fica salva no navegador e pode ser alterada apagando os dados locais deste site."
						},
						{
							title: "Contato",
							body: "Para solicitações sobre privacidade, envie uma mensagem para contato@lucasrib.dev."
						}
					]
				},
				terms: {
					title: "Termos de uso",
					sections: [
						{
							title: "Uso do site",
							body: "Este portfolio apresenta experiências, projetos e formas de contato profissionais. Você pode navegar pelo conteúdo e acessar links externos por sua própria conta."
						},
						{
							title: "Conteúdo e propriedade",
							body: "Textos, imagens, marca pessoal e materiais do site pertencem a Lucas Ribeiro ou aos respectivos titulares indicados. O uso não autorizado para fins comerciais não é permitido."
						},
						{
							title: "Links externos",
							body: "O site pode apontar para plataformas de terceiros, como GitHub, LinkedIn e projetos hospedados externamente. Esses serviços têm seus próprios termos e políticas."
						},
						{
							title: "Alterações",
							body: "Estes termos podem ser atualizados para refletir mudanças no site, em ferramentas de analytics ou em requisitos legais aplicáveis."
						}
					]
				}
			}
		},
		builtWith: "Construído com React + TypeScript + Tailwind CSS"
	},
	en: {
		languageToggleLabel: "Switch language to Portuguese",
		role: "Senior Frontend Engineer",
		hero: {
			greeting: "Hello, I'm",
			summary: [
				{ text: "Developing " },
				{
					text: "scalable platforms",
					highlight: true
				},
				{ text: ", " },
				{
					text: "distributed frontend architectures",
					highlight: true
				},
				{ text: " and " },
				{
					text: "high-performance web applications",
					highlight: true
				},
				{ text: " with " },
				{
					text: "TypeScript",
					highlight: true
				},
				{ text: " and " },
				{
					text: "React",
					highlight: true
				},
				{ text: " for over " },
				{
					text: "7 years",
					highlight: true
				},
				{ text: "." }
			]
		},
		downloadResume: "Download resume",
		viewPdf: "view resume",
		experience: "Experience",
		featuredProjects: "Selected Work",
		viewAll: "View projects",
		contactLinks: "Contact & Links",
		contact: "Contact & Links",
		links: { projects: {
			label: "Projects",
			value: "View repositories"
		} },
		featured: [{
			id: "templo",
			title: "Templo",
			description: "Platform for discovering gaming communities, clans, and player groups, featuring Discord authentication, advanced search, intelligent filters, relevance metrics, and optimized infinite-scroll navigation. The experience was designed to help players connect through shared interests."
		}, {
			id: "social-skate",
			title: "Social Skate",
			description: "Institutional platform developed for the Social Skate NGO using a serverless architecture and Decap CMS with a Git-based content workflow. The project was designed to deliver high performance, low operational costs, and autonomous content management."
		}],
		experienceItems: [
			{
				company: "Arcotech",
				role: "Software Engineer III",
				period: "2024 - 2025",
				location: "Remote",
				url: "https://www.arcoeducacao.com.br/",
				description: "Designed and maintained a distributed micro-frontend architecture with React, TypeScript, Webpack Module Federation, and shared libraries, enabling independent deployments across squads. Also implemented fraud-prevention and data-integrity validation mechanisms to improve reliability across large-scale education platforms."
			},
			{
				company: "Alliança",
				role: "Senior Frontend Engineer",
				period: "2022 - 2024",
				location: "Remote",
				url: "https://www.cdb.com.br/",
				description: "Led the frontend architecture and development of a healthcare SaaS platform, focused on sensitive data, scalability, and continuous product evolution. Built secure, high-performance interfaces for large-scale operational workflows while collaborating with product and backend teams to improve reliability, efficiency, and regulatory compliance."
			},
			{
				company: "BBL e-SPORTS",
				role: "Mid-Level Frontend Engineer",
				period: "2019 - 2021",
				location: "São Paulo, Brazil",
				url: "https://bbl.gg/",
				description: "Developed high-traffic web platforms for e-sports events, focused on performance, scalability, and user experience. Built real-time interfaces designed to handle major access peaks during broadcasts and live events, contributing to application stability and high availability."
			}
		],
		cookieConsent: {
			ariaLabel: "Cookie consent",
			title: "Analytics cookies",
			description: "I use cookies and similar technologies only to understand visits, viewed pages, and improve this portfolio. Analytics is enabled only if you accept it.",
			acceptLabel: "Accept analytics",
			rejectLabel: "Reject",
			privacyLabel: "Privacy policy",
			termsLabel: "Terms of use",
			closeLabel: "Close",
			legal: {
				eyebrow: "Legal information",
				privacy: {
					title: "Privacy policy",
					sections: [
						{
							title: "Data collected",
							body: "When analytics is accepted, I may collect aggregated browsing data such as viewed pages, traffic source, device, browser, and basic interaction events. I do not sell personal data or use it for behavioral advertising."
						},
						{
							title: "Purpose",
							body: "The data is used to measure audience, identify usability issues, and improve site content, performance, and navigation."
						},
						{
							title: "Cookies and consent",
							body: "Analytics remains disabled until accepted. Your choice is stored in the browser and can be changed by clearing this site's local data."
						},
						{
							title: "Contact",
							body: "For privacy requests, send a message to contact@lucasrib.dev."
						}
					]
				},
				terms: {
					title: "Terms of use",
					sections: [
						{
							title: "Site usage",
							body: "This portfolio presents professional experience, projects, and contact channels. You may browse the content and access external links at your own discretion."
						},
						{
							title: "Content and ownership",
							body: "Texts, images, personal branding, and site materials belong to Lucas Ribeiro or to the respective indicated owners. Unauthorized commercial use is not allowed."
						},
						{
							title: "External links",
							body: "The site may link to third-party platforms such as GitHub, LinkedIn, and externally hosted projects. Those services have their own terms and policies."
						},
						{
							title: "Changes",
							body: "These terms may be updated to reflect changes to the site, analytics tools, or applicable legal requirements."
						}
					]
				}
			}
		},
		builtWith: "Built with React + TypeScript + Tailwind CSS"
	}
};
//#endregion
//#region src/i18n/useI18n.ts
var defaultLocale = "pt";
var locales = Object.keys(translations);
var localeStorageKey = "locale";
function isLocale(value) {
	return locales.includes(value);
}
function getStoredLocale() {
	try {
		return localStorage.getItem(localeStorageKey);
	} catch {
		return null;
	}
}
function storeLocale(locale) {
	try {
		localStorage.setItem(localeStorageKey, locale);
	} catch {}
}
function getPathLocale() {
	if (typeof window === "undefined") return null;
	return /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "pt";
}
function getLocalePath(locale) {
	return locale === "en" ? "/en/" : "/";
}
function useI18n(initialLocale) {
	const [locale, setLocale] = useState(() => {
		if (initialLocale) return initialLocale;
		const pathLocale = getPathLocale();
		if (pathLocale) return pathLocale;
		const storedLocale = getStoredLocale();
		return isLocale(storedLocale) ? storedLocale : defaultLocale;
	});
	useEffect(() => {
		storeLocale(locale);
		document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
	}, [locale]);
	return {
		locale,
		setLocale: useCallback((nextLocale) => {
			storeLocale(nextLocale);
			setLocale(nextLocale);
			const nextPath = getLocalePath(nextLocale);
			if (window.location.pathname !== nextPath) window.location.assign(nextPath);
		}, []),
		t: translations[locale]
	};
}
//#endregion
//#region src/App.tsx
var githubRepoUrl = "https://github.com/lucasribdev?tab=repositories";
var contactEmails = {
	pt: "contato@lucasrib.dev",
	en: "contact@lucasrib.dev"
};
var contactLinks = [
	{
		label: "Email",
		id: "email",
		value: contactEmails.pt,
		href: `mailto:${contactEmails.pt}`,
		icon: Mail
	},
	{
		label: "LinkedIn",
		value: "linkedin.com/in/lucasribdev",
		href: "https://linkedin.com/in/lucasribdev",
		icon: Linkedin
	},
	{
		label: "GitHub",
		value: "github.com/lucasribdev",
		href: "https://github.com/lucasribdev",
		icon: Github
	},
	{
		id: "projects",
		href: githubRepoUrl,
		icon: FolderGit2
	}
];
var resumeUrls = {
	pt: "/software-engineer-br.pdf",
	en: "/software-engineer-en.pdf"
};
var featuredMeta = {
	templo: {
		year: "2026",
		stack: [
			"React",
			"TypeScript",
			"PostgreSQL",
			"Supabase",
			"BFF",
			"Cloudflare Workers"
		],
		icon: Gamepad2,
		url: "https://templo.club",
		visual: "templo"
	},
	"social-skate": {
		year: "2025",
		stack: [
			"React",
			"TypeScript",
			"Decap CMS",
			"SSG",
			"SEO",
			"Cloudflare Pages"
		],
		icon: HeartHandshake,
		url: "https://socialskate.pages.dev/",
		visual: "social"
	}
};
var techLogos = [
	{
		node: /* @__PURE__ */ jsx(React$1, { size: 30 }),
		title: "React",
		href: "https://react.dev"
	},
	{
		node: /* @__PURE__ */ jsx(NextJs, { size: 30 }),
		title: "Next.js",
		href: "https://nextjs.org"
	},
	{
		node: /* @__PURE__ */ jsx(TypeScript, { size: 30 }),
		title: "TypeScript",
		href: "https://typescriptlang.org"
	},
	{
		node: /* @__PURE__ */ jsx(TailwindCSS, { size: 30 }),
		title: "Tailwind CSS",
		href: "https://tailwindcss.com"
	},
	{
		node: /* @__PURE__ */ jsx(ReactQuery, { size: 30 }),
		title: "React Query",
		href: "https://react-query.tanstack.com"
	},
	{
		node: /* @__PURE__ */ jsx(Zod, { size: 30 }),
		title: "Zod",
		href: "https://zod.dev"
	},
	{
		node: /* @__PURE__ */ jsx(Storybook, { size: 30 }),
		title: "Storybook",
		href: "https://storybook.js.org"
	},
	{
		node: /* @__PURE__ */ jsx(NodeJs, { size: 30 }),
		title: "Node.js",
		href: "https://nodejs.org"
	},
	{
		node: /* @__PURE__ */ jsx(NestJS, { size: 30 }),
		title: "NestJS",
		href: "https://nestjs.com"
	},
	{
		node: /* @__PURE__ */ jsx(Prisma, { size: 30 }),
		title: "Prisma",
		href: "https://prisma.io"
	},
	{
		node: /* @__PURE__ */ jsx(Supabase, { size: 30 }),
		title: "Supabase",
		href: "https://supabase.com"
	},
	{
		node: /* @__PURE__ */ jsx(AWS, { size: 30 }),
		title: "AWS",
		href: "https://aws.amazon.com"
	},
	{
		node: /* @__PURE__ */ jsx(GoogleCloud, { size: 30 }),
		title: "Google Cloud",
		href: "https://cloud.google.com"
	},
	{
		node: /* @__PURE__ */ jsx(PostgreSQL, { size: 30 }),
		title: "PostgreSQL",
		href: "https://www.postgresql.org"
	},
	{
		node: /* @__PURE__ */ jsx(Electron, { size: 30 }),
		title: "Electron",
		href: "https://www.electronjs.org"
	},
	{
		node: /* @__PURE__ */ jsx(Cypress, { size: 30 }),
		title: "Cypress",
		href: "https://www.cypress.io"
	},
	{
		node: /* @__PURE__ */ jsx(Jest, { size: 30 }),
		title: "Jest",
		href: "https://jestjs.io"
	}
];
function ProjectPreview({ visual }) {
	const image = visual === "templo" ? {
		src: templo_default,
		alt: "Interface do projeto Templo"
	} : {
		src: ss_default,
		alt: "Interface do portal Social Skate"
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-7 overflow-hidden rounded-lg border border-border/80 bg-background/80 transition-colors group-hover:border-primary/50",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex h-8 items-center gap-1.5 border-b border-border/70 px-3",
			children: [
				/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/35" }),
				/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/25" }),
				/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary/70" }),
				/* @__PURE__ */ jsx("span", { className: "ml-2 h-2 w-24 rounded-full bg-muted-foreground/15" })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "aspect-[1430/863] bg-muted",
			children: /* @__PURE__ */ jsx("img", {
				src: image.src,
				alt: image.alt,
				className: "h-full w-full object-cover object-top",
				loading: "lazy"
			})
		})]
	});
}
function App({ initialLocale }) {
	const { locale, setLocale, t } = useI18n(initialLocale);
	const nextLocale = locale === "pt" ? "en" : "pt";
	const nextLocaleFlag = nextLocale === "pt" ? bra_default : usa_default;
	const nextLocaleLabel = nextLocale === "pt" ? "BR" : "EN";
	const resumeUrl = resumeUrls[locale];
	const featured = t.featured.map((project) => ({
		...featuredMeta[project.id],
		...project
	}));
	const links = contactLinks.map((link) => {
		if ("id" in link && link.id === "email") {
			const email = contactEmails[locale];
			return {
				...link,
				value: email,
				href: `mailto:${email}`
			};
		}
		if ("id" in link && link.id === "projects") return {
			...link,
			label: t.links.projects.label,
			value: t.links.projects.value
		};
		return link;
	});
	return /* @__PURE__ */ jsxs("main", {
		className: "relative min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-8 md:px-10",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-xs tracking-widest text-muted-foreground",
					children: "LR · 2026"
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					"aria-label": t.languageToggleLabel,
					title: t.languageToggleLabel,
					onClick: () => setLocale(nextLocale),
					className: "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					children: [/* @__PURE__ */ jsx("img", {
						src: nextLocaleFlag,
						alt: "",
						"aria-hidden": "true",
						className: "h-6 w-6 rounded-full object-cover"
					}), /* @__PURE__ */ jsx("span", { children: nextLocaleLabel })]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 md:px-10 md:pt-28",
				children: /* @__PURE__ */ jsxs(TextFade, {
					direction: "up",
					children: [
						/* @__PURE__ */ jsxs("h1", {
							className: "text-white text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "mb-4 block font-mono text-2xl font-normal text-muted-foreground md:text-3xl lg:text-4xl",
									children: t.hero.greeting
								}),
								"Lucas ",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "text-gradient",
									children: "Ribeiro."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 font-mono text-xs uppercase tracking-[0.3em] text-primary",
							children: t.role
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl",
							children: t.hero.summary.map((part, index) => "highlight" in part && part.highlight ? /* @__PURE__ */ jsx("span", {
								className: "text-foreground",
								children: part.text
							}, index) : part.text)
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-12 flex flex-wrap gap-2",
							children: /* @__PURE__ */ jsx(LogoLoop, {
								logos: techLogos,
								speed: 50,
								direction: "left",
								logoHeight: 30,
								gap: 60,
								hoverSpeed: 0,
								scaleOnHover: true,
								fadeOut: true,
								fadeOutColor: "#060a0d",
								ariaLabel: "Stack"
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-12 flex flex-wrap items-center gap-4",
							children: [
								/* @__PURE__ */ jsxs("a", {
									href: resumeUrl,
									download: true,
									className: "group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow",
									children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4 transition-transform group-hover:translate-y-0.5" }), t.downloadResume]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "#contact",
									className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary",
									children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), t.contact]
								}),
								/* @__PURE__ */ jsx("a", {
									href: resumeUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "font-mono text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
									children: t.viewPdf
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 pb-32 md:px-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8 flex items-end justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: t.featuredProjects
						}), /* @__PURE__ */ jsxs("a", {
							href: githubRepoUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground",
							children: [t.viewAll, /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mb-24 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 md:grid-cols-2",
						children: featured.map(({ year, title, description, stack: techs, icon: Icon, url, visual }) => /* @__PURE__ */ jsxs("a", {
							href: url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group relative flex flex-col justify-between bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-7",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(ProjectPreview, { visual }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-primary group-hover:text-primary",
										children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-mono text-xs tracking-widest text-muted-foreground",
											children: year
										}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })]
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-6 text-lg font-semibold leading-tight text-foreground md:text-xl",
									children: title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: description
								})
							] }), /* @__PURE__ */ jsx("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: techs.map((t) => /* @__PURE__ */ jsx("span", {
									className: "rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary",
									children: t
								}, t))
							})]
						}, title))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mb-8 border-b border-border pb-4",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: t.experience
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mb-24 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 md:grid-cols-3",
						children: t.experienceItems.map(({ company, description, location, period, role, url }) => /* @__PURE__ */ jsxs("a", {
							href: url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group relative flex flex-col bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-primary group-hover:text-primary",
										children: /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-5 w-5" })
									}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-6 text-lg font-semibold leading-tight text-foreground md:text-xl",
									children: company
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm font-medium leading-tight text-foreground",
									children: role
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx("span", { children: period }),
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											children: "/"
										}),
										/* @__PURE__ */ jsx("span", { children: location })
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: description
								})
							]
						}, company))
					}),
					/* @__PURE__ */ jsx("div", {
						id: "contact",
						className: "mb-8 flex items-end justify-between border-b border-border pb-4",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: t.contactLinks
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 md:grid-cols-2",
						children: links.map(({ label, value, href, icon: Icon }) => {
							const inner = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 items-center gap-5",
								children: [/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background transition-colors group-hover:border-primary group-hover:text-primary",
									children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
										children: label
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-1 break-all text-base font-medium text-foreground md:text-lg",
										children: value
									})]
								})]
							}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-6 w-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })] });
							return /* @__PURE__ */ jsx("a", {
								href,
								target: href.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								className: "group relative flex items-center justify-between bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-8",
								children: inner
							}, label);
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "relative z-10 mx-auto max-w-6xl border-t border-border px-6 py-8 md:px-10",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-start justify-between gap-3 font-mono text-xs text-muted-foreground md:flex-row md:items-center",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Lucas Ribeiro"
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-start gap-2 md:items-end",
						children: [/* @__PURE__ */ jsx(LegalLinks, { text: t.cookieConsent }), /* @__PURE__ */ jsx("span", { children: t.builtWith })]
					})]
				})
			}),
			/* @__PURE__ */ jsx(CookieConsent, { text: t.cookieConsent })
		]
	});
}
//#endregion
//#region src/entry-server.tsx
function render(locale) {
	return renderToString(/* @__PURE__ */ jsx(App, { initialLocale: locale }));
}
//#endregion
export { render };
