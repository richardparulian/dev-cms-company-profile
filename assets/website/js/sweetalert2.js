/*!
 * sweetalert2 v11.6.15
 * Released under the MIT License.
 */
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = t())
		: "function" == typeof define && define.amd
		? define(t)
		: ((e =
				"undefined" != typeof globalThis ? globalThis : e || self).Sweetalert2 =
				t());
})(this, function () {
	"use strict";
	var e = {
		awaitingPromise: new WeakMap(),
		promise: new WeakMap(),
		innerParams: new WeakMap(),
		domCache: new WeakMap(),
	};
	const t = (e) => {
			const t = {};
			for (const n in e) t[e[n]] = "swal2-" + e[n];
			return t;
		},
		n = t([
			"container",
			"shown",
			"height-auto",
			"iosfix",
			"popup",
			"modal",
			"no-backdrop",
			"no-transition",
			"toast",
			"toast-shown",
			"show",
			"hide",
			"close",
			"title",
			"html-container",
			"actions",
			"confirm",
			"deny",
			"cancel",
			"default-outline",
			"footer",
			"icon",
			"icon-content",
			"image",
			"input",
			"file",
			"range",
			"select",
			"radio",
			"checkbox",
			"label",
			"textarea",
			"inputerror",
			"input-label",
			"validation-message",
			"progress-steps",
			"active-progress-step",
			"progress-step",
			"progress-step-line",
			"loader",
			"loading",
			"styled",
			"top",
			"top-start",
			"top-end",
			"top-left",
			"top-right",
			"center",
			"center-start",
			"center-end",
			"center-left",
			"center-right",
			"bottom",
			"bottom-start",
			"bottom-end",
			"bottom-left",
			"bottom-right",
			"grow-row",
			"grow-column",
			"grow-fullscreen",
			"rtl",
			"timer-progress-bar",
			"timer-progress-bar-container",
			"scrollbar-measure",
			"icon-success",
			"icon-warning",
			"icon-info",
			"icon-question",
			"icon-error",
		]),
		o = t(["success", "warning", "info", "question", "error"]),
		i = (e) => e.charAt(0).toUpperCase() + e.slice(1),
		s = (e) => {
			console.warn(`SweetAlert2: ${"object" == typeof e ? e.join(" ") : e}`);
		},
		r = (e) => {
			console.error(`SweetAlert2: ${e}`);
		},
		a = [],
		l = (e, t) => {
			var n;
			(n = `"${e}" is deprecated and will be removed in the next major release. Please use "${t}" instead.`),
				a.includes(n) || (a.push(n), s(n));
		},
		c = (e) => ("function" == typeof e ? e() : e),
		u = (e) => e && "function" == typeof e.toPromise,
		d = (e) => (u(e) ? e.toPromise() : Promise.resolve(e)),
		p = (e) => e && Promise.resolve(e) === e,
		m = () => document.body.querySelector(`.${n.container}`),
		g = (e) => {
			const t = m();
			return t ? t.querySelector(e) : null;
		},
		h = (e) => g(`.${e}`),
		f = () => h(n.popup),
		b = () => h(n.icon),
		y = () => h(n.title),
		w = () => h(n["html-container"]),
		v = () => h(n.image),
		C = () => h(n["progress-steps"]),
		A = () => h(n["validation-message"]),
		k = () => g(`.${n.actions} .${n.confirm}`),
		B = () => g(`.${n.actions} .${n.deny}`),
		P = () => g(`.${n.loader}`),
		x = () => g(`.${n.actions} .${n.cancel}`),
		E = () => h(n.actions),
		$ = () => h(n.footer),
		T = () => h(n["timer-progress-bar"]),
		S = () => h(n.close),
		L = () => {
			const e = Array.from(
					f().querySelectorAll(
						'[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
					)
				).sort((e, t) => {
					const n = parseInt(e.getAttribute("tabindex")),
						o = parseInt(t.getAttribute("tabindex"));
					return n > o ? 1 : n < o ? -1 : 0;
				}),
				t = Array.from(
					f().querySelectorAll(
						'\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
					)
				).filter((e) => "-1" !== e.getAttribute("tabindex"));
			return ((e) => {
				const t = [];
				for (let n = 0; n < e.length; n++)
					-1 === t.indexOf(e[n]) && t.push(e[n]);
				return t;
			})(e.concat(t)).filter((e) => Z(e));
		},
		O = () =>
			I(document.body, n.shown) &&
			!I(document.body, n["toast-shown"]) &&
			!I(document.body, n["no-backdrop"]),
		j = () => f() && I(f(), n.toast),
		M = { previousBodyPadding: null },
		H = (e, t) => {
			if (((e.textContent = ""), t)) {
				const n = new DOMParser().parseFromString(t, "text/html");
				Array.from(n.querySelector("head").childNodes).forEach((t) => {
					e.appendChild(t);
				}),
					Array.from(n.querySelector("body").childNodes).forEach((t) => {
						t instanceof HTMLVideoElement || t instanceof HTMLAudioElement
							? e.appendChild(t.cloneNode(!0))
							: e.appendChild(t);
					});
			}
		},
		I = (e, t) => {
			if (!t) return !1;
			const n = t.split(/\s+/);
			for (let t = 0; t < n.length; t++)
				if (!e.classList.contains(n[t])) return !1;
			return !0;
		},
		D = (e, t, i) => {
			if (
				(((e, t) => {
					Array.from(e.classList).forEach((i) => {
						Object.values(n).includes(i) ||
							Object.values(o).includes(i) ||
							Object.values(t.showClass).includes(i) ||
							e.classList.remove(i);
					});
				})(e, t),
				t.customClass && t.customClass[i])
			) {
				if ("string" != typeof t.customClass[i] && !t.customClass[i].forEach)
					return void s(
						`Invalid type of customClass.${i}! Expected string or iterable object, got "${typeof t
							.customClass[i]}"`
					);
				F(e, t.customClass[i]);
			}
		},
		q = (e, t) => {
			if (!t) return null;
			switch (t) {
				case "select":
				case "textarea":
				case "file":
					return e.querySelector(`.${n.popup} > .${n[t]}`);
				case "checkbox":
					return e.querySelector(`.${n.popup} > .${n.checkbox} input`);
				case "radio":
					return (
						e.querySelector(`.${n.popup} > .${n.radio} input:checked`) ||
						e.querySelector(`.${n.popup} > .${n.radio} input:first-child`)
					);
				case "range":
					return e.querySelector(`.${n.popup} > .${n.range} input`);
				default:
					return e.querySelector(`.${n.popup} > .${n.input}`);
			}
		},
		V = (e) => {
			if ((e.focus(), "file" !== e.type)) {
				const t = e.value;
				(e.value = ""), (e.value = t);
			}
		},
		N = (e, t, n) => {
			e &&
				t &&
				("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
				t.forEach((t) => {
					Array.isArray(e)
						? e.forEach((e) => {
								n ? e.classList.add(t) : e.classList.remove(t);
						  })
						: n
						? e.classList.add(t)
						: e.classList.remove(t);
				}));
		},
		F = (e, t) => {
			N(e, t, !0);
		},
		R = (e, t) => {
			N(e, t, !1);
		},
		U = (e, t) => {
			const n = Array.from(e.children);
			for (let e = 0; e < n.length; e++) {
				const o = n[e];
				if (o instanceof HTMLElement && I(o, t)) return o;
			}
		},
		_ = (e, t, n) => {
			n === `${parseInt(n)}` && (n = parseInt(n)),
				n || 0 === parseInt(n)
					? (e.style[t] = "number" == typeof n ? `${n}px` : n)
					: e.style.removeProperty(t);
		},
		W = function (e) {
			let t =
				arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "flex";
			e.style.display = t;
		},
		z = (e) => {
			e.style.display = "none";
		},
		K = (e, t, n, o) => {
			const i = e.querySelector(t);
			i && (i.style[n] = o);
		},
		Y = function (e, t) {
			let n =
				arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "flex";
			t ? W(e, n) : z(e);
		},
		Z = (e) =>
			!(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
		J = (e) => !!(e.scrollHeight > e.clientHeight),
		X = (e) => {
			const t = window.getComputedStyle(e),
				n = parseFloat(t.getPropertyValue("animation-duration") || "0"),
				o = parseFloat(t.getPropertyValue("transition-duration") || "0");
			return n > 0 || o > 0;
		},
		G = function (e) {
			let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
			const n = T();
			Z(n) &&
				(t && ((n.style.transition = "none"), (n.style.width = "100%")),
				setTimeout(() => {
					(n.style.transition = `width ${e / 1e3}s linear`),
						(n.style.width = "0%");
				}, 10));
		},
		Q = {},
		ee = (e) =>
			new Promise((t) => {
				if (!e) return t();
				const n = window.scrollX,
					o = window.scrollY;
				(Q.restoreFocusTimeout = setTimeout(() => {
					Q.previousActiveElement instanceof HTMLElement
						? (Q.previousActiveElement.focus(),
						  (Q.previousActiveElement = null))
						: document.body && document.body.focus(),
						t();
				}, 100)),
					window.scrollTo(n, o);
			}),
		te = () => "undefined" == typeof window || "undefined" == typeof document,
		ne =
			`\n <div aria-labelledby="${n.title}" aria-describedby="${n["html-container"]}" class="${n.popup}" tabindex="-1">\n   <button type="button" class="${n.close}"></button>\n   <ul class="${n["progress-steps"]}"></ul>\n   <div class="${n.icon}"></div>\n   <img class="${n.image}" />\n   <h2 class="${n.title}" id="${n.title}"></h2>\n   <div class="${n["html-container"]}" id="${n["html-container"]}"></div>\n   <input class="${n.input}" />\n   <input type="file" class="${n.file}" />\n   <div class="${n.range}">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="${n.select}"></select>\n   <div class="${n.radio}"></div>\n   <label for="${n.checkbox}" class="${n.checkbox}">\n     <input type="checkbox" />\n     <span class="${n.label}"></span>\n   </label>\n   <textarea class="${n.textarea}"></textarea>\n   <div class="${n["validation-message"]}" id="${n["validation-message"]}"></div>\n   <div class="${n.actions}">\n     <div class="${n.loader}"></div>\n     <button type="button" class="${n.confirm}"></button>\n     <button type="button" class="${n.deny}"></button>\n     <button type="button" class="${n.cancel}"></button>\n   </div>\n   <div class="${n.footer}"></div>\n   <div class="${n["timer-progress-bar-container"]}">\n     <div class="${n["timer-progress-bar"]}"></div>\n   </div>\n </div>\n`.replace(
				/(^|\n)\s*/g,
				""
			),
		oe = () => {
			Q.currentInstance.resetValidationMessage();
		},
		ie = (e) => {
			const t = (() => {
				const e = m();
				return (
					!!e &&
					(e.remove(),
					R(
						[document.documentElement, document.body],
						[n["no-backdrop"], n["toast-shown"], n["has-column"]]
					),
					!0)
				);
			})();
			if (te()) return void r("SweetAlert2 requires document to initialize");
			const o = document.createElement("div");
			(o.className = n.container), t && F(o, n["no-transition"]), H(o, ne);
			const i =
				"string" == typeof (s = e.target) ? document.querySelector(s) : s;
			var s;
			i.appendChild(o),
				((e) => {
					const t = f();
					t.setAttribute("role", e.toast ? "alert" : "dialog"),
						t.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
						e.toast || t.setAttribute("aria-modal", "true");
				})(e),
				((e) => {
					"rtl" === window.getComputedStyle(e).direction && F(m(), n.rtl);
				})(i),
				(() => {
					const e = f(),
						t = U(e, n.input),
						o = U(e, n.file),
						i = e.querySelector(`.${n.range} input`),
						s = e.querySelector(`.${n.range} output`),
						r = U(e, n.select),
						a = e.querySelector(`.${n.checkbox} input`),
						l = U(e, n.textarea);
					(t.oninput = oe),
						(o.onchange = oe),
						(r.onchange = oe),
						(a.onchange = oe),
						(l.oninput = oe),
						(i.oninput = () => {
							oe(), (s.value = i.value);
						}),
						(i.onchange = () => {
							oe(), (s.value = i.value);
						});
				})();
		},
		se = (e, t) => {
			e instanceof HTMLElement
				? t.appendChild(e)
				: "object" == typeof e
				? re(e, t)
				: e && H(t, e);
		},
		re = (e, t) => {
			e.jquery ? ae(t, e) : H(t, e.toString());
		},
		ae = (e, t) => {
			if (((e.textContent = ""), 0 in t))
				for (let n = 0; n in t; n++) e.appendChild(t[n].cloneNode(!0));
			else e.appendChild(t.cloneNode(!0));
		},
		le = (() => {
			if (te()) return !1;
			const e = document.createElement("div"),
				t = {
					WebkitAnimation: "webkitAnimationEnd",
					animation: "animationend",
				};
			for (const n in t)
				if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n])
					return t[n];
			return !1;
		})(),
		ce = (e, t) => {
			const o = E(),
				i = P();
			t.showConfirmButton || t.showDenyButton || t.showCancelButton
				? W(o)
				: z(o),
				D(o, t, "actions"),
				(function (e, t, o) {
					const i = k(),
						s = B(),
						r = x();
					ue(i, "confirm", o),
						ue(s, "deny", o),
						ue(r, "cancel", o),
						(function (e, t, o, i) {
							if (!i.buttonsStyling) return void R([e, t, o], n.styled);
							F([e, t, o], n.styled),
								i.confirmButtonColor &&
									((e.style.backgroundColor = i.confirmButtonColor),
									F(e, n["default-outline"]));
							i.denyButtonColor &&
								((t.style.backgroundColor = i.denyButtonColor),
								F(t, n["default-outline"]));
							i.cancelButtonColor &&
								((o.style.backgroundColor = i.cancelButtonColor),
								F(o, n["default-outline"]));
						})(i, s, r, o),
						o.reverseButtons &&
							(o.toast
								? (e.insertBefore(r, i), e.insertBefore(s, i))
								: (e.insertBefore(r, t),
								  e.insertBefore(s, t),
								  e.insertBefore(i, t)));
				})(o, i, t),
				H(i, t.loaderHtml),
				D(i, t, "loader");
		};
	function ue(e, t, o) {
		Y(e, o[`show${i(t)}Button`], "inline-block"),
			H(e, o[`${t}ButtonText`]),
			e.setAttribute("aria-label", o[`${t}ButtonAriaLabel`]),
			(e.className = n[t]),
			D(e, o, `${t}Button`),
			F(e, o[`${t}ButtonClass`]);
	}
	const de = (e, t) => {
		const o = m();
		o &&
			(!(function (e, t) {
				"string" == typeof t
					? (e.style.background = t)
					: t || F([document.documentElement, document.body], n["no-backdrop"]);
			})(o, t.backdrop),
			(function (e, t) {
				t in n
					? F(e, n[t])
					: (s('The "position" parameter is not valid, defaulting to "center"'),
					  F(e, n.center));
			})(o, t.position),
			(function (e, t) {
				if (t && "string" == typeof t) {
					const o = `grow-${t}`;
					o in n && F(e, n[o]);
				}
			})(o, t.grow),
			D(o, t, "container"));
	};
	const pe = [
			"input",
			"file",
			"range",
			"select",
			"radio",
			"checkbox",
			"textarea",
		],
		me = (e) => {
			if (!ve[e.input])
				return void r(
					`Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${e.input}"`
				);
			const t = ye(e.input),
				n = ve[e.input](t, e);
			W(t),
				setTimeout(() => {
					V(n);
				});
		},
		ge = (e, t) => {
			const n = q(f(), e);
			if (n) {
				((e) => {
					for (let t = 0; t < e.attributes.length; t++) {
						const n = e.attributes[t].name;
						["type", "value", "style"].includes(n) || e.removeAttribute(n);
					}
				})(n);
				for (const e in t) n.setAttribute(e, t[e]);
			}
		},
		he = (e) => {
			const t = ye(e.input);
			"object" == typeof e.customClass && F(t, e.customClass.input);
		},
		fe = (e, t) => {
			(e.placeholder && !t.inputPlaceholder) ||
				(e.placeholder = t.inputPlaceholder);
		},
		be = (e, t, o) => {
			if (o.inputLabel) {
				e.id = n.input;
				const i = document.createElement("label"),
					s = n["input-label"];
				i.setAttribute("for", e.id),
					(i.className = s),
					"object" == typeof o.customClass && F(i, o.customClass.inputLabel),
					(i.innerText = o.inputLabel),
					t.insertAdjacentElement("beforebegin", i);
			}
		},
		ye = (e) => U(f(), n[e] || n.input),
		we = (e, t) => {
			["string", "number"].includes(typeof t)
				? (e.value = `${t}`)
				: p(t) ||
				  s(
						`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof t}"`
				  );
		},
		ve = {};
	(ve.text =
		ve.email =
		ve.password =
		ve.number =
		ve.tel =
		ve.url =
			(e, t) => (
				we(e, t.inputValue), be(e, e, t), fe(e, t), (e.type = t.input), e
			)),
		(ve.file = (e, t) => (be(e, e, t), fe(e, t), e)),
		(ve.range = (e, t) => {
			const n = e.querySelector("input"),
				o = e.querySelector("output");
			return (
				we(n, t.inputValue),
				(n.type = t.input),
				we(o, t.inputValue),
				be(n, e, t),
				e
			);
		}),
		(ve.select = (e, t) => {
			if (((e.textContent = ""), t.inputPlaceholder)) {
				const n = document.createElement("option");
				H(n, t.inputPlaceholder),
					(n.value = ""),
					(n.disabled = !0),
					(n.selected = !0),
					e.appendChild(n);
			}
			return be(e, e, t), e;
		}),
		(ve.radio = (e) => ((e.textContent = ""), e)),
		(ve.checkbox = (e, t) => {
			const o = q(f(), "checkbox");
			(o.value = "1"), (o.id = n.checkbox), (o.checked = Boolean(t.inputValue));
			const i = e.querySelector("span");
			return H(i, t.inputPlaceholder), o;
		}),
		(ve.textarea = (e, t) => {
			we(e, t.inputValue), fe(e, t), be(e, e, t);
			return (
				setTimeout(() => {
					if ("MutationObserver" in window) {
						const t = parseInt(window.getComputedStyle(f()).width);
						new MutationObserver(() => {
							const n =
								e.offsetWidth +
								((o = e),
								parseInt(window.getComputedStyle(o).marginLeft) +
									parseInt(window.getComputedStyle(o).marginRight));
							var o;
							f().style.width = n > t ? `${n}px` : null;
						}).observe(e, { attributes: !0, attributeFilter: ["style"] });
					}
				}),
				e
			);
		});
	const Ce = (t, o) => {
			const i = w();
			D(i, o, "htmlContainer"),
				o.html
					? (se(o.html, i), W(i, "block"))
					: o.text
					? ((i.textContent = o.text), W(i, "block"))
					: z(i),
				((t, o) => {
					const i = f(),
						s = e.innerParams.get(t),
						r = !s || o.input !== s.input;
					pe.forEach((e) => {
						const t = U(i, n[e]);
						ge(e, o.inputAttributes), (t.className = n[e]), r && z(t);
					}),
						o.input && (r && me(o), he(o));
				})(t, o);
		},
		Ae = (e, t) => {
			for (const n in o) t.icon !== n && R(e, o[n]);
			F(e, o[t.icon]), Pe(e, t), ke(), D(e, t, "icon");
		},
		ke = () => {
			const e = f(),
				t = window.getComputedStyle(e).getPropertyValue("background-color"),
				n = e.querySelectorAll(
					"[class^=swal2-success-circular-line], .swal2-success-fix"
				);
			for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t;
		},
		Be = (e, t) => {
			let n,
				o = e.innerHTML;
			if (t.iconHtml) n = xe(t.iconHtml);
			else if ("success" === t.icon)
				(n =
					'\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n'),
					(o = o.replace(/ style=".*?"/g, ""));
			else if ("error" === t.icon)
				n =
					'\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n';
			else {
				n = xe({ question: "?", warning: "!", info: "i" }[t.icon]);
			}
			o.trim() !== n.trim() && H(e, n);
		},
		Pe = (e, t) => {
			if (t.iconColor) {
				(e.style.color = t.iconColor), (e.style.borderColor = t.iconColor);
				for (const n of [
					".swal2-success-line-tip",
					".swal2-success-line-long",
					".swal2-x-mark-line-left",
					".swal2-x-mark-line-right",
				])
					K(e, n, "backgroundColor", t.iconColor);
				K(e, ".swal2-success-ring", "borderColor", t.iconColor);
			}
		},
		xe = (e) => `<div class="${n["icon-content"]}">${e}</div>`,
		Ee = (e, t) => {
			(e.className = `${n.popup} ${Z(e) ? t.showClass.popup : ""}`),
				t.toast
					? (F([document.documentElement, document.body], n["toast-shown"]),
					  F(e, n.toast))
					: F(e, n.modal),
				D(e, t, "popup"),
				"string" == typeof t.customClass && F(e, t.customClass),
				t.icon && F(e, n[`icon-${t.icon}`]);
		},
		$e = (e) => {
			const t = document.createElement("li");
			return F(t, n["progress-step"]), H(t, e), t;
		},
		Te = (e) => {
			const t = document.createElement("li");
			return (
				F(t, n["progress-step-line"]),
				e.progressStepsDistance && _(t, "width", e.progressStepsDistance),
				t
			);
		},
		Se = (t, i) => {
			((e, t) => {
				const n = m(),
					o = f();
				t.toast
					? (_(n, "width", t.width),
					  (o.style.width = "100%"),
					  o.insertBefore(P(), b()))
					: _(o, "width", t.width),
					_(o, "padding", t.padding),
					t.color && (o.style.color = t.color),
					t.background && (o.style.background = t.background),
					z(A()),
					Ee(o, t);
			})(0, i),
				de(0, i),
				((e, t) => {
					const o = C();
					t.progressSteps && 0 !== t.progressSteps.length
						? (W(o),
						  (o.textContent = ""),
						  t.currentProgressStep >= t.progressSteps.length &&
								s(
									"Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
								),
						  t.progressSteps.forEach((e, i) => {
								const s = $e(e);
								if (
									(o.appendChild(s),
									i === t.currentProgressStep &&
										F(s, n["active-progress-step"]),
									i !== t.progressSteps.length - 1)
								) {
									const e = Te(t);
									o.appendChild(e);
								}
						  }))
						: z(o);
				})(0, i),
				((t, n) => {
					const i = e.innerParams.get(t),
						s = b();
					if (i && n.icon === i.icon) return Be(s, n), void Ae(s, n);
					if (n.icon || n.iconHtml) {
						if (n.icon && -1 === Object.keys(o).indexOf(n.icon))
							return (
								r(
									`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${n.icon}"`
								),
								void z(s)
							);
						W(s), Be(s, n), Ae(s, n), F(s, n.showClass.icon);
					} else z(s);
				})(t, i),
				((e, t) => {
					const o = v();
					t.imageUrl
						? (W(o, ""),
						  o.setAttribute("src", t.imageUrl),
						  o.setAttribute("alt", t.imageAlt),
						  _(o, "width", t.imageWidth),
						  _(o, "height", t.imageHeight),
						  (o.className = n.image),
						  D(o, t, "image"))
						: z(o);
				})(0, i),
				((e, t) => {
					const n = y();
					Y(n, t.title || t.titleText, "block"),
						t.title && se(t.title, n),
						t.titleText && (n.innerText = t.titleText),
						D(n, t, "title");
				})(0, i),
				((e, t) => {
					const n = S();
					H(n, t.closeButtonHtml),
						D(n, t, "closeButton"),
						Y(n, t.showCloseButton),
						n.setAttribute("aria-label", t.closeButtonAriaLabel);
				})(0, i),
				Ce(t, i),
				ce(0, i),
				((e, t) => {
					const n = $();
					Y(n, t.footer), t.footer && se(t.footer, n), D(n, t, "footer");
				})(0, i),
				"function" == typeof i.didRender && i.didRender(f());
		};
	function Le() {
		const t = e.innerParams.get(this);
		if (!t) return;
		const o = e.domCache.get(this);
		z(o.loader),
			j() ? t.icon && W(b()) : Oe(o),
			R([o.popup, o.actions], n.loading),
			o.popup.removeAttribute("aria-busy"),
			o.popup.removeAttribute("data-loading"),
			(o.confirmButton.disabled = !1),
			(o.denyButton.disabled = !1),
			(o.cancelButton.disabled = !1);
	}
	const Oe = (e) => {
		const t = e.popup.getElementsByClassName(
			e.loader.getAttribute("data-button-to-replace")
		);
		t.length
			? W(t[0], "inline-block")
			: Z(k()) || Z(B()) || Z(x()) || z(e.actions);
	};
	const je = () => k() && k().click(),
		Me = Object.freeze({
			cancel: "cancel",
			backdrop: "backdrop",
			close: "close",
			esc: "esc",
			timer: "timer",
		}),
		He = (e) => {
			e.keydownTarget &&
				e.keydownHandlerAdded &&
				(e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
					capture: e.keydownListenerCapture,
				}),
				(e.keydownHandlerAdded = !1));
		},
		Ie = (e, t, n) => {
			const o = L();
			if (o.length)
				return (
					(t += n) === o.length ? (t = 0) : -1 === t && (t = o.length - 1),
					void o[t].focus()
				);
			f().focus();
		},
		De = ["ArrowRight", "ArrowDown"],
		qe = ["ArrowLeft", "ArrowUp"],
		Ve = (t, n, o) => {
			const i = e.innerParams.get(t);
			i &&
				(n.isComposing ||
					229 === n.keyCode ||
					(i.stopKeydownPropagation && n.stopPropagation(),
					"Enter" === n.key
						? Ne(t, n, i)
						: "Tab" === n.key
						? Fe(n, i)
						: [...De, ...qe].includes(n.key)
						? Re(n.key)
						: "Escape" === n.key && Ue(n, i, o)));
		},
		Ne = (e, t, n) => {
			if (
				c(n.allowEnterKey) &&
				t.target &&
				e.getInput() &&
				t.target instanceof HTMLElement &&
				t.target.outerHTML === e.getInput().outerHTML
			) {
				if (["textarea", "file"].includes(n.input)) return;
				je(), t.preventDefault();
			}
		},
		Fe = (e, t) => {
			const n = e.target,
				o = L();
			let i = -1;
			for (let e = 0; e < o.length; e++)
				if (n === o[e]) {
					i = e;
					break;
				}
			e.shiftKey ? Ie(0, i, -1) : Ie(0, i, 1),
				e.stopPropagation(),
				e.preventDefault();
		},
		Re = (e) => {
			const t = k(),
				n = B(),
				o = x();
			if (
				document.activeElement instanceof HTMLElement &&
				![t, n, o].includes(document.activeElement)
			)
				return;
			const i = De.includes(e)
				? "nextElementSibling"
				: "previousElementSibling";
			let s = document.activeElement;
			for (let e = 0; e < E().children.length; e++) {
				if (((s = s[i]), !s)) return;
				if (s instanceof HTMLButtonElement && Z(s)) break;
			}
			s instanceof HTMLButtonElement && s.focus();
		},
		Ue = (e, t, n) => {
			c(t.allowEscapeKey) && (e.preventDefault(), n(Me.esc));
		};
	var _e = {
		swalPromiseResolve: new WeakMap(),
		swalPromiseReject: new WeakMap(),
	};
	const We = () => {
			Array.from(document.body.children).forEach((e) => {
				e.hasAttribute("data-previous-aria-hidden")
					? (e.setAttribute(
							"aria-hidden",
							e.getAttribute("data-previous-aria-hidden")
					  ),
					  e.removeAttribute("data-previous-aria-hidden"))
					: e.removeAttribute("aria-hidden");
			});
		},
		ze = () => {
			const e = navigator.userAgent,
				t = !!e.match(/iPad/i) || !!e.match(/iPhone/i),
				n = !!e.match(/WebKit/i);
			if (t && n && !e.match(/CriOS/i)) {
				const e = 44;
				f().scrollHeight > window.innerHeight - e &&
					(m().style.paddingBottom = `${e}px`);
			}
		},
		Ke = () => {
			const e = m();
			let t;
			(e.ontouchstart = (e) => {
				t = Ye(e);
			}),
				(e.ontouchmove = (e) => {
					t && (e.preventDefault(), e.stopPropagation());
				});
		},
		Ye = (e) => {
			const t = e.target,
				n = m();
			return (
				!Ze(e) &&
				!Je(e) &&
				(t === n ||
					(!J(n) &&
						t instanceof HTMLElement &&
						"INPUT" !== t.tagName &&
						"TEXTAREA" !== t.tagName &&
						(!J(w()) || !w().contains(t))))
			);
		},
		Ze = (e) =>
			e.touches && e.touches.length && "stylus" === e.touches[0].touchType,
		Je = (e) => e.touches && e.touches.length > 1,
		Xe = () => {
			null === M.previousBodyPadding &&
				document.body.scrollHeight > window.innerHeight &&
				((M.previousBodyPadding = parseInt(
					window
						.getComputedStyle(document.body)
						.getPropertyValue("padding-right")
				)),
				(document.body.style.paddingRight = `${
					M.previousBodyPadding +
					(() => {
						const e = document.createElement("div");
						(e.className = n["scrollbar-measure"]),
							document.body.appendChild(e);
						const t = e.getBoundingClientRect().width - e.clientWidth;
						return document.body.removeChild(e), t;
					})()
				}px`));
		};
	function Ge(e, t, o, i) {
		j() ? st(e, i) : (ee(o).then(() => st(e, i)), He(Q));
		/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
			? (t.setAttribute("style", "display:none !important"),
			  t.removeAttribute("class"),
			  (t.innerHTML = ""))
			: t.remove(),
			O() &&
				(null !== M.previousBodyPadding &&
					((document.body.style.paddingRight = `${M.previousBodyPadding}px`),
					(M.previousBodyPadding = null)),
				(() => {
					if (I(document.body, n.iosfix)) {
						const e = parseInt(document.body.style.top, 10);
						R(document.body, n.iosfix),
							(document.body.style.top = ""),
							(document.body.scrollTop = -1 * e);
					}
				})(),
				We()),
			R(
				[document.documentElement, document.body],
				[n.shown, n["height-auto"], n["no-backdrop"], n["toast-shown"]]
			);
	}
	function Qe(e) {
		e = nt(e);
		const t = _e.swalPromiseResolve.get(this),
			n = et(this);
		this.isAwaitingPromise() ? e.isDismissed || (tt(this), t(e)) : n && t(e);
	}
	const et = (t) => {
		const n = f();
		if (!n) return !1;
		const o = e.innerParams.get(t);
		if (!o || I(n, o.hideClass.popup)) return !1;
		R(n, o.showClass.popup), F(n, o.hideClass.popup);
		const i = m();
		return (
			R(i, o.showClass.backdrop), F(i, o.hideClass.backdrop), ot(t, n, o), !0
		);
	};
	const tt = (t) => {
			t.isAwaitingPromise() &&
				(e.awaitingPromise.delete(t), e.innerParams.get(t) || t._destroy());
		},
		nt = (e) =>
			void 0 === e
				? { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
				: Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, e),
		ot = (e, t, n) => {
			const o = m(),
				i = le && X(t);
			"function" == typeof n.willClose && n.willClose(t),
				i
					? it(e, t, o, n.returnFocus, n.didClose)
					: Ge(e, o, n.returnFocus, n.didClose);
		},
		it = (e, t, n, o, i) => {
			(Q.swalCloseEventFinishedCallback = Ge.bind(null, e, n, o, i)),
				t.addEventListener(le, function (e) {
					e.target === t &&
						(Q.swalCloseEventFinishedCallback(),
						delete Q.swalCloseEventFinishedCallback);
				});
		},
		st = (e, t) => {
			setTimeout(() => {
				"function" == typeof t && t.bind(e.params)(), e._destroy();
			});
		};
	function rt(t, n, o) {
		const i = e.domCache.get(t);
		n.forEach((e) => {
			i[e].disabled = o;
		});
	}
	function at(e, t) {
		if (e)
			if ("radio" === e.type) {
				const n = e.parentNode.parentNode.querySelectorAll("input");
				for (let e = 0; e < n.length; e++) n[e].disabled = t;
			} else e.disabled = t;
	}
	const lt = {
			title: "",
			titleText: "",
			text: "",
			html: "",
			footer: "",
			icon: void 0,
			iconColor: void 0,
			iconHtml: void 0,
			template: void 0,
			toast: !1,
			showClass: {
				popup: "swal2-show",
				backdrop: "swal2-backdrop-show",
				icon: "swal2-icon-show",
			},
			hideClass: {
				popup: "swal2-hide",
				backdrop: "swal2-backdrop-hide",
				icon: "swal2-icon-hide",
			},
			customClass: {},
			target: "body",
			color: void 0,
			backdrop: !0,
			heightAuto: !0,
			allowOutsideClick: !0,
			allowEscapeKey: !0,
			allowEnterKey: !0,
			stopKeydownPropagation: !0,
			keydownListenerCapture: !1,
			showConfirmButton: !0,
			showDenyButton: !1,
			showCancelButton: !1,
			preConfirm: void 0,
			preDeny: void 0,
			confirmButtonText: "OK",
			confirmButtonAriaLabel: "",
			confirmButtonColor: void 0,
			denyButtonText: "No",
			denyButtonAriaLabel: "",
			denyButtonColor: void 0,
			cancelButtonText: "Cancel",
			cancelButtonAriaLabel: "",
			cancelButtonColor: void 0,
			buttonsStyling: !0,
			reverseButtons: !1,
			focusConfirm: !0,
			focusDeny: !1,
			focusCancel: !1,
			returnFocus: !0,
			showCloseButton: !1,
			closeButtonHtml: "&times;",
			closeButtonAriaLabel: "Close this dialog",
			loaderHtml: "",
			showLoaderOnConfirm: !1,
			showLoaderOnDeny: !1,
			imageUrl: void 0,
			imageWidth: void 0,
			imageHeight: void 0,
			imageAlt: "",
			timer: void 0,
			timerProgressBar: !1,
			width: void 0,
			padding: void 0,
			background: void 0,
			input: void 0,
			inputPlaceholder: "",
			inputLabel: "",
			inputValue: "",
			inputOptions: {},
			inputAutoTrim: !0,
			inputAttributes: {},
			inputValidator: void 0,
			returnInputValueOnDeny: !1,
			validationMessage: void 0,
			grow: !1,
			position: "center",
			progressSteps: [],
			currentProgressStep: void 0,
			progressStepsDistance: void 0,
			willOpen: void 0,
			didOpen: void 0,
			didRender: void 0,
			willClose: void 0,
			didClose: void 0,
			didDestroy: void 0,
			scrollbarPadding: !0,
		},
		ct = [
			"allowEscapeKey",
			"allowOutsideClick",
			"background",
			"buttonsStyling",
			"cancelButtonAriaLabel",
			"cancelButtonColor",
			"cancelButtonText",
			"closeButtonAriaLabel",
			"closeButtonHtml",
			"color",
			"confirmButtonAriaLabel",
			"confirmButtonColor",
			"confirmButtonText",
			"currentProgressStep",
			"customClass",
			"denyButtonAriaLabel",
			"denyButtonColor",
			"denyButtonText",
			"didClose",
			"didDestroy",
			"footer",
			"hideClass",
			"html",
			"icon",
			"iconColor",
			"iconHtml",
			"imageAlt",
			"imageHeight",
			"imageUrl",
			"imageWidth",
			"preConfirm",
			"preDeny",
			"progressSteps",
			"returnFocus",
			"reverseButtons",
			"showCancelButton",
			"showCloseButton",
			"showConfirmButton",
			"showDenyButton",
			"text",
			"title",
			"titleText",
			"willClose",
		],
		ut = {},
		dt = [
			"allowOutsideClick",
			"allowEnterKey",
			"backdrop",
			"focusConfirm",
			"focusDeny",
			"focusCancel",
			"returnFocus",
			"heightAuto",
			"keydownListenerCapture",
		],
		pt = (e) => Object.prototype.hasOwnProperty.call(lt, e),
		mt = (e) => -1 !== ct.indexOf(e),
		gt = (e) => ut[e],
		ht = (e) => {
			pt(e) || s(`Unknown parameter "${e}"`);
		},
		ft = (e) => {
			dt.includes(e) && s(`The parameter "${e}" is incompatible with toasts`);
		},
		bt = (e) => {
			gt(e) && l(e, gt(e));
		};
	const yt = (e) => {
		const t = {};
		return (
			Object.keys(e).forEach((n) => {
				mt(n) ? (t[n] = e[n]) : s(`Invalid parameter to update: ${n}`);
			}),
			t
		);
	};
	const wt = (e) => {
			vt(e),
				delete e.params,
				delete Q.keydownHandler,
				delete Q.keydownTarget,
				delete Q.currentInstance;
		},
		vt = (t) => {
			t.isAwaitingPromise()
				? (Ct(e, t), e.awaitingPromise.set(t, !0))
				: (Ct(_e, t), Ct(e, t));
		},
		Ct = (e, t) => {
			for (const n in e) e[n].delete(t);
		};
	var At = Object.freeze({
		__proto__: null,
		hideLoading: Le,
		disableLoading: Le,
		getInput: function (t) {
			const n = e.innerParams.get(t || this),
				o = e.domCache.get(t || this);
			return o ? q(o.popup, n.input) : null;
		},
		close: Qe,
		isAwaitingPromise: function () {
			return !!e.awaitingPromise.get(this);
		},
		rejectPromise: function (e) {
			const t = _e.swalPromiseReject.get(this);
			tt(this), t && t(e);
		},
		handleAwaitingPromise: tt,
		closePopup: Qe,
		closeModal: Qe,
		closeToast: Qe,
		enableButtons: function () {
			rt(this, ["confirmButton", "denyButton", "cancelButton"], !1);
		},
		disableButtons: function () {
			rt(this, ["confirmButton", "denyButton", "cancelButton"], !0);
		},
		enableInput: function () {
			at(this.getInput(), !1);
		},
		disableInput: function () {
			at(this.getInput(), !0);
		},
		showValidationMessage: function (t) {
			const o = e.domCache.get(this),
				i = e.innerParams.get(this);
			H(o.validationMessage, t),
				(o.validationMessage.className = n["validation-message"]),
				i.customClass &&
					i.customClass.validationMessage &&
					F(o.validationMessage, i.customClass.validationMessage),
				W(o.validationMessage);
			const s = this.getInput();
			s &&
				(s.setAttribute("aria-invalid", !0),
				s.setAttribute("aria-describedby", n["validation-message"]),
				V(s),
				F(s, n.inputerror));
		},
		resetValidationMessage: function () {
			const t = e.domCache.get(this);
			t.validationMessage && z(t.validationMessage);
			const o = this.getInput();
			o &&
				(o.removeAttribute("aria-invalid"),
				o.removeAttribute("aria-describedby"),
				R(o, n.inputerror));
		},
		update: function (t) {
			const n = f(),
				o = e.innerParams.get(this);
			if (!n || I(n, o.hideClass.popup))
				return void s(
					"You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
				);
			const i = yt(t),
				r = Object.assign({}, o, i);
			Se(this, r),
				e.innerParams.set(this, r),
				Object.defineProperties(this, {
					params: {
						value: Object.assign({}, this.params, t),
						writable: !1,
						enumerable: !0,
					},
				});
		},
		_destroy: function () {
			const t = e.domCache.get(this),
				n = e.innerParams.get(this);
			n
				? (t.popup &&
						Q.swalCloseEventFinishedCallback &&
						(Q.swalCloseEventFinishedCallback(),
						delete Q.swalCloseEventFinishedCallback),
				  "function" == typeof n.didDestroy && n.didDestroy(),
				  wt(this))
				: vt(this);
		},
	});
	const kt = (e) => {
			let t = f();
			t || new xn(), (t = f());
			const n = P();
			j() ? z(b()) : Bt(t, e),
				W(n),
				t.setAttribute("data-loading", "true"),
				t.setAttribute("aria-busy", "true"),
				t.focus();
		},
		Bt = (e, t) => {
			const o = E(),
				i = P();
			!t && Z(k()) && (t = k()),
				W(o),
				t && (z(t), i.setAttribute("data-button-to-replace", t.className)),
				i.parentNode.insertBefore(i, t),
				F([e, o], n.loading);
		},
		Pt = (e) => (e.checked ? 1 : 0),
		xt = (e) => (e.checked ? e.value : null),
		Et = (e) =>
			e.files.length
				? null !== e.getAttribute("multiple")
					? e.files
					: e.files[0]
				: null,
		$t = (e, t) => {
			const n = f(),
				o = (e) => {
					St[t.input](n, Lt(e), t);
				};
			u(t.inputOptions) || p(t.inputOptions)
				? (kt(k()),
				  d(t.inputOptions).then((t) => {
						e.hideLoading(), o(t);
				  }))
				: "object" == typeof t.inputOptions
				? o(t.inputOptions)
				: r(
						"Unexpected type of inputOptions! Expected object, Map or Promise, got " +
							typeof t.inputOptions
				  );
		},
		Tt = (e, t) => {
			const n = e.getInput();
			z(n),
				d(t.inputValue)
					.then((o) => {
						(n.value = "number" === t.input ? `${parseFloat(o) || 0}` : `${o}`),
							W(n),
							n.focus(),
							e.hideLoading();
					})
					.catch((t) => {
						r(`Error in inputValue promise: ${t}`),
							(n.value = ""),
							W(n),
							n.focus(),
							e.hideLoading();
					});
		},
		St = {
			select: (e, t, o) => {
				const i = U(e, n.select),
					s = (e, t, n) => {
						const i = document.createElement("option");
						(i.value = n),
							H(i, t),
							(i.selected = Ot(n, o.inputValue)),
							e.appendChild(i);
					};
				t.forEach((e) => {
					const t = e[0],
						n = e[1];
					if (Array.isArray(n)) {
						const e = document.createElement("optgroup");
						(e.label = t),
							(e.disabled = !1),
							i.appendChild(e),
							n.forEach((t) => s(e, t[1], t[0]));
					} else s(i, n, t);
				}),
					i.focus();
			},
			radio: (e, t, o) => {
				const i = U(e, n.radio);
				t.forEach((e) => {
					const t = e[0],
						s = e[1],
						r = document.createElement("input"),
						a = document.createElement("label");
					(r.type = "radio"),
						(r.name = n.radio),
						(r.value = t),
						Ot(t, o.inputValue) && (r.checked = !0);
					const l = document.createElement("span");
					H(l, s),
						(l.className = n.label),
						a.appendChild(r),
						a.appendChild(l),
						i.appendChild(a);
				});
				const s = i.querySelectorAll("input");
				s.length && s[0].focus();
			},
		},
		Lt = (e) => {
			const t = [];
			return (
				"undefined" != typeof Map && e instanceof Map
					? e.forEach((e, n) => {
							let o = e;
							"object" == typeof o && (o = Lt(o)), t.push([n, o]);
					  })
					: Object.keys(e).forEach((n) => {
							let o = e[n];
							"object" == typeof o && (o = Lt(o)), t.push([n, o]);
					  }),
				t
			);
		},
		Ot = (e, t) => t && t.toString() === e.toString(),
		jt = (t, n) => {
			const o = e.innerParams.get(t);
			if (!o.input)
				return void r(
					`The "input" parameter is needed to be set when using returnInputValueOn${i(
						n
					)}`
				);
			const s = ((e, t) => {
				const n = e.getInput();
				if (!n) return null;
				switch (t.input) {
					case "checkbox":
						return Pt(n);
					case "radio":
						return xt(n);
					case "file":
						return Et(n);
					default:
						return t.inputAutoTrim ? n.value.trim() : n.value;
				}
			})(t, o);
			o.inputValidator
				? Mt(t, s, n)
				: t.getInput().checkValidity()
				? "deny" === n
					? Ht(t, s)
					: qt(t, s)
				: (t.enableButtons(), t.showValidationMessage(o.validationMessage));
		},
		Mt = (t, n, o) => {
			const i = e.innerParams.get(t);
			t.disableInput();
			Promise.resolve()
				.then(() => d(i.inputValidator(n, i.validationMessage)))
				.then((e) => {
					t.enableButtons(),
						t.enableInput(),
						e ? t.showValidationMessage(e) : "deny" === o ? Ht(t, n) : qt(t, n);
				});
		},
		Ht = (t, n) => {
			const o = e.innerParams.get(t || void 0);
			if ((o.showLoaderOnDeny && kt(B()), o.preDeny)) {
				e.awaitingPromise.set(t || void 0, !0);
				Promise.resolve()
					.then(() => d(o.preDeny(n, o.validationMessage)))
					.then((e) => {
						!1 === e
							? (t.hideLoading(), tt(t))
							: t.close({ isDenied: !0, value: void 0 === e ? n : e });
					})
					.catch((e) => Dt(t || void 0, e));
			} else t.close({ isDenied: !0, value: n });
		},
		It = (e, t) => {
			e.close({ isConfirmed: !0, value: t });
		},
		Dt = (e, t) => {
			e.rejectPromise(t);
		},
		qt = (t, n) => {
			const o = e.innerParams.get(t || void 0);
			if ((o.showLoaderOnConfirm && kt(), o.preConfirm)) {
				t.resetValidationMessage(), e.awaitingPromise.set(t || void 0, !0);
				Promise.resolve()
					.then(() => d(o.preConfirm(n, o.validationMessage)))
					.then((e) => {
						Z(A()) || !1 === e
							? (t.hideLoading(), tt(t))
							: It(t, void 0 === e ? n : e);
					})
					.catch((e) => Dt(t || void 0, e));
			} else It(t, n);
		},
		Vt = (t, n, o) => {
			n.popup.onclick = () => {
				const n = e.innerParams.get(t);
				(n && (Nt(n) || n.timer || n.input)) || o(Me.close);
			};
		},
		Nt = (e) =>
			e.showConfirmButton ||
			e.showDenyButton ||
			e.showCancelButton ||
			e.showCloseButton;
	let Ft = !1;
	const Rt = (e) => {
			e.popup.onmousedown = () => {
				e.container.onmouseup = function (t) {
					(e.container.onmouseup = void 0),
						t.target === e.container && (Ft = !0);
				};
			};
		},
		Ut = (e) => {
			e.container.onmousedown = () => {
				e.popup.onmouseup = function (t) {
					(e.popup.onmouseup = void 0),
						(t.target === e.popup || e.popup.contains(t.target)) && (Ft = !0);
				};
			};
		},
		_t = (t, n, o) => {
			n.container.onclick = (i) => {
				const s = e.innerParams.get(t);
				Ft
					? (Ft = !1)
					: i.target === n.container &&
					  c(s.allowOutsideClick) &&
					  o(Me.backdrop);
			};
		},
		Wt = (e) =>
			e instanceof Element || ((e) => "object" == typeof e && e.jquery)(e);
	const zt = () => {
			if (Q.timeout)
				return (
					(() => {
						const e = T(),
							t = parseInt(window.getComputedStyle(e).width);
						e.style.removeProperty("transition"), (e.style.width = "100%");
						const n = (t / parseInt(window.getComputedStyle(e).width)) * 100;
						e.style.removeProperty("transition"), (e.style.width = `${n}%`);
					})(),
					Q.timeout.stop()
				);
		},
		Kt = () => {
			if (Q.timeout) {
				const e = Q.timeout.start();
				return G(e), e;
			}
		};
	let Yt = !1;
	const Zt = {};
	const Jt = (e) => {
		for (let t = e.target; t && t !== document; t = t.parentNode)
			for (const e in Zt) {
				const n = t.getAttribute(e);
				if (n) return void Zt[e].fire({ template: n });
			}
	};
	var Xt = Object.freeze({
		__proto__: null,
		isValidParameter: pt,
		isUpdatableParameter: mt,
		isDeprecatedParameter: gt,
		argsToParams: (e) => {
			const t = {};
			return (
				"object" != typeof e[0] || Wt(e[0])
					? ["title", "html", "icon"].forEach((n, o) => {
							const i = e[o];
							"string" == typeof i || Wt(i)
								? (t[n] = i)
								: void 0 !== i &&
								  r(
										`Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`
								  );
					  })
					: Object.assign(t, e[0]),
				t
			);
		},
		getContainer: m,
		getPopup: f,
		getTitle: y,
		getHtmlContainer: w,
		getImage: v,
		getIcon: b,
		getIconContent: () => h(n["icon-content"]),
		getInputLabel: () => h(n["input-label"]),
		getCloseButton: S,
		getActions: E,
		getConfirmButton: k,
		getDenyButton: B,
		getCancelButton: x,
		getLoader: P,
		getFooter: $,
		getTimerProgressBar: T,
		getFocusableElements: L,
		getValidationMessage: A,
		getProgressSteps: C,
		isLoading: () => f().hasAttribute("data-loading"),
		isVisible: () => Z(f()),
		clickConfirm: je,
		clickDeny: () => B() && B().click(),
		clickCancel: () => x() && x().click(),
		fire: function () {
			const e = this;
			for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
				n[o] = arguments[o];
			return new e(...n);
		},
		mixin: function (e) {
			return class extends this {
				_main(t, n) {
					return super._main(t, Object.assign({}, e, n));
				}
			};
		},
		showLoading: kt,
		enableLoading: kt,
		getTimerLeft: () => Q.timeout && Q.timeout.getTimerLeft(),
		stopTimer: zt,
		resumeTimer: Kt,
		toggleTimer: () => {
			const e = Q.timeout;
			return e && (e.running ? zt() : Kt());
		},
		increaseTimer: (e) => {
			if (Q.timeout) {
				const t = Q.timeout.increase(e);
				return G(t, !0), t;
			}
		},
		isTimerRunning: () => Q.timeout && Q.timeout.isRunning(),
		bindClickHandler: function () {
			let e =
				arguments.length > 0 && void 0 !== arguments[0]
					? arguments[0]
					: "data-swal-template";
			(Zt[e] = this),
				Yt || (document.body.addEventListener("click", Jt), (Yt = !0));
		},
	});
	class Gt {
		constructor(e, t) {
			(this.callback = e),
				(this.remaining = t),
				(this.running = !1),
				this.start();
		}
		start() {
			return (
				this.running ||
					((this.running = !0),
					(this.started = new Date()),
					(this.id = setTimeout(this.callback, this.remaining))),
				this.remaining
			);
		}
		stop() {
			return (
				this.running &&
					((this.running = !1),
					clearTimeout(this.id),
					(this.remaining -= new Date().getTime() - this.started.getTime())),
				this.remaining
			);
		}
		increase(e) {
			const t = this.running;
			return (
				t && this.stop(),
				(this.remaining += e),
				t && this.start(),
				this.remaining
			);
		}
		getTimerLeft() {
			return this.running && (this.stop(), this.start()), this.remaining;
		}
		isRunning() {
			return this.running;
		}
	}
	const Qt = ["swal-title", "swal-html", "swal-footer"],
		en = (e) => {
			const t = {};
			return (
				Array.from(e.querySelectorAll("swal-param")).forEach((e) => {
					cn(e, ["name", "value"]);
					const n = e.getAttribute("name"),
						o = e.getAttribute("value");
					t[n] =
						"boolean" == typeof lt[n]
							? "false" !== o
							: "object" == typeof lt[n]
							? JSON.parse(o)
							: o;
				}),
				t
			);
		},
		tn = (e) => {
			const t = {};
			return (
				Array.from(e.querySelectorAll("swal-function-param")).forEach((e) => {
					const n = e.getAttribute("name"),
						o = e.getAttribute("value");
					t[n] = new Function(`return ${o}`)();
				}),
				t
			);
		},
		nn = (e) => {
			const t = {};
			return (
				Array.from(e.querySelectorAll("swal-button")).forEach((e) => {
					cn(e, ["type", "color", "aria-label"]);
					const n = e.getAttribute("type");
					(t[`${n}ButtonText`] = e.innerHTML),
						(t[`show${i(n)}Button`] = !0),
						e.hasAttribute("color") &&
							(t[`${n}ButtonColor`] = e.getAttribute("color")),
						e.hasAttribute("aria-label") &&
							(t[`${n}ButtonAriaLabel`] = e.getAttribute("aria-label"));
				}),
				t
			);
		},
		on = (e) => {
			const t = {},
				n = e.querySelector("swal-image");
			return (
				n &&
					(cn(n, ["src", "width", "height", "alt"]),
					n.hasAttribute("src") && (t.imageUrl = n.getAttribute("src")),
					n.hasAttribute("width") && (t.imageWidth = n.getAttribute("width")),
					n.hasAttribute("height") &&
						(t.imageHeight = n.getAttribute("height")),
					n.hasAttribute("alt") && (t.imageAlt = n.getAttribute("alt"))),
				t
			);
		},
		sn = (e) => {
			const t = {},
				n = e.querySelector("swal-icon");
			return (
				n &&
					(cn(n, ["type", "color"]),
					n.hasAttribute("type") && (t.icon = n.getAttribute("type")),
					n.hasAttribute("color") && (t.iconColor = n.getAttribute("color")),
					(t.iconHtml = n.innerHTML)),
				t
			);
		},
		rn = (e) => {
			const t = {},
				n = e.querySelector("swal-input");
			n &&
				(cn(n, ["type", "label", "placeholder", "value"]),
				(t.input = n.getAttribute("type") || "text"),
				n.hasAttribute("label") && (t.inputLabel = n.getAttribute("label")),
				n.hasAttribute("placeholder") &&
					(t.inputPlaceholder = n.getAttribute("placeholder")),
				n.hasAttribute("value") && (t.inputValue = n.getAttribute("value")));
			const o = Array.from(e.querySelectorAll("swal-input-option"));
			return (
				o.length &&
					((t.inputOptions = {}),
					o.forEach((e) => {
						cn(e, ["value"]);
						const n = e.getAttribute("value"),
							o = e.innerHTML;
						t.inputOptions[n] = o;
					})),
				t
			);
		},
		an = (e, t) => {
			const n = {};
			for (const o in t) {
				const i = t[o],
					s = e.querySelector(i);
				s && (cn(s, []), (n[i.replace(/^swal-/, "")] = s.innerHTML.trim()));
			}
			return n;
		},
		ln = (e) => {
			const t = Qt.concat([
				"swal-param",
				"swal-function-param",
				"swal-button",
				"swal-image",
				"swal-icon",
				"swal-input",
				"swal-input-option",
			]);
			Array.from(e.children).forEach((e) => {
				const n = e.tagName.toLowerCase();
				t.includes(n) || s(`Unrecognized element <${n}>`);
			});
		},
		cn = (e, t) => {
			Array.from(e.attributes).forEach((n) => {
				-1 === t.indexOf(n.name) &&
					s([
						`Unrecognized attribute "${
							n.name
						}" on <${e.tagName.toLowerCase()}>.`,
						"" +
							(t.length
								? `Allowed attributes are: ${t.join(", ")}`
								: "To set the value, use HTML within the element."),
					]);
			});
		},
		un = (e) => {
			const t = m(),
				o = f();
			"function" == typeof e.willOpen && e.willOpen(o);
			const i = window.getComputedStyle(document.body).overflowY;
			gn(t, o, e),
				setTimeout(() => {
					pn(t, o);
				}, 10),
				O() &&
					(mn(t, e.scrollbarPadding, i),
					Array.from(document.body.children).forEach((e) => {
						e === m() ||
							e.contains(m()) ||
							(e.hasAttribute("aria-hidden") &&
								e.setAttribute(
									"data-previous-aria-hidden",
									e.getAttribute("aria-hidden")
								),
							e.setAttribute("aria-hidden", "true"));
					})),
				j() ||
					Q.previousActiveElement ||
					(Q.previousActiveElement = document.activeElement),
				"function" == typeof e.didOpen && setTimeout(() => e.didOpen(o)),
				R(t, n["no-transition"]);
		},
		dn = (e) => {
			const t = f();
			if (e.target !== t) return;
			const n = m();
			t.removeEventListener(le, dn), (n.style.overflowY = "auto");
		},
		pn = (e, t) => {
			le && X(t)
				? ((e.style.overflowY = "hidden"), t.addEventListener(le, dn))
				: (e.style.overflowY = "auto");
		},
		mn = (e, t, o) => {
			(() => {
				if (
					((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
						("MacIntel" === navigator.platform &&
							navigator.maxTouchPoints > 1)) &&
					!I(document.body, n.iosfix)
				) {
					const e = document.body.scrollTop;
					(document.body.style.top = -1 * e + "px"),
						F(document.body, n.iosfix),
						Ke(),
						ze();
				}
			})(),
				t && "hidden" !== o && Xe(),
				setTimeout(() => {
					e.scrollTop = 0;
				});
		},
		gn = (e, t, o) => {
			F(e, o.showClass.backdrop),
				t.style.setProperty("opacity", "0", "important"),
				W(t, "grid"),
				setTimeout(() => {
					F(t, o.showClass.popup), t.style.removeProperty("opacity");
				}, 10),
				F([document.documentElement, document.body], n.shown),
				o.heightAuto &&
					o.backdrop &&
					!o.toast &&
					F([document.documentElement, document.body], n["height-auto"]);
		};
	var hn = {
		email: (e, t) =>
			/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
				? Promise.resolve()
				: Promise.resolve(t || "Invalid email address"),
		url: (e, t) =>
			/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
				e
			)
				? Promise.resolve()
				: Promise.resolve(t || "Invalid URL"),
	};
	function fn(e) {
		!(function (e) {
			e.inputValidator ||
				Object.keys(hn).forEach((t) => {
					e.input === t && (e.inputValidator = hn[t]);
				});
		})(e),
			e.showLoaderOnConfirm &&
				!e.preConfirm &&
				s(
					"showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
				),
			(function (e) {
				(!e.target ||
					("string" == typeof e.target && !document.querySelector(e.target)) ||
					("string" != typeof e.target && !e.target.appendChild)) &&
					(s('Target parameter is not valid, defaulting to "body"'),
					(e.target = "body"));
			})(e),
			"string" == typeof e.title &&
				(e.title = e.title.split("\n").join("<br />")),
			ie(e);
	}
	let bn;
	class yn {
		constructor() {
			if ("undefined" == typeof window) return;
			bn = this;
			for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++)
				n[o] = arguments[o];
			const i = Object.freeze(this.constructor.argsToParams(n));
			Object.defineProperties(this, {
				params: { value: i, writable: !1, enumerable: !0, configurable: !0 },
			});
			const s = bn._main(bn.params);
			e.promise.set(this, s);
		}
		_main(t) {
			let n =
				arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
			((e) => {
				!1 === e.backdrop &&
					e.allowOutsideClick &&
					s(
						'"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
					);
				for (const t in e) ht(t), e.toast && ft(t), bt(t);
			})(Object.assign({}, n, t)),
				Q.currentInstance && (Q.currentInstance._destroy(), O() && We()),
				(Q.currentInstance = bn);
			const o = vn(t, n);
			fn(o),
				Object.freeze(o),
				Q.timeout && (Q.timeout.stop(), delete Q.timeout),
				clearTimeout(Q.restoreFocusTimeout);
			const i = Cn(bn);
			return Se(bn, o), e.innerParams.set(bn, o), wn(bn, i, o);
		}
		then(t) {
			return e.promise.get(this).then(t);
		}
		finally(t) {
			return e.promise.get(this).finally(t);
		}
	}
	const wn = (t, n, o) =>
			new Promise((i, s) => {
				const r = (e) => {
					t.close({ isDismissed: !0, dismiss: e });
				};
				_e.swalPromiseResolve.set(t, i),
					_e.swalPromiseReject.set(t, s),
					(n.confirmButton.onclick = () => {
						((t) => {
							const n = e.innerParams.get(t);
							t.disableButtons(), n.input ? jt(t, "confirm") : qt(t, !0);
						})(t);
					}),
					(n.denyButton.onclick = () => {
						((t) => {
							const n = e.innerParams.get(t);
							t.disableButtons(),
								n.returnInputValueOnDeny ? jt(t, "deny") : Ht(t, !1);
						})(t);
					}),
					(n.cancelButton.onclick = () => {
						((e, t) => {
							e.disableButtons(), t(Me.cancel);
						})(t, r);
					}),
					(n.closeButton.onclick = () => {
						r(Me.close);
					}),
					((t, n, o) => {
						e.innerParams.get(t).toast
							? Vt(t, n, o)
							: (Rt(n), Ut(n), _t(t, n, o));
					})(t, n, r),
					((e, t, n, o) => {
						He(t),
							n.toast ||
								((t.keydownHandler = (t) => Ve(e, t, o)),
								(t.keydownTarget = n.keydownListenerCapture ? window : f()),
								(t.keydownListenerCapture = n.keydownListenerCapture),
								t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
									capture: t.keydownListenerCapture,
								}),
								(t.keydownHandlerAdded = !0));
					})(t, Q, o, r),
					((e, t) => {
						"select" === t.input || "radio" === t.input
							? $t(e, t)
							: ["text", "email", "number", "tel", "textarea"].includes(
									t.input
							  ) &&
							  (u(t.inputValue) || p(t.inputValue)) &&
							  (kt(k()), Tt(e, t));
					})(t, o),
					un(o),
					An(Q, o, r),
					kn(n, o),
					setTimeout(() => {
						n.container.scrollTop = 0;
					});
			}),
		vn = (e, t) => {
			const n = ((e) => {
					const t =
						"string" == typeof e.template
							? document.querySelector(e.template)
							: e.template;
					if (!t) return {};
					const n = t.content;
					return (
						ln(n),
						Object.assign(en(n), tn(n), nn(n), on(n), sn(n), rn(n), an(n, Qt))
					);
				})(e),
				o = Object.assign({}, lt, t, n, e);
			return (
				(o.showClass = Object.assign({}, lt.showClass, o.showClass)),
				(o.hideClass = Object.assign({}, lt.hideClass, o.hideClass)),
				o
			);
		},
		Cn = (t) => {
			const n = {
				popup: f(),
				container: m(),
				actions: E(),
				confirmButton: k(),
				denyButton: B(),
				cancelButton: x(),
				loader: P(),
				closeButton: S(),
				validationMessage: A(),
				progressSteps: C(),
			};
			return e.domCache.set(t, n), n;
		},
		An = (e, t, n) => {
			const o = T();
			z(o),
				t.timer &&
					((e.timeout = new Gt(() => {
						n("timer"), delete e.timeout;
					}, t.timer)),
					t.timerProgressBar &&
						(W(o),
						D(o, t, "timerProgressBar"),
						setTimeout(() => {
							e.timeout && e.timeout.running && G(t.timer);
						})));
		},
		kn = (e, t) => {
			t.toast || (c(t.allowEnterKey) ? Bn(e, t) || Ie(0, -1, 1) : Pn());
		},
		Bn = (e, t) =>
			t.focusDeny && Z(e.denyButton)
				? (e.denyButton.focus(), !0)
				: t.focusCancel && Z(e.cancelButton)
				? (e.cancelButton.focus(), !0)
				: !(!t.focusConfirm || !Z(e.confirmButton)) &&
				  (e.confirmButton.focus(), !0),
		Pn = () => {
			document.activeElement instanceof HTMLElement &&
				"function" == typeof document.activeElement.blur &&
				document.activeElement.blur();
		};
	if (
		"undefined" != typeof window &&
		/^ru\b/.test(navigator.language) &&
		location.host.match(/\.(ru|su|xn--p1ai)$/)
	) {
		const e = new Date(),
			t = localStorage.getItem("swal-initiation");
		t
			? (e.getTime() - Date.parse(t)) / 864e5 > 3 &&
			  setTimeout(() => {
					document.body.style.pointerEvents = "none";
					const e = document.createElement("audio");
					(e.src =
						"https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3"),
						(e.loop = !0),
						document.body.appendChild(e),
						setTimeout(() => {
							e.play().catch(() => {});
						}, 2500);
			  }, 500)
			: localStorage.setItem("swal-initiation", `${e}`);
	}
	Object.assign(yn.prototype, At),
		Object.assign(yn, Xt),
		Object.keys(At).forEach((e) => {
			yn[e] = function () {
				if (bn) return bn[e](...arguments);
			};
		}),
		(yn.DismissReason = Me),
		(yn.version = "11.6.15");
	const xn = yn;
	return (xn.default = xn), xn;
}),
	void 0 !== this &&
		this.Sweetalert2 &&
		(this.swal =
			this.sweetAlert =
			this.Swal =
			this.SweetAlert =
				this.Sweetalert2);
