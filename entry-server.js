import { renderToString } from "react-dom/server";
import { ArrowUpRight, BarChart3, FolderGit2, Github, Linkedin, Mail, ShieldCheck, X } from "lucide-react";
import { motion, useInView } from "motion/react";
import * as React$1 from "react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { NestJS, NextJs, NodeJs, React, TypeScript } from "developer-icons";
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
	const ref = React$1.useRef(null);
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
		children: React$1.Children.map(children, (child) => React$1.isValidElement(child) ? /* @__PURE__ */ jsx(motion.div, {
			variants: FADE_DOWN,
			children: child
		}) : child)
	});
}
//#endregion
//#region src/assets/bra.svg
var bra_default = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2036%2036'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--twemoji'%20preserveAspectRatio='xMidYMid%20meet'%3e%3cpath%20fill='%23009B3A'%20d='M36%2027a4%204%200%200%201-4%204H4a4%204%200%200%201-4-4V9a4%204%200%200%201%204-4h28a4%204%200%200%201%204%204v18z'%3e%3c/path%3e%3cpath%20fill='%23FEDF01'%20d='M32.728%2018L18%2029.124L3.272%2018L18%206.875z'%3e%3c/path%3e%3ccircle%20fill='%23002776'%20cx='17.976'%20cy='17.924'%20r='6.458'%3e%3c/circle%3e%3cpath%20fill='%23CBE9D4'%20d='M12.277%2014.887a6.406%206.406%200%200%200-.672%202.023c3.995-.29%209.417%201.891%2011.744%204.595c.402-.604.7-1.28.883-2.004c-2.872-2.808-7.917-4.63-11.955-4.614z'%3e%3c/path%3e%3cpath%20fill='%2388C9F9'%20d='M12%2018.233h1v1h-1zm1%202h1v1h-1z'%3e%3c/path%3e%3cpath%20fill='%2355ACEE'%20d='M15%2018.233h1v1h-1zm2%201h1v1h-1zm4%202h1v1h-1zm-3%201h1v1h-1zm3-6h1v1h-1z'%3e%3c/path%3e%3cpath%20fill='%233B88C3'%20d='M19%2020.233h1v1h-1z'%3e%3c/path%3e%3c/svg%3e";
//#endregion
//#region src/assets/ss.png
var ss_default = "/assets/ss-CDmv5OXS.png";
//#endregion
//#region src/assets/sratlas.png
var sratlas_default = "/assets/sratlas-Duvz5KRw.png";
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
	const closeButtonRef = useRef(null);
	useEffect(() => {
		const opener = document.activeElement;
		closeButtonRef.current?.focus();
		return () => {
			if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
		};
	}, []);
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
			onKeyDown: (event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					onClose();
				} else if (event.key === "Tab") {
					event.preventDefault();
					closeButtonRef.current?.focus();
				}
			},
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
					ref: closeButtonRef,
					type: "button",
					"aria-label": text.closeLabel,
					title: text.closeLabel,
					onClick: onClose,
					className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
					className: "inline-flex items-center justify-center rounded-full border border-input px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => handleConsent("rejected"),
					children: text.rejectLabel
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
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
		role: "Engenheiro de Software Sênior",
		hero: {
			greeting: "Olá, sou o Lucas!",
			summary: [
				{ text: "Tenho " },
				{
					text: "mais de 7 anos de experiência",
					highlight: true
				},
				{ text: " no desenvolvimento de aplicações web com " },
				{
					text: "React, TypeScript e Next.js",
					highlight: true
				},
				{ text: ". Atuo no Front-End e no Back-End, da arquitetura das aplicações ao deploy." }
			]
		},
		stackLabel: "Tecnologias com que trabalho",
		exploreProjects: "Ver projetos",
		experience: "Experiência",
		featuredProjects: "Projetos Selecionados",
		viewAll: "Ver projetos",
		contactLinks: "Contato & Links",
		contact: "Contato & Links",
		links: { projects: {
			label: "Projetos",
			value: "Ver repositórios"
		} },
		featured: [
			{
				id: "sratlas",
				title: "SRAtlas",
				imageAlt: "Mapa interativo do SRAtlas com filtros e pontos de interesse",
				description: "Desenvolvi o SRAtlas para consultar milhares de pontos de interesse de Soul’s Remnant, com busca, filtros e múltiplos mapas. Estruturei os dados, construí a interface e fiz o deploy do mapa interativo."
			},
			{
				id: "templo",
				title: "Templo",
				imageAlt: "Interface da plataforma de comunidades Templo",
				description: "Desenvolvi o Templo para criar e encontrar comunidades, clãs e guildas. A aplicação reúne perfis, anúncios, feed e filtros. Também implementei a autenticação e as políticas de acesso aos dados."
			},
			{
				id: "social-skate",
				title: "Social Skate",
				imageAlt: "Página inicial do portal Social Skate",
				description: "Desenvolvi o portal institucional da ONG Social Skate para apresentar projetos, notícias, informações de transparência e formas de apoio. O conteúdo é versionado em Git, e a equipe pode atualizá-lo com autonomia. O projeto tem foco em performance e baixo custo operacional."
			}
		],
		experienceItems: [
			{
				company: "RibeiroTech",
				role: "Engenheiro de Software Sênior | Fundador",
				period: "11/2025 – 10/2026",
				location: "Remoto",
				url: "#projects",
				description: "Desenvolvi aplicações web com React, TypeScript, Node.js e Supabase, da arquitetura ao deploy. Usei agentes de IA para desenvolver funcionalidades, revisar código e automatizar tarefas."
			},
			{
				company: "Arco Educação",
				role: "Engenheiro de Software Sênior",
				period: "09/2024 – 11/2025",
				location: "Remoto",
				url: "https://www.arcoeducacao.com.br/",
				description: "Desenvolvi funcionalidades com React, TypeScript, micro-frontends e Node.js/NestJS. Criei pacotes e componentes compartilhados por mais de 15 desenvolvedores, entre diferentes times e aplicações."
			},
			{
				company: "Alliança",
				role: "Engenheiro Frontend Sênior",
				period: "01/2022 – 09/2024",
				location: "Remoto",
				url: "https://www.cdb.com.br/",
				description: "Fui referência técnica para cerca de 5 desenvolvedores em decisões de arquitetura e code reviews. Trabalhei em formulários digitais e agendamento de exames com React, TypeScript, Node.js e NestJS."
			}
		],
		cookieConsent: {
			ariaLabel: "Consentimento de cookies",
			title: "Cookies",
			description: "Uso cookies e tecnologias similares apenas para entender visitas, páginas acessadas e melhorar este portfólio. O analytics só é ativado se você aceitar.",
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
							body: "Este portfólio apresenta experiências, projetos e formas de contato profissionais. Você pode navegar pelo conteúdo e acessar links externos por sua própria conta."
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
		role: "Senior Software Engineer",
		hero: {
			greeting: "Hi, I’m Lucas!",
			summary: [
				{ text: "I have " },
				{
					text: "more than 7 years of experience",
					highlight: true
				},
				{ text: " developing web applications with " },
				{
					text: "React, TypeScript, and Next.js",
					highlight: true
				},
				{ text: ". I work across Front-End and Back-End, from application architecture to deployment." }
			]
		},
		stackLabel: "Technologies I work with",
		exploreProjects: "View projects",
		experience: "Experience",
		featuredProjects: "Selected Work",
		viewAll: "View projects",
		contactLinks: "Contact & Links",
		contact: "Contact & Links",
		links: { projects: {
			label: "Projects",
			value: "View repositories"
		} },
		featured: [
			{
				id: "sratlas",
				title: "SRAtlas",
				imageAlt: "SRAtlas interactive map with filters and points of interest",
				description: "I developed SRAtlas to look up thousands of points of interest in Soul’s Remnant, with search, filters, and multiple maps. I structured the data, built the interface, and deployed the interactive map."
			},
			{
				id: "templo",
				title: "Templo",
				imageAlt: "Templo community platform interface",
				description: "I developed Templo to create and discover communities, clans, and guilds. The application brings together profiles, posts, a feed, and filters. I also implemented authentication and data access policies."
			},
			{
				id: "social-skate",
				title: "Social Skate",
				imageAlt: "Social Skate website homepage",
				description: "I built the Social Skate NGO’s website to present projects, news, transparency information, and ways to support the organization. Content is versioned in Git, and the team can update it independently. The project focuses on performance and low operating costs."
			}
		],
		experienceItems: [
			{
				company: "RibeiroTech",
				role: "Senior Software Engineer | Founder",
				period: "Nov 2025 – Oct 2026",
				location: "Remote",
				url: "#projects",
				description: "Built web applications with React, TypeScript, Node.js, and Supabase, from architecture to deployment. Used AI agents to develop features, review code, and automate tasks."
			},
			{
				company: "Arco Educação",
				role: "Senior Software Engineer",
				period: "Sep 2024 – Nov 2025",
				location: "Remote",
				url: "https://www.arcoeducacao.com.br/",
				description: "Built features with React, TypeScript, micro-frontends, and Node.js/NestJS. Created shared packages and components used by 15+ developers across multiple teams and applications."
			},
			{
				company: "Alliança",
				role: "Senior Frontend Engineer",
				period: "Jan 2022 – Sep 2024",
				location: "Remote",
				url: "https://www.cdb.com.br/",
				description: "Supported around 5 developers with architecture decisions and code reviews as the team’s technical reference. Worked on digital forms and exam scheduling with React, TypeScript, Node.js, and NestJS."
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
			const nextPath = getLocalePath(nextLocale);
			if (window.location.pathname !== nextPath) {
				window.location.assign(nextPath);
				return;
			}
			setLocale(nextLocale);
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
	}
];
var featuredMeta = {
	sratlas: {
		year: "2026",
		stack: [
			"React",
			"TypeScript",
			"Vite",
			"Leaflet",
			"Tailwind CSS"
		],
		url: "https://sratlas.com",
		visual: "sratlas"
	},
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
		url: "https://socialskate.pages.dev/",
		visual: "social"
	}
};
function ProjectPreview({ visual, alt }) {
	const image = {
		sratlas: sratlas_default,
		templo: templo_default,
		social: ss_default
	}[visual];
	return /* @__PURE__ */ jsx("div", {
		className: "mb-7 overflow-hidden rounded-lg border border-border/80 bg-background/80 transition-colors group-hover:border-primary/50",
		children: /* @__PURE__ */ jsx("div", {
			className: "aspect-[1430/863] bg-muted",
			children: /* @__PURE__ */ jsx("img", {
				src: image,
				alt,
				className: "h-full w-full object-cover object-top",
				loading: "lazy"
			})
		})
	});
}
function App({ initialLocale }) {
	const { locale, setLocale, t } = useI18n(initialLocale);
	const nextLocale = locale === "pt" ? "en" : "pt";
	const nextLocaleFlag = nextLocale === "pt" ? bra_default : usa_default;
	const nextLocaleLabel = nextLocale === "pt" ? "BR" : "EN";
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
		return link;
	});
	return /* @__PURE__ */ jsxs("main", {
		className: "relative min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-8 md:px-10",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-mono text-xs tracking-widest text-muted-foreground",
					children: t.hero.greeting
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
				className: "relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-16",
				children: /* @__PURE__ */ jsxs(TextFade, {
					direction: "up",
					children: [
						/* @__PURE__ */ jsxs("h1", {
							className: "text-white text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl",
							children: [
								"Lucas",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-gradient block sm:inline",
									children: "Ribeiro."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 font-mono text-xs uppercase tracking-[0.3em] text-primary",
							children: t.role
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl",
							children: t.hero.summary.map((part, index) => "highlight" in part && part.highlight ? /* @__PURE__ */ jsx("span", {
								className: "text-foreground",
								children: part.text
							}, index) : part.text)
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-12 max-w-2xl",
							children: /* @__PURE__ */ jsxs("div", {
								role: "img",
								"aria-label": `${t.stackLabel}: React, TypeScript, Node.js, Next.js, NestJS`,
								className: "flex flex-wrap items-center gap-4",
								children: [
									/* @__PURE__ */ jsx("span", {
										title: "React",
										className: "inline-flex",
										children: /* @__PURE__ */ jsx(React, { size: 30 })
									}),
									/* @__PURE__ */ jsx("span", {
										title: "Next.js",
										className: "inline-flex",
										children: /* @__PURE__ */ jsx(NextJs, { size: 30 })
									}),
									/* @__PURE__ */ jsx("span", {
										title: "TypeScript",
										className: "inline-flex",
										children: /* @__PURE__ */ jsx(TypeScript, { size: 30 })
									}),
									/* @__PURE__ */ jsx("span", {
										title: "Node.js",
										className: "inline-flex",
										children: /* @__PURE__ */ jsx(NodeJs, { size: 30 })
									}),
									/* @__PURE__ */ jsx("span", {
										title: "NestJS",
										className: "inline-flex",
										children: /* @__PURE__ */ jsx(NestJS, { size: 30 })
									})
								]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-12 flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "#projects",
								className: "group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary-hover",
								children: [/* @__PURE__ */ jsx(FolderGit2, { className: "h-4 w-4" }), t.exploreProjects]
							}), /* @__PURE__ */ jsxs("a", {
								href: "#contact",
								className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary",
								children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }), t.contact]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "projects",
				className: "relative z-10 mx-auto max-w-6xl px-6 pb-32 md:px-10",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8 flex flex-col items-start justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-end",
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
						className: "mb-24 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/60 md:grid-cols-2 lg:grid-cols-3",
						children: featured.map(({ year, title, description, stack: techs, url, visual, imageAlt }) => /* @__PURE__ */ jsxs("a", {
							href: url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "group relative flex flex-col justify-between bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:p-7",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx(ProjectPreview, {
									visual,
									alt: imageAlt
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-end gap-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-mono text-xs tracking-widest text-muted-foreground",
										children: year
									}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })]
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
					/* @__PURE__ */ jsx("ol", {
						className: "mb-24 divide-y divide-border/70",
						children: t.experienceItems.map(({ company, description, location, period, role, url }) => /* @__PURE__ */ jsx("li", {
							className: "py-8 first:pt-0 last:pb-0",
							children: /* @__PURE__ */ jsxs("a", {
								href: url,
								target: url.startsWith("http") ? "_blank" : void 0,
								rel: url.startsWith("http") ? "noopener noreferrer" : void 0,
								className: "group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-lg font-semibold leading-tight text-foreground md:text-xl",
											children: company
										}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })]
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
							})
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
						className: "flex flex-col items-start",
						children: links.map(({ label, value, href, icon: Icon }, index) => {
							const inner = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" }), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
										children: label
									}), /* @__PURE__ */ jsx("p", {
										className: `mt-1 break-all font-medium text-foreground ${index === 0 ? "text-2xl md:text-3xl" : "text-base md:text-lg"}`,
										children: value
									})]
								})]
							}), /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-6 w-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" })] });
							return /* @__PURE__ */ jsx("a", {
								href,
								target: href.startsWith("http") ? "_blank" : void 0,
								rel: "noreferrer",
								className: `group flex max-w-full items-center gap-4 rounded-sm py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${index === 0 ? "mb-6" : ""}`,
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
