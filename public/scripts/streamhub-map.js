 /*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/*
From: https://github.com/visionmedia/debug

Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/

/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/

Livefyre.define("event-emitter", [], function() {
    var t = Array.prototype.slice, e = function() {
        this._listeners = {}
    };
    return e.listenerCount = function(t, e) {
        var n = t._listeners[e];
        return n ? n.length : 0
    }, e.prototype.on = function(t, e) {
        return this._listeners[t] = this._listeners[t] || [], this._listeners[t].push(e), this
    }, e.prototype.addListener = e.prototype.on, e.prototype.once = function(t, e) {
        function n() {
            this.removeListener(t, n), e.apply(this, arguments)
        }
        return n.listener = e, this.on(t, n)
    }, e.prototype.removeListener = function(t, e) {
        e && this._listeners[t] && this._listeners[t].splice(this._listeners[t].indexOf(e), 1)
    }, e.prototype.emit = function(e) {
        var n, i = this._listeners[e] || [], r = t.call(arguments, 1);
        if (i.length && (i = i.slice()), "error" === e && !i.length)
            throw n = r[0], n instanceof Error ? n : TypeError('Uncaught, unspecified "error" event');
        for (var o = 0, a = i.length; a > o; o++)
            try {
                i[o].apply(this, r)
            } catch (n) {
                this.emit("error", n)
            }
    }, e
}), Livefyre.define("view/event-map", ["require", "exports", "module"], function(t, e, n) {
    function i(t) {
        this._factories = [], r(this, [t])
    }
    function r(t, e) {
        var n, i, r, o;
        t = t || {}, e = e || [], o = e.length;
        for (var a = 0; o > a; a++)
            if (void 0 !== (r = e[a])) {
                if ("function" == typeof r) {
                    t._factories.push(r);
                    continue
                }
                for (i in r)
                    r.hasOwnProperty(i) && (n = r[i], "_factories" === i && n.slice && (n = n.slice()), t !== n && void 0 !== n && (t[i] = n))
            }
        return t
    }
    i.prototype.extended = function() {
        var t = new i(this), e = [].slice.apply(arguments);
        return r(t, e), t
    }, i.prototype.withContext = function(t) {
        for (var e, n, i = [], o = {}, a = 0, s = this._factories.length; s > a; a++)
            e = this._factories[a], n = {}, i.push(e.call(t, n) || n);
        return r(o, [this].concat(i)), o
    }, n.exports = i
}), Livefyre.define("inherits", [], function() {
    function t(t, e) {
        var n = function() {
        };
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
    return t.parasitically = function(e, n) {
        for (var i, r = t.keys(n.prototype), o = r.length, a = 0; o > a; a++)
            i = r[a], e.prototype[i] || (e.prototype[i] = n.prototype[i])
    }, t.keys = Object.keys || function() {
        var t = Object.prototype.hasOwnProperty, e = !{toString: null}.propertyIsEnumerable("toString"), n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], i = n.length;
        return function(r) {
            if ("object" != typeof r && "function" != typeof r || null === r)
                throw new TypeError("Object.keys called on a non-object");
            var o = [];
            for (var a in r)
                t.call(r, a) && o.push(a);
            if (e)
                for (var s = 0; i > s; s++)
                    t.call(r, n[s]) && o.push(n[s]);
            return o
        }
    }(), t
}), Livefyre.define("view/view", ["require", "exports", "module", "jquery", "event-emitter", "view/event-map", "inherits"], function(t, e, n) {
    function i() {
        return ++u + ""
    }
    var r = t("jquery"), o = t("event-emitter"), a = t("view/event-map"), s = t("inherits"), u = 0, l = function(t) {
        o.call(this), t = t || {}, this.opts = t, this.uid = i(), this.setElement(t.el || document.createElement(this.elTag))
    };
    s(l, o);
    var h = /^(\S+)\s*(.*)$/;
    l.prototype.$ = function(t) {
        return this.$el.find(t)
    }, l.prototype.elTag = "div", l.prototype.elClass = "", l.prototype.events = new a, l.prototype.getTemplateContext = function() {
        return this
    }, l.prototype.template = null, l.prototype.setElement = function(t) {
        return this.el && (this.$el.removeClass(this.elClass), this.undelegateEvents()), this.$el = t instanceof r ? t : r(t), this.el = this.$el[0], this.elClass && this.$el.addClass(this.elClass), this.delegateEvents(), this
    }, l.prototype.delegateEvents = function(t) {
        if (!t && !(t = this.events))
            return this;
        this.undelegateEvents(), t instanceof a && (t = t.withContext(this));
        for (var e in t)
            if (t.hasOwnProperty(e)) {
                var n = t[e];
                if ("string" == typeof n && (n = this[n]), !n)
                    throw "Undefined method for: " + e;
                n = r.proxy(n, this);
                var i = e.match(h);
                if (!i)
                    throw "Invalid event/selector pair: " + e;
                var o = i[1], s = i[2];
                o += ".delegateEvents" + this.uid, "" === s ? this.$el.on(o, n) : this.$el.on(o, s, n)
            }
        return this
    }, l.prototype.undelegateEvents = function() {
        return this.$el.off(".delegateEvents" + this.uid), this
    }, l.prototype.render = function() {
        var t;
        "function" == typeof this.template && (t = this.getTemplateContext(), this.$el.html(this.template(t)))
    }, l.prototype.detach = function() {
        this.$el.detach()
    }, l.prototype.destroy = function() {
        this.$el.remove(), this.template = null, this.undelegateEvents()
    }, n.exports = l
}), Livefyre.define("view", ["view/view"], function(t) {
    return t
}), Livefyre.define("streamhub-sdk/view", ["view"], function(t) {
    return t
});
var Hogan = {};
!function(t, e) {
    function n(t) {
        return (null === t || void 0 === t ? "" : t) + ""
    }
    function i(t) {
        return t = n(t), l.test(t) ? t.replace(r, "&amp;").replace(o, "&lt;").replace(a, "&gt;").replace(s, "&#39;").replace(u, "&quot;") : t
    }
    t.Template = function(t, n, i, r) {
        this.r = t || this.r, this.c = i, this.options = r, this.text = n || "", this.buf = e ? [] : ""
    }, t.Template.prototype = {r: function() {
            return ""
        },v: i,t: n,render: function(t, e, n) {
            return this.ri([t], e || {}, n)
        },ri: function(t, e, n) {
            return this.r(t, e, n)
        },rp: function(t, e, n, i) {
            var r = n[t];
            return r ? (this.c && "string" == typeof r && (r = this.c.compile(r, this.options)), r.ri(e, n, i)) : ""
        },rs: function(t, e, n) {
            var i = t[t.length - 1];
            if (!h(i))
                return n(t, e, this), void 0;
            for (var r = 0; r < i.length; r++)
                t.push(i[r]), n(t, e, this), t.pop()
        },s: function(t, e, n, i, r, o, a) {
            var s;
            return h(t) && 0 === t.length ? !1 : ("function" == typeof t && (t = this.ls(t, e, n, i, r, o, a)), s = "" === t || !!t, !i && s && e && e.push("object" == typeof t ? t : e[e.length - 1]), s)
        },d: function(t, e, n, i) {
            var r = t.split("."), o = this.f(r[0], e, n, i), a = null;
            if ("." === t && h(e[e.length - 2]))
                return e[e.length - 1];
            for (var s = 1; s < r.length; s++)
                o && "object" == typeof o && r[s] in o ? (a = o, o = o[r[s]]) : o = "";
            return i && !o ? !1 : (i || "function" != typeof o || (e.push(a), o = this.lv(o, e, n), e.pop()), o)
        },f: function(t, e, n, i) {
            for (var r = !1, o = null, a = !1, s = e.length - 1; s >= 0; s--)
                if (o = e[s], o && "object" == typeof o && t in o) {
                    r = o[t], a = !0;
                    break
                }
            return a ? (i || "function" != typeof r || (r = this.lv(r, e, n)), r) : i ? !1 : ""
        },ho: function(t, e, n, i, r) {
            var o = this.c, a = this.options;
            a.delimiters = r;
            var i = t.call(e, i);
            return i = null == i ? i + "" : "" + i, this.b(o.compile(i, a).render(e, n)), !1
        },b: e ? function(t) {
            this.buf.push(t)
        } : function(t) {
            this.buf += t
        },fl: e ? function() {
            var t = this.buf.join("");
            return this.buf = [], t
        } : function() {
            var t = this.buf;
            return this.buf = "", t
        },ls: function(t, e, n, i, r, o, a) {
            var s = e[e.length - 1], u = null;
            if (!i && this.c && t.length > 0)
                return this.ho(t, s, n, this.text.substring(r, o), a);
            if (u = t.call(s), "function" == typeof u) {
                if (i)
                    return !0;
                if (this.c)
                    return this.ho(u, s, n, this.text.substring(r, o), a)
            }
            return u
        },lv: function(t, e, i) {
            var r = e[e.length - 1], o = t.call(r);
            return "function" == typeof o && (o = n(o.call(r)), this.c && ~o.indexOf("{{")) ? this.c.compile(o, this.options).render(r, i) : n(o)
        }};
    var r = /&/g, o = /</g, a = />/g, s = /\'/g, u = /\"/g, l = /[&<>\"\']/, h = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
}("undefined" != typeof exports ? exports : Hogan), function(t) {
    function e(t) {
        "}" === t.n.substr(t.n.length - 1) && (t.n = t.n.substring(0, t.n.length - 1))
    }
    function n(t) {
        return t.trim ? t.trim() : t.replace(/^\s*|\s*$/g, "")
    }
    function i(t, e, n) {
        if (e.charAt(n) != t.charAt(0))
            return !1;
        for (var i = 1, r = t.length; r > i; i++)
            if (e.charAt(n + i) != t.charAt(i))
                return !1;
        return !0
    }
    function r(t, e, n, i) {
        for (var s = [], u = null, l = null; t.length > 0; )
            if (l = t.shift(), "#" == l.tag || "^" == l.tag || o(l, i))
                n.push(l), l.nodes = r(t, l.tag, n, i), s.push(l);
            else {
                if ("/" == l.tag) {
                    if (0 === n.length)
                        throw Error("Closing tag without opener: /" + l.n);
                    if (u = n.pop(), l.n != u.n && !a(l.n, u.n, i))
                        throw Error("Nesting error: " + u.n + " vs. " + l.n);
                    return u.end = l.i, s
                }
                s.push(l)
            }
        if (n.length > 0)
            throw Error("missing closing tag: " + n.pop().n);
        return s
    }
    function o(t, e) {
        for (var n = 0, i = e.length; i > n; n++)
            if (e[n].o == t.n)
                return t.tag = "#", !0
    }
    function a(t, e, n) {
        for (var i = 0, r = n.length; r > i; i++)
            if (n[i].c == t && n[i].o == e)
                return !0
    }
    function s(t) {
        return t.replace(b, "\\\\").replace(v, '\\"').replace(_, "\\n").replace(y, "\\r")
    }
    function u(t) {
        return ~t.indexOf(".") ? "d" : "f"
    }
    function l(t) {
        for (var e = "", n = 0, i = t.length; i > n; n++) {
            var r = t[n].tag;
            "#" == r ? e += h(t[n].nodes, t[n].n, u(t[n].n), t[n].i, t[n].end, t[n].otag + " " + t[n].ctag) : "^" == r ? e += c(t[n].nodes, t[n].n, u(t[n].n)) : "<" == r || ">" == r ? e += f(t[n]) : "{" == r || "&" == r ? e += p(t[n].n, u(t[n].n)) : "\n" == r ? e += m('"\\n"' + (t.length - 1 == n ? "" : " + i")) : "_v" == r ? e += d(t[n].n, u(t[n].n)) : void 0 === r && (e += m('"' + s(t[n]) + '"'))
        }
        return e
    }
    function h(t, e, n, i, r, o) {
        return "if(_.s(_." + n + '("' + s(e) + '",c,p,1),' + "c,p,0," + i + "," + r + ',"' + o + '")){' + "_.rs(c,p," + "function(c,p,_){" + l(t) + "});c.pop();}"
    }
    function c(t, e, n) {
        return "if(!_.s(_." + n + '("' + s(e) + '",c,p,1),c,p,1,0,0,"")){' + l(t) + "};"
    }
    function f(t) {
        return '_.b(_.rp("' + s(t.n) + '",c,p,"' + (t.indent || "") + '"));'
    }
    function p(t, e) {
        return "_.b(_.t(_." + e + '("' + s(t) + '",c,p,0)));'
    }
    function d(t, e) {
        return "_.b(_.v(_." + e + '("' + s(t) + '",c,p,0)));'
    }
    function m(t) {
        return "_.b(" + t + ");"
    }
    var g = /\S/, v = /\"/g, _ = /\n/g, y = /\r/g, b = /\\/g, w = {"#": 1,"^": 2,"/": 3,"!": 4,">": 5,"<": 6,"=": 7,_v: 8,"{": 9,"&": 10};
    t.scan = function(t, r) {
        function o() {
            v.length > 0 && (_.push(new String(v)), v = "")
        }
        function a() {
            for (var t = !0, e = x; e < _.length; e++)
                if (t = _[e].tag && w[_[e].tag] < w._v || !_[e].tag && null === _[e].match(g), !t)
                    return !1;
            return t
        }
        function s(t, e) {
            if (o(), t && a())
                for (var n, i = x; i < _.length; i++)
                    _[i].tag || ((n = _[i + 1]) && ">" == n.tag && (n.indent = "" + _[i]), _.splice(i, 1));
            else
                e || _.push({tag: "\n"});
            y = !1, x = _.length
        }
        function u(t, e) {
            var i = "=" + M, r = t.indexOf(i, e), o = n(t.substring(t.indexOf("=", e) + 1, r)).split(" ");
            return L = o[0], M = o[1], r + i.length - 1
        }
        var l = t.length, h = 0, c = 1, f = 2, p = h, d = null, m = null, v = "", _ = [], y = !1, b = 0, x = 0, L = "{{", M = "}}";
        for (r && (r = r.split(" "), L = r[0], M = r[1]), b = 0; l > b; b++)
            p == h ? i(L, t, b) ? (--b, o(), p = c) : "\n" == t.charAt(b) ? s(y) : v += t.charAt(b) : p == c ? (b += L.length - 1, m = w[t.charAt(b + 1)], d = m ? t.charAt(b + 1) : "_v", "=" == d ? (b = u(t, b), p = h) : (m && b++, p = f), y = b) : i(M, t, b) ? (_.push({tag: d,n: n(v),otag: L,ctag: M,i: "/" == d ? y - M.length : b + L.length}), v = "", b += M.length - 1, p = h, "{" == d && ("}}" == M ? b++ : e(_[_.length - 1]))) : v += t.charAt(b);
        return s(y, !0), _
    }, t.generate = function(e, n, i) {
        var r = 'var _=this;_.b(i=i||"");' + l(e) + "return _.fl();";
        return i.asString ? "function(c,p,i){" + r + ";}" : new t.Template(Function("c", "p", "i", r), n, t, i)
    }, t.parse = function(t, e, n) {
        return n = n || {}, r(t, "", [], n.sectionTags || [])
    }, t.cache = {}, t.compile = function(t, e) {
        e = e || {};
        var n = t + "||" + !!e.asString, i = this.cache[n];
        return i ? i : (i = this.generate(this.parse(this.scan(t, e.delimiters), t, e), t, e), this.cache[n] = i)
    }
}("undefined" != typeof exports ? exports : Hogan), "function" == typeof Livefyre.define && Livefyre.define.amd && Livefyre.define("hogan", Hogan), Livefyre.define("hgn", {load: function(t) {
        throw Error("Dynamic load not allowed: " + t)
    }}), Livefyre.define("hgn!streamhub-sdk/content/templates/oembed-photo", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachment">'), i.b("\n" + n), i.b('    <div class="content-attachment-frame"></div>'), i.b("\n" + n), i.b('    <div class="content-attachment-photo" style="background-image: url('), i.b(i.t(i.f("url", t, e, 0))), i.b(');">'), i.b("\n" + n), i.b('        <img class="content-attachment-actual-image" src="'), i.b(i.t(i.f("url", t, e, 0))), i.b('"/>'), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("hgn!streamhub-sdk/content/templates/oembed-video", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachment">'), i.b("\n" + n), i.b('    <div class="content-attachment-frame"></div>'), i.b("\n" + n), i.b('    <div class="content-attachment-photo" style="background-image: url('), i.b(i.t(i.f("thumbnail_url", t, e, 0))), i.b(');">'), i.b("\n" + n), i.b('        <div class="content-attachment-controls content-attachment-controls-play"></div>'), i.b("\n" + n), i.b('        <img class="content-attachment-actual-image" src="'), i.b(i.t(i.f("thumbnail_url", t, e, 0))), i.b('"/>'), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b('    <div class="content-attachment-video">'), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("hgn!streamhub-sdk/content/templates/oembed-link", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachment content-attachment-link">'), i.b("\n" + n), i.b('    <div class="content-attachment-frame"></div>'), i.b("\n" + n), i.s(i.f("thumbnail_url", t, e, 1), t, e, 0, 128, 218, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('        <img class="content-attachment-link-thumbnail" src="'), n.b(n.t(n.f("thumbnail_url", t, e, 0))), n.b('"/>'), n.b("\n")
        }), t.pop()), i.b('    <div class="content-attachment-link-body">'), i.b("\n" + n), i.b('        <a href="'), i.b(i.t(i.f("url", t, e, 0))), i.b('" target="_blank">'), i.b(i.t(i.f("title", t, e, 0))), i.b("</a>"), i.b("\n" + n), i.b('        <p class="content-attachment-provider">via '), i.b(i.t(i.f("provider_name", t, e, 0))), i.b("</p>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("hgn!streamhub-sdk/content/templates/oembed-rich", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachment content-attachment-rich">'), i.b("\n" + n), i.b('    <div class="content-attachment-frame"></div>'), i.b("\n" + n), i.b("    "), i.b(i.t(i.f("html", t, e, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/oembed-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "hgn!streamhub-sdk/content/templates/oembed-photo", "hgn!streamhub-sdk/content/templates/oembed-video", "hgn!streamhub-sdk/content/templates/oembed-link", "hgn!streamhub-sdk/content/templates/oembed-rich", "inherits"], function(t, e, n, i, r, o, a) {
    var s = function(t) {
        e.call(this), this.oembed = t.oembed || {}, this.oembed && (this.template = this.OEMBED_TEMPLATES[this.oembed.type])
    };
    return a(s, e), s.prototype.OEMBED_TEMPLATES = {photo: n,video: i,link: r,rich: o}, s.prototype.render = function() {
        if ("YouTube" === this.oembed.provider_name) {
            var e = /(hqdefault.jpg)$/;
            e.test(this.oembed.thumbnail_url) && (this.oembed.thumbnail_url = this.oembed.thumbnail_url.replace(e, "mqdefault.jpg"))
        }
        var n = t.extend({}, this.oembed);
        if (this.$el.html(this.template(n)), "photo" === this.oembed.type || "video" === this.oembed.type) {
            var i = this, r = this.$el.find("img.content-attachment-actual-image");
            r.hide(), r.on("load", function() {
                r.parent().is(".content-attachment-photo") ? r.parent().fadeIn() : r.fadeIn(), i.$el.trigger("imageLoaded.hub")
            }), r.on("error", function() {
                i.$el.trigger("imageError.hub", i.oembed)
            })
        }
    }, s
}), Livefyre.define("hgn!streamhub-sdk/content/templates/attachment-list", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachments-stacked"></div>'), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/attachment-list-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "streamhub-sdk/content/views/oembed-view", "hgn!streamhub-sdk/content/templates/attachment-list", "inherits"], function(t, e, n, i, r) {
    var o = function(t) {
        t = t || {}, this.oembedViews = [], e.call(this, t), t.content && this.setContent(t.content)
    };
    return r(o, e), o.prototype.template = i, o.prototype.stackedAttachmentsSelector = ".content-attachments-stacked", o.prototype.contentAttachmentSelector = ".content-attachment", o.prototype.listLengthAttribute = "data-hub-list-length", o.prototype.setContent = function(t) {
        var e = this;
        if (t) {
            this.content && (this.$el.find(this.contentAttachmentSelector).remove(), this.oembedViews = []), this.content = t;
            for (var n = 0; n < this.content.attachments.length; n++)
                this.add(this.content.attachments[n]);
            this.content.on("attachment", function(t) {
                e.add(t)
            }), this.content.on("removeAttachment", function(t) {
                e.remove(t)
            })
        }
    }, o.prototype.setElement = function() {
        var t = e.prototype.setElement.apply(this, arguments);
        return this.$el.attr(this.listLengthAttribute, this.count()), t
    }, o.prototype.render = function() {
        var n = this;
        e.prototype.render.call(this), t.each(n.oembedViews, function(t, e) {
            n.$el.has(e.$el).length || n._insert(e)
        })
    }, o.prototype.count = function() {
        return this.oembedViews.length
    }, o.prototype._insert = function(t) {
        t.$el.appendTo(this.$el.find(this.stackedAttachmentsSelector))
    }, o.prototype.add = function(t) {
        var e = this._createOembedView(t);
        return this.oembedViews.push(e), this.el && (this._insert(e), e.render(), this.$el.attr(this.listLengthAttribute, this.count())), e
    }, o.prototype.remove = function(t) {
        var e = this.getOembedView(t);
        return e ? (e.$el.remove(), this.oembedViews.splice(this.oembedViews.indexOf(e), 1), !0) : !1
    }, o.prototype._createOembedView = function(t) {
        var e = new n({oembed: t});
        return e
    }, o.prototype.getOembedView = function(t) {
        for (var e = 0; e < this.oembedViews.length; e++) {
            var n = this.oembedViews[e];
            if (t === n.oembed || t.id && n.oembed.id === t.id)
                return n
        }
        return null
    }, o.prototype.destroy = function() {
        e.prototype.destroy.call(this), this.oembedViews = null
    }, o
}), Livefyre.define("hgn!streamhub-sdk/content/templates/tiled-attachment-list", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachments-interactive-gallery"></div>'), i.b("\n" + n), i.b('<div class="content-attachments-tiled"></div>'), i.b("\n" + n), i.b('<div class="content-attachments-stacked"></div>'), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/tiled-attachment-list-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "streamhub-sdk/content/views/attachment-list-view", "streamhub-sdk/content/views/oembed-view", "hgn!streamhub-sdk/content/templates/tiled-attachment-list", "inherits"], function(t, e, n, i, r, o) {
    var a = function(t) {
        t = t || {}, this.oembedViews = [], n.call(this, t)
    };
    return o(a, n), a.prototype.template = r, a.prototype.tiledAttachmentsSelector = ".content-attachments-tiled", a.prototype.stackedAttachmentsSelector = ".content-attachments-stacked", a.prototype.squareTileClassName = "content-attachment-square-tile", a.prototype.horizontalTileClassName = "content-attachment-horizontal-tile", a.prototype.contentAttachmentSelector = ".content-attachment", a.prototype.render = function() {
        n.prototype.render.call(this), this.retile()
    }, a.prototype.isTileableAttachment = function(t) {
        return "photo" === t.type || "video" === t.type ? !0 : !1
    }, a.prototype.tileableCount = function() {
        for (var t = 0, e = 0; e < this.oembedViews.length; e++)
            this.isTileableAttachment(this.oembedViews[e].oembed) && t++;
        return t
    }, a.prototype.add = function(e) {
        var i = this, r = n.prototype.add.call(this, e);
        return r.$el.on("click", function(e) {
            t(e.target).trigger("focusContent.hub", {content: i.content,attachmentToFocus: r.oembed})
        }), this.retile(), this
    }, a.prototype._insert = function(t) {
        var e = this.$el.find(this.tiledAttachmentsSelector), n = this.$el.find(this.stackedAttachmentsSelector);
        this.isTileableAttachment(t.oembed) ? t.$el.appendTo(e) : t.$el.appendTo(n)
    }, a.prototype.remove = function(t) {
        n.prototype.remove.call(this, t), this.retile()
    }, a.prototype.retile = function() {
        if (this.el) {
            var t = this.$el.find(this.tiledAttachmentsSelector), e = this.tileableCount(this.oembedViews);
            t.removeClass("content-attachments-1").removeClass("content-attachments-2").removeClass("content-attachments-3").removeClass("content-attachments-4"), e && 4 >= e && t.addClass("content-attachments-" + e), t.find(this.contentAttachmentSelector).addClass(this.squareTileClassName), 3 === e ? t.find(this.contentAttachmentSelector + ":first").removeClass(this.squareTileClassName).addClass(this.horizontalTileClassName) : e > 4 ? t.find(this.contentAttachmentSelector).removeClass(this.squareTileClassName).addClass(this.horizontalTileClassName) : t.find(this.contentAttachmentSelector).removeClass(this.horizontalTileClassName).addClass(this.squareTileClassName)
        }
    }, a
}), Livefyre.define("hgn!streamhub-sdk/content/templates/gallery-attachment-list", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-attachments-meta">'), i.b("\n" + n), i.b('    <div class="content-attachments-meta-avatar"></div>'), i.b("\n" + n), i.b('    <div class="content-attachments-meta-name"></div>'), i.b("\n" + n), i.b('    <div class="content-attachments-meta-subname"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments-gallery">'), i.b("\n" + n), i.b('    <div class="content-attachments-gallery-focused"></div>'), i.b("\n" + n), i.b('    <div class="content-attachments-gallery-thumbnails"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments-gallery-prev">'), i.b("\n" + n), i.b('    <div class="content-attachments-gallery-prev-btn"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b('<div class="content-attachments-gallery-next">'), i.b("\n" + n), i.b('    <div class="content-attachments-gallery-next-btn"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments-gallery-count">'), i.b("\n" + n), i.b('    <span class="content-attachments-gallery-current-page"></span> of <span class="content-attachments-gallery-total-pages"></span>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("hgn!streamhub-sdk/content/templates/content-byline", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-header-inner">'), i.b("\n" + n), i.s(i.d("author.avatar", t, e, 1), t, e, 0, 57, 163, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('        <a class="content-author-avatar">'), i.b("\n" + n), i.b('            <img src="'), i.b(i.v(i.d("author.avatar", t, e, 0))), i.b('" />'), i.b("\n" + n), i.b("        </a>"), i.b("\n")
        }), t.pop()), i.b('    <div class="content-byline">'), i.b("\n" + n), i.s(i.d("author.url", t, e, 1), t, e, 0, 238, 359, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('            <a class="content-author-name" href="'), n.b(n.v(n.d("author.url", t, e, 0))), n.b('" target="_blank">'), n.b(n.v(n.d("author.displayName", t, e, 0))), n.b("</a>"), n.b("\n")
        }), t.pop()), i.s(i.d("author.url", t, e, 1), t, e, 1, 0, 0, "") || (i.s(i.d("author.profileUrl", t, e, 1), t, e, 0, 433, 791, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('                <div class="content-author-name">'), i.b("\n" + n), i.b('                    <a href="'), i.b(i.v(i.d("author.profileUrl", t, e, 0))), i.b('" target="_blank">'), i.b(i.v(i.d("author.displayName", t, e, 0))), i.b("</a>"), i.b("\n" + n), i.b("                </div>"), i.b("\n" + n), i.b('                <a class="content-author-username" href="https://twitter.com/intent/user?user_id='), i.b(i.v(i.d("author.twitterUserId", t, e, 0))), i.b('" target="_blank">@'), i.b(i.v(i.d("author.twitterUsername", t, e, 0))), i.b("</a>"), i.b("\n")
        }), t.pop()), i.s(i.d("author.profileUrl", t, e, 1), t, e, 1, 0, 0, "") || (i.b('                <span class="content-author-name">'), i.b(i.v(i.d("author.displayName", t, e, 0))), i.b("</span>"), i.b("\n"))), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/gallery-attachment-list-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "streamhub-sdk/content/views/tiled-attachment-list-view", "streamhub-sdk/content/views/oembed-view", "hgn!streamhub-sdk/content/templates/gallery-attachment-list", "hgn!streamhub-sdk/content/templates/content-byline", "inherits"], function(t, e, n, i, r, o, a) {
    var s = function(n) {
        n = n || {}, e.call(this, n), this.userInfo = void 0 === n.userInfo ? !0 : n.userInfo, this.pageButtons = void 0 === n.pageButtons ? !0 : n.pageButtons, this.pageCount = void 0 === n.pageCount ? !0 : n.pageCount, this.thumbnails = void 0 === n.thumbnails ? !1 : n.thumbnails, this.proportionalThumbnails = void 0 === n.proportionalThumbnails ? !1 : n.proportionalThumbnails, this.focusedIndex = 0, this.oembedViews = [], n.content && this.setContent(n.content), n.attachmentToFocus && this.setFocusedAttachment(n.attachmentToFocus);
        var i = this;
        t(window).on("resize", function() {
            i.resizeFocusedAttachment()
        }), t(window).on("keyup", function(t) {
            t.preventDefault(), i.pageButtons && (37 === t.keyCode ? i.prev() : 39 === t.keyCode && i.next())
        })
    };
    return a(s, e), t.extend(s.prototype, n.prototype), s.prototype.template = r, s.prototype.attachmentsGallerySelector = ".content-attachments-gallery", s.prototype.focusedAttachmentsSelector = ".content-attachments-gallery-focused", s.prototype.galleryThumbnailsSelector = ".content-attachments-gallery-thumbnails", s.prototype.galleryPrevSelector = ".content-attachments-gallery-prev", s.prototype.galleryNextSelector = ".content-attachments-gallery-next", s.prototype.galleryCloseSelector = ".content-attachments-gallery-close", s.prototype.galleryCountSelector = ".content-attachments-gallery-count", s.prototype.galleryCurrentPageSelector = ".content-attachments-gallery-current-page", s.prototype.galleryTotalPagesSelector = ".content-attachments-gallery-total-pages", s.prototype.focusedAttachmentClassName = "content-attachments-focused", s.prototype.attachmentMetaSelector = ".content-attachments-meta", s.prototype.actualImageSelector = ".content-attachment-actual-image", s.prototype.events = n.prototype.events.extended({click: function() {
            this.$el.trigger("hideModal.hub")
        },"focusContent.hub": function(t, e) {
            if (e.content)
                for (var n = 0; n < e.content.attachments; n++)
                    this.add(e.content.attachments[n]);
            this.setFocusedAttachment(e.attachmentToFocus), this.render()
        }}, function(e) {
        var n = [this.attachmentMetaSelector, this.galleryNextSelector, this.galleryPrevSelector, this.actualImageSelector].join(",");
        e["click " + n] = function(e) {
            e.stopPropagation(), this.pageButtons && (t(e.currentTarget).hasClass(this.galleryNextSelector.substring(1)) || t(e.currentTarget).hasClass(this.actualImageSelector.substring(1)) ? this.next() : t(e.currentTarget).hasClass(this.galleryPrevSelector.substring(1)) && this.prev())
        }
    }), s.prototype.setFocusedAttachment = function(t) {
        t = t.el ? t.oembed : t, this._focusedAttachment = t
    }, s.prototype.setElement = function(t) {
        return e.prototype.setElement.call(this, t)
    }, s.prototype.render = function() {
        n.prototype.render.call(this);
        var e = this.$el.find(this.attachmentsGallerySelector), i = this;
        t.each(this.oembedViews, function(n, r) {
            r.$el.appendTo(e.find(i.galleryThumbnailsSelector)), r.$el.on("click", function(e) {
                t(e.target).trigger("focusContent.hub", {content: i.content,attachmentToFocus: r.oembed})
            }), r.render()
        });
        var r = this.$el.find(this.attachmentMetaSelector);
        r[this.userInfo ? "show" : "hide"]();
        var o = this.$el.find([this.galleryPrevSelector, this.galleryNextSelector].join(","));
        o[this.pageButtons ? "show" : "hide"]();
        var a = this.$el.find(this.galleryCountSelector);
        a[this.pageCount ? "show" : "hide"]();
        var s = this.$el.find(this.galleryThumbnailsSelector);
        if (this.proportionalThumbnails)
            for (var u = s.children(), l = 0; l < u.length; l++)
                u.eq(l).width(100 / u.length + "%").height(75);
        this.focus(), this._rendered = !0
    }, s.prototype.setContent = function(t, e) {
        e = e || {}, n.prototype.setContent.apply(this, arguments), e.attachment && this.setFocusedAttachment(e.attachment), this._rendered && this.render()
    }, s.prototype._insert = function(e) {
        var n = this, i = this.$el.find(this.stackedAttachmentsSelector), r = this.$el.find(this.attachmentsGallerySelector);
        return this.isTileableAttachment(e.oembed) ? (e.$el.appendTo(r.find(this.galleryThumbnailsSelector)), e.$el.on("click", function(i) {
            t(i.target).trigger("focusContent.hub", {content: n.content,attachmentToFocus: e.oembed})
        })) : e.$el.appendTo(i), e
    }, s.prototype.add = function(t) {
        if (!this.isTileableAttachment(t))
            return this;
        var e = n.prototype.add.call(this, t);
        return this.focus(), e
    }, s.prototype.focus = function(t) {
        if (t || this.oembedViews.length) {
            t = t ? t : this._focusedAttachment || this.oembedViews[0].oembed, this._focusedAttachment || this.setFocusedAttachment(t);
            var e = this.$el.find(this.focusedAttachmentsSelector);
            e.empty();
            var n = new i({oembed: t});
            n.render();
            var r = n.$el.clone();
            r.appendTo(e);
            var a = r.find(".content-attachment-photo");
            if (a.addClass(this.focusedAttachmentClassName), "video" === this._focusedAttachment.type) {
                var s = r.find(".content-attachment-controls-play");
                s.hide(), a.hide().removeClass(this.focusedAttachmentClassName);
                var u = r.find(".content-attachment-video");
                u.addClass(this.focusedAttachmentClassName), u.html(this._focusedAttachment.html), this.tile && u.find("iframe").css({width: "100%",height: "100%"}), u.show()
            }
            var l = this.tileableCount();
            if (this.pageCount) {
                for (var h = 0, c = 0; c < this.oembedViews.length; c++) {
                    if (this.oembedViews[c].oembed === this._focusedAttachment) {
                        this.focusedIndex = h;
                        break
                    }
                    this.isTileableAttachment(this.oembedViews[c].oembed) && h++
                }
                this.$el.find(this.galleryCurrentPageSelector).html(this.focusedIndex + 1), this.$el.find(this.galleryTotalPagesSelector).html(l);
                var f = this.$el.find(this.galleryCountSelector);
                l > 1 ? f.show() : f.hide()
            }
            1 === l ? (this.$el.find(this.galleryPrevSelector).hide(), this.$el.find(this.galleryNextSelector).hide()) : this.focusedIndex + 1 === l ? (this.$el.find(this.galleryPrevSelector).show(), this.$el.find(this.galleryNextSelector).hide()) : 0 === this.focusedIndex ? (this.$el.find(this.galleryPrevSelector).hide(), this.$el.find(this.galleryNextSelector).show()) : (this.$el.find(this.galleryPrevSelector).show(), this.$el.find(this.galleryNextSelector).show());
            var p = this.$el.find(this.attachmentMetaSelector);
            p.html(o(this.content));
            var d = this, m = this.$el.find("." + this.focusedAttachmentClassName + "> *");
            m.length && ("IMG" === m[0].tagName ? m.on("load", function() {
                d.resizeFocusedAttachment()
            }) : this.resizeFocusedAttachment())
        }
    }, s.prototype.resizeFocusedAttachment = function() {
        var t = this.$el.find("." + this.focusedAttachmentClassName);
        t.children().eq(0).width("100%").height("100%"), this.$el.trigger("galleryResize.hub")
    }, s.prototype.next = function() {
        for (var t = 0, e = 0; e < this.oembedViews.length; e++)
            if (this.isTileableAttachment(this.oembedViews[e].oembed)) {
                if (this.focusedIndex + 1 === t) {
                    this.focusedIndex = t, this._focusedAttachment = this.oembedViews[e].oembed, this.render();
                    break
                }
                t++
            }
    }, s.prototype.prev = function() {
        for (var t = 0, e = 0; e < this.oembedViews.length; e++)
            if (this.isTileableAttachment(this.oembedViews[e].oembed)) {
                if (this.focusedIndex - 1 === t) {
                    this.focusedIndex = t, this._focusedAttachment = this.oembedViews[e].oembed, this.render();
                    break
                }
                t++
            }
    }, s
}), Livefyre.define("hgn!streamhub-sdk/modal/templates/modal", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="hub-modal-close">&times;</div>'), i.b("\n" + n), i.b('<div class="hub-modal-content">'), i.b("\n" + n), i.b('    <div class="hub-modal-content-view"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/modal/main", ["streamhub-sdk/jquery", "streamhub-sdk/view", "streamhub-sdk/content/views/gallery-attachment-list-view", "hgn!streamhub-sdk/modal/templates/modal", "inherits"], function(t, e, n, i, r) {
    var o = function(n) {
        n = n || {}, this.visible = !1, this._attached = !1, this._modalSubView = n.modalSubView || null, e.call(this);
        var i = this;
        t(window).keyup(function(t) {
            27 === t.keyCode && i.visible && i.hide()
        }), o.instances.push(this)
    };
    return r(o, e), o.instances = [], o.$el = t('<div class="hub-modals"></div>'), o.el = o.$el[0], o.insertEl = function() {
        t("body").append(o.el)
    }, t(document).ready(o.insertEl), o.prototype.template = i, o.prototype.elClass = " hub-modal", o.prototype.modalElSelector = ".hub-modal", o.prototype.closeButtonSelector = ".hub-modal-close", o.prototype.containerElSelector = ".hub-modal-content", o.prototype.contentViewElSelector = ".hub-modal-content-view", o.prototype.show = function(e) {
        t.each(o.instances, function(t, e) {
            e.hide()
        }), t("body").css({overflow: "hidden"}), this.$el.show(), this._attached || this._attach(), this._modalSubView = e, this.render(), this.visible = !0
    }, o.prototype.hide = function() {
        this.$el.hide(), this._detach(), this.visible = !1
    }, o.prototype.render = function() {
        e.prototype.render.call(this), this._modalSubView.setElement(this.$el.find(this.contentViewElSelector)), this._modalSubView.render()
    }, o.prototype.setElement = function(n) {
        e.prototype.setElement.call(this, n);
        var i = this;
        return this.$el.addClass(this.elClass), this.$el.on("hideModal.hub", function() {
            i.hide(), t("body").css("overflow", "auto")
        }), this.$el.on("click", this.closeButtonSelector, function() {
            i.$el.trigger("hideModal.hub")
        }), this.$el.on("click", function(e) {
            (t(e.target).hasClass("hub-modal-content") || t(e.target).hasClass("hub-modal-close")) && i.$el.trigger("hideModal.hub")
        }), this
    }, o.prototype._attach = function() {
        this.$el.appendTo(o.$el), this._attached = !0
    }, o.prototype._detach = function() {
        this.$el.detach(), this._attached = !1
    }, o
}), Livefyre.define("streamhub-sdk/modal", ["streamhub-sdk/modal/main"], function(t) {
    return t
}), Livefyre.define("streamhub-sdk/content/main", ["streamhub-sdk/jquery", "event-emitter", "inherits"], function(t, e, n) {
    var i = function(t) {
        var n = t, r = {};
        e.call(this), "object" == typeof t && (n = n.body, r = t), this.body = n;
        var o = "number" == typeof r.visibility ? r.visibility : "number" == typeof r.vis ? r.vis : 1;
        this.visibility = i.enums.visibility[o], this.attachments = r.attachments || [], this.replies = r.replies || []
    };
    return n(i, e), i.prototype.addAttachment = function(t) {
        this.attachments.push(t), this.emit("attachment", t)
    }, i.prototype.removeAttachment = function(t) {
        this.attachments.splice(this.attachments.indexOf(t), 1), this.emit("removeAttachment", t)
    }, i.prototype.addReply = function(t) {
        this.replies.push(t), this.emit("reply", t)
    }, i.prototype.set = function(t) {
        t = t || {};
        var e, n, i, r = {};
        for (var o in t)
            t.hasOwnProperty(o) && "_" !== o.charAt(0) && (e = r[o] = this[o], n = this[o] = t[o], n !== e && (this.emit("change:" + o, n, e), i = !0));
        i && this.emit("change", t, r)
    }, i.enums = {}, i.enums.visibility = ["NONE", "EVERYONE", "OWNER", "GROUP"], i
}), Livefyre.define("streamhub-sdk/content", ["streamhub-sdk/content/main"], function(t) {
    return t
}), Livefyre.define("streamhub-sdk/content/types/livefyre-content", ["streamhub-sdk/jquery", "streamhub-sdk/content", "inherits"], function(t, e, n) {
    var i = function(t) {
        return e.call(this), t ? (t.content = t.content || {}, this.body = t.content.bodyHtml || "", this.source = i.SOURCES[t.source], this.id = t.content.id || t.id, this.author = t.author, this.createdAt = new Date(1e3 * t.content.createdAt), this.updatedAt = new Date(1e3 * t.content.updatedAt), this.visibility = e.enums.visibility[t.vis], this.parentId = t.content.parentId, this.meta = t, this._readAnnotations(t.content.annotations || {}), void 0) : this
    };
    return n(i, e), i.prototype.addAttachment = function(t) {
        var e = !1;
        if (t.id)
            for (var n in this.attachments)
                this.attachments[n].id === t.id && (e = !0);
        e || (this.attachments.push(t), this.emit("attachment", t))
    }, i.prototype.addReply = function(t) {
        var e = !1;
        if (t.id)
            for (var n in this.replies)
                this.replies[n].id === t.id && (e = !0);
        e || (this.replies.push(t), this.emit("reply", t))
    }, i.prototype.isFeatured = function() {
        return Boolean(this.featured)
    }, i.prototype.getFeaturedValue = function() {
        return this.featured.value
    }, i.prototype._readAnnotations = function(t) {
        this._annotations = t, this.featured = t.featuredmessage || !1
    }, i.SOURCES = ["livefyre", "twitter", "twitter", "facebook", "livefyre", "livefyre", "facebook", "twitter", "livefyre", "unknown", "unknown", "unknown", "unknown", "feed", "facebook", "unknown", "unknown", "unknown", "unknown", "instagram"], i
}), Livefyre.define("streamhub-sdk/content/types/twitter-content", ["streamhub-sdk/content", "inherits"], function(t, e) {
    var n = function(e) {
        t.call(this, this), e = e || {}, this.tweetId = e.tweetId
    };
    return e(n, t), n
}), Livefyre.define("streamhub-sdk/content/types/livefyre-twitter-content", ["streamhub-sdk/jquery", "streamhub-sdk/content/types/twitter-content", "streamhub-sdk/content/types/livefyre-content", "inherits"], function(t, e, n, i) {
    var r = function(t) {
        n.call(this, t), this.tweetId = r.tweetIdFromLivefyreId(this.id), this.author && (this.author.twitterUserId = r.twitterUserIdFromLivefyreAuthorId(this.author.id))
    };
    return i(r, n), r.tweetIdFromLivefyreId = function(t) {
        var e = /tweet-(\d+)@twitter.com/, n = t.match(e);
        if (!n)
            throw Error("Can't parse tweet ID from Livefyre ID");
        return n[1]
    }, r.twitterUserIdFromLivefyreAuthorId = function(t) {
        var e = /([^@]+)@twitter.com/, n = t.match(e);
        if (!n)
            throw Error("Can't parse twitterUserId from Livefyre authorId");
        return n[1]
    }, r
}), Livefyre.define("streamhub-sdk/content/types/livefyre-facebook-content", ["streamhub-sdk/jquery", "streamhub-sdk/content/types/livefyre-content", "inherits"], function(t, e, n) {
    function i(e) {
        var n = t("<div></div>");
        return n.append(e), n.html()
    }
    var r = function(n) {
        e.call(this, n);
        try {
            var r = t(this.body);
            r.find(".fyre-image, .fyre-link").remove(), this.body = i(r)
        } catch (o) {
        }
    };
    return n(r, e), r
}), Livefyre.define("streamhub-sdk/content/types/livefyre-instagram-content", ["streamhub-sdk/content/types/livefyre-content", "inherits"], function(t, e) {
    var n = function(e) {
        t.call(this, e)
    };
    return e(n, t), n
}), Livefyre.define("hgn!streamhub-sdk/content/templates/content", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-header">'), i.b("\n" + n), i.b('    <div class="content-header-inner">'), i.b("\n" + n), i.s(i.d("author.avatar", t, e, 1), t, e, 0, 94, 216, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('            <a class="content-author-avatar">'), i.b("\n" + n), i.b('                <img src="'), i.b(i.v(i.d("author.avatar", t, e, 0))), i.b('" />'), i.b("\n" + n), i.b("            </a>"), i.b("\n")
        }), t.pop()), i.b('        <div class="content-byline">'), i.b("\n" + n), i.s(i.d("author.url", t, e, 1), t, e, 0, 299, 428, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('                <a class="content-author-name" href="'), n.b(n.v(n.d("author.url", t, e, 0))), n.b('" target="_blank">'), n.b(n.v(n.d("author.displayName", t, e, 0))), n.b("</a>"), n.b("\n")
        }), t.pop()), i.s(i.d("author.url", t, e, 1), t, e, 1, 0, 0, "") || (i.b('                <span class="content-author-name">'), i.b(i.v(i.d("author.displayName", t, e, 0))), i.b("</span>"), i.b("\n")), i.b("        </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments"></div>'), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-body">'), i.b("\n" + n), i.b("	"), i.b(i.t(i.f("body", t, e, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.s(i.f("featured", t, e, 1), t, e, 0, 719, 769, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-featured">Featured</div>'), n.b("\n")
        }), t.pop()), i.b("\n" + n), i.b('<div class="content-meta">'), i.b("\n" + n), i.s(i.f("formattedCreatedAt", t, e, 1), t, e, 0, 838, 910, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-created-at">'), n.b(n.t(n.f("formattedCreatedAt", t, e, 0))), n.b("</div>"), n.b("\n")
        }), t.pop()), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/debug", ["require", "exports", "module"], function(t, e, n) {
    function i(t) {
        return i.enabled(t) ? function(e) {
            e = r(e);
            var n = new Date, o = n - (i[t] || n);
            i[t] = n, e = t + " " + e + " +" + i.humanize(o), arguments[0] = e;
            var a = window.console;
            a && a.log && Function.prototype.apply.call(a.log, a, arguments)
        } : function() {
        }
    }
    function r(t) {
        return t instanceof Error ? t.stack || t.message : t
    }
    n.exports = i, i.names = [], i.skips = [], i.enable = function(t) {
        try {
            localStorage.debug = t
        } catch (e) {
        }
        for (var n = (t || "").split(/[\s,]+/), r = n.length, o = 0; r > o; o++)
            t = n[o].replace("*", ".*?"), "-" === t[0] ? i.skips.push(RegExp("^" + t.substr(1) + "$")) : i.names.push(RegExp("^" + t + "$"))
    }, i.disable = function() {
        i.enable("")
    }, i.humanize = function(t) {
        var e = 1e3, n = 6e4, i = 60 * n;
        return t >= i ? (t / i).toFixed(1) + "h" : t >= n ? (t / n).toFixed(1) + "m" : t >= e ? (0 | t / e) + "s" : t + "ms"
    }, i.enabled = function(t) {
        var e, n;
        for (e = 0, n = i.skips.length; n > e; e++)
            if (i.skips[e].test(t))
                return !1;
        for (e = 0, n = i.names.length; n > e; e++)
            if (i.names[e].test(t))
                return !0;
        return !1
    }, window.localStorage && i.enable(localStorage.debug)
}), Livefyre.define("streamhub-sdk/util", ["streamhub-sdk/debug", "streamhub-sdk/jquery"], function(t, e) {
    var n = t("util"), i = {};
    i.outerWidth = function(t) {
        return n("Deprecated: util.outerWidth"), e(t).outerWidth(!0)
    }, i.outerHeight = function(t) {
        return n("Deprecated: util.outerHeight"), e(t).outerHeight(!0)
    }, i.innerWidth = function(t) {
        return n("Deprecated: util.innerWidth"), e(t).innerWidth()
    }, i.innerHeight = function(t) {
        return n("Deprecated: util.innerHeight"), e(t).innerHeight()
    };
    var r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return i.formatDate = function(t, e) {
        e = e || new Date;
        var n, i = t.getTime() - e.getTime();
        return i > 0 ? "" : i > -6e4 ? Math.round(-1 * i / 1e3) + "s" : i > -36e5 ? Math.round(-1 * i / 6e4) + "m" : i > -864e5 ? Math.round(-1 * i / 36e5) + "h" : (n = t.getDate() + " " + r[t.getMonth()], t.getFullYear() !== e.getFullYear() && (n += " " + t.getFullYear()), n)
    }, Object.keys = Object.keys || function() {
        var t = Object.prototype.hasOwnProperty, e = !{toString: null}.propertyIsEnumerable("toString"), n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], i = n.length;
        return function(r) {
            if ("object" != typeof r && "function" != typeof r || null === r)
                throw new TypeError("Object.keys called on a non-object");
            var o = [];
            for (var a in r)
                t.call(r, a) && o.push(a);
            if (e)
                for (var s = 0; i > s; s++)
                    t.call(r, n[s]) && o.push(n[s]);
            return o
        }
    }(), Array.prototype.indexOf = Array.prototype.indexOf || function(t) {
        return e.inArray(t, this)
    }, i
}), Livefyre.define("streamhub-sdk/content/views/content-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "hgn!streamhub-sdk/content/templates/content", "streamhub-sdk/util", "inherits", "streamhub-sdk/debug"], function(t, e, n, i, r, o) {
    var a = o("streamhub-sdk/content/views/content-view"), s = function(t) {
        var e = this;
        t = t || {}, this.content = t.content, this.createdAt = new Date, this.template = t.template || this.template, this.attachmentsView = t.attachmentsView, this.setElement(t.el || document.createElement(this.elTag)), this.content && (this.content.on("reply", function() {
            e.render()
        }), this.content.on("change:visibility", function(t, n) {
            e._handleVisibilityChange(t, n)
        }), this.content.on("change", function() {
            e.render()
        }))
    };
    return r(s, e), s.prototype.elTag = "article", s.prototype.elClass = "content", s.prototype.contentWithImageClass = "content-with-image", s.prototype.imageLoadingClass = "hub-content-image-loading", s.prototype.tooltipElSelector = ".hub-tooltip-link", s.prototype.attachmentsElSelector = ".content-attachments", s.prototype.tiledAttachmentsElSelector = ".content-attachments-tiled", s.prototype.headerElSelector = ".content-header", s.prototype.avatarSelector = ".content-author-avatar", s.prototype.attachmentFrameElSelector = ".content-attachment-frame", s.prototype.template = n, s.prototype.formatDate = i.formatDate, s.prototype.events = e.prototype.events.extended({"imageLoaded.hub": function() {
            this.$el.addClass(this.contentWithImageClass), this.$el.removeClass(this.imageLoadingClass)
        },"imageError.hub": function(t, e) {
            this.content.removeAttachment(e), this.attachmentsView && this.attachmentsView.tileableCount && !this.attachmentsView.tileableCount() && (this.$el.removeClass(this.contentWithImageClass), this.$el.removeClass(this.imageLoadingClass))
        }}, function(e) {
        e["click " + this.headerElSelector] = function(e) {
            var n = t(e.currentTarget), i = this.$el.find(".content-attachments-tiled " + this.attachmentFrameElSelector);
            n.hide(), i.hide();
            var r = document.elementFromPoint(e.clientX, e.clientY);
            i.show(), n.show(), t(r).trigger("click")
        }, e["mouseenter " + this.tooltipElSelector] = function(e) {
            var n = e.target, i = t(n).attr("title"), r = t(n).position(), o = t(n).width(), a = t('<div class="hub-current-tooltip content-action-tooltip"><div class="content-action-tooltip-bubble">' + i + '</div><div class="content-action-tooltip-tail"></div></div>');
            t(n).parent().append(a);
            var s = a.outerWidth(), u = a.outerHeight();
            if (a.css({left: r.left + o / 2 - s / 2,top: r.top - u - 2}), t(n).hasClass(this.tooltipElSelector)) {
                var l = parseInt(a.css("left"), 10);
                a.css("left", l + 7)
            }
            a.fadeIn()
        }, e["mouseleave " + this.tooltipElSelector] = function() {
            var t = this.$el.find(".hub-current-tooltip");
            t.removeClass("hub-current-tooltip").fadeOut(200, function() {
                t.remove()
            })
        }
    }), s.prototype.setElement = function() {
        return e.prototype.setElement.apply(this, arguments), this.attachmentsView && this.attachmentsView.tileableCount && this.attachmentsView.tileableCount() && this.$el.addClass(this.imageLoadingClass), this.content && this.content.id && this.$el.attr("data-content-id", this.content.id), this.attachHandlers(), this
    }, s.prototype.render = function() {
        var e = this.getTemplateContext();
        return this.content.createdAt && (e.formattedCreatedAt = this.formatDate(this.content.createdAt)), this.el.innerHTML = this.template(e), this.$(this.avatarSelector + " img").on("error", t.proxy(this._handleAvatarError, this)), this.attachmentsView && (this.attachmentsView.setElement(this.$el.find(this.attachmentsElSelector)[0]), this.attachmentsView.render()), this
    }, s.prototype.attachHandlers = function() {
        return this
    }, s.prototype.getTemplateContext = function() {
        var e = t.extend({}, this.content);
        return e
    }, s.prototype.remove = function() {
        this.$el.trigger("removeContentView.hub", {contentView: this}), this.$el.detach()
    }, s.prototype._handleVisibilityChange = function(t) {
        "EVERYONE" !== t && this.remove()
    }, s.prototype._handleAvatarError = function(t) {
        a("avatar error, hiding it", t), this.$(this.avatarSelector).remove()
    }, s.prototype.destroy = function() {
        e.prototype.destroy.call(this), this.content = null
    }, s
}), Livefyre.define("hgn!streamhub-sdk/content/templates/twitter", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-header">'), i.b("\n" + n), i.b('    <div class="content-header-inner">'), i.b("\n" + n), i.s(i.d("author.avatar", t, e, 1), t, e, 0, 94, 304, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('            <a class="content-author-avatar" href="https://twitter.com/intent/user?user_id='), i.b(i.v(i.d("author.twitterUserId", t, e, 0))), i.b('" target="_blank">'), i.b("\n" + n), i.b('                <img src="'), i.b(i.v(i.d("author.avatar", t, e, 0))), i.b('" />'), i.b("\n" + n), i.b("            </a>"), i.b("\n")
        }), t.pop()), i.b("\n" + n), i.b('        <div class="content-byline">'), i.b("\n" + n), i.b('            <a class="hub-tooltip-link tooltip-twitter content-source-logo" href="https://twitter.com/statuses/'), i.b(i.v(i.f("tweetId", t, e, 0))), i.b('/" target="_blank" title="View on Twitter"></a>'), i.b("\n" + n), i.b('            <div class="content-author-name">'), i.b("\n" + n), i.b('                <a href="https://twitter.com/intent/user?user_id='), i.b(i.v(i.d("author.twitterUserId", t, e, 0))), i.b('" target="_blank">'), i.b(i.v(i.d("author.displayName", t, e, 0))), i.b("</a>"), i.b("\n" + n), i.b("            </div>"), i.b("\n" + n), i.b('            <a class="content-author-username" href="https://twitter.com/intent/user?user_id='), i.b(i.v(i.d("author.twitterUserId", t, e, 0))), i.b('" target="_blank">@'), i.b(i.v(i.d("author.twitterUsername", t, e, 0))), i.b("</a>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments"></div>'), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-body">'), i.b("\n" + n), i.b("    "), i.b(i.t(i.f("body", t, e, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.s(i.f("featured", t, e, 1), t, e, 0, 1041, 1091, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-featured">Featured</div>'), n.b("\n")
        }), t.pop()), i.b("\n" + n), i.b('<ul class="content-actions">'), i.b("\n" + n), i.b('    <li class="content-action" data-content-action="reply">'), i.b("\n" + n), i.b('        <a class="hub-tooltip-link content-action-reply" href="https://twitter.com/intent/tweet?in_reply_to='), i.b(i.v(i.f("tweetId", t, e, 0))), i.b('" title="Reply">'), i.b("\n" + n), i.b("            <span>Reply</span>"), i.b("\n" + n), i.b("        </a>"), i.b("\n" + n), i.b("    </li>"), i.b("\n" + n), i.b('    <li class="content-action" data-content-action="retweet">'), i.b("\n" + n), i.b('        <a class="hub-tooltip-link content-action-retweet" href="https://twitter.com/intent/retweet?tweet_id='), i.b(i.v(i.f("tweetId", t, e, 0))), i.b('" title="Retweet">'), i.b("\n" + n), i.b("            <span>Retweet</span>"), i.b("\n" + n), i.b("        </a>"), i.b("\n" + n), i.b("    </li>"), i.b("\n" + n), i.b('    <li class="content-action" data-content-action="favorite">'), i.b("\n" + n), i.b('        <a class="hub-tooltip-link content-action-favorite" href="https://twitter.com/intent/favorite?tweet_id='), i.b(i.v(i.f("tweetId", t, e, 0))), i.b('" title="Favorite">'), i.b("\n" + n), i.b("            <span>Favorite</span>"), i.b("\n" + n), i.b("        </a>"), i.b("\n" + n), i.b("    </li>"), i.b("\n" + n), i.b("</ul>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-meta">'), i.b("\n" + n), i.s(i.f("formattedCreatedAt", t, e, 1), t, e, 0, 1965, 2109, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-created-at"><a href="https://twitter.com/statuses/'), n.b(n.v(n.f("tweetId", t, e, 0))), n.b('/" target="_blank">'), n.b(n.t(n.f("formattedCreatedAt", t, e, 0))), n.b("</a></div>"), n.b("\n")
        }), t.pop()), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/twitter-content-view", ["streamhub-sdk/content/views/content-view", "hgn!streamhub-sdk/content/templates/twitter", "inherits", "streamhub-sdk/jquery"], function(t, e, n) {
    var i = function(e) {
        t.call(this, e)
    };
    return n(i, t), i.prototype.elClass += " content-tweet ", i.prototype.template = e, i.prototype.getTemplateContext = function() {
        var e = t.prototype.getTemplateContext.call(this);
        return e && e.author && "string" == typeof e.author.profileUrl && (e.author.twitterUsername = e.author.profileUrl.split("/").pop()), e
    }, i
}), Livefyre.define("hgn!streamhub-sdk/content/templates/facebook", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-header">'), i.b("\n" + n), i.b('    <div class="content-header-inner">'), i.b("\n" + n), i.s(i.d("author.avatar", t, e, 1), t, e, 0, 94, 216, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('            <a class="content-author-avatar">'), i.b("\n" + n), i.b('                <img src="'), i.b(i.v(i.d("author.avatar", t, e, 0))), i.b('" />'), i.b("\n" + n), i.b("            </a>"), i.b("\n")
        }), t.pop()), i.b('        <div class="content-byline">'), i.b("\n" + n), i.s(i.f("permalink", t, e, 1), t, e, 0, 298, 457, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('                <a class="hub-tooltip-link tooltip-link content-source-logo" href="'), n.b(n.v(n.f("permalink", t, e, 0))), n.b('" target="_blank" title="View on Facebook"></a>'), n.b("\n")
        }), t.pop()), i.s(i.f("permalink", t, e, 1), t, e, 1, 0, 0, "") || (i.b('                <span class="content-source-logo"></span>'), i.b("\n")), i.b('            <div class="content-author-name">'), i.b("\n" + n), i.b('                <a href="'), i.b(i.v(i.d("author.profileUrl", t, e, 0))), i.b('" target="_blank">'), i.b(i.v(i.d("author.displayName", t, e, 0))), i.b("</a>"), i.b("\n" + n), i.b("            </div>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments"></div>'), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-body">'), i.b("\n" + n), i.b("    "), i.b(i.t(i.f("body", t, e, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.s(i.f("featured", t, e, 1), t, e, 0, 882, 932, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-featured">Featured</div>'), n.b("\n")
        }), t.pop()), i.b("\n" + n), i.b('<div class="content-meta">'), i.b("\n" + n), i.s(i.f("formattedCreatedAt", t, e, 1), t, e, 0, 1001, 1266, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('    <div class="content-created-at">'), i.b("\n" + n), i.s(i.f("permalink", t, e, 1), t, e, 0, 1061, 1153, "{{ }}") && (i.rs(t, e, function(t, e, n) {
                n.b('            <a href="'), n.b(n.v(n.f("permalink", t, e, 0))), n.b('" target="_blank">'), n.b(n.t(n.f("formattedCreatedAt", t, e, 0))), n.b("</a>"), n.b("\n")
            }), t.pop()), i.s(i.f("permalink", t, e, 1), t, e, 1, 0, 0, "") || (i.b("            "), i.b(i.t(i.f("formattedCreatedAt", t, e, 0))), i.b("\n")), i.b("    </div>"), i.b("\n")
        }), t.pop()), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/facebook-content-view", ["streamhub-sdk/content/views/content-view", "hgn!streamhub-sdk/content/templates/facebook", "inherits", "streamhub-sdk/jquery"], function(t, e, n) {
    var i = function(e) {
        t.call(this, e)
    };
    return n(i, t), i.prototype.elClass += " content-facebook ", i.prototype.template = e, i.prototype.getTemplateContext = function() {
        var e = t.prototype.getTemplateContext.call(this);
        return e.attachments.length && (e.permalink = e.attachments[0].url), e
    }, i
}), Livefyre.define("hgn!streamhub-sdk/content/templates/instagram", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="content-header">'), i.b("\n" + n), i.b('    <div class="content-header-inner">'), i.b("\n" + n), i.s(i.d("author.avatar", t, e, 1), t, e, 0, 94, 216, "{{ }}") && (i.rs(t, e, function(t, e, i) {
            i.b('            <a class="content-author-avatar">'), i.b("\n" + n), i.b('                <img src="'), i.b(i.v(i.d("author.avatar", t, e, 0))), i.b('" />'), i.b("\n" + n), i.b("            </a>"), i.b("\n")
        }), t.pop()), i.b('        <div class="content-byline">'), i.b("\n" + n), i.b('            <span class="content-source-logo"></span>'), i.b("\n" + n), i.s(i.d("author.displayName", t, e, 1), t, e, 0, 361, 519, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('                <a class="content-author-name" href="http://instagram.com/'), n.b(n.v(n.d("author.displayName", t, e, 0))), n.b('" target="_blank">'), n.b(n.v(n.d("author.displayName", t, e, 0))), n.b("</a>"), n.b("\n")
        }), t.pop()), i.b("        </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-attachments"></div>'), i.b("\n" + n), i.b("\n" + n), i.b('<div class="content-body">'), i.b("\n" + n), i.b("	"), i.b(i.t(i.f("body", t, e, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b("\n" + n), i.s(i.f("featured", t, e, 1), t, e, 0, 680, 730, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-featured">Featured</div>'), n.b("\n")
        }), t.pop()), i.b("\n" + n), i.b('<div class="content-meta">'), i.b("\n" + n), i.s(i.f("formattedCreatedAt", t, e, 1), t, e, 0, 799, 871, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('    <div class="content-created-at">'), n.b(n.t(n.f("formattedCreatedAt", t, e, 0))), n.b("</div>"), n.b("\n")
        }), t.pop()), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/content/views/instagram-content-view", ["streamhub-sdk/content/views/content-view", "hgn!streamhub-sdk/content/templates/instagram", "inherits"], function(t, e, n) {
    var i = function(e) {
        t.call(this, e)
    };
    return n(i, t), i.prototype.elClass += " content-instagram ", i.prototype.template = e, i.prototype.events = t.prototype.events.extended({"imageError.hub": function() {
            this.remove()
        }}), i
}), Livefyre.define("streamhub-sdk/content/views/gallery-on-focus-view", ["inherits", "streamhub-sdk/view", "streamhub-sdk/content/views/gallery-attachment-list-view", "streamhub-sdk/content/views/attachment-list-view"], function(t, e, n, i) {
    var r = function(t, e) {
        e = e || {}, this._isGallery = !1, this._initialView = t, i.call(this, e)
    };
    return t(r, i), r.prototype.setContent = function(t) {
        this._initialView.setContent(t), i.prototype.setContent.call(this, t)
    }, r.prototype.add = function(t) {
        i.prototype.add.call(this, t), this._focusedView && this._focusedView.add(t)
    }, r.prototype.render = function() {
        i.prototype.render.call(this), this._initialView.$el.appendTo(this.$el), this._initialView.render()
    }, r.prototype._insert = function() {
    }, r.prototype.tileableCount = function() {
        return this._initialView.tileableCount ? this._initialView.tileableCount() : 0
    }, r.prototype.focus = function(t) {
        this._isGallery || "photo" !== t.type && "video" !== t.type || (this._focusedView = this._createFocusedView({content: this._initialView.content,attachmentToFocus: t}), this._focusedView.$el.appendTo(this.$el), this._focusedView.render(), this._initialView.$el.hide(), this._isGallery = !0)
    }, r.prototype._createFocusedView = function(t) {
        var e = new n({content: t.content,attachmentToFocus: t.attachmentToFocus,userInfo: !1,pageCount: !1,pageButtons: !1,thumbnails: !0,proportionalThumbnails: !0});
        return e.$el.addClass("content-attachments-interactive-gallery"), e
    }, r
}), Livefyre.define("streamhub-sdk/content/content-view-factory", ["streamhub-sdk/content", "streamhub-sdk/content/types/livefyre-content", "streamhub-sdk/content/types/livefyre-twitter-content", "streamhub-sdk/content/types/livefyre-facebook-content", "streamhub-sdk/content/types/livefyre-instagram-content", "streamhub-sdk/content/types/twitter-content", "streamhub-sdk/content/views/content-view", "streamhub-sdk/content/views/tiled-attachment-list-view", "streamhub-sdk/content/views/twitter-content-view", "streamhub-sdk/content/views/facebook-content-view", "streamhub-sdk/content/views/instagram-content-view", "streamhub-sdk/content/views/gallery-on-focus-view"], function(t, e, n, i, r, o, a, s, u, l, h, c) {
    var f = function(t) {
        t = t || {}, this.contentRegistry = this.contentRegistry.slice(0), t.createAttachmentsView && (this._createAttachmentsView = t.createAttachmentsView)
    };
    return f.prototype.contentRegistry = [{type: n,view: u}, {type: i,view: l}, {type: r,view: h}, {type: o,view: u}, {type: e,view: a}, {type: t,view: a}], f.prototype.createContentView = function(t) {
        var e = this._getViewTypeForContent(t), n = this._createAttachmentsView(t), i = new e({content: t,attachmentsView: n});
        return i
    }, f.prototype._getViewTypeForContent = function(t) {
        for (var e = 0, n = this.contentRegistry.length; n > e; e++) {
            var i = this.contentRegistry[e];
            if (t instanceof i.type) {
                var r;
                return i.view ? r = i.view : i.viewFunction && (r = i.viewFunction(t)), r
            }
        }
    }, f.prototype._createAttachmentsView = function(t) {
        var e = new s;
        return new c(e, {content: t})
    }, f
}), Livefyre.define("streamhub-sdk/modal/views/attachment-gallery-modal", ["streamhub-sdk/modal", "streamhub-sdk/content/views/gallery-attachment-list-view", "inherits"], function(t, e, n) {
    var i = function(e) {
        t.call(this, e)
    };
    return n(i, t), i.prototype.setElement = function(e) {
        t.prototype.setElement.call(this, e);
        var n = this;
        return this.$el.on("galleryResize.hub", function() {
            n.resizeFocusedAttachment()
        }), this
    }, i.prototype.resizeFocusedAttachment = function() {
        var t = this.$el.height(), n = this.$el.width(), i = this.$el.find(e.prototype.attachmentsGallerySelector), r = parseInt(i.css("margin-top"), 10) + parseInt(i.css("margin-bottom"), 10), o = parseInt(i.css("margin-left"), 10) + parseInt(i.css("margin-right"), 10), a = t - r, s = n - o;
        i.height(a), i.width(s);
        var u = this.$el.find(e.prototype.focusedAttachmentsSelector + " .content-attachment");
        u.css({height: Math.min(a, s) + "px","line-height": a + "px"});
        var l = this.$el.find("." + e.prototype.focusedAttachmentClassName + "> *");
        if (l.attr("width") ? l.css({width: parseInt(l.attr("width"), 10) + "px"}) : l.css({width: "auto"}), l.attr("height") ? l.css({height: parseInt(l.attr("height"), 10) + "px"}) : l.css({height: "auto","line-height": "inherits"}), l.height() + r >= t || 0 === l.height())
            if (l.css({height: Math.min(a, s) + "px","line-height": Math.min(a, s) + "px"}), l.attr("width")) {
                var h = Math.min(parseInt(l.attr("width"), 10), l.width());
                l.css({width: h + "px"})
            } else
                l.css({width: "auto"});
        if (l.width() + o >= n || 0 === l.width())
            if (l.css({width: s + "px"}), l.attr("height")) {
                var c = Math.min(parseInt(l.attr("height"), 10), l.height());
                l.css({height: c + "px"})
            } else
                l.css({height: "auto","line-height": "inherits"})
    }, i
}), Livefyre.define("stream/main", ["inherits", "event-emitter"], function(t, e) {
    function n() {
        e.call(this)
    }
    return t(n, e), n
}), Livefyre.define("stream", ["stream/main"], function(t) {
    return t
}), Livefyre.define("stream/util", [], function() {
    var t = {};
    return t.nextTick = function() {
        if ("function" == typeof setImmediate)
            return function(t) {
                setImmediate(t)
            };
        if ("undefined" == typeof window || window.ActiveXObject || !window.postMessage)
            return function(t) {
                setTimeout(t)
            };
        var t = [];
        return window.addEventListener("message", function() {
            for (var e = 0; e < t.length; )
                try {
                    t[e++]()
                } catch (n) {
                    throw t = t.slice(e), window.postMessage("tic!", "*"), n
                }
            t.length = 0
        }, !0), function(e) {
            t.length || window.postMessage("tic!", "*"), t.push(e)
        }
    }(), t
}), Livefyre.define("stream/writable", ["stream", "stream/util", "inherits"], function(t, e, n) {
    function i(e) {
        this.writable = !0, this._writableState = new o(e, this), t.call(this, e)
    }
    function r(t, e) {
        this.chunk = t, this.callback = e
    }
    function o(t, e) {
        t = t || {};
        var n = t.highWaterMark;
        this.highWaterMark = n || 0 === n ? n : 0, this.objectMode = !!t.objectMode, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
        var i = t.decodeStrings === !1;
        this.decodeStrings = !i, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
            e._onwrite(t)
        }, this.writecb = null, this.writelen = 0, this.buffer = []
    }
    return n(i, t), i.prototype.write = function(t, n) {
        var i, r = this._writableState, o = !1;
        return "function" != typeof n && (n = function() {
        }), r.ended ? (i = Error(".write() called after stream end"), this.emit("error", i), e.nextTick(function() {
            n(i)
        })) : o = this._writeOrBuffer(t, n), o
    }, i.prototype._writeOrBuffer = function(t, e) {
        var n = this._writableState, i = n.buffer.length < n.highWaterMark;
        return n.needDrain = !i, n.writing ? n.buffer.push(new r(t, e)) : this._doWrite(t, e), i
    }, i.prototype._write = function(t, e) {
        e(Error("._write not implemented"))
    }, i.prototype._onwrite = function(t) {
        var n, i = this, r = this._writableState, o = r.sync, a = r.writecb;
        r.writing = !1, r.writecb = null, r.writelen = 0, t ? (o ? e.nextTick(function() {
            a(t)
        }) : a(t), this.emit("error", t)) : (n = this._needFinish(), n || r.bufferProcessing || !r.buffer.length || this._clearBuffer(), o ? e.nextTick(function() {
            i._afterWrite(n, a)
        }) : this._afterWrite(n, a))
    }, i.prototype._doWrite = function(t, e) {
        var n = this._writableState;
        n.writelen = 1, n.writecb = e, n.writing = !0, n.sync = !0, this._write(t, n.onwrite), n.sync = !1
    }, i.prototype._afterWrite = function(t, e) {
        this._writableState, t || this._onwriteDrain(), e(), t && this._finishMaybe()
    }, i.prototype._onwriteDrain = function() {
        var t = this._writableState;
        0 === t.buffer.length && t.needDrain && (t.needDrain = !1, this.emit("drain"))
    }, i.prototype._clearBuffer = function() {
        var t = this._writableState;
        t.bufferProcessing = !0;
        for (var e = 0; e < t.buffer.length; e++) {
            var n = t.buffer[e], i = n.chunk, r = n.callback;
            if (this._doWrite(i, r), t.writing) {
                e++;
                break
            }
        }
        t.bufferProcessing = !1, e < t.buffer.length ? t.buffer = t.buffer.slice(e) : t.buffer.length = 0
    }, i.prototype.pipe = function() {
        this.emit("error", Error("Cannot pipe. Not readable"))
    }, i.prototype.end = function(t, n) {
        var i = this._writableState;
        "function" == typeof t && (n = t, t = null), void 0 !== t && null !== t && this.write(t), i.ending || i.finished || (i.ending = !0, this._finishMaybe(), n && (i.finished ? e.nextTick(n) : this.once("finish", n)), i.ended = !0)
    }, i.prototype._finishMaybe = function() {
        var t = this._writableState, e = this._needFinish();
        return e && (t.finished = !0, this.emit("finish")), e
    }, i.prototype._needFinish = function() {
        var t = this._writableState;
        return t.ending && 0 === t.buffer.length && !t.finished && !t.writing
    }, i.WritableState = o, i
}), Livefyre.define("stream/readable", ["stream", "stream/util", "event-emitter", "inherits"], function(t, e, n, i) {
    function r(e) {
        e = e || {}, e.objectMode = !0, this._readableState = new o(e, this), this.readable = !0, t.call(this)
    }
    function o(t) {
        t = t || {};
        var e = t.highWaterMark;
        this.highWaterMark = e || 0 === e ? e : 0, this.highWaterMark = ~~this.highWaterMark, this.buffer = [], this.pipes = [], this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.calledRead = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.objectMode = !!t.objectMode, this.defaultEncoding = t.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null
    }
    return i(r, t), r.prototype.pipe = function(t, i) {
        function r(t) {
            t === d && a()
        }
        function o() {
            t.end()
        }
        function a() {
            t.removeListener("close", l), t.removeListener("finish", h), t.removeListener("drain", g), t.removeListener("error", u), t.removeListener("unpipe", r), d.removeListener("end", o), d.removeListener("end", a), d.removeListener("data", s), !m.awaitDrain || t._writableState && !t._writableState.needDrain || g()
        }
        function s(e) {
            var n = t.write(e);
            n === !1 && (d._readableState.awaitDrain++, d.pause())
        }
        function u(e) {
            c(), 0 === n.listenerCount(t, "error") && t.emit("error", e)
        }
        function l() {
            t.removeListener("finish", h), c()
        }
        function h() {
            t.removeListener("close", l), c()
        }
        function c() {
            d.unpipe(t)
        }
        var f, p, d = this, m = this._readableState;
        m.pipes.push(t), f = !i || i.end !== !1, p = f ? o : a, m.endEmitted ? e.nextTick(p) : d.once("end", p), t.on("unpipe", r);
        var g = this._pipeOnDrain();
        return t.on("drain", g), d.on("data", s), t.once("error", u), t.once("close", l), t.once("finish", h), t.emit("pipe", d), m.flowing || d.resume(), t
    }, r.prototype.unpipe = function(t) {
        var e = this._readableState;
        if (0 === e.pipes.length)
            return this;
        if (1 === e.pipes.length)
            return t && t !== e.pipes[0] ? this : (t || (t = e.pipes[0]), e.pipes = [], e.flowing = !1, t && t.emit("unpipe", this), this);
        if (!t) {
            var n = e.pipes, i = n.length;
            e.pipes = [], e.flowing = !1;
            for (var r = 0; i > r; r++)
                n[r].emit("unpipe", this);
            return this
        }
        var o = e.pipes.indexOf(t);
        return -1 === o ? this : (e.pipes.splice(o, 1), t.emit("unpipe", this), this)
    }, r.prototype._pipeOnDrain = function() {
        var t = this;
        return function() {
            var e = t._readableState;
            e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && n.listenerCount(t, "data") && (e.flowing = !0, t._flow())
        }
    }, r.prototype._flow = function() {
        var t, e = this._readableState;
        if (e.flowing)
            do
                t = this.read();
            while (null !== t && e.flowing)
    }, r.prototype.push = function() {
        var t = Array.prototype.slice.call(arguments);
        return this._addToBuffer.apply(this, [!1].concat(t))
    }, r.prototype.unshift = function() {
        var t = Array.prototype.slice.call(arguments);
        return this._addToBuffer.apply(this, [!0].concat(t))
    }, r.prototype._addToBuffer = function(t, e) {
        var n = Array.prototype.slice.call(arguments, 1), i = this._readableState;
        return null === e ? (i.reading = !1, i.ended || this._endReadable()) : i.ended && !t ? this.emit("error", Error("readable.push() called after EOF")) : i.endEmitted && t ? this.emit("error", Error("readable.unshift() called after end event")) : (t ? i.buffer.unshift.apply(i.buffer, n) : (i.reading = !1, i.buffer.push.apply(i.buffer, n)), e && i.needReadable && this._emitReadable(), this._maybeReadMore()), !i.ended && (i.needReadable || i.buffer.length < i.highWaterMark || 0 === i.buffer.length)
    }, r.prototype._maybeReadMore = function() {
        function t() {
            for (var t = i.buffer.length; !i.reading && !i.ended && i.buffer.length < i.highWaterMark && (n.read(0), t !== i.buffer.length); )
                t = i.buffer.length;
            i.readingMore = !1
        }
        var n = this, i = n._readableState;
        i.readingMore || (i.readingMore = !0, e.nextTick(t))
    }, r.prototype.resume = function() {
        var t = this._readableState;
        t.flowing || (t.flowing = !0, t.reading || this.read(0), this._scheduleResume())
    }, r.prototype._scheduleResume = function() {
        var t = this, n = this._readableState;
        n.resumeScheduled || (n.resumeScheduled = !0, e.nextTick(function() {
            t._doResume()
        }))
    }, r.prototype._doResume = function() {
        var t = this._readableState;
        t.resumeScheduled = !1, this.emit("resume"), this._flow(), t.flowing && !t.reading && this.read(0)
    }, r.prototype.pause = function() {
        this._readableState.flowing !== !1 && (this._readableState.flowing = !1, this.emit("pause"))
    }, r.prototype.on = function(e, n) {
        var i = (t.prototype.on.call(this, e, n), this._readableState);
        "data" === e && i.flowing !== !1 && this.resume(), "readable" === e && this.readable && (i.readableListening || (i.readableListening = !0, i.emittedReadable = !1, i.needReadable = !0, i.reading ? i.buffer.length && this._emitReadable() : this.read(0)))
    }, r.prototype.read = function(t) {
        var e, n, i = this._readableState, r = t;
        return i.calledRead = !0, ("number" != typeof t || t > 0) && (i.emittedReadable = !1), 0 === t && i.needReadable && (i.buffer.length >= i.highWaterMark || i.ended) ? (0 === i.buffer.length && i.ended ? this._endReadable() : this._emitReadable(), null) : (t = this._getSizeToRead(t), 0 === t && i.ended ? (0 === i.buffer.length && this._endReadable(), null) : (e = i.needReadable, (0 === i.buffer.length || i.buffer.length - t < i.highWaterMark) && (e = !0), (i.reading || i.ended) && (e = !1), e && (i.reading = !0, i.sync = !0, 0 === i.buffer.length && (i.needReadable = !0), this._read(i.highWaterMark), i.sync = !1, i.reading || (t = this._getSizeToRead(r))), n = t > 0 ? this._readFromBuffer(t) : null, null === n && (i.needReadable = !0, t = 0), 0 !== i.buffer.length || i.ended || (i.needReadable = !0), i.ended && !i.endEmitted && 0 === i.buffer.length && this._endReadable(), null !== n && this.emit("data", n), n))
    }, r.prototype._read = function() {
        this.emit("error", Error("._read() not implemented"))
    }, r.prototype._readFromBuffer = function() {
        var t = this._readableState, e = t.buffer;
        return 0 === e.length ? null : e.shift()
    }, r.prototype._getSizeToRead = function(t) {
        var e = this._readableState;
        return 0 === e.buffer.length && e.ended ? 0 : 0 === t ? 0 : 1
    }, r.prototype._emitReadable = function() {
        function t() {
            n.emit("readable"), n._flow()
        }
        var n = this, i = this._readableState;
        i.needReadable = !1, i.emittedReadable || (i.emittedReadable = !0, i.sync ? e.nextTick(t) : t())
    }, r.prototype._endReadable = function() {
        var t = this._readableState;
        t.ended = !0, t.buffer.length ? this._emitReadable() : this._emitEnd()
    }, r.prototype._emitEnd = function() {
        var t = this, n = this._readableState;
        if (n.buffer.length > 0)
            throw Error("Tried to emit end event on a non-empty Readable");
        !n.endEmitted && n.calledRead && (n.ended = !0, e.nextTick(function() {
            n.endEmitted || 0 !== n.buffer.length || (n.endEmitted = !0, t.readable = !1, t.emit("end"))
        }))
    }, r
}), Livefyre.define("stream/duplex", ["stream/readable", "stream/writable", "stream/util", "inherits"], function(t, e, n, i) {
    function r(n) {
        t.call(this, n), e.call(this, n), n && n.readable === !1 && (this.readable = !1), n && n.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, n && n.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", o)
    }
    function o() {
        var t = this;
        this.allowHalfOpen || this._writableState.ended || n.nextTick(function() {
            t.end()
        })
    }
    return i(r, t), i.parasitically(r, e), r
}), Livefyre.define("streamhub-sdk/views/streams/more", ["inherits", "stream/duplex", "streamhub-sdk/debug"], function(t, e, n) {
    var i = n("streamhub-sdk/views/streams/more"), r = function(t) {
        t = t || {}, this._goal = t.goal || 0, this._stack = [], this._requestMore = null, e.call(this, t)
    };
    return t(r, e), r.prototype.setGoal = function(t) {
        this._goal = t, this._goal >= 0 && this._fetchAndPush()
    }, r.prototype.getGoal = function() {
        return this._goal
    }, r.prototype.stack = function(t) {
        this._stack.push(t)
    }, r.prototype._write = function(t, e) {
        var n = this;
        i("_write", t), this._stack.unshift(t), this._requestMore = function() {
            n._requestMore = null, e()
        }, this._goal >= 1 ? this._fetchAndPush() : this.emit("hold")
    }, r.prototype._read = function() {
        return this._goal <= 0 && this._stack.length ? (this.emit("hold"), void 0) : (this._fetchAndPush(), void 0)
    }, r.prototype._fetchAndPush = function() {
        this._stack.length && (this._goal--, this.push(this._stack.pop())), 0 === this._stack.length && "function" == typeof this._requestMore && this._requestMore()
    }, r
}), Livefyre.define("streamhub-sdk/views/show-more-button", ["inherits", "streamhub-sdk/view", "streamhub-sdk/jquery"], function(t, e) {
    var n = function(t) {
        e.call(this, t), t = t || {}, t.more && this.setMoreStream(t.more)
    };
    return t(n, e), n.prototype.events = e.prototype.events.extended({click: function() {
            this.$el.hide(), this.$el.trigger("showMore.hub")
        }}), n.prototype.render = function() {
        e.prototype.render.call(this), this.$el.hide()
    }, n.prototype.template = function() {
        return "Load More"
    }, n.prototype.setMoreStream = function(t) {
        var e = this;
        this._more = t, this._more.on("hold", function() {
            e.$el.show()
        })
    }, n.prototype.getMoreStream = function() {
        return this._more
    }, n
}), Livefyre.define("hgn!streamhub-sdk/views/templates/list-view", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="hub-list"></div>'), i.b("\n" + n), i.b('<div class="hub-list-footer">'), i.b("\n" + n), i.b('	<a class="hub-list-more"></a>'), i.b("\n" + n), i.b("</div>"), i.fl()
    }, "", t);
    return e.template = n, e
}), Livefyre.define("streamhub-sdk/views/list-view", ["streamhub-sdk/jquery", "streamhub-sdk/view", "streamhub-sdk/content/content-view-factory", "streamhub-sdk/modal/views/attachment-gallery-modal", "inherits", "streamhub-sdk/debug", "stream/writable", "streamhub-sdk/content/views/content-view", "streamhub-sdk/views/streams/more", "streamhub-sdk/views/show-more-button", "hgn!streamhub-sdk/views/templates/list-view"], function(t, e, n, i, r, o, a, s, u, l, h) {
    var c = o("streamhub-sdk/views/list-view"), f = function(t) {
        t = t || {}, this.views = [], e.call(this, t), a.call(this, t), this._moreAmount = t.showMore || 50, this.more = t.more || this._createMoreStream(t), this.showMoreButton = t.showMoreButton || this._createShowMoreButton(t), this.showMoreButton.setMoreStream(this.more), this.render(), this._pipeMore()
    };
    return r(f, e), r.parasitically(f, a), f.prototype.events = e.prototype.events.extended({"showMore.hub": function() {
            this.showMore()
        },"removeView.hub": function(t, e) {
            this.remove(e)
        }}), f.prototype.template = h, f.prototype.listElSelector = ".hub-list", f.prototype.showMoreElSelector = ".hub-list-more", f.prototype.setElement = function() {
        e.prototype.setElement.apply(this, arguments), this.$listEl = this.$el
    }, f.prototype.render = function() {
        e.prototype.render.call(this), this.$listEl = this.$el.find(this.listElSelector), this.showMoreButton.setElement(this.$el.find(this.showMoreElSelector)), this.showMoreButton.render()
    }, f.prototype._write = function(t, e) {
        this.add(t), e()
    }, f.prototype.comparator = null, f.prototype.add = function(t) {
        return c("add", t), t ? (-1 === this.views.indexOf(t) && this.views.push(t), this.comparator && this.views.sort(this.comparator), this._insert(t), t) : (c("Called add with a falsy parameter, returning"), void 0)
    }, f.prototype.remove = function(t) {
        var e = this.views.indexOf(t);
        return -1 === e ? !1 : (this._extract(t), this.views.splice(e, 1), !0)
    }, f.prototype._extract = function(t) {
        t.$el.remove()
    }, f.prototype._insert = function(t) {
        var e, n;
        e = this.views.indexOf(t), 0 === e ? t.$el.prependTo(this.$listEl) : (n = this.views[e - 1].$el, t.$el.insertAfter(n))
    }, f.prototype.showMore = function(t) {
        void 0 === t && (t = this._moreAmount), this.more.setGoal(t)
    }, f.prototype._createMoreStream = function(t) {
        return t = t || {}, new u({highWaterMark: 0,goal: t.initial || 50})
    }, f.prototype._createShowMoreButton = function() {
        return new l
    }, f.prototype._pipeMore = function() {
        var t = this;
        this.more.on("readable", function() {
            for (var e; e = t.more.read(); )
                t.add(e)
        })
    }, f.prototype.destroy = function() {
        e.prototype.destroy.call(this), this.views = null
    }, f
}), Livefyre.define("streamhub-sdk/content/views/content-list-view", ["streamhub-sdk/jquery", "streamhub-sdk/views/list-view", "streamhub-sdk/content/views/content-view", "streamhub-sdk/content/content-view-factory", "streamhub-sdk/content/views/gallery-attachment-list-view", "streamhub-sdk/modal/views/attachment-gallery-modal", "stream/writable", "streamhub-sdk/views/streams/more", "streamhub-sdk/views/show-more-button", "inherits", "streamhub-sdk/debug"], function(t, e, n, i, r, o, a, s, u, l, h) {
    var c = h("streamhub-sdk/content/views/content-list-view"), f = function(t) {
        switch (t = t || {}, t.modal) {
            case !0:
            case void 0:
                this.modal = new o;
                break;
            default:
                this.modal = t.modal
        }
        e.call(this, t), this._stash = t.stash || this.more, this._maxVisibleItems = t.maxVisibleItems || 50, this._bound = !0, this.contentViewFactory = t.contentViewFactory || new i
    };
    return l(f, e), f.prototype.insertingClassName = "hub-wall-is-inserting", f.prototype.hiddenClassName = "hub-content-container-hidden", f.prototype.contentContainerClassName = "hub-content-container", f.prototype.elClass += " streamhub-content-list-view", f.prototype.events = e.prototype.events.extended({"removeContentView.hub": function(t, n) {
            return e.prototype.remove.call(this, n.contentView)
        },"focusContent.hub": function(t, e) {
            var n = this.getContentView(e.content);
            if (this.modal) {
                var i = new r(e);
                this.modal.show(i)
            } else
                n && n.attachmentsView && "function" == typeof n.attachmentsView.focus && n.attachmentsView.focus(e.attachmentToFocus)
        }}), f.prototype.comparator = function(t, e) {
        var n = t.content.createdAt || t.createdAt, i = e.content.createdAt || e.createdAt;
        return i - n
    }, f.prototype.bounded = function(t) {
        this._bound = t
    }, f.prototype.add = function(t) {
        var n = t.el ? t : this.getContentView(t);
        if (c("add", t), n)
            return e.prototype.add.call(this, n);
        if (n = this.createContentView(t), this._bound && !this._hasVisibleVacancy()) {
            var i = this.views[this.views.length - 1];
            this.more.setGoal(0), this.saveForLater(i.content), this.remove(i)
        }
        return e.prototype.add.call(this, n)
    }, f.prototype._insert = function(e) {
        var n, i, r;
        n = this.views.indexOf(e);
        var o = t('<div class="' + this.contentContainerClassName + " " + this.insertingClassName + '"></div>');
        e.$el.wrap(o), r = e.$el.parent(), 0 === n ? (r.prependTo(this.$listEl), r.css("margin-top", -1 * r.height() + "px"), setTimeout(t.proxy(function() {
            r.removeClass(this.insertingClassName).css("margin-top", "")
        }, this), .1)) : (i = this.views[n - 1].$el, r.removeClass(this.insertingClassName).addClass(this.hiddenClassName), r.insertAfter(i.parent("." + this.contentContainerClassName)), setTimeout(t.proxy(function() {
            r.removeClass(this.hiddenClassName)
        }, this), .1))
    }, f.prototype._extract = function(t) {
        t.$el.parent().remove()
    }, f.prototype._hasVisibleVacancy = function() {
        return this.views.length > this._maxVisibleItems ? !1 : !0
    }, f.prototype.saveForLater = function(t) {
        this._stash.stack(t)
    }, f.prototype.remove = function(t) {
        var e = t.el ? t : this.getContentView(t);
        e.remove()
    }, f.prototype.showMore = function(t) {
        this._bound = !1, e.prototype.showMore.call(this, t)
    }, f.prototype.getContentView = function(t) {
        for (var e = 0; e < this.views.length; e++) {
            var n = this.views[e];
            if (t === n.content || t.id && n.content.id === t.id)
                return n
        }
        return null
    }, f.prototype.createContentView = function(t) {
        var e = this.contentViewFactory.createContentView(t);
        return e && "function" == typeof e.render && e.render(), e
    }, f.prototype.destroy = function() {
        e.prototype.destroy.call(this), this.contentViewFactory = null
    }, f
}), Livefyre.define("stream/transform", ["stream/duplex", "inherits"], function(t, e) {
    function n(e) {
        var n, r = this;
        t.call(this, e), n = this._transformState = new i(e, this), this._readableState.needReadable = !0, this._readableState.sync = !1, this.once("finish", function() {
            "function" == typeof r._flush ? r._flush(function() {
                r._doneTransforming(err)
            }) : r._doneTransforming()
        })
    }
    function i(t, e) {
        this.afterTransform = function(t, n) {
            return e._afterTransform(t, n)
        }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null
    }
    return e(n, t), n.prototype._transform = function() {
        this.emit("error", Error("_transform not implemented!"))
    }, n.prototype.push = function() {
        return this._transformState.needTransform = !1, t.prototype.push.apply(this, arguments)
    }, n.prototype._read = function() {
        var t = this._transformState;
        null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.afterTransform)) : t.needTransform = !0
    }, n.prototype._write = function(t, e) {
        var n = this._transformState, i = this._readableState;
        n.writecb = e, n.writechunk = t, n.transforming || (n.needTransform || i.needReadable || i.buffer.length < i.highWaterMark) && this._read(i.highWaterMark)
    }, n.prototype._afterTransform = function(t, e) {
        var n = this._transformState, i = this._readableState, r = n.writecb;
        return n.transforming = !1, r ? (n.writechunk = null, n.writecb = null, null !== e && void 0 !== e && this.push(e), r && r(t), i.reading = !1, (i.needReadable || i.buffer.length < i.highWaterMark) && this._read(i.highWaterMark), void 0) : this.emit("error", Error("no writecb in Transform class"))
    }, n.prototype._doneTransforming = function(t) {
        t && this.emit("error", t);
        var e = this._writableState, n = this._transformState;
        if (e.buffer.length)
            throw Error("Calling Transform#_doneTransforming when writable buffer not empty");
        if (n.transforming)
            throw Error("Calling Transform#_doneTransforming when still transforming");
        return this.push(null)
    }, n
}), Livefyre.define("streamhub-metrics/metric", [], function() {
    var t = function(t) {
        this._label = t.label, this._value = t.value
    };
    return t.prototype.getValue = function() {
        return this._value
    }, t.prototype.getLabel = function() {
        return this._label
    }, t
}), Livefyre.define("streamhub-hot-collections/metrics/collection-heat-metric", ["inherits", "streamhub-metrics/metric"], function(t, e) {
    var n = function(t) {
        e.apply(this, arguments), this._collection = t.collection
    };
    return n.prototype.getValue = function() {
        return this._collection.heatIndex
    }, n.prototype.getLabel = function() {
        var t = e.prototype.getLabel.apply(this, arguments);
        return t || this._collection.title
    }, n.prototype.getCollection = function() {
        return this._collection
    }, n
}), Livefyre.define("streamhub-hot-collections/streams/collection-to-heat-metric", ["stream/transform", "inherits", "streamhub-hot-collections/metrics/collection-heat-metric"], function(t, e, n) {
    var i = function() {
        t.apply(this, arguments)
    };
    return e(i, t), i.prototype._transform = function(t, e) {
        var n = i.transform(t);
        this.push(n), e()
    }, i.transform = function(t) {
        var e = new n({collection: t});
        return e
    }, i
}), Livefyre.define("text!streamhub-map/css/style.css", [], function() {
    return ".hub-map-view .hub-list{position:relative;width:100%;height:100%;overflow-y:hidden}.hub-map-view .hub-map-svg-templates{position:absolute;top:0;z-index:-1}.hub-map-view .hub-list-more{background-repeat:no-repeat;background-color:transparent;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAAkCAYAAABSZHLHAAAHKklEQVR42u2c61MTVxjGqePUzrSlM8xY+9mvzvgP+FkriFy8VK3KTdBO9UO1ONUiUFsIVlCgFPECQXNDBUICJAEDLSAgSEQg4AgUAoKAiggi2G9v91nc2LjGQCDZDRNmnhly9mTe5z3ntyfnnL344G/9+vWfqorUZ8v0+n8MlbfInUJMxIYHn0X+rVu37rOCG4WpZeXlfYaKW+ROISZiw8Ni8/D19fU7eTJBKklJHU5NO0/uFGIiNjxY4dDpK0Z7entp6uUkvf531q1CTMQ2GCpHFgPJhg0bPmfz6OmhqakX9Pr1jFuFmIhtMFSMwMti4GA6alxbqqWWlmYymzuos9NMXV2uFWIgFmIidlra+WcsJDh70UHoLCEFD/DiZLuukCtV59BB6CwhBQ/wAk/OJBKf+OsVvUFPfX29NDQ0SI8fD9HIyLBbhFiIidjwAC8+GOK5kUNIwQO8OAnISgzx3MghpOABXuDJmUSysrMfPXz4gEZHH9PTp2OCCLHhAV58MA9AB4lB8OJEm37E6GPMA9BBYhC8wBO8LTSZ3DwpzmJ0lKCCB3hZLoCsEiEgq5wBRJp/DUO94IDAA+PFC4j4AJFhPiA4IPDAePECIjZA8q+KB5D8q15AvIC4CpCZ2VdUVV1FyZJkioiMoJCQENq5cwcd+u4QZWX9QffbWj0CkJmZaaqqMlJychJFRCCP4Lk8Dh2cy+P+PY8AZGxshEpLtZSQEE97935LgYFb2D6Jioqk1NSzVF9f5z5ATPdaKDommvz9/T+ouLif6dHQoGgBMZnuUnT0gfnl8WhAtIDU1v5N4eFhtHHjxg8qNvZHevCg07WAaLQlDJ2BbMMFBARQQmICW9bQWE81jFGlSkFHjhyxNu7u3buow9wuOkA0GjXOsjd5+OPMY8saGpg8apg8lMjjsG0eHW2iA6SgQEmbN3/NArBp0yY6ceIntsxorCS9Xke5uVfo4MEYKyTbt2+jO3caXAMIAAAUaLCoA1EYSezWVZcUU2hoqLVxBwYtogEEAAAKNo+oKIwkduuq1UVMHiFv8xjoFw0gAABQoOP379+HkcRuXaVSTlu3BnKQYGt9aQEZf/6Mdu36Bg3FzjMmp17YHEc5fgNtt897OEhAtigAGR9/as0D84zJyQmb43N5aN7ZPu8GJFweogDEYumjbdtC0eGYZ/A211B+/XqBTRnmUxwkR4/+sLSASPOlbAMFBwdTd083yhwCApVo1NZhusV0V3BApNK8N3kEUXf3Q5Q5BAQqKSl+m0dLs+CAXLiQzXb0li0B1NpqQplDQCCVSoFjEEbSpQMkkqEUjXP58iV8njcgEDcnSU8/LzggkZFcHhfxeb6AQJiTcHkIDsi+fXvZTs7MzMDneQMCcXOSlBTJ0gAyOjZiPXvaO9oWDIhCqWCPxzDGhAQEF6GsebTfXzAgCoV8Lo+YaEEB6e3tto4CjY31CwYkN/cyezwiInxxgHR1dVIb05A6Xbm1YbFaQRk0/eqltS4mr5IUCf7nqfqvanwXkyNBAMH9Dm1trUweZdY8sFpBGTQ9PWWti8mrRJKM/3mqrq7i8hAEkObmJsb3bSosvMkBgtUKyiCb72HympiYgP95KisrZb8bFBS0OECMVUZu1cJTTs4Fm7parQbl2FwSHSBG4y10vJ08sm3qarUlXB5iAwQjG7dq4Sk9/dw7y18VyrFJ5jJAuOUqr1HP/H7mvXWLigvZ45cuXRTbTwyWq/w8zqS8t25REZdHjth+YrBc5cFx+vQv760rl19jj2dkpLviJ4a/goHiTsVhm91uXWyUyeQyMU5SsYKx2R3FNru9utgok8muiXKSyq1goOPHY7HNbq8uNsowIXfpJBUChVg78/Y/eBL3MpfLg7f/wZPIl7kY/Q4f/t7RzUXuW+bOMolPvHjuqJ7oN8pmmdFvYmLcUT3Rb5Q9eTJKg4MWR/XctVHGVysTzNzZ4WFb7Xxhk8lsbvewrXa+bt+upaamRiG22vnCpXx0PjcnURUoqbauBvKYi3UQzih0PjcnUamYPGprII+5WAfhUj46n5uT5OXlksGgg9x7sY4TOvzYsaOefrkfHY48PP1yPzocMAt9uZ+vOmZYS0pOorDwMPYazY4d2z3uhiGoro7JI+k3CgtDHkHIw+NuGIIqKvQUH3+K9uzZg2s06JP/3zDkveXQe8uh955ULyBeQLyAeAHxAuIFxAvI8nhwyuMf3uYA0ZaW9Yvl4W14gScnn80dsFj6BQcEHuDF41//wD28LZXJMsXy+gd4cfbh7bRzmX82NTcLDgg8wMtyeYHMyjVr1nxZrqscE/oFMjq9YRRenH39w9q1a7+QK5RPTCYTDQ+7/yFuxERspVI1Bi/L5RVUKxh9snr16q+k0qtZGm2pxd2voEJMxIYHeIEnZ5Px8/Pzzcm5mHH9xs3+m4XFVFikdosQCzERGx7g5T96Lmm6xIwCrgAAAABJRU5ErkJggg==);width:14px;text-indent:-9999px;border:0;background-position-x:0}.hub-map-view .hub-list-more:hover{border:0;background-color:transparent}.hub-map-view .hub-list-more:active{border:0;background-position-x:-100px}.hub-map-view .hub-list-footer{position:absolute;bottom:20px;right:20px;z-index:100}.hub-map-view .hub-place{stroke:none}.hub-map-view .hub-place,.hub-map-view .hub-map-content-marker{cursor:pointer}.hub-map-view .hub-place .hub-map-marker-bg,.hub-map-view .hub-map-content-marker .hub-map-marker-bg{width:100%;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAwCAYAAABqkJjhAAACPUlEQVR42t2Z2U7CQBRA1WhM9A941oQX/C/9If0L+AMXliCbylZAkEU2AX+Al9pDnEgkWNopt8VJTkKYe++cDKWd6ewttQOLQ4ujQIETbr8aHSGLsEUkYIRxw3F5ZkOxWOxqPp+PzYA1nKLR6CWOaqaZ8rCGrIg0jriqyyGiOsezT21G0xl4Uks1HHH1TBhBo9Uz08818zZdBj7zHX3BEq63+2YiV1WiK9BHjO/CQ2vm8uUmUptALDn+CPMzZ4oNRJxADrnywtVmFwE3kCsurP5cbiBXXjiRr7oVJldeOJ6tuBUmV144qTHD5Mpfw0+ur2Fy5YWzpVe3wuTKCr8YbwysAzXkhHNqdjWghphwsd7WFaaGnHCrN9QVpoacMGuBZN5wK0suNeSEYTiZmoVK06ksOeT6s7xsdgdOhcnxbz3cH0+cCpMjJKz/ACHW/y3S++jDvM/YyhJDrJCw/m2OGLE9ne7Tj75g7JoHk+niX1+qt+12zcQQS46scGcwNkuNju4WiRrU2o5wb/SxePbH1Sx6BzWpzRj6wu3+yMy8NCgsAWMxpmNhbu7q/uoHjI3DZsLcK+O5Col+ggMu9sL5sppZ38HFVlgtG4MALv9RuBAc4VRhA+HUjgn/+YLkDh5L35QX3EPmh4cF1W+W+oAchapj88JlRXjXDmV27tjLq4PFC8MwbtYNSh8xXhwsenV0e2pxjtga2XNitI5uPW77FidKekWWPmIEmivpWq12DRqy4tJnoCErLn0M25D9Ar+GEEWCwlUXAAAAAElFTkSuQmCC)}.hub-map-view .hub-place .hub-map-marker-thumbnail,.hub-map-view .hub-map-content-marker .hub-map-marker-thumbnail{top:4px;left:4px}.hub-map-view .hub-map-marker-thumbnail{position:relative;width:36px;height:36px}.hub-map-view .hub-map-collection-marker{cursor:pointer}.hub-map-view .hub-map-collection-marker .hub-map-marker-bg{width:100%;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA3CAQAAADtEHHzAAADs0lEQVR4Ab3YXWhbZRjA8f/5Pl2apEub1X4Eq2GiuNV9OSsyGMrU1RWnMm8UrybIrobsYuBcnWMiSBFvvBYUL3V1tNqpUGXTdmZzKshAx+posV27NknX5Jzk5LxCGGQ5bYXBeft/785FfjzvCefiIcQUFOSHis461hPDQGIKOjZJ0mxu285m7sOSw2iYJOji4Z2P//h2dlx4hckTL9GBgRrutRnE6OShdVs/PzQ5XCqWRUkURVb8nmE3aZKYrJBy14yKRYw49qkH9/elnqbFpXqqgzaI4m+JSPbSk8euTuCtiAV+TFn17Rg0Eieyt+P13gf2mF0uAhP79lGpdWmg5z0WqeCvjhkkA/8opXpUdKLEiTbFX350S0/qfks1sbDQWbnJTO8RZskyS3llTOWe0/t7jxuthFJ5ZujEC4NM49eAWjpN4VFgtD7XTwwVgphKA8101KhwOAyUIKYQ69w4fmT4FFLTAdBInjvWfuAKclMBMFnftA2Qj2HTRtv8rbXANDac3Hquv6Eb6emoRN/8aK7dYS0wOnS71WIeKSn11+hP5bIZmxL+WmDk/zxjouLIxxAsHR3RijpFJKTVY+Cdn5kZteRMZgYxn/zYGTnY8g+xoPDqD2JeChZHr8egUlr492wFj7BrbqEBpR4T5L8ZVHAJu1d2EkMNYu7xy8XrDmHX/QRRtHoMfHJ/f18i7NrSBzqJoASx/Ccjrk/IGcrBPmKo9RiURq/+c42QM0k/QxQjiHnMZS4QchZG1/ubaEStxwS5Ly6Fj7m82EcsiEF5cZaQ0/FofzbSiBnEKuQJPQ098emu6mx1mC8DsyjRs48YWj0mcAg9G5cNux9LYKPUYyUZmAP2wB5iqHdi4MmZTLBpH9H6yUAQeiogiG9P1q5RZgYezvTsLYT0ycASU+MfH+IGFV0+5v668SDXKKzJZM0RshQRoCK9m5cpAUjHpi5mPtx1kkV8AB2p7e3nD+Zwlk8mKJdnCDH3BhNMU0Asx3zyw++6NyCs1cTX77CA939Ll2bSQ2+ldrBiHi4uJRx/cuLi2Omxm9PkKOLgIQCBQNQ08qsvXQBUTO796Y0dh+8c2KGIg4tDBYPS9b++/eyroSssVB9UakAggb98nRTkEu2pn48mtswV7EccxaGMhlU96vz0yHdfHr5AjgIePnfZcgx0EjRh0vLLQGrb7Q2VMzuaGXztbG6BJSr4iHDXsAZNHzy/NOV72fHzx57qJomNhoKkFBrpTKVpJYKOiuQUNLTwmP8AikFDS3MsZj8AAAAASUVORK5CYII=)}.hub-map-view .hub-map-collection-marker .hub-map-marker-thumbnail{top:10px;left:9px}.hub-map-view .hub-map-marker-badge{position:absolute;top:0;right:-7px;background:#0f98ec;color:#FFF;min-width:25px;border-radius:10px;text-align:center;font-size:1.1em}.hub-map-view .hub-map-night{stroke:none;fill:#333;fill-opacity:.5}.hub-map-view svg.hub-map{position:absolute;z-index:1}.hub-map-view .hub-map-graticule{stroke:#ccc;stroke-width:.5px}.hub-map-view .hub-map-info-window{position:absolute;z-index:2;border:1px solid #AAA;background:rgba(255,255,255,0.9);color:#FFF;width:100px;height:100px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}@media only screen and (-moz-min-device-pixel-ratio:2),only screen and (-o-min-device-pixel-ratio:2/1),only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2){.hub-map-view .hub-list-more{background-repeat:no-repeat;background-color:transparent;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAABICAYAAAA+oKo7AAARHklEQVR42uyd2VfURxbHncyaPM+cMy8zf0HecuY9L2pUiEuCxgyocTfJhGQU3EFF48amKCgCAjbGJSogKuCIimgEZJOoIO4rbmyizsPk1NTnaMduqvdfd9P0rzzn++LPrvbeW/Xp+t26VTVs4J/IyNl/Lti1L7b4cNm5sqPHuo5VVIpwFjZiKzZj+7DQ+fMbqXeioqL+kpdf9F1JSelPZUdkPMorRTgLG7EVm7EdH+CLUAnKBx988Pfvvotbs2JlUuvqNWufr123QYSzsBFbsRnbXXZYi2Vv/NHyiv8xsMwobN+9Z18cvggBePzWYtm96OgxGQ8GlwmF7buKihbiixCIyTsLFsSnyEH1y8bkVJGSmi5S0zaLtPTNIn1TRlgK27ARW7EZ2+Pi4pPxhdJhDx0q3cMgKq88LlpaW8Wjx49E/4vn4tV/X4a1sBFbsRnb8QG+wCeDCI/f7T94cB+DqFz+f1ouXpT/x07R398nXr16EdbCRmzFZmzHB/gCnwxiTN5JXJFUkZySKjZt3iL27N0rTpw4IWprfxINDfUCNTZeCCtZ7cJGbMVmbMcH+MIOIsw8GDhVJ0+Jh50PGVimFLbjA3zBTGSwZh75+YWLGThVVTIeDx8wsEwpbMcH+KJQzsYGayYSt3DpxtS0dLFte7Y4ebJKXLzYLC5dahVtbZfF1attAnV0tIeVrHZhI7ZiM7bjA3yxIH7Zhl9zHkzd+fVV4GFSiOALfIJvgp3z+PDDqL8ydefXV4GHSSGCL/AJvgl2TuT99//xNzmF/2Vr5jZx5ky1uHLlkrh+vUPcvHld3L59U9y9ezushY3Yis3Yjg/wBT7BN8NIHspfXKbwpoeHVfgCn+CbYE6TmabvyC+cL39xmcKbHh5W4Qt8gm/wEb4KVlAWLUlYlbElU5SUlor29iuCwXTv3h3x4ME9Cbf7orPzQVgLG7EVm7EdH+ALfIJvhrECIQcLeQDTg8MqfIFP8E0wZx9SfyguLjkvBwt5ANODwyp8gU/wDT4K5iwkOSWleXt2jqi/UCcYQPfv3xUMrMePO00lbMZ2fIAv8Am+GfZmqZZkounBYZtYtS7xBjP3IfXHN0u1JBNNDw7bxKp1iRcfBTMXsjlja29uXr7MB7TzK6zAw2wQwQf4Ap/gm2EMFCnTQ2OgrH4J5sqL1J8YKFKmh8ZAWf2Cj4K5IpOZtV3szC/kl5epPAPJ1MIH+AKf4BsNkNAACFPy30u9qwHiFiDv4qtg5UG2bd8hCgotJBPJB5geIPgAX+AT6RsNEA0QDRBXf7J35IhdliJWJJjCmx4g+ABf4BPpGw2QEAPIexogbgHyXvABslsDRAHIbg0QDRANEPcAydUAcQqQXA0QDRANEA0QDRANEA0QDRANEA0QDRANEA0QDRANEA0QDRANEA0QDRANkJAGSMe1q+KHPbvFipUrxLffxoopU6eIjz/+WEyaNFHMmTtHLFmyWGzalC6qz5wWvX09GiABVkeHjMcPMh4rEl/HYwrxiHwdjzmz38ajWsajt1sDJMBqbm4UeXm5Ar9/+eU8MXnyZDF69CgxYcJ4MX36F2L+/H+L9evXifLyo5SZmwMgXd3PZCVbgZg+Y7oYNWqUxxo/frxIlB27salBA8SP6up6KgoK8mWH9DYe40RiYgIH0GiA+FFUem7fniViYqLF8OHDPVZkZIRYvHiR3HJ/OjwB0ve8V+zdt4dfMzqgIS1PWC7ar7ZrgBhQn5zR7d3rp3gsXyba29s0QAyI3a75+TuZXQAEQ1q4MB6whw9AbsgNOLPnzKaz+U1jxowRRbstGiA+6MaNa2L27Fl+jsdoUVRk0QDxQa2tLeKLL6Yx+P2mkSNHiJycHUMfIDVnz4hPP/3EZef77LNJYunSJWJj8gaxQxqdkbFZrEpaJb7++mtA4fKzq9esFj293RogHqqmxot4bJTx2JH9Oh6rVsp4fAUoXMdjdZLo6enSAPFQlZXlYuzYsS5h8MknE8SCBfPxLbEgLsSHHwFA4eqzzA75/w9NgBz/z3GZ9BntNKexbVuWaG5pEi/pKE7a6Hz0UBw5Uia++eZfzjotz4CIBogbHT9eKePhNKch45EpSNy9fNnvrA06kYzHYXfxACIaIG5UWlosRowY4TSnkZ6eKs7KH+BHjx46beOaXIjYv3+fmDt3jjOI8AwbhhRAAAMrKkrnAihQ9GHnA6/brDpZ5Sz5yoxFA8SFAAMrKmo8RhEPtmp73WZV1QlnyVdmLBogzgUY8L0y2AEKMwwON/a2zbKyw86Sr8xYhg5Abt+5xTRY6VRRUZ+Ks+dqDK/iJCQm0J6ivJ15GiCqyOw7j8fZGsOrOAkJyx3HIy9XA0QVJ53zWqIM8nHjxslZYoXhVZxFixY6hEhm5tYhARCHA3zy5M/E9RvXXH3O+m/Jfbj9jq1btzia3cjg/KwBYi8GuON4XL/m6nM28fjK3XfIeGQ4mt0wWDRA7OVogJOX4voEV5+z/ltyH26/IyUl2eHsprb2fGgDpLbuvNKRIGvrzxd57i+AkDdxBCqWsDRAbMTlQGo8xpL557m/AELeBFA5iocGyFvx2qcM7IiIMeL8+XM89xdAyJs4AhUFgqENkLnz5iqd6PDhUp75FSCou6fLUU6E1yQNkDcigabGo4RnfgUI6u5+5ignwmuSBsgbzZgxXRnU1OPwzJ8AQXfu3HKUE+E1KTQB0nKxWek8CgyMAkRNrA78Tkp/NUCkWlqaFN8oMDAKEDWx6igeGiBS587VKINZgYFRgKiJVeU7KYEPSYBkZWUqnaeuvjagAEGxsd/YfWdkZKR41vXU9ADJytqqxqPufEABgtR4RIhnz56YHiBpaSnKYObKyEACBM2bN9f2O2VMPhK3bt0IPYBEx0TbdZyYKTH8fcABUlJSrAyUisoK0wMkOnpAPGJi+PtAA0TG45Aaj4py0wOElTCbgUwim78PNEDYIKmAq7j4YEgBhKVbpdNQKBYEgFBTohSsbdi43tQAYTlPjUdmMABCTYlSsLZhw3ozA4TVKGUQUygWBIBQU6IUrCUlrQotgFxoqFc6LPmJYAAEzRmQLIyPjzM1QC5cqFPjUXUiGABBbP9X4mFmgJw+fVIBCPmJIAAEsf3f7rtjY2NDCyBHjx5ROuzly5d8AsjUaVPF8/4+bz5Los7uu2fOmmlmgMh4lDmIx88+AWTqVBmP573efFaNx8wZpgbIjz/uVwBSV1frE0A+//xzb2/KI3Fq+90yplMGDSDkF9iab6ely5YqHTa/IJ9niu5L4x20S+m77ZZ9r+7sTU7ZaPvdVPqZBSDkF1gKtBWly2o88nfyTBFbyR20S+m77ZZ9r+7sTU5W4mEWgJBfwNd2iotboACEV3yeDRC34Dtq17b0nfoar27LW7Mmyfa7GWuDB5ArVy7TIXzZ9k0FqbN2OXmMFRS7/S0vXvZrgLiWjMclA/HIcNpudTXxiLDb3/LixXMNEDeqr69lgPqyDZ8KUmftcvIYKyi2+1v4fw0RgKg5D+uMwWOtXbfWo7qOiIi3nXbd+nVUnepXGPc5D2YM3sVj7fee1HVQKfk2HuvWUnWqX2Hc5zysMwZPxVGSHtV1fPTRyF8/s3LlCqpOh8IrjKpT0knWwe5GdChPX0mYktudA5KamqKTqB7o1CniMcbzePT3efiKdIxzQGzjoZOo7kVe0DrY3YkB7vEryaFDB+zOAfn++zVDNolKmbq7zkphEed1eNuu3dLsli0ZehnXvShT9ywePV3etssvqm089DKue5FjcgcPCr34Dm/btV2a5ZVx6C7jWoosTjvrLJacnjzyqd0DB3+0tsPp7bqQzENZLLucx2PWTDqDT+0eOLDf2g7FSbqQzEPl5GQ7hce0aVM5YtKndi2WQms7HJ0Q0oVkPm2vpzL17r07RtoFHKzm6FJ2RV5vr6cylQ5gpF06IysFupRdkdfb66lMJQFupF3AwWpOeJSykyS1dpqJE6O498XXtvRmOuMiSWofj46rvralN9MZL2UnSWodxBwhySlxBtoLv810JEnpLJx3ys5cI23p7fzGRZKUeNBZ2ZlrpC29nd84QMgNMXiZkbEz10hb4bmdH5EsbWpuNNqOrwcKke3XBwrZiGRpU1OD0XZ8PVCIeOgDhWxEWzU11Ubb8fVAIVZf9N24+kjDoEsfaRhad+OG6ZGG7kVlacAOVc7Ny9WHKnsnKksDdqhybm6OPlTZ+0EaqEOV+dEd2nfjUq9BhSgXND999kRf6zC4AOGdnArR1/F4+lhf6zDIAKFegwpRLsy+efO6ia51cC9qQeyqRTmFGiK2tV3hub5YKsgAoUNQLWofjwwZj8s81xdLBRcg1ILYVotyWx2vIWxR4LnJLpZSXzs448PlVYrsvk1LS9VXW0oF4UZ+zvhwHY/ly4iHvtoy8ADhtYMzPlxdbcnuW5blzXC1pSrqQeZ9Oc/vl2tbivTl2j6IehCKi/x9uTYVsPpybe9FPQivkgG4XDt7KF+urdaIFO4qpEbEcGdlttLW3ka7GiAGakQKCwuoETEaD37leBWlXQ0QAzUi2dnbqBExDA9mKw0N9bQ7xAGiiuQp5enKAczuBHgSZSVfY1ODtS0NEOMieUp5unIAszsBnkS5GtbYeMHalgaIcZE8pTxdOYDZnQDP4sWLxJkzp5U2wwQgaiEYNRucUMayLK840dH/FJwxMmnSREHClSpKVgg4aKi3r8f6WQ2QwBSCUbPBLk+WZXnFeROPSOJBwvVtPKplPHq7rZ/VAAlQIRg1G+w7YlmWVxziQG3NhAnjBQlXqlpZseGgoXv37njati4k0wAJCWmAhJY0QDRANEA0QDRANED+397Zu7QVRnE4UmktFGqhUDo5dXBTHJxc2tl/o2sn20HwYxLtB6bWxET7od58Xa9JjGlyTSFmEkQoqEuFSp2qdqh0r9y+D+RC25SO75BzLpw/4Pe8Oc97csIlKhAViApEBaICUYGoQFQgKhAViApEBaICUYGoQFQgKhAViApEBaICUYGoQFQgKhAViApEBaICUYGoQFQglgVSrlS/m0bhRTfx0ggLFjCBjW2BlN+b8/BrvOgmXhphwQImsLEtkPhC8gfNcnLyRQXSFAgsYAKbSHGzvEOznH87Fy+OsGABE9hYFsj1fLG0W/U5jzPx4ggLFjCBDYxsCmQ+Fvu46qT4M3kVSFMgsIAJbCLLq+4jmmX/8FC8OMKCBUxgY1sgsYXkE5pl/+BAvDjCggVMYGNbIFNT06PLK06w3Wjwur14gcAAFjCBTWR4+OHtir/10699CE7PTsXLAwawgAlsLAmkw1Snqa7+/vs9lao5j62aOayv4uUBA1jABDYwghXMbBzMwMDQ3bfvVi4zWZebV7xAYAALmMAmwuM4ucfcuPXthmiJkB0GsEhn3RHYWBTIFVPXTN1YXHw9zo1brzdES4TsMIBFcunNGGxgBCtbAuGZefZiMpXOBMWNUnB09EmsPMgOA1hMP30+8ccHuFAoZWkcbl9GePYAEharZCQrmckOA1jAxLJAGMmvNpeENzOum6dxuH0Z4dkDSFiskpGsZCY7DGABE9jACFa2zyeRWCqkM7lgzcubfz3cCY6PP4v4SkNGspKZ7DCABUxaIDGJMLrTRBKL7EweLXDs7UE6wynE1K14PDHB6E4TSSyyJ8w0Bovfpg8Ywcr20xGNzo2bBrp017yAZvLWqUJbFxnJSmayz758Nfbf/uB7P8tDfoEIf+Jt5yIjWcn8z52H/SmEBWFXs2G6e3v77kXn5ke99eLeZtm/aHdpkJGsZCY7DGABE9i0TB+Wn8HBB3dME404Tmo3m3Mvcq4XtHORkaxkJvvfPH4BWvbFAtQpE34AAAAASUVORK5CYII=);background-size:50%;text-indent:-9999px;background-position-x:0;border:0}.hub-map-view .hub-list-more:hover{border:0;background-color:transparent}.hub-map-view .hub-list-more:active{border:0;background-position-x:-100px}}"
}), !function() {
    function t(t) {
        return null != t && !isNaN(t)
    }
    function e(t) {
        return t.length
    }
    function n(t) {
        for (var e = 1; t * e % 1; )
            e *= 10;
        return e
    }
    function i(t, e) {
        try {
            for (var n in e)
                Object.defineProperty(t.prototype, n, {value: e[n],enumerable: !1})
        } catch (i) {
            t.prototype = e
        }
    }
    function r() {
    }
    function o(t) {
        return us + t in this
    }
    function a(t) {
        return t = us + t, t in this && delete this[t]
    }
    function s() {
        var t = [];
        return this.forEach(function(e) {
            t.push(e)
        }), t
    }
    function u() {
        var t = 0;
        for (var e in this)
            e.charCodeAt(0) === ls && ++t;
        return t
    }
    function l() {
        for (var t in this)
            if (t.charCodeAt(0) === ls)
                return !1;
        return !0
    }
    function h() {
    }
    function c(t, e, n) {
        return function() {
            var i = n.apply(e, arguments);
            return i === e ? t : i
        }
    }
    function f(t, e) {
        if (e in t)
            return e;
        e = e.charAt(0).toUpperCase() + e.substring(1);
        for (var n = 0, i = hs.length; i > n; ++n) {
            var r = hs[n] + e;
            if (r in t)
                return r
        }
    }
    function p() {
    }
    function d() {
    }
    function m(t) {
        function e() {
            for (var e, i = n, r = -1, o = i.length; ++r < o; )
                (e = i[r].on) && e.apply(this, arguments);
            return t
        }
        var n = [], i = new r;
        return e.on = function(e, r) {
            var o, a = i.get(e);
            return arguments.length < 2 ? a && a.on : (a && (a.on = null, n = n.slice(0, o = n.indexOf(a)).concat(n.slice(o + 1)), i.remove(e)), r && n.push(i.set(e, {on: r})), t)
        }, e
    }
    function g() {
        Wa.event.preventDefault()
    }
    function v() {
        for (var t, e = Wa.event; t = e.sourceEvent; )
            e = t;
        return e
    }
    function _(t) {
        for (var e = new d, n = 0, i = arguments.length; ++n < i; )
            e[arguments[n]] = m(e);
        return e.of = function(n, i) {
            return function(r) {
                try {
                    var o = r.sourceEvent = Wa.event;
                    r.target = t, Wa.event = r, e[r.type].apply(n, i)
                }finally {
                    Wa.event = o
                }
            }
        }, e
    }
    function y(t) {
        return fs(t, vs), t
    }
    function b(t) {
        return "function" == typeof t ? t : function() {
            return ps(t, this)
        }
    }
    function w(t) {
        return "function" == typeof t ? t : function() {
            return ds(t, this)
        }
    }
    function x(t, e) {
        function n() {
            this.removeAttribute(t)
        }
        function i() {
            this.removeAttributeNS(t.space, t.local)
        }
        function r() {
            this.setAttribute(t, e)
        }
        function o() {
            this.setAttributeNS(t.space, t.local, e)
        }
        function a() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
        }
        function s() {
            var n = e.apply(this, arguments);
            null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
        }
        return t = Wa.ns.qualify(t), null == e ? t.local ? i : n : "function" == typeof e ? t.local ? s : a : t.local ? o : r
    }
    function L(t) {
        return t.trim().replace(/\s+/g, " ")
    }
    function M(t) {
        return RegExp("(?:^|\\s+)" + Wa.requote(t) + "(?:\\s+|$)", "g")
    }
    function k(t) {
        return t.trim().split(/^|\s+/)
    }
    function C(t, e) {
        function n() {
            for (var n = -1; ++n < r; )
                t[n](this, e)
        }
        function i() {
            for (var n = -1, i = e.apply(this, arguments); ++n < r; )
                t[n](this, i)
        }
        t = k(t).map(P);
        var r = t.length;
        return "function" == typeof e ? i : n
    }
    function P(t) {
        var e = M(t);
        return function(n, i) {
            if (r = n.classList)
                return i ? r.add(t) : r.remove(t);
            var r = n.getAttribute("class") || "";
            i ? (e.lastIndex = 0, e.test(r) || n.setAttribute("class", L(r + " " + t))) : n.setAttribute("class", L(r.replace(e, " ")))
        }
    }
    function A(t, e, n) {
        function i() {
            this.style.removeProperty(t)
        }
        function r() {
            this.style.setProperty(t, e, n)
        }
        function o() {
            var i = e.apply(this, arguments);
            null == i ? this.style.removeProperty(t) : this.style.setProperty(t, i, n)
        }
        return null == e ? i : "function" == typeof e ? o : r
    }
    function S(t, e) {
        function n() {
            delete this[t]
        }
        function i() {
            this[t] = e
        }
        function r() {
            var n = e.apply(this, arguments);
            null == n ? delete this[t] : this[t] = n
        }
        return null == e ? n : "function" == typeof e ? r : i
    }
    function E(t) {
        return "function" == typeof t ? t : (t = Wa.ns.qualify(t)).local ? function() {
            return this.ownerDocument.createElementNS(t.space, t.local)
        } : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, t)
        }
    }
    function T(t) {
        return {__data__: t}
    }
    function D(t) {
        return function() {
            return gs(this, t)
        }
    }
    function I(t) {
        return arguments.length || (t = Wa.ascending), function(e, n) {
            return e && n ? t(e.__data__, n.__data__) : !e - !n
        }
    }
    function z(t, e) {
        for (var n = 0, i = t.length; i > n; n++)
            for (var r, o = t[n], a = 0, s = o.length; s > a; a++)
                (r = o[a]) && e(r, a, n);
        return t
    }
    function O(t) {
        return fs(t, ys), t
    }
    function B(t) {
        var e, n;
        return function(i, r, o) {
            var a, s = t[o].update, u = s.length;
            for (o != n && (n = o, e = 0), r >= e && (e = r + 1); !(a = s[e]) && ++e < u; )
                ;
            return a
        }
    }
    function N() {
        var t = this.__transition__;
        t && ++t.active
    }
    function U(t, e, n) {
        function i() {
            var e = this[a];
            e && (this.removeEventListener(t, e, e.$), delete this[a])
        }
        function r() {
            var r = u(e, Ja(arguments));
            i.call(this), this.addEventListener(t, this[a] = r, r.$ = n), r._ = e
        }
        function o() {
            var e, n = RegExp("^__on([^.]+)" + Wa.requote(t) + "$");
            for (var i in this)
                if (e = i.match(n)) {
                    var r = this[i];
                    this.removeEventListener(e[1], r, r.$), delete this[i]
                }
        }
        var a = "__on" + t, s = t.indexOf("."), u = R;
        s > 0 && (t = t.substring(0, s));
        var l = ws.get(t);
        return l && (t = l, u = F), s ? e ? r : i : e ? p : o
    }
    function R(t, e) {
        return function(n) {
            var i = Wa.event;
            Wa.event = n, e[0] = this.__data__;
            try {
                t.apply(this, e)
            }finally {
                Wa.event = i
            }
        }
    }
    function F(t, e) {
        var n = R(t, e);
        return function(t) {
            var e = this, i = t.relatedTarget;
            i && (i === e || 8 & i.compareDocumentPosition(e)) || n.call(e, t)
        }
    }
    function Z() {
        var t = ".dragsuppress-" + ++Ls, e = "click" + t, n = Wa.select(Qa).on("touchmove" + t, g).on("dragstart" + t, g).on("selectstart" + t, g);
        if (xs) {
            var i = Ka.style, r = i[xs];
            i[xs] = "none"
        }
        return function(o) {
            function a() {
                n.on(e, null)
            }
            n.on(t, null), xs && (i[xs] = r), o && (n.on(e, function() {
                g(), a()
            }, !0), setTimeout(a, 0))
        }
    }
    function j(t, e) {
        e.changedTouches && (e = e.changedTouches[0]);
        var n = t.ownerSVGElement || t;
        if (n.createSVGPoint) {
            var i = n.createSVGPoint();
            if (0 > Ms && (Qa.scrollX || Qa.scrollY)) {
                n = Wa.select("body").append("svg").style({position: "absolute",top: 0,left: 0,margin: 0,padding: 0,border: "none"}, "important");
                var r = n[0][0].getScreenCTM();
                Ms = !(r.f || r.e), n.remove()
            }
            return Ms ? (i.x = e.pageX, i.y = e.pageY) : (i.x = e.clientX, i.y = e.clientY), i = i.matrixTransform(t.getScreenCTM().inverse()), [i.x, i.y]
        }
        var o = t.getBoundingClientRect();
        return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop]
    }
    function V(t) {
        return t > 0 ? 1 : 0 > t ? -1 : 0
    }
    function q(t, e, n) {
        return (e[0] - t[0]) * (n[1] - t[1]) - (e[1] - t[1]) * (n[0] - t[0])
    }
    function H(t) {
        return t > 1 ? 0 : -1 > t ? ks : Math.acos(t)
    }
    function G(t) {
        return t > 1 ? Ps : -1 > t ? -Ps : Math.asin(t)
    }
    function W(t) {
        return ((t = Math.exp(t)) - 1 / t) / 2
    }
    function Y(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2
    }
    function J(t) {
        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
    }
    function X(t) {
        return (t = Math.sin(t / 2)) * t
    }
    function K() {
    }
    function Q(t, e, n) {
        return new $(t, e, n)
    }
    function $(t, e, n) {
        this.h = t, this.s = e, this.l = n
    }
    function te(t, e, n) {
        function i(t) {
            return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? o + (a - o) * t / 60 : 180 > t ? a : 240 > t ? o + (a - o) * (240 - t) / 60 : o
        }
        function r(t) {
            return Math.round(255 * i(t))
        }
        var o, a;
        return t = isNaN(t) ? 0 : (t %= 360) < 0 ? t + 360 : t, e = isNaN(e) ? 0 : 0 > e ? 0 : e > 1 ? 1 : e, n = 0 > n ? 0 : n > 1 ? 1 : n, a = .5 >= n ? n * (1 + e) : n + e - n * e, o = 2 * n - a, pe(r(t + 120), r(t), r(t - 120))
    }
    function ee(t, e, n) {
        return new ne(t, e, n)
    }
    function ne(t, e, n) {
        this.h = t, this.c = e, this.l = n
    }
    function ie(t, e, n) {
        return isNaN(t) && (t = 0), isNaN(e) && (e = 0), re(n, Math.cos(t *= Es) * e, Math.sin(t) * e)
    }
    function re(t, e, n) {
        return new oe(t, e, n)
    }
    function oe(t, e, n) {
        this.l = t, this.a = e, this.b = n
    }
    function ae(t, e, n) {
        var i = (t + 16) / 116, r = i + e / 500, o = i - n / 200;
        return r = ue(r) * Zs, i = ue(i) * js, o = ue(o) * Vs, pe(he(3.2404542 * r - 1.5371385 * i - .4985314 * o), he(-.969266 * r + 1.8760108 * i + .041556 * o), he(.0556434 * r - .2040259 * i + 1.0572252 * o))
    }
    function se(t, e, n) {
        return t > 0 ? ee(Math.atan2(n, e) * Ts, Math.sqrt(e * e + n * n), t) : ee(0 / 0, 0 / 0, t)
    }
    function ue(t) {
        return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }
    function le(t) {
        return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }
    function he(t) {
        return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }
    function ce(t) {
        return pe(t >> 16, 255 & t >> 8, 255 & t)
    }
    function fe(t) {
        return ce(t) + ""
    }
    function pe(t, e, n) {
        return new de(t, e, n)
    }
    function de(t, e, n) {
        this.r = t, this.g = e, this.b = n
    }
    function me(t) {
        return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }
    function ge(t, e, n) {
        var i, r, o, a = 0, s = 0, u = 0;
        if (i = /([a-z]+)\((.*)\)/i.exec(t))
            switch (r = i[2].split(","), i[1]) {
                case "hsl":
                    return n(parseFloat(r[0]), parseFloat(r[1]) / 100, parseFloat(r[2]) / 100);
                case "rgb":
                    return e(be(r[0]), be(r[1]), be(r[2]))
            }
        return (o = Gs.get(t)) ? e(o.r, o.g, o.b) : (null != t && "#" === t.charAt(0) && (4 === t.length ? (a = t.charAt(1), a += a, s = t.charAt(2), s += s, u = t.charAt(3), u += u) : 7 === t.length && (a = t.substring(1, 3), s = t.substring(3, 5), u = t.substring(5, 7)), a = parseInt(a, 16), s = parseInt(s, 16), u = parseInt(u, 16)), e(a, s, u))
    }
    function ve(t, e, n) {
        var i, r, o = Math.min(t /= 255, e /= 255, n /= 255), a = Math.max(t, e, n), s = a - o, u = (a + o) / 2;
        return s ? (r = .5 > u ? s / (a + o) : s / (2 - a - o), i = t == a ? (e - n) / s + (n > e ? 6 : 0) : e == a ? (n - t) / s + 2 : (t - e) / s + 4, i *= 60) : (i = 0 / 0, r = u > 0 && 1 > u ? 0 : i), Q(i, r, u)
    }
    function _e(t, e, n) {
        t = ye(t), e = ye(e), n = ye(n);
        var i = le((.4124564 * t + .3575761 * e + .1804375 * n) / Zs), r = le((.2126729 * t + .7151522 * e + .072175 * n) / js), o = le((.0193339 * t + .119192 * e + .9503041 * n) / Vs);
        return re(116 * r - 16, 500 * (i - r), 200 * (r - o))
    }
    function ye(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }
    function be(t) {
        var e = parseFloat(t);
        return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * e) : e
    }
    function we(t) {
        return "function" == typeof t ? t : function() {
            return t
        }
    }
    function xe(t) {
        return t
    }
    function Le(t) {
        return function(e, n, i) {
            return 2 === arguments.length && "function" == typeof n && (i = n, n = null), Me(e, n, t, i)
        }
    }
    function Me(t, e, n, i) {
        function r() {
            var t, e = u.status;
            if (!e && u.responseText || e >= 200 && 300 > e || 304 === e) {
                try {
                    t = n.call(o, u)
                } catch (i) {
                    return a.error.call(o, i), void 0
                }
                a.load.call(o, t)
            } else
                a.error.call(o, u)
        }
        var o = {}, a = Wa.dispatch("beforesend", "progress", "load", "error"), s = {}, u = new XMLHttpRequest, l = null;
        return !Qa.XDomainRequest || "withCredentials" in u || !/^(http(s)?:)?\/\//.test(t) || (u = new XDomainRequest), "onload" in u ? u.onload = u.onerror = r : u.onreadystatechange = function() {
            u.readyState > 3 && r()
        }, u.onprogress = function(t) {
            var e = Wa.event;
            Wa.event = t;
            try {
                a.progress.call(o, u)
            }finally {
                Wa.event = e
            }
        }, o.header = function(t, e) {
            return t = (t + "").toLowerCase(), arguments.length < 2 ? s[t] : (null == e ? delete s[t] : s[t] = e + "", o)
        }, o.mimeType = function(t) {
            return arguments.length ? (e = null == t ? null : t + "", o) : e
        }, o.responseType = function(t) {
            return arguments.length ? (l = t, o) : l
        }, o.response = function(t) {
            return n = t, o
        }, ["get", "post"].forEach(function(t) {
            o[t] = function() {
                return o.send.apply(o, [t].concat(Ja(arguments)))
            }
        }), o.send = function(n, i, r) {
            if (2 === arguments.length && "function" == typeof i && (r = i, i = null), u.open(n, t, !0), null == e || "accept" in s || (s.accept = e + ",*/*"), u.setRequestHeader)
                for (var h in s)
                    u.setRequestHeader(h, s[h]);
            return null != e && u.overrideMimeType && u.overrideMimeType(e), null != l && (u.responseType = l), null != r && o.on("error", r).on("load", function(t) {
                r(null, t)
            }), a.beforesend.call(o, u), u.send(null == i ? null : i), o
        }, o.abort = function() {
            return u.abort(), o
        }, Wa.rebind(o, a, "on"), null == i ? o : o.get(ke(i))
    }
    function ke(t) {
        return 1 === t.length ? function(e, n) {
            t(null == e ? n : null)
        } : t
    }
    function Ce() {
        var t = Pe(), e = Ae() - t;
        e > 24 ? (isFinite(e) && (clearTimeout(Xs), Xs = setTimeout(Ce, e)), Js = 0) : (Js = 1, Qs(Ce))
    }
    function Pe() {
        var t = Date.now();
        for (Ks = Ws; Ks; )
            t >= Ks.t && (Ks.f = Ks.c(t - Ks.t)), Ks = Ks.n;
        return t
    }
    function Ae() {
        for (var t, e = Ws, n = 1 / 0; e; )
            e.f ? e = t ? t.n = e.n : Ws = e.n : (e.t < n && (n = e.t), e = (t = e).n);
        return Ys = t, n
    }
    function Se(t, e) {
        return e - (t ? Math.ceil(Math.log(t) / Math.LN10) : 1)
    }
    function Ee(t, e) {
        var n = Math.pow(10, 3 * ss(8 - e));
        return {scale: e > 8 ? function(t) {
                return t / n
            } : function(t) {
                return t * n
            },symbol: t}
    }
    function Te(t) {
        var e = t.decimal, n = t.thousands, i = t.grouping, r = t.currency, o = i ? function(t) {
            for (var e = t.length, r = [], o = 0, a = i[0]; e > 0 && a > 0; )
                r.push(t.substring(e -= a, e + a)), a = i[o = (o + 1) % i.length];
            return r.reverse().join(n)
        } : xe;
        return function(t) {
            var n = tu.exec(t), i = n[1] || " ", a = n[2] || ">", s = n[3] || "", u = n[4] || "", l = n[5], h = +n[6], c = n[7], f = n[8], p = n[9], d = 1, m = "", g = "", v = !1;
            switch (f && (f = +f.substring(1)), (l || "0" === i && "=" === a) && (l = i = "0", a = "=", c && (h -= Math.floor((h - 1) / 4))), p) {
                case "n":
                    c = !0, p = "g";
                    break;
                case "%":
                    d = 100, g = "%", p = "f";
                    break;
                case "p":
                    d = 100, g = "%", p = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    "#" === u && (m = "0" + p.toLowerCase());
                case "c":
                case "d":
                    v = !0, f = 0;
                    break;
                case "s":
                    d = -1, p = "r"
            }
            "$" === u && (m = r[0], g = r[1]), "r" != p || f || (p = "g"), null != f && ("g" == p ? f = Math.max(1, Math.min(21, f)) : ("e" == p || "f" == p) && (f = Math.max(0, Math.min(20, f)))), p = eu.get(p) || De;
            var _ = l && c;
            return function(t) {
                if (v && t % 1)
                    return "";
                var n = 0 > t || 0 === t && 0 > 1 / t ? (t = -t, "-") : s;
                if (0 > d) {
                    var r = Wa.formatPrefix(t, f);
                    t = r.scale(t), g = r.symbol
                } else
                    t *= d;
                t = p(t, f);
                var u = t.lastIndexOf("."), y = 0 > u ? t : t.substring(0, u), b = 0 > u ? "" : e + t.substring(u + 1);
                !l && c && (y = o(y));
                var w = m.length + y.length + b.length + (_ ? 0 : n.length), x = h > w ? Array(w = h - w + 1).join(i) : "";
                return _ && (y = o(x + y)), n += m, t = y + b, ("<" === a ? n + t + x : ">" === a ? x + n + t : "^" === a ? x.substring(0, w >>= 1) + n + t + x.substring(w) : n + (_ ? t : x + t)) + g
            }
        }
    }
    function De(t) {
        return t + ""
    }
    function Ie() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }
    function ze(t, e, n) {
        function i(e) {
            var n = t(e), i = o(n, 1);
            return i - e > e - n ? n : i
        }
        function r(n) {
            return e(n = t(new iu(n - 1)), 1), n
        }
        function o(t, n) {
            return e(t = new iu(+t), n), t
        }
        function a(t, i, o) {
            var a = r(t), s = [];
            if (o > 1)
                for (; i > a; )
                    n(a) % o || s.push(new Date(+a)), e(a, 1);
            else
                for (; i > a; )
                    s.push(new Date(+a)), e(a, 1);
            return s
        }
        function s(t, e, n) {
            try {
                iu = Ie;
                var i = new Ie;
                return i._ = t, a(i, e, n)
            }finally {
                iu = Date
            }
        }
        t.floor = t, t.round = i, t.ceil = r, t.offset = o, t.range = a;
        var u = t.utc = Oe(t);
        return u.floor = u, u.round = Oe(i), u.ceil = Oe(r), u.offset = Oe(o), u.range = s, t
    }
    function Oe(t) {
        return function(e, n) {
            try {
                iu = Ie;
                var i = new Ie;
                return i._ = e, t(i, n)._
            }finally {
                iu = Date
            }
        }
    }
    function Be(t) {
        function e(t) {
            function e(e) {
                for (var n, r, o, a = [], s = -1, u = 0; ++s < i; )
                    37 === t.charCodeAt(s) && (a.push(t.substring(u, s)), null != (r = ou[n = t.charAt(++s)]) && (n = t.charAt(++s)), (o = A[n]) && (n = o(e, null == r ? "e" === n ? " " : "0" : r)), a.push(n), u = s + 1);
                return a.push(t.substring(u, s)), a.join("")
            }
            var i = t.length;
            return e.parse = function(e) {
                var i = {y: 1900,m: 0,d: 1,H: 0,M: 0,S: 0,L: 0,Z: null}, r = n(i, t, e, 0);
                if (r != e.length)
                    return null;
                "p" in i && (i.H = i.H % 12 + 12 * i.p);
                var o = null != i.Z && iu !== Ie, a = new (o ? Ie : iu);
                return "j" in i ? a.setFullYear(i.y, 0, i.j) : "w" in i && ("W" in i || "U" in i) ? (a.setFullYear(i.y, 0, 1), a.setFullYear(i.y, 0, "W" in i ? (i.w + 6) % 7 + 7 * i.W - (a.getDay() + 5) % 7 : i.w + 7 * i.U - (a.getDay() + 6) % 7)) : a.setFullYear(i.y, i.m, i.d), a.setHours(i.H + Math.floor(i.Z / 100), i.M + i.Z % 100, i.S, i.L), o ? a._ : a
            }, e.toString = function() {
                return t
            }, e
        }
        function n(t, e, n, i) {
            for (var r, o, a, s = 0, u = e.length, l = n.length; u > s; ) {
                if (i >= l)
                    return -1;
                if (r = e.charCodeAt(s++), 37 === r) {
                    if (a = e.charAt(s++), o = S[a in ou ? e.charAt(s++) : a], !o || (i = o(t, n, i)) < 0)
                        return -1
                } else if (r != n.charCodeAt(i++))
                    return -1
            }
            return i
        }
        function i(t, e, n) {
            x.lastIndex = 0;
            var i = x.exec(e.substring(n));
            return i ? (t.w = L.get(i[0].toLowerCase()), n + i[0].length) : -1
        }
        function r(t, e, n) {
            b.lastIndex = 0;
            var i = b.exec(e.substring(n));
            return i ? (t.w = w.get(i[0].toLowerCase()), n + i[0].length) : -1
        }
        function o(t, e, n) {
            C.lastIndex = 0;
            var i = C.exec(e.substring(n));
            return i ? (t.m = P.get(i[0].toLowerCase()), n + i[0].length) : -1
        }
        function a(t, e, n) {
            M.lastIndex = 0;
            var i = M.exec(e.substring(n));
            return i ? (t.m = k.get(i[0].toLowerCase()), n + i[0].length) : -1
        }
        function s(t, e, i) {
            return n(t, "" + A.c, e, i)
        }
        function u(t, e, i) {
            return n(t, "" + A.x, e, i)
        }
        function l(t, e, i) {
            return n(t, "" + A.X, e, i)
        }
        function h(t, e, n) {
            var i = y.get(e.substring(n, n += 2).toLowerCase());
            return null == i ? -1 : (t.p = i, n)
        }
        var c = t.dateTime, f = t.date, p = t.time, d = t.periods, m = t.days, g = t.shortDays, v = t.months, _ = t.shortMonths;
        e.utc = function(t) {
            function n(t) {
                try {
                    iu = Ie;
                    var e = new iu;
                    return e._ = t, i(e)
                }finally {
                    iu = Date
                }
            }
            var i = e(t);
            return n.parse = function(t) {
                try {
                    iu = Ie;
                    var e = i.parse(t);
                    return e && e._
                }finally {
                    iu = Date
                }
            }, n.toString = i.toString, n
        }, e.multi = e.utc.multi = nn;
        var y = Wa.map(), b = Ue(m), w = Re(m), x = Ue(g), L = Re(g), M = Ue(v), k = Re(v), C = Ue(_), P = Re(_);
        d.forEach(function(t, e) {
            y.set(t.toLowerCase(), e)
        });
        var A = {a: function(t) {
                return g[t.getDay()]
            },A: function(t) {
                return m[t.getDay()]
            },b: function(t) {
                return _[t.getMonth()]
            },B: function(t) {
                return v[t.getMonth()]
            },c: e(c),d: function(t, e) {
                return Ne(t.getDate(), e, 2)
            },e: function(t, e) {
                return Ne(t.getDate(), e, 2)
            },H: function(t, e) {
                return Ne(t.getHours(), e, 2)
            },I: function(t, e) {
                return Ne(t.getHours() % 12 || 12, e, 2)
            },j: function(t, e) {
                return Ne(1 + nu.dayOfYear(t), e, 3)
            },L: function(t, e) {
                return Ne(t.getMilliseconds(), e, 3)
            },m: function(t, e) {
                return Ne(t.getMonth() + 1, e, 2)
            },M: function(t, e) {
                return Ne(t.getMinutes(), e, 2)
            },p: function(t) {
                return d[+(t.getHours() >= 12)]
            },S: function(t, e) {
                return Ne(t.getSeconds(), e, 2)
            },U: function(t, e) {
                return Ne(nu.sundayOfYear(t), e, 2)
            },w: function(t) {
                return t.getDay()
            },W: function(t, e) {
                return Ne(nu.mondayOfYear(t), e, 2)
            },x: e(f),X: e(p),y: function(t, e) {
                return Ne(t.getFullYear() % 100, e, 2)
            },Y: function(t, e) {
                return Ne(t.getFullYear() % 1e4, e, 4)
            },Z: tn,"%": function() {
                return "%"
            }}, S = {a: i,A: r,b: o,B: a,c: s,d: Ye,e: Ye,H: Xe,I: Xe,j: Je,L: $e,m: We,M: Ke,p: h,S: Qe,U: Ze,w: Fe,W: je,x: u,X: l,y: qe,Y: Ve,Z: He,"%": en};
        return e
    }
    function Ne(t, e, n) {
        var i = 0 > t ? "-" : "", r = (i ? -t : t) + "", o = r.length;
        return i + (n > o ? Array(n - o + 1).join(e) + r : r)
    }
    function Ue(t) {
        return RegExp("^(?:" + t.map(Wa.requote).join("|") + ")", "i")
    }
    function Re(t) {
        for (var e = new r, n = -1, i = t.length; ++n < i; )
            e.set(t[n].toLowerCase(), n);
        return e
    }
    function Fe(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 1));
        return i ? (t.w = +i[0], n + i[0].length) : -1
    }
    function Ze(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n));
        return i ? (t.U = +i[0], n + i[0].length) : -1
    }
    function je(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n));
        return i ? (t.W = +i[0], n + i[0].length) : -1
    }
    function Ve(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 4));
        return i ? (t.y = +i[0], n + i[0].length) : -1
    }
    function qe(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.y = Ge(+i[0]), n + i[0].length) : -1
    }
    function He(t, e, n) {
        return /^[+-]\d{4}$/.test(e = e.substring(n, n + 5)) ? (t.Z = +e, n + 5) : -1
    }
    function Ge(t) {
        return t + (t > 68 ? 1900 : 2e3)
    }
    function We(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.m = i[0] - 1, n + i[0].length) : -1
    }
    function Ye(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.d = +i[0], n + i[0].length) : -1
    }
    function Je(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 3));
        return i ? (t.j = +i[0], n + i[0].length) : -1
    }
    function Xe(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.H = +i[0], n + i[0].length) : -1
    }
    function Ke(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.M = +i[0], n + i[0].length) : -1
    }
    function Qe(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 2));
        return i ? (t.S = +i[0], n + i[0].length) : -1
    }
    function $e(t, e, n) {
        au.lastIndex = 0;
        var i = au.exec(e.substring(n, n + 3));
        return i ? (t.L = +i[0], n + i[0].length) : -1
    }
    function tn(t) {
        var e = t.getTimezoneOffset(), n = e > 0 ? "-" : "+", i = ~~(ss(e) / 60), r = ss(e) % 60;
        return n + Ne(i, "0", 2) + Ne(r, "0", 2)
    }
    function en(t, e, n) {
        su.lastIndex = 0;
        var i = su.exec(e.substring(n, n + 1));
        return i ? n + i[0].length : -1
    }
    function nn(t) {
        for (var e = t.length, n = -1; ++n < e; )
            t[n][0] = this(t[n][0]);
        return function(e) {
            for (var n = 0, i = t[n]; !i[1](e); )
                i = t[++n];
            return i[0](e)
        }
    }
    function rn() {
    }
    function on(t, e, n) {
        var i = n.s = t + e, r = i - t, o = i - r;
        n.t = t - o + (e - r)
    }
    function an(t, e) {
        t && cu.hasOwnProperty(t.type) && cu[t.type](t, e)
    }
    function sn(t, e, n) {
        var i, r = -1, o = t.length - n;
        for (e.lineStart(); ++r < o; )
            i = t[r], e.point(i[0], i[1], i[2]);
        e.lineEnd()
    }
    function un(t, e) {
        var n = -1, i = t.length;
        for (e.polygonStart(); ++n < i; )
            sn(t[n], e, 1);
        e.polygonEnd()
    }
    function ln() {
        function t(t, e) {
            t *= Es, e = e * Es / 2 + ks / 4;
            var n = t - i, a = Math.cos(e), s = Math.sin(e), u = o * s, l = r * a + u * Math.cos(n), h = u * Math.sin(n);
            pu.add(Math.atan2(h, l)), i = t, r = a, o = s
        }
        var e, n, i, r, o;
        du.point = function(a, s) {
            du.point = t, i = (e = a) * Es, r = Math.cos(s = (n = s) * Es / 2 + ks / 4), o = Math.sin(s)
        }, du.lineEnd = function() {
            t(e, n)
        }
    }
    function hn(t) {
        var e = t[0], n = t[1], i = Math.cos(n);
        return [i * Math.cos(e), i * Math.sin(e), Math.sin(n)]
    }
    function cn(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }
    function fn(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    }
    function pn(t, e) {
        t[0] += e[0], t[1] += e[1], t[2] += e[2]
    }
    function dn(t, e) {
        return [t[0] * e, t[1] * e, t[2] * e]
    }
    function mn(t) {
        var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= e, t[1] /= e, t[2] /= e
    }
    function gn(t) {
        return [Math.atan2(t[1], t[0]), G(t[2])]
    }
    function vn(t, e) {
        return ss(t[0] - e[0]) < As && ss(t[1] - e[1]) < As
    }
    function _n(t, e) {
        t *= Es;
        var n = Math.cos(e *= Es);
        yn(n * Math.cos(t), n * Math.sin(t), Math.sin(e))
    }
    function yn(t, e, n) {
        ++mu, vu += (t - vu) / mu, _u += (e - _u) / mu, yu += (n - yu) / mu
    }
    function bn() {
        function t(t, r) {
            t *= Es;
            var o = Math.cos(r *= Es), a = o * Math.cos(t), s = o * Math.sin(t), u = Math.sin(r), l = Math.atan2(Math.sqrt((l = n * u - i * s) * l + (l = i * a - e * u) * l + (l = e * s - n * a) * l), e * a + n * s + i * u);
            gu += l, bu += l * (e + (e = a)), wu += l * (n + (n = s)), xu += l * (i + (i = u)), yn(e, n, i)
        }
        var e, n, i;
        Cu.point = function(r, o) {
            r *= Es;
            var a = Math.cos(o *= Es);
            e = a * Math.cos(r), n = a * Math.sin(r), i = Math.sin(o), Cu.point = t, yn(e, n, i)
        }
    }
    function wn() {
        Cu.point = _n
    }
    function xn() {
        function t(t, e) {
            t *= Es;
            var n = Math.cos(e *= Es), a = n * Math.cos(t), s = n * Math.sin(t), u = Math.sin(e), l = r * u - o * s, h = o * a - i * u, c = i * s - r * a, f = Math.sqrt(l * l + h * h + c * c), p = i * a + r * s + o * u, d = f && -H(p) / f, m = Math.atan2(f, p);
            Lu += d * l, Mu += d * h, ku += d * c, gu += m, bu += m * (i + (i = a)), wu += m * (r + (r = s)), xu += m * (o + (o = u)), yn(i, r, o)
        }
        var e, n, i, r, o;
        Cu.point = function(a, s) {
            e = a, n = s, Cu.point = t, a *= Es;
            var u = Math.cos(s *= Es);
            i = u * Math.cos(a), r = u * Math.sin(a), o = Math.sin(s), yn(i, r, o)
        }, Cu.lineEnd = function() {
            t(e, n), Cu.lineEnd = wn, Cu.point = _n
        }
    }
    function Ln() {
        return !0
    }
    function Mn(t, e, n, i, r) {
        var o = [], a = [];
        if (t.forEach(function(t) {
            if (!((e = t.length - 1) <= 0)) {
                var e, n = t[0], i = t[e];
                if (vn(n, i)) {
                    r.lineStart();
                    for (var s = 0; e > s; ++s)
                        r.point((n = t[s])[0], n[1]);
                    return r.lineEnd(), void 0
                }
                var u = new Cn(n, t, null, !0), l = new Cn(n, null, u, !1);
                u.o = l, o.push(u), a.push(l), u = new Cn(i, t, null, !1), l = new Cn(i, null, u, !0), u.o = l, o.push(u), a.push(l)
            }
        }), a.sort(e), kn(o), kn(a), o.length) {
            for (var s = 0, u = n, l = a.length; l > s; ++s)
                a[s].e = u = !u;
            for (var h, c, f = o[0]; ; ) {
                for (var p = f, d = !0; p.v; )
                    if ((p = p.n) === f)
                        return;
                h = p.z, r.lineStart();
                do {
                    if (p.v = p.o.v = !0, p.e) {
                        if (d)
                            for (var s = 0, l = h.length; l > s; ++s)
                                r.point((c = h[s])[0], c[1]);
                        else
                            i(p.x, p.n.x, 1, r);
                        p = p.n
                    } else {
                        if (d) {
                            h = p.p.z;
                            for (var s = h.length - 1; s >= 0; --s)
                                r.point((c = h[s])[0], c[1])
                        } else
                            i(p.x, p.p.x, -1, r);
                        p = p.p
                    }
                    p = p.o, h = p.z, d = !d
                } while (!p.v);
                r.lineEnd()
            }
        }
    }
    function kn(t) {
        if (e = t.length) {
            for (var e, n, i = 0, r = t[0]; ++i < e; )
                r.n = n = t[i], n.p = r, r = n;
            r.n = n = t[0], n.p = r
        }
    }
    function Cn(t, e, n, i) {
        this.x = t, this.z = e, this.o = n, this.e = i, this.v = !1, this.n = this.p = null
    }
    function Pn(t, e, n, i) {
        return function(r, o) {
            function a(e, n) {
                var i = r(e, n);
                t(e = i[0], n = i[1]) && o.point(e, n)
            }
            function s(t, e) {
                var n = r(t, e);
                g.point(n[0], n[1])
            }
            function u() {
                _.point = s, g.lineStart()
            }
            function l() {
                _.point = a, g.lineEnd()
            }
            function h(t, e) {
                m.push([t, e]);
                var n = r(t, e);
                b.point(n[0], n[1])
            }
            function c() {
                b.lineStart(), m = []
            }
            function f() {
                h(m[0][0], m[0][1]), b.lineEnd();
                var t, e = b.clean(), n = y.buffer(), i = n.length;
                if (m.pop(), d.push(m), m = null, i) {
                    if (1 & e) {
                        t = n[0];
                        var r, i = t.length - 1, a = -1;
                        for (o.lineStart(); ++a < i; )
                            o.point((r = t[a])[0], r[1]);
                        return o.lineEnd(), void 0
                    }
                    i > 1 && 2 & e && n.push(n.pop().concat(n.shift())), p.push(n.filter(An))
                }
            }
            var p, d, m, g = e(o), v = r.invert(i[0], i[1]), _ = {point: a,lineStart: u,lineEnd: l,polygonStart: function() {
                    _.point = h, _.lineStart = c, _.lineEnd = f, p = [], d = [], o.polygonStart()
                },polygonEnd: function() {
                    _.point = a, _.lineStart = u, _.lineEnd = l, p = Wa.merge(p);
                    var t = Tn(v, d);
                    p.length ? Mn(p, En, t, n, o) : t && (o.lineStart(), n(null, null, 1, o), o.lineEnd()), o.polygonEnd(), p = d = null
                },sphere: function() {
                    o.polygonStart(), o.lineStart(), n(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                }}, y = Sn(), b = e(y);
            return _
        }
    }
    function An(t) {
        return t.length > 1
    }
    function Sn() {
        var t, e = [];
        return {lineStart: function() {
                e.push(t = [])
            },point: function(e, n) {
                t.push([e, n])
            },lineEnd: p,buffer: function() {
                var n = e;
                return e = [], t = null, n
            },rejoin: function() {
                e.length > 1 && e.push(e.pop().concat(e.shift()))
            }}
    }
    function En(t, e) {
        return ((t = t.x)[0] < 0 ? t[1] - Ps - As : Ps - t[1]) - ((e = e.x)[0] < 0 ? e[1] - Ps - As : Ps - e[1])
    }
    function Tn(t, e) {
        var n = t[0], i = t[1], r = [Math.sin(n), -Math.cos(n), 0], o = 0, a = 0;
        pu.reset();
        for (var s = 0, u = e.length; u > s; ++s) {
            var l = e[s], h = l.length;
            if (h)
                for (var c = l[0], f = c[0], p = c[1] / 2 + ks / 4, d = Math.sin(p), m = Math.cos(p), g = 1; ; ) {
                    g === h && (g = 0), t = l[g];
                    var v = t[0], _ = t[1] / 2 + ks / 4, y = Math.sin(_), b = Math.cos(_), w = v - f, x = ss(w) > ks, L = d * y;
                    if (pu.add(Math.atan2(L * Math.sin(w), m * b + L * Math.cos(w))), o += x ? w + (w >= 0 ? Cs : -Cs) : w, x ^ f >= n ^ v >= n) {
                        var M = fn(hn(c), hn(t));
                        mn(M);
                        var k = fn(r, M);
                        mn(k);
                        var C = (x ^ w >= 0 ? -1 : 1) * G(k[2]);
                        (i > C || i === C && (M[0] || M[1])) && (a += x ^ w >= 0 ? 1 : -1)
                    }
                    if (!g++)
                        break;
                    f = v, d = y, m = b, c = t
                }
        }
        return (-As > o || As > o && 0 > pu) ^ 1 & a
    }
    function Dn(t) {
        var e, n = 0 / 0, i = 0 / 0, r = 0 / 0;
        return {lineStart: function() {
                t.lineStart(), e = 1
            },point: function(o, a) {
                var s = o > 0 ? ks : -ks, u = ss(o - n);
                ss(u - ks) < As ? (t.point(n, i = (i + a) / 2 > 0 ? Ps : -Ps), t.point(r, i), t.lineEnd(), t.lineStart(), t.point(s, i), t.point(o, i), e = 0) : r !== s && u >= ks && (ss(n - r) < As && (n -= r * As), ss(o - s) < As && (o -= s * As), i = In(n, i, o, a), t.point(r, i), t.lineEnd(), t.lineStart(), t.point(s, i), e = 0), t.point(n = o, i = a), r = s
            },lineEnd: function() {
                t.lineEnd(), n = i = 0 / 0
            },clean: function() {
                return 2 - e
            }}
    }
    function In(t, e, n, i) {
        var r, o, a = Math.sin(t - n);
        return ss(a) > As ? Math.atan((Math.sin(e) * (o = Math.cos(i)) * Math.sin(n) - Math.sin(i) * (r = Math.cos(e)) * Math.sin(t)) / (r * o * a)) : (e + i) / 2
    }
    function zn(t, e, n, i) {
        var r;
        if (null == t)
            r = n * Ps, i.point(-ks, r), i.point(0, r), i.point(ks, r), i.point(ks, 0), i.point(ks, -r), i.point(0, -r), i.point(-ks, -r), i.point(-ks, 0), i.point(-ks, r);
        else if (ss(t[0] - e[0]) > As) {
            var o = t[0] < e[0] ? ks : -ks;
            r = n * o / 2, i.point(-o, r), i.point(0, r), i.point(o, r)
        } else
            i.point(e[0], e[1])
    }
    function On(t) {
        function e(t, e) {
            return Math.cos(t) * Math.cos(e) > o
        }
        function n(t) {
            var n, o, u, l, h;
            return {lineStart: function() {
                    l = u = !1, h = 1
                },point: function(c, f) {
                    var p, d = [c, f], m = e(c, f), g = a ? m ? 0 : r(c, f) : m ? r(c + (0 > c ? ks : -ks), f) : 0;
                    if (!n && (l = u = m) && t.lineStart(), m !== u && (p = i(n, d), (vn(n, p) || vn(d, p)) && (d[0] += As, d[1] += As, m = e(d[0], d[1]))), m !== u)
                        h = 0, m ? (t.lineStart(), p = i(d, n), t.point(p[0], p[1])) : (p = i(n, d), t.point(p[0], p[1]), t.lineEnd()), n = p;
                    else if (s && n && a ^ m) {
                        var v;
                        g & o || !(v = i(d, n, !0)) || (h = 0, a ? (t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()) : (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1])))
                    }
                    !m || n && vn(n, d) || t.point(d[0], d[1]), n = d, u = m, o = g
                },lineEnd: function() {
                    u && t.lineEnd(), n = null
                },clean: function() {
                    return h | (l && u) << 1
                }}
        }
        function i(t, e, n) {
            var i = hn(t), r = hn(e), a = [1, 0, 0], s = fn(i, r), u = cn(s, s), l = s[0], h = u - l * l;
            if (!h)
                return !n && t;
            var c = o * u / h, f = -o * l / h, p = fn(a, s), d = dn(a, c), m = dn(s, f);
            pn(d, m);
            var g = p, v = cn(d, g), _ = cn(g, g), y = v * v - _ * (cn(d, d) - 1);
            if (!(0 > y)) {
                var b = Math.sqrt(y), w = dn(g, (-v - b) / _);
                if (pn(w, d), w = gn(w), !n)
                    return w;
                var x, L = t[0], M = e[0], k = t[1], C = e[1];
                L > M && (x = L, L = M, M = x);
                var P = M - L, A = ss(P - ks) < As, S = A || As > P;
                if (!A && k > C && (x = k, k = C, C = x), S ? A ? k + C > 0 ^ w[1] < (ss(w[0] - L) < As ? k : C) : k <= w[1] && w[1] <= C : P > ks ^ (L <= w[0] && w[0] <= M)) {
                    var E = dn(g, (-v + b) / _);
                    return pn(E, d), [w, gn(E)]
                }
            }
        }
        function r(e, n) {
            var i = a ? t : ks - t, r = 0;
            return -i > e ? r |= 1 : e > i && (r |= 2), -i > n ? r |= 4 : n > i && (r |= 8), r
        }
        var o = Math.cos(t), a = o > 0, s = ss(o) > As, u = li(t, 6 * Es);
        return Pn(e, n, u, a ? [0, -t] : [-ks, t - ks])
    }
    function Bn(t, e, n, i) {
        return function(r) {
            var o, a = r.a, s = r.b, u = a.x, l = a.y, h = s.x, c = s.y, f = 0, p = 1, d = h - u, m = c - l;
            if (o = t - u, d || !(o > 0)) {
                if (o /= d, 0 > d) {
                    if (f > o)
                        return;
                    p > o && (p = o)
                } else if (d > 0) {
                    if (o > p)
                        return;
                    o > f && (f = o)
                }
                if (o = n - u, d || !(0 > o)) {
                    if (o /= d, 0 > d) {
                        if (o > p)
                            return;
                        o > f && (f = o)
                    } else if (d > 0) {
                        if (f > o)
                            return;
                        p > o && (p = o)
                    }
                    if (o = e - l, m || !(o > 0)) {
                        if (o /= m, 0 > m) {
                            if (f > o)
                                return;
                            p > o && (p = o)
                        } else if (m > 0) {
                            if (o > p)
                                return;
                            o > f && (f = o)
                        }
                        if (o = i - l, m || !(0 > o)) {
                            if (o /= m, 0 > m) {
                                if (o > p)
                                    return;
                                o > f && (f = o)
                            } else if (m > 0) {
                                if (f > o)
                                    return;
                                p > o && (p = o)
                            }
                            return f > 0 && (r.a = {x: u + f * d,y: l + f * m}), 1 > p && (r.b = {x: u + p * d,y: l + p * m}), r
                        }
                    }
                }
            }
        }
    }
    function Nn(t, e, n, i) {
        function r(i, r) {
            return ss(i[0] - t) < As ? r > 0 ? 0 : 3 : ss(i[0] - n) < As ? r > 0 ? 2 : 1 : ss(i[1] - e) < As ? r > 0 ? 1 : 0 : r > 0 ? 3 : 2
        }
        function o(t, e) {
            return a(t.x, e.x)
        }
        function a(t, e) {
            var n = r(t, 1), i = r(e, 1);
            return n !== i ? n - i : 0 === n ? e[1] - t[1] : 1 === n ? t[0] - e[0] : 2 === n ? t[1] - e[1] : e[0] - t[0]
        }
        return function(s) {
            function u(t) {
                for (var e = 0, n = g.length, i = t[1], r = 0; n > r; ++r)
                    for (var o, a = 1, s = g[r], u = s.length, l = s[0]; u > a; ++a)
                        o = s[a], l[1] <= i ? o[1] > i && q(l, o, t) > 0 && ++e : o[1] <= i && q(l, o, t) < 0 && --e, l = o;
                return 0 !== e
            }
            function l(o, s, u, l) {
                var h = 0, c = 0;
                if (null == o || (h = r(o, u)) !== (c = r(s, u)) || a(o, s) < 0 ^ u > 0) {
                    do
                        l.point(0 === h || 3 === h ? t : n, h > 1 ? i : e);
                    while ((h = (h + u + 4) % 4) !== c)
                } else
                    l.point(s[0], s[1])
            }
            function h(r, o) {
                return r >= t && n >= r && o >= e && i >= o
            }
            function c(t, e) {
                h(t, e) && s.point(t, e)
            }
            function f() {
                S.point = d, g && g.push(v = []), M = !0, L = !1, w = x = 0 / 0
            }
            function p() {
                m && (d(_, y), b && L && P.rejoin(), m.push(P.buffer())), S.point = c, L && s.lineEnd()
            }
            function d(t, e) {
                t = Math.max(-Au, Math.min(Au, t)), e = Math.max(-Au, Math.min(Au, e));
                var n = h(t, e);
                if (g && v.push([t, e]), M)
                    _ = t, y = e, b = n, M = !1, n && (s.lineStart(), s.point(t, e));
                else if (n && L)
                    s.point(t, e);
                else {
                    var i = {a: {x: w,y: x},b: {x: t,y: e}};
                    A(i) ? (L || (s.lineStart(), s.point(i.a.x, i.a.y)), s.point(i.b.x, i.b.y), n || s.lineEnd(), k = !1) : n && (s.lineStart(), s.point(t, e), k = !1)
                }
                w = t, x = e, L = n
            }
            var m, g, v, _, y, b, w, x, L, M, k, C = s, P = Sn(), A = Bn(t, e, n, i), S = {point: c,lineStart: f,lineEnd: p,polygonStart: function() {
                    s = P, m = [], g = [], k = !0
                },polygonEnd: function() {
                    s = C, m = Wa.merge(m);
                    var e = u([t, i]), n = k && e, r = m.length;
                    (n || r) && (s.polygonStart(), n && (s.lineStart(), l(null, null, 1, s), s.lineEnd()), r && Mn(m, o, e, l, s), s.polygonEnd()), m = g = v = null
                }};
            return S
        }
    }
    function Un(t, e) {
        function n(n, i) {
            return n = t(n, i), e(n[0], n[1])
        }
        return t.invert && e.invert && (n.invert = function(n, i) {
            return n = e.invert(n, i), n && t.invert(n[0], n[1])
        }), n
    }
    function Rn(t) {
        var e = 0, n = ks / 3, i = ei(t), r = i(e, n);
        return r.parallels = function(t) {
            return arguments.length ? i(e = t[0] * ks / 180, n = t[1] * ks / 180) : [180 * (e / ks), 180 * (n / ks)]
        }, r
    }
    function Fn(t, e) {
        function n(t, e) {
            var n = Math.sqrt(o - 2 * r * Math.sin(e)) / r;
            return [n * Math.sin(t *= r), a - n * Math.cos(t)]
        }
        var i = Math.sin(t), r = (i + Math.sin(e)) / 2, o = 1 + i * (2 * r - i), a = Math.sqrt(o) / r;
        return n.invert = function(t, e) {
            var n = a - e;
            return [Math.atan2(t, n) / r, G((o - (t * t + n * n) * r * r) / (2 * r))]
        }, n
    }
    function Zn() {
        function t(t, e) {
            Eu += r * t - i * e, i = t, r = e
        }
        var e, n, i, r;
        Ou.point = function(o, a) {
            Ou.point = t, e = i = o, n = r = a
        }, Ou.lineEnd = function() {
            t(e, n)
        }
    }
    function jn(t, e) {
        Tu > t && (Tu = t), t > Iu && (Iu = t), Du > e && (Du = e), e > zu && (zu = e)
    }
    function Vn() {
        function t(t, e) {
            a.push("M", t, ",", e, o)
        }
        function e(t, e) {
            a.push("M", t, ",", e), s.point = n
        }
        function n(t, e) {
            a.push("L", t, ",", e)
        }
        function i() {
            s.point = t
        }
        function r() {
            a.push("Z")
        }
        var o = qn(4.5), a = [], s = {point: t,lineStart: function() {
                s.point = e
            },lineEnd: i,polygonStart: function() {
                s.lineEnd = r
            },polygonEnd: function() {
                s.lineEnd = i, s.point = t
            },pointRadius: function(t) {
                return o = qn(t), s
            },result: function() {
                if (a.length) {
                    var t = a.join("");
                    return a = [], t
                }
            }};
        return s
    }
    function qn(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }
    function Hn(t, e) {
        vu += t, _u += e, ++yu
    }
    function Gn() {
        function t(t, i) {
            var r = t - e, o = i - n, a = Math.sqrt(r * r + o * o);
            bu += a * (e + t) / 2, wu += a * (n + i) / 2, xu += a, Hn(e = t, n = i)
        }
        var e, n;
        Nu.point = function(i, r) {
            Nu.point = t, Hn(e = i, n = r)
        }
    }
    function Wn() {
        Nu.point = Hn
    }
    function Yn() {
        function t(t, e) {
            var n = t - i, o = e - r, a = Math.sqrt(n * n + o * o);
            bu += a * (i + t) / 2, wu += a * (r + e) / 2, xu += a, a = r * t - i * e, Lu += a * (i + t), Mu += a * (r + e), ku += 3 * a, Hn(i = t, r = e)
        }
        var e, n, i, r;
        Nu.point = function(o, a) {
            Nu.point = t, Hn(e = i = o, n = r = a)
        }, Nu.lineEnd = function() {
            t(e, n)
        }
    }
    function Jn(t) {
        function e(e, n) {
            t.moveTo(e, n), t.arc(e, n, a, 0, Cs)
        }
        function n(e, n) {
            t.moveTo(e, n), s.point = i
        }
        function i(e, n) {
            t.lineTo(e, n)
        }
        function r() {
            s.point = e
        }
        function o() {
            t.closePath()
        }
        var a = 4.5, s = {point: e,lineStart: function() {
                s.point = n
            },lineEnd: r,polygonStart: function() {
                s.lineEnd = o
            },polygonEnd: function() {
                s.lineEnd = r, s.point = e
            },pointRadius: function(t) {
                return a = t, s
            },result: p};
        return s
    }
    function Xn(t) {
        function e(t) {
            return (s ? i : n)(t)
        }
        function n(e) {
            return $n(e, function(n, i) {
                n = t(n, i), e.point(n[0], n[1])
            })
        }
        function i(e) {
            function n(n, i) {
                n = t(n, i), e.point(n[0], n[1])
            }
            function i() {
                y = 0 / 0, M.point = o, e.lineStart()
            }
            function o(n, i) {
                var o = hn([n, i]), a = t(n, i);
                r(y, b, _, w, x, L, y = a[0], b = a[1], _ = n, w = o[0], x = o[1], L = o[2], s, e), e.point(y, b)
            }
            function a() {
                M.point = n, e.lineEnd()
            }
            function u() {
                i(), M.point = l, M.lineEnd = h
            }
            function l(t, e) {
                o(c = t, f = e), p = y, d = b, m = w, g = x, v = L, M.point = o
            }
            function h() {
                r(y, b, _, w, x, L, p, d, c, m, g, v, s, e), M.lineEnd = a, a()
            }
            var c, f, p, d, m, g, v, _, y, b, w, x, L, M = {point: n,lineStart: i,lineEnd: a,polygonStart: function() {
                    e.polygonStart(), M.lineStart = u
                },polygonEnd: function() {
                    e.polygonEnd(), M.lineStart = i
                }};
            return M
        }
        function r(e, n, i, s, u, l, h, c, f, p, d, m, g, v) {
            var _ = h - e, y = c - n, b = _ * _ + y * y;
            if (b > 4 * o && g--) {
                var w = s + p, x = u + d, L = l + m, M = Math.sqrt(w * w + x * x + L * L), k = Math.asin(L /= M), C = ss(ss(L) - 1) < As || ss(i - f) < As ? (i + f) / 2 : Math.atan2(x, w), P = t(C, k), A = P[0], S = P[1], E = A - e, T = S - n, D = y * E - _ * T;
                (D * D / b > o || ss((_ * E + y * T) / b - .5) > .3 || a > s * p + u * d + l * m) && (r(e, n, i, s, u, l, A, S, C, w /= M, x /= M, L, g, v), v.point(A, S), r(A, S, C, w, x, L, h, c, f, p, d, m, g, v))
            }
        }
        var o = .5, a = Math.cos(30 * Es), s = 16;
        return e.precision = function(t) {
            return arguments.length ? (s = (o = t * t) > 0 && 16, e) : Math.sqrt(o)
        }, e
    }
    function Kn(t) {
        var e = Xn(function(e, n) {
            return t([e * Ts, n * Ts])
        });
        return function(t) {
            return ni(e(t))
        }
    }
    function Qn(t) {
        this.stream = t
    }
    function $n(t, e) {
        return {point: e,sphere: function() {
                t.sphere()
            },lineStart: function() {
                t.lineStart()
            },lineEnd: function() {
                t.lineEnd()
            },polygonStart: function() {
                t.polygonStart()
            },polygonEnd: function() {
                t.polygonEnd()
            }}
    }
    function ti(t) {
        return ei(function() {
            return t
        })()
    }
    function ei(t) {
        function e(t) {
            return t = s(t[0] * Es, t[1] * Es), [t[0] * f + u, l - t[1] * f]
        }
        function n(t) {
            return t = s.invert((t[0] - u) / f, (l - t[1]) / f), t && [t[0] * Ts, t[1] * Ts]
        }
        function i() {
            s = Un(a = oi(v, _, y), o);
            var t = o(m, g);
            return u = p - t[0] * f, l = d + t[1] * f, r()
        }
        function r() {
            return h && (h.valid = !1, h = null), e
        }
        var o, a, s, u, l, h, c = Xn(function(t, e) {
            return t = o(t, e), [t[0] * f + u, l - t[1] * f]
        }), f = 150, p = 480, d = 250, m = 0, g = 0, v = 0, _ = 0, y = 0, b = Pu, w = xe, x = null, L = null;
        return e.stream = function(t) {
            return h && (h.valid = !1), h = ni(b(a, c(w(t)))), h.valid = !0, h
        }, e.clipAngle = function(t) {
            return arguments.length ? (b = null == t ? (x = t, Pu) : On((x = +t) * Es), r()) : x
        }, e.clipExtent = function(t) {
            return arguments.length ? (L = t, w = t ? Nn(t[0][0], t[0][1], t[1][0], t[1][1]) : xe, r()) : L
        }, e.scale = function(t) {
            return arguments.length ? (f = +t, i()) : f
        }, e.translate = function(t) {
            return arguments.length ? (p = +t[0], d = +t[1], i()) : [p, d]
        }, e.center = function(t) {
            return arguments.length ? (m = t[0] % 360 * Es, g = t[1] % 360 * Es, i()) : [m * Ts, g * Ts]
        }, e.rotate = function(t) {
            return arguments.length ? (v = t[0] % 360 * Es, _ = t[1] % 360 * Es, y = t.length > 2 ? t[2] % 360 * Es : 0, i()) : [v * Ts, _ * Ts, y * Ts]
        }, Wa.rebind(e, c, "precision"), function() {
            return o = t.apply(this, arguments), e.invert = o.invert && n, i()
        }
    }
    function ni(t) {
        return $n(t, function(e, n) {
            t.point(e * Es, n * Es)
        })
    }
    function ii(t, e) {
        return [t, e]
    }
    function ri(t, e) {
        return [t > ks ? t - Cs : -ks > t ? t + Cs : t, e]
    }
    function oi(t, e, n) {
        return t ? e || n ? Un(si(t), ui(e, n)) : si(t) : e || n ? ui(e, n) : ri
    }
    function ai(t) {
        return function(e, n) {
            return e += t, [e > ks ? e - Cs : -ks > e ? e + Cs : e, n]
        }
    }
    function si(t) {
        var e = ai(t);
        return e.invert = ai(-t), e
    }
    function ui(t, e) {
        function n(t, e) {
            var n = Math.cos(e), s = Math.cos(t) * n, u = Math.sin(t) * n, l = Math.sin(e), h = l * i + s * r;
            return [Math.atan2(u * o - h * a, s * i - l * r), G(h * o + u * a)]
        }
        var i = Math.cos(t), r = Math.sin(t), o = Math.cos(e), a = Math.sin(e);
        return n.invert = function(t, e) {
            var n = Math.cos(e), s = Math.cos(t) * n, u = Math.sin(t) * n, l = Math.sin(e), h = l * o - u * a;
            return [Math.atan2(u * o + l * a, s * i + h * r), G(h * i - s * r)]
        }, n
    }
    function li(t, e) {
        var n = Math.cos(t), i = Math.sin(t);
        return function(r, o, a, s) {
            var u = a * e;
            null != r ? (r = hi(n, r), o = hi(n, o), (a > 0 ? o > r : r > o) && (r += a * Cs)) : (r = t + a * Cs, o = t - .5 * u);
            for (var l, h = r; a > 0 ? h > o : o > h; h -= u)
                s.point((l = gn([n, -i * Math.cos(h), -i * Math.sin(h)]))[0], l[1])
        }
    }
    function hi(t, e) {
        var n = hn(e);
        n[0] -= t, mn(n);
        var i = H(-n[1]);
        return ((-n[2] < 0 ? -i : i) + 2 * Math.PI - As) % (2 * Math.PI)
    }
    function ci(t, e, n) {
        var i = Wa.range(t, e - As, n).concat(e);
        return function(t) {
            return i.map(function(e) {
                return [t, e]
            })
        }
    }
    function fi(t, e, n) {
        var i = Wa.range(t, e - As, n).concat(e);
        return function(t) {
            return i.map(function(e) {
                return [e, t]
            })
        }
    }
    function pi(t) {
        return t.source
    }
    function di(t) {
        return t.target
    }
    function mi(t, e, n, i) {
        var r = Math.cos(e), o = Math.sin(e), a = Math.cos(i), s = Math.sin(i), u = r * Math.cos(t), l = r * Math.sin(t), h = a * Math.cos(n), c = a * Math.sin(n), f = 2 * Math.asin(Math.sqrt(X(i - e) + r * a * X(n - t))), p = 1 / Math.sin(f), d = f ? function(t) {
            var e = Math.sin(t *= f) * p, n = Math.sin(f - t) * p, i = n * u + e * h, r = n * l + e * c, a = n * o + e * s;
            return [Math.atan2(r, i) * Ts, Math.atan2(a, Math.sqrt(i * i + r * r)) * Ts]
        } : function() {
            return [t * Ts, e * Ts]
        };
        return d.distance = f, d
    }
    function gi() {
        function t(t, r) {
            var o = Math.sin(r *= Es), a = Math.cos(r), s = ss((t *= Es) - e), u = Math.cos(s);
            Uu += Math.atan2(Math.sqrt((s = a * Math.sin(s)) * s + (s = i * o - n * a * u) * s), n * o + i * a * u), e = t, n = o, i = a
        }
        var e, n, i;
        Ru.point = function(r, o) {
            e = r * Es, n = Math.sin(o *= Es), i = Math.cos(o), Ru.point = t
        }, Ru.lineEnd = function() {
            Ru.point = Ru.lineEnd = p
        }
    }
    function vi(t, e) {
        function n(e, n) {
            var i = Math.cos(e), r = Math.cos(n), o = t(i * r);
            return [o * r * Math.sin(e), o * Math.sin(n)]
        }
        return n.invert = function(t, n) {
            var i = Math.sqrt(t * t + n * n), r = e(i), o = Math.sin(r), a = Math.cos(r);
            return [Math.atan2(t * o, i * a), Math.asin(i && n * o / i)]
        }, n
    }
    function _i(t, e) {
        function n(t, e) {
            var n = ss(ss(e) - Ps) < As ? 0 : a / Math.pow(r(e), o);
            return [n * Math.sin(o * t), a - n * Math.cos(o * t)]
        }
        var i = Math.cos(t), r = function(t) {
            return Math.tan(ks / 4 + t / 2)
        }, o = t === e ? Math.sin(t) : Math.log(i / Math.cos(e)) / Math.log(r(e) / r(t)), a = i * Math.pow(r(t), o) / o;
        return o ? (n.invert = function(t, e) {
            var n = a - e, i = V(o) * Math.sqrt(t * t + n * n);
            return [Math.atan2(t, n) / o, 2 * Math.atan(Math.pow(a / i, 1 / o)) - Ps]
        }, n) : bi
    }
    function yi(t, e) {
        function n(t, e) {
            var n = o - e;
            return [n * Math.sin(r * t), o - n * Math.cos(r * t)]
        }
        var i = Math.cos(t), r = t === e ? Math.sin(t) : (i - Math.cos(e)) / (e - t), o = i / r + t;
        return ss(r) < As ? ii : (n.invert = function(t, e) {
            var n = o - e;
            return [Math.atan2(t, n) / r, o - V(r) * Math.sqrt(t * t + n * n)]
        }, n)
    }
    function bi(t, e) {
        return [t, Math.log(Math.tan(ks / 4 + e / 2))]
    }
    function wi(t) {
        var e, n = ti(t), i = n.scale, r = n.translate, o = n.clipExtent;
        return n.scale = function() {
            var t = i.apply(n, arguments);
            return t === n ? e ? n.clipExtent(null) : n : t
        }, n.translate = function() {
            var t = r.apply(n, arguments);
            return t === n ? e ? n.clipExtent(null) : n : t
        }, n.clipExtent = function(t) {
            var a = o.apply(n, arguments);
            if (a === n) {
                if (e = null == t) {
                    var s = ks * i(), u = r();
                    o([[u[0] - s, u[1] - s], [u[0] + s, u[1] + s]])
                }
            } else
                e && (a = null);
            return a
        }, n.clipExtent(null)
    }
    function xi(t, e) {
        return [Math.log(Math.tan(ks / 4 + e / 2)), -t]
    }
    function Li(t) {
        return t[0]
    }
    function Mi(t) {
        return t[1]
    }
    function ki(t) {
        for (var e = t.length, n = [0, 1], i = 2, r = 2; e > r; r++) {
            for (; i > 1 && q(t[n[i - 2]], t[n[i - 1]], t[r]) <= 0; )
                --i;
            n[i++] = r
        }
        return n.slice(0, i)
    }
    function Ci(t, e) {
        return t[0] - e[0] || t[1] - e[1]
    }
    function Pi(t, e, n) {
        return (n[0] - e[0]) * (t[1] - e[1]) < (n[1] - e[1]) * (t[0] - e[0])
    }
    function Ai(t, e, n, i) {
        var r = t[0], o = n[0], a = e[0] - r, s = i[0] - o, u = t[1], l = n[1], h = e[1] - u, c = i[1] - l, f = (s * (u - l) - c * (r - o)) / (c * a - s * h);
        return [r + f * a, u + f * h]
    }
    function Si(t) {
        var e = t[0], n = t[t.length - 1];
        return !(e[0] - n[0] || e[1] - n[1])
    }
    function Ei() {
        Ki(this), this.edge = this.site = this.circle = null
    }
    function Ti(t) {
        var e = Ku.pop() || new Ei;
        return e.site = t, e
    }
    function Di(t) {
        ji(t), Yu.remove(t), Ku.push(t), Ki(t)
    }
    function Ii(t) {
        var e = t.circle, n = e.x, i = e.cy, r = {x: n,y: i}, o = t.P, a = t.N, s = [t];
        Di(t);
        for (var u = o; u.circle && ss(n - u.circle.x) < As && ss(i - u.circle.cy) < As; )
            o = u.P, s.unshift(u), Di(u), u = o;
        s.unshift(u), ji(u);
        for (var l = a; l.circle && ss(n - l.circle.x) < As && ss(i - l.circle.cy) < As; )
            a = l.N, s.push(l), Di(l), l = a;
        s.push(l), ji(l);
        var h, c = s.length;
        for (h = 1; c > h; ++h)
            l = s[h], u = s[h - 1], Yi(l.edge, u.site, l.site, r);
        u = s[0], l = s[c - 1], l.edge = Gi(u.site, l.site, null, r), Zi(u), Zi(l)
    }
    function zi(t) {
        for (var e, n, i, r, o = t.x, a = t.y, s = Yu._; s; )
            if (i = Oi(s, a) - o, i > As)
                s = s.L;
            else {
                if (r = o - Bi(s, a), !(r > As)) {
                    i > -As ? (e = s.P, n = s) : r > -As ? (e = s, n = s.N) : e = n = s;
                    break
                }
                if (!s.R) {
                    e = s;
                    break
                }
                s = s.R
            }
        var u = Ti(t);
        if (Yu.insert(e, u), e || n) {
            if (e === n)
                return ji(e), n = Ti(e.site), Yu.insert(u, n), u.edge = n.edge = Gi(e.site, u.site), Zi(e), Zi(n), void 0;
            if (!n)
                return u.edge = Gi(e.site, u.site), void 0;
            ji(e), ji(n);
            var l = e.site, h = l.x, c = l.y, f = t.x - h, p = t.y - c, d = n.site, m = d.x - h, g = d.y - c, v = 2 * (f * g - p * m), _ = f * f + p * p, y = m * m + g * g, b = {x: (g * _ - p * y) / v + h,y: (f * y - m * _) / v + c};
            Yi(n.edge, l, d, b), u.edge = Gi(l, t, null, b), n.edge = Gi(t, d, null, b), Zi(e), Zi(n)
        }
    }
    function Oi(t, e) {
        var n = t.site, i = n.x, r = n.y, o = r - e;
        if (!o)
            return i;
        var a = t.P;
        if (!a)
            return -1 / 0;
        n = a.site;
        var s = n.x, u = n.y, l = u - e;
        if (!l)
            return s;
        var h = s - i, c = 1 / o - 1 / l, f = h / l;
        return c ? (-f + Math.sqrt(f * f - 2 * c * (h * h / (-2 * l) - u + l / 2 + r - o / 2))) / c + i : (i + s) / 2
    }
    function Bi(t, e) {
        var n = t.N;
        if (n)
            return Oi(n, e);
        var i = t.site;
        return i.y === e ? i.x : 1 / 0
    }
    function Ni(t) {
        this.site = t, this.edges = []
    }
    function Ui(t) {
        for (var e, n, i, r, o, a, s, u, l, h, c = t[0][0], f = t[1][0], p = t[0][1], d = t[1][1], m = Wu, g = m.length; g--; )
            if (o = m[g], o && o.prepare())
                for (s = o.edges, u = s.length, a = 0; u > a; )
                    h = s[a].end(), i = h.x, r = h.y, l = s[++a % u].start(), e = l.x, n = l.y, (ss(i - e) > As || ss(r - n) > As) && (s.splice(a, 0, new Ji(Wi(o.site, h, ss(i - c) < As && d - r > As ? {x: c,y: ss(e - c) < As ? n : d} : ss(r - d) < As && f - i > As ? {x: ss(n - d) < As ? e : f,y: d} : ss(i - f) < As && r - p > As ? {x: f,y: ss(e - f) < As ? n : p} : ss(r - p) < As && i - c > As ? {x: ss(n - p) < As ? e : c,y: p} : null), o.site, null)), ++u)
    }
    function Ri(t, e) {
        return e.angle - t.angle
    }
    function Fi() {
        Ki(this), this.x = this.y = this.arc = this.site = this.cy = null
    }
    function Zi(t) {
        var e = t.P, n = t.N;
        if (e && n) {
            var i = e.site, r = t.site, o = n.site;
            if (i !== o) {
                var a = r.x, s = r.y, u = i.x - a, l = i.y - s, h = o.x - a, c = o.y - s, f = 2 * (u * c - l * h);
                if (!(f >= -Ss)) {
                    var p = u * u + l * l, d = h * h + c * c, m = (c * p - l * d) / f, g = (u * d - h * p) / f, c = g + s, v = Qu.pop() || new Fi;
                    v.arc = t, v.site = r, v.x = m + a, v.y = c + Math.sqrt(m * m + g * g), v.cy = c, t.circle = v;
                    for (var _ = null, y = Xu._; y; )
                        if (v.y < y.y || v.y === y.y && v.x <= y.x) {
                            if (!y.L) {
                                _ = y.P;
                                break
                            }
                            y = y.L
                        } else {
                            if (!y.R) {
                                _ = y;
                                break
                            }
                            y = y.R
                        }
                    Xu.insert(_, v), _ || (Ju = v)
                }
            }
        }
    }
    function ji(t) {
        var e = t.circle;
        e && (e.P || (Ju = e.N), Xu.remove(e), Qu.push(e), Ki(e), t.circle = null)
    }
    function Vi(t) {
        for (var e, n = Gu, i = Bn(t[0][0], t[0][1], t[1][0], t[1][1]), r = n.length; r--; )
            e = n[r], (!qi(e, t) || !i(e) || ss(e.a.x - e.b.x) < As && ss(e.a.y - e.b.y) < As) && (e.a = e.b = null, n.splice(r, 1))
    }
    function qi(t, e) {
        var n = t.b;
        if (n)
            return !0;
        var i, r, o = t.a, a = e[0][0], s = e[1][0], u = e[0][1], l = e[1][1], h = t.l, c = t.r, f = h.x, p = h.y, d = c.x, m = c.y, g = (f + d) / 2, v = (p + m) / 2;
        if (m === p) {
            if (a > g || g >= s)
                return;
            if (f > d) {
                if (o) {
                    if (o.y >= l)
                        return
                } else
                    o = {x: g,y: u};
                n = {x: g,y: l}
            } else {
                if (o) {
                    if (o.y < u)
                        return
                } else
                    o = {x: g,y: l};
                n = {x: g,y: u}
            }
        } else if (i = (f - d) / (m - p), r = v - i * g, -1 > i || i > 1)
            if (f > d) {
                if (o) {
                    if (o.y >= l)
                        return
                } else
                    o = {x: (u - r) / i,y: u};
                n = {x: (l - r) / i,y: l}
            } else {
                if (o) {
                    if (o.y < u)
                        return
                } else
                    o = {x: (l - r) / i,y: l};
                n = {x: (u - r) / i,y: u}
            }
        else if (m > p) {
            if (o) {
                if (o.x >= s)
                    return
            } else
                o = {x: a,y: i * a + r};
            n = {x: s,y: i * s + r}
        } else {
            if (o) {
                if (o.x < a)
                    return
            } else
                o = {x: s,y: i * s + r};
            n = {x: a,y: i * a + r}
        }
        return t.a = o, t.b = n, !0
    }
    function Hi(t, e) {
        this.l = t, this.r = e, this.a = this.b = null
    }
    function Gi(t, e, n, i) {
        var r = new Hi(t, e);
        return Gu.push(r), n && Yi(r, t, e, n), i && Yi(r, e, t, i), Wu[t.i].edges.push(new Ji(r, t, e)), Wu[e.i].edges.push(new Ji(r, e, t)), r
    }
    function Wi(t, e, n) {
        var i = new Hi(t, null);
        return i.a = e, i.b = n, Gu.push(i), i
    }
    function Yi(t, e, n, i) {
        t.a || t.b ? t.l === n ? t.b = i : t.a = i : (t.a = i, t.l = e, t.r = n)
    }
    function Ji(t, e, n) {
        var i = t.a, r = t.b;
        this.edge = t, this.site = e, this.angle = n ? Math.atan2(n.y - e.y, n.x - e.x) : t.l === e ? Math.atan2(r.x - i.x, i.y - r.y) : Math.atan2(i.x - r.x, r.y - i.y)
    }
    function Xi() {
        this._ = null
    }
    function Ki(t) {
        t.U = t.C = t.L = t.R = t.P = t.N = null
    }
    function Qi(t, e) {
        var n = e, i = e.R, r = n.U;
        r ? r.L === n ? r.L = i : r.R = i : t._ = i, i.U = r, n.U = i, n.R = i.L, n.R && (n.R.U = n), i.L = n
    }
    function $i(t, e) {
        var n = e, i = e.L, r = n.U;
        r ? r.L === n ? r.L = i : r.R = i : t._ = i, i.U = r, n.U = i, n.L = i.R, n.L && (n.L.U = n), i.R = n
    }
    function tr(t) {
        for (; t.L; )
            t = t.L;
        return t
    }
    function er(t, e) {
        var n, i, r, o = t.sort(nr).pop();
        for (Gu = [], Wu = Array(t.length), Yu = new Xi, Xu = new Xi; ; )
            if (r = Ju, o && (!r || o.y < r.y || o.y === r.y && o.x < r.x))
                (o.x !== n || o.y !== i) && (Wu[o.i] = new Ni(o), zi(o), n = o.x, i = o.y), o = t.pop();
            else {
                if (!r)
                    break;
                Ii(r.arc)
            }
        e && (Vi(e), Ui(e));
        var a = {cells: Wu,edges: Gu};
        return Yu = Xu = Gu = Wu = null, a
    }
    function nr(t, e) {
        return e.y - t.y || e.x - t.x
    }
    function ir(t, e, n) {
        return (t.x - n.x) * (e.y - t.y) - (t.x - e.x) * (n.y - t.y)
    }
    function rr(t) {
        return t.x
    }
    function or(t) {
        return t.y
    }
    function ar() {
        return {leaf: !0,nodes: [],point: null,x: null,y: null}
    }
    function sr(t, e, n, i, r, o) {
        if (!t(e, n, i, r, o)) {
            var a = .5 * (n + r), s = .5 * (i + o), u = e.nodes;
            u[0] && sr(t, u[0], n, i, a, s), u[1] && sr(t, u[1], a, i, r, s), u[2] && sr(t, u[2], n, s, a, o), u[3] && sr(t, u[3], a, s, r, o)
        }
    }
    function ur(t, e) {
        t = Wa.rgb(t), e = Wa.rgb(e);
        var n = t.r, i = t.g, r = t.b, o = e.r - n, a = e.g - i, s = e.b - r;
        return function(t) {
            return "#" + me(Math.round(n + o * t)) + me(Math.round(i + a * t)) + me(Math.round(r + s * t))
        }
    }
    function lr(t, e) {
        var n, i = {}, r = {};
        for (n in t)
            n in e ? i[n] = fr(t[n], e[n]) : r[n] = t[n];
        for (n in e)
            n in t || (r[n] = e[n]);
        return function(t) {
            for (n in i)
                r[n] = i[n](t);
            return r
        }
    }
    function hr(t, e) {
        return e -= t = +t, function(n) {
            return t + e * n
        }
    }
    function cr(t, e) {
        var n, i, r, o, a, s = 0, u = 0, l = [], h = [];
        for (t += "", e += "", tl.lastIndex = 0, i = 0; n = tl.exec(e); ++i)
            n.index && l.push(e.substring(s, u = n.index)), h.push({i: l.length,x: n[0]}), l.push(null), s = tl.lastIndex;
        for (s < e.length && l.push(e.substring(s)), i = 0, o = h.length; (n = tl.exec(t)) && o > i; ++i)
            if (a = h[i], a.x == n[0]) {
                if (a.i)
                    if (null == l[a.i + 1])
                        for (l[a.i - 1] += a.x, l.splice(a.i, 1), r = i + 1; o > r; ++r)
                            h[r].i--;
                    else
                        for (l[a.i - 1] += a.x + l[a.i + 1], l.splice(a.i, 2), r = i + 1; o > r; ++r)
                            h[r].i -= 2;
                else if (null == l[a.i + 1])
                    l[a.i] = a.x;
                else
                    for (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1), r = i + 1; o > r; ++r)
                        h[r].i--;
                h.splice(i, 1), o--, i--
            } else
                a.x = hr(parseFloat(n[0]), parseFloat(a.x));
        for (; o > i; )
            a = h.pop(), null == l[a.i + 1] ? l[a.i] = a.x : (l[a.i] = a.x + l[a.i + 1], l.splice(a.i + 1, 1)), o--;
        return 1 === l.length ? null == l[0] ? (a = h[0].x, function(t) {
            return a(t) + ""
        }) : function() {
            return e
        } : function(t) {
            for (i = 0; o > i; ++i)
                l[(a = h[i]).i] = a.x(t);
            return l.join("")
        }
    }
    function fr(t, e) {
        for (var n, i = Wa.interpolators.length; --i >= 0 && !(n = Wa.interpolators[i](t, e)); )
            ;
        return n
    }
    function pr(t, e) {
        var n, i = [], r = [], o = t.length, a = e.length, s = Math.min(t.length, e.length);
        for (n = 0; s > n; ++n)
            i.push(fr(t[n], e[n]));
        for (; o > n; ++n)
            r[n] = t[n];
        for (; a > n; ++n)
            r[n] = e[n];
        return function(t) {
            for (n = 0; s > n; ++n)
                r[n] = i[n](t);
            return r
        }
    }
    function dr(t) {
        return function(e) {
            return 0 >= e ? 0 : e >= 1 ? 1 : t(e)
        }
    }
    function mr(t) {
        return function(e) {
            return 1 - t(1 - e)
        }
    }
    function gr(t) {
        return function(e) {
            return .5 * (.5 > e ? t(2 * e) : 2 - t(2 - 2 * e))
        }
    }
    function vr(t) {
        return t * t
    }
    function _r(t) {
        return t * t * t
    }
    function yr(t) {
        if (0 >= t)
            return 0;
        if (t >= 1)
            return 1;
        var e = t * t, n = e * t;
        return 4 * (.5 > t ? n : 3 * (t - e) + n - .75)
    }
    function br(t) {
        return function(e) {
            return Math.pow(e, t)
        }
    }
    function wr(t) {
        return 1 - Math.cos(t * Ps)
    }
    function xr(t) {
        return Math.pow(2, 10 * (t - 1))
    }
    function Lr(t) {
        return 1 - Math.sqrt(1 - t * t)
    }
    function Mr(t, e) {
        var n;
        return arguments.length < 2 && (e = .45), arguments.length ? n = e / Cs * Math.asin(1 / t) : (t = 1, n = e / 4), function(i) {
            return 1 + t * Math.pow(2, -10 * i) * Math.sin((i - n) * Cs / e)
        }
    }
    function kr(t) {
        return t || (t = 1.70158), function(e) {
            return e * e * ((t + 1) * e - t)
        }
    }
    function Cr(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }
    function Pr(t, e) {
        t = Wa.hcl(t), e = Wa.hcl(e);
        var n = t.h, i = t.c, r = t.l, o = e.h - n, a = e.c - i, s = e.l - r;
        return isNaN(a) && (a = 0, i = isNaN(i) ? e.c : i), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360), function(t) {
            return ie(n + o * t, i + a * t, r + s * t) + ""
        }
    }
    function Ar(t, e) {
        t = Wa.hsl(t), e = Wa.hsl(e);
        var n = t.h, i = t.s, r = t.l, o = e.h - n, a = e.s - i, s = e.l - r;
        return isNaN(a) && (a = 0, i = isNaN(i) ? e.s : i), isNaN(o) ? (o = 0, n = isNaN(n) ? e.h : n) : o > 180 ? o -= 360 : -180 > o && (o += 360), function(t) {
            return te(n + o * t, i + a * t, r + s * t) + ""
        }
    }
    function Sr(t, e) {
        t = Wa.lab(t), e = Wa.lab(e);
        var n = t.l, i = t.a, r = t.b, o = e.l - n, a = e.a - i, s = e.b - r;
        return function(t) {
            return ae(n + o * t, i + a * t, r + s * t) + ""
        }
    }
    function Er(t, e) {
        return e -= t, function(n) {
            return Math.round(t + e * n)
        }
    }
    function Tr(t) {
        var e = [t.a, t.b], n = [t.c, t.d], i = Ir(e), r = Dr(e, n), o = Ir(zr(n, e, -r)) || 0;
        e[0] * n[1] < n[0] * e[1] && (e[0] *= -1, e[1] *= -1, i *= -1, r *= -1), this.rotate = (i ? Math.atan2(e[1], e[0]) : Math.atan2(-n[0], n[1])) * Ts, this.translate = [t.e, t.f], this.scale = [i, o], this.skew = o ? Math.atan2(r, o) * Ts : 0
    }
    function Dr(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }
    function Ir(t) {
        var e = Math.sqrt(Dr(t, t));
        return e && (t[0] /= e, t[1] /= e), e
    }
    function zr(t, e, n) {
        return t[0] += n * e[0], t[1] += n * e[1], t
    }
    function Or(t, e) {
        var n, i = [], r = [], o = Wa.transform(t), a = Wa.transform(e), s = o.translate, u = a.translate, l = o.rotate, h = a.rotate, c = o.skew, f = a.skew, p = o.scale, d = a.scale;
        return s[0] != u[0] || s[1] != u[1] ? (i.push("translate(", null, ",", null, ")"), r.push({i: 1,x: hr(s[0], u[0])}, {i: 3,x: hr(s[1], u[1])})) : u[0] || u[1] ? i.push("translate(" + u + ")") : i.push(""), l != h ? (l - h > 180 ? h += 360 : h - l > 180 && (l += 360), r.push({i: i.push(i.pop() + "rotate(", null, ")") - 2,x: hr(l, h)})) : h && i.push(i.pop() + "rotate(" + h + ")"), c != f ? r.push({i: i.push(i.pop() + "skewX(", null, ")") - 2,x: hr(c, f)}) : f && i.push(i.pop() + "skewX(" + f + ")"), p[0] != d[0] || p[1] != d[1] ? (n = i.push(i.pop() + "scale(", null, ",", null, ")"), r.push({i: n - 4,x: hr(p[0], d[0])}, {i: n - 2,x: hr(p[1], d[1])})) : (1 != d[0] || 1 != d[1]) && i.push(i.pop() + "scale(" + d + ")"), n = r.length, function(t) {
            for (var e, o = -1; ++o < n; )
                i[(e = r[o]).i] = e.x(t);
            return i.join("")
        }
    }
    function Br(t, e) {
        return e = e - (t = +t) ? 1 / (e - t) : 0, function(n) {
            return (n - t) * e
        }
    }
    function Nr(t, e) {
        return e = e - (t = +t) ? 1 / (e - t) : 0, function(n) {
            return Math.max(0, Math.min(1, (n - t) * e))
        }
    }
    function Ur(t) {
        for (var e = t.source, n = t.target, i = Fr(e, n), r = [e]; e !== i; )
            e = e.parent, r.push(e);
        for (var o = r.length; n !== i; )
            r.splice(o, 0, n), n = n.parent;
        return r
    }
    function Rr(t) {
        for (var e = [], n = t.parent; null != n; )
            e.push(t), t = n, n = n.parent;
        return e.push(t), e
    }
    function Fr(t, e) {
        if (t === e)
            return t;
        for (var n = Rr(t), i = Rr(e), r = n.pop(), o = i.pop(), a = null; r === o; )
            a = r, r = n.pop(), o = i.pop();
        return a
    }
    function Zr(t) {
        t.fixed |= 2
    }
    function jr(t) {
        t.fixed &= -7
    }
    function Vr(t) {
        t.fixed |= 4, t.px = t.x, t.py = t.y
    }
    function qr(t) {
        t.fixed &= -5
    }
    function Hr(t, e, n) {
        var i = 0, r = 0;
        if (t.charge = 0, !t.leaf)
            for (var o, a = t.nodes, s = a.length, u = -1; ++u < s; )
                o = a[u], null != o && (Hr(o, e, n), t.charge += o.charge, i += o.charge * o.cx, r += o.charge * o.cy);
        if (t.point) {
            t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
            var l = e * n[t.point.index];
            t.charge += t.pointCharge = l, i += l * t.point.x, r += l * t.point.y
        }
        t.cx = i / t.charge, t.cy = r / t.charge
    }
    function Gr(t, e) {
        return Wa.rebind(t, e, "sort", "children", "value"), t.nodes = t, t.links = Xr, t
    }
    function Wr(t) {
        return t.children
    }
    function Yr(t) {
        return t.value
    }
    function Jr(t, e) {
        return e.value - t.value
    }
    function Xr(t) {
        return Wa.merge(t.map(function(t) {
            return (t.children || []).map(function(e) {
                return {source: t,target: e}
            })
        }))
    }
    function Kr(t) {
        return t.x
    }
    function Qr(t) {
        return t.y
    }
    function $r(t, e, n) {
        t.y0 = e, t.y = n
    }
    function to(t) {
        return Wa.range(t.length)
    }
    function eo(t) {
        for (var e = -1, n = t[0].length, i = []; ++e < n; )
            i[e] = 0;
        return i
    }
    function no(t) {
        for (var e, n = 1, i = 0, r = t[0][1], o = t.length; o > n; ++n)
            (e = t[n][1]) > r && (i = n, r = e);
        return i
    }
    function io(t) {
        return t.reduce(ro, 0)
    }
    function ro(t, e) {
        return t + e[1]
    }
    function oo(t, e) {
        return ao(t, Math.ceil(Math.log(e.length) / Math.LN2 + 1))
    }
    function ao(t, e) {
        for (var n = -1, i = +t[0], r = (t[1] - i) / e, o = []; ++n <= e; )
            o[n] = r * n + i;
        return o
    }
    function so(t) {
        return [Wa.min(t), Wa.max(t)]
    }
    function uo(t, e) {
        return t.parent == e.parent ? 1 : 2
    }
    function lo(t) {
        var e = t.children;
        return e && e.length ? e[0] : t._tree.thread
    }
    function ho(t) {
        var e, n = t.children;
        return n && (e = n.length) ? n[e - 1] : t._tree.thread
    }
    function co(t, e) {
        var n = t.children;
        if (n && (r = n.length))
            for (var i, r, o = -1; ++o < r; )
                e(i = co(n[o], e), t) > 0 && (t = i);
        return t
    }
    function fo(t, e) {
        return t.x - e.x
    }
    function po(t, e) {
        return e.x - t.x
    }
    function mo(t, e) {
        return t.depth - e.depth
    }
    function go(t, e) {
        function n(t, i) {
            var r = t.children;
            if (r && (a = r.length))
                for (var o, a, s = null, u = -1; ++u < a; )
                    o = r[u], n(o, s), s = o;
            e(t, i)
        }
        n(t, null)
    }
    function vo(t) {
        for (var e, n = 0, i = 0, r = t.children, o = r.length; --o >= 0; )
            e = r[o]._tree, e.prelim += n, e.mod += n, n += e.shift + (i += e.change)
    }
    function _o(t, e, n) {
        t = t._tree, e = e._tree;
        var i = n / (e.number - t.number);
        t.change += i, e.change -= i, e.shift += n, e.prelim += n, e.mod += n
    }
    function yo(t, e, n) {
        return t._tree.ancestor.parent == e.parent ? t._tree.ancestor : n
    }
    function bo(t, e) {
        return t.value - e.value
    }
    function wo(t, e) {
        var n = t._pack_next;
        t._pack_next = e, e._pack_prev = t, e._pack_next = n, n._pack_prev = e
    }
    function xo(t, e) {
        t._pack_next = e, e._pack_prev = t
    }
    function Lo(t, e) {
        var n = e.x - t.x, i = e.y - t.y, r = t.r + e.r;
        return .999 * r * r > n * n + i * i
    }
    function Mo(t) {
        function e(t) {
            h = Math.min(t.x - t.r, h), c = Math.max(t.x + t.r, c), f = Math.min(t.y - t.r, f), p = Math.max(t.y + t.r, p)
        }
        if ((n = t.children) && (l = n.length)) {
            var n, i, r, o, a, s, u, l, h = 1 / 0, c = -1 / 0, f = 1 / 0, p = -1 / 0;
            if (n.forEach(ko), i = n[0], i.x = -i.r, i.y = 0, e(i), l > 1 && (r = n[1], r.x = r.r, r.y = 0, e(r), l > 2))
                for (o = n[2], Ao(i, r, o), e(o), wo(i, o), i._pack_prev = o, wo(o, r), r = i._pack_next, a = 3; l > a; a++) {
                    Ao(i, r, o = n[a]);
                    var d = 0, m = 1, g = 1;
                    for (s = r._pack_next; s !== r; s = s._pack_next, m++)
                        if (Lo(s, o)) {
                            d = 1;
                            break
                        }
                    if (1 == d)
                        for (u = i._pack_prev; u !== s._pack_prev && !Lo(u, o); u = u._pack_prev, g++)
                            ;
                    d ? (g > m || m == g && r.r < i.r ? xo(i, r = s) : xo(i = u, r), a--) : (wo(i, o), r = o, e(o))
                }
            var v = (h + c) / 2, _ = (f + p) / 2, y = 0;
            for (a = 0; l > a; a++)
                o = n[a], o.x -= v, o.y -= _, y = Math.max(y, o.r + Math.sqrt(o.x * o.x + o.y * o.y));
            t.r = y, n.forEach(Co)
        }
    }
    function ko(t) {
        t._pack_next = t._pack_prev = t
    }
    function Co(t) {
        delete t._pack_next, delete t._pack_prev
    }
    function Po(t, e, n, i) {
        var r = t.children;
        if (t.x = e += i * t.x, t.y = n += i * t.y, t.r *= i, r)
            for (var o = -1, a = r.length; ++o < a; )
                Po(r[o], e, n, i)
    }
    function Ao(t, e, n) {
        var i = t.r + n.r, r = e.x - t.x, o = e.y - t.y;
        if (i && (r || o)) {
            var a = e.r + n.r, s = r * r + o * o;
            a *= a, i *= i;
            var u = .5 + (i - a) / (2 * s), l = Math.sqrt(Math.max(0, 2 * a * (i + s) - (i -= s) * i - a * a)) / (2 * s);
            n.x = t.x + u * r + l * o, n.y = t.y + u * o - l * r
        } else
            n.x = t.x + i, n.y = t.y
    }
    function So(t) {
        return 1 + Wa.max(t, function(t) {
            return t.y
        })
    }
    function Eo(t) {
        return t.reduce(function(t, e) {
            return t + e.x
        }, 0) / t.length
    }
    function To(t) {
        var e = t.children;
        return e && e.length ? To(e[0]) : t
    }
    function Do(t) {
        var e, n = t.children;
        return n && (e = n.length) ? Do(n[e - 1]) : t
    }
    function Io(t) {
        return {x: t.x,y: t.y,dx: t.dx,dy: t.dy}
    }
    function zo(t, e) {
        var n = t.x + e[3], i = t.y + e[0], r = t.dx - e[1] - e[3], o = t.dy - e[0] - e[2];
        return 0 > r && (n += r / 2, r = 0), 0 > o && (i += o / 2, o = 0), {x: n,y: i,dx: r,dy: o}
    }
    function Oo(t) {
        var e = t[0], n = t[t.length - 1];
        return n > e ? [e, n] : [n, e]
    }
    function Bo(t) {
        return t.rangeExtent ? t.rangeExtent() : Oo(t.range())
    }
    function No(t, e, n, i) {
        var r = n(t[0], t[1]), o = i(e[0], e[1]);
        return function(t) {
            return o(r(t))
        }
    }
    function Uo(t, e) {
        var n, i = 0, r = t.length - 1, o = t[i], a = t[r];
        return o > a && (n = i, i = r, r = n, n = o, o = a, a = n), t[i] = e.floor(o), t[r] = e.ceil(a), t
    }
    function Ro(t) {
        return t ? {floor: function(e) {
                return Math.floor(e / t) * t
            },ceil: function(e) {
                return Math.ceil(e / t) * t
            }} : cl
    }
    function Fo(t, e, n, i) {
        var r = [], o = [], a = 0, s = Math.min(t.length, e.length) - 1;
        for (t[s] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a <= s; )
            r.push(n(t[a - 1], t[a])), o.push(i(e[a - 1], e[a]));
        return function(e) {
            var n = Wa.bisect(t, e, 1, s) - 1;
            return o[n](r[n](e))
        }
    }
    function Zo(t, e, n, i) {
        function r() {
            var r = Math.min(t.length, e.length) > 2 ? Fo : No, u = i ? Nr : Br;
            return a = r(t, e, u, n), s = r(e, t, u, fr), o
        }
        function o(t) {
            return a(t)
        }
        var a, s;
        return o.invert = function(t) {
            return s(t)
        }, o.domain = function(e) {
            return arguments.length ? (t = e.map(Number), r()) : t
        }, o.range = function(t) {
            return arguments.length ? (e = t, r()) : e
        }, o.rangeRound = function(t) {
            return o.range(t).interpolate(Er)
        }, o.clamp = function(t) {
            return arguments.length ? (i = t, r()) : i
        }, o.interpolate = function(t) {
            return arguments.length ? (n = t, r()) : n
        }, o.ticks = function(e) {
            return Ho(t, e)
        }, o.tickFormat = function(e, n) {
            return Go(t, e, n)
        }, o.nice = function(e) {
            return Vo(t, e), r()
        }, o.copy = function() {
            return Zo(t, e, n, i)
        }, r()
    }
    function jo(t, e) {
        return Wa.rebind(t, e, "range", "rangeRound", "interpolate", "clamp")
    }
    function Vo(t, e) {
        return Uo(t, Ro(qo(t, e)[2]))
    }
    function qo(t, e) {
        null == e && (e = 10);
        var n = Oo(t), i = n[1] - n[0], r = Math.pow(10, Math.floor(Math.log(i / e) / Math.LN10)), o = e / i * r;
        return .15 >= o ? r *= 10 : .35 >= o ? r *= 5 : .75 >= o && (r *= 2), n[0] = Math.ceil(n[0] / r) * r, n[1] = Math.floor(n[1] / r) * r + .5 * r, n[2] = r, n
    }
    function Ho(t, e) {
        return Wa.range.apply(Wa, qo(t, e))
    }
    function Go(t, e, n) {
        var i = qo(t, e);
        return Wa.format(n ? n.replace(tu, function(t, e, n, r, o, a, s, u, l, h) {
            return [e, n, r, o, a, s, u, l || "." + Yo(h, i), h].join("")
        }) : ",." + Wo(i[2]) + "f")
    }
    function Wo(t) {
        return -Math.floor(Math.log(t) / Math.LN10 + .01)
    }
    function Yo(t, e) {
        var n = Wo(e[2]);
        return t in fl ? Math.abs(n - Wo(Math.max(Math.abs(e[0]), Math.abs(e[1])))) + +("e" !== t) : n - 2 * ("%" === t)
    }
    function Jo(t, e, n, i) {
        function r(t) {
            return (n ? Math.log(0 > t ? 0 : t) : -Math.log(t > 0 ? 0 : -t)) / Math.log(e)
        }
        function o(t) {
            return n ? Math.pow(e, t) : -Math.pow(e, -t)
        }
        function a(e) {
            return t(r(e))
        }
        return a.invert = function(e) {
            return o(t.invert(e))
        }, a.domain = function(e) {
            return arguments.length ? (n = e[0] >= 0, t.domain((i = e.map(Number)).map(r)), a) : i
        }, a.base = function(n) {
            return arguments.length ? (e = +n, t.domain(i.map(r)), a) : e
        }, a.nice = function() {
            var e = Uo(i.map(r), n ? Math : dl);
            return t.domain(e), i = e.map(o), a
        }, a.ticks = function() {
            var t = Oo(i), a = [], s = t[0], u = t[1], l = Math.floor(r(s)), h = Math.ceil(r(u)), c = e % 1 ? 2 : e;
            if (isFinite(h - l)) {
                if (n) {
                    for (; h > l; l++)
                        for (var f = 1; c > f; f++)
                            a.push(o(l) * f);
                    a.push(o(l))
                } else
                    for (a.push(o(l)); l++ < h; )
                        for (var f = c - 1; f > 0; f--)
                            a.push(o(l) * f);
                for (l = 0; a[l] < s; l++)
                    ;
                for (h = a.length; a[h - 1] > u; h--)
                    ;
                a = a.slice(l, h)
            }
            return a
        }, a.tickFormat = function(t, e) {
            if (!arguments.length)
                return pl;
            arguments.length < 2 ? e = pl : "function" != typeof e && (e = Wa.format(e));
            var i, s = Math.max(.1, t / a.ticks().length), u = n ? (i = 1e-12, Math.ceil) : (i = -1e-12, Math.floor);
            return function(t) {
                return t / o(u(r(t) + i)) <= s ? e(t) : ""
            }
        }, a.copy = function() {
            return Jo(t.copy(), e, n, i)
        }, jo(a, t)
    }
    function Xo(t, e, n) {
        function i(e) {
            return t(r(e))
        }
        var r = Ko(e), o = Ko(1 / e);
        return i.invert = function(e) {
            return o(t.invert(e))
        }, i.domain = function(e) {
            return arguments.length ? (t.domain((n = e.map(Number)).map(r)), i) : n
        }, i.ticks = function(t) {
            return Ho(n, t)
        }, i.tickFormat = function(t, e) {
            return Go(n, t, e)
        }, i.nice = function(t) {
            return i.domain(Vo(n, t))
        }, i.exponent = function(a) {
            return arguments.length ? (r = Ko(e = a), o = Ko(1 / e), t.domain(n.map(r)), i) : e
        }, i.copy = function() {
            return Xo(t.copy(), e, n)
        }, jo(i, t)
    }
    function Ko(t) {
        return function(e) {
            return 0 > e ? -Math.pow(-e, t) : Math.pow(e, t)
        }
    }
    function Qo(t, e) {
        function n(n) {
            return a[((o.get(n) || "range" === e.t && o.set(n, t.push(n))) - 1) % a.length]
        }
        function i(e, n) {
            return Wa.range(t.length).map(function(t) {
                return e + n * t
            })
        }
        var o, a, s;
        return n.domain = function(i) {
            if (!arguments.length)
                return t;
            t = [], o = new r;
            for (var a, s = -1, u = i.length; ++s < u; )
                o.has(a = i[s]) || o.set(a, t.push(a));
            return n[e.t].apply(n, e.a)
        }, n.range = function(t) {
            return arguments.length ? (a = t, s = 0, e = {t: "range",a: arguments}, n) : a
        }, n.rangePoints = function(r, o) {
            arguments.length < 2 && (o = 0);
            var u = r[0], l = r[1], h = (l - u) / (Math.max(1, t.length - 1) + o);
            return a = i(t.length < 2 ? (u + l) / 2 : u + h * o / 2, h), s = 0, e = {t: "rangePoints",a: arguments}, n
        }, n.rangeBands = function(r, o, u) {
            arguments.length < 2 && (o = 0), arguments.length < 3 && (u = o);
            var l = r[1] < r[0], h = r[l - 0], c = r[1 - l], f = (c - h) / (t.length - o + 2 * u);
            return a = i(h + f * u, f), l && a.reverse(), s = f * (1 - o), e = {t: "rangeBands",a: arguments}, n
        }, n.rangeRoundBands = function(r, o, u) {
            arguments.length < 2 && (o = 0), arguments.length < 3 && (u = o);
            var l = r[1] < r[0], h = r[l - 0], c = r[1 - l], f = Math.floor((c - h) / (t.length - o + 2 * u)), p = c - h - (t.length - o) * f;
            return a = i(h + Math.round(p / 2), f), l && a.reverse(), s = Math.round(f * (1 - o)), e = {t: "rangeRoundBands",a: arguments}, n
        }, n.rangeBand = function() {
            return s
        }, n.rangeExtent = function() {
            return Oo(e.a[0])
        }, n.copy = function() {
            return Qo(t, e)
        }, n.domain(t)
    }
    function $o(t, e) {
        function n() {
            var n = 0, o = e.length;
            for (r = []; ++n < o; )
                r[n - 1] = Wa.quantile(t, n / o);
            return i
        }
        function i(t) {
            return isNaN(t = +t) ? void 0 : e[Wa.bisect(r, t)]
        }
        var r;
        return i.domain = function(e) {
            return arguments.length ? (t = e.filter(function(t) {
                return !isNaN(t)
            }).sort(Wa.ascending), n()) : t
        }, i.range = function(t) {
            return arguments.length ? (e = t, n()) : e
        }, i.quantiles = function() {
            return r
        }, i.invertExtent = function(n) {
            return n = e.indexOf(n), 0 > n ? [0 / 0, 0 / 0] : [n > 0 ? r[n - 1] : t[0], n < r.length ? r[n] : t[t.length - 1]]
        }, i.copy = function() {
            return $o(t, e)
        }, n()
    }
    function ta(t, e, n) {
        function i(e) {
            return n[Math.max(0, Math.min(a, Math.floor(o * (e - t))))]
        }
        function r() {
            return o = n.length / (e - t), a = n.length - 1, i
        }
        var o, a;
        return i.domain = function(n) {
            return arguments.length ? (t = +n[0], e = +n[n.length - 1], r()) : [t, e]
        }, i.range = function(t) {
            return arguments.length ? (n = t, r()) : n
        }, i.invertExtent = function(e) {
            return e = n.indexOf(e), e = 0 > e ? 0 / 0 : e / o + t, [e, e + 1 / o]
        }, i.copy = function() {
            return ta(t, e, n)
        }, r()
    }
    function ea(t, e) {
        function n(n) {
            return n >= n ? e[Wa.bisect(t, n)] : void 0
        }
        return n.domain = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.range = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.invertExtent = function(n) {
            return n = e.indexOf(n), [t[n - 1], t[n]]
        }, n.copy = function() {
            return ea(t, e)
        }, n
    }
    function na(t) {
        function e(t) {
            return +t
        }
        return e.invert = e, e.domain = e.range = function(n) {
            return arguments.length ? (t = n.map(e), e) : t
        }, e.ticks = function(e) {
            return Ho(t, e)
        }, e.tickFormat = function(e, n) {
            return Go(t, e, n)
        }, e.copy = function() {
            return na(t)
        }, e
    }
    function ia(t) {
        return t.innerRadius
    }
    function ra(t) {
        return t.outerRadius
    }
    function oa(t) {
        return t.startAngle
    }
    function aa(t) {
        return t.endAngle
    }
    function sa(t) {
        function e(e) {
            function a() {
                l.push("M", o(t(h), s))
            }
            for (var u, l = [], h = [], c = -1, f = e.length, p = we(n), d = we(i); ++c < f; )
                r.call(this, u = e[c], c) ? h.push([+p.call(this, u, c), +d.call(this, u, c)]) : h.length && (a(), h = []);
            return h.length && a(), l.length ? l.join("") : null
        }
        var n = Li, i = Mi, r = Ln, o = ua, a = o.key, s = .7;
        return e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.defined = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.interpolate = function(t) {
            return arguments.length ? (a = "function" == typeof t ? o = t : (o = wl.get(t) || ua).key, e) : a
        }, e.tension = function(t) {
            return arguments.length ? (s = t, e) : s
        }, e
    }
    function ua(t) {
        return t.join("L")
    }
    function la(t) {
        return ua(t) + "Z"
    }
    function ha(t) {
        for (var e = 0, n = t.length, i = t[0], r = [i[0], ",", i[1]]; ++e < n; )
            r.push("H", (i[0] + (i = t[e])[0]) / 2, "V", i[1]);
        return n > 1 && r.push("H", i[0]), r.join("")
    }
    function ca(t) {
        for (var e = 0, n = t.length, i = t[0], r = [i[0], ",", i[1]]; ++e < n; )
            r.push("V", (i = t[e])[1], "H", i[0]);
        return r.join("")
    }
    function fa(t) {
        for (var e = 0, n = t.length, i = t[0], r = [i[0], ",", i[1]]; ++e < n; )
            r.push("H", (i = t[e])[0], "V", i[1]);
        return r.join("")
    }
    function pa(t, e) {
        return t.length < 4 ? ua(t) : t[1] + ga(t.slice(1, t.length - 1), va(t, e))
    }
    function da(t, e) {
        return t.length < 3 ? ua(t) : t[0] + ga((t.push(t[0]), t), va([t[t.length - 2]].concat(t, [t[1]]), e))
    }
    function ma(t, e) {
        return t.length < 3 ? ua(t) : t[0] + ga(t, va(t, e))
    }
    function ga(t, e) {
        if (e.length < 1 || t.length != e.length && t.length != e.length + 2)
            return ua(t);
        var n = t.length != e.length, i = "", r = t[0], o = t[1], a = e[0], s = a, u = 1;
        if (n && (i += "Q" + (o[0] - 2 * a[0] / 3) + "," + (o[1] - 2 * a[1] / 3) + "," + o[0] + "," + o[1], r = t[1], u = 2), e.length > 1) {
            s = e[1], o = t[u], u++, i += "C" + (r[0] + a[0]) + "," + (r[1] + a[1]) + "," + (o[0] - s[0]) + "," + (o[1] - s[1]) + "," + o[0] + "," + o[1];
            for (var l = 2; l < e.length; l++, u++)
                o = t[u], s = e[l], i += "S" + (o[0] - s[0]) + "," + (o[1] - s[1]) + "," + o[0] + "," + o[1]
        }
        if (n) {
            var h = t[u];
            i += "Q" + (o[0] + 2 * s[0] / 3) + "," + (o[1] + 2 * s[1] / 3) + "," + h[0] + "," + h[1]
        }
        return i
    }
    function va(t, e) {
        for (var n, i = [], r = (1 - e) / 2, o = t[0], a = t[1], s = 1, u = t.length; ++s < u; )
            n = o, o = a, a = t[s], i.push([r * (a[0] - n[0]), r * (a[1] - n[1])]);
        return i
    }
    function _a(t) {
        if (t.length < 3)
            return ua(t);
        var e = 1, n = t.length, i = t[0], r = i[0], o = i[1], a = [r, r, r, (i = t[1])[0]], s = [o, o, o, i[1]], u = [r, ",", o, "L", xa(Ml, a), ",", xa(Ml, s)];
        for (t.push(t[n - 1]); ++e <= n; )
            i = t[e], a.shift(), a.push(i[0]), s.shift(), s.push(i[1]), La(u, a, s);
        return t.pop(), u.push("L", i), u.join("")
    }
    function ya(t) {
        if (t.length < 4)
            return ua(t);
        for (var e, n = [], i = -1, r = t.length, o = [0], a = [0]; ++i < 3; )
            e = t[i], o.push(e[0]), a.push(e[1]);
        for (n.push(xa(Ml, o) + "," + xa(Ml, a)), --i; ++i < r; )
            e = t[i], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), La(n, o, a);
        return n.join("")
    }
    function ba(t) {
        for (var e, n, i = -1, r = t.length, o = r + 4, a = [], s = []; ++i < 4; )
            n = t[i % r], a.push(n[0]), s.push(n[1]);
        for (e = [xa(Ml, a), ",", xa(Ml, s)], --i; ++i < o; )
            n = t[i % r], a.shift(), a.push(n[0]), s.shift(), s.push(n[1]), La(e, a, s);
        return e.join("")
    }
    function wa(t, e) {
        var n = t.length - 1;
        if (n)
            for (var i, r, o = t[0][0], a = t[0][1], s = t[n][0] - o, u = t[n][1] - a, l = -1; ++l <= n; )
                i = t[l], r = l / n, i[0] = e * i[0] + (1 - e) * (o + r * s), i[1] = e * i[1] + (1 - e) * (a + r * u);
        return _a(t)
    }
    function xa(t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
    }
    function La(t, e, n) {
        t.push("C", xa(xl, e), ",", xa(xl, n), ",", xa(Ll, e), ",", xa(Ll, n), ",", xa(Ml, e), ",", xa(Ml, n))
    }
    function Ma(t, e) {
        return (e[1] - t[1]) / (e[0] - t[0])
    }
    function ka(t) {
        for (var e = 0, n = t.length - 1, i = [], r = t[0], o = t[1], a = i[0] = Ma(r, o); ++e < n; )
            i[e] = (a + (a = Ma(r = o, o = t[e + 1]))) / 2;
        return i[e] = a, i
    }
    function Ca(t) {
        for (var e, n, i, r, o = [], a = ka(t), s = -1, u = t.length - 1; ++s < u; )
            e = Ma(t[s], t[s + 1]), ss(e) < As ? a[s] = a[s + 1] = 0 : (n = a[s] / e, i = a[s + 1] / e, r = n * n + i * i, r > 9 && (r = 3 * e / Math.sqrt(r), a[s] = r * n, a[s + 1] = r * i));
        for (s = -1; ++s <= u; )
            r = (t[Math.min(u, s + 1)][0] - t[Math.max(0, s - 1)][0]) / (6 * (1 + a[s] * a[s])), o.push([r || 0, a[s] * r || 0]);
        return o
    }
    function Pa(t) {
        return t.length < 3 ? ua(t) : t[0] + ga(t, Ca(t))
    }
    function Aa(t) {
        for (var e, n, i, r = -1, o = t.length; ++r < o; )
            e = t[r], n = e[0], i = e[1] + yl, e[0] = n * Math.cos(i), e[1] = n * Math.sin(i);
        return t
    }
    function Sa(t) {
        function e(e) {
            function u() {
                m.push("M", s(t(v), c), h, l(t(g.reverse()), c), "Z")
            }
            for (var f, p, d, m = [], g = [], v = [], _ = -1, y = e.length, b = we(n), w = we(r), x = n === i ? function() {
                return p
            } : we(i), L = r === o ? function() {
                return d
            } : we(o); ++_ < y; )
                a.call(this, f = e[_], _) ? (g.push([p = +b.call(this, f, _), d = +w.call(this, f, _)]), v.push([+x.call(this, f, _), +L.call(this, f, _)])) : g.length && (u(), g = [], v = []);
            return g.length && u(), m.length ? m.join("") : null
        }
        var n = Li, i = Li, r = 0, o = Mi, a = Ln, s = ua, u = s.key, l = s, h = "L", c = .7;
        return e.x = function(t) {
            return arguments.length ? (n = i = t, e) : i
        }, e.x0 = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.x1 = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e.y = function(t) {
            return arguments.length ? (r = o = t, e) : o
        }, e.y0 = function(t) {
            return arguments.length ? (r = t, e) : r
        }, e.y1 = function(t) {
            return arguments.length ? (o = t, e) : o
        }, e.defined = function(t) {
            return arguments.length ? (a = t, e) : a
        }, e.interpolate = function(t) {
            return arguments.length ? (u = "function" == typeof t ? s = t : (s = wl.get(t) || ua).key, l = s.reverse || s, h = s.closed ? "M" : "L", e) : u
        }, e.tension = function(t) {
            return arguments.length ? (c = t, e) : c
        }, e
    }
    function Ea(t) {
        return t.radius
    }
    function Ta(t) {
        return [t.x, t.y]
    }
    function Da(t) {
        return function() {
            var e = t.apply(this, arguments), n = e[0], i = e[1] + yl;
            return [n * Math.cos(i), n * Math.sin(i)]
        }
    }
    function Ia() {
        return 64
    }
    function za() {
        return "circle"
    }
    function Oa(t) {
        var e = Math.sqrt(t / ks);
        return "M0," + e + "A" + e + "," + e + " 0 1,1 0," + -e + "A" + e + "," + e + " 0 1,1 0," + e + "Z"
    }
    function Ba(t, e) {
        return fs(t, El), t.id = e, t
    }
    function Na(t, e, n, i) {
        var r = t.id;
        return z(t, "function" == typeof n ? function(t, o, a) {
            t.__transition__[r].tween.set(e, i(n.call(t, t.__data__, o, a)))
        } : (n = i(n), function(t) {
            t.__transition__[r].tween.set(e, n)
        }))
    }
    function Ua(t) {
        return null == t && (t = ""), function() {
            this.textContent = t
        }
    }
    function Ra(t, e, n, i) {
        var o = t.__transition__ || (t.__transition__ = {active: 0,count: 0}), a = o[n];
        if (!a) {
            var s = i.time;
            a = o[n] = {tween: new r,time: s,ease: i.ease,delay: i.delay,duration: i.duration}, ++o.count, Wa.timer(function(i) {
                function r(i) {
                    return o.active > n ? l() : (o.active = n, a.event && a.event.start.call(t, h, e), a.tween.forEach(function(n, i) {
                        (i = i.call(t, h, e)) && m.push(i)
                    }), Wa.timer(function() {
                        return d.c = u(i || 1) ? Ln : u, 1
                    }, 0, s), void 0)
                }
                function u(i) {
                    if (o.active !== n)
                        return l();
                    for (var r = i / p, s = c(r), u = m.length; u > 0; )
                        m[--u].call(t, s);
                    return r >= 1 ? (a.event && a.event.end.call(t, h, e), l()) : void 0
                }
                function l() {
                    return --o.count ? delete o[n] : delete t.__transition__, 1
                }
                var h = t.__data__, c = a.ease, f = a.delay, p = a.duration, d = Ks, m = [];
                return d.t = f + s, i >= f ? r(i - f) : (d.c = r, void 0)
            }, 0, s)
        }
    }
    function Fa(t, e) {
        t.attr("transform", function(t) {
            return "translate(" + e(t) + ",0)"
        })
    }
    function Za(t, e) {
        t.attr("transform", function(t) {
            return "translate(0," + e(t) + ")"
        })
    }
    function ja(t) {
        return t.toISOString()
    }
    function Va(t, e, n) {
        function i(e) {
            return t(e)
        }
        function r(t, n) {
            var i = t[1] - t[0], r = i / n, o = Wa.bisect(Rl, r);
            return o == Rl.length ? [e.year, qo(t.map(function(t) {
                    return t / 31536e6
                }), n)[2]] : o ? e[r / Rl[o - 1] < Rl[o] / r ? o - 1 : o] : [jl, qo(t, n)[2]]
        }
        return i.invert = function(e) {
            return qa(t.invert(e))
        }, i.domain = function(e) {
            return arguments.length ? (t.domain(e), i) : t.domain().map(qa)
        }, i.nice = function(t, e) {
            function n(n) {
                return !isNaN(n) && !t.range(n, qa(+n + 1), e).length
            }
            var o = i.domain(), a = Oo(o), s = null == t ? r(a, 10) : "number" == typeof t && r(a, t);
            return s && (t = s[0], e = s[1]), i.domain(Uo(o, e > 1 ? {floor: function(e) {
                    for (; n(e = t.floor(e)); )
                        e = qa(e - 1);
                    return e
                },ceil: function(e) {
                    for (; n(e = t.ceil(e)); )
                        e = qa(+e + 1);
                    return e
                }} : t))
        }, i.ticks = function(t, e) {
            var n = Oo(i.domain()), o = null == t ? r(n, 10) : "number" == typeof t ? r(n, t) : !t.range && [{range: t}, e];
            return o && (t = o[0], e = o[1]), t.range(n[0], qa(+n[1] + 1), 1 > e ? 1 : e)
        }, i.tickFormat = function() {
            return n
        }, i.copy = function() {
            return Va(t.copy(), e, n)
        }, jo(i, t)
    }
    function qa(t) {
        return new Date(t)
    }
    function Ha(t) {
        return JSON.parse(t.responseText)
    }
    function Ga(t) {
        var e = Xa.createRange();
        return e.selectNode(Xa.body), e.createContextualFragment(t.responseText)
    }
    var Wa = {version: "3.4.1"};
    Date.now || (Date.now = function() {
        return +new Date
    });
    var Ya = [].slice, Ja = function(t) {
        return Ya.call(t)
    }, Xa = document, Ka = Xa.documentElement, Qa = window;
    try {
        Ja(Ka.childNodes)[0].nodeType
    } catch ($a) {
        Ja = function(t) {
            for (var e = t.length, n = Array(e); e--; )
                n[e] = t[e];
            return n
        }
    }
    try {
        Xa.createElement("div").style.setProperty("opacity", 0, "")
    } catch (ts) {
        var es = Qa.Element.prototype, ns = es.setAttribute, is = es.setAttributeNS, rs = Qa.CSSStyleDeclaration.prototype, os = rs.setProperty;
        es.setAttribute = function(t, e) {
            ns.call(this, t, e + "")
        }, es.setAttributeNS = function(t, e, n) {
            is.call(this, t, e, n + "")
        }, rs.setProperty = function(t, e, n) {
            os.call(this, t, e + "", n)
        }
    }
    Wa.ascending = function(t, e) {
        return e > t ? -1 : t > e ? 1 : t >= e ? 0 : 0 / 0
    }, Wa.descending = function(t, e) {
        return t > e ? -1 : e > t ? 1 : e >= t ? 0 : 0 / 0
    }, Wa.min = function(t, e) {
        var n, i, r = -1, o = t.length;
        if (1 === arguments.length) {
            for (; ++r < o && !(null != (n = t[r]) && n >= n); )
                n = void 0;
            for (; ++r < o; )
                null != (i = t[r]) && n > i && (n = i)
        } else {
            for (; ++r < o && !(null != (n = e.call(t, t[r], r)) && n >= n); )
                n = void 0;
            for (; ++r < o; )
                null != (i = e.call(t, t[r], r)) && n > i && (n = i)
        }
        return n
    }, Wa.max = function(t, e) {
        var n, i, r = -1, o = t.length;
        if (1 === arguments.length) {
            for (; ++r < o && !(null != (n = t[r]) && n >= n); )
                n = void 0;
            for (; ++r < o; )
                null != (i = t[r]) && i > n && (n = i)
        } else {
            for (; ++r < o && !(null != (n = e.call(t, t[r], r)) && n >= n); )
                n = void 0;
            for (; ++r < o; )
                null != (i = e.call(t, t[r], r)) && i > n && (n = i)
        }
        return n
    }, Wa.extent = function(t, e) {
        var n, i, r, o = -1, a = t.length;
        if (1 === arguments.length) {
            for (; ++o < a && !(null != (n = r = t[o]) && n >= n); )
                n = r = void 0;
            for (; ++o < a; )
                null != (i = t[o]) && (n > i && (n = i), i > r && (r = i))
        } else {
            for (; ++o < a && !(null != (n = r = e.call(t, t[o], o)) && n >= n); )
                n = void 0;
            for (; ++o < a; )
                null != (i = e.call(t, t[o], o)) && (n > i && (n = i), i > r && (r = i))
        }
        return [n, r]
    }, Wa.sum = function(t, e) {
        var n, i = 0, r = t.length, o = -1;
        if (1 === arguments.length)
            for (; ++o < r; )
                isNaN(n = +t[o]) || (i += n);
        else
            for (; ++o < r; )
                isNaN(n = +e.call(t, t[o], o)) || (i += n);
        return i
    }, Wa.mean = function(e, n) {
        var i, r = e.length, o = 0, a = -1, s = 0;
        if (1 === arguments.length)
            for (; ++a < r; )
                t(i = e[a]) && (o += (i - o) / ++s);
        else
            for (; ++a < r; )
                t(i = n.call(e, e[a], a)) && (o += (i - o) / ++s);
        return s ? o : void 0
    }, Wa.quantile = function(t, e) {
        var n = (t.length - 1) * e + 1, i = Math.floor(n), r = +t[i - 1], o = n - i;
        return o ? r + o * (t[i] - r) : r
    }, Wa.median = function(e, n) {
        return arguments.length > 1 && (e = e.map(n)), e = e.filter(t), e.length ? Wa.quantile(e.sort(Wa.ascending), .5) : void 0
    }, Wa.bisector = function(t) {
        return {left: function(e, n, i, r) {
                for (arguments.length < 3 && (i = 0), arguments.length < 4 && (r = e.length); r > i; ) {
                    var o = i + r >>> 1;
                    t.call(e, e[o], o) < n ? i = o + 1 : r = o
                }
                return i
            },right: function(e, n, i, r) {
                for (arguments.length < 3 && (i = 0), arguments.length < 4 && (r = e.length); r > i; ) {
                    var o = i + r >>> 1;
                    n < t.call(e, e[o], o) ? r = o : i = o + 1
                }
                return i
            }}
    };
    var as = Wa.bisector(function(t) {
        return t
    });
    Wa.bisectLeft = as.left, Wa.bisect = Wa.bisectRight = as.right, Wa.shuffle = function(t) {
        for (var e, n, i = t.length; i; )
            n = 0 | Math.random() * i--, e = t[i], t[i] = t[n], t[n] = e;
        return t
    }, Wa.permute = function(t, e) {
        for (var n = e.length, i = Array(n); n--; )
            i[n] = t[e[n]];
        return i
    }, Wa.pairs = function(t) {
        for (var e, n = 0, i = t.length - 1, r = t[0], o = Array(0 > i ? 0 : i); i > n; )
            o[n] = [e = r, r = t[++n]];
        return o
    }, Wa.zip = function() {
        if (!(r = arguments.length))
            return [];
        for (var t = -1, n = Wa.min(arguments, e), i = Array(n); ++t < n; )
            for (var r, o = -1, a = i[t] = Array(r); ++o < r; )
                a[o] = arguments[o][t];
        return i
    }, Wa.transpose = function(t) {
        return Wa.zip.apply(Wa, t)
    }, Wa.keys = function(t) {
        var e = [];
        for (var n in t)
            e.push(n);
        return e
    }, Wa.values = function(t) {
        var e = [];
        for (var n in t)
            e.push(t[n]);
        return e
    }, Wa.entries = function(t) {
        var e = [];
        for (var n in t)
            e.push({key: n,value: t[n]});
        return e
    }, Wa.merge = function(t) {
        for (var e, n, i, r = t.length, o = -1, a = 0; ++o < r; )
            a += t[o].length;
        for (n = Array(a); --r >= 0; )
            for (i = t[r], e = i.length; --e >= 0; )
                n[--a] = i[e];
        return n
    };
    var ss = Math.abs;
    Wa.range = function(t, e, i) {
        if (arguments.length < 3 && (i = 1, arguments.length < 2 && (e = t, t = 0)), 1 / 0 === (e - t) / i)
            throw Error("infinite range");
        var r, o = [], a = n(ss(i)), s = -1;
        if (t *= a, e *= a, i *= a, 0 > i)
            for (; (r = t + i * ++s) > e; )
                o.push(r / a);
        else
            for (; (r = t + i * ++s) < e; )
                o.push(r / a);
        return o
    }, Wa.map = function(t) {
        var e = new r;
        if (t instanceof r)
            t.forEach(function(t, n) {
                e.set(t, n)
            });
        else
            for (var n in t)
                e.set(n, t[n]);
        return e
    }, i(r, {has: o,get: function(t) {
            return this[us + t]
        },set: function(t, e) {
            return this[us + t] = e
        },remove: a,keys: s,values: function() {
            var t = [];
            return this.forEach(function(e, n) {
                t.push(n)
            }), t
        },entries: function() {
            var t = [];
            return this.forEach(function(e, n) {
                t.push({key: e,value: n})
            }), t
        },size: u,empty: l,forEach: function(t) {
            for (var e in this)
                e.charCodeAt(0) === ls && t.call(this, e.substring(1), this[e])
        }});
    var us = "\x00", ls = us.charCodeAt(0);
    Wa.nest = function() {
        function t(e, s, u) {
            if (u >= a.length)
                return i ? i.call(o, s) : n ? s.sort(n) : s;
            for (var l, h, c, f, p = -1, d = s.length, m = a[u++], g = new r; ++p < d; )
                (f = g.get(l = m(h = s[p]))) ? f.push(h) : g.set(l, [h]);
            return e ? (h = e(), c = function(n, i) {
                h.set(n, t(e, i, u))
            }) : (h = {}, c = function(n, i) {
                h[n] = t(e, i, u)
            }), g.forEach(c), h
        }
        function e(t, n) {
            if (n >= a.length)
                return t;
            var i = [], r = s[n++];
            return t.forEach(function(t, r) {
                i.push({key: t,values: e(r, n)})
            }), r ? i.sort(function(t, e) {
                return r(t.key, e.key)
            }) : i
        }
        var n, i, o = {}, a = [], s = [];
        return o.map = function(e, n) {
            return t(n, e, 0)
        }, o.entries = function(n) {
            return e(t(Wa.map, n, 0), 0)
        }, o.key = function(t) {
            return a.push(t), o
        }, o.sortKeys = function(t) {
            return s[a.length - 1] = t, o
        }, o.sortValues = function(t) {
            return n = t, o
        }, o.rollup = function(t) {
            return i = t, o
        }, o
    }, Wa.set = function(t) {
        var e = new h;
        if (t)
            for (var n = 0, i = t.length; i > n; ++n)
                e.add(t[n]);
        return e
    }, i(h, {has: o,add: function(t) {
            return this[us + t] = !0, t
        },remove: function(t) {
            return t = us + t, t in this && delete this[t]
        },values: s,size: u,empty: l,forEach: function(t) {
            for (var e in this)
                e.charCodeAt(0) === ls && t.call(this, e.substring(1))
        }}), Wa.behavior = {}, Wa.rebind = function(t, e) {
        for (var n, i = 1, r = arguments.length; ++i < r; )
            t[n = arguments[i]] = c(t, e, e[n]);
        return t
    };
    var hs = ["webkit", "ms", "moz", "Moz", "o", "O"];
    Wa.dispatch = function() {
        for (var t = new d, e = -1, n = arguments.length; ++e < n; )
            t[arguments[e]] = m(t);
        return t
    }, d.prototype.on = function(t, e) {
        var n = t.indexOf("."), i = "";
        if (n >= 0 && (i = t.substring(n + 1), t = t.substring(0, n)), t)
            return arguments.length < 2 ? this[t].on(i) : this[t].on(i, e);
        if (2 === arguments.length) {
            if (null == e)
                for (t in this)
                    this.hasOwnProperty(t) && this[t].on(i, null);
            return this
        }
    }, Wa.event = null, Wa.requote = function(t) {
        return t.replace(cs, "\\$&")
    };
    var cs = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, fs = {}.__proto__ ? function(t, e) {
        t.__proto__ = e
    } : function(t, e) {
        for (var n in e)
            t[n] = e[n]
    }, ps = function(t, e) {
        return e.querySelector(t)
    }, ds = function(t, e) {
        return e.querySelectorAll(t)
    }, ms = Ka[f(Ka, "matchesSelector")], gs = function(t, e) {
        return ms.call(t, e)
    };
    "function" == typeof Sizzle && (ps = function(t, e) {
        return Sizzle(t, e)[0] || null
    }, ds = function(t, e) {
        return Sizzle.uniqueSort(Sizzle(t, e))
    }, gs = Sizzle.matchesSelector), Wa.selection = function() {
        return bs
    };
    var vs = Wa.selection.prototype = [];
    vs.select = function(t) {
        var e, n, i, r, o = [];
        t = b(t);
        for (var a = -1, s = this.length; ++a < s; ) {
            o.push(e = []), e.parentNode = (i = this[a]).parentNode;
            for (var u = -1, l = i.length; ++u < l; )
                (r = i[u]) ? (e.push(n = t.call(r, r.__data__, u, a)), n && "__data__" in r && (n.__data__ = r.__data__)) : e.push(null)
        }
        return y(o)
    }, vs.selectAll = function(t) {
        var e, n, i = [];
        t = w(t);
        for (var r = -1, o = this.length; ++r < o; )
            for (var a = this[r], s = -1, u = a.length; ++s < u; )
                (n = a[s]) && (i.push(e = Ja(t.call(n, n.__data__, s, r))), e.parentNode = n);
        return y(i)
    };
    var _s = {svg: "http://www.w3.org/2000/svg",xhtml: "http://www.w3.org/1999/xhtml",xlink: "http://www.w3.org/1999/xlink",xml: "http://www.w3.org/XML/1998/namespace",xmlns: "http://www.w3.org/2000/xmlns/"};
    Wa.ns = {prefix: _s,qualify: function(t) {
            var e = t.indexOf(":"), n = t;
            return e >= 0 && (n = t.substring(0, e), t = t.substring(e + 1)), _s.hasOwnProperty(n) ? {space: _s[n],local: t} : t
        }}, vs.attr = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node();
                return t = Wa.ns.qualify(t), t.local ? n.getAttributeNS(t.space, t.local) : n.getAttribute(t)
            }
            for (e in t)
                this.each(x(e, t[e]));
            return this
        }
        return this.each(x(t, e))
    }, vs.classed = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var n = this.node(), i = (t = k(t)).length, r = -1;
                if (e = n.classList) {
                    for (; ++r < i; )
                        if (!e.contains(t[r]))
                            return !1
                } else
                    for (e = n.getAttribute("class"); ++r < i; )
                        if (!M(t[r]).test(e))
                            return !1;
                return !0
            }
            for (e in t)
                this.each(C(e, t[e]));
            return this
        }
        return this.each(C(t, e))
    }, vs.style = function(t, e, n) {
        var i = arguments.length;
        if (3 > i) {
            if ("string" != typeof t) {
                2 > i && (e = "");
                for (n in t)
                    this.each(A(n, t[n], e));
                return this
            }
            if (2 > i)
                return Qa.getComputedStyle(this.node(), null).getPropertyValue(t);
            n = ""
        }
        return this.each(A(t, e, n))
    }, vs.property = function(t, e) {
        if (arguments.length < 2) {
            if ("string" == typeof t)
                return this.node()[t];
            for (e in t)
                this.each(S(e, t[e]));
            return this
        }
        return this.each(S(t, e))
    }, vs.text = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.textContent = null == e ? "" : e
        } : null == t ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = t
        }) : this.node().textContent
    }, vs.html = function(t) {
        return arguments.length ? this.each("function" == typeof t ? function() {
            var e = t.apply(this, arguments);
            this.innerHTML = null == e ? "" : e
        } : null == t ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = t
        }) : this.node().innerHTML
    }, vs.append = function(t) {
        return t = E(t), this.select(function() {
            return this.appendChild(t.apply(this, arguments))
        })
    }, vs.insert = function(t, e) {
        return t = E(t), e = b(e), this.select(function() {
            return this.insertBefore(t.apply(this, arguments), e.apply(this, arguments) || null)
        })
    }, vs.remove = function() {
        return this.each(function() {
            var t = this.parentNode;
            t && t.removeChild(this)
        })
    }, vs.data = function(t, e) {
        function n(t, n) {
            var i, o, a, s = t.length, c = n.length, f = Math.min(s, c), p = Array(c), d = Array(c), m = Array(s);
            if (e) {
                var g, v = new r, _ = new r, y = [];
                for (i = -1; ++i < s; )
                    g = e.call(o = t[i], o.__data__, i), v.has(g) ? m[i] = o : v.set(g, o), y.push(g);
                for (i = -1; ++i < c; )
                    g = e.call(n, a = n[i], i), (o = v.get(g)) ? (p[i] = o, o.__data__ = a) : _.has(g) || (d[i] = T(a)), _.set(g, a), v.remove(g);
                for (i = -1; ++i < s; )
                    v.has(y[i]) && (m[i] = t[i])
            } else {
                for (i = -1; ++i < f; )
                    o = t[i], a = n[i], o ? (o.__data__ = a, p[i] = o) : d[i] = T(a);
                for (; c > i; ++i)
                    d[i] = T(n[i]);
                for (; s > i; ++i)
                    m[i] = t[i]
            }
            d.update = p, d.parentNode = p.parentNode = m.parentNode = t.parentNode, u.push(d), l.push(p), h.push(m)
        }
        var i, o, a = -1, s = this.length;
        if (!arguments.length) {
            for (t = Array(s = (i = this[0]).length); ++a < s; )
                (o = i[a]) && (t[a] = o.__data__);
            return t
        }
        var u = O([]), l = y([]), h = y([]);
        if ("function" == typeof t)
            for (; ++a < s; )
                n(i = this[a], t.call(i, i.parentNode.__data__, a));
        else
            for (; ++a < s; )
                n(i = this[a], t);
        return l.enter = function() {
            return u
        }, l.exit = function() {
            return h
        }, l
    }, vs.datum = function(t) {
        return arguments.length ? this.property("__data__", t) : this.property("__data__")
    }, vs.filter = function(t) {
        var e, n, i, r = [];
        "function" != typeof t && (t = D(t));
        for (var o = 0, a = this.length; a > o; o++) {
            r.push(e = []), e.parentNode = (n = this[o]).parentNode;
            for (var s = 0, u = n.length; u > s; s++)
                (i = n[s]) && t.call(i, i.__data__, s, o) && e.push(i)
        }
        return y(r)
    }, vs.order = function() {
        for (var t = -1, e = this.length; ++t < e; )
            for (var n, i = this[t], r = i.length - 1, o = i[r]; --r >= 0; )
                (n = i[r]) && (o && o !== n.nextSibling && o.parentNode.insertBefore(n, o), o = n);
        return this
    }, vs.sort = function(t) {
        t = I.apply(this, arguments);
        for (var e = -1, n = this.length; ++e < n; )
            this[e].sort(t);
        return this.order()
    }, vs.each = function(t) {
        return z(this, function(e, n, i) {
            t.call(e, e.__data__, n, i)
        })
    }, vs.call = function(t) {
        var e = Ja(arguments);
        return t.apply(e[0] = this, e), this
    }, vs.empty = function() {
        return !this.node()
    }, vs.node = function() {
        for (var t = 0, e = this.length; e > t; t++)
            for (var n = this[t], i = 0, r = n.length; r > i; i++) {
                var o = n[i];
                if (o)
                    return o
            }
        return null
    }, vs.size = function() {
        var t = 0;
        return this.each(function() {
            ++t
        }), t
    };
    var ys = [];
    Wa.selection.enter = O, Wa.selection.enter.prototype = ys, ys.append = vs.append, ys.empty = vs.empty, ys.node = vs.node, ys.call = vs.call, ys.size = vs.size, ys.select = function(t) {
        for (var e, n, i, r, o, a = [], s = -1, u = this.length; ++s < u; ) {
            i = (r = this[s]).update, a.push(e = []), e.parentNode = r.parentNode;
            for (var l = -1, h = r.length; ++l < h; )
                (o = r[l]) ? (e.push(i[l] = n = t.call(r.parentNode, o.__data__, l, s)), n.__data__ = o.__data__) : e.push(null)
        }
        return y(a)
    }, ys.insert = function(t, e) {
        return arguments.length < 2 && (e = B(this)), vs.insert.call(this, t, e)
    }, vs.transition = function() {
        for (var t, e, n = Cl || ++Tl, i = [], r = Pl || {time: Date.now(),ease: yr,delay: 0,duration: 250}, o = -1, a = this.length; ++o < a; ) {
            i.push(t = []);
            for (var s = this[o], u = -1, l = s.length; ++u < l; )
                (e = s[u]) && Ra(e, u, n, r), t.push(e)
        }
        return Ba(i, n)
    }, vs.interrupt = function() {
        return this.each(N)
    }, Wa.select = function(t) {
        var e = ["string" == typeof t ? ps(t, Xa) : t];
        return e.parentNode = Ka, y([e])
    }, Wa.selectAll = function(t) {
        var e = Ja("string" == typeof t ? ds(t, Xa) : t);
        return e.parentNode = Ka, y([e])
    };
    var bs = Wa.select(Ka);
    vs.on = function(t, e, n) {
        var i = arguments.length;
        if (3 > i) {
            if ("string" != typeof t) {
                2 > i && (e = !1);
                for (n in t)
                    this.each(U(n, t[n], e));
                return this
            }
            if (2 > i)
                return (i = this.node()["__on" + t]) && i._;
            n = !1
        }
        return this.each(U(t, e, n))
    };
    var ws = Wa.map({mouseenter: "mouseover",mouseleave: "mouseout"});
    ws.forEach(function(t) {
        "on" + t in Xa && ws.remove(t)
    });
    var xs = "onselectstart" in Xa ? null : f(Ka.style, "userSelect"), Ls = 0;
    Wa.mouse = function(t) {
        return j(t, v())
    };
    var Ms = /WebKit/.test(Qa.navigator.userAgent) ? -1 : 0;
    Wa.touches = function(t, e) {
        return arguments.length < 2 && (e = v().touches), e ? Ja(e).map(function(e) {
            var n = j(t, e);
            return n.identifier = e.identifier, n
        }) : []
    }, Wa.behavior.drag = function() {
        function t() {
            this.on("mousedown.drag", a).on("touchstart.drag", s)
        }
        function e() {
            return Wa.event.changedTouches[0].identifier
        }
        function n(t, e) {
            return Wa.touches(t).filter(function(t) {
                return t.identifier === e
            })[0]
        }
        function i(t, e, n, i) {
            return function() {
                function a() {
                    var t = e(h, p), n = t[0] - m[0], i = t[1] - m[1];
                    g |= n | i, m = t, c({type: "drag",x: t[0] + u[0],y: t[1] + u[1],dx: n,dy: i})
                }
                function s() {
                    v.on(n + "." + d, null).on(i + "." + d, null), _(g && Wa.event.target === f), c({type: "dragend"})
                }
                var u, l = this, h = l.parentNode, c = r.of(l, arguments), f = Wa.event.target, p = t(), d = null == p ? "drag" : "drag-" + p, m = e(h, p), g = 0, v = Wa.select(Qa).on(n + "." + d, a).on(i + "." + d, s), _ = Z();
                o ? (u = o.apply(l, arguments), u = [u.x - m[0], u.y - m[1]]) : u = [0, 0], c({type: "dragstart"})
            }
        }
        var r = _(t, "drag", "dragstart", "dragend"), o = null, a = i(p, Wa.mouse, "mousemove", "mouseup"), s = i(e, n, "touchmove", "touchend");
        return t.origin = function(e) {
            return arguments.length ? (o = e, t) : o
        }, Wa.rebind(t, r, "on")
    };
    var ks = Math.PI, Cs = 2 * ks, Ps = ks / 2, As = 1e-6, Ss = As * As, Es = ks / 180, Ts = 180 / ks, Ds = Math.SQRT2, Is = 2, zs = 4;
    Wa.interpolateZoom = function(t, e) {
        function n(t) {
            var e = t * _;
            if (v) {
                var n = Y(m), a = o / (Is * f) * (n * J(Ds * e + m) - W(m));
                return [i + a * l, r + a * h, o * n / Y(Ds * e + m)]
            }
            return [i + t * l, r + t * h, o * Math.exp(Ds * e)]
        }
        var i = t[0], r = t[1], o = t[2], a = e[0], s = e[1], u = e[2], l = a - i, h = s - r, c = l * l + h * h, f = Math.sqrt(c), p = (u * u - o * o + zs * c) / (2 * o * Is * f), d = (u * u - o * o - zs * c) / (2 * u * Is * f), m = Math.log(Math.sqrt(p * p + 1) - p), g = Math.log(Math.sqrt(d * d + 1) - d), v = g - m, _ = (v || Math.log(u / o)) / Ds;
        return n.duration = 1e3 * _, n
    }, Wa.behavior.zoom = function() {
        function t(t) {
            t.on(P, l).on(Ns + ".zoom", c).on(A, f).on("dblclick.zoom", p).on(E, h)
        }
        function e(t) {
            return [(t[0] - M.x) / M.k, (t[1] - M.y) / M.k]
        }
        function n(t) {
            return [t[0] * M.k + M.x, t[1] * M.k + M.y]
        }
        function i(t) {
            M.k = Math.max(C[0], Math.min(C[1], t))
        }
        function r(t, e) {
            e = n(e), M.x += t[0] - e[0], M.y += t[1] - e[1]
        }
        function o() {
            w && w.domain(b.range().map(function(t) {
                return (t - M.x) / M.k
            }).map(b.invert)), L && L.domain(x.range().map(function(t) {
                return (t - M.y) / M.k
            }).map(x.invert))
        }
        function a(t) {
            t({type: "zoomstart"})
        }
        function s(t) {
            o(), t({type: "zoom",scale: M.k,translate: [M.x, M.y]})
        }
        function u(t) {
            t({type: "zoomend"})
        }
        function l() {
            function t() {
                h = 1, r(Wa.mouse(i), p), s(o)
            }
            function n() {
                c.on(A, Qa === i ? f : null).on(S, null), d(h && Wa.event.target === l), u(o)
            }
            var i = this, o = T.of(i, arguments), l = Wa.event.target, h = 0, c = Wa.select(Qa).on(A, t).on(S, n), p = e(Wa.mouse(i)), d = Z();
            N.call(i), a(o)
        }
        function h() {
            function t() {
                var t = Wa.touches(p);
                return f = M.k, t.forEach(function(t) {
                    t.identifier in m && (m[t.identifier] = e(t))
                }), t
            }
            function n() {
                for (var e = Wa.event.changedTouches, n = 0, o = e.length; o > n; ++n)
                    m[e[n].identifier] = null;
                var a = t(), u = Date.now();
                if (1 === a.length) {
                    if (500 > u - y) {
                        var l = a[0], h = m[l.identifier];
                        i(2 * M.k), r(l, h), g(), s(d)
                    }
                    y = u
                } else if (a.length > 1) {
                    var l = a[0], c = a[1], f = l[0] - c[0], p = l[1] - c[1];
                    v = f * f + p * p
                }
            }
            function o() {
                for (var t, e, n, o, a = Wa.touches(p), u = 0, l = a.length; l > u; ++u, o = null)
                    if (n = a[u], o = m[n.identifier]) {
                        if (e)
                            break;
                        t = n, e = o
                    }
                if (o) {
                    var h = (h = n[0] - t[0]) * h + (h = n[1] - t[1]) * h, c = v && Math.sqrt(h / v);
                    t = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2], e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], i(c * f)
                }
                y = null, r(t, e), s(d)
            }
            function c() {
                if (Wa.event.touches.length) {
                    for (var e = Wa.event.changedTouches, n = 0, i = e.length; i > n; ++n)
                        delete m[e[n].identifier];
                    for (var r in m)
                        return void t()
                }
                x.on(b, null).on(w, null), L.on(P, l).on(E, h), k(), u(d)
            }
            var f, p = this, d = T.of(p, arguments), m = {}, v = 0, _ = Wa.event.changedTouches[0].identifier, b = "touchmove.zoom-" + _, w = "touchend.zoom-" + _, x = Wa.select(Qa).on(b, o).on(w, c), L = Wa.select(p).on(P, null).on(E, n), k = Z();
            N.call(p), n(), a(d)
        }
        function c() {
            var t = T.of(this, arguments);
            v ? clearTimeout(v) : (N.call(this), a(t)), v = setTimeout(function() {
                v = null, u(t)
            }, 50), g();
            var n = m || Wa.mouse(this);
            d || (d = e(n)), i(Math.pow(2, .002 * Os()) * M.k), r(n, d), s(t)
        }
        function f() {
            d = null
        }
        function p() {
            var t = T.of(this, arguments), n = Wa.mouse(this), o = e(n), l = Math.log(M.k) / Math.LN2;
            a(t), i(Math.pow(2, Wa.event.shiftKey ? Math.ceil(l) - 1 : Math.floor(l) + 1)), r(n, o), s(t), u(t)
        }
        var d, m, v, y, b, w, x, L, M = {x: 0,y: 0,k: 1}, k = [960, 500], C = Bs, P = "mousedown.zoom", A = "mousemove.zoom", S = "mouseup.zoom", E = "touchstart.zoom", T = _(t, "zoomstart", "zoom", "zoomend");
        return t.event = function(t) {
            t.each(function() {
                var t = T.of(this, arguments), e = M;
                Cl ? Wa.select(this).transition().each("start.zoom", function() {
                    M = this.__chart__ || {x: 0,y: 0,k: 1}, a(t)
                }).tween("zoom:zoom", function() {
                    var n = k[0], i = k[1], r = n / 2, o = i / 2, a = Wa.interpolateZoom([(r - M.x) / M.k, (o - M.y) / M.k, n / M.k], [(r - e.x) / e.k, (o - e.y) / e.k, n / e.k]);
                    return function(e) {
                        var i = a(e), u = n / i[2];
                        this.__chart__ = M = {x: r - i[0] * u,y: o - i[1] * u,k: u}, s(t)
                    }
                }).each("end.zoom", function() {
                    u(t)
                }) : (this.__chart__ = M, a(t), s(t), u(t))
            })
        }, t.translate = function(e) {
            return arguments.length ? (M = {x: +e[0],y: +e[1],k: M.k}, o(), t) : [M.x, M.y]
        }, t.scale = function(e) {
            return arguments.length ? (M = {x: M.x,y: M.y,k: +e}, o(), t) : M.k
        }, t.scaleExtent = function(e) {
            return arguments.length ? (C = null == e ? Bs : [+e[0], +e[1]], t) : C
        }, t.center = function(e) {
            return arguments.length ? (m = e && [+e[0], +e[1]], t) : m
        }, t.size = function(e) {
            return arguments.length ? (k = e && [+e[0], +e[1]], t) : k
        }, t.x = function(e) {
            return arguments.length ? (w = e, b = e.copy(), M = {x: 0,y: 0,k: 1}, t) : w
        }, t.y = function(e) {
            return arguments.length ? (L = e, x = e.copy(), M = {x: 0,y: 0,k: 1}, t) : L
        }, Wa.rebind(t, T, "on")
    };
    var Os, Bs = [0, 1 / 0], Ns = "onwheel" in Xa ? (Os = function() {
        return -Wa.event.deltaY * (Wa.event.deltaMode ? 120 : 1)
    }, "wheel") : "onmousewheel" in Xa ? (Os = function() {
        return Wa.event.wheelDelta
    }, "mousewheel") : (Os = function() {
        return -Wa.event.detail
    }, "MozMousePixelScroll");
    K.prototype.toString = function() {
        return this.rgb() + ""
    }, Wa.hsl = function(t, e, n) {
        return 1 === arguments.length ? t instanceof $ ? Q(t.h, t.s, t.l) : ge("" + t, ve, Q) : Q(+t, +e, +n)
    };
    var Us = $.prototype = new K;
    Us.brighter = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), Q(this.h, this.s, this.l / t)
    }, Us.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), Q(this.h, this.s, t * this.l)
    }, Us.rgb = function() {
        return te(this.h, this.s, this.l)
    }, Wa.hcl = function(t, e, n) {
        return 1 === arguments.length ? t instanceof ne ? ee(t.h, t.c, t.l) : t instanceof oe ? se(t.l, t.a, t.b) : se((t = _e((t = Wa.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : ee(+t, +e, +n)
    };
    var Rs = ne.prototype = new K;
    Rs.brighter = function(t) {
        return ee(this.h, this.c, Math.min(100, this.l + Fs * (arguments.length ? t : 1)))
    }, Rs.darker = function(t) {
        return ee(this.h, this.c, Math.max(0, this.l - Fs * (arguments.length ? t : 1)))
    }, Rs.rgb = function() {
        return ie(this.h, this.c, this.l).rgb()
    }, Wa.lab = function(t, e, n) {
        return 1 === arguments.length ? t instanceof oe ? re(t.l, t.a, t.b) : t instanceof ne ? ie(t.l, t.c, t.h) : _e((t = Wa.rgb(t)).r, t.g, t.b) : re(+t, +e, +n)
    };
    var Fs = 18, Zs = .95047, js = 1, Vs = 1.08883, qs = oe.prototype = new K;
    qs.brighter = function(t) {
        return re(Math.min(100, this.l + Fs * (arguments.length ? t : 1)), this.a, this.b)
    }, qs.darker = function(t) {
        return re(Math.max(0, this.l - Fs * (arguments.length ? t : 1)), this.a, this.b)
    }, qs.rgb = function() {
        return ae(this.l, this.a, this.b)
    }, Wa.rgb = function(t, e, n) {
        return 1 === arguments.length ? t instanceof de ? pe(t.r, t.g, t.b) : ge("" + t, pe, te) : pe(~~t, ~~e, ~~n)
    };
    var Hs = de.prototype = new K;
    Hs.brighter = function(t) {
        t = Math.pow(.7, arguments.length ? t : 1);
        var e = this.r, n = this.g, i = this.b, r = 30;
        return e || n || i ? (e && r > e && (e = r), n && r > n && (n = r), i && r > i && (i = r), pe(Math.min(255, ~~(e / t)), Math.min(255, ~~(n / t)), Math.min(255, ~~(i / t)))) : pe(r, r, r)
    }, Hs.darker = function(t) {
        return t = Math.pow(.7, arguments.length ? t : 1), pe(~~(t * this.r), ~~(t * this.g), ~~(t * this.b))
    }, Hs.hsl = function() {
        return ve(this.r, this.g, this.b)
    }, Hs.toString = function() {
        return "#" + me(this.r) + me(this.g) + me(this.b)
    };
    var Gs = Wa.map({aliceblue: 15792383,antiquewhite: 16444375,aqua: 65535,aquamarine: 8388564,azure: 15794175,beige: 16119260,bisque: 16770244,black: 0,blanchedalmond: 16772045,blue: 255,blueviolet: 9055202,brown: 10824234,burlywood: 14596231,cadetblue: 6266528,chartreuse: 8388352,chocolate: 13789470,coral: 16744272,cornflowerblue: 6591981,cornsilk: 16775388,crimson: 14423100,cyan: 65535,darkblue: 139,darkcyan: 35723,darkgoldenrod: 12092939,darkgray: 11119017,darkgreen: 25600,darkgrey: 11119017,darkkhaki: 12433259,darkmagenta: 9109643,darkolivegreen: 5597999,darkorange: 16747520,darkorchid: 10040012,darkred: 9109504,darksalmon: 15308410,darkseagreen: 9419919,darkslateblue: 4734347,darkslategray: 3100495,darkslategrey: 3100495,darkturquoise: 52945,darkviolet: 9699539,deeppink: 16716947,deepskyblue: 49151,dimgray: 6908265,dimgrey: 6908265,dodgerblue: 2003199,firebrick: 11674146,floralwhite: 16775920,forestgreen: 2263842,fuchsia: 16711935,gainsboro: 14474460,ghostwhite: 16316671,gold: 16766720,goldenrod: 14329120,gray: 8421504,green: 32768,greenyellow: 11403055,grey: 8421504,honeydew: 15794160,hotpink: 16738740,indianred: 13458524,indigo: 4915330,ivory: 16777200,khaki: 15787660,lavender: 15132410,lavenderblush: 16773365,lawngreen: 8190976,lemonchiffon: 16775885,lightblue: 11393254,lightcoral: 15761536,lightcyan: 14745599,lightgoldenrodyellow: 16448210,lightgray: 13882323,lightgreen: 9498256,lightgrey: 13882323,lightpink: 16758465,lightsalmon: 16752762,lightseagreen: 2142890,lightskyblue: 8900346,lightslategray: 7833753,lightslategrey: 7833753,lightsteelblue: 11584734,lightyellow: 16777184,lime: 65280,limegreen: 3329330,linen: 16445670,magenta: 16711935,maroon: 8388608,mediumaquamarine: 6737322,mediumblue: 205,mediumorchid: 12211667,mediumpurple: 9662683,mediumseagreen: 3978097,mediumslateblue: 8087790,mediumspringgreen: 64154,mediumturquoise: 4772300,mediumvioletred: 13047173,midnightblue: 1644912,mintcream: 16121850,mistyrose: 16770273,moccasin: 16770229,navajowhite: 16768685,navy: 128,oldlace: 16643558,olive: 8421376,olivedrab: 7048739,orange: 16753920,orangered: 16729344,orchid: 14315734,palegoldenrod: 15657130,palegreen: 10025880,paleturquoise: 11529966,palevioletred: 14381203,papayawhip: 16773077,peachpuff: 16767673,peru: 13468991,pink: 16761035,plum: 14524637,powderblue: 11591910,purple: 8388736,red: 16711680,rosybrown: 12357519,royalblue: 4286945,saddlebrown: 9127187,salmon: 16416882,sandybrown: 16032864,seagreen: 3050327,seashell: 16774638,sienna: 10506797,silver: 12632256,skyblue: 8900331,slateblue: 6970061,slategray: 7372944,slategrey: 7372944,snow: 16775930,springgreen: 65407,steelblue: 4620980,tan: 13808780,teal: 32896,thistle: 14204888,tomato: 16737095,turquoise: 4251856,violet: 15631086,wheat: 16113331,white: 16777215,whitesmoke: 16119285,yellow: 16776960,yellowgreen: 10145074});
    Gs.forEach(function(t, e) {
        Gs.set(t, ce(e))
    }), Wa.functor = we, Wa.xhr = Le(xe), Wa.dsv = function(t, e) {
        function n(t, n, o) {
            arguments.length < 3 && (o = n, n = null);
            var a = Me(t, e, null == n ? i : r(n), o);
            return a.row = function(t) {
                return arguments.length ? a.response(null == (n = t) ? i : r(t)) : n
            }, a
        }
        function i(t) {
            return n.parse(t.responseText)
        }
        function r(t) {
            return function(e) {
                return n.parse(e.responseText, t)
            }
        }
        function o(e) {
            return e.map(a).join(t)
        }
        function a(t) {
            return s.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
        }
        var s = RegExp('["' + t + "\n]"), u = t.charCodeAt(0);
        return n.parse = function(t, e) {
            var i;
            return n.parseRows(t, function(t, n) {
                if (i)
                    return i(t, n - 1);
                var r = Function("d", "return {" + t.map(function(t, e) {
                    return JSON.stringify(t) + ": d[" + e + "]"
                }).join(",") + "}");
                i = e ? function(t, n) {
                    return e(r(t), n)
                } : r
            })
        }, n.parseRows = function(t, e) {
            function n() {
                if (h >= l)
                    return a;
                if (r)
                    return r = !1, o;
                var e = h;
                if (34 === t.charCodeAt(e)) {
                    for (var n = e; n++ < l; )
                        if (34 === t.charCodeAt(n)) {
                            if (34 !== t.charCodeAt(n + 1))
                                break;
                            ++n
                        }
                    h = n + 2;
                    var i = t.charCodeAt(n + 1);
                    return 13 === i ? (r = !0, 10 === t.charCodeAt(n + 2) && ++h) : 10 === i && (r = !0), t.substring(e + 1, n).replace(/""/g, '"')
                }
                for (; l > h; ) {
                    var i = t.charCodeAt(h++), s = 1;
                    if (10 === i)
                        r = !0;
                    else if (13 === i)
                        r = !0, 10 === t.charCodeAt(h) && (++h, ++s);
                    else if (i !== u)
                        continue;
                    return t.substring(e, h - s)
                }
                return t.substring(e)
            }
            for (var i, r, o = {}, a = {}, s = [], l = t.length, h = 0, c = 0; (i = n()) !== a; ) {
                for (var f = []; i !== o && i !== a; )
                    f.push(i), i = n();
                (!e || (f = e(f, c++))) && s.push(f)
            }
            return s
        }, n.format = function(e) {
            if (Array.isArray(e[0]))
                return n.formatRows(e);
            var i = new h, r = [];
            return e.forEach(function(t) {
                for (var e in t)
                    i.has(e) || r.push(i.add(e))
            }), [r.map(a).join(t)].concat(e.map(function(e) {
                return r.map(function(t) {
                    return a(e[t])
                }).join(t)
            })).join("\n")
        }, n.formatRows = function(t) {
            return t.map(o).join("\n")
        }, n
    }, Wa.csv = Wa.dsv(",", "text/csv"), Wa.tsv = Wa.dsv("	", "text/tab-separated-values");
    var Ws, Ys, Js, Xs, Ks, Qs = Qa[f(Qa, "requestAnimationFrame")] || function(t) {
        setTimeout(t, 17)
    };
    Wa.timer = function(t, e, n) {
        var i = arguments.length;
        2 > i && (e = 0), 3 > i && (n = Date.now());
        var r = n + e, o = {c: t,t: r,f: !1,n: null};
        Ys ? Ys.n = o : Ws = o, Ys = o, Js || (Xs = clearTimeout(Xs), Js = 1, Qs(Ce))
    }, Wa.timer.flush = function() {
        Pe(), Ae()
    }, Wa.round = function(t, e) {
        return e ? Math.round(t * (e = Math.pow(10, e))) / e : Math.round(t)
    };
    var $s = ["y", "z", "a", "f", "p", "n", "�", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Ee);
    Wa.formatPrefix = function(t, e) {
        var n = 0;
        return t && (0 > t && (t *= -1), e && (t = Wa.round(t, Se(t, e))), n = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), n = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= n ? n + 1 : n - 1) / 3)))), $s[8 + n / 3]
    };
    var tu = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, eu = Wa.map({b: function(t) {
            return t.toString(2)
        },c: function(t) {
            return String.fromCharCode(t)
        },o: function(t) {
            return t.toString(8)
        },x: function(t) {
            return t.toString(16)
        },X: function(t) {
            return t.toString(16).toUpperCase()
        },g: function(t, e) {
            return t.toPrecision(e)
        },e: function(t, e) {
            return t.toExponential(e)
        },f: function(t, e) {
            return t.toFixed(e)
        },r: function(t, e) {
            return (t = Wa.round(t, Se(t, e))).toFixed(Math.max(0, Math.min(20, Se(t * (1 + 1e-15), e))))
        }}), nu = Wa.time = {}, iu = Date;
    Ie.prototype = {getDate: function() {
            return this._.getUTCDate()
        },getDay: function() {
            return this._.getUTCDay()
        },getFullYear: function() {
            return this._.getUTCFullYear()
        },getHours: function() {
            return this._.getUTCHours()
        },getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },getMinutes: function() {
            return this._.getUTCMinutes()
        },getMonth: function() {
            return this._.getUTCMonth()
        },getSeconds: function() {
            return this._.getUTCSeconds()
        },getTime: function() {
            return this._.getTime()
        },getTimezoneOffset: function() {
            return 0
        },valueOf: function() {
            return this._.valueOf()
        },setDate: function() {
            ru.setUTCDate.apply(this._, arguments)
        },setDay: function() {
            ru.setUTCDay.apply(this._, arguments)
        },setFullYear: function() {
            ru.setUTCFullYear.apply(this._, arguments)
        },setHours: function() {
            ru.setUTCHours.apply(this._, arguments)
        },setMilliseconds: function() {
            ru.setUTCMilliseconds.apply(this._, arguments)
        },setMinutes: function() {
            ru.setUTCMinutes.apply(this._, arguments)
        },setMonth: function() {
            ru.setUTCMonth.apply(this._, arguments)
        },setSeconds: function() {
            ru.setUTCSeconds.apply(this._, arguments)
        },setTime: function() {
            ru.setTime.apply(this._, arguments)
        }};
    var ru = Date.prototype;
    nu.year = ze(function(t) {
        return t = nu.day(t), t.setMonth(0, 1), t
    }, function(t, e) {
        t.setFullYear(t.getFullYear() + e)
    }, function(t) {
        return t.getFullYear()
    }), nu.years = nu.year.range, nu.years.utc = nu.year.utc.range, nu.day = ze(function(t) {
        var e = new iu(2e3, 0);
        return e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), e
    }, function(t, e) {
        t.setDate(t.getDate() + e)
    }, function(t) {
        return t.getDate() - 1
    }), nu.days = nu.day.range, nu.days.utc = nu.day.utc.range, nu.dayOfYear = function(t) {
        var e = nu.year(t);
        return Math.floor((t - e - 6e4 * (t.getTimezoneOffset() - e.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, e) {
        e = 7 - e;
        var n = nu[t] = ze(function(t) {
            return (t = nu.day(t)).setDate(t.getDate() - (t.getDay() + e) % 7), t
        }, function(t, e) {
            t.setDate(t.getDate() + 7 * Math.floor(e))
        }, function(t) {
            var n = nu.year(t).getDay();
            return Math.floor((nu.dayOfYear(t) + (n + e) % 7) / 7) - (n !== e)
        });
        nu[t + "s"] = n.range, nu[t + "s"].utc = n.utc.range, nu[t + "OfYear"] = function(t) {
            var n = nu.year(t).getDay();
            return Math.floor((nu.dayOfYear(t) + (n + e) % 7) / 7)
        }
    }), nu.week = nu.sunday, nu.weeks = nu.sunday.range, nu.weeks.utc = nu.sunday.utc.range, nu.weekOfYear = nu.sundayOfYear;
    var ou = {"-": "",_: " ",0: "0"}, au = /^\s*\d+/, su = /^%/;
    Wa.locale = function(t) {
        return {numberFormat: Te(t),timeFormat: Be(t)}
    };
    var uu = Wa.locale({decimal: ".",thousands: ",",grouping: [3],currency: ["$", ""],dateTime: "%a %b %e %X %Y",date: "%m/%d/%Y",time: "%H:%M:%S",periods: ["AM", "PM"],days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]});
    Wa.format = uu.numberFormat, Wa.geo = {}, rn.prototype = {s: 0,t: 0,add: function(t) {
            on(t, this.t, lu), on(lu.s, this.s, this), this.s ? this.t += lu.t : this.s = lu.t
        },reset: function() {
            this.s = this.t = 0
        },valueOf: function() {
            return this.s
        }};
    var lu = new rn;
    Wa.geo.stream = function(t, e) {
        t && hu.hasOwnProperty(t.type) ? hu[t.type](t, e) : an(t, e)
    };
    var hu = {Feature: function(t, e) {
            an(t.geometry, e)
        },FeatureCollection: function(t, e) {
            for (var n = t.features, i = -1, r = n.length; ++i < r; )
                an(n[i].geometry, e)
        }}, cu = {Sphere: function(t, e) {
            e.sphere()
        },Point: function(t, e) {
            t = t.coordinates, e.point(t[0], t[1], t[2])
        },MultiPoint: function(t, e) {
            for (var n = t.coordinates, i = -1, r = n.length; ++i < r; )
                t = n[i], e.point(t[0], t[1], t[2])
        },LineString: function(t, e) {
            sn(t.coordinates, e, 0)
        },MultiLineString: function(t, e) {
            for (var n = t.coordinates, i = -1, r = n.length; ++i < r; )
                sn(n[i], e, 0)
        },Polygon: function(t, e) {
            un(t.coordinates, e)
        },MultiPolygon: function(t, e) {
            for (var n = t.coordinates, i = -1, r = n.length; ++i < r; )
                un(n[i], e)
        },GeometryCollection: function(t, e) {
            for (var n = t.geometries, i = -1, r = n.length; ++i < r; )
                an(n[i], e)
        }};
    Wa.geo.area = function(t) {
        return fu = 0, Wa.geo.stream(t, du), fu
    };
    var fu, pu = new rn, du = {sphere: function() {
            fu += 4 * ks
        },point: p,lineStart: p,lineEnd: p,polygonStart: function() {
            pu.reset(), du.lineStart = ln
        },polygonEnd: function() {
            var t = 2 * pu;
            fu += 0 > t ? 4 * ks + t : t, du.lineStart = du.lineEnd = du.point = p
        }};
    Wa.geo.bounds = function() {
        function t(t, e) {
            y.push(b = [h = t, f = t]), c > e && (c = e), e > p && (p = e)
        }
        function e(e, n) {
            var i = hn([e * Es, n * Es]);
            if (v) {
                var r = fn(v, i), o = [r[1], -r[0], 0], a = fn(o, r);
                mn(a), a = gn(a);
                var u = e - d, l = u > 0 ? 1 : -1, m = a[0] * Ts * l, g = ss(u) > 180;
                if (g ^ (m > l * d && l * e > m)) {
                    var _ = a[1] * Ts;
                    _ > p && (p = _)
                } else if (m = (m + 360) % 360 - 180, g ^ (m > l * d && l * e > m)) {
                    var _ = -a[1] * Ts;
                    c > _ && (c = _)
                } else
                    c > n && (c = n), n > p && (p = n);
                g ? d > e ? s(h, e) > s(h, f) && (f = e) : s(e, f) > s(h, f) && (h = e) : f >= h ? (h > e && (h = e), e > f && (f = e)) : e > d ? s(h, e) > s(h, f) && (f = e) : s(e, f) > s(h, f) && (h = e)
            } else
                t(e, n);
            v = i, d = e
        }
        function n() {
            w.point = e
        }
        function i() {
            b[0] = h, b[1] = f, w.point = t, v = null
        }
        function r(t, n) {
            if (v) {
                var i = t - d;
                _ += ss(i) > 180 ? i + (i > 0 ? 360 : -360) : i
            } else
                m = t, g = n;
            du.point(t, n), e(t, n)
        }
        function o() {
            du.lineStart()
        }
        function a() {
            r(m, g), du.lineEnd(), ss(_) > As && (h = -(f = 180)), b[0] = h, b[1] = f, v = null
        }
        function s(t, e) {
            return (e -= t) < 0 ? e + 360 : e
        }
        function u(t, e) {
            return t[0] - e[0]
        }
        function l(t, e) {
            return e[0] <= e[1] ? e[0] <= t && t <= e[1] : t < e[0] || e[1] < t
        }
        var h, c, f, p, d, m, g, v, _, y, b, w = {point: t,lineStart: n,lineEnd: i,polygonStart: function() {
                w.point = r, w.lineStart = o, w.lineEnd = a, _ = 0, du.polygonStart()
            },polygonEnd: function() {
                du.polygonEnd(), w.point = t, w.lineStart = n, w.lineEnd = i, 0 > pu ? (h = -(f = 180), c = -(p = 90)) : _ > As ? p = 90 : -As > _ && (c = -90), b[0] = h, b[1] = f
            }};
        return function(t) {
            p = f = -(h = c = 1 / 0), y = [], Wa.geo.stream(t, w);
            var e = y.length;
            if (e) {
                y.sort(u);
                for (var n, i = 1, r = y[0], o = [r]; e > i; ++i)
                    n = y[i], l(n[0], r) || l(n[1], r) ? (s(r[0], n[1]) > s(r[0], r[1]) && (r[1] = n[1]), s(n[0], r[1]) > s(r[0], r[1]) && (r[0] = n[0])) : o.push(r = n);
                for (var a, n, d = -1 / 0, e = o.length - 1, i = 0, r = o[e]; e >= i; r = n, ++i)
                    n = o[i], (a = s(r[1], n[0])) > d && (d = a, h = n[0], f = r[1])
            }
            return y = b = null, 1 / 0 === h || 1 / 0 === c ? [[0 / 0, 0 / 0], [0 / 0, 0 / 0]] : [[h, c], [f, p]]
        }
    }(), Wa.geo.centroid = function(t) {
        mu = gu = vu = _u = yu = bu = wu = xu = Lu = Mu = ku = 0, Wa.geo.stream(t, Cu);
        var e = Lu, n = Mu, i = ku, r = e * e + n * n + i * i;
        return Ss > r && (e = bu, n = wu, i = xu, As > gu && (e = vu, n = _u, i = yu), r = e * e + n * n + i * i, Ss > r) ? [0 / 0, 0 / 0] : [Math.atan2(n, e) * Ts, G(i / Math.sqrt(r)) * Ts]
    };
    var mu, gu, vu, _u, yu, bu, wu, xu, Lu, Mu, ku, Cu = {sphere: p,point: _n,lineStart: bn,lineEnd: wn,polygonStart: function() {
            Cu.lineStart = xn
        },polygonEnd: function() {
            Cu.lineStart = bn
        }}, Pu = Pn(Ln, Dn, zn, [-ks, -ks / 2]), Au = 1e9;
    Wa.geo.clipExtent = function() {
        var t, e, n, i, r, o, a = {stream: function(t) {
                return r && (r.valid = !1), r = o(t), r.valid = !0, r
            },extent: function(s) {
                return arguments.length ? (o = Nn(t = +s[0][0], e = +s[0][1], n = +s[1][0], i = +s[1][1]), r && (r.valid = !1, r = null), a) : [[t, e], [n, i]]
            }};
        return a.extent([[0, 0], [960, 500]])
    }, (Wa.geo.conicEqualArea = function() {
        return Rn(Fn)
    }).raw = Fn, Wa.geo.albers = function() {
        return Wa.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, Wa.geo.albersUsa = function() {
        function t(t) {
            var o = t[0], a = t[1];
            return e = null, n(o, a), e || (i(o, a), e) || r(o, a), e
        }
        var e, n, i, r, o = Wa.geo.albers(), a = Wa.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), s = Wa.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), u = {point: function(t, n) {
                e = [t, n]
            }};
        return t.invert = function(t) {
            var e = o.scale(), n = o.translate(), i = (t[0] - n[0]) / e, r = (t[1] - n[1]) / e;
            return (r >= .12 && .234 > r && i >= -.425 && -.214 > i ? a : r >= .166 && .234 > r && i >= -.214 && -.115 > i ? s : o).invert(t)
        }, t.stream = function(t) {
            var e = o.stream(t), n = a.stream(t), i = s.stream(t);
            return {point: function(t, r) {
                    e.point(t, r), n.point(t, r), i.point(t, r)
                },sphere: function() {
                    e.sphere(), n.sphere(), i.sphere()
                },lineStart: function() {
                    e.lineStart(), n.lineStart(), i.lineStart()
                },lineEnd: function() {
                    e.lineEnd(), n.lineEnd(), i.lineEnd()
                },polygonStart: function() {
                    e.polygonStart(), n.polygonStart(), i.polygonStart()
                },polygonEnd: function() {
                    e.polygonEnd(), n.polygonEnd(), i.polygonEnd()
                }}
        }, t.precision = function(e) {
            return arguments.length ? (o.precision(e), a.precision(e), s.precision(e), t) : o.precision()
        }, t.scale = function(e) {
            return arguments.length ? (o.scale(e), a.scale(.35 * e), s.scale(e), t.translate(o.translate())) : o.scale()
        }, t.translate = function(e) {
            if (!arguments.length)
                return o.translate();
            var l = o.scale(), h = +e[0], c = +e[1];
            return n = o.translate(e).clipExtent([[h - .455 * l, c - .238 * l], [h + .455 * l, c + .238 * l]]).stream(u).point, i = a.translate([h - .307 * l, c + .201 * l]).clipExtent([[h - .425 * l + As, c + .12 * l + As], [h - .214 * l - As, c + .234 * l - As]]).stream(u).point, r = s.translate([h - .205 * l, c + .212 * l]).clipExtent([[h - .214 * l + As, c + .166 * l + As], [h - .115 * l - As, c + .234 * l - As]]).stream(u).point, t
        }, t.scale(1070)
    };
    var Su, Eu, Tu, Du, Iu, zu, Ou = {point: p,lineStart: p,lineEnd: p,polygonStart: function() {
            Eu = 0, Ou.lineStart = Zn
        },polygonEnd: function() {
            Ou.lineStart = Ou.lineEnd = Ou.point = p, Su += ss(Eu / 2)
        }}, Bu = {point: jn,lineStart: p,lineEnd: p,polygonStart: p,polygonEnd: p}, Nu = {point: Hn,lineStart: Gn,lineEnd: Wn,polygonStart: function() {
            Nu.lineStart = Yn
        },polygonEnd: function() {
            Nu.point = Hn, Nu.lineStart = Gn, Nu.lineEnd = Wn
        }};
    Wa.geo.path = function() {
        function t(t) {
            return t && ("function" == typeof s && o.pointRadius(+s.apply(this, arguments)), a && a.valid || (a = r(o)), Wa.geo.stream(t, a)), o.result()
        }
        function e() {
            return a = null, t
        }
        var n, i, r, o, a, s = 4.5;
        return t.area = function(t) {
            return Su = 0, Wa.geo.stream(t, r(Ou)), Su
        }, t.centroid = function(t) {
            return vu = _u = yu = bu = wu = xu = Lu = Mu = ku = 0, Wa.geo.stream(t, r(Nu)), ku ? [Lu / ku, Mu / ku] : xu ? [bu / xu, wu / xu] : yu ? [vu / yu, _u / yu] : [0 / 0, 0 / 0]
        }, t.bounds = function(t) {
            return Iu = zu = -(Tu = Du = 1 / 0), Wa.geo.stream(t, r(Bu)), [[Tu, Du], [Iu, zu]]
        }, t.projection = function(t) {
            return arguments.length ? (r = (n = t) ? t.stream || Kn(t) : xe, e()) : n
        }, t.context = function(t) {
            return arguments.length ? (o = null == (i = t) ? new Vn : new Jn(t), "function" != typeof s && o.pointRadius(s), e()) : i
        }, t.pointRadius = function(e) {
            return arguments.length ? (s = "function" == typeof e ? e : (o.pointRadius(+e), +e), t) : s
        }, t.projection(Wa.geo.albersUsa()).context(null)
    }, Wa.geo.transform = function(t) {
        return {stream: function(e) {
                var n = new Qn(e);
                for (var i in t)
                    n[i] = t[i];
                return n
            }}
    }, Qn.prototype = {point: function(t, e) {
            this.stream.point(t, e)
        },sphere: function() {
            this.stream.sphere()
        },lineStart: function() {
            this.stream.lineStart()
        },lineEnd: function() {
            this.stream.lineEnd()
        },polygonStart: function() {
            this.stream.polygonStart()
        },polygonEnd: function() {
            this.stream.polygonEnd()
        }}, Wa.geo.projection = ti, Wa.geo.projectionMutator = ei, (Wa.geo.equirectangular = function() {
        return ti(ii)
    }).raw = ii.invert = ii, Wa.geo.rotation = function(t) {
        function e(e) {
            return e = t(e[0] * Es, e[1] * Es), e[0] *= Ts, e[1] *= Ts, e
        }
        return t = oi(t[0] % 360 * Es, t[1] * Es, t.length > 2 ? t[2] * Es : 0), e.invert = function(e) {
            return e = t.invert(e[0] * Es, e[1] * Es), e[0] *= Ts, e[1] *= Ts, e
        }, e
    }, ri.invert = ii, Wa.geo.circle = function() {
        function t() {
            var t = "function" == typeof i ? i.apply(this, arguments) : i, e = oi(-t[0] * Es, -t[1] * Es, 0).invert, r = [];
            return n(null, null, 1, {point: function(t, n) {
                    r.push(t = e(t, n)), t[0] *= Ts, t[1] *= Ts
                }}), {type: "Polygon",coordinates: [r]}
        }
        var e, n, i = [0, 0], r = 6;
        return t.origin = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t.angle = function(i) {
            return arguments.length ? (n = li((e = +i) * Es, r * Es), t) : e
        }, t.precision = function(i) {
            return arguments.length ? (n = li(e * Es, (r = +i) * Es), t) : r
        }, t.angle(90)
    }, Wa.geo.distance = function(t, e) {
        var n, i = (e[0] - t[0]) * Es, r = t[1] * Es, o = e[1] * Es, a = Math.sin(i), s = Math.cos(i), u = Math.sin(r), l = Math.cos(r), h = Math.sin(o), c = Math.cos(o);
        return Math.atan2(Math.sqrt((n = c * a) * n + (n = l * h - u * c * s) * n), u * h + l * c * s)
    }, Wa.geo.graticule = function() {
        function t() {
            return {type: "MultiLineString",coordinates: e()}
        }
        function e() {
            return Wa.range(Math.ceil(o / g) * g, r, g).map(f).concat(Wa.range(Math.ceil(l / v) * v, u, v).map(p)).concat(Wa.range(Math.ceil(i / d) * d, n, d).filter(function(t) {
                return ss(t % g) > As
            }).map(h)).concat(Wa.range(Math.ceil(s / m) * m, a, m).filter(function(t) {
                return ss(t % v) > As
            }).map(c))
        }
        var n, i, r, o, a, s, u, l, h, c, f, p, d = 10, m = d, g = 90, v = 360, _ = 2.5;
        return t.lines = function() {
            return e().map(function(t) {
                return {type: "LineString",coordinates: t}
            })
        }, t.outline = function() {
            return {type: "Polygon",coordinates: [f(o).concat(p(u).slice(1), f(r).reverse().slice(1), p(l).reverse().slice(1))]}
        }, t.extent = function(e) {
            return arguments.length ? t.majorExtent(e).minorExtent(e) : t.minorExtent()
        }, t.majorExtent = function(e) {
            return arguments.length ? (o = +e[0][0], r = +e[1][0], l = +e[0][1], u = +e[1][1], o > r && (e = o, o = r, r = e), l > u && (e = l, l = u, u = e), t.precision(_)) : [[o, l], [r, u]]
        }, t.minorExtent = function(e) {
            return arguments.length ? (i = +e[0][0], n = +e[1][0], s = +e[0][1], a = +e[1][1], i > n && (e = i, i = n, n = e), s > a && (e = s, s = a, a = e), t.precision(_)) : [[i, s], [n, a]]
        }, t.step = function(e) {
            return arguments.length ? t.majorStep(e).minorStep(e) : t.minorStep()
        }, t.majorStep = function(e) {
            return arguments.length ? (g = +e[0], v = +e[1], t) : [g, v]
        }, t.minorStep = function(e) {
            return arguments.length ? (d = +e[0], m = +e[1], t) : [d, m]
        }, t.precision = function(e) {
            return arguments.length ? (_ = +e, h = ci(s, a, 90), c = fi(i, n, _), f = ci(l, u, 90), p = fi(o, r, _), t) : _
        }, t.majorExtent([[-180, -90 + As], [180, 90 - As]]).minorExtent([[-180, -80 - As], [180, 80 + As]])
    }, Wa.geo.greatArc = function() {
        function t() {
            return {type: "LineString",coordinates: [e || i.apply(this, arguments), n || r.apply(this, arguments)]}
        }
        var e, n, i = pi, r = di;
        return t.distance = function() {
            return Wa.geo.distance(e || i.apply(this, arguments), n || r.apply(this, arguments))
        }, t.source = function(n) {
            return arguments.length ? (i = n, e = "function" == typeof n ? null : n, t) : i
        }, t.target = function(e) {
            return arguments.length ? (r = e, n = "function" == typeof e ? null : e, t) : r
        }, t.precision = function() {
            return arguments.length ? t : 0
        }, t
    }, Wa.geo.interpolate = function(t, e) {
        return mi(t[0] * Es, t[1] * Es, e[0] * Es, e[1] * Es)
    }, Wa.geo.length = function(t) {
        return Uu = 0, Wa.geo.stream(t, Ru), Uu
    };
    var Uu, Ru = {sphere: p,point: p,lineStart: gi,lineEnd: p,polygonStart: p,polygonEnd: p}, Fu = vi(function(t) {
        return Math.sqrt(2 / (1 + t))
    }, function(t) {
        return 2 * Math.asin(t / 2)
    });
    (Wa.geo.azimuthalEqualArea = function() {
        return ti(Fu)
    }).raw = Fu;
    var Zu = vi(function(t) {
        var e = Math.acos(t);
        return e && e / Math.sin(e)
    }, xe);
    (Wa.geo.azimuthalEquidistant = function() {
        return ti(Zu)
    }).raw = Zu, (Wa.geo.conicConformal = function() {
        return Rn(_i)
    }).raw = _i, (Wa.geo.conicEquidistant = function() {
        return Rn(yi)
    }).raw = yi;
    var ju = vi(function(t) {
        return 1 / t
    }, Math.atan);
    (Wa.geo.gnomonic = function() {
        return ti(ju)
    }).raw = ju, bi.invert = function(t, e) {
        return [t, 2 * Math.atan(Math.exp(e)) - Ps]
    }, (Wa.geo.mercator = function() {
        return wi(bi)
    }).raw = bi;
    var Vu = vi(function() {
        return 1
    }, Math.asin);
    (Wa.geo.orthographic = function() {
        return ti(Vu)
    }).raw = Vu;
    var qu = vi(function(t) {
        return 1 / (1 + t)
    }, function(t) {
        return 2 * Math.atan(t)
    });
    (Wa.geo.stereographic = function() {
        return ti(qu)
    }).raw = qu, xi.invert = function(t, e) {
        return [-e, 2 * Math.atan(Math.exp(t)) - Ps]
    }, (Wa.geo.transverseMercator = function() {
        var t = wi(xi), e = t.center, n = t.rotate;
        return t.center = function(t) {
            return t ? e([-t[1], t[0]]) : (t = e(), [-t[1], t[0]])
        }, t.rotate = function(t) {
            return t ? n([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = n(), [t[0], t[1], t[2] - 90])
        }, t.rotate([0, 0])
    }).raw = xi, Wa.geom = {}, Wa.geom.hull = function(t) {
        function e(t) {
            if (t.length < 3)
                return [];
            var e, r = we(n), o = we(i), a = t.length, s = [], u = [];
            for (e = 0; a > e; e++)
                s.push([+r.call(this, t[e], e), +o.call(this, t[e], e), e]);
            for (s.sort(Ci), e = 0; a > e; e++)
                u.push([s[e][0], -s[e][1]]);
            var l = ki(s), h = ki(u), c = h[0] === l[0], f = h[h.length - 1] === l[l.length - 1], p = [];
            for (e = l.length - 1; e >= 0; --e)
                p.push(t[s[l[e]][2]]);
            for (e = +c; e < h.length - f; ++e)
                p.push(t[s[h[e]][2]]);
            return p
        }
        var n = Li, i = Mi;
        return arguments.length ? e(t) : (e.x = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.y = function(t) {
            return arguments.length ? (i = t, e) : i
        }, e)
    }, Wa.geom.polygon = function(t) {
        return fs(t, Hu), t
    };
    var Hu = Wa.geom.polygon.prototype = [];
    Hu.area = function() {
        for (var t, e = -1, n = this.length, i = this[n - 1], r = 0; ++e < n; )
            t = i, i = this[e], r += t[1] * i[0] - t[0] * i[1];
        return .5 * r
    }, Hu.centroid = function(t) {
        var e, n, i = -1, r = this.length, o = 0, a = 0, s = this[r - 1];
        for (arguments.length || (t = -1 / (6 * this.area())); ++i < r; )
            e = s, s = this[i], n = e[0] * s[1] - s[0] * e[1], o += (e[0] + s[0]) * n, a += (e[1] + s[1]) * n;
        return [o * t, a * t]
    }, Hu.clip = function(t) {
        for (var e, n, i, r, o, a, s = Si(t), u = -1, l = this.length - Si(this), h = this[l - 1]; ++u < l; ) {
            for (e = t.slice(), t.length = 0, r = this[u], o = e[(i = e.length - s) - 1], n = -1; ++n < i; )
                a = e[n], Pi(a, h, r) ? (Pi(o, h, r) || t.push(Ai(o, a, h, r)), t.push(a)) : Pi(o, h, r) && t.push(Ai(o, a, h, r)), o = a;
            s && t.push(t[0]), h = r
        }
        return t
    };
    var Gu, Wu, Yu, Ju, Xu, Ku = [], Qu = [];
    Ni.prototype.prepare = function() {
        for (var t, e = this.edges, n = e.length; n--; )
            t = e[n].edge, t.b && t.a || e.splice(n, 1);
        return e.sort(Ri), e.length
    }, Ji.prototype = {start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }}, Xi.prototype = {insert: function(t, e) {
            var n, i, r;
            if (t) {
                if (e.P = t, e.N = t.N, t.N && (t.N.P = e), t.N = e, t.R) {
                    for (t = t.R; t.L; )
                        t = t.L;
                    t.L = e
                } else
                    t.R = e;
                n = t
            } else
                this._ ? (t = tr(this._), e.P = null, e.N = t, t.P = t.L = e, n = t) : (e.P = e.N = null, this._ = e, n = null);
            for (e.L = e.R = null, e.U = n, e.C = !0, t = e; n && n.C; )
                i = n.U, n === i.L ? (r = i.R, r && r.C ? (n.C = r.C = !1, i.C = !0, t = i) : (t === n.R && (Qi(this, n), t = n, n = t.U), n.C = !1, i.C = !0, $i(this, i))) : (r = i.L, r && r.C ? (n.C = r.C = !1, i.C = !0, t = i) : (t === n.L && ($i(this, n), t = n, n = t.U), n.C = !1, i.C = !0, Qi(this, i))), n = t.U;
            this._.C = !1
        },remove: function(t) {
            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
            var e, n, i, r = t.U, o = t.L, a = t.R;
            if (n = o ? a ? tr(a) : o : a, r ? r.L === t ? r.L = n : r.R = n : this._ = n, o && a ? (i = n.C, n.C = t.C, n.L = o, o.U = n, n !== a ? (r = n.U, n.U = t.U, t = n.R, r.L = t, n.R = a, a.U = n) : (n.U = r, r = n, t = n.R)) : (i = t.C, t = n), t && (t.U = r), !i) {
                if (t && t.C)
                    return t.C = !1, void 0;
                do {
                    if (t === this._)
                        break;
                    if (t === r.L) {
                        if (e = r.R, e.C && (e.C = !1, r.C = !0, Qi(this, r), e = r.R), e.L && e.L.C || e.R && e.R.C) {
                            e.R && e.R.C || (e.L.C = !1, e.C = !0, $i(this, e), e = r.R), e.C = r.C, r.C = e.R.C = !1, Qi(this, r), t = this._;
                            break
                        }
                    } else if (e = r.L, e.C && (e.C = !1, r.C = !0, $i(this, r), e = r.L), e.L && e.L.C || e.R && e.R.C) {
                        e.L && e.L.C || (e.R.C = !1, e.C = !0, Qi(this, e), e = r.L), e.C = r.C, r.C = e.L.C = !1, $i(this, r), t = this._;
                        break
                    }
                    e.C = !0, t = r, r = r.U
                } while (!t.C);
                t && (t.C = !1)
            }
        }}, Wa.geom.voronoi = function(t) {
        function e(t) {
            var e = Array(t.length), i = s[0][0], r = s[0][1], o = s[1][0], a = s[1][1];
            return er(n(t), s).cells.forEach(function(n, s) {
                var u = n.edges, l = n.site, h = e[s] = u.length ? u.map(function(t) {
                    var e = t.start();
                    return [e.x, e.y]
                }) : l.x >= i && l.x <= o && l.y >= r && l.y <= a ? [[i, a], [o, a], [o, r], [i, r]] : [];
                h.point = t[s]
            }), e
        }
        function n(t) {
            return t.map(function(t, e) {
                return {x: Math.round(o(t, e) / As) * As,y: Math.round(a(t, e) / As) * As,i: e}
            })
        }
        var i = Li, r = Mi, o = i, a = r, s = $u;
        return t ? e(t) : (e.links = function(t) {
            return er(n(t)).edges.filter(function(t) {
                return t.l && t.r
            }).map(function(e) {
                return {source: t[e.l.i],target: t[e.r.i]}
            })
        }, e.triangles = function(t) {
            var e = [];
            return er(n(t)).cells.forEach(function(n, i) {
                for (var r, o, a = n.site, s = n.edges.sort(Ri), u = -1, l = s.length, h = s[l - 1].edge, c = h.l === a ? h.r : h.l; ++u < l; )
                    r = h, o = c, h = s[u].edge, c = h.l === a ? h.r : h.l, i < o.i && i < c.i && ir(a, o, c) < 0 && e.push([t[i], t[o.i], t[c.i]])
            }), e
        }, e.x = function(t) {
            return arguments.length ? (o = we(i = t), e) : i
        }, e.y = function(t) {
            return arguments.length ? (a = we(r = t), e) : r
        }, e.clipExtent = function(t) {
            return arguments.length ? (s = null == t ? $u : t, e) : s === $u ? null : s
        }, e.size = function(t) {
            return arguments.length ? e.clipExtent(t && [[0, 0], t]) : s === $u ? null : s && s[1]
        }, e)
    };
    var $u = [[-1e6, -1e6], [1e6, 1e6]];
    Wa.geom.delaunay = function(t) {
        return Wa.geom.voronoi().triangles(t)
    }, Wa.geom.quadtree = function(t, e, n, i, r) {
        function o(t) {
            function o(t, e, n, i, r, o, a, s) {
                if (!isNaN(n) && !isNaN(i))
                    if (t.leaf) {
                        var u = t.x, h = t.y;
                        if (null != u)
                            if (ss(u - n) + ss(h - i) < .01)
                                l(t, e, n, i, r, o, a, s);
                            else {
                                var c = t.point;
                                t.x = t.y = t.point = null, l(t, c, u, h, r, o, a, s), l(t, e, n, i, r, o, a, s)
                            }
                        else
                            t.x = n, t.y = i, t.point = e
                    } else
                        l(t, e, n, i, r, o, a, s)
            }
            function l(t, e, n, i, r, a, s, u) {
                var l = .5 * (r + s), h = .5 * (a + u), c = n >= l, f = i >= h, p = (f << 1) + c;
                t.leaf = !1, t = t.nodes[p] || (t.nodes[p] = ar()), c ? r = l : s = l, f ? a = h : u = h, o(t, e, n, i, r, a, s, u)
            }
            var h, c, f, p, d, m, g, v, _, y = we(s), b = we(u);
            if (null != e)
                m = e, g = n, v = i, _ = r;
            else if (v = _ = -(m = g = 1 / 0), c = [], f = [], d = t.length, a)
                for (p = 0; d > p; ++p)
                    h = t[p], h.x < m && (m = h.x), h.y < g && (g = h.y), h.x > v && (v = h.x), h.y > _ && (_ = h.y), c.push(h.x), f.push(h.y);
            else
                for (p = 0; d > p; ++p) {
                    var w = +y(h = t[p], p), x = +b(h, p);
                    m > w && (m = w), g > x && (g = x), w > v && (v = w), x > _ && (_ = x), c.push(w), f.push(x)
                }
            var L = v - m, M = _ - g;
            L > M ? _ = g + L : v = m + M;
            var k = ar();
            if (k.add = function(t) {
                o(k, t, +y(t, ++p), +b(t, p), m, g, v, _)
            }, k.visit = function(t) {
                sr(t, k, m, g, v, _)
            }, p = -1, null == e) {
                for (; ++p < d; )
                    o(k, t[p], c[p], f[p], m, g, v, _);
                --p
            } else
                t.forEach(k.add);
            return c = f = t = h = null, k
        }
        var a, s = Li, u = Mi;
        return (a = arguments.length) ? (s = rr, u = or, 3 === a && (r = n, i = e, n = e = 0), o(t)) : (o.x = function(t) {
            return arguments.length ? (s = t, o) : s
        }, o.y = function(t) {
            return arguments.length ? (u = t, o) : u
        }, o.extent = function(t) {
            return arguments.length ? (null == t ? e = n = i = r = null : (e = +t[0][0], n = +t[0][1], i = +t[1][0], r = +t[1][1]), o) : null == e ? null : [[e, n], [i, r]]
        }, o.size = function(t) {
            return arguments.length ? (null == t ? e = n = i = r = null : (e = n = 0, i = +t[0], r = +t[1]), o) : null == e ? null : [i - e, r - n]
        }, o)
    }, Wa.interpolateRgb = ur, Wa.interpolateObject = lr, Wa.interpolateNumber = hr, Wa.interpolateString = cr;
    var tl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    Wa.interpolate = fr, Wa.interpolators = [function(t, e) {
            var n = typeof e;
            return ("string" === n ? Gs.has(e) || /^(#|rgb\(|hsl\()/.test(e) ? ur : cr : e instanceof K ? ur : "object" === n ? Array.isArray(e) ? pr : lr : hr)(t, e)
        }], Wa.interpolateArray = pr;
    var el = function() {
        return xe
    }, nl = Wa.map({linear: el,poly: br,quad: function() {
            return vr
        },cubic: function() {
            return _r
        },sin: function() {
            return wr
        },exp: function() {
            return xr
        },circle: function() {
            return Lr
        },elastic: Mr,back: kr,bounce: function() {
            return Cr
        }}), il = Wa.map({"in": xe,out: mr,"in-out": gr,"out-in": function(t) {
            return gr(mr(t))
        }});
    Wa.ease = function(t) {
        var e = t.indexOf("-"), n = e >= 0 ? t.substring(0, e) : t, i = e >= 0 ? t.substring(e + 1) : "in";
        return n = nl.get(n) || el, i = il.get(i) || xe, dr(i(n.apply(null, Ya.call(arguments, 1))))
    }, Wa.interpolateHcl = Pr, Wa.interpolateHsl = Ar, Wa.interpolateLab = Sr, Wa.interpolateRound = Er, Wa.transform = function(t) {
        var e = Xa.createElementNS(Wa.ns.prefix.svg, "g");
        return (Wa.transform = function(t) {
            if (null != t) {
                e.setAttribute("transform", t);
                var n = e.transform.baseVal.consolidate()
            }
            return new Tr(n ? n.matrix : rl)
        })(t)
    }, Tr.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var rl = {a: 1,b: 0,c: 0,d: 1,e: 0,f: 0};
    Wa.interpolateTransform = Or, Wa.layout = {}, Wa.layout.bundle = function() {
        return function(t) {
            for (var e = [], n = -1, i = t.length; ++n < i; )
                e.push(Ur(t[n]));
            return e
        }
    }, Wa.layout.chord = function() {
        function t() {
            var t, l, c, f, p, d = {}, m = [], g = Wa.range(o), v = [];
            for (n = [], i = [], t = 0, f = -1; ++f < o; ) {
                for (l = 0, p = -1; ++p < o; )
                    l += r[f][p];
                m.push(l), v.push(Wa.range(o)), t += l
            }
            for (a && g.sort(function(t, e) {
                return a(m[t], m[e])
            }), s && v.forEach(function(t, e) {
                t.sort(function(t, n) {
                    return s(r[e][t], r[e][n])
                })
            }), t = (Cs - h * o) / t, l = 0, f = -1; ++f < o; ) {
                for (c = l, p = -1; ++p < o; ) {
                    var _ = g[f], y = v[_][p], b = r[_][y], w = l, x = l += b * t;
                    d[_ + "-" + y] = {index: _,subindex: y,startAngle: w,endAngle: x,value: b}
                }
                i[_] = {index: _,startAngle: c,endAngle: l,value: (l - c) / t}, l += h
            }
            for (f = -1; ++f < o; )
                for (p = f - 1; ++p < o; ) {
                    var L = d[f + "-" + p], M = d[p + "-" + f];
                    (L.value || M.value) && n.push(L.value < M.value ? {source: M,target: L} : {source: L,target: M})
                }
            u && e()
        }
        function e() {
            n.sort(function(t, e) {
                return u((t.source.value + t.target.value) / 2, (e.source.value + e.target.value) / 2)
            })
        }
        var n, i, r, o, a, s, u, l = {}, h = 0;
        return l.matrix = function(t) {
            return arguments.length ? (o = (r = t) && r.length, n = i = null, l) : r
        }, l.padding = function(t) {
            return arguments.length ? (h = t, n = i = null, l) : h
        }, l.sortGroups = function(t) {
            return arguments.length ? (a = t, n = i = null, l) : a
        }, l.sortSubgroups = function(t) {
            return arguments.length ? (s = t, n = null, l) : s
        }, l.sortChords = function(t) {
            return arguments.length ? (u = t, n && e(), l) : u
        }, l.chords = function() {
            return n || t(), n
        }, l.groups = function() {
            return i || t(), i
        }, l
    }, Wa.layout.force = function() {
        function t(t) {
            return function(e, n, i, r) {
                if (e.point !== t) {
                    var o = e.cx - t.x, a = e.cy - t.y, s = r - n, u = o * o + a * a;
                    if (u > s * s / g) {
                        if (d > u) {
                            var l = e.charge / u;
                            t.px -= o * l, t.py -= a * l
                        }
                        return !0
                    }
                    if (e.point && u && d > u) {
                        var l = e.pointCharge / u;
                        t.px -= o * l, t.py -= a * l
                    }
                }
                return !e.charge
            }
        }
        function e(t) {
            t.px = Wa.event.x, t.py = Wa.event.y, s.resume()
        }
        var n, i, r, o, a, s = {}, u = Wa.dispatch("start", "tick", "end"), l = [1, 1], h = .9, c = ol, f = al, p = -30, d = sl, m = .1, g = .64, v = [], _ = [];
        return s.tick = function() {
            if ((i *= .99) < .005)
                return u.end({type: "end",alpha: i = 0}), !0;
            var e, n, s, c, f, d, g, y, b, w = v.length, x = _.length;
            for (n = 0; x > n; ++n)
                s = _[n], c = s.source, f = s.target, y = f.x - c.x, b = f.y - c.y, (d = y * y + b * b) && (d = i * o[n] * ((d = Math.sqrt(d)) - r[n]) / d, y *= d, b *= d, f.x -= y * (g = c.weight / (f.weight + c.weight)), f.y -= b * g, c.x += y * (g = 1 - g), c.y += b * g);
            if ((g = i * m) && (y = l[0] / 2, b = l[1] / 2, n = -1, g))
                for (; ++n < w; )
                    s = v[n], s.x += (y - s.x) * g, s.y += (b - s.y) * g;
            if (p)
                for (Hr(e = Wa.geom.quadtree(v), i, a), n = -1; ++n < w; )
                    (s = v[n]).fixed || e.visit(t(s));
            for (n = -1; ++n < w; )
                s = v[n], s.fixed ? (s.x = s.px, s.y = s.py) : (s.x -= (s.px - (s.px = s.x)) * h, s.y -= (s.py - (s.py = s.y)) * h);
            u.tick({type: "tick",alpha: i})
        }, s.nodes = function(t) {
            return arguments.length ? (v = t, s) : v
        }, s.links = function(t) {
            return arguments.length ? (_ = t, s) : _
        }, s.size = function(t) {
            return arguments.length ? (l = t, s) : l
        }, s.linkDistance = function(t) {
            return arguments.length ? (c = "function" == typeof t ? t : +t, s) : c
        }, s.distance = s.linkDistance, s.linkStrength = function(t) {
            return arguments.length ? (f = "function" == typeof t ? t : +t, s) : f
        }, s.friction = function(t) {
            return arguments.length ? (h = +t, s) : h
        }, s.charge = function(t) {
            return arguments.length ? (p = "function" == typeof t ? t : +t, s) : p
        }, s.chargeDistance = function(t) {
            return arguments.length ? (d = t * t, s) : Math.sqrt(d)
        }, s.gravity = function(t) {
            return arguments.length ? (m = +t, s) : m
        }, s.theta = function(t) {
            return arguments.length ? (g = t * t, s) : Math.sqrt(g)
        }, s.alpha = function(t) {
            return arguments.length ? (t = +t, i ? i = t > 0 ? t : 0 : t > 0 && (u.start({type: "start",alpha: i = t}), Wa.timer(s.tick)), s) : i
        }, s.start = function() {
            function t(t, i) {
                if (!n) {
                    for (n = Array(u), s = 0; u > s; ++s)
                        n[s] = [];
                    for (s = 0; l > s; ++s) {
                        var r = _[s];
                        n[r.source.index].push(r.target), n[r.target.index].push(r.source)
                    }
                }
                for (var o, a = n[e], s = -1, l = a.length; ++s < l; )
                    if (!isNaN(o = a[s][t]))
                        return o;
                return Math.random() * i
            }
            var e, n, i, u = v.length, h = _.length, d = l[0], m = l[1];
            for (e = 0; u > e; ++e)
                (i = v[e]).index = e, i.weight = 0;
            for (e = 0; h > e; ++e)
                i = _[e], "number" == typeof i.source && (i.source = v[i.source]), "number" == typeof i.target && (i.target = v[i.target]), ++i.source.weight, ++i.target.weight;
            for (e = 0; u > e; ++e)
                i = v[e], isNaN(i.x) && (i.x = t("x", d)), isNaN(i.y) && (i.y = t("y", m)), isNaN(i.px) && (i.px = i.x), isNaN(i.py) && (i.py = i.y);
            if (r = [], "function" == typeof c)
                for (e = 0; h > e; ++e)
                    r[e] = +c.call(this, _[e], e);
            else
                for (e = 0; h > e; ++e)
                    r[e] = c;
            if (o = [], "function" == typeof f)
                for (e = 0; h > e; ++e)
                    o[e] = +f.call(this, _[e], e);
            else
                for (e = 0; h > e; ++e)
                    o[e] = f;
            if (a = [], "function" == typeof p)
                for (e = 0; u > e; ++e)
                    a[e] = +p.call(this, v[e], e);
            else
                for (e = 0; u > e; ++e)
                    a[e] = p;
            return s.resume()
        }, s.resume = function() {
            return s.alpha(.1)
        }, s.stop = function() {
            return s.alpha(0)
        }, s.drag = function() {
            return n || (n = Wa.behavior.drag().origin(xe).on("dragstart.force", Zr).on("drag.force", e).on("dragend.force", jr)), arguments.length ? (this.on("mouseover.force", Vr).on("mouseout.force", qr).call(n), void 0) : n
        }, Wa.rebind(s, u, "on")
    };
    var ol = 20, al = 1, sl = 1 / 0;
    Wa.layout.hierarchy = function() {
        function t(e, a, s) {
            var u = r.call(n, e, a);
            if (e.depth = a, s.push(e), u && (l = u.length)) {
                for (var l, h, c = -1, f = e.children = Array(l), p = 0, d = a + 1; ++c < l; )
                    h = f[c] = t(u[c], d, s), h.parent = e, p += h.value;
                i && f.sort(i), o && (e.value = p)
            } else
                delete e.children, o && (e.value = +o.call(n, e, a) || 0);
            return e
        }
        function e(t, i) {
            var r = t.children, a = 0;
            if (r && (s = r.length))
                for (var s, u = -1, l = i + 1; ++u < s; )
                    a += e(r[u], l);
            else
                o && (a = +o.call(n, t, i) || 0);
            return o && (t.value = a), a
        }
        function n(e) {
            var n = [];
            return t(e, 0, n), n
        }
        var i = Jr, r = Wr, o = Yr;
        return n.sort = function(t) {
            return arguments.length ? (i = t, n) : i
        }, n.children = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.value = function(t) {
            return arguments.length ? (o = t, n) : o
        }, n.revalue = function(t) {
            return e(t, 0), t
        }, n
    }, Wa.layout.partition = function() {
        function t(e, n, i, r) {
            var o = e.children;
            if (e.x = n, e.y = e.depth * r, e.dx = i, e.dy = r, o && (a = o.length)) {
                var a, s, u, l = -1;
                for (i = e.value ? i / e.value : 0; ++l < a; )
                    t(s = o[l], n, u = s.value * i, r), n += u
            }
        }
        function e(t) {
            var n = t.children, i = 0;
            if (n && (r = n.length))
                for (var r, o = -1; ++o < r; )
                    i = Math.max(i, e(n[o]));
            return 1 + i
        }
        function n(n, o) {
            var a = i.call(this, n, o);
            return t(a[0], 0, r[0], r[1] / e(a[0])), a
        }
        var i = Wa.layout.hierarchy(), r = [1, 1];
        return n.size = function(t) {
            return arguments.length ? (r = t, n) : r
        }, Gr(n, i)
    }, Wa.layout.pie = function() {
        function t(o) {
            var a = o.map(function(n, i) {
                return +e.call(t, n, i)
            }), s = +("function" == typeof i ? i.apply(this, arguments) : i), u = (("function" == typeof r ? r.apply(this, arguments) : r) - s) / Wa.sum(a), l = Wa.range(o.length);
            null != n && l.sort(n === ul ? function(t, e) {
                return a[e] - a[t]
            } : function(t, e) {
                return n(o[t], o[e])
            });
            var h = [];
            return l.forEach(function(t) {
                var e;
                h[t] = {data: o[t],value: e = a[t],startAngle: s,endAngle: s += e * u}
            }), h
        }
        var e = Number, n = ul, i = 0, r = Cs;
        return t.value = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.sort = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.startAngle = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t.endAngle = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t
    };
    var ul = {};
    Wa.layout.stack = function() {
        function t(s, u) {
            var l = s.map(function(n, i) {
                return e.call(t, n, i)
            }), h = l.map(function(e) {
                return e.map(function(e, n) {
                    return [o.call(t, e, n), a.call(t, e, n)]
                })
            }), c = n.call(t, h, u);
            l = Wa.permute(l, c), h = Wa.permute(h, c);
            var f, p, d, m = i.call(t, h, u), g = l.length, v = l[0].length;
            for (p = 0; v > p; ++p)
                for (r.call(t, l[0][p], d = m[p], h[0][p][1]), f = 1; g > f; ++f)
                    r.call(t, l[f][p], d += h[f - 1][p][1], h[f][p][1]);
            return s
        }
        var e = xe, n = to, i = eo, r = $r, o = Kr, a = Qr;
        return t.values = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.order = function(e) {
            return arguments.length ? (n = "function" == typeof e ? e : ll.get(e) || to, t) : n
        }, t.offset = function(e) {
            return arguments.length ? (i = "function" == typeof e ? e : hl.get(e) || eo, t) : i
        }, t.x = function(e) {
            return arguments.length ? (o = e, t) : o
        }, t.y = function(e) {
            return arguments.length ? (a = e, t) : a
        }, t.out = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t
    };
    var ll = Wa.map({"inside-out": function(t) {
            var e, n, i = t.length, r = t.map(no), o = t.map(io), a = Wa.range(i).sort(function(t, e) {
                return r[t] - r[e]
            }), s = 0, u = 0, l = [], h = [];
            for (e = 0; i > e; ++e)
                n = a[e], u > s ? (s += o[n], l.push(n)) : (u += o[n], h.push(n));
            return h.reverse().concat(l)
        },reverse: function(t) {
            return Wa.range(t.length).reverse()
        },"default": to}), hl = Wa.map({silhouette: function(t) {
            var e, n, i, r = t.length, o = t[0].length, a = [], s = 0, u = [];
            for (n = 0; o > n; ++n) {
                for (e = 0, i = 0; r > e; e++)
                    i += t[e][n][1];
                i > s && (s = i), a.push(i)
            }
            for (n = 0; o > n; ++n)
                u[n] = (s - a[n]) / 2;
            return u
        },wiggle: function(t) {
            var e, n, i, r, o, a, s, u, l, h = t.length, c = t[0], f = c.length, p = [];
            for (p[0] = u = l = 0, n = 1; f > n; ++n) {
                for (e = 0, r = 0; h > e; ++e)
                    r += t[e][n][1];
                for (e = 0, o = 0, s = c[n][0] - c[n - 1][0]; h > e; ++e) {
                    for (i = 0, a = (t[e][n][1] - t[e][n - 1][1]) / (2 * s); e > i; ++i)
                        a += (t[i][n][1] - t[i][n - 1][1]) / s;
                    o += a * t[e][n][1]
                }
                p[n] = u -= r ? o / r * s : 0, l > u && (l = u)
            }
            for (n = 0; f > n; ++n)
                p[n] -= l;
            return p
        },expand: function(t) {
            var e, n, i, r = t.length, o = t[0].length, a = 1 / r, s = [];
            for (n = 0; o > n; ++n) {
                for (e = 0, i = 0; r > e; e++)
                    i += t[e][n][1];
                if (i)
                    for (e = 0; r > e; e++)
                        t[e][n][1] /= i;
                else
                    for (e = 0; r > e; e++)
                        t[e][n][1] = a
            }
            for (n = 0; o > n; ++n)
                s[n] = 0;
            return s
        },zero: eo});
    Wa.layout.histogram = function() {
        function t(t, o) {
            for (var a, s, u = [], l = t.map(n, this), h = i.call(this, l, o), c = r.call(this, h, l, o), o = -1, f = l.length, p = c.length - 1, d = e ? 1 : 1 / f; ++o < p; )
                a = u[o] = [], a.dx = c[o + 1] - (a.x = c[o]), a.y = 0;
            if (p > 0)
                for (o = -1; ++o < f; )
                    s = l[o], s >= h[0] && s <= h[1] && (a = u[Wa.bisect(c, s, 1, p) - 1], a.y += d, a.push(t[o]));
            return u
        }
        var e = !0, n = Number, i = so, r = oo;
        return t.value = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.range = function(e) {
            return arguments.length ? (i = we(e), t) : i
        }, t.bins = function(e) {
            return arguments.length ? (r = "number" == typeof e ? function(t) {
                return ao(t, e)
            } : we(e), t) : r
        }, t.frequency = function(n) {
            return arguments.length ? (e = !!n, t) : e
        }, t
    }, Wa.layout.tree = function() {
        function t(t, o) {
            function a(t, e) {
                var i = t.children, r = t._tree;
                if (i && (o = i.length)) {
                    for (var o, s, l, h = i[0], c = h, f = -1; ++f < o; )
                        l = i[f], a(l, s), c = u(l, s, c), s = l;
                    vo(t);
                    var p = .5 * (h._tree.prelim + l._tree.prelim);
                    e ? (r.prelim = e._tree.prelim + n(t, e), r.mod = r.prelim - p) : r.prelim = p
                } else
                    e && (r.prelim = e._tree.prelim + n(t, e))
            }
            function s(t, e) {
                t.x = t._tree.prelim + e;
                var n = t.children;
                if (n && (i = n.length)) {
                    var i, r = -1;
                    for (e += t._tree.mod; ++r < i; )
                        s(n[r], e)
                }
            }
            function u(t, e, i) {
                if (e) {
                    for (var r, o = t, a = t, s = e, u = t.parent.children[0], l = o._tree.mod, h = a._tree.mod, c = s._tree.mod, f = u._tree.mod; s = ho(s), o = lo(o), s && o; )
                        u = lo(u), a = ho(a), a._tree.ancestor = t, r = s._tree.prelim + c - o._tree.prelim - l + n(s, o), r > 0 && (_o(yo(s, t, i), t, r), l += r, h += r), c += s._tree.mod, l += o._tree.mod, f += u._tree.mod, h += a._tree.mod;
                    s && !ho(a) && (a._tree.thread = s, a._tree.mod += c - h), o && !lo(u) && (u._tree.thread = o, u._tree.mod += l - f, i = t)
                }
                return i
            }
            var l = e.call(this, t, o), h = l[0];
            go(h, function(t, e) {
                t._tree = {ancestor: t,prelim: 0,mod: 0,change: 0,shift: 0,number: e ? e._tree.number + 1 : 0}
            }), a(h), s(h, -h._tree.prelim);
            var c = co(h, po), f = co(h, fo), p = co(h, mo), d = c.x - n(c, f) / 2, m = f.x + n(f, c) / 2, g = p.depth || 1;
            return go(h, r ? function(t) {
                t.x *= i[0], t.y = t.depth * i[1], delete t._tree
            } : function(t) {
                t.x = (t.x - d) / (m - d) * i[0], t.y = t.depth / g * i[1], delete t._tree
            }), l
        }
        var e = Wa.layout.hierarchy().sort(null).value(null), n = uo, i = [1, 1], r = !1;
        return t.separation = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.size = function(e) {
            return arguments.length ? (r = null == (i = e), t) : r ? null : i
        }, t.nodeSize = function(e) {
            return arguments.length ? (r = null != (i = e), t) : r ? i : null
        }, Gr(t, e)
    }, Wa.layout.pack = function() {
        function t(t, o) {
            var a = n.call(this, t, o), s = a[0], u = r[0], l = r[1], h = null == e ? Math.sqrt : "function" == typeof e ? e : function() {
                return e
            };
            if (s.x = s.y = 0, go(s, function(t) {
                t.r = +h(t.value)
            }), go(s, Mo), i) {
                var c = i * (e ? 1 : Math.max(2 * s.r / u, 2 * s.r / l)) / 2;
                go(s, function(t) {
                    t.r += c
                }), go(s, Mo), go(s, function(t) {
                    t.r -= c
                })
            }
            return Po(s, u / 2, l / 2, e ? 1 : 1 / Math.max(2 * s.r / u, 2 * s.r / l)), a
        }
        var e, n = Wa.layout.hierarchy().sort(bo), i = 0, r = [1, 1];
        return t.size = function(e) {
            return arguments.length ? (r = e, t) : r
        }, t.radius = function(n) {
            return arguments.length ? (e = null == n || "function" == typeof n ? n : +n, t) : e
        }, t.padding = function(e) {
            return arguments.length ? (i = +e, t) : i
        }, Gr(t, n)
    }, Wa.layout.cluster = function() {
        function t(t, o) {
            var a, s = e.call(this, t, o), u = s[0], l = 0;
            go(u, function(t) {
                var e = t.children;
                e && e.length ? (t.x = Eo(e), t.y = So(e)) : (t.x = a ? l += n(t, a) : 0, t.y = 0, a = t)
            });
            var h = To(u), c = Do(u), f = h.x - n(h, c) / 2, p = c.x + n(c, h) / 2;
            return go(u, r ? function(t) {
                t.x = (t.x - u.x) * i[0], t.y = (u.y - t.y) * i[1]
            } : function(t) {
                t.x = (t.x - f) / (p - f) * i[0], t.y = (1 - (u.y ? t.y / u.y : 1)) * i[1]
            }), s
        }
        var e = Wa.layout.hierarchy().sort(null).value(null), n = uo, i = [1, 1], r = !1;
        return t.separation = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.size = function(e) {
            return arguments.length ? (r = null == (i = e), t) : r ? null : i
        }, t.nodeSize = function(e) {
            return arguments.length ? (r = null != (i = e), t) : r ? i : null
        }, Gr(t, e)
    }, Wa.layout.treemap = function() {
        function t(t, e) {
            for (var n, i, r = -1, o = t.length; ++r < o; )
                i = (n = t[r]).value * (0 > e ? 0 : e), n.area = isNaN(i) || 0 >= i ? 0 : i
        }
        function e(n) {
            var o = n.children;
            if (o && o.length) {
                var a, s, u, l = c(n), h = [], f = o.slice(), d = 1 / 0, m = "slice" === p ? l.dx : "dice" === p ? l.dy : "slice-dice" === p ? 1 & n.depth ? l.dy : l.dx : Math.min(l.dx, l.dy);
                for (t(f, l.dx * l.dy / n.value), h.area = 0; (u = f.length) > 0; )
                    h.push(a = f[u - 1]), h.area += a.area, "squarify" !== p || (s = i(h, m)) <= d ? (f.pop(), d = s) : (h.area -= h.pop().area, r(h, m, l, !1), m = Math.min(l.dx, l.dy), h.length = h.area = 0, d = 1 / 0);
                h.length && (r(h, m, l, !0), h.length = h.area = 0), o.forEach(e)
            }
        }
        function n(e) {
            var i = e.children;
            if (i && i.length) {
                var o, a = c(e), s = i.slice(), u = [];
                for (t(s, a.dx * a.dy / e.value), u.area = 0; o = s.pop(); )
                    u.push(o), u.area += o.area, null != o.z && (r(u, o.z ? a.dx : a.dy, a, !s.length), u.length = u.area = 0);
                i.forEach(n)
            }
        }
        function i(t, e) {
            for (var n, i = t.area, r = 0, o = 1 / 0, a = -1, s = t.length; ++a < s; )
                (n = t[a].area) && (o > n && (o = n), n > r && (r = n));
            return i *= i, e *= e, i ? Math.max(e * r * d / i, i / (e * o * d)) : 1 / 0
        }
        function r(t, e, n, i) {
            var r, o = -1, a = t.length, s = n.x, l = n.y, h = e ? u(t.area / e) : 0;
            if (e == n.dx) {
                for ((i || h > n.dy) && (h = n.dy); ++o < a; )
                    r = t[o], r.x = s, r.y = l, r.dy = h, s += r.dx = Math.min(n.x + n.dx - s, h ? u(r.area / h) : 0);
                r.z = !0, r.dx += n.x + n.dx - s, n.y += h, n.dy -= h
            } else {
                for ((i || h > n.dx) && (h = n.dx); ++o < a; )
                    r = t[o], r.x = s, r.y = l, r.dx = h, l += r.dy = Math.min(n.y + n.dy - l, h ? u(r.area / h) : 0);
                r.z = !1, r.dy += n.y + n.dy - l, n.x += h, n.dx -= h
            }
        }
        function o(i) {
            var r = a || s(i), o = r[0];
            return o.x = 0, o.y = 0, o.dx = l[0], o.dy = l[1], a && s.revalue(o), t([o], o.dx * o.dy / o.value), (a ? n : e)(o), f && (a = r), r
        }
        var a, s = Wa.layout.hierarchy(), u = Math.round, l = [1, 1], h = null, c = Io, f = !1, p = "squarify", d = .5 * (1 + Math.sqrt(5));
        return o.size = function(t) {
            return arguments.length ? (l = t, o) : l
        }, o.padding = function(t) {
            function e(e) {
                var n = t.call(o, e, e.depth);
                return null == n ? Io(e) : zo(e, "number" == typeof n ? [n, n, n, n] : n)
            }
            function n(e) {
                return zo(e, t)
            }
            if (!arguments.length)
                return h;
            var i;
            return c = null == (h = t) ? Io : "function" == (i = typeof t) ? e : "number" === i ? (t = [t, t, t, t], n) : n, o
        }, o.round = function(t) {
            return arguments.length ? (u = t ? Math.round : Number, o) : u != Number
        }, o.sticky = function(t) {
            return arguments.length ? (f = t, a = null, o) : f
        }, o.ratio = function(t) {
            return arguments.length ? (d = t, o) : d
        }, o.mode = function(t) {
            return arguments.length ? (p = t + "", o) : p
        }, Gr(o, s)
    }, Wa.random = {normal: function(t, e) {
            var n = arguments.length;
            return 2 > n && (e = 1), 1 > n && (t = 0), function() {
                var n, i, r;
                do
                    n = 2 * Math.random() - 1, i = 2 * Math.random() - 1, r = n * n + i * i;
                while (!r || r > 1);
                return t + e * n * Math.sqrt(-2 * Math.log(r) / r)
            }
        },logNormal: function() {
            var t = Wa.random.normal.apply(Wa, arguments);
            return function() {
                return Math.exp(t())
            }
        },bates: function(t) {
            var e = Wa.random.irwinHall(t);
            return function() {
                return e() / t
            }
        },irwinHall: function(t) {
            return function() {
                for (var e = 0, n = 0; t > n; n++)
                    e += Math.random();
                return e
            }
        }}, Wa.scale = {};
    var cl = {floor: xe,ceil: xe};
    Wa.scale.linear = function() {
        return Zo([0, 1], [0, 1], fr, !1)
    };
    var fl = {s: 1,g: 1,p: 1,r: 1,e: 1};
    Wa.scale.log = function() {
        return Jo(Wa.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var pl = Wa.format(".0e"), dl = {floor: function(t) {
            return -Math.ceil(-t)
        },ceil: function(t) {
            return -Math.floor(-t)
        }};
    Wa.scale.pow = function() {
        return Xo(Wa.scale.linear(), 1, [0, 1])
    }, Wa.scale.sqrt = function() {
        return Wa.scale.pow().exponent(.5)
    }, Wa.scale.ordinal = function() {
        return Qo([], {t: "range",a: [[]]})
    }, Wa.scale.category10 = function() {
        return Wa.scale.ordinal().range(ml)
    }, Wa.scale.category20 = function() {
        return Wa.scale.ordinal().range(gl)
    }, Wa.scale.category20b = function() {
        return Wa.scale.ordinal().range(vl)
    }, Wa.scale.category20c = function() {
        return Wa.scale.ordinal().range(_l)
    };
    var ml = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(fe), gl = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(fe), vl = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(fe), _l = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(fe);
    Wa.scale.quantile = function() {
        return $o([], [])
    }, Wa.scale.quantize = function() {
        return ta(0, 1, [0, 1])
    }, Wa.scale.threshold = function() {
        return ea([.5], [0, 1])
    }, Wa.scale.identity = function() {
        return na([0, 1])
    }, Wa.svg = {}, Wa.svg.arc = function() {
        function t() {
            var t = e.apply(this, arguments), o = n.apply(this, arguments), a = i.apply(this, arguments) + yl, s = r.apply(this, arguments) + yl, u = (a > s && (u = a, a = s, s = u), s - a), l = ks > u ? "0" : "1", h = Math.cos(a), c = Math.sin(a), f = Math.cos(s), p = Math.sin(s);
            return u >= bl ? t ? "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "M0," + t + "A" + t + "," + t + " 0 1,0 0," + -t + "A" + t + "," + t + " 0 1,0 0," + t + "Z" : "M0," + o + "A" + o + "," + o + " 0 1,1 0," + -o + "A" + o + "," + o + " 0 1,1 0," + o + "Z" : t ? "M" + o * h + "," + o * c + "A" + o + "," + o + " 0 " + l + ",1 " + o * f + "," + o * p + "L" + t * f + "," + t * p + "A" + t + "," + t + " 0 " + l + ",0 " + t * h + "," + t * c + "Z" : "M" + o * h + "," + o * c + "A" + o + "," + o + " 0 " + l + ",1 " + o * f + "," + o * p + "L0,0" + "Z"
        }
        var e = ia, n = ra, i = oa, r = aa;
        return t.innerRadius = function(n) {
            return arguments.length ? (e = we(n), t) : e
        }, t.outerRadius = function(e) {
            return arguments.length ? (n = we(e), t) : n
        }, t.startAngle = function(e) {
            return arguments.length ? (i = we(e), t) : i
        }, t.endAngle = function(e) {
            return arguments.length ? (r = we(e), t) : r
        }, t.centroid = function() {
            var t = (e.apply(this, arguments) + n.apply(this, arguments)) / 2, o = (i.apply(this, arguments) + r.apply(this, arguments)) / 2 + yl;
            return [Math.cos(o) * t, Math.sin(o) * t]
        }, t
    };
    var yl = -Ps, bl = Cs - As;
    Wa.svg.line = function() {
        return sa(xe)
    };
    var wl = Wa.map({linear: ua,"linear-closed": la,step: ha,"step-before": ca,"step-after": fa,basis: _a,"basis-open": ya,"basis-closed": ba,bundle: wa,cardinal: ma,"cardinal-open": pa,"cardinal-closed": da,monotone: Pa});
    wl.forEach(function(t, e) {
        e.key = t, e.closed = /-closed$/.test(t)
    });
    var xl = [0, 2 / 3, 1 / 3, 0], Ll = [0, 1 / 3, 2 / 3, 0], Ml = [0, 1 / 6, 2 / 3, 1 / 6];
    Wa.svg.line.radial = function() {
        var t = sa(Aa);
        return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, ca.reverse = fa, fa.reverse = ca, Wa.svg.area = function() {
        return Sa(xe)
    }, Wa.svg.area.radial = function() {
        var t = Sa(Aa);
        return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, Wa.svg.chord = function() {
        function t(t, s) {
            var u = e(this, o, t, s), l = e(this, a, t, s);
            return "M" + u.p0 + i(u.r, u.p1, u.a1 - u.a0) + (n(u, l) ? r(u.r, u.p1, u.r, u.p0) : r(u.r, u.p1, l.r, l.p0) + i(l.r, l.p1, l.a1 - l.a0) + r(l.r, l.p1, u.r, u.p0)) + "Z"
        }
        function e(t, e, n, i) {
            var r = e.call(t, n, i), o = s.call(t, r, i), a = u.call(t, r, i) + yl, h = l.call(t, r, i) + yl;
            return {r: o,a0: a,a1: h,p0: [o * Math.cos(a), o * Math.sin(a)],p1: [o * Math.cos(h), o * Math.sin(h)]}
        }
        function n(t, e) {
            return t.a0 == e.a0 && t.a1 == e.a1
        }
        function i(t, e, n) {
            return "A" + t + "," + t + " 0 " + +(n > ks) + ",1 " + e
        }
        function r(t, e, n, i) {
            return "Q 0,0 " + i
        }
        var o = pi, a = di, s = Ea, u = oa, l = aa;
        return t.radius = function(e) {
            return arguments.length ? (s = we(e), t) : s
        }, t.source = function(e) {
            return arguments.length ? (o = we(e), t) : o
        }, t.target = function(e) {
            return arguments.length ? (a = we(e), t) : a
        }, t.startAngle = function(e) {
            return arguments.length ? (u = we(e), t) : u
        }, t.endAngle = function(e) {
            return arguments.length ? (l = we(e), t) : l
        }, t
    }, Wa.svg.diagonal = function() {
        function t(t, r) {
            var o = e.call(this, t, r), a = n.call(this, t, r), s = (o.y + a.y) / 2, u = [o, {x: o.x,y: s}, {x: a.x,y: s}, a];
            return u = u.map(i), "M" + u[0] + "C" + u[1] + " " + u[2] + " " + u[3]
        }
        var e = pi, n = di, i = Ta;
        return t.source = function(n) {
            return arguments.length ? (e = we(n), t) : e
        }, t.target = function(e) {
            return arguments.length ? (n = we(e), t) : n
        }, t.projection = function(e) {
            return arguments.length ? (i = e, t) : i
        }, t
    }, Wa.svg.diagonal.radial = function() {
        var t = Wa.svg.diagonal(), e = Ta, n = t.projection;
        return t.projection = function(t) {
            return arguments.length ? n(Da(e = t)) : e
        }, t
    }, Wa.svg.symbol = function() {
        function t(t, i) {
            return (kl.get(e.call(this, t, i)) || Oa)(n.call(this, t, i))
        }
        var e = za, n = Ia;
        return t.type = function(n) {
            return arguments.length ? (e = we(n), t) : e
        }, t.size = function(e) {
            return arguments.length ? (n = we(e), t) : n
        }, t
    };
    var kl = Wa.map({circle: Oa,cross: function(t) {
            var e = Math.sqrt(t / 5) / 2;
            return "M" + -3 * e + "," + -e + "H" + -e + "V" + -3 * e + "H" + e + "V" + -e + "H" + 3 * e + "V" + e + "H" + e + "V" + 3 * e + "H" + -e + "V" + e + "H" + -3 * e + "Z"
        },diamond: function(t) {
            var e = Math.sqrt(t / (2 * Sl)), n = e * Sl;
            return "M0," + -e + "L" + n + ",0" + " 0," + e + " " + -n + ",0" + "Z"
        },square: function(t) {
            var e = Math.sqrt(t) / 2;
            return "M" + -e + "," + -e + "L" + e + "," + -e + " " + e + "," + e + " " + -e + "," + e + "Z"
        },"triangle-down": function(t) {
            var e = Math.sqrt(t / Al), n = e * Al / 2;
            return "M0," + n + "L" + e + "," + -n + " " + -e + "," + -n + "Z"
        },"triangle-up": function(t) {
            var e = Math.sqrt(t / Al), n = e * Al / 2;
            return "M0," + -n + "L" + e + "," + n + " " + -e + "," + n + "Z"
        }});
    Wa.svg.symbolTypes = kl.keys();
    var Cl, Pl, Al = Math.sqrt(3), Sl = Math.tan(30 * Es), El = [], Tl = 0;
    El.call = vs.call, El.empty = vs.empty, El.node = vs.node, El.size = vs.size, Wa.transition = function(t) {
        return arguments.length ? Cl ? t.transition() : t : bs.transition()
    }, Wa.transition.prototype = El, El.select = function(t) {
        var e, n, i, r = this.id, o = [];
        t = b(t);
        for (var a = -1, s = this.length; ++a < s; ) {
            o.push(e = []);
            for (var u = this[a], l = -1, h = u.length; ++l < h; )
                (i = u[l]) && (n = t.call(i, i.__data__, l, a)) ? ("__data__" in i && (n.__data__ = i.__data__), Ra(n, l, r, i.__transition__[r]), e.push(n)) : e.push(null)
        }
        return Ba(o, r)
    }, El.selectAll = function(t) {
        var e, n, i, r, o, a = this.id, s = [];
        t = w(t);
        for (var u = -1, l = this.length; ++u < l; )
            for (var h = this[u], c = -1, f = h.length; ++c < f; )
                if (i = h[c]) {
                    o = i.__transition__[a], n = t.call(i, i.__data__, c, u), s.push(e = []);
                    for (var p = -1, d = n.length; ++p < d; )
                        (r = n[p]) && Ra(r, p, a, o), e.push(r)
                }
        return Ba(s, a)
    }, El.filter = function(t) {
        var e, n, i, r = [];
        "function" != typeof t && (t = D(t));
        for (var o = 0, a = this.length; a > o; o++) {
            r.push(e = []);
            for (var n = this[o], s = 0, u = n.length; u > s; s++)
                (i = n[s]) && t.call(i, i.__data__, s, o) && e.push(i)
        }
        return Ba(r, this.id)
    }, El.tween = function(t, e) {
        var n = this.id;
        return arguments.length < 2 ? this.node().__transition__[n].tween.get(t) : z(this, null == e ? function(e) {
            e.__transition__[n].tween.remove(t)
        } : function(i) {
            i.__transition__[n].tween.set(t, e)
        })
    }, El.attr = function(t, e) {
        function n() {
            this.removeAttribute(s)
        }
        function i() {
            this.removeAttributeNS(s.space, s.local)
        }
        function r(t) {
            return null == t ? n : (t += "", function() {
                var e, n = this.getAttribute(s);
                return n !== t && (e = a(n, t), function(t) {
                    this.setAttribute(s, e(t))
                })
            })
        }
        function o(t) {
            return null == t ? i : (t += "", function() {
                var e, n = this.getAttributeNS(s.space, s.local);
                return n !== t && (e = a(n, t), function(t) {
                    this.setAttributeNS(s.space, s.local, e(t))
                })
            })
        }
        if (arguments.length < 2) {
            for (e in t)
                this.attr(e, t[e]);
            return this
        }
        var a = "transform" == t ? Or : fr, s = Wa.ns.qualify(t);
        return Na(this, "attr." + t, e, s.local ? o : r)
    }, El.attrTween = function(t, e) {
        function n(t, n) {
            var i = e.call(this, t, n, this.getAttribute(r));
            return i && function(t) {
                this.setAttribute(r, i(t))
            }
        }
        function i(t, n) {
            var i = e.call(this, t, n, this.getAttributeNS(r.space, r.local));
            return i && function(t) {
                this.setAttributeNS(r.space, r.local, i(t))
            }
        }
        var r = Wa.ns.qualify(t);
        return this.tween("attr." + t, r.local ? i : n)
    }, El.style = function(t, e, n) {
        function i() {
            this.style.removeProperty(t)
        }
        function r(e) {
            return null == e ? i : (e += "", function() {
                var i, r = Qa.getComputedStyle(this, null).getPropertyValue(t);
                return r !== e && (i = fr(r, e), function(e) {
                    this.style.setProperty(t, i(e), n)
                })
            })
        }
        var o = arguments.length;
        if (3 > o) {
            if ("string" != typeof t) {
                2 > o && (e = "");
                for (n in t)
                    this.style(n, t[n], e);
                return this
            }
            n = ""
        }
        return Na(this, "style." + t, e, r)
    }, El.styleTween = function(t, e, n) {
        function i(i, r) {
            var o = e.call(this, i, r, Qa.getComputedStyle(this, null).getPropertyValue(t));
            return o && function(e) {
                this.style.setProperty(t, o(e), n)
            }
        }
        return arguments.length < 3 && (n = ""), this.tween("style." + t, i)
    }, El.text = function(t) {
        return Na(this, "text", t, Ua)
    }, El.remove = function() {
        return this.each("end.transition", function() {
            var t;
            this.__transition__.count < 2 && (t = this.parentNode) && t.removeChild(this)
        })
    }, El.ease = function(t) {
        var e = this.id;
        return arguments.length < 1 ? this.node().__transition__[e].ease : ("function" != typeof t && (t = Wa.ease.apply(Wa, arguments)), z(this, function(n) {
            n.__transition__[e].ease = t
        }))
    }, El.delay = function(t) {
        var e = this.id;
        return z(this, "function" == typeof t ? function(n, i, r) {
            n.__transition__[e].delay = +t.call(n, n.__data__, i, r)
        } : (t = +t, function(n) {
            n.__transition__[e].delay = t
        }))
    }, El.duration = function(t) {
        var e = this.id;
        return z(this, "function" == typeof t ? function(n, i, r) {
            n.__transition__[e].duration = Math.max(1, t.call(n, n.__data__, i, r))
        } : (t = Math.max(1, t), function(n) {
            n.__transition__[e].duration = t
        }))
    }, El.each = function(t, e) {
        var n = this.id;
        if (arguments.length < 2) {
            var i = Pl, r = Cl;
            Cl = n, z(this, function(e, i, r) {
                Pl = e.__transition__[n], t.call(e, e.__data__, i, r)
            }), Pl = i, Cl = r
        } else
            z(this, function(i) {
                var r = i.__transition__[n];
                (r.event || (r.event = Wa.dispatch("start", "end"))).on(t, e)
            });
        return this
    }, El.transition = function() {
        for (var t, e, n, i, r = this.id, o = ++Tl, a = [], s = 0, u = this.length; u > s; s++) {
            a.push(t = []);
            for (var e = this[s], l = 0, h = e.length; h > l; l++)
                (n = e[l]) && (i = Object.create(n.__transition__[r]), i.delay += i.duration, Ra(n, l, o, i)), t.push(n)
        }
        return Ba(a, o)
    }, Wa.svg.axis = function() {
        function t(t) {
            t.each(function() {
                var t, l = Wa.select(this), h = this.__chart__ || n, c = this.__chart__ = n.copy(), f = null == u ? c.ticks ? c.ticks.apply(c, s) : c.domain() : u, p = null == e ? c.tickFormat ? c.tickFormat.apply(c, s) : xe : e, d = l.selectAll(".tick").data(f, c), m = d.enter().insert("g", ".domain").attr("class", "tick").style("opacity", As), g = Wa.transition(d.exit()).style("opacity", As).remove(), v = Wa.transition(d).style("opacity", 1), _ = Bo(c), y = l.selectAll(".domain").data([0]), b = (y.enter().append("path").attr("class", "domain"), Wa.transition(y));
                m.append("line"), m.append("text");
                var w = m.select("line"), x = v.select("line"), L = d.select("text").text(p), M = m.select("text"), k = v.select("text");
                switch (i) {
                    case "bottom":
                        t = Fa, w.attr("y2", r), M.attr("y", Math.max(r, 0) + a), x.attr("x2", 0).attr("y2", r), k.attr("x", 0).attr("y", Math.max(r, 0) + a), L.attr("dy", ".71em").style("text-anchor", "middle"), b.attr("d", "M" + _[0] + "," + o + "V0H" + _[1] + "V" + o);
                        break;
                    case "top":
                        t = Fa, w.attr("y2", -r), M.attr("y", -(Math.max(r, 0) + a)), x.attr("x2", 0).attr("y2", -r), k.attr("x", 0).attr("y", -(Math.max(r, 0) + a)), L.attr("dy", "0em").style("text-anchor", "middle"), b.attr("d", "M" + _[0] + "," + -o + "V0H" + _[1] + "V" + -o);
                        break;
                    case "left":
                        t = Za, w.attr("x2", -r), M.attr("x", -(Math.max(r, 0) + a)), x.attr("x2", -r).attr("y2", 0), k.attr("x", -(Math.max(r, 0) + a)).attr("y", 0), L.attr("dy", ".32em").style("text-anchor", "end"), b.attr("d", "M" + -o + "," + _[0] + "H0V" + _[1] + "H" + -o);
                        break;
                    case "right":
                        t = Za, w.attr("x2", r), M.attr("x", Math.max(r, 0) + a), x.attr("x2", r).attr("y2", 0), k.attr("x", Math.max(r, 0) + a).attr("y", 0), L.attr("dy", ".32em").style("text-anchor", "start"), b.attr("d", "M" + o + "," + _[0] + "H0V" + _[1] + "H" + o)
                }
                if (c.rangeBand) {
                    var C = c, P = C.rangeBand() / 2;
                    h = c = function(t) {
                        return C(t) + P
                    }
                } else
                    h.rangeBand ? h = c : g.call(t, c);
                m.call(t, h), v.call(t, c)
            })
        }
        var e, n = Wa.scale.linear(), i = Dl, r = 6, o = 6, a = 3, s = [10], u = null;
        return t.scale = function(e) {
            return arguments.length ? (n = e, t) : n
        }, t.orient = function(e) {
            return arguments.length ? (i = e in Il ? e + "" : Dl, t) : i
        }, t.ticks = function() {
            return arguments.length ? (s = arguments, t) : s
        }, t.tickValues = function(e) {
            return arguments.length ? (u = e, t) : u
        }, t.tickFormat = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.tickSize = function(e) {
            var n = arguments.length;
            return n ? (r = +e, o = +arguments[n - 1], t) : r
        }, t.innerTickSize = function(e) {
            return arguments.length ? (r = +e, t) : r
        }, t.outerTickSize = function(e) {
            return arguments.length ? (o = +e, t) : o
        }, t.tickPadding = function(e) {
            return arguments.length ? (a = +e, t) : a
        }, t.tickSubdivide = function() {
            return arguments.length && t
        }, t
    };
    var Dl = "bottom", Il = {top: 1,right: 1,bottom: 1,left: 1};
    Wa.svg.brush = function() {
        function t(o) {
            o.each(function() {
                var o = Wa.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", r).on("touchstart.brush", r), a = o.selectAll(".background").data([0]);
                a.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), o.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var s = o.selectAll(".resize").data(d, xe);
                s.exit().remove(), s.enter().append("g").attr("class", function(t) {
                    return "resize " + t
                }).style("cursor", function(t) {
                    return zl[t]
                }).append("rect").attr("x", function(t) {
                    return /[ew]$/.test(t) ? -3 : null
                }).attr("y", function(t) {
                    return /^[ns]/.test(t) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), s.style("display", t.empty() ? "none" : null);
                var h, c = Wa.transition(o), f = Wa.transition(a);
                u && (h = Bo(u), f.attr("x", h[0]).attr("width", h[1] - h[0]), n(c)), l && (h = Bo(l), f.attr("y", h[0]).attr("height", h[1] - h[0]), i(c)), e(c)
            })
        }
        function e(t) {
            t.selectAll(".resize").attr("transform", function(t) {
                return "translate(" + h[+/e$/.test(t)] + "," + c[+/^s/.test(t)] + ")"
            })
        }
        function n(t) {
            t.select(".extent").attr("x", h[0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", h[1] - h[0])
        }
        function i(t) {
            t.select(".extent").attr("y", c[0]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", c[1] - c[0])
        }
        function r() {
            function r() {
                32 == Wa.event.keyCode && (A || (y = null, E[0] -= h[1], E[1] -= c[1], A = 2), g())
            }
            function d() {
                32 == Wa.event.keyCode && 2 == A && (E[0] += h[1], E[1] += c[1], A = 0, g())
            }
            function m() {
                var t = Wa.mouse(w), r = !1;
                b && (t[0] += b[0], t[1] += b[1]), A || (Wa.event.altKey ? (y || (y = [(h[0] + h[1]) / 2, (c[0] + c[1]) / 2]), E[0] = h[+(t[0] < y[0])], E[1] = c[+(t[1] < y[1])]) : y = null), C && v(t, u, 0) && (n(M), r = !0), P && v(t, l, 1) && (i(M), r = !0), r && (e(M), L({type: "brush",mode: A ? "move" : "resize"}))
            }
            function v(t, e, n) {
                var i, r, s = Bo(e), u = s[0], l = s[1], d = E[n], m = n ? c : h, g = m[1] - m[0];
                return A && (u -= d, l -= g + d), i = (n ? p : f) ? Math.max(u, Math.min(l, t[n])) : t[n], A ? r = (i += d) + g : (y && (d = Math.max(u, Math.min(l, 2 * y[n] - i))), i > d ? (r = i, i = d) : r = d), m[0] != i || m[1] != r ? (n ? a = null : o = null, m[0] = i, m[1] = r, !0) : void 0
            }
            function _() {
                m(), M.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), Wa.select("body").style("cursor", null), T.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), S(), L({type: "brushend"})
            }
            var y, b, w = this, x = Wa.select(Wa.event.target), L = s.of(w, arguments), M = Wa.select(w), k = x.datum(), C = !/^(n|s)$/.test(k) && u, P = !/^(e|w)$/.test(k) && l, A = x.classed("extent"), S = Z(), E = Wa.mouse(w), T = Wa.select(Qa).on("keydown.brush", r).on("keyup.brush", d);
            if (Wa.event.changedTouches ? T.on("touchmove.brush", m).on("touchend.brush", _) : T.on("mousemove.brush", m).on("mouseup.brush", _), M.interrupt().selectAll("*").interrupt(), A)
                E[0] = h[0] - E[0], E[1] = c[0] - E[1];
            else if (k) {
                var D = +/w$/.test(k), I = +/^n/.test(k);
                b = [h[1 - D] - E[0], c[1 - I] - E[1]], E[0] = h[D], E[1] = c[I]
            } else
                Wa.event.altKey && (y = E.slice());
            M.style("pointer-events", "none").selectAll(".resize").style("display", null), Wa.select("body").style("cursor", x.style("cursor")), L({type: "brushstart"}), m()
        }
        var o, a, s = _(t, "brushstart", "brush", "brushend"), u = null, l = null, h = [0, 0], c = [0, 0], f = !0, p = !0, d = Ol[0];
        return t.event = function(t) {
            t.each(function() {
                var t = s.of(this, arguments), e = {x: h,y: c,i: o,j: a}, n = this.__chart__ || e;
                this.__chart__ = e, Cl ? Wa.select(this).transition().each("start.brush", function() {
                    o = n.i, a = n.j, h = n.x, c = n.y, t({type: "brushstart"})
                }).tween("brush:brush", function() {
                    var n = pr(h, e.x), i = pr(c, e.y);
                    return o = a = null, function(r) {
                        h = e.x = n(r), c = e.y = i(r), t({type: "brush",mode: "resize"})
                    }
                }).each("end.brush", function() {
                    o = e.i, a = e.j, t({type: "brush",mode: "resize"}), t({type: "brushend"})
                }) : (t({type: "brushstart"}), t({type: "brush",mode: "resize"}), t({type: "brushend"}))
            })
        }, t.x = function(e) {
            return arguments.length ? (u = e, d = Ol[!u << 1 | !l], t) : u
        }, t.y = function(e) {
            return arguments.length ? (l = e, d = Ol[!u << 1 | !l], t) : l
        }, t.clamp = function(e) {
            return arguments.length ? (u && l ? (f = !!e[0], p = !!e[1]) : u ? f = !!e : l && (p = !!e), t) : u && l ? [f, p] : u ? f : l ? p : null
        }, t.extent = function(e) {
            var n, i, r, s, f;
            return arguments.length ? (u && (n = e[0], i = e[1], l && (n = n[0], i = i[0]), o = [n, i], u.invert && (n = u(n), i = u(i)), n > i && (f = n, n = i, i = f), (n != h[0] || i != h[1]) && (h = [n, i])), l && (r = e[0], s = e[1], u && (r = r[1], s = s[1]), a = [r, s], l.invert && (r = l(r), s = l(s)), r > s && (f = r, r = s, s = f), (r != c[0] || s != c[1]) && (c = [r, s])), t) : (u && (o ? (n = o[0], i = o[1]) : (n = h[0], i = h[1], u.invert && (n = u.invert(n), i = u.invert(i)), n > i && (f = n, n = i, i = f))), l && (a ? (r = a[0], s = a[1]) : (r = c[0], s = c[1], l.invert && (r = l.invert(r), s = l.invert(s)), r > s && (f = r, r = s, s = f))), u && l ? [[n, r], [i, s]] : u ? [n, i] : l && [r, s])
        }, t.clear = function() {
            return t.empty() || (h = [0, 0], c = [0, 0], o = a = null), t
        }, t.empty = function() {
            return !!u && h[0] == h[1] || !!l && c[0] == c[1]
        }, Wa.rebind(t, s, "on")
    };
    var zl = {n: "ns-resize",e: "ew-resize",s: "ns-resize",w: "ew-resize",nw: "nwse-resize",ne: "nesw-resize",se: "nwse-resize",sw: "nesw-resize"}, Ol = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []], Bl = nu.format = uu.timeFormat, Nl = Bl.utc, Ul = Nl("%Y-%m-%dT%H:%M:%S.%LZ");
    Bl.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? ja : Ul, ja.parse = function(t) {
        var e = new Date(t);
        return isNaN(e) ? null : e
    }, ja.toString = Ul.toString, nu.second = ze(function(t) {
        return new iu(1e3 * Math.floor(t / 1e3))
    }, function(t, e) {
        t.setTime(t.getTime() + 1e3 * Math.floor(e))
    }, function(t) {
        return t.getSeconds()
    }), nu.seconds = nu.second.range, nu.seconds.utc = nu.second.utc.range, nu.minute = ze(function(t) {
        return new iu(6e4 * Math.floor(t / 6e4))
    }, function(t, e) {
        t.setTime(t.getTime() + 6e4 * Math.floor(e))
    }, function(t) {
        return t.getMinutes()
    }), nu.minutes = nu.minute.range, nu.minutes.utc = nu.minute.utc.range, nu.hour = ze(function(t) {
        var e = t.getTimezoneOffset() / 60;
        return new iu(36e5 * (Math.floor(t / 36e5 - e) + e))
    }, function(t, e) {
        t.setTime(t.getTime() + 36e5 * Math.floor(e))
    }, function(t) {
        return t.getHours()
    }), nu.hours = nu.hour.range, nu.hours.utc = nu.hour.utc.range, nu.month = ze(function(t) {
        return t = nu.day(t), t.setDate(1), t
    }, function(t, e) {
        t.setMonth(t.getMonth() + e)
    }, function(t) {
        return t.getMonth()
    }), nu.months = nu.month.range, nu.months.utc = nu.month.utc.range;
    var Rl = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6], Fl = [[nu.second, 1], [nu.second, 5], [nu.second, 15], [nu.second, 30], [nu.minute, 1], [nu.minute, 5], [nu.minute, 15], [nu.minute, 30], [nu.hour, 1], [nu.hour, 3], [nu.hour, 6], [nu.hour, 12], [nu.day, 1], [nu.day, 2], [nu.week, 1], [nu.month, 1], [nu.month, 3], [nu.year, 1]], Zl = Bl.multi([[".%L", function(t) {
                return t.getMilliseconds()
            }], [":%S", function(t) {
                return t.getSeconds()
            }], ["%I:%M", function(t) {
                return t.getMinutes()
            }], ["%I %p", function(t) {
                return t.getHours()
            }], ["%a %d", function(t) {
                return t.getDay() && 1 != t.getDate()
            }], ["%b %d", function(t) {
                return 1 != t.getDate()
            }], ["%B", function(t) {
                return t.getMonth()
            }], ["%Y", Ln]]), jl = {range: function(t, e, n) {
            return Wa.range(+t, +e, n).map(qa)
        },floor: xe,ceil: xe};
    Fl.year = nu.year, nu.scale = function() {
        return Va(Wa.scale.linear(), Fl, Zl)
    };
    var Vl = Fl.map(function(t) {
        return [t[0].utc, t[1]]
    }), ql = Nl.multi([[".%L", function(t) {
                return t.getUTCMilliseconds()
            }], [":%S", function(t) {
                return t.getUTCSeconds()
            }], ["%I:%M", function(t) {
                return t.getUTCMinutes()
            }], ["%I %p", function(t) {
                return t.getUTCHours()
            }], ["%a %d", function(t) {
                return t.getUTCDay() && 1 != t.getUTCDate()
            }], ["%b %d", function(t) {
                return 1 != t.getUTCDate()
            }], ["%B", function(t) {
                return t.getUTCMonth()
            }], ["%Y", Ln]]);
    Vl.year = nu.year.utc, nu.scale.utc = function() {
        return Va(Wa.scale.linear(), Vl, ql)
    }, Wa.text = Le(function(t) {
        return t.responseText
    }), Wa.json = function(t, e) {
        return Me(t, "application/json", Ha, e)
    }, Wa.html = function(t, e) {
        return Me(t, "text/html", Ga, e)
    }, Wa.xml = Le(function(t) {
        return t.responseXML
    }), "function" == typeof Livefyre.define && Livefyre.define.amd ? Livefyre.define("d3", Wa) : "object" == typeof module && module.exports ? module.exports = Wa : this.d3 = Wa
}(), !function() {
    function t(t, e) {
        function n(e) {
            var n = t.arcs[e], i = n[0], r = [0, 0];
            return n.forEach(function(t) {
                r[0] += t[0], r[1] += t[1]
            }), [i, r]
        }
        var i = {}, r = {};
        e.forEach(function(t) {
            var e, o, a = n(t), s = a[0], u = a[1];
            if (e = r[s])
                if (delete r[e.end], e.push(t), e.end = u, o = i[u]) {
                    delete i[o.start];
                    var l = o === e ? e : e.concat(o);
                    i[l.start = e.start] = r[l.end = o.end] = l
                } else if (o = r[u]) {
                    delete i[o.start], delete r[o.end];
                    var l = e.concat(o.map(function(t) {
                        return ~t
                    }).reverse());
                    i[l.start = e.start] = r[l.end = o.start] = l
                } else
                    i[e.start] = r[e.end] = e;
            else if (e = i[u])
                if (delete i[e.start], e.unshift(t), e.start = s, o = r[s]) {
                    delete r[o.end];
                    var h = o === e ? e : o.concat(e);
                    i[h.start = o.start] = r[h.end = e.end] = h
                } else if (o = i[s]) {
                    delete i[o.start], delete r[o.end];
                    var h = o.map(function(t) {
                        return ~t
                    }).reverse().concat(e);
                    i[h.start = o.end] = r[h.end = e.end] = h
                } else
                    i[e.start] = r[e.end] = e;
            else if (e = i[s])
                if (delete i[e.start], e.unshift(~t), e.start = u, o = r[u]) {
                    delete r[o.end];
                    var h = o === e ? e : o.concat(e);
                    i[h.start = o.start] = r[h.end = e.end] = h
                } else if (o = i[u]) {
                    delete i[o.start], delete r[o.end];
                    var h = o.map(function(t) {
                        return ~t
                    }).reverse().concat(e);
                    i[h.start = o.end] = r[h.end = e.end] = h
                } else
                    i[e.start] = r[e.end] = e;
            else if (e = r[u])
                if (delete r[e.end], e.push(~t), e.end = s, o = r[s]) {
                    delete i[o.start];
                    var l = o === e ? e : e.concat(o);
                    i[l.start = e.start] = r[l.end = o.end] = l
                } else if (o = i[s]) {
                    delete i[o.start], delete r[o.end];
                    var l = e.concat(o.map(function(t) {
                        return ~t
                    }).reverse());
                    i[l.start = e.start] = r[l.end = o.start] = l
                } else
                    i[e.start] = r[e.end] = e;
            else
                e = [t], i[e.start = s] = r[e.end = u] = e
        });
        var o = [];
        for (var a in r)
            o.push(r[a]);
        return o
    }
    function e(e, n, i) {
        function o(t) {
            0 > t && (t = ~t), (c[t] || (c[t] = [])).push(h)
        }
        function a(t) {
            t.forEach(o)
        }
        function s(t) {
            t.forEach(a)
        }
        function u(t) {
            "GeometryCollection" === t.type ? t.geometries.forEach(u) : t.type in f && (h = t, f[t.type](t.arcs))
        }
        var l = [];
        if (arguments.length > 1) {
            var h, c = [], f = {LineString: a,MultiLineString: s,Polygon: s,MultiPolygon: function(t) {
                    t.forEach(s)
                }};
            u(n), c.forEach(arguments.length < 3 ? function(t, e) {
                l.push(e)
            } : function(t, e) {
                i(t[0], t[t.length - 1]) && l.push(e)
            })
        } else
            for (var p = 0, d = e.arcs.length; d > p; ++p)
                l.push(p);
        return r(e, {type: "MultiLineString",arcs: t(e, l)})
    }
    function n(t, e) {
        return "GeometryCollection" === e.type ? {type: "FeatureCollection",features: e.geometries.map(function(e) {
                return i(t, e)
            })} : i(t, e)
    }
    function i(t, e) {
        var n = {type: "Feature",id: e.id,properties: e.properties || {},geometry: r(t, e)};
        return null == e.id && delete n.id, n
    }
    function r(t, e) {
        function n(t, e) {
            e.length && e.pop();
            for (var n, i = h[0 > t ? ~t : t], r = 0, a = i.length; a > r; ++r)
                e.push(n = i[r].slice()), l(n, r);
            0 > t && o(e, a)
        }
        function i(t) {
            return t = t.slice(), l(t, 0), t
        }
        function r(t) {
            for (var e = [], i = 0, r = t.length; r > i; ++i)
                n(t[i], e);
            return e.length < 2 && e.push(e[0].slice()), e
        }
        function a(t) {
            for (var e = r(t); e.length < 4; )
                e.push(e[0].slice());
            return e
        }
        function s(t) {
            return t.map(a)
        }
        function u(t) {
            var e = t.type;
            return "GeometryCollection" === e ? {type: e,geometries: t.geometries.map(u)} : e in c ? {type: e,coordinates: c[e](t)} : null
        }
        var l = f(t.transform), h = t.arcs, c = {Point: function(t) {
                return i(t.coordinates)
            },MultiPoint: function(t) {
                return t.coordinates.map(i)
            },LineString: function(t) {
                return r(t.arcs)
            },MultiLineString: function(t) {
                return t.arcs.map(r)
            },Polygon: function(t) {
                return s(t.arcs)
            },MultiPolygon: function(t) {
                return t.arcs.map(s)
            }};
        return u(e)
    }
    function o(t, e) {
        for (var n, i = t.length, r = i - e; r < --i; )
            n = t[r], t[r++] = t[i], t[i] = n
    }
    function a(t, e) {
        for (var n = 0, i = t.length; i > n; ) {
            var r = n + i >>> 1;
            t[r] < e ? n = r + 1 : i = r
        }
        return n
    }
    function s(t) {
        function e(t, e) {
            t.forEach(function(t) {
                0 > t && (t = ~t);
                var n = r[t];
                n ? n.push(e) : r[t] = [e]
            })
        }
        function n(t, n) {
            t.forEach(function(t) {
                e(t, n)
            })
        }
        function i(t, e) {
            "GeometryCollection" === t.type ? t.geometries.forEach(function(t) {
                i(t, e)
            }) : t.type in s && s[t.type](t.arcs, e)
        }
        var r = {}, o = t.map(function() {
            return []
        }), s = {LineString: e,MultiLineString: n,Polygon: n,MultiPolygon: function(t, e) {
                t.forEach(function(t) {
                    n(t, e)
                })
            }};
        t.forEach(i);
        for (var u in r)
            for (var l = r[u], h = l.length, c = 0; h > c; ++c)
                for (var f = c + 1; h > f; ++f) {
                    var p, d = l[c], m = l[f];
                    (p = o[d])[u = a(p, m)] !== m && p.splice(u, 0, m), (p = o[m])[u = a(p, d)] !== d && p.splice(u, 0, d)
                }
        return o
    }
    function u(t, e) {
        function n(t) {
            a.remove(t), t[1][2] = e(t), a.push(t)
        }
        var i, r = f(t.transform), o = p(t.transform), a = c(h), s = 0;
        for (e || (e = l), t.arcs.forEach(function(t) {
            var n = [];
            t.forEach(r);
            for (var o = 1, s = t.length - 1; s > o; ++o)
                i = t.slice(o - 1, o + 2), i[1][2] = e(i), n.push(i), a.push(i);
            t[0][2] = t[s][2] = 1 / 0;
            for (var o = 0, s = n.length; s > o; ++o)
                i = n[o], i.previous = n[o - 1], i.next = n[o + 1]
        }); i = a.pop(); ) {
            var u = i.previous, d = i.next;
            i[1][2] < s ? i[1][2] = s : s = i[1][2], u && (u.next = d, u[2] = i[2], n(u)), d && (d.previous = u, d[0] = i[0], n(d))
        }
        return t.arcs.forEach(function(t) {
            t.forEach(o)
        }), t
    }
    function l(t) {
        return Math.abs((t[0][0] - t[2][0]) * (t[1][1] - t[0][1]) - (t[0][0] - t[1][0]) * (t[2][1] - t[0][1]))
    }
    function h(t, e) {
        return t[1][2] - e[1][2]
    }
    function c(t) {
        function e(e) {
            for (var n = r[e]; e > 0; ) {
                var i = (e + 1 >> 1) - 1, o = r[i];
                if (t(n, o) >= 0)
                    break;
                r[o.index = e] = o, r[n.index = e = i] = n
            }
        }
        function n(e) {
            for (var n = r[e]; ; ) {
                var i = e + 1 << 1, o = i - 1, a = e, s = r[a];
                if (o < r.length && t(r[o], s) < 0 && (s = r[a = o]), i < r.length && t(r[i], s) < 0 && (s = r[a = i]), a === e)
                    break;
                r[s.index = e] = s, r[n.index = e = a] = n
            }
        }
        var i = {}, r = [];
        return i.push = function() {
            for (var t = 0, n = arguments.length; n > t; ++t) {
                var i = arguments[t];
                e(i.index = r.push(i) - 1)
            }
            return r.length
        }, i.pop = function() {
            var t = r[0], e = r.pop();
            return r.length && (r[e.index = 0] = e, n(0)), t
        }, i.remove = function(i) {
            var o = i.index, a = r.pop();
            return o !== r.length && (r[a.index = o] = a, (t(a, i) < 0 ? e : n)(o)), o
        }, i
    }
    function f(t) {
        if (!t)
            return d;
        var e, n, i = t.scale[0], r = t.scale[1], o = t.translate[0], a = t.translate[1];
        return function(t, s) {
            s || (e = n = 0), t[0] = (e += t[0]) * i + o, t[1] = (n += t[1]) * r + a
        }
    }
    function p(t) {
        if (!t)
            return d;
        var e, n, i = t.scale[0], r = t.scale[1], o = t.translate[0], a = t.translate[1];
        return function(t, s) {
            s || (e = n = 0);
            var u = 0 | (t[0] - o) / i, l = 0 | (t[1] - a) / r;
            t[0] = u - e, t[1] = l - n, e = u, n = l
        }
    }
    function d() {
    }
    var m = {version: "1.4.6",mesh: e,feature: n,neighbors: s,presimplify: u};
    "function" == typeof Livefyre.define && Livefyre.define.amd ? Livefyre.define("topojson", m) : "object" == typeof module && module.exports ? module.exports = m : this.topojson = m
}(), function(t, e, n) {
    var i = t.L, r = {};
    r.version = "0.7.1", "object" == typeof module && "object" == typeof module.exports ? module.exports = r : "function" == typeof Livefyre.define && Livefyre.define.amd && Livefyre.define("leaflet/leaflet-src", r), r.noConflict = function() {
        return t.L = i, this
    }, t.L = r, r.Util = {extend: function(t) {
            var e, n, i, r, o = Array.prototype.slice.call(arguments, 1);
            for (n = 0, i = o.length; i > n; n++) {
                r = o[n] || {};
                for (e in r)
                    r.hasOwnProperty(e) && (t[e] = r[e])
            }
            return t
        },bind: function(t, e) {
            var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function() {
                return t.apply(e, n || arguments)
            }
        },stamp: function() {
            var t = 0, e = "_leaflet_id";
            return function(n) {
                return n[e] = n[e] || ++t, n[e]
            }
        }(),invokeEach: function(t, e, n) {
            var i, r;
            if ("object" == typeof t) {
                r = Array.prototype.slice.call(arguments, 3);
                for (i in t)
                    e.apply(n, [i, t[i]].concat(r));
                return !0
            }
            return !1
        },limitExecByInterval: function(t, e, i) {
            var r, o;
            return function a() {
                var s = arguments;
                return r ? (o = !0, n) : (r = !0, setTimeout(function() {
                    r = !1, o && (a.apply(i, s), o = !1)
                }, e), t.apply(i, s), n)
            }
        },falseFn: function() {
            return !1
        },formatNum: function(t, e) {
            var n = Math.pow(10, e || 5);
            return Math.round(t * n) / n
        },trim: function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        },splitWords: function(t) {
            return r.Util.trim(t).split(/\s+/)
        },setOptions: function(t, e) {
            return t.options = r.extend({}, t.options, e), t.options
        },getParamString: function(t, e, n) {
            var i = [];
            for (var r in t)
                i.push(encodeURIComponent(n ? r.toUpperCase() : r) + "=" + encodeURIComponent(t[r]));
            return (e && -1 !== e.indexOf("?") ? "&" : "?") + i.join("&")
        },template: function(t, e) {
            return t.replace(/\{ *([\w_]+) *\}/g, function(t, i) {
                var r = e[i];
                if (r === n)
                    throw Error("No value provided for variable " + t);
                return "function" == typeof r && (r = r(e)), r
            })
        },isArray: Array.isArray || function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}, function() {
        function e(e) {
            var n, i, r = ["webkit", "moz", "o", "ms"];
            for (n = 0; n < r.length && !i; n++)
                i = t[r[n] + e];
            return i
        }
        function i(e) {
            var n = +new Date, i = Math.max(0, 16 - (n - o));
            return o = n + i, t.setTimeout(e, i)
        }
        var o = 0, a = t.requestAnimationFrame || e("RequestAnimationFrame") || i, s = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
            t.clearTimeout(e)
        };
        r.Util.requestAnimFrame = function(e, o, s, u) {
            return e = r.bind(e, o), s && a === i ? (e(), n) : a.call(t, e, u)
        }, r.Util.cancelAnimFrame = function(e) {
            e && s.call(t, e)
        }
    }(), r.extend = r.Util.extend, r.bind = r.Util.bind, r.stamp = r.Util.stamp, r.setOptions = r.Util.setOptions, r.Class = function() {
    }, r.Class.extend = function(t) {
        var e = function() {
            this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
        }, n = function() {
        };
        n.prototype = this.prototype;
        var i = new n;
        i.constructor = e, e.prototype = i;
        for (var o in this)
            this.hasOwnProperty(o) && "prototype" !== o && (e[o] = this[o]);
        t.statics && (r.extend(e, t.statics), delete t.statics), t.includes && (r.Util.extend.apply(null, [i].concat(t.includes)), delete t.includes), t.options && i.options && (t.options = r.extend({}, i.options, t.options)), r.extend(i, t), i._initHooks = [];
        var a = this;
        return e.__super__ = a.prototype, i.callInitHooks = function() {
            if (!this._initHooksCalled) {
                a.prototype.callInitHooks && a.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var t = 0, e = i._initHooks.length; e > t; t++)
                    i._initHooks[t].call(this)
            }
        }, e
    }, r.Class.include = function(t) {
        r.extend(this.prototype, t)
    }, r.Class.mergeOptions = function(t) {
        r.extend(this.prototype.options, t)
    }, r.Class.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), n = "function" == typeof t ? t : function() {
            this[t].apply(this, e)
        };
        this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n)
    };
    var o = "_leaflet_events";
    r.Mixin = {}, r.Mixin.Events = {addEventListener: function(t, e, n) {
            if (r.Util.invokeEach(t, this.addEventListener, this, e, n))
                return this;
            var i, a, s, u, l, h, c, f = this[o] = this[o] || {}, p = n && n !== this && r.stamp(n);
            for (t = r.Util.splitWords(t), i = 0, a = t.length; a > i; i++)
                s = {action: e,context: n || this}, u = t[i], p ? (l = u + "_idx", h = l + "_len", c = f[l] = f[l] || {}, c[p] || (c[p] = [], f[h] = (f[h] || 0) + 1), c[p].push(s)) : (f[u] = f[u] || [], f[u].push(s));
            return this
        },hasEventListeners: function(t) {
            var e = this[o];
            return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
        },removeEventListener: function(t, e, n) {
            if (!this[o])
                return this;
            if (!t)
                return this.clearAllEventListeners();
            if (r.Util.invokeEach(t, this.removeEventListener, this, e, n))
                return this;
            var i, a, s, u, l, h, c, f, p, d = this[o], m = n && n !== this && r.stamp(n);
            for (t = r.Util.splitWords(t), i = 0, a = t.length; a > i; i++)
                if (s = t[i], h = s + "_idx", c = h + "_len", f = d[h], e) {
                    if (u = m && f ? f[m] : d[s]) {
                        for (l = u.length - 1; l >= 0; l--)
                            u[l].action !== e || n && u[l].context !== n || (p = u.splice(l, 1), p[0].action = r.Util.falseFn);
                        n && f && 0 === u.length && (delete f[m], d[c]--)
                    }
                } else
                    delete d[s], delete d[h], delete d[c];
            return this
        },clearAllEventListeners: function() {
            return delete this[o], this
        },fireEvent: function(t, e) {
            if (!this.hasEventListeners(t))
                return this;
            var n, i, a, s, u, l = r.Util.extend({}, e, {type: t,target: this}), h = this[o];
            if (h[t])
                for (n = h[t].slice(), i = 0, a = n.length; a > i; i++)
                    n[i].action.call(n[i].context, l);
            s = h[t + "_idx"];
            for (u in s)
                if (n = s[u].slice())
                    for (i = 0, a = n.length; a > i; i++)
                        n[i].action.call(n[i].context, l);
            return this
        },addOneTimeEventListener: function(t, e, n) {
            if (r.Util.invokeEach(t, this.addOneTimeEventListener, this, e, n))
                return this;
            var i = r.bind(function() {
                this.removeEventListener(t, e, n).removeEventListener(t, i, n)
            }, this);
            return this.addEventListener(t, e, n).addEventListener(t, i, n)
        }}, r.Mixin.Events.on = r.Mixin.Events.addEventListener, r.Mixin.Events.off = r.Mixin.Events.removeEventListener, r.Mixin.Events.once = r.Mixin.Events.addOneTimeEventListener, r.Mixin.Events.fire = r.Mixin.Events.fireEvent, function() {
        var i = "ActiveXObject" in t, o = i && !e.addEventListener, a = navigator.userAgent.toLowerCase(), s = -1 !== a.indexOf("webkit"), u = -1 !== a.indexOf("chrome"), l = -1 !== a.indexOf("phantom"), h = -1 !== a.indexOf("android"), c = -1 !== a.search("android [23]"), f = -1 !== a.indexOf("gecko"), p = typeof orientation != n + "", d = t.navigator && t.navigator.msPointerEnabled && t.navigator.msMaxTouchPoints && !t.PointerEvent, m = t.PointerEvent && t.navigator.pointerEnabled && t.navigator.maxTouchPoints || d, g = "devicePixelRatio" in t && t.devicePixelRatio > 1 || "matchMedia" in t && t.matchMedia("(min-resolution:144dpi)") && t.matchMedia("(min-resolution:144dpi)").matches, v = e.documentElement, _ = i && "transition" in v.style, y = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !c, b = "MozPerspective" in v.style, w = "OTransition" in v.style, x = !t.L_DISABLE_3D && (_ || y || b || w) && !l, L = !t.L_NO_TOUCH && !l && function() {
            var t = "ontouchstart";
            if (m || t in v)
                return !0;
            var n = e.createElement("div"), i = !1;
            return n.setAttribute ? (n.setAttribute(t, "return;"), "function" == typeof n[t] && (i = !0), n.removeAttribute(t), n = null, i) : !1
        }();
        r.Browser = {ie: i,ielt9: o,webkit: s,gecko: f && !s && !t.opera && !i,android: h,android23: c,chrome: u,ie3d: _,webkit3d: y,gecko3d: b,opera3d: w,any3d: x,mobile: p,mobileWebkit: p && s,mobileWebkit3d: p && y,mobileOpera: p && t.opera,touch: L,msPointer: d,pointer: m,retina: g}
    }(), r.Point = function(t, e, n) {
        this.x = n ? Math.round(t) : t, this.y = n ? Math.round(e) : e
    }, r.Point.prototype = {clone: function() {
            return new r.Point(this.x, this.y)
        },add: function(t) {
            return this.clone()._add(r.point(t))
        },_add: function(t) {
            return this.x += t.x, this.y += t.y, this
        },subtract: function(t) {
            return this.clone()._subtract(r.point(t))
        },_subtract: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },divideBy: function(t) {
            return this.clone()._divideBy(t)
        },_divideBy: function(t) {
            return this.x /= t, this.y /= t, this
        },multiplyBy: function(t) {
            return this.clone()._multiplyBy(t)
        },_multiplyBy: function(t) {
            return this.x *= t, this.y *= t, this
        },round: function() {
            return this.clone()._round()
        },_round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },floor: function() {
            return this.clone()._floor()
        },_floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },distanceTo: function(t) {
            t = r.point(t);
            var e = t.x - this.x, n = t.y - this.y;
            return Math.sqrt(e * e + n * n)
        },equals: function(t) {
            return t = r.point(t), t.x === this.x && t.y === this.y
        },contains: function(t) {
            return t = r.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },toString: function() {
            return "Point(" + r.Util.formatNum(this.x) + ", " + r.Util.formatNum(this.y) + ")"
        }}, r.point = function(t, e, i) {
        return t instanceof r.Point ? t : r.Util.isArray(t) ? new r.Point(t[0], t[1]) : t === n || null === t ? t : new r.Point(t, e, i)
    }, r.Bounds = function(t, e) {
        if (t)
            for (var n = e ? [t, e] : t, i = 0, r = n.length; r > i; i++)
                this.extend(n[i])
    }, r.Bounds.prototype = {extend: function(t) {
            return t = r.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
        },getCenter: function(t) {
            return new r.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
        },getBottomLeft: function() {
            return new r.Point(this.min.x, this.max.y)
        },getTopRight: function() {
            return new r.Point(this.max.x, this.min.y)
        },getSize: function() {
            return this.max.subtract(this.min)
        },contains: function(t) {
            var e, n;
            return t = "number" == typeof t[0] || t instanceof r.Point ? r.point(t) : r.bounds(t), t instanceof r.Bounds ? (e = t.min, n = t.max) : e = n = t, e.x >= this.min.x && n.x <= this.max.x && e.y >= this.min.y && n.y <= this.max.y
        },intersects: function(t) {
            t = r.bounds(t);
            var e = this.min, n = this.max, i = t.min, o = t.max, a = o.x >= e.x && i.x <= n.x, s = o.y >= e.y && i.y <= n.y;
            return a && s
        },isValid: function() {
            return !(!this.min || !this.max)
        }}, r.bounds = function(t, e) {
        return !t || t instanceof r.Bounds ? t : new r.Bounds(t, e)
    }, r.Transformation = function(t, e, n, i) {
        this._a = t, this._b = e, this._c = n, this._d = i
    }, r.Transformation.prototype = {transform: function(t, e) {
            return this._transform(t.clone(), e)
        },_transform: function(t, e) {
            return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
        },untransform: function(t, e) {
            return e = e || 1, new r.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
        }}, r.DomUtil = {get: function(t) {
            return "string" == typeof t ? e.getElementById(t) : t
        },getStyle: function(t, n) {
            var i = t.style[n];
            if (!i && t.currentStyle && (i = t.currentStyle[n]), (!i || "auto" === i) && e.defaultView) {
                var r = e.defaultView.getComputedStyle(t, null);
                i = r ? r[n] : null
            }
            return "auto" === i ? null : i
        },getViewportOffset: function(t) {
            var n, i = 0, o = 0, a = t, s = e.body, u = e.documentElement;
            do {
                if (i += a.offsetTop || 0, o += a.offsetLeft || 0, i += parseInt(r.DomUtil.getStyle(a, "borderTopWidth"), 10) || 0, o += parseInt(r.DomUtil.getStyle(a, "borderLeftWidth"), 10) || 0, n = r.DomUtil.getStyle(a, "position"), a.offsetParent === s && "absolute" === n)
                    break;
                if ("fixed" === n) {
                    i += s.scrollTop || u.scrollTop || 0, o += s.scrollLeft || u.scrollLeft || 0;
                    break
                }
                if ("relative" === n && !a.offsetLeft) {
                    var l = r.DomUtil.getStyle(a, "width"), h = r.DomUtil.getStyle(a, "max-width"), c = a.getBoundingClientRect();
                    ("none" !== l || "none" !== h) && (o += c.left + a.clientLeft), i += c.top + (s.scrollTop || u.scrollTop || 0);
                    break
                }
                a = a.offsetParent
            } while (a);
            a = t;
            do {
                if (a === s)
                    break;
                i -= a.scrollTop || 0, o -= a.scrollLeft || 0, a = a.parentNode
            } while (a);
            return new r.Point(o, i)
        },documentIsLtr: function() {
            return r.DomUtil._docIsLtrCached || (r.DomUtil._docIsLtrCached = !0, r.DomUtil._docIsLtr = "ltr" === r.DomUtil.getStyle(e.body, "direction")), r.DomUtil._docIsLtr
        },create: function(t, n, i) {
            var r = e.createElement(t);
            return r.className = n, i && i.appendChild(r), r
        },hasClass: function(t, e) {
            if (t.classList !== n)
                return t.classList.contains(e);
            var i = r.DomUtil._getClass(t);
            return i.length > 0 && RegExp("(^|\\s)" + e + "(\\s|$)").test(i)
        },addClass: function(t, e) {
            if (t.classList !== n)
                for (var i = r.Util.splitWords(e), o = 0, a = i.length; a > o; o++)
                    t.classList.add(i[o]);
            else if (!r.DomUtil.hasClass(t, e)) {
                var s = r.DomUtil._getClass(t);
                r.DomUtil._setClass(t, (s ? s + " " : "") + e)
            }
        },removeClass: function(t, e) {
            t.classList !== n ? t.classList.remove(e) : r.DomUtil._setClass(t, r.Util.trim((" " + r.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
        },_setClass: function(t, e) {
            t.className.baseVal === n ? t.className = e : t.className.baseVal = e
        },_getClass: function(t) {
            return t.className.baseVal === n ? t.className : t.className.baseVal
        },setOpacity: function(t, e) {
            if ("opacity" in t.style)
                t.style.opacity = e;
            else if ("filter" in t.style) {
                var n = !1, i = "DXImageTransform.Microsoft.Alpha";
                try {
                    n = t.filters.item(i)
                } catch (r) {
                    if (1 === e)
                        return
                }
                e = Math.round(100 * e), n ? (n.Enabled = 100 !== e, n.Opacity = e) : t.style.filter += " progid:" + i + "(opacity=" + e + ")"
            }
        },testProp: function(t) {
            for (var n = e.documentElement.style, i = 0; i < t.length; i++)
                if (t[i] in n)
                    return t[i];
            return !1
        },getTranslateString: function(t) {
            var e = r.Browser.webkit3d, n = "translate" + (e ? "3d" : "") + "(", i = (e ? ",0" : "") + ")";
            return n + t.x + "px," + t.y + "px" + i
        },getScaleString: function(t, e) {
            var n = r.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))), i = " scale(" + t + ") ";
            return n + i
        },setPosition: function(t, e, n) {
            t._leaflet_pos = e, !n && r.Browser.any3d ? t.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
        },getPosition: function(t) {
            return t._leaflet_pos
        }}, r.DomUtil.TRANSFORM = r.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), r.DomUtil.TRANSITION = r.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), r.DomUtil.TRANSITION_END = "webkitTransition" === r.DomUtil.TRANSITION || "OTransition" === r.DomUtil.TRANSITION ? r.DomUtil.TRANSITION + "End" : "transitionend", function() {
        if ("onselectstart" in e)
            r.extend(r.DomUtil, {disableTextSelection: function() {
                    r.DomEvent.on(t, "selectstart", r.DomEvent.preventDefault)
                },enableTextSelection: function() {
                    r.DomEvent.off(t, "selectstart", r.DomEvent.preventDefault)
                }});
        else {
            var n = r.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            r.extend(r.DomUtil, {disableTextSelection: function() {
                    if (n) {
                        var t = e.documentElement.style;
                        this._userSelect = t[n], t[n] = "none"
                    }
                },enableTextSelection: function() {
                    n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
                }})
        }
        r.extend(r.DomUtil, {disableImageDrag: function() {
                r.DomEvent.on(t, "dragstart", r.DomEvent.preventDefault)
            },enableImageDrag: function() {
                r.DomEvent.off(t, "dragstart", r.DomEvent.preventDefault)
            }})
    }(), r.LatLng = function(t, e, i) {
        if (t = parseFloat(t), e = parseFloat(e), isNaN(t) || isNaN(e))
          t = 0, e = 0;
            //throw Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = t, this.lng = e, i !== n && (this.alt = parseFloat(i))
    }, r.extend(r.LatLng, {DEG_TO_RAD: Math.PI / 180,RAD_TO_DEG: 180 / Math.PI,MAX_MARGIN: 1e-9}), r.LatLng.prototype = {equals: function(t) {
            if (!t)
                return !1;
            t = r.latLng(t);
            var e = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
            return e <= r.LatLng.MAX_MARGIN
        },toString: function(t) {
            return "LatLng(" + r.Util.formatNum(this.lat, t) + ", " + r.Util.formatNum(this.lng, t) + ")"
        },distanceTo: function(t) {
            t = r.latLng(t);
            var e = 6378137, n = r.LatLng.DEG_TO_RAD, i = (t.lat - this.lat) * n, o = (t.lng - this.lng) * n, a = this.lat * n, s = t.lat * n, u = Math.sin(i / 2), l = Math.sin(o / 2), h = u * u + l * l * Math.cos(a) * Math.cos(s);
            return 2 * e * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
        },wrap: function(t, e) {
            var n = this.lng;
            return t = t || -180, e = e || 180, n = (n + e) % (e - t) + (t > n || n === e ? e : t), new r.LatLng(this.lat, n)
        }}, r.latLng = function(t, e) {
        return t instanceof r.LatLng ? t : r.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new r.LatLng(t[0], t[1], t[2]) : null : t === n || null === t ? t : "object" == typeof t && "lat" in t ? new r.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === n ? null : new r.LatLng(t, e)
    }, r.LatLngBounds = function(t, e) {
        if (t)
            for (var n = e ? [t, e] : t, i = 0, r = n.length; r > i; i++)
                this.extend(n[i])
    }, r.LatLngBounds.prototype = {extend: function(t) {
            if (!t)
                return this;
            var e = r.latLng(t);
            return t = null !== e ? e : r.latLngBounds(t), t instanceof r.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat), this._southWest.lng = Math.min(t.lng, this._southWest.lng), this._northEast.lat = Math.max(t.lat, this._northEast.lat), this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new r.LatLng(t.lat, t.lng), this._northEast = new r.LatLng(t.lat, t.lng)) : t instanceof r.LatLngBounds && (this.extend(t._southWest), this.extend(t._northEast)), this
        },pad: function(t) {
            var e = this._southWest, n = this._northEast, i = Math.abs(e.lat - n.lat) * t, o = Math.abs(e.lng - n.lng) * t;
            return new r.LatLngBounds(new r.LatLng(e.lat - i, e.lng - o), new r.LatLng(n.lat + i, n.lng + o))
        },getCenter: function() {
            return new r.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },getSouthWest: function() {
            return this._southWest
        },getNorthEast: function() {
            return this._northEast
        },getNorthWest: function() {
            return new r.LatLng(this.getNorth(), this.getWest())
        },getSouthEast: function() {
            return new r.LatLng(this.getSouth(), this.getEast())
        },getWest: function() {
            return this._southWest.lng
        },getSouth: function() {
            return this._southWest.lat
        },getEast: function() {
            return this._northEast.lng
        },getNorth: function() {
            return this._northEast.lat
        },contains: function(t) {
            t = "number" == typeof t[0] || t instanceof r.LatLng ? r.latLng(t) : r.latLngBounds(t);
            var e, n, i = this._southWest, o = this._northEast;
            return t instanceof r.LatLngBounds ? (e = t.getSouthWest(), n = t.getNorthEast()) : e = n = t, e.lat >= i.lat && n.lat <= o.lat && e.lng >= i.lng && n.lng <= o.lng
        },intersects: function(t) {
            t = r.latLngBounds(t);
            var e = this._southWest, n = this._northEast, i = t.getSouthWest(), o = t.getNorthEast(), a = o.lat >= e.lat && i.lat <= n.lat, s = o.lng >= e.lng && i.lng <= n.lng;
            return a && s
        },toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },equals: function(t) {
            return t ? (t = r.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast())) : !1
        },isValid: function() {
            return !(!this._southWest || !this._northEast)
        }}, r.latLngBounds = function(t, e) {
        return !t || t instanceof r.LatLngBounds ? t : new r.LatLngBounds(t, e)
    }, r.Projection = {}, r.Projection.SphericalMercator = {MAX_LATITUDE: 85.0511287798,project: function(t) {
            var e = r.LatLng.DEG_TO_RAD, n = this.MAX_LATITUDE, i = Math.max(Math.min(n, t.lat), -n), o = t.lng * e, a = i * e;
            return a = Math.log(Math.tan(Math.PI / 4 + a / 2)), new r.Point(o, a)
        },unproject: function(t) {
            var e = r.LatLng.RAD_TO_DEG, n = t.x * e, i = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
            return new r.LatLng(i, n)
        }}, r.Projection.LonLat = {project: function(t) {
            return new r.Point(t.lng, t.lat)
        },unproject: function(t) {
            return new r.LatLng(t.y, t.x)
        }}, r.CRS = {latLngToPoint: function(t, e) {
            var n = this.projection.project(t), i = this.scale(e);
            return this.transformation._transform(n, i)
        },pointToLatLng: function(t, e) {
            var n = this.scale(e), i = this.transformation.untransform(t, n);
            return this.projection.unproject(i)
        },project: function(t) {
            return this.projection.project(t)
        },scale: function(t) {
            return 256 * Math.pow(2, t)
        },getSize: function(t) {
            var e = this.scale(t);
            return r.point(e, e)
        }}, r.CRS.Simple = r.extend({}, r.CRS, {projection: r.Projection.LonLat,transformation: new r.Transformation(1, 0, -1, 0),scale: function(t) {
            return Math.pow(2, t)
        }}), r.CRS.EPSG3857 = r.extend({}, r.CRS, {code: "EPSG:3857",projection: r.Projection.SphericalMercator,transformation: new r.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),project: function(t) {
            var e = this.projection.project(t), n = 6378137;
            return e.multiplyBy(n)
        }}), r.CRS.EPSG900913 = r.extend({}, r.CRS.EPSG3857, {code: "EPSG:900913"}), r.CRS.EPSG4326 = r.extend({}, r.CRS, {code: "EPSG:4326",projection: r.Projection.LonLat,transformation: new r.Transformation(1 / 360, .5, -1 / 360, .5)}), r.Map = r.Class.extend({includes: r.Mixin.Events,options: {crs: r.CRS.EPSG3857,fadeAnimation: r.DomUtil.TRANSITION && !r.Browser.android23,trackResize: !0,markerZoomAnimation: r.DomUtil.TRANSITION && r.Browser.any3d},initialize: function(t, e) {
            e = r.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = r.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.center && e.zoom !== n && this.setView(r.latLng(e.center), e.zoom, {reset: !0}), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(e.layers)
        },setView: function(t, e) {
            return e = e === n ? this.getZoom() : e, this._resetView(r.latLng(t), this._limitZoom(e)), this
        },setZoom: function(t, e) {
            return this._loaded ? this.setView(this.getCenter(), t, {zoom: e}) : (this._zoom = this._limitZoom(t), this)
        },zoomIn: function(t, e) {
            return this.setZoom(this._zoom + (t || 1), e)
        },zoomOut: function(t, e) {
            return this.setZoom(this._zoom - (t || 1), e)
        },setZoomAround: function(t, e, n) {
            var i = this.getZoomScale(e), o = this.getSize().divideBy(2), a = t instanceof r.Point ? t : this.latLngToContainerPoint(t), s = a.subtract(o).multiplyBy(1 - 1 / i), u = this.containerPointToLatLng(o.add(s));
            return this.setView(u, e, {zoom: n})
        },fitBounds: function(t, e) {
            e = e || {}, t = t.getBounds ? t.getBounds() : r.latLngBounds(t);
            var n = r.point(e.paddingTopLeft || e.padding || [0, 0]), i = r.point(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, n.add(i)), a = i.subtract(n).divideBy(2), s = this.project(t.getSouthWest(), o), u = this.project(t.getNorthEast(), o), l = this.unproject(s.add(u).divideBy(2).add(a), o);
            return o = e && e.maxZoom ? Math.min(e.maxZoom, o) : o, this.setView(l, o, e)
        },fitWorld: function(t) {
            return this.fitBounds([[-90, -180], [90, 180]], t)
        },panTo: function(t, e) {
            return this.setView(t, this._zoom, {pan: e})
        },panBy: function(t) {
            return this.fire("movestart"), this._rawPanBy(r.point(t)), this.fire("move"), this.fire("moveend")
        },setMaxBounds: function(t) {
            return t = r.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
        },panInsideBounds: function(t, e) {
            var n = this.getCenter(), i = this._limitCenter(n, this._zoom, t);
            return n.equals(i) ? this : this.panTo(i, e)
        },addLayer: function(t) {
            var e = r.stamp(t);
            return this._layers[e] ? this : (this._layers[e] = t, !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t, this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && t instanceof r.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, t.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(t), this)
        },removeLayer: function(t) {
            var e = r.stamp(t);
            return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && this.fire("layerremove", {layer: t}), this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && t instanceof r.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, t.off("load", this._onTileLayerLoad, this)), this) : this
        },hasLayer: function(t) {
            return t ? r.stamp(t) in this._layers : !1
        },eachLayer: function(t, e) {
            for (var n in this._layers)
                t.call(e, this._layers[n]);
            return this
        },invalidateSize: function(t) {
            if (!this._loaded)
                return this;
            t = r.extend({animate: !1,pan: !0}, t === !0 ? {animate: !0} : t);
            var e = this.getSize();
            this._sizeChanged = !0, this._initialCenter = null;
            var n = this.getSize(), i = e.divideBy(2).round(), o = n.divideBy(2).round(), a = i.subtract(o);
            return a.x || a.y ? (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(r.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {oldSize: e,newSize: n})) : this
        },addHandler: function(t, e) {
            if (!e)
                return this;
            var n = this[t] = new e(this);
            return this._handlers.push(n), this.options[t] && n.enable(), this
        },remove: function() {
            this._loaded && this.fire("unload"), this._initEvents("off");
            try {
                delete this._container._leaflet
            } catch (t) {
                this._container._leaflet = n
            }
            return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
        },getCenter: function() {
            return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },getZoom: function() {
            return this._zoom
        },getBounds: function() {
            var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), n = this.unproject(t.getTopRight());
            return new r.LatLngBounds(e, n)
        },getMinZoom: function() {
            return this.options.minZoom === n ? this._layersMinZoom === n ? 0 : this._layersMinZoom : this.options.minZoom
        },getMaxZoom: function() {
            return this.options.maxZoom === n ? this._layersMaxZoom === n ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },getBoundsZoom: function(t, e, n) {
            t = r.latLngBounds(t);
            var i, o = this.getMinZoom() - (e ? 1 : 0), a = this.getMaxZoom(), s = this.getSize(), u = t.getNorthWest(), l = t.getSouthEast(), h = !0;
            n = r.point(n || [0, 0]);
            do
                o++, i = this.project(l, o).subtract(this.project(u, o)).add(n), h = e ? i.x < s.x || i.y < s.y : s.contains(i);
            while (h && a >= o);
            return h && e ? null : e ? o : o - 1
        },getSize: function() {
            return (!this._size || this._sizeChanged) && (this._size = new r.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
        },getPixelBounds: function() {
            var t = this._getTopLeftPoint();
            return new r.Bounds(t, t.add(this.getSize()))
        },getPixelOrigin: function() {
            return this._checkIfLoaded(), this._initialTopLeftPoint
        },getPanes: function() {
            return this._panes
        },getContainer: function() {
            return this._container
        },getZoomScale: function(t) {
            var e = this.options.crs;
            return e.scale(t) / e.scale(this._zoom)
        },getScaleZoom: function(t) {
            return this._zoom + Math.log(t) / Math.LN2
        },project: function(t, e) {
            return e = e === n ? this._zoom : e, this.options.crs.latLngToPoint(r.latLng(t), e)
        },unproject: function(t, e) {
            return e = e === n ? this._zoom : e, this.options.crs.pointToLatLng(r.point(t), e)
        },layerPointToLatLng: function(t) {
            var e = r.point(t).add(this.getPixelOrigin());
            return this.unproject(e)
        },latLngToLayerPoint: function(t) {
            var e = this.project(r.latLng(t))._round();
            return e._subtract(this.getPixelOrigin())
        },containerPointToLayerPoint: function(t) {
            return r.point(t).subtract(this._getMapPanePos())
        },layerPointToContainerPoint: function(t) {
            return r.point(t).add(this._getMapPanePos())
        },containerPointToLatLng: function(t) {
            var e = this.containerPointToLayerPoint(r.point(t));
            return this.layerPointToLatLng(e)
        },latLngToContainerPoint: function(t) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(r.latLng(t)))
        },mouseEventToContainerPoint: function(t) {
            return r.DomEvent.getMousePosition(t, this._container)
        },mouseEventToLayerPoint: function(t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
        },mouseEventToLatLng: function(t) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
        },_initContainer: function(t) {
            var e = this._container = r.DomUtil.get(t);
            if (!e)
                throw Error("Map container not found.");
            if (e._leaflet)
                throw Error("Map container is already initialized.");
            e._leaflet = !0
        },_initLayout: function() {
            var t = this._container;
            r.DomUtil.addClass(t, "leaflet-container" + (r.Browser.touch ? " leaflet-touch" : "") + (r.Browser.retina ? " leaflet-retina" : "") + (r.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
            var e = r.DomUtil.getStyle(t, "position");
            "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
        },_initPanes: function() {
            var t = this._panes = {};
            this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), t.shadowPane = this._createPane("leaflet-shadow-pane"), t.overlayPane = this._createPane("leaflet-overlay-pane"), t.markerPane = this._createPane("leaflet-marker-pane"), t.popupPane = this._createPane("leaflet-popup-pane");
            var e = " leaflet-zoom-hide";
            this.options.markerZoomAnimation || (r.DomUtil.addClass(t.markerPane, e), r.DomUtil.addClass(t.shadowPane, e), r.DomUtil.addClass(t.popupPane, e))
        },_createPane: function(t, e) {
            return r.DomUtil.create("div", t, e || this._panes.objectsPane)
        },_clearPanes: function() {
            this._container.removeChild(this._mapPane)
        },_addLayers: function(t) {
            t = t ? r.Util.isArray(t) ? t : [t] : [];
            for (var e = 0, n = t.length; n > e; e++)
                this.addLayer(t[e])
        },_resetView: function(t, e, n, i) {
            var o = this._zoom !== e;
            i || (this.fire("movestart"), o && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(t), n ? this._initialTopLeftPoint._add(this._getMapPanePos()) : r.DomUtil.setPosition(this._mapPane, new r.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
            var a = !this._loaded;
            this._loaded = !0, a && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("viewreset", {hard: !n}), this.fire("move"), (o || i) && this.fire("zoomend"), this.fire("moveend", {hard: !n})
        },_rawPanBy: function(t) {
            r.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
        },_getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },_updateZoomLevels: function() {
            var t, e = 1 / 0, i = -1 / 0, r = this._getZoomSpan();
            for (t in this._zoomBoundLayers) {
                var o = this._zoomBoundLayers[t];
                isNaN(o.options.minZoom) || (e = Math.min(e, o.options.minZoom)), isNaN(o.options.maxZoom) || (i = Math.max(i, o.options.maxZoom))
            }
            t === n ? this._layersMaxZoom = this._layersMinZoom = n : (this._layersMaxZoom = i, this._layersMinZoom = e), r !== this._getZoomSpan() && this.fire("zoomlevelschange")
        },_panInsideMaxBounds: function() {
            this.panInsideBounds(this.options.maxBounds)
        },_checkIfLoaded: function() {
            if (!this._loaded)
                throw Error("Set map center and zoom first.")
        },_initEvents: function(e) {
            if (r.DomEvent) {
                e = e || "on", r.DomEvent[e](this._container, "click", this._onMouseClick, this);
                var n, i, o = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
                for (n = 0, i = o.length; i > n; n++)
                    r.DomEvent[e](this._container, o[n], this._fireMouseEvent, this);
                this.options.trackResize && r.DomEvent[e](t, "resize", this._onResize, this)
            }
        },_onResize: function() {
            r.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = r.Util.requestAnimFrame(function() {
                this.invalidateSize({debounceMoveend: !0})
            }, this, !1, this._container)
        },_onMouseClick: function(t) {
            !this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || r.DomEvent._skipped(t) || (this.fire("preclick"), this._fireMouseEvent(t))
        },_fireMouseEvent: function(t) {
            if (this._loaded && !r.DomEvent._skipped(t)) {
                var e = t.type;
                if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e)) {
                    "contextmenu" === e && r.DomEvent.preventDefault(t);
                    var n = this.mouseEventToContainerPoint(t), i = this.containerPointToLayerPoint(n), o = this.layerPointToLatLng(i);
                    this.fire(e, {latlng: o,layerPoint: i,containerPoint: n,originalEvent: t})
                }
            }
        },_onTileLayerLoad: function() {
            this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
        },_clearHandlers: function() {
            for (var t = 0, e = this._handlers.length; e > t; t++)
                this._handlers[t].disable()
        },whenReady: function(t, e) {
            return this._loaded ? t.call(e || this, this) : this.on("load", t, e), this
        },_layerAdd: function(t) {
            t.onAdd(this), this.fire("layeradd", {layer: t})
        },_getMapPanePos: function() {
            return r.DomUtil.getPosition(this._mapPane)
        },_moved: function() {
            var t = this._getMapPanePos();
            return t && !t.equals([0, 0])
        },_getTopLeftPoint: function() {
            return this.getPixelOrigin().subtract(this._getMapPanePos())
        },_getNewTopLeftPoint: function(t, e) {
            var n = this.getSize()._divideBy(2);
            return this.project(t, e)._subtract(n)._round()
        },_latLngToNewLayerPoint: function(t, e, n) {
            var i = this._getNewTopLeftPoint(n, e).add(this._getMapPanePos());
            return this.project(t, e)._subtract(i)
        },_getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },_getCenterOffset: function(t) {
            return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
        },_limitCenter: function(t, e, n) {
            if (!n)
                return t;
            var i = this.project(t, e), o = this.getSize().divideBy(2), a = new r.Bounds(i.subtract(o), i.add(o)), s = this._getBoundsOffset(a, n, e);
            return this.unproject(i.add(s), e)
        },_limitOffset: function(t, e) {
            if (!e)
                return t;
            var n = this.getPixelBounds(), i = new r.Bounds(n.min.add(t), n.max.add(t));
            return t.add(this._getBoundsOffset(i, e))
        },_getBoundsOffset: function(t, e, n) {
            var i = this.project(e.getNorthWest(), n).subtract(t.min), o = this.project(e.getSouthEast(), n).subtract(t.max), a = this._rebound(i.x, -o.x), s = this._rebound(i.y, -o.y);
            return new r.Point(a, s)
        },_rebound: function(t, e) {
            return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
        },_limitZoom: function(t) {
            var e = this.getMinZoom(), n = this.getMaxZoom();
            return Math.max(e, Math.min(n, t))
        }}), r.map = function(t, e) {
        return new r.Map(t, e)
    }, r.Projection.Mercator = {MAX_LATITUDE: 85.0840591556,R_MINOR: 6356752.314245179,R_MAJOR: 6378137,project: function(t) {
            var e = r.LatLng.DEG_TO_RAD, n = this.MAX_LATITUDE, i = Math.max(Math.min(n, t.lat), -n), o = this.R_MAJOR, a = this.R_MINOR, s = t.lng * e * o, u = i * e, l = a / o, h = Math.sqrt(1 - l * l), c = h * Math.sin(u);
            c = Math.pow((1 - c) / (1 + c), .5 * h);
            var f = Math.tan(.5 * (.5 * Math.PI - u)) / c;
            return u = -o * Math.log(f), new r.Point(s, u)
        },unproject: function(t) {
            for (var e, n = r.LatLng.RAD_TO_DEG, i = this.R_MAJOR, o = this.R_MINOR, a = t.x * n / i, s = o / i, u = Math.sqrt(1 - s * s), l = Math.exp(-t.y / i), h = Math.PI / 2 - 2 * Math.atan(l), c = 15, f = 1e-7, p = c, d = .1; Math.abs(d) > f && --p > 0; )
                e = u * Math.sin(h), d = Math.PI / 2 - 2 * Math.atan(l * Math.pow((1 - e) / (1 + e), .5 * u)) - h, h += d;
            return new r.LatLng(h * n, a)
        }}, r.CRS.EPSG3395 = r.extend({}, r.CRS, {code: "EPSG:3395",projection: r.Projection.Mercator,transformation: function() {
            var t = r.Projection.Mercator, e = t.R_MAJOR, n = .5 / (Math.PI * e);
            return new r.Transformation(n, .5, -n, .5)
        }()}), r.TileLayer = r.Class.extend({includes: r.Mixin.Events,options: {minZoom: 0,maxZoom: 18,tileSize: 256,subdomains: "abc",errorTileUrl: "",attribution: "",zoomOffset: 0,opacity: 1,unloadInvisibleTiles: r.Browser.mobile,updateWhenIdle: r.Browser.mobile},initialize: function(t, e) {
            e = r.setOptions(this, e), e.detectRetina && r.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom > 0 && e.minZoom--, this.options.maxZoom--), e.bounds && (e.bounds = r.latLngBounds(e.bounds)), this._url = t;
            var n = this.options.subdomains;
            "string" == typeof n && (this.options.subdomains = n.split(""))
        },onAdd: function(t) {
            this._map = t, this._animated = t._zoomAnimated, this._initContainer(), t.on({viewreset: this._reset,moveend: this._update}, this), this._animated && t.on({zoomanim: this._animateZoom,zoomend: this._endZoomAnim}, this), this.options.updateWhenIdle || (this._limitedUpdate = r.Util.limitExecByInterval(this._update, 150, this), t.on("move", this._limitedUpdate, this)), this._reset(), this._update()
        },addTo: function(t) {
            return t.addLayer(this), this
        },onRemove: function(t) {
            this._container.parentNode.removeChild(this._container), t.off({viewreset: this._reset,moveend: this._update}, this), this._animated && t.off({zoomanim: this._animateZoom,zoomend: this._endZoomAnim}, this), this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this), this._container = null, this._map = null
        },bringToFront: function() {
            var t = this._map._panes.tilePane;
            return this._container && (t.appendChild(this._container), this._setAutoZIndex(t, Math.max)), this
        },bringToBack: function() {
            var t = this._map._panes.tilePane;
            return this._container && (t.insertBefore(this._container, t.firstChild), this._setAutoZIndex(t, Math.min)), this
        },getAttribution: function() {
            return this.options.attribution
        },getContainer: function() {
            return this._container
        },setOpacity: function(t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
        },setZIndex: function(t) {
            return this.options.zIndex = t, this._updateZIndex(), this
        },setUrl: function(t, e) {
            return this._url = t, e || this.redraw(), this
        },redraw: function() {
            return this._map && (this._reset({hard: !0}), this._update()), this
        },_updateZIndex: function() {
            this._container && this.options.zIndex !== n && (this._container.style.zIndex = this.options.zIndex)
        },_setAutoZIndex: function(t, e) {
            var n, i, r, o = t.children, a = -e(1 / 0, -1 / 0);
            for (i = 0, r = o.length; r > i; i++)
                o[i] !== this._container && (n = parseInt(o[i].style.zIndex, 10), isNaN(n) || (a = e(a, n)));
            this.options.zIndex = this._container.style.zIndex = (isFinite(a) ? a : 0) + e(1, -1)
        },_updateOpacity: function() {
            var t, e = this._tiles;
            if (r.Browser.ielt9)
                for (t in e)
                    r.DomUtil.setOpacity(e[t], this.options.opacity);
            else
                r.DomUtil.setOpacity(this._container, this.options.opacity)
        },_initContainer: function() {
            var t = this._map._panes.tilePane;
            if (!this._container) {
                if (this._container = r.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
                    var e = "leaflet-tile-container";
                    this._bgBuffer = r.DomUtil.create("div", e, this._container), this._tileContainer = r.DomUtil.create("div", e, this._container)
                } else
                    this._tileContainer = this._container;
                t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
            }
        },_reset: function(t) {
            for (var e in this._tiles)
                this.fire("tileunload", {tile: this._tiles[e]});
            this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && t && t.hard && this._clearBgBuffer(), this._initContainer()
        },_getTileSize: function() {
            var t = this._map, e = t.getZoom() + this.options.zoomOffset, n = this.options.maxNativeZoom, i = this.options.tileSize;
            return n && e > n && (i = Math.round(t.getZoomScale(e) / t.getZoomScale(n) * i)), i
        },_update: function() {
            if (this._map) {
                var t = this._map, e = t.getPixelBounds(), n = t.getZoom(), i = this._getTileSize();
                if (!(n > this.options.maxZoom || n < this.options.minZoom)) {
                    var o = r.bounds(e.min.divideBy(i)._floor(), e.max.divideBy(i)._floor());
                    this._addTilesFromCenterOut(o), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(o)
                }
            }
        },_addTilesFromCenterOut: function(t) {
            var n, i, o, a = [], s = t.getCenter();
            for (n = t.min.y; n <= t.max.y; n++)
                for (i = t.min.x; i <= t.max.x; i++)
                    o = new r.Point(i, n), this._tileShouldBeLoaded(o) && a.push(o);
            var u = a.length;
            if (0 !== u) {
                a.sort(function(t, e) {
                    return t.distanceTo(s) - e.distanceTo(s)
                });
                var l = e.createDocumentFragment();
                for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += u, i = 0; u > i; i++)
                    this._addTile(a[i], l);
                this._tileContainer.appendChild(l)
            }
        },_tileShouldBeLoaded: function(t) {
            if (t.x + ":" + t.y in this._tiles)
                return !1;
            var e = this.options;
            if (!e.continuousWorld) {
                var n = this._getWrapTileNum();
                if (e.noWrap && (t.x < 0 || t.x >= n.x) || t.y < 0 || t.y >= n.y)
                    return !1
            }
            if (e.bounds) {
                var i = e.tileSize, r = t.multiplyBy(i), o = r.add([i, i]), a = this._map.unproject(r), s = this._map.unproject(o);
                if (e.continuousWorld || e.noWrap || (a = a.wrap(), s = s.wrap()), !e.bounds.intersects([a, s]))
                    return !1
            }
            return !0
        },_removeOtherTiles: function(t) {
            var e, n, i, r;
            for (r in this._tiles)
                e = r.split(":"), n = parseInt(e[0], 10), i = parseInt(e[1], 10), (n < t.min.x || n > t.max.x || i < t.min.y || i > t.max.y) && this._removeTile(r)
        },_removeTile: function(t) {
            var e = this._tiles[t];
            this.fire("tileunload", {tile: e,url: e.src}), this.options.reuseTiles ? (r.DomUtil.removeClass(e, "leaflet-tile-loaded"), this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e), r.Browser.android || (e.onload = null, e.src = r.Util.emptyImageUrl), delete this._tiles[t]
        },_addTile: function(t, e) {
            var n = this._getTilePos(t), i = this._getTile();
            r.DomUtil.setPosition(i, n, r.Browser.chrome), this._tiles[t.x + ":" + t.y] = i, this._loadTile(i, t), i.parentNode !== this._tileContainer && e.appendChild(i)
        },_getZoomForUrl: function() {
            var t = this.options, e = this._map.getZoom();
            return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
        },_getTilePos: function(t) {
            var e = this._map.getPixelOrigin(), n = this._getTileSize();
            return t.multiplyBy(n).subtract(e)
        },getTileUrl: function(t) {
            return r.Util.template(this._url, r.extend({s: this._getSubdomain(t),z: t.z,x: t.x,y: t.y}, this.options))
        },_getWrapTileNum: function() {
            var t = this._map.options.crs, e = t.getSize(this._map.getZoom());
            return e.divideBy(this.options.tileSize)
        },_adjustTilePoint: function(t) {
            var e = this._getWrapTileNum();
            this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x), this.options.tms && (t.y = e.y - t.y - 1), t.z = this._getZoomForUrl()
        },_getSubdomain: function(t) {
            var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[e]
        },_getTile: function() {
            if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                var t = this._unusedTiles.pop();
                return this._resetTile(t), t
            }
            return this._createTile()
        },_resetTile: function() {
        },_createTile: function() {
            var t = r.DomUtil.create("img", "leaflet-tile");
            return t.style.width = t.style.height = this._getTileSize() + "px", t.galleryimg = "no", t.onselectstart = t.onmousemove = r.Util.falseFn, r.Browser.ielt9 && this.options.opacity !== n && r.DomUtil.setOpacity(t, this.options.opacity), r.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"), t
        },_loadTile: function(t, e) {
            t._layer = this, t.onload = this._tileOnLoad, t.onerror = this._tileOnError, this._adjustTilePoint(e), t.src = this.getTileUrl(e), this.fire("tileloadstart", {tile: t,url: t.src})
        },_tileLoaded: function() {
            this._tilesToLoad--, this._animated && r.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(r.bind(this._clearBgBuffer, this), 500)))
        },_tileOnLoad: function() {
            var t = this._layer;
            this.src !== r.Util.emptyImageUrl && (r.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {tile: this,url: this.src})), t._tileLoaded()
        },_tileOnError: function() {
            var t = this._layer;
            t.fire("tileerror", {tile: this,url: this.src});
            var e = t.options.errorTileUrl;
            e && (this.src = e), t._tileLoaded()
        }}), r.tileLayer = function(t, e) {
        return new r.TileLayer(t, e)
    }, r.TileLayer.WMS = r.TileLayer.extend({defaultWmsParams: {service: "WMS",request: "GetMap",version: "1.1.1",layers: "",styles: "",format: "image/jpeg",transparent: !1},initialize: function(t, e) {
            this._url = t;
            var n = r.extend({}, this.defaultWmsParams), i = e.tileSize || this.options.tileSize;
            n.width = n.height = e.detectRetina && r.Browser.retina ? 2 * i : i;
            for (var o in e)
                this.options.hasOwnProperty(o) || "crs" === o || (n[o] = e[o]);
            this.wmsParams = n, r.setOptions(this, e)
        },onAdd: function(t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[e] = this._crs.code, r.TileLayer.prototype.onAdd.call(this, t)
        },getTileUrl: function(t) {
            var e = this._map, n = this.options.tileSize, i = t.multiplyBy(n), o = i.add([n, n]), a = this._crs.project(e.unproject(i, t.z)), s = this._crs.project(e.unproject(o, t.z)), u = this._wmsVersion >= 1.3 && this._crs === r.CRS.EPSG4326 ? [s.y, a.x, a.y, s.x].join(",") : [a.x, s.y, s.x, a.y].join(","), l = r.Util.template(this._url, {s: this._getSubdomain(t)});
            return l + r.Util.getParamString(this.wmsParams, l, !0) + "&BBOX=" + u
        },setParams: function(t, e) {
            return r.extend(this.wmsParams, t), e || this.redraw(), this
        }}), r.tileLayer.wms = function(t, e) {
        return new r.TileLayer.WMS(t, e)
    }, r.TileLayer.Canvas = r.TileLayer.extend({options: {async: !1},initialize: function(t) {
            r.setOptions(this, t)
        },redraw: function() {
            this._map && (this._reset({hard: !0}), this._update());
            for (var t in this._tiles)
                this._redrawTile(this._tiles[t]);
            return this
        },_redrawTile: function(t) {
            this.drawTile(t, t._tilePoint, this._map._zoom)
        },_createTile: function() {
            var t = r.DomUtil.create("canvas", "leaflet-tile");
            return t.width = t.height = this.options.tileSize, t.onselectstart = t.onmousemove = r.Util.falseFn, t
        },_loadTile: function(t, e) {
            t._layer = this, t._tilePoint = e, this._redrawTile(t), this.options.async || this.tileDrawn(t)
        },drawTile: function() {
        },tileDrawn: function(t) {
            this._tileOnLoad.call(t)
        }}), r.tileLayer.canvas = function(t) {
        return new r.TileLayer.Canvas(t)
    }, r.ImageOverlay = r.Class.extend({includes: r.Mixin.Events,options: {opacity: 1},initialize: function(t, e, n) {
            this._url = t, this._bounds = r.latLngBounds(e), r.setOptions(this, n)
        },onAdd: function(t) {
            this._map = t, this._image || this._initImage(), t._panes.overlayPane.appendChild(this._image), t.on("viewreset", this._reset, this), t.options.zoomAnimation && r.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
        },onRemove: function(t) {
            t.getPanes().overlayPane.removeChild(this._image), t.off("viewreset", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
        },addTo: function(t) {
            return t.addLayer(this), this
        },setOpacity: function(t) {
            return this.options.opacity = t, this._updateOpacity(), this
        },bringToFront: function() {
            return this._image && this._map._panes.overlayPane.appendChild(this._image), this
        },bringToBack: function() {
            var t = this._map._panes.overlayPane;
            return this._image && t.insertBefore(this._image, t.firstChild), this
        },setUrl: function(t) {
            this._url = t, this._image.src = this._url
        },getAttribution: function() {
            return this.options.attribution
        },_initImage: function() {
            this._image = r.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && r.Browser.any3d ? r.DomUtil.addClass(this._image, "leaflet-zoom-animated") : r.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), r.extend(this._image, {galleryimg: "no",onselectstart: r.Util.falseFn,onmousemove: r.Util.falseFn,onload: r.bind(this._onImageLoad, this),src: this._url})
        },_animateZoom: function(t) {
            var e = this._map, n = this._image, i = e.getZoomScale(t.zoom), o = this._bounds.getNorthWest(), a = this._bounds.getSouthEast(), s = e._latLngToNewLayerPoint(o, t.zoom, t.center), u = e._latLngToNewLayerPoint(a, t.zoom, t.center)._subtract(s), l = s._add(u._multiplyBy(.5 * (1 - 1 / i)));
            n.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(l) + " scale(" + i + ") "
        },_reset: function() {
            var t = this._image, e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()), n = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
            r.DomUtil.setPosition(t, e), t.style.width = n.x + "px", t.style.height = n.y + "px"
        },_onImageLoad: function() {
            this.fire("load")
        },_updateOpacity: function() {
            r.DomUtil.setOpacity(this._image, this.options.opacity)
        }}), r.imageOverlay = function(t, e, n) {
        return new r.ImageOverlay(t, e, n)
    }, r.Icon = r.Class.extend({options: {className: ""},initialize: function(t) {
            r.setOptions(this, t)
        },createIcon: function(t) {
            return this._createIcon("icon", t)
        },createShadow: function(t) {
            return this._createIcon("shadow", t)
        },_createIcon: function(t, e) {
            var n = this._getIconUrl(t);
            if (!n) {
                if ("icon" === t)
                    throw Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            var i;
            return i = e && "IMG" === e.tagName ? this._createImg(n, e) : this._createImg(n), this._setIconStyles(i, t), i
        },_setIconStyles: function(t, e) {
            var n, i = this.options, o = r.point(i[e + "Size"]);
            n = "shadow" === e ? r.point(i.shadowAnchor || i.iconAnchor) : r.point(i.iconAnchor), !n && o && (n = o.divideBy(2, !0)), t.className = "leaflet-marker-" + e + " " + i.className, n && (t.style.marginLeft = -n.x + "px", t.style.marginTop = -n.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px")
        },_createImg: function(t, n) {
            t = 'http://upload.wikimedia.org/wikipedia/commons/9/9a/PNG_transparency_demonstration_2.png'
            return n = n || e.createElement("img"), n.src = t, n
        },_getIconUrl: function(t) {
            return r.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
        }}), r.icon = function(t) {
        return new r.Icon(t)
    }, r.Icon.Default = r.Icon.extend({options: {iconSize: [25, 41],iconAnchor: [12, 41],popupAnchor: [1, -34],shadowSize: [41, 41]},_getIconUrl: function(t) {
            var e = t + "Url";
            if (this.options[e])
                return this.options[e];
            r.Browser.retina && "icon" === t && (t += "-2x");
            var n = r.Icon.Default.imagePath;
            if (!n)
                throw Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return n + "/marker-" + t + ".png"
        }}), r.Icon.Default.imagePath = function() {
        var t, n, i, r, o, a = e.getElementsByTagName("script"), s = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
        for (t = 0, n = a.length; n > t; t++)
            if (i = a[t].src, r = i.match(s))
                return o = i.split(s)[0], (o ? o + "/" : "") + "images"
    }(), r.Marker = r.Class.extend({includes: r.Mixin.Events,options: {icon: new r.Icon.Default,title: "",alt: "",clickable: !0,draggable: !1,keyboard: !0,zIndexOffset: 0,opacity: 1,riseOnHover: !1,riseOffset: 250},initialize: function(t, e) {
            r.setOptions(this, e), this._latlng = r.latLng(t)
        },onAdd: function(t) {
            this._map = t, t.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
        },addTo: function(t) {
            return t.addLayer(this), this
        },onRemove: function(t) {
            this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), t.off({viewreset: this.update,zoomanim: this._animateZoom}, this), this._map = null
        },getLatLng: function() {
            return this._latlng
        },setLatLng: function(t) {
            return this._latlng = r.latLng(t), this.update(), this.fire("move", {latlng: this._latlng})
        },setZIndexOffset: function(t) {
            return this.options.zIndexOffset = t, this.update(), this
        },setIcon: function(t) {
            return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
        },update: function() {
            if (this._icon) {
                var t = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(t)
            }
            return this
        },_initIcon: function() {
            var t = this.options, e = this._map, n = e.options.zoomAnimation && e.options.markerZoomAnimation, i = n ? "leaflet-zoom-animated" : "leaflet-zoom-hide", o = t.icon.createIcon(this._icon), a = !1;
            o !== this._icon && (this._icon && this._removeIcon(), a = !0, t.title && (o.title = t.title), t.alt && (o.alt = t.alt)), r.DomUtil.addClass(o, i), t.keyboard && (o.tabIndex = "0"), this._icon = o, this._initInteraction(), t.riseOnHover && r.DomEvent.on(o, "mouseover", this._bringToFront, this).on(o, "mouseout", this._resetZIndex, this);
            var s = t.icon.createShadow(this._shadow), u = !1;
            s !== this._shadow && (this._removeShadow(), u = !0), s && r.DomUtil.addClass(s, i), this._shadow = s, t.opacity < 1 && this._updateOpacity();
            var l = this._map._panes;
            a && l.markerPane.appendChild(this._icon), s && u && l.shadowPane.appendChild(this._shadow)
        },_removeIcon: function() {
            this.options.riseOnHover && r.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
        },_removeShadow: function() {
            this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
        },_setPos: function(t) {
            r.DomUtil.setPosition(this._icon, t), this._shadow && r.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
        },_updateZIndex: function(t) {
            this._icon.style.zIndex = this._zIndex + t
        },_animateZoom: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(e)
        },_initInteraction: function() {
            if (this.options.clickable) {
                var t = this._icon, e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                r.DomUtil.addClass(t, "leaflet-clickable"), r.DomEvent.on(t, "click", this._onMouseClick, this), r.DomEvent.on(t, "keypress", this._onKeyPress, this);
                for (var n = 0; n < e.length; n++)
                    r.DomEvent.on(t, e[n], this._fireMouseEvent, this);
                r.Handler.MarkerDrag && (this.dragging = new r.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
            }
        },_onMouseClick: function(t) {
            var e = this.dragging && this.dragging.moved();
            (this.hasEventListeners(t.type) || e) && r.DomEvent.stopPropagation(t), e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {originalEvent: t,latlng: this._latlng})
        },_onKeyPress: function(t) {
            13 === t.keyCode && this.fire("click", {originalEvent: t,latlng: this._latlng})
        },_fireMouseEvent: function(t) {
            this.fire(t.type, {originalEvent: t,latlng: this._latlng}), "contextmenu" === t.type && this.hasEventListeners(t.type) && r.DomEvent.preventDefault(t), "mousedown" !== t.type ? r.DomEvent.stopPropagation(t) : r.DomEvent.preventDefault(t)
        },setOpacity: function(t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
        },_updateOpacity: function() {
            r.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && r.DomUtil.setOpacity(this._shadow, this.options.opacity)
        },_bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },_resetZIndex: function() {
            this._updateZIndex(0)
        }}), r.marker = function(t, e) {
        return new r.Marker(t, e)
    }, r.DivIcon = r.Icon.extend({options: {iconSize: [12, 12],className: "leaflet-div-icon",html: !1},createIcon: function(t) {
            var n = t && "DIV" === t.tagName ? t : e.createElement("div"), i = this.options;
            return n.innerHTML = i.html !== !1 ? i.html : "", i.bgPos && (n.style.backgroundPosition = -i.bgPos.x + "px " + -i.bgPos.y + "px"), this._setIconStyles(n, "icon"), n
        },createShadow: function() {
            return null
        }}), r.divIcon = function(t) {
        return new r.DivIcon(t)
    }, r.Map.mergeOptions({closePopupOnClick: !0}), r.Popup = r.Class.extend({includes: r.Mixin.Events,options: {minWidth: 50,maxWidth: 300,autoPan: !0,closeButton: !0,offset: [0, 7],autoPanPadding: [5, 5],keepInView: !1,className: "",zoomAnimation: !0},initialize: function(t, e) {
            r.setOptions(this, t), this._source = e, this._animated = r.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
        },onAdd: function(t) {
            this._map = t, this._container || this._initLayout();
            var e = t.options.fadeAnimation;
            e && r.DomUtil.setOpacity(this._container, 0), t._panes.popupPane.appendChild(this._container), t.on(this._getEvents(), this), this.update(), e && r.DomUtil.setOpacity(this._container, 1), this.fire("open"), t.fire("popupopen", {popup: this}), this._source && this._source.fire("popupopen", {popup: this})
        },addTo: function(t) {
            return t.addLayer(this), this
        },openOn: function(t) {
            return t.openPopup(this), this
        },onRemove: function(t) {
            t._panes.popupPane.removeChild(this._container), r.Util.falseFn(this._container.offsetWidth), t.off(this._getEvents(), this), t.options.fadeAnimation && r.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), t.fire("popupclose", {popup: this}), this._source && this._source.fire("popupclose", {popup: this})
        },getLatLng: function() {
            return this._latlng
        },setLatLng: function(t) {
            return this._latlng = r.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
        },getContent: function() {
            return this._content
        },setContent: function(t) {
            return this._content = t, this.update(), this
        },update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },_getEvents: function() {
            var t = {viewreset: this._updatePosition};
            return this._animated && (t.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
        },_close: function() {
            this._map && this._map.closePopup(this)
        },_initLayout: function() {
            var t, e = "leaflet-popup", n = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"), i = this._container = r.DomUtil.create("div", n);
            this.options.closeButton && (t = this._closeButton = r.DomUtil.create("a", e + "-close-button", i), t.href = "#close", t.innerHTML = "&#215;", r.DomEvent.disableClickPropagation(t), r.DomEvent.on(t, "click", this._onCloseButtonClick, this));
            var o = this._wrapper = r.DomUtil.create("div", e + "-content-wrapper", i);
            r.DomEvent.disableClickPropagation(o), this._contentNode = r.DomUtil.create("div", e + "-content", o), r.DomEvent.disableScrollPropagation(this._contentNode), r.DomEvent.on(o, "contextmenu", r.DomEvent.stopPropagation), this._tipContainer = r.DomUtil.create("div", e + "-tip-container", i), this._tip = r.DomUtil.create("div", e + "-tip", this._tipContainer)
        },_updateContent: function() {
            if (this._content) {
                if ("string" == typeof this._content)
                    this._contentNode.innerHTML = this._content;
                else {
                    for (; this._contentNode.hasChildNodes(); )
                        this._contentNode.removeChild(this._contentNode.firstChild);
                    this._contentNode.appendChild(this._content)
                }
                this.fire("contentupdate")
            }
        },_updateLayout: function() {
            var t = this._contentNode, e = t.style;
            e.width = "", e.whiteSpace = "nowrap";
            var n = t.offsetWidth;
            n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), e.width = n + 1 + "px", e.whiteSpace = "", e.height = "";
            var i = t.offsetHeight, o = this.options.maxHeight, a = "leaflet-popup-scrolled";
            o && i > o ? (e.height = o + "px", r.DomUtil.addClass(t, a)) : r.DomUtil.removeClass(t, a), this._containerWidth = this._container.offsetWidth
        },_updatePosition: function() {
            if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng), e = this._animated, n = r.point(this.options.offset);
                e && r.DomUtil.setPosition(this._container, t), this._containerBottom = -n.y - (e ? 0 : t.y), this._containerLeft = -Math.round(this._containerWidth / 2) + n.x + (e ? 0 : t.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
            }
        },_zoomAnimation: function(t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            r.DomUtil.setPosition(this._container, e)
        },_adjustPan: function() {
            if (this.options.autoPan) {
                var t = this._map, e = this._container.offsetHeight, n = this._containerWidth, i = new r.Point(this._containerLeft, -e - this._containerBottom);
                this._animated && i._add(r.DomUtil.getPosition(this._container));
                var o = t.layerPointToContainerPoint(i), a = r.point(this.options.autoPanPadding), s = r.point(this.options.autoPanPaddingTopLeft || a), u = r.point(this.options.autoPanPaddingBottomRight || a), l = t.getSize(), h = 0, c = 0;
                o.x + n + u.x > l.x && (h = o.x + n - l.x + u.x), o.x - h - s.x < 0 && (h = o.x - s.x), o.y + e + u.y > l.y && (c = o.y + e - l.y + u.y), o.y - c - s.y < 0 && (c = o.y - s.y), (h || c) && t.fire("autopanstart").panBy([h, c])
            }
        },_onCloseButtonClick: function(t) {
            this._close(), r.DomEvent.stop(t)
        }}), r.popup = function(t, e) {
        return new r.Popup(t, e)
    }, r.Map.include({openPopup: function(t, e, n) {
            if (this.closePopup(), !(t instanceof r.Popup)) {
                var i = t;
                t = new r.Popup(n).setLatLng(e).setContent(i)
            }
            return t._isOpen = !0, this._popup = t, this.addLayer(t)
        },closePopup: function(t) {
            return t && t !== this._popup || (t = this._popup, this._popup = null), t && (this.removeLayer(t), t._isOpen = !1), this
        }}), r.Marker.include({openPopup: function() {
            return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
        },closePopup: function() {
            return this._popup && this._popup._close(), this
        },togglePopup: function() {
            return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
        },bindPopup: function(t, e) {
            var n = r.point(this.options.icon.options.popupAnchor || [0, 0]);
            return n = n.add(r.Popup.prototype.options.offset), e && e.offset && (n = n.add(e.offset)), e = r.extend({offset: n}, e), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), t instanceof r.Popup ? (r.setOptions(t, e), this._popup = t) : this._popup = new r.Popup(e, this).setContent(t), this
        },setPopupContent: function(t) {
            return this._popup && this._popup.setContent(t), this
        },unbindPopup: function() {
            return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
        },getPopup: function() {
            return this._popup
        },_movePopup: function(t) {
            this._popup.setLatLng(t.latlng)
        }}), r.LayerGroup = r.Class.extend({initialize: function(t) {
            this._layers = {};
            var e, n;
            if (t)
                for (e = 0, n = t.length; n > e; e++)
                    this.addLayer(t[e])
        },addLayer: function(t) {
            var e = this.getLayerId(t);
            return this._layers[e] = t, this._map && this._map.addLayer(t), this
        },removeLayer: function(t) {
            var e = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
        },hasLayer: function(t) {
            return t ? t in this._layers || this.getLayerId(t) in this._layers : !1
        },clearLayers: function() {
            return this.eachLayer(this.removeLayer, this), this
        },invoke: function(t) {
            var e, n, i = Array.prototype.slice.call(arguments, 1);
            for (e in this._layers)
                n = this._layers[e], n[t] && n[t].apply(n, i);
            return this
        },onAdd: function(t) {
            this._map = t, this.eachLayer(t.addLayer, t)
        },onRemove: function(t) {
            this.eachLayer(t.removeLayer, t), this._map = null
        },addTo: function(t) {
            return t.addLayer(this), this
        },eachLayer: function(t, e) {
            for (var n in this._layers)
                t.call(e, this._layers[n]);
            return this
        },getLayer: function(t) {
            return this._layers[t]
        },getLayers: function() {
            var t = [];
            for (var e in this._layers)
                t.push(this._layers[e]);
            return t
        },setZIndex: function(t) {
            return this.invoke("setZIndex", t)
        },getLayerId: function(t) {
            return r.stamp(t)
        }}), r.layerGroup = function(t) {
        return new r.LayerGroup(t)
    }, r.FeatureGroup = r.LayerGroup.extend({includes: r.Mixin.Events,statics: {EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"},addLayer: function(t) {
            return this.hasLayer(t) ? this : ("on" in t && t.on(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {layer: t}))
        },removeLayer: function(t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.off(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {layer: t})) : this
        },bindPopup: function(t, e) {
            return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
        },openPopup: function(t) {
            for (var e in this._layers) {
                this._layers[e].openPopup(t);
                break
            }
            return this
        },setStyle: function(t) {
            return this.invoke("setStyle", t)
        },bringToFront: function() {
            return this.invoke("bringToFront")
        },bringToBack: function() {
            return this.invoke("bringToBack")
        },getBounds: function() {
            var t = new r.LatLngBounds;
            return this.eachLayer(function(e) {
                t.extend(e instanceof r.Marker ? e.getLatLng() : e.getBounds())
            }), t
        },_propagateEvent: function(t) {
            t = r.extend({layer: t.target,target: this}, t), this.fire(t.type, t)
        }}), r.featureGroup = function(t) {
        return new r.FeatureGroup(t)
    }, r.Path = r.Class.extend({includes: [r.Mixin.Events],statics: {CLIP_PADDING: function() {
                var e = r.Browser.mobile ? 1280 : 2e3, n = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
                return Math.max(0, Math.min(.5, n))
            }()},options: {stroke: !0,color: "#0033ff",dashArray: null,lineCap: null,lineJoin: null,weight: 5,opacity: .5,fill: !1,fillColor: null,fillOpacity: .2,clickable: !0},initialize: function(t) {
            r.setOptions(this, t)
        },onAdd: function(t) {
            this._map = t, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), t.on({viewreset: this.projectLatlngs,moveend: this._updatePath}, this)
        },addTo: function(t) {
            return t.addLayer(this), this
        },onRemove: function(t) {
            t._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, r.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), t.off({viewreset: this.projectLatlngs,moveend: this._updatePath}, this)
        },projectLatlngs: function() {
        },setStyle: function(t) {
            return r.setOptions(this, t), this._container && this._updateStyle(), this
        },redraw: function() {
            return this._map && (this.projectLatlngs(), this._updatePath()), this
        }}), r.Map.include({_updatePathViewport: function() {
            var t = r.Path.CLIP_PADDING, e = this.getSize(), n = r.DomUtil.getPosition(this._mapPane), i = n.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()), o = i.add(e.multiplyBy(1 + 2 * t)._round());
            this._pathViewport = new r.Bounds(i, o)
        }}), r.Path.SVG_NS = "http://www.w3.org/2000/svg", r.Browser.svg = !(!e.createElementNS || !e.createElementNS(r.Path.SVG_NS, "svg").createSVGRect), r.Path = r.Path.extend({statics: {SVG: r.Browser.svg},bringToFront: function() {
            var t = this._map._pathRoot, e = this._container;
            return e && t.lastChild !== e && t.appendChild(e), this
        },bringToBack: function() {
            var t = this._map._pathRoot, e = this._container, n = t.firstChild;
            return e && n !== e && t.insertBefore(e, n), this
        },getPathString: function() {
        },_createElement: function(t) {
            return e.createElementNS(r.Path.SVG_NS, t)
        },_initElements: function() {
            this._map._initPathRoot(), this._initPath(), this._initStyle()
        },_initPath: function() {
            this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && r.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
        },_initStyle: function() {
            this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
        },_updateStyle: function() {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
        },_updatePath: function() {
            var t = this.getPathString();
            t || (t = "M0 0"), this._path.setAttribute("d", t)
        },_initEvents: function() {
            if (this.options.clickable) {
                (r.Browser.svg || !r.Browser.vml) && r.DomUtil.addClass(this._path, "leaflet-clickable"), r.DomEvent.on(this._container, "click", this._onMouseClick, this);
                for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++)
                    r.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
            }
        },_onMouseClick: function(t) {
            this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
        },_fireMouseEvent: function(t) {
            if (this.hasEventListeners(t.type)) {
                var e = this._map, n = e.mouseEventToContainerPoint(t), i = e.containerPointToLayerPoint(n), o = e.layerPointToLatLng(i);
                this.fire(t.type, {latlng: o,layerPoint: i,containerPoint: n,originalEvent: t}), "contextmenu" === t.type && r.DomEvent.preventDefault(t), "mousemove" !== t.type && r.DomEvent.stopPropagation(t)
            }
        }}), r.Map.include({_initPathRoot: function() {
            this._pathRoot || (this._pathRoot = r.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && r.Browser.any3d ? (r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({zoomanim: this._animatePathZoom,zoomend: this._endPathZoom})) : r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
        },_animatePathZoom: function(t) {
            var e = this.getZoomScale(t.zoom), n = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
            this._pathRoot.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(n) + " scale(" + e + ") ", this._pathZooming = !0
        },_endPathZoom: function() {
            this._pathZooming = !1
        },_updateSvgViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var t = this._pathViewport, e = t.min, n = t.max, i = n.x - e.x, o = n.y - e.y, a = this._pathRoot, s = this._panes.overlayPane;
                r.Browser.mobileWebkit && s.removeChild(a), r.DomUtil.setPosition(a, e), a.setAttribute("width", i), a.setAttribute("height", o), a.setAttribute("viewBox", [e.x, e.y, i, o].join(" ")), r.Browser.mobileWebkit && s.appendChild(a)
            }
        }}), r.Path.include({bindPopup: function(t, e) {
            return t instanceof r.Popup ? this._popup = t : ((!this._popup || e) && (this._popup = new r.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
        },unbindPopup: function() {
            return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
        },openPopup: function(t) {
            return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({latlng: t})), this
        },closePopup: function() {
            return this._popup && this._popup._close(), this
        },_openPopup: function(t) {
            this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup)
        }}), r.Browser.vml = !r.Browser.svg && function() {
        try {
            var t = e.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var n = t.firstChild;
            return n.style.behavior = "url(#default#VML)", n && "object" == typeof n.adj
        } catch (i) {
            return !1
        }
    }(), r.Path = r.Browser.svg || !r.Browser.vml ? r.Path : r.Path.extend({statics: {VML: !0,CLIP_PADDING: .02},_createElement: function() {
            try {
                return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
                    return e.createElement("<lvml:" + t + ' class="lvml">')
                }
            } catch (t) {
                return function(t) {
                    return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        }(),_initPath: function() {
            var t = this._container = this._createElement("shape");
            r.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && r.DomUtil.addClass(t, "leaflet-clickable"), t.coordsize = "1 1", this._path = this._createElement("path"), t.appendChild(this._path), this._map._pathRoot.appendChild(t)
        },_initStyle: function() {
            this._updateStyle()
        },_updateStyle: function() {
            var t = this._stroke, e = this._fill, n = this.options, i = this._container;
            i.stroked = n.stroke, i.filled = n.fill, n.stroke ? (t || (t = this._stroke = this._createElement("stroke"), t.endcap = "round", i.appendChild(t)), t.weight = n.weight + "px", t.color = n.color, t.opacity = n.opacity, t.dashStyle = n.dashArray ? r.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : "", n.lineCap && (t.endcap = n.lineCap.replace("butt", "flat")), n.lineJoin && (t.joinstyle = n.lineJoin)) : t && (i.removeChild(t), this._stroke = null), n.fill ? (e || (e = this._fill = this._createElement("fill"), i.appendChild(e)), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (i.removeChild(e), this._fill = null)
        },_updatePath: function() {
            var t = this._container.style;
            t.display = "none", this._path.v = this.getPathString() + " ", t.display = ""
        }}), r.Map.include(r.Browser.svg || !r.Browser.vml ? {} : {_initPathRoot: function() {
            if (!this._pathRoot) {
                var t = this._pathRoot = e.createElement("div");
                t.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(t), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
            }
        }}), r.Browser.canvas = function() {
        return !!e.createElement("canvas").getContext
    }(), r.Path = r.Path.SVG && !t.L_PREFER_CANVAS || !r.Browser.canvas ? r.Path : r.Path.extend({statics: {CANVAS: !0,SVG: !1},redraw: function() {
            return this._map && (this.projectLatlngs(), this._requestUpdate()), this
        },setStyle: function(t) {
            return r.setOptions(this, t), this._map && (this._updateStyle(), this._requestUpdate()), this
        },onRemove: function(t) {
            t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this._map = null
        },_requestUpdate: function() {
            this._map && !r.Path._updateRequest && (r.Path._updateRequest = r.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
        },_fireMapMoveEnd: function() {
            r.Path._updateRequest = null, this.fire("moveend")
        },_initElements: function() {
            this._map._initPathRoot(), this._ctx = this._map._canvasCtx
        },_updateStyle: function() {
            var t = this.options;
            t.stroke && (this._ctx.lineWidth = t.weight, this._ctx.strokeStyle = t.color), t.fill && (this._ctx.fillStyle = t.fillColor || t.color)
        },_drawPath: function() {
            var t, e, n, i, o, a;
            for (this._ctx.beginPath(), t = 0, n = this._parts.length; n > t; t++) {
                for (e = 0, i = this._parts[t].length; i > e; e++)
                    o = this._parts[t][e], a = (0 === e ? "move" : "line") + "To", this._ctx[a](o.x, o.y);
                this instanceof r.Polygon && this._ctx.closePath()
            }
        },_checkIfEmpty: function() {
            return !this._parts.length
        },_updatePath: function() {
            if (!this._checkIfEmpty()) {
                var t = this._ctx, e = this.options;
                this._drawPath(), t.save(), this._updateStyle(), e.fill && (t.globalAlpha = e.fillOpacity, t.fill()), e.stroke && (t.globalAlpha = e.opacity, t.stroke()), t.restore()
            }
        },_initEvents: function() {
            this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click", this._onClick, this))
        },_onClick: function(t) {
            this._containsPoint(t.layerPoint) && this.fire("click", t)
        },_onMouseMove: function(t) {
            this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", t)))
        }}), r.Map.include(r.Path.SVG && !t.L_PREFER_CANVAS || !r.Browser.canvas ? {} : {_initPathRoot: function() {
            var t, n = this._pathRoot;
            n || (n = this._pathRoot = e.createElement("canvas"), n.style.position = "absolute", t = this._canvasCtx = n.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(n), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
        },_updateCanvasViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var t = this._pathViewport, e = t.min, n = t.max.subtract(e), i = this._pathRoot;
                r.DomUtil.setPosition(i, e), i.width = n.x, i.height = n.y, i.getContext("2d").translate(-e.x, -e.y)
            }
        }}), r.LineUtil = {simplify: function(t, e) {
            if (!e || !t.length)
                return t.slice();
            var n = e * e;
            return t = this._reducePoints(t, n), t = this._simplifyDP(t, n)
        },pointToSegmentDistance: function(t, e, n) {
            return Math.sqrt(this._sqClosestPointOnSegment(t, e, n, !0))
        },closestPointOnSegment: function(t, e, n) {
            return this._sqClosestPointOnSegment(t, e, n)
        },_simplifyDP: function(t, e) {
            var i = t.length, r = typeof Uint8Array != n + "" ? Uint8Array : Array, o = new r(i);
            o[0] = o[i - 1] = 1, this._simplifyDPStep(t, o, e, 0, i - 1);
            var a, s = [];
            for (a = 0; i > a; a++)
                o[a] && s.push(t[a]);
            return s
        },_simplifyDPStep: function(t, e, n, i, r) {
            var o, a, s, u = 0;
            for (a = i + 1; r - 1 >= a; a++)
                s = this._sqClosestPointOnSegment(t[a], t[i], t[r], !0), s > u && (o = a, u = s);
            u > n && (e[o] = 1, this._simplifyDPStep(t, e, n, i, o), this._simplifyDPStep(t, e, n, o, r))
        },_reducePoints: function(t, e) {
            for (var n = [t[0]], i = 1, r = 0, o = t.length; o > i; i++)
                this._sqDist(t[i], t[r]) > e && (n.push(t[i]), r = i);
            return o - 1 > r && n.push(t[o - 1]), n
        },clipSegment: function(t, e, n, i) {
            var r, o, a, s = i ? this._lastCode : this._getBitCode(t, n), u = this._getBitCode(e, n);
            for (this._lastCode = u; ; ) {
                if (!(s | u))
                    return [t, e];
                if (s & u)
                    return !1;
                r = s || u, o = this._getEdgeIntersection(t, e, r, n), a = this._getBitCode(o, n), r === s ? (t = o, s = a) : (e = o, u = a)
            }
        },_getEdgeIntersection: function(t, e, i, o) {
            var a = e.x - t.x, s = e.y - t.y, u = o.min, l = o.max;
            return 8 & i ? new r.Point(t.x + a * (l.y - t.y) / s, l.y) : 4 & i ? new r.Point(t.x + a * (u.y - t.y) / s, u.y) : 2 & i ? new r.Point(l.x, t.y + s * (l.x - t.x) / a) : 1 & i ? new r.Point(u.x, t.y + s * (u.x - t.x) / a) : n
        },_getBitCode: function(t, e) {
            var n = 0;
            return t.x < e.min.x ? n |= 1 : t.x > e.max.x && (n |= 2), t.y < e.min.y ? n |= 4 : t.y > e.max.y && (n |= 8), n
        },_sqDist: function(t, e) {
            var n = e.x - t.x, i = e.y - t.y;
            return n * n + i * i
        },_sqClosestPointOnSegment: function(t, e, n, i) {
            var o, a = e.x, s = e.y, u = n.x - a, l = n.y - s, h = u * u + l * l;
            return h > 0 && (o = ((t.x - a) * u + (t.y - s) * l) / h, o > 1 ? (a = n.x, s = n.y) : o > 0 && (a += u * o, s += l * o)), u = t.x - a, l = t.y - s, i ? u * u + l * l : new r.Point(a, s)
        }}, r.Polyline = r.Path.extend({initialize: function(t, e) {
            r.Path.prototype.initialize.call(this, e), this._latlngs = this._convertLatLngs(t)
        },options: {smoothFactor: 1,noClip: !1},projectLatlngs: function() {
            this._originalPoints = [];
            for (var t = 0, e = this._latlngs.length; e > t; t++)
                this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
        },getPathString: function() {
            for (var t = 0, e = this._parts.length, n = ""; e > t; t++)
                n += this._getPathPartStr(this._parts[t]);
            return n
        },getLatLngs: function() {
            return this._latlngs
        },setLatLngs: function(t) {
            return this._latlngs = this._convertLatLngs(t), this.redraw()
        },addLatLng: function(t) {
            return this._latlngs.push(r.latLng(t)), this.redraw()
        },spliceLatLngs: function() {
            var t = [].splice.apply(this._latlngs, arguments);
            return this._convertLatLngs(this._latlngs, !0), this.redraw(), t
        },closestLayerPoint: function(t) {
            for (var e, n, i = 1 / 0, o = this._parts, a = null, s = 0, u = o.length; u > s; s++)
                for (var l = o[s], h = 1, c = l.length; c > h; h++) {
                    e = l[h - 1], n = l[h];
                    var f = r.LineUtil._sqClosestPointOnSegment(t, e, n, !0);
                    i > f && (i = f, a = r.LineUtil._sqClosestPointOnSegment(t, e, n))
                }
            return a && (a.distance = Math.sqrt(i)), a
        },getBounds: function() {
            return new r.LatLngBounds(this.getLatLngs())
        },_convertLatLngs: function(t, e) {
            var n, i, o = e ? t : [];
            for (n = 0, i = t.length; i > n; n++) {
                if (r.Util.isArray(t[n]) && "number" != typeof t[n][0])
                    return;
                o[n] = r.latLng(t[n])
            }
            return o
        },_initEvents: function() {
            r.Path.prototype._initEvents.call(this)
        },_getPathPartStr: function(t) {
            for (var e, n = r.Path.VML, i = 0, o = t.length, a = ""; o > i; i++)
                e = t[i], n && e._round(), a += (i ? "L" : "M") + e.x + " " + e.y;
            return a
        },_clipPoints: function() {
            var t, e, i, o = this._originalPoints, a = o.length;
            if (this.options.noClip)
                return this._parts = [o], n;
            this._parts = [];
            var s = this._parts, u = this._map._pathViewport, l = r.LineUtil;
            for (t = 0, e = 0; a - 1 > t; t++)
                i = l.clipSegment(o[t], o[t + 1], u, t), i && (s[e] = s[e] || [], s[e].push(i[0]), (i[1] !== o[t + 1] || t === a - 2) && (s[e].push(i[1]), e++))
        },_simplifyPoints: function() {
            for (var t = this._parts, e = r.LineUtil, n = 0, i = t.length; i > n; n++)
                t[n] = e.simplify(t[n], this.options.smoothFactor)
        },_updatePath: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), r.Path.prototype._updatePath.call(this))
        }}), r.polyline = function(t, e) {
        return new r.Polyline(t, e)
    }, r.PolyUtil = {}, r.PolyUtil.clipPolygon = function(t, e) {
        var n, i, o, a, s, u, l, h, c, f = [1, 4, 2, 8], p = r.LineUtil;
        for (i = 0, l = t.length; l > i; i++)
            t[i]._code = p._getBitCode(t[i], e);
        for (a = 0; 4 > a; a++) {
            for (h = f[a], n = [], i = 0, l = t.length, o = l - 1; l > i; o = i++)
                s = t[i], u = t[o], s._code & h ? u._code & h || (c = p._getEdgeIntersection(u, s, h, e), c._code = p._getBitCode(c, e), n.push(c)) : (u._code & h && (c = p._getEdgeIntersection(u, s, h, e), c._code = p._getBitCode(c, e), n.push(c)), n.push(s));
            t = n
        }
        return t
    }, r.Polygon = r.Polyline.extend({options: {fill: !0},initialize: function(t, e) {
            r.Polyline.prototype.initialize.call(this, t, e), this._initWithHoles(t)
        },_initWithHoles: function(t) {
            var e, n, i;
            if (t && r.Util.isArray(t[0]) && "number" != typeof t[0][0])
                for (this._latlngs = this._convertLatLngs(t[0]), this._holes = t.slice(1), e = 0, n = this._holes.length; n > e; e++)
                    i = this._holes[e] = this._convertLatLngs(this._holes[e]), i[0].equals(i[i.length - 1]) && i.pop();
            t = this._latlngs, t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
        },projectLatlngs: function() {
            if (r.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
                var t, e, n, i;
                for (t = 0, n = this._holes.length; n > t; t++)
                    for (this._holePoints[t] = [], e = 0, i = this._holes[t].length; i > e; e++)
                        this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
            }
        },setLatLngs: function(t) {
            return t && r.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t), this.redraw()) : r.Polyline.prototype.setLatLngs.call(this, t)
        },_clipPoints: function() {
            var t = this._originalPoints, e = [];
            if (this._parts = [t].concat(this._holePoints), !this.options.noClip) {
                for (var n = 0, i = this._parts.length; i > n; n++) {
                    var o = r.PolyUtil.clipPolygon(this._parts[n], this._map._pathViewport);
                    o.length && e.push(o)
                }
                this._parts = e
            }
        },_getPathPartStr: function(t) {
            var e = r.Polyline.prototype._getPathPartStr.call(this, t);
            return e + (r.Browser.svg ? "z" : "x")
        }}), r.polygon = function(t, e) {
        return new r.Polygon(t, e)
    }, function() {
        function t(t) {
            return r.FeatureGroup.extend({initialize: function(t, e) {
                    this._layers = {}, this._options = e, this.setLatLngs(t)
                },setLatLngs: function(e) {
                    var n = 0, i = e.length;
                    for (this.eachLayer(function(t) {
                        i > n ? t.setLatLngs(e[n++]) : this.removeLayer(t)
                    }, this); i > n; )
                        this.addLayer(new t(e[n++], this._options));
                    return this
                },getLatLngs: function() {
                    var t = [];
                    return this.eachLayer(function(e) {
                        t.push(e.getLatLngs())
                    }), t
                }})
        }
        r.MultiPolyline = t(r.Polyline), r.MultiPolygon = t(r.Polygon), r.multiPolyline = function(t, e) {
            return new r.MultiPolyline(t, e)
        }, r.multiPolygon = function(t, e) {
            return new r.MultiPolygon(t, e)
        }
    }(), r.Rectangle = r.Polygon.extend({initialize: function(t, e) {
            r.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
        },setBounds: function(t) {
            this.setLatLngs(this._boundsToLatLngs(t))
        },_boundsToLatLngs: function(t) {
            return t = r.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }}), r.rectangle = function(t, e) {
        return new r.Rectangle(t, e)
    }, r.Circle = r.Path.extend({initialize: function(t, e, n) {
            r.Path.prototype.initialize.call(this, n), this._latlng = r.latLng(t), this._mRadius = e
        },options: {fill: !0},setLatLng: function(t) {
            return this._latlng = r.latLng(t), this.redraw()
        },setRadius: function(t) {
            return this._mRadius = t, this.redraw()
        },projectLatlngs: function() {
            var t = this._getLngRadius(), e = this._latlng, n = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
            this._point = this._map.latLngToLayerPoint(e), this._radius = Math.max(this._point.x - n.x, 1)
        },getBounds: function() {
            var t = this._getLngRadius(), e = 360 * (this._mRadius / 40075017), n = this._latlng;
            return new r.LatLngBounds([n.lat - e, n.lng - t], [n.lat + e, n.lng + t])
        },getLatLng: function() {
            return this._latlng
        },getPathString: function() {
            var t = this._point, e = this._radius;
            return this._checkIfEmpty() ? "" : r.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(), e = Math.round(e), "AL " + t.x + "," + t.y + " " + e + "," + e + " 0," + 23592600)
        },getRadius: function() {
            return this._mRadius
        },_getLatRadius: function() {
            return 360 * (this._mRadius / 40075017)
        },_getLngRadius: function() {
            return this._getLatRadius() / Math.cos(r.LatLng.DEG_TO_RAD * this._latlng.lat)
        },_checkIfEmpty: function() {
            if (!this._map)
                return !1;
            var t = this._map._pathViewport, e = this._radius, n = this._point;
            return n.x - e > t.max.x || n.y - e > t.max.y || n.x + e < t.min.x || n.y + e < t.min.y
        }}), r.circle = function(t, e, n) {
        return new r.Circle(t, e, n)
    }, r.CircleMarker = r.Circle.extend({options: {radius: 10,weight: 2},initialize: function(t, e) {
            r.Circle.prototype.initialize.call(this, t, null, e), this._radius = this.options.radius
        },projectLatlngs: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng)
        },_updateStyle: function() {
            r.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
        },setLatLng: function(t) {
            return r.Circle.prototype.setLatLng.call(this, t), this._popup && this._popup._isOpen && this._popup.setLatLng(t), this
        },setRadius: function(t) {
            return this.options.radius = this._radius = t, this.redraw()
        },getRadius: function() {
            return this._radius
        }}), r.circleMarker = function(t, e) {
        return new r.CircleMarker(t, e)
    }, r.Polyline.include(r.Path.CANVAS ? {_containsPoint: function(t, e) {
            var n, i, o, a, s, u, l, h = this.options.weight / 2;
            for (r.Browser.touch && (h += 10), n = 0, a = this._parts.length; a > n; n++)
                for (l = this._parts[n], i = 0, s = l.length, o = s - 1; s > i; o = i++)
                    if ((e || 0 !== i) && (u = r.LineUtil.pointToSegmentDistance(t, l[o], l[i]), h >= u))
                        return !0;
            return !1
        }} : {}), r.Polygon.include(r.Path.CANVAS ? {_containsPoint: function(t) {
            var e, n, i, o, a, s, u, l, h = !1;
            if (r.Polyline.prototype._containsPoint.call(this, t, !0))
                return !0;
            for (o = 0, u = this._parts.length; u > o; o++)
                for (e = this._parts[o], a = 0, l = e.length, s = l - 1; l > a; s = a++)
                    n = e[a], i = e[s], n.y > t.y != i.y > t.y && t.x < (i.x - n.x) * (t.y - n.y) / (i.y - n.y) + n.x && (h = !h);
            return h
        }} : {}), r.Circle.include(r.Path.CANVAS ? {_drawPath: function() {
            var t = this._point;
            this._ctx.beginPath(), this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
        },_containsPoint: function(t) {
            var e = this._point, n = this.options.stroke ? this.options.weight / 2 : 0;
            return t.distanceTo(e) <= this._radius + n
        }} : {}), r.CircleMarker.include(r.Path.CANVAS ? {_updateStyle: function() {
            r.Path.prototype._updateStyle.call(this)
        }} : {}), r.GeoJSON = r.FeatureGroup.extend({initialize: function(t, e) {
            r.setOptions(this, e), this._layers = {}, t && this.addData(t)
        },addData: function(t) {
            var e, n, i, o = r.Util.isArray(t) ? t : t.features;
            if (o) {
                for (e = 0, n = o.length; n > e; e++)
                    i = o[e], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(o[e]);
                return this
            }
            var a = this.options;
            if (!a.filter || a.filter(t)) {
                var s = r.GeoJSON.geometryToLayer(t, a.pointToLayer, a.coordsToLatLng, a);
                return s.feature = r.GeoJSON.asFeature(t), s.defaultOptions = s.options, this.resetStyle(s), a.onEachFeature && a.onEachFeature(t, s), this.addLayer(s)
            }
        },resetStyle: function(t) {
            var e = this.options.style;
            e && (r.Util.extend(t.options, t.defaultOptions), this._setLayerStyle(t, e))
        },setStyle: function(t) {
            this.eachLayer(function(e) {
                this._setLayerStyle(e, t)
            }, this)
        },_setLayerStyle: function(t, e) {
            "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
        }}), r.extend(r.GeoJSON, {geometryToLayer: function(t, e, n, i) {
            var o, a, s, u, l = "Feature" === t.type ? t.geometry : t, h = l.coordinates, c = [];
            switch (n = n || this.coordsToLatLng, l.type) {
                case "Point":
                    return o = n(h), e ? e(t, o) : new r.Marker(o);
                case "MultiPoint":
                    for (s = 0, u = h.length; u > s; s++)
                        o = n(h[s]), c.push(e ? e(t, o) : new r.Marker(o));
                    return new r.FeatureGroup(c);
                case "LineString":
                    return a = this.coordsToLatLngs(h, 0, n), new r.Polyline(a, i);
                case "Polygon":
                    if (2 === h.length && !h[1].length)
                        throw Error("Invalid GeoJSON object.");
                    return a = this.coordsToLatLngs(h, 1, n), new r.Polygon(a, i);
                case "MultiLineString":
                    return a = this.coordsToLatLngs(h, 1, n), new r.MultiPolyline(a, i);
                case "MultiPolygon":
                    return a = this.coordsToLatLngs(h, 2, n), new r.MultiPolygon(a, i);
                case "GeometryCollection":
                    for (s = 0, u = l.geometries.length; u > s; s++)
                        c.push(this.geometryToLayer({geometry: l.geometries[s],type: "Feature",properties: t.properties}, e, n, i));
                    return new r.FeatureGroup(c);
                default:
                    throw Error("Invalid GeoJSON object.")
            }
        },coordsToLatLng: function(t) {
            return new r.LatLng(t[1], t[0], t[2])
        },coordsToLatLngs: function(t, e, n) {
            var i, r, o, a = [];
            for (r = 0, o = t.length; o > r; r++)
                i = e ? this.coordsToLatLngs(t[r], e - 1, n) : (n || this.coordsToLatLng)(t[r]), a.push(i);
            return a
        },latLngToCoords: function(t) {
            var e = [t.lng, t.lat];
            return t.alt !== n && e.push(t.alt), e
        },latLngsToCoords: function(t) {
            for (var e = [], n = 0, i = t.length; i > n; n++)
                e.push(r.GeoJSON.latLngToCoords(t[n]));
            return e
        },getFeature: function(t, e) {
            return t.feature ? r.extend({}, t.feature, {geometry: e}) : r.GeoJSON.asFeature(e)
        },asFeature: function(t) {
            return "Feature" === t.type ? t : {type: "Feature",properties: {},geometry: t}
        }});
    var a = {toGeoJSON: function() {
            return r.GeoJSON.getFeature(this, {type: "Point",coordinates: r.GeoJSON.latLngToCoords(this.getLatLng())})
        }};
    r.Marker.include(a), r.Circle.include(a), r.CircleMarker.include(a), r.Polyline.include({toGeoJSON: function() {
            return r.GeoJSON.getFeature(this, {type: "LineString",coordinates: r.GeoJSON.latLngsToCoords(this.getLatLngs())})
        }}), r.Polygon.include({toGeoJSON: function() {
            var t, e, n, i = [r.GeoJSON.latLngsToCoords(this.getLatLngs())];
            if (i[0].push(i[0][0]), this._holes)
                for (t = 0, e = this._holes.length; e > t; t++)
                    n = r.GeoJSON.latLngsToCoords(this._holes[t]), n.push(n[0]), i.push(n);
            return r.GeoJSON.getFeature(this, {type: "Polygon",coordinates: i})
        }}), function() {
        function t(t) {
            return function() {
                var e = [];
                return this.eachLayer(function(t) {
                    e.push(t.toGeoJSON().geometry.coordinates)
                }), r.GeoJSON.getFeature(this, {type: t,coordinates: e})
            }
        }
        r.MultiPolyline.include({toGeoJSON: t("MultiLineString")}), r.MultiPolygon.include({toGeoJSON: t("MultiPolygon")}), r.LayerGroup.include({toGeoJSON: function() {
                var e, n = this.feature && this.feature.geometry, i = [];
                if (n && "MultiPoint" === n.type)
                    return t("MultiPoint").call(this);
                var o = n && "GeometryCollection" === n.type;
                return this.eachLayer(function(t) {
                    t.toGeoJSON && (e = t.toGeoJSON(), i.push(o ? e.geometry : r.GeoJSON.asFeature(e)))
                }), o ? r.GeoJSON.getFeature(this, {geometries: i,type: "GeometryCollection"}) : {type: "FeatureCollection",features: i}
            }})
    }(), r.geoJson = function(t, e) {
        return new r.GeoJSON(t, e)
    }, r.DomEvent = {addListener: function(t, e, i, o) {
            var a, s, u, l = r.stamp(i), h = "_leaflet_" + e + l;
            return t[h] ? this : (a = function(e) {
                return i.call(o || t, e || r.DomEvent._getEvent())
            }, r.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, a, l) : (r.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, a, l), "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", a, !1), t.addEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? (s = a, u = "mouseenter" === e ? "mouseover" : "mouseout", a = function(e) {
                return r.DomEvent._checkMouse(t, e) ? s(e) : n
            }, t.addEventListener(u, a, !1)) : "click" === e && r.Browser.android ? (s = a, a = function(t) {
                return r.DomEvent._filterClick(t, s)
            }, t.addEventListener(e, a, !1)) : t.addEventListener(e, a, !1) : "attachEvent" in t && t.attachEvent("on" + e, a), t[h] = a, this))
        },removeListener: function(t, e, n) {
            var i = r.stamp(n), o = "_leaflet_" + e + i, a = t[o];
            return a ? (r.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, i) : r.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, i) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", a, !1), t.removeEventListener(e, a, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", a, !1) : t.removeEventListener(e, a, !1) : "detachEvent" in t && t.detachEvent("on" + e, a), t[o] = null, this) : this
        },stopPropagation: function(t) {
            return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, r.DomEvent._skipped(t), this
        },disableScrollPropagation: function(t) {
            var e = r.DomEvent.stopPropagation;
            return r.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
        },disableClickPropagation: function(t) {
            for (var e = r.DomEvent.stopPropagation, n = r.Draggable.START.length - 1; n >= 0; n--)
                r.DomEvent.on(t, r.Draggable.START[n], e);
            return r.DomEvent.on(t, "click", r.DomEvent._fakeStop).on(t, "dblclick", e)
        },preventDefault: function(t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
        },stop: function(t) {
            return r.DomEvent.preventDefault(t).stopPropagation(t)
        },getMousePosition: function(t, n) {
            var i = e.body, o = e.documentElement, a = r.DomUtil.documentIsLtr() ? t.pageX ? t.pageX - i.scrollLeft - o.scrollLeft : t.clientX : r.Browser.gecko ? t.pageX - i.scrollLeft - o.scrollLeft : t.pageX ? t.pageX - i.scrollLeft + o.scrollLeft : t.clientX, s = t.pageY ? t.pageY - i.scrollTop - o.scrollTop : t.clientY, u = new r.Point(a, s);
            if (!n)
                return u;
            var l = n.getBoundingClientRect(), h = l.left - n.clientLeft, c = l.top - n.clientTop;
            return u._subtract(new r.Point(h, c))
        },getWheelDelta: function(t) {
            var e = 0;
            return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
        },_skipEvents: {},_fakeStop: function(t) {
            r.DomEvent._skipEvents[t.type] = !0
        },_skipped: function(t) {
            var e = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1, e
        },_checkMouse: function(t, e) {
            var n = e.relatedTarget;
            if (!n)
                return !0;
            try {
                for (; n && n !== t; )
                    n = n.parentNode
            } catch (i) {
                return !1
            }
            return n !== t
        },_getEvent: function() {
            var e = t.event;
            if (!e)
                for (var n = arguments.callee.caller; n && (e = n.arguments[0], !e || t.Event !== e.constructor); )
                    n = n.caller;
            return e
        },_filterClick: function(t, e) {
            var i = t.timeStamp || t.originalEvent.timeStamp, o = r.DomEvent._lastClick && i - r.DomEvent._lastClick;
            return o && o > 100 && 1e3 > o || t.target._simulatedClick && !t._simulated ? (r.DomEvent.stop(t), n) : (r.DomEvent._lastClick = i, e(t))
        }}, r.DomEvent.on = r.DomEvent.addListener, r.DomEvent.off = r.DomEvent.removeListener, r.Draggable = r.Class.extend({includes: r.Mixin.Events,statics: {START: r.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],END: {mousedown: "mouseup",touchstart: "touchend",pointerdown: "touchend",MSPointerDown: "touchend"},MOVE: {mousedown: "mousemove",touchstart: "touchmove",pointerdown: "touchmove",MSPointerDown: "touchmove"}},initialize: function(t, e) {
            this._element = t, this._dragStartTarget = e || t
        },enable: function() {
            if (!this._enabled) {
                for (var t = r.Draggable.START.length - 1; t >= 0; t--)
                    r.DomEvent.on(this._dragStartTarget, r.Draggable.START[t], this._onDown, this);
                this._enabled = !0
            }
        },disable: function() {
            if (this._enabled) {
                for (var t = r.Draggable.START.length - 1; t >= 0; t--)
                    r.DomEvent.off(this._dragStartTarget, r.Draggable.START[t], this._onDown, this);
                this._enabled = !1, this._moved = !1
            }
        },_onDown: function(t) {
            if (this._moved = !1, !(t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || (r.DomEvent.stopPropagation(t), r.Draggable._disabled || (r.DomUtil.disableImageDrag(), r.DomUtil.disableTextSelection(), this._moving)))) {
                var n = t.touches ? t.touches[0] : t;
                this._startPoint = new r.Point(n.clientX, n.clientY), this._startPos = this._newPos = r.DomUtil.getPosition(this._element), r.DomEvent.on(e, r.Draggable.MOVE[t.type], this._onMove, this).on(e, r.Draggable.END[t.type], this._onUp, this)
            }
        },_onMove: function(t) {
            if (t.touches && t.touches.length > 1)
                return this._moved = !0, n;
            var i = t.touches && 1 === t.touches.length ? t.touches[0] : t, o = new r.Point(i.clientX, i.clientY), a = o.subtract(this._startPoint);
            (a.x || a.y) && (r.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = r.DomUtil.getPosition(this._element).subtract(a), r.DomUtil.addClass(e.body, "leaflet-dragging"), r.DomUtil.addClass(t.target || t.srcElement, "leaflet-drag-target")), this._newPos = this._startPos.add(a), this._moving = !0, r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget))
        },_updatePosition: function() {
            this.fire("predrag"), r.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
        },_onUp: function(t) {
            r.DomUtil.removeClass(e.body, "leaflet-dragging"), r.DomUtil.removeClass(t.target || t.srcElement, "leaflet-drag-target");
            for (var n in r.Draggable.MOVE)
                r.DomEvent.off(e, r.Draggable.MOVE[n], this._onMove).off(e, r.Draggable.END[n], this._onUp);
            r.DomUtil.enableImageDrag(), r.DomUtil.enableTextSelection(), this._moved && this._moving && (r.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {distance: this._newPos.distanceTo(this._startPos)})), this._moving = !1
        }}), r.Handler = r.Class.extend({initialize: function(t) {
            this._map = t
        },enable: function() {
            this._enabled || (this._enabled = !0, this.addHooks())
        },disable: function() {
            this._enabled && (this._enabled = !1, this.removeHooks())
        },enabled: function() {
            return !!this._enabled
        }}), r.Map.mergeOptions({dragging: !0,inertia: !r.Browser.android23,inertiaDeceleration: 3400,inertiaMaxSpeed: 1 / 0,inertiaThreshold: r.Browser.touch ? 32 : 18,easeLinearity: .25,worldCopyJump: !1}), r.Map.Drag = r.Handler.extend({addHooks: function() {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new r.Draggable(t._mapPane, t._container), this._draggable.on({dragstart: this._onDragStart,drag: this._onDrag,dragend: this._onDragEnd}, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
            }
            this._draggable.enable()
        },removeHooks: function() {
            this._draggable.disable()
        },moved: function() {
            return this._draggable && this._draggable._moved
        },_onDragStart: function() {
            var t = this._map;
            t._panAnim && t._panAnim.stop(), t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
        },_onDrag: function() {
            if (this._map.options.inertia) {
                var t = this._lastTime = +new Date, e = this._lastPos = this._draggable._newPos;
                this._positions.push(e), this._times.push(t), t - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move").fire("drag")
        },_onViewReset: function() {
            var t = this._map.getSize()._divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.project([0, 180]).x
        },_onPreDrag: function() {
            var t = this._worldWidth, e = Math.round(t / 2), n = this._initialWorldOffset, i = this._draggable._newPos.x, r = (i - e + n) % t + e - n, o = (i + e + n) % t - e - n, a = Math.abs(r + n) < Math.abs(o + n) ? r : o;
            this._draggable._newPos.x = a
        },_onDragEnd: function(t) {
            var e = this._map, n = e.options, i = +new Date - this._lastTime, o = !n.inertia || i > n.inertiaThreshold || !this._positions[0];
            if (e.fire("dragend", t), o)
                e.fire("moveend");
            else {
                var a = this._lastPos.subtract(this._positions[0]), s = (this._lastTime + i - this._times[0]) / 1e3, u = n.easeLinearity, l = a.multiplyBy(u / s), h = l.distanceTo([0, 0]), c = Math.min(n.inertiaMaxSpeed, h), f = l.multiplyBy(c / h), p = c / (n.inertiaDeceleration * u), d = f.multiplyBy(-p / 2).round();
                d.x && d.y ? (d = e._limitOffset(d, e.options.maxBounds), r.Util.requestAnimFrame(function() {
                    e.panBy(d, {duration: p,easeLinearity: u,noMoveStart: !0})
                })) : e.fire("moveend")
            }
        }}), r.Map.addInitHook("addHandler", "dragging", r.Map.Drag), r.Map.mergeOptions({doubleClickZoom: !0}), r.Map.DoubleClickZoom = r.Handler.extend({addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },_onDoubleClick: function(t) {
            var e = this._map, n = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
            "center" === e.options.doubleClickZoom ? e.setZoom(n) : e.setZoomAround(t.containerPoint, n)
        }}), r.Map.addInitHook("addHandler", "doubleClickZoom", r.Map.DoubleClickZoom), r.Map.mergeOptions({scrollWheelZoom: !0}), r.Map.ScrollWheelZoom = r.Handler.extend({addHooks: function() {
            r.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), r.DomEvent.on(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault), this._delta = 0
        },removeHooks: function() {
            r.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), r.DomEvent.off(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault)
        },_onWheelScroll: function(t) {
            var e = r.DomEvent.getWheelDelta(t);
            this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var n = Math.max(40 - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(r.bind(this._performZoom, this), n), r.DomEvent.preventDefault(t), r.DomEvent.stopPropagation(t)
        },_performZoom: function() {
            var t = this._map, e = this._delta, n = t.getZoom();
            e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(n + e) - n, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(n + e) : t.setZoomAround(this._lastMousePos, n + e))
        }}), r.Map.addInitHook("addHandler", "scrollWheelZoom", r.Map.ScrollWheelZoom), r.extend(r.DomEvent, {_touchstart: r.Browser.msPointer ? "MSPointerDown" : r.Browser.pointer ? "pointerdown" : "touchstart",_touchend: r.Browser.msPointer ? "MSPointerUp" : r.Browser.pointer ? "pointerup" : "touchend",addDoubleTapListener: function(t, n, i) {
            function o(t) {
                var e;
                if (r.Browser.pointer ? (d.push(t.pointerId), e = d.length) : e = t.touches.length, !(e > 1)) {
                    var n = Date.now(), i = n - (s || n);
                    u = t.touches ? t.touches[0] : t, l = i > 0 && h >= i, s = n
                }
            }
            function a(t) {
                if (r.Browser.pointer) {
                    var e = d.indexOf(t.pointerId);
                    if (-1 === e)
                        return;
                    d.splice(e, 1)
                }
                if (l) {
                    if (r.Browser.pointer) {
                        var i, o = {};
                        for (var a in u)
                            i = u[a], o[a] = "function" == typeof i ? i.bind(u) : i;
                        u = o
                    }
                    u.type = "dblclick", n(u), s = null
                }
            }
            var s, u, l = !1, h = 250, c = "_leaflet_", f = this._touchstart, p = this._touchend, d = [];
            t[c + f + i] = o, t[c + p + i] = a;
            var m = r.Browser.pointer ? e.documentElement : t;
            return t.addEventListener(f, o, !1), m.addEventListener(p, a, !1), r.Browser.pointer && m.addEventListener(r.DomEvent.POINTER_CANCEL, a, !1), this
        },removeDoubleTapListener: function(t, n) {
            var i = "_leaflet_";
            return t.removeEventListener(this._touchstart, t[i + this._touchstart + n], !1), (r.Browser.pointer ? e.documentElement : t).removeEventListener(this._touchend, t[i + this._touchend + n], !1), r.Browser.pointer && e.documentElement.removeEventListener(r.DomEvent.POINTER_CANCEL, t[i + this._touchend + n], !1), this
        }}), r.extend(r.DomEvent, {POINTER_DOWN: r.Browser.msPointer ? "MSPointerDown" : "pointerdown",POINTER_MOVE: r.Browser.msPointer ? "MSPointerMove" : "pointermove",POINTER_UP: r.Browser.msPointer ? "MSPointerUp" : "pointerup",POINTER_CANCEL: r.Browser.msPointer ? "MSPointerCancel" : "pointercancel",_pointers: [],_pointerDocumentListener: !1,addPointerListener: function(t, e, n, i) {
            switch (e) {
                case "touchstart":
                    return this.addPointerListenerStart(t, e, n, i);
                case "touchend":
                    return this.addPointerListenerEnd(t, e, n, i);
                case "touchmove":
                    return this.addPointerListenerMove(t, e, n, i);
                default:
                    throw "Unknown touch event type"
            }
        },addPointerListenerStart: function(t, n, i, o) {
            var a = "_leaflet_", s = this._pointers, u = function(t) {
                r.DomEvent.preventDefault(t);
                for (var e = !1, n = 0; n < s.length; n++)
                    if (s[n].pointerId === t.pointerId) {
                        e = !0;
                        break
                    }
                e || s.push(t), t.touches = s.slice(), t.changedTouches = [t], i(t)
            };
            if (t[a + "touchstart" + o] = u, t.addEventListener(this.POINTER_DOWN, u, !1), !this._pointerDocumentListener) {
                var l = function(t) {
                    for (var e = 0; e < s.length; e++)
                        if (s[e].pointerId === t.pointerId) {
                            s.splice(e, 1);
                            break
                        }
                };
                e.documentElement.addEventListener(this.POINTER_UP, l, !1), e.documentElement.addEventListener(this.POINTER_CANCEL, l, !1), this._pointerDocumentListener = !0
            }
            return this
        },addPointerListenerMove: function(t, e, n, i) {
            function r(t) {
                if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
                    for (var e = 0; e < a.length; e++)
                        if (a[e].pointerId === t.pointerId) {
                            a[e] = t;
                            break
                        }
                    t.touches = a.slice(), t.changedTouches = [t], n(t)
                }
            }
            var o = "_leaflet_", a = this._pointers;
            return t[o + "touchmove" + i] = r, t.addEventListener(this.POINTER_MOVE, r, !1), this
        },addPointerListenerEnd: function(t, e, n, i) {
            var r = "_leaflet_", o = this._pointers, a = function(t) {
                for (var e = 0; e < o.length; e++)
                    if (o[e].pointerId === t.pointerId) {
                        o.splice(e, 1);
                        break
                    }
                t.touches = o.slice(), t.changedTouches = [t], n(t)
            };
            return t[r + "touchend" + i] = a, t.addEventListener(this.POINTER_UP, a, !1), t.addEventListener(this.POINTER_CANCEL, a, !1), this
        },removePointerListener: function(t, e, n) {
            var i = "_leaflet_", r = t[i + e + n];
            switch (e) {
                case "touchstart":
                    t.removeEventListener(this.POINTER_DOWN, r, !1);
                    break;
                case "touchmove":
                    t.removeEventListener(this.POINTER_MOVE, r, !1);
                    break;
                case "touchend":
                    t.removeEventListener(this.POINTER_UP, r, !1), t.removeEventListener(this.POINTER_CANCEL, r, !1)
            }
            return this
        }}), r.Map.mergeOptions({touchZoom: r.Browser.touch && !r.Browser.android23,bounceAtZoomLimits: !0}), r.Map.TouchZoom = r.Handler.extend({addHooks: function() {
            r.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },removeHooks: function() {
            r.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },_onTouchStart: function(t) {
            var n = this._map;
            if (t.touches && 2 === t.touches.length && !n._animatingZoom && !this._zooming) {
                var i = n.mouseEventToLayerPoint(t.touches[0]), o = n.mouseEventToLayerPoint(t.touches[1]), a = n._getCenterLayerPoint();
                this._startCenter = i.add(o)._divideBy(2), this._startDist = i.distanceTo(o), this._moved = !1, this._zooming = !0, this._centerOffset = a.subtract(this._startCenter), n._panAnim && n._panAnim.stop(), r.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), r.DomEvent.preventDefault(t)
            }
        },_onTouchMove: function(t) {
            var e = this._map;
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var n = e.mouseEventToLayerPoint(t.touches[0]), i = e.mouseEventToLayerPoint(t.touches[1]);
                this._scale = n.distanceTo(i) / this._startDist, this._delta = n._add(i)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (e.options.bounceAtZoomLimits || !(e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1)) && (this._moved || (r.DomUtil.addClass(e._mapPane, "leaflet-touching"), e.fire("movestart").fire("zoomstart"), this._moved = !0), r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), r.DomEvent.preventDefault(t))
            }
        },_updateOnMove: function() {
            var t = this._map, e = this._getScaleOrigin(), n = t.layerPointToLatLng(e), i = t.getScaleZoom(this._scale);
            t._animateZoom(n, i, this._startCenter, this._scale, this._delta)
        },_onTouchEnd: function() {
            if (!this._moved || !this._zooming)
                return this._zooming = !1, n;
            var t = this._map;
            this._zooming = !1, r.DomUtil.removeClass(t._mapPane, "leaflet-touching"), r.Util.cancelAnimFrame(this._animRequest), r.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
            var i = this._getScaleOrigin(), o = t.layerPointToLatLng(i), a = t.getZoom(), s = t.getScaleZoom(this._scale) - a, u = s > 0 ? Math.ceil(s) : Math.floor(s), l = t._limitZoom(a + u), h = t.getZoomScale(l) / this._scale;
            t._animateZoom(o, l, i, h)
        },_getScaleOrigin: function() {
            var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
            return this._startCenter.add(t)
        }}), r.Map.addInitHook("addHandler", "touchZoom", r.Map.TouchZoom), r.Map.mergeOptions({tap: !0,tapTolerance: 15}), r.Map.Tap = r.Handler.extend({addHooks: function() {
            r.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },removeHooks: function() {
            r.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },_onDown: function(t) {
            if (t.touches) {
                if (r.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1)
                    return this._fireClick = !1, clearTimeout(this._holdTimeout), n;
                var i = t.touches[0], o = i.target;
                this._startPos = this._newPos = new r.Point(i.clientX, i.clientY), o.tagName && "a" === o.tagName.toLowerCase() && r.DomUtil.addClass(o, "leaflet-active"), this._holdTimeout = setTimeout(r.bind(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                }, this), 1e3), r.DomEvent.on(e, "touchmove", this._onMove, this).on(e, "touchend", this._onUp, this)
            }
        },_onUp: function(t) {
            if (clearTimeout(this._holdTimeout), r.DomEvent.off(e, "touchmove", this._onMove, this).off(e, "touchend", this._onUp, this), this._fireClick && t && t.changedTouches) {
                var n = t.changedTouches[0], i = n.target;
                i && i.tagName && "a" === i.tagName.toLowerCase() && r.DomUtil.removeClass(i, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", n)
            }
        },_isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },_onMove: function(t) {
            var e = t.touches[0];
            this._newPos = new r.Point(e.clientX, e.clientY)
        },_simulateEvent: function(n, i) {
            var r = e.createEvent("MouseEvents");
            r._simulated = !0, i.target._simulatedClick = !0, r.initMouseEvent(n, !0, !0, t, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(r)
        }}), r.Browser.touch && !r.Browser.pointer && r.Map.addInitHook("addHandler", "tap", r.Map.Tap), r.Map.mergeOptions({boxZoom: !0}), r.Map.BoxZoom = r.Handler.extend({initialize: function(t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._moved = !1
        },addHooks: function() {
            r.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },removeHooks: function() {
            r.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
        },moved: function() {
            return this._moved
        },_onMouseDown: function(t) {
            return this._moved = !1, !t.shiftKey || 1 !== t.which && 1 !== t.button ? !1 : (r.DomUtil.disableTextSelection(), r.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(t), r.DomEvent.on(e, "mousemove", this._onMouseMove, this).on(e, "mouseup", this._onMouseUp, this).on(e, "keydown", this._onKeyDown, this), n)
        },_onMouseMove: function(t) {
            this._moved || (this._box = r.DomUtil.create("div", "leaflet-zoom-box", this._pane), r.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
            var e = this._startLayerPoint, n = this._box, i = this._map.mouseEventToLayerPoint(t), o = i.subtract(e), a = new r.Point(Math.min(i.x, e.x), Math.min(i.y, e.y));
            r.DomUtil.setPosition(n, a), this._moved = !0, n.style.width = Math.max(0, Math.abs(o.x) - 4) + "px", n.style.height = Math.max(0, Math.abs(o.y) - 4) + "px"
        },_finish: function() {
            this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), r.DomUtil.enableTextSelection(), r.DomUtil.enableImageDrag(), r.DomEvent.off(e, "mousemove", this._onMouseMove).off(e, "mouseup", this._onMouseUp).off(e, "keydown", this._onKeyDown)
        },_onMouseUp: function(t) {
            this._finish();
            var e = this._map, n = e.mouseEventToLayerPoint(t);
            if (!this._startLayerPoint.equals(n)) {
                var i = new r.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(n));
                e.fitBounds(i), e.fire("boxzoomend", {boxZoomBounds: i})
            }
        },_onKeyDown: function(t) {
            27 === t.keyCode && this._finish()
        }}), r.Map.addInitHook("addHandler", "boxZoom", r.Map.BoxZoom), r.Map.mergeOptions({keyboard: !0,keyboardPanOffset: 80,keyboardZoomOffset: 1}), r.Map.Keyboard = r.Handler.extend({keyCodes: {left: [37],right: [39],down: [40],up: [38],zoomIn: [187, 107, 61, 171],zoomOut: [189, 109, 173]},initialize: function(t) {
            this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
        },addHooks: function() {
            var t = this._map._container;
            -1 === t.tabIndex && (t.tabIndex = "0"), r.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
        },removeHooks: function() {
            this._removeHooks();
            var t = this._map._container;
            r.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
        },_onMouseDown: function() {
            if (!this._focused) {
                var n = e.body, i = e.documentElement, r = n.scrollTop || i.scrollTop, o = n.scrollLeft || i.scrollLeft;
                this._map._container.focus(), t.scrollTo(o, r)
            }
        },_onFocus: function() {
            this._focused = !0, this._map.fire("focus")
        },_onBlur: function() {
            this._focused = !1, this._map.fire("blur")
        },_setPanOffset: function(t) {
            var e, n, i = this._panKeys = {}, r = this.keyCodes;
            for (e = 0, n = r.left.length; n > e; e++)
                i[r.left[e]] = [-1 * t, 0];
            for (e = 0, n = r.right.length; n > e; e++)
                i[r.right[e]] = [t, 0];
            for (e = 0, n = r.down.length; n > e; e++)
                i[r.down[e]] = [0, t];
            for (e = 0, n = r.up.length; n > e; e++)
                i[r.up[e]] = [0, -1 * t]
        },_setZoomOffset: function(t) {
            var e, n, i = this._zoomKeys = {}, r = this.keyCodes;
            for (e = 0, n = r.zoomIn.length; n > e; e++)
                i[r.zoomIn[e]] = t;
            for (e = 0, n = r.zoomOut.length; n > e; e++)
                i[r.zoomOut[e]] = -t
        },_addHooks: function() {
            r.DomEvent.on(e, "keydown", this._onKeyDown, this)
        },_removeHooks: function() {
            r.DomEvent.off(e, "keydown", this._onKeyDown, this)
        },_onKeyDown: function(t) {
            var e = t.keyCode, n = this._map;
            if (e in this._panKeys) {
                if (n._panAnim && n._panAnim._inProgress)
                    return;
                n.panBy(this._panKeys[e]), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds)
            } else {
                if (!(e in this._zoomKeys))
                    return;
                n.setZoom(n.getZoom() + this._zoomKeys[e])
            }
            r.DomEvent.stop(t)
        }}), r.Map.addInitHook("addHandler", "keyboard", r.Map.Keyboard), r.Handler.MarkerDrag = r.Handler.extend({initialize: function(t) {
            this._marker = t
        },addHooks: function() {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new r.Draggable(t, t)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), r.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
        },removeHooks: function() {
            this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), r.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },moved: function() {
            return this._draggable && this._draggable._moved
        },_onDragStart: function() {
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },_onDrag: function() {
            var t = this._marker, e = t._shadow, n = r.DomUtil.getPosition(t._icon), i = t._map.layerPointToLatLng(n);
            e && r.DomUtil.setPosition(e, n), t._latlng = i, t.fire("move", {latlng: i}).fire("drag")
        },_onDragEnd: function(t) {
            this._marker.fire("moveend").fire("dragend", t)
        }}), r.Control = r.Class.extend({options: {position: "topright"},initialize: function(t) {
            r.setOptions(this, t)
        },getPosition: function() {
            return this.options.position
        },setPosition: function(t) {
            var e = this._map;
            return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
        },getContainer: function() {
            return this._container
        },addTo: function(t) {
            this._map = t;
            var e = this._container = this.onAdd(t), n = this.getPosition(), i = t._controlCorners[n];
            return r.DomUtil.addClass(e, "leaflet-control"), -1 !== n.indexOf("bottom") ? i.insertBefore(e, i.firstChild) : i.appendChild(e), this
        },removeFrom: function(t) {
            var e = this.getPosition(), n = t._controlCorners[e];
            return n.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(t), this
        },_refocusOnMap: function() {
            this._map && this._map.getContainer().focus()
        }}), r.control = function(t) {
        return new r.Control(t)
    }, r.Map.include({addControl: function(t) {
            return t.addTo(this), this
        },removeControl: function(t) {
            return t.removeFrom(this), this
        },_initControlPos: function() {
            function t(t, o) {
                var a = n + t + " " + n + o;
                e[t + o] = r.DomUtil.create("div", a, i)
            }
            var e = this._controlCorners = {}, n = "leaflet-", i = this._controlContainer = r.DomUtil.create("div", n + "control-container", this._container);
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
        },_clearControlPos: function() {
            this._container.removeChild(this._controlContainer)
        }}), r.Control.Zoom = r.Control.extend({options: {position: "topleft",zoomInText: "+",zoomInTitle: "Zoom in",zoomOutText: "-",zoomOutTitle: "Zoom out"},onAdd: function(t) {
            var e = "leaflet-control-zoom", n = r.DomUtil.create("div", e + " leaflet-bar");
            return this._map = t, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", n, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", n, this._zoomOut, this), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), n
        },onRemove: function(t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },_zoomIn: function(t) {
            this._map.zoomIn(t.shiftKey ? 3 : 1)
        },_zoomOut: function(t) {
            this._map.zoomOut(t.shiftKey ? 3 : 1)
        },_createButton: function(t, e, n, i, o, a) {
            var s = r.DomUtil.create("a", n, i);
            s.innerHTML = t, s.href = "#", s.title = e;
            var u = r.DomEvent.stopPropagation;
            return r.DomEvent.on(s, "click", u).on(s, "mousedown", u).on(s, "dblclick", u).on(s, "click", r.DomEvent.preventDefault).on(s, "click", o, a).on(s, "click", this._refocusOnMap, a), s
        },_updateDisabled: function() {
            var t = this._map, e = "leaflet-disabled";
            r.DomUtil.removeClass(this._zoomInButton, e), r.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && r.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && r.DomUtil.addClass(this._zoomInButton, e)
        }}), r.Map.mergeOptions({zoomControl: !0}), r.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new r.Control.Zoom, this.addControl(this.zoomControl))
    }), r.control.zoom = function(t) {
        return new r.Control.Zoom(t)
    }, r.Control.Attribution = r.Control.extend({options: {position: "bottomright",prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize: function(t) {
            r.setOptions(this, t), this._attributions = {}
        },onAdd: function(t) {
            this._container = r.DomUtil.create("div", "leaflet-control-attribution"), r.DomEvent.disableClickPropagation(this._container);
            for (var e in t._layers)
                t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
            return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
        },onRemove: function(t) {
            t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
        },setPrefix: function(t) {
            return this.options.prefix = t, this._update(), this
        },addAttribution: function(t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : n
        },removeAttribution: function(t) {
            return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : n
        },_update: function() {
            if (this._map) {
                var t = [];
                for (var e in this._attributions)
                    this._attributions[e] && t.push(e);
                var n = [];
                this.options.prefix && n.push(this.options.prefix), t.length && n.push(t.join(", ")), this._container.innerHTML = n.join(" | ")
            }
        },_onLayerAdd: function(t) {
            t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
        },_onLayerRemove: function(t) {
            t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
        }}), r.Map.mergeOptions({attributionControl: !0}), r.Map.addInitHook(function() {
        this.options.attributionControl && (this.attributionControl = (new r.Control.Attribution).addTo(this))
    }), r.control.attribution = function(t) {
        return new r.Control.Attribution(t)
    }, r.Control.Scale = r.Control.extend({options: {position: "bottomleft",maxWidth: 100,metric: !0,imperial: !0,updateWhenIdle: !1},onAdd: function(t) {
            this._map = t;
            var e = "leaflet-control-scale", n = r.DomUtil.create("div", e), i = this.options;
            return this._addScales(i, e, n), t.on(i.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), n
        },onRemove: function(t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },_addScales: function(t, e, n) {
            t.metric && (this._mScale = r.DomUtil.create("div", e + "-line", n)), t.imperial && (this._iScale = r.DomUtil.create("div", e + "-line", n))
        },_update: function() {
            var t = this._map.getBounds(), e = t.getCenter().lat, n = 6378137 * Math.PI * Math.cos(e * Math.PI / 180), i = n * (t.getNorthEast().lng - t.getSouthWest().lng) / 180, r = this._map.getSize(), o = this.options, a = 0;
            r.x > 0 && (a = i * (o.maxWidth / r.x)), this._updateScales(o, a)
        },_updateScales: function(t, e) {
            t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
        },_updateMetric: function(t) {
            var e = this._getRoundNum(t);
            this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
        },_updateImperial: function(t) {
            var e, n, i, r = 3.2808399 * t, o = this._iScale;
            r > 5280 ? (e = r / 5280, n = this._getRoundNum(e), o.style.width = this._getScaleWidth(n / e) + "px", o.innerHTML = n + " mi") : (i = this._getRoundNum(r), o.style.width = this._getScaleWidth(i / r) + "px", o.innerHTML = i + " ft")
        },_getScaleWidth: function(t) {
            return Math.round(this.options.maxWidth * t) - 10
        },_getRoundNum: function(t) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1), n = t / e;
            return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, e * n
        }}), r.control.scale = function(t) {
        return new r.Control.Scale(t)
    }, r.Control.Layers = r.Control.extend({options: {collapsed: !0,position: "topright",autoZIndex: !0},initialize: function(t, e, n) {
            r.setOptions(this, n), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
            for (var i in t)
                this._addLayer(t[i], i);
            for (i in e)
                this._addLayer(e[i], i, !0)
        },onAdd: function(t) {
            return this._initLayout(), this._update(), t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
        },onRemove: function(t) {
            t.off("layeradd", this._onLayerChange).off("layerremove", this._onLayerChange)
        },addBaseLayer: function(t, e) {
            return this._addLayer(t, e), this._update(), this
        },addOverlay: function(t, e) {
            return this._addLayer(t, e, !0), this._update(), this
        },removeLayer: function(t) {
            var e = r.stamp(t);
            return delete this._layers[e], this._update(), this
        },_initLayout: function() {
            var t = "leaflet-control-layers", e = this._container = r.DomUtil.create("div", t);
            e.setAttribute("aria-haspopup", !0), r.Browser.touch ? r.DomEvent.on(e, "click", r.DomEvent.stopPropagation) : r.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
            var n = this._form = r.DomUtil.create("form", t + "-list");
            if (this.options.collapsed) {
                r.Browser.android || r.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
                var i = this._layersLink = r.DomUtil.create("a", t + "-toggle", e);
                i.href = "#", i.title = "Layers", r.Browser.touch ? r.DomEvent.on(i, "click", r.DomEvent.stop).on(i, "click", this._expand, this) : r.DomEvent.on(i, "focus", this._expand, this), r.DomEvent.on(n, "click", function() {
                    setTimeout(r.bind(this._onInputClick, this), 0)
                }, this), this._map.on("click", this._collapse, this)
            } else
                this._expand();
            this._baseLayersList = r.DomUtil.create("div", t + "-base", n), this._separator = r.DomUtil.create("div", t + "-separator", n), this._overlaysList = r.DomUtil.create("div", t + "-overlays", n), e.appendChild(n)
        },_addLayer: function(t, e, n) {
            var i = r.stamp(t);
            this._layers[i] = {layer: t,name: e,overlay: n}, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
        },_update: function() {
            if (this._container) {
                this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
                var t, e, n = !1, i = !1;
                for (t in this._layers)
                    e = this._layers[t], this._addItem(e), i = i || e.overlay, n = n || !e.overlay;
                this._separator.style.display = i && n ? "" : "none"
            }
        },_onLayerChange: function(t) {
            var e = this._layers[r.stamp(t.layer)];
            if (e) {
                this._handlingClick || this._update();
                var n = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null;
                n && this._map.fire(n, e)
            }
        },_createRadioElement: function(t, n) {
            var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
            n && (i += ' checked="checked"'), i += "/>";
            var r = e.createElement("div");
            return r.innerHTML = i, r.firstChild
        },_addItem: function(t) {
            var n, i = e.createElement("label"), o = this._map.hasLayer(t.layer);
            t.overlay ? (n = e.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = o) : n = this._createRadioElement("leaflet-base-layers", o), n.layerId = r.stamp(t.layer), r.DomEvent.on(n, "click", this._onInputClick, this);
            var a = e.createElement("span");
            a.innerHTML = " " + t.name, i.appendChild(n), i.appendChild(a);
            var s = t.overlay ? this._overlaysList : this._baseLayersList;
            return s.appendChild(i), i
        },_onInputClick: function() {
            var t, e, n, i = this._form.getElementsByTagName("input"), r = i.length;
            for (this._handlingClick = !0, t = 0; r > t; t++)
                e = i[t], n = this._layers[e.layerId], e.checked && !this._map.hasLayer(n.layer) ? this._map.addLayer(n.layer) : !e.checked && this._map.hasLayer(n.layer) && this._map.removeLayer(n.layer);
            this._handlingClick = !1, this._refocusOnMap()
        },_expand: function() {
            r.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
        },_collapse: function() {
            this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
        }}), r.control.layers = function(t, e, n) {
        return new r.Control.Layers(t, e, n)
    }, r.PosAnimation = r.Class.extend({includes: r.Mixin.Events,run: function(t, e, n, i) {
            this.stop(), this._el = t, this._inProgress = !0, this._newPos = e, this.fire("start"), t.style[r.DomUtil.TRANSITION] = "all " + (n || .25) + "s cubic-bezier(0,0," + (i || .5) + ",1)", r.DomEvent.on(t, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this), r.DomUtil.setPosition(t, e), r.Util.falseFn(t.offsetWidth), this._stepTimer = setInterval(r.bind(this._onStep, this), 50)
        },stop: function() {
            this._inProgress && (r.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), r.Util.falseFn(this._el.offsetWidth))
        },_onStep: function() {
            var t = this._getPos();
            return t ? (this._el._leaflet_pos = t, this.fire("step"), n) : (this._onTransitionEnd(), n)
        },_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,_getPos: function() {
            var e, n, i, o = this._el, a = t.getComputedStyle(o);
            if (r.Browser.any3d) {
                if (i = a[r.DomUtil.TRANSFORM].match(this._transformRe), !i)
                    return;
                e = parseFloat(i[1]), n = parseFloat(i[2])
            } else
                e = parseFloat(a.left), n = parseFloat(a.top);
            return new r.Point(e, n, !0)
        },_onTransitionEnd: function() {
            r.DomEvent.off(this._el, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[r.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
        }}), r.Map.include({setView: function(t, e, i) {
            if (e = e === n ? this._zoom : this._limitZoom(e), t = this._limitCenter(r.latLng(t), e, this.options.maxBounds), i = i || {}, this._panAnim && this._panAnim.stop(), this._loaded && !i.reset && i !== !0) {
                i.animate !== n && (i.zoom = r.extend({animate: i.animate}, i.zoom), i.pan = r.extend({animate: i.animate}, i.pan));
                var o = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
                if (o)
                    return clearTimeout(this._sizeTimer), this
            }
            return this._resetView(t, e), this
        },panBy: function(t, e) {
            if (t = r.point(t).round(), e = e || {}, !t.x && !t.y)
                return this;
            if (this._panAnim || (this._panAnim = new r.PosAnimation, this._panAnim.on({step: this._onPanTransitionStep,end: this._onPanTransitionEnd}, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
                r.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var n = this._getMapPanePos().subtract(t);
                this._panAnim.run(this._mapPane, n, e.duration || .25, e.easeLinearity)
            } else
                this._rawPanBy(t), this.fire("move").fire("moveend");
            return this
        },_onPanTransitionStep: function() {
            this.fire("move")
        },_onPanTransitionEnd: function() {
            r.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
        },_tryAnimatedPan: function(t, e) {
            var n = this._getCenterOffset(t)._floor();
            return (e && e.animate) === !0 || this.getSize().contains(n) ? (this.panBy(n, e), !0) : !1
        }}), r.PosAnimation = r.DomUtil.TRANSITION ? r.PosAnimation : r.PosAnimation.extend({run: function(t, e, n, i) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(i || .5, .2), this._startPos = r.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
        },stop: function() {
            this._inProgress && (this._step(), this._complete())
        },_animate: function() {
            this._animId = r.Util.requestAnimFrame(this._animate, this), this._step()
        },_step: function() {
            var t = +new Date - this._startTime, e = 1e3 * this._duration;
            e > t ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1), this._complete())
        },_runFrame: function(t) {
            var e = this._startPos.add(this._offset.multiplyBy(t));
            r.DomUtil.setPosition(this._el, e), this.fire("step")
        },_complete: function() {
            r.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
        },_easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
        }}), r.Map.mergeOptions({zoomAnimation: !0,zoomAnimationThreshold: 4}), r.DomUtil.TRANSITION && r.Map.addInitHook(function() {
        this._zoomAnimated = this.options.zoomAnimation && r.DomUtil.TRANSITION && r.Browser.any3d && !r.Browser.android23 && !r.Browser.mobileOpera, this._zoomAnimated && r.DomEvent.on(this._mapPane, r.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
    }), r.Map.include(r.DomUtil.TRANSITION ? {_catchTransitionEnd: function(t) {
            this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
        },_nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },_tryAnimatedZoom: function(t, e, n) {
            if (this._animatingZoom)
                return !0;
            if (n = n || {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
                return !1;
            var i = this.getZoomScale(e), r = this._getCenterOffset(t)._divideBy(1 - 1 / i), o = this._getCenterLayerPoint()._add(r);
            return n.animate === !0 || this.getSize().contains(r) ? (this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, o, i, null, !0), !0) : !1
        },_animateZoom: function(t, e, n, i, o, a) {
            this._animatingZoom = !0, r.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = t, this._animateToZoom = e, r.Draggable && (r.Draggable._disabled = !0), this.fire("zoomanim", {center: t,zoom: e,origin: n,scale: i,delta: o,backwards: a})
        },_onZoomTransitionEnd: function() {
            this._animatingZoom = !1, r.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), r.Draggable && (r.Draggable._disabled = !1)
        }} : {}), r.TileLayer.include({_animateZoom: function(t) {
            this._animating || (this._animating = !0, this._prepareBgBuffer());
            var e = this._bgBuffer, n = r.DomUtil.TRANSFORM, i = t.delta ? r.DomUtil.getTranslateString(t.delta) : e.style[n], o = r.DomUtil.getScaleString(t.scale, t.origin);
            e.style[n] = t.backwards ? o + " " + i : i + " " + o
        },_endZoomAnim: function() {
            var t = this._tileContainer, e = this._bgBuffer;
            t.style.visibility = "", t.parentNode.appendChild(t), r.Util.falseFn(e.offsetWidth), this._animating = !1
        },_clearBgBuffer: function() {
            var t = this._map;
            !t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[r.DomUtil.TRANSFORM] = "")
        },_prepareBgBuffer: function() {
            var t = this._tileContainer, e = this._bgBuffer, i = this._getLoadedTilesPercentage(e), o = this._getLoadedTilesPercentage(t);
            return e && i > .5 && .5 > o ? (t.style.visibility = "hidden", this._stopLoadingImages(t), n) : (e.style.visibility = "hidden", e.style[r.DomUtil.TRANSFORM] = "", this._tileContainer = e, e = this._bgBuffer = t, this._stopLoadingImages(e), clearTimeout(this._clearBgBufferTimer), n)
        },_getLoadedTilesPercentage: function(t) {
            var e, n, i = t.getElementsByTagName("img"), r = 0;
            for (e = 0, n = i.length; n > e; e++)
                i[e].complete && r++;
            return r / n
        },_stopLoadingImages: function(t) {
            var e, n, i, o = Array.prototype.slice.call(t.getElementsByTagName("img"));
            for (e = 0, n = o.length; n > e; e++)
                i = o[e], i.complete || (i.onload = r.Util.falseFn, i.onerror = r.Util.falseFn, i.src = r.Util.emptyImageUrl, i.parentNode.removeChild(i))
        }}), r.Map.include({_defaultLocateOptions: {watch: !1,setView: !1,maxZoom: 1 / 0,timeout: 1e4,maximumAge: 0,enableHighAccuracy: !1},locate: function(t) {
            if (t = this._locateOptions = r.extend(this._defaultLocateOptions, t), !navigator.geolocation)
                return this._handleGeolocationError({code: 0,message: "Geolocation not supported."}), this;
            var e = r.bind(this._handleGeolocationResponse, this), n = r.bind(this._handleGeolocationError, this);
            return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, n, t) : navigator.geolocation.getCurrentPosition(e, n, t), this
        },stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
        },_handleGeolocationError: function(t) {
            var e = t.code, n = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {code: e,message: "Geolocation error: " + n + "."})
        },_handleGeolocationResponse: function(t) {
            var e = t.coords.latitude, n = t.coords.longitude, i = new r.LatLng(e, n), o = 180 * t.coords.accuracy / 40075017, a = o / Math.cos(r.LatLng.DEG_TO_RAD * e), s = r.latLngBounds([e - o, n - a], [e + o, n + a]), u = this._locateOptions;
            if (u.setView) {
                var l = Math.min(this.getBoundsZoom(s), u.maxZoom);
                this.setView(i, l)
            }
            var h = {latlng: i,bounds: s,timestamp: t.timestamp};
            for (var c in t.coords)
                "number" == typeof t.coords[c] && (h[c] = t.coords[c]);
            this.fire("locationfound", h)
        }})
}(window, document), Livefyre.define("leaflet", ["leaflet/leaflet-src"], function(t) {
    return t
}), Livefyre.define("text!leaflet/leaflet.css", [], function() {
    return '/* required styles */\r\n\r\n.leaflet-map-pane,\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow,\r\n.leaflet-tile-pane,\r\n.leaflet-tile-container,\r\n.leaflet-overlay-pane,\r\n.leaflet-shadow-pane,\r\n.leaflet-marker-pane,\r\n.leaflet-popup-pane,\r\n.leaflet-overlay-pane svg,\r\n.leaflet-zoom-box,\r\n.leaflet-image-layer,\r\n.leaflet-layer {\r\n	position: absolute;\r\n	left: 0;\r\n	top: 0;\r\n	}\r\n.leaflet-container {\r\n	overflow: hidden;\r\n	-ms-touch-action: none;\r\n	}\r\n.leaflet-tile,\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n	-webkit-user-select: none;\r\n	   -moz-user-select: none;\r\n	        user-select: none;\r\n	-webkit-user-drag: none;\r\n	}\r\n.leaflet-marker-icon,\r\n.leaflet-marker-shadow {\r\n	display: block;\r\n	}\r\n/* map is broken in FF if you have max-width: 100% on tiles */\r\n.leaflet-container img {\r\n	max-width: none !important;\r\n	}\r\n/* stupid Android 2 doesn\'t understand "max-width: none" properly */\r\n.leaflet-container img.leaflet-image-layer {\r\n	max-width: 15000px !important;\r\n	}\r\n.leaflet-tile {\r\n	filter: inherit;\r\n	visibility: hidden;\r\n	}\r\n.leaflet-tile-loaded {\r\n	visibility: inherit;\r\n	}\r\n.leaflet-zoom-box {\r\n	width: 0;\r\n	height: 0;\r\n	}\r\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r\n.leaflet-overlay-pane svg {\r\n	-moz-user-select: none;\r\n	}\r\n\r\n.leaflet-tile-pane    { z-index: 2; }\r\n.leaflet-objects-pane { z-index: 3; }\r\n.leaflet-overlay-pane { z-index: 4; }\r\n.leaflet-shadow-pane  { z-index: 5; }\r\n.leaflet-marker-pane  { z-index: 6; }\r\n.leaflet-popup-pane   { z-index: 7; }\r\n\r\n.leaflet-vml-shape {\r\n	width: 1px;\r\n	height: 1px;\r\n	}\r\n.lvml {\r\n	behavior: url(#default#VML);\r\n	display: inline-block;\r\n	position: absolute;\r\n	}\r\n\r\n\r\n/* control positioning */\r\n\r\n.leaflet-control {\r\n	position: relative;\r\n	z-index: 7;\r\n	pointer-events: auto;\r\n	}\r\n.leaflet-top,\r\n.leaflet-bottom {\r\n	position: absolute;\r\n	z-index: 1000;\r\n	pointer-events: none;\r\n	}\r\n.leaflet-top {\r\n	top: 0;\r\n	}\r\n.leaflet-right {\r\n	right: 0;\r\n	}\r\n.leaflet-bottom {\r\n	bottom: 0;\r\n	}\r\n.leaflet-left {\r\n	left: 0;\r\n	}\r\n.leaflet-control {\r\n	float: left;\r\n	clear: both;\r\n	}\r\n.leaflet-right .leaflet-control {\r\n	float: right;\r\n	}\r\n.leaflet-top .leaflet-control {\r\n	margin-top: 10px;\r\n	}\r\n.leaflet-bottom .leaflet-control {\r\n	margin-bottom: 10px;\r\n	}\r\n.leaflet-left .leaflet-control {\r\n	margin-left: 10px;\r\n	}\r\n.leaflet-right .leaflet-control {\r\n	margin-right: 10px;\r\n	}\r\n\r\n\r\n/* zoom and fade animations */\r\n\r\n.leaflet-fade-anim .leaflet-tile,\r\n.leaflet-fade-anim .leaflet-popup {\r\n	opacity: 0;\r\n	-webkit-transition: opacity 0.2s linear;\r\n	   -moz-transition: opacity 0.2s linear;\r\n	     -o-transition: opacity 0.2s linear;\r\n	        transition: opacity 0.2s linear;\r\n	}\r\n.leaflet-fade-anim .leaflet-tile-loaded,\r\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r\n	opacity: 1;\r\n	}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-animated {\r\n	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n	     -o-transition:      -o-transform 0.25s cubic-bezier(0,0,0.25,1);\r\n	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r\n	}\r\n.leaflet-zoom-anim .leaflet-tile,\r\n.leaflet-pan-anim .leaflet-tile,\r\n.leaflet-touching .leaflet-zoom-animated {\r\n	-webkit-transition: none;\r\n	   -moz-transition: none;\r\n	     -o-transition: none;\r\n	        transition: none;\r\n	}\r\n\r\n.leaflet-zoom-anim .leaflet-zoom-hide {\r\n	visibility: hidden;\r\n	}\r\n\r\n\r\n/* cursors */\r\n\r\n.leaflet-clickable {\r\n	cursor: pointer;\r\n	}\r\n.leaflet-container {\r\n	cursor: -webkit-grab;\r\n	cursor:    -moz-grab;\r\n	}\r\n.leaflet-popup-pane,\r\n.leaflet-control {\r\n	cursor: auto;\r\n	}\r\n.leaflet-dragging .leaflet-container,\r\n.leaflet-dragging .leaflet-clickable {\r\n	cursor: move;\r\n	cursor: -webkit-grabbing;\r\n	cursor:    -moz-grabbing;\r\n	}\r\n\r\n\r\n/* visual tweaks */\r\n\r\n.leaflet-container {\r\n	background: #ddd;\r\n	outline: 0;\r\n	}\r\n.leaflet-container a {\r\n	color: #0078A8;\r\n	}\r\n.leaflet-container a.leaflet-active {\r\n	outline: 2px solid orange;\r\n	}\r\n.leaflet-zoom-box {\r\n	border: 2px dotted #38f;\r\n	background: rgba(255,255,255,0.5);\r\n	}\r\n\r\n\r\n/* general typography */\r\n.leaflet-container {\r\n	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;\r\n	}\r\n\r\n\r\n/* general toolbar styles */\r\n\r\n.leaflet-bar {\r\n	box-shadow: 0 1px 5px rgba(0,0,0,0.65);\r\n	border-radius: 4px;\r\n	}\r\n.leaflet-bar a,\r\n.leaflet-bar a:hover {\r\n	background-color: #fff;\r\n	border-bottom: 1px solid #ccc;\r\n	width: 26px;\r\n	height: 26px;\r\n	line-height: 26px;\r\n	display: block;\r\n	text-align: center;\r\n	text-decoration: none;\r\n	color: black;\r\n	}\r\n.leaflet-bar a,\r\n.leaflet-control-layers-toggle {\r\n	background-position: 50% 50%;\r\n	background-repeat: no-repeat;\r\n	display: block;\r\n	}\r\n.leaflet-bar a:hover {\r\n	background-color: #f4f4f4;\r\n	}\r\n.leaflet-bar a:first-child {\r\n	border-top-left-radius: 4px;\r\n	border-top-right-radius: 4px;\r\n	}\r\n.leaflet-bar a:last-child {\r\n	border-bottom-left-radius: 4px;\r\n	border-bottom-right-radius: 4px;\r\n	border-bottom: none;\r\n	}\r\n.leaflet-bar a.leaflet-disabled {\r\n	cursor: default;\r\n	background-color: #f4f4f4;\r\n	color: #bbb;\r\n	}\r\n\r\n.leaflet-touch .leaflet-bar a {\r\n	width: 30px;\r\n	height: 30px;\r\n	line-height: 30px;\r\n	}\r\n\r\n\r\n/* zoom control */\r\n\r\n.leaflet-control-zoom-in,\r\n.leaflet-control-zoom-out {\r\n	font: bold 18px \'Lucida Console\', Monaco, monospace;\r\n	text-indent: 1px;\r\n	}\r\n.leaflet-control-zoom-out {\r\n	font-size: 20px;\r\n	}\r\n\r\n.leaflet-touch .leaflet-control-zoom-in {\r\n	font-size: 22px;\r\n	}\r\n.leaflet-touch .leaflet-control-zoom-out {\r\n	font-size: 24px;\r\n	}\r\n\r\n\r\n/* layers control */\r\n\r\n.leaflet-control-layers {\r\n	box-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n	background: #fff;\r\n	border-radius: 5px;\r\n	}\r\n.leaflet-control-layers-toggle {\r\n	background-image: url(images/layers.png);\r\n	width: 36px;\r\n	height: 36px;\r\n	}\r\n.leaflet-retina .leaflet-control-layers-toggle {\r\n	background-image: url(images/layers-2x.png);\r\n	background-size: 26px 26px;\r\n	}\r\n.leaflet-touch .leaflet-control-layers-toggle {\r\n	width: 44px;\r\n	height: 44px;\r\n	}\r\n.leaflet-control-layers .leaflet-control-layers-list,\r\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r\n	display: none;\r\n	}\r\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\r\n	display: block;\r\n	position: relative;\r\n	}\r\n.leaflet-control-layers-expanded {\r\n	padding: 6px 10px 6px 6px;\r\n	color: #333;\r\n	background: #fff;\r\n	}\r\n.leaflet-control-layers-selector {\r\n	margin-top: 2px;\r\n	position: relative;\r\n	top: 1px;\r\n	}\r\n.leaflet-control-layers label {\r\n	display: block;\r\n	}\r\n.leaflet-control-layers-separator {\r\n	height: 0;\r\n	border-top: 1px solid #ddd;\r\n	margin: 5px -10px 5px -6px;\r\n	}\r\n\r\n\r\n/* attribution and scale controls */\r\n\r\n.leaflet-container .leaflet-control-attribution {\r\n	background: #fff;\r\n	background: rgba(255, 255, 255, 0.7);\r\n	margin: 0;\r\n	}\r\n.leaflet-control-attribution,\r\n.leaflet-control-scale-line {\r\n	padding: 0 5px;\r\n	color: #333;\r\n	}\r\n.leaflet-control-attribution a {\r\n	text-decoration: none;\r\n	}\r\n.leaflet-control-attribution a:hover {\r\n	text-decoration: underline;\r\n	}\r\n.leaflet-container .leaflet-control-attribution,\r\n.leaflet-container .leaflet-control-scale {\r\n	font-size: 11px;\r\n	}\r\n.leaflet-left .leaflet-control-scale {\r\n	margin-left: 5px;\r\n	}\r\n.leaflet-bottom .leaflet-control-scale {\r\n	margin-bottom: 5px;\r\n	}\r\n.leaflet-control-scale-line {\r\n	border: 2px solid #777;\r\n	border-top: none;\r\n	line-height: 1.1;\r\n	padding: 2px 5px 1px;\r\n	font-size: 11px;\r\n	white-space: nowrap;\r\n	overflow: hidden;\r\n	-moz-box-sizing: content-box;\r\n	     box-sizing: content-box;\r\n\r\n	background: #fff;\r\n	background: rgba(255, 255, 255, 0.5);\r\n	}\r\n.leaflet-control-scale-line:not(:first-child) {\r\n	border-top: 2px solid #777;\r\n	border-bottom: none;\r\n	margin-top: -2px;\r\n	}\r\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r\n	border-bottom: 2px solid #777;\r\n	}\r\n\r\n.leaflet-touch .leaflet-control-attribution,\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n	box-shadow: none;\r\n	}\r\n.leaflet-touch .leaflet-control-layers,\r\n.leaflet-touch .leaflet-bar {\r\n	border: 2px solid rgba(0,0,0,0.2);\r\n	background-clip: padding-box;\r\n	}\r\n\r\n\r\n/* popup */\r\n\r\n.leaflet-popup {\r\n	position: absolute;\r\n	text-align: center;\r\n	}\r\n.leaflet-popup-content-wrapper {\r\n	padding: 1px;\r\n	text-align: left;\r\n	border-radius: 12px;\r\n	}\r\n.leaflet-popup-content {\r\n	margin: 13px 19px;\r\n	line-height: 1.4;\r\n	}\r\n.leaflet-popup-content p {\r\n	margin: 18px 0;\r\n	}\r\n.leaflet-popup-tip-container {\r\n	margin: 0 auto;\r\n	width: 40px;\r\n	height: 20px;\r\n	position: relative;\r\n	overflow: hidden;\r\n	}\r\n.leaflet-popup-tip {\r\n	width: 17px;\r\n	height: 17px;\r\n	padding: 1px;\r\n\r\n	margin: -10px auto 0;\r\n\r\n	-webkit-transform: rotate(45deg);\r\n	   -moz-transform: rotate(45deg);\r\n	    -ms-transform: rotate(45deg);\r\n	     -o-transform: rotate(45deg);\r\n	        transform: rotate(45deg);\r\n	}\r\n.leaflet-popup-content-wrapper,\r\n.leaflet-popup-tip {\r\n	background: white;\r\n\r\n	box-shadow: 0 3px 14px rgba(0,0,0,0.4);\r\n	}\r\n.leaflet-container a.leaflet-popup-close-button {\r\n	position: absolute;\r\n	top: 0;\r\n	right: 0;\r\n	padding: 4px 4px 0 0;\r\n	text-align: center;\r\n	width: 18px;\r\n	height: 14px;\r\n	font: 16px/14px Tahoma, Verdana, sans-serif;\r\n	color: #c3c3c3;\r\n	text-decoration: none;\r\n	font-weight: bold;\r\n	background: transparent;\r\n	}\r\n.leaflet-container a.leaflet-popup-close-button:hover {\r\n	color: #999;\r\n	}\r\n.leaflet-popup-scrolled {\r\n	overflow: auto;\r\n	border-bottom: 1px solid #ddd;\r\n	border-top: 1px solid #ddd;\r\n	}\r\n\r\n.leaflet-oldie .leaflet-popup-content-wrapper {\r\n	zoom: 1;\r\n	}\r\n.leaflet-oldie .leaflet-popup-tip {\r\n	width: 24px;\r\n	margin: 0 auto;\r\n\r\n	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\r\n	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r\n	}\r\n.leaflet-oldie .leaflet-popup-tip-container {\r\n	margin-top: -1px;\r\n	}\r\n\r\n.leaflet-oldie .leaflet-control-zoom,\r\n.leaflet-oldie .leaflet-control-layers,\r\n.leaflet-oldie .leaflet-popup-content-wrapper,\r\n.leaflet-oldie .leaflet-popup-tip {\r\n	border: 1px solid #999;\r\n	}\r\n\r\n\r\n/* div icon */\r\n\r\n.leaflet-div-icon {\r\n	background: #fff;\r\n	border: 1px solid #666;\r\n	}\r\n'
}), Livefyre.define("streamhub-map/leaflet", ["streamhub-sdk/jquery", "leaflet", "text!leaflet/leaflet.css"], function(t, e, n) {
    var i;
    if (!i) {
        var r = document.createElement("style");
        r.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(r)
    }
    return e.Icon.Default.imagePath = "/lib/leaflet/dist/images/", e.TileLayer.D3TopoJSON = e.TileLayer.extend({onAdd: function(t) {
            e.TileLayer.prototype.onAdd.call(this, t), this._path = d3.geo.path().projection(function(n) {
                var i = t.latLngToLayerPoint(new e.LatLng(n[1], n[0]));
                return [i.x, i.y]
            }), this.on("tileunload", function(t) {
                t.tile.xhr && t.tile.xhr.abort(), t.tile.nodes && t.tile.nodes.remove(), t.tile.nodes = null, t.tile.xhr = null
            })
        },_loadTile: function(t, e) {
            var n = this;
            this._adjustTilePoint(e), t.nodes || t.xhr || (t.xhr = d3.json(this.getTileUrl(e), function(e, i) {
                if (e)
                    return console.log(e), void 0;
                var r = topojson.feature(i, i.objects.vectile);
                t.xhr = null, t.nodes = d3.select(n._map._container).select("svg").append("g"), t.nodes.selectAll("path").data(r.features).enter().append("path").attr("d", n._path).attr("class", n.options.class).attr("style", n.options.style)
            }))
        }}), e.TileLayer.CanvasTopoJSON = e.TileLayer.Canvas.extend({options: {debug: !1},tileSize: 256,initialize: function(t, n) {
            e.Util.setOptions(this, n), this._url = t, this.drawTile = function(t, e, n) {
                var i = {canvas: t,tile: e,zoom: n};
                this.options.debug && this._drawDebugInfo(i), this._draw(i)
            }
        },_drawDebugInfo: function(t) {
            var e = this.tileSize, n = t.canvas.getContext("2d");
            n.strokeStyle = "#000000", n.fillStyle = "#FFFF00", n.strokeRect(0, 0, e, e), n.font = "12px Arial", n.fillRect(0, 0, 5, 5), n.fillRect(0, e - 5, 5, 5), n.fillRect(e - 5, 0, 5, 5), n.fillRect(e - 5, e - 5, 5, 5), n.fillRect(e / 2 - 5, e / 2 - 5, 10, 10), n.strokeText(t.tile.x + " " + t.tile.y + " " + t.zoom, e / 2 - 30, e / 2 - 10)
        },_tilePoint: function(t, n) {
            var i = t.tile.multiplyBy(this.tileSize), r = this._map.project(new e.LatLng(n[1], n[0])), o = Math.round(r.x - i.x), a = Math.round(r.y - i.y);
            return {x: o,y: a}
        },_clip: function(t, n) {
            for (var i = t.tile.multiplyBy(this.tileSize), r = i.add(new e.Point(this.tileSize, this.tileSize)), o = new e.Bounds([i, r]), a = n.length, s = [], u = 0; a - 1 > u; u++) {
                var l = e.LineUtil.clipSegment(n[u], n[u + 1], o, u);
                l && (s.push(l[0]), (l[1] !== n[u + 1] || u === a - 2) && s.push(l[1]))
            }
            return s
        },_isActuallyVisible: function(t) {
            for (var e = t[0], n = [e.x, e.y], i = [e.x, e.y], r = 1; r < t.length; r++)
                e = t[r], n[0] = Math.min(n[0], e.x), n[1] = Math.min(n[1], e.y), i[0] = Math.max(i[0], e.x), i[1] = Math.max(i[1], e.y);
            var o = i[0] - n[0], a = i[1] - n[1];
            this.options.debug && console.log(o + " " + a);
            var s = o > 1 || a > 1;
            return s
        },_drawPoint: function(t, e, n) {
            if (n) {
                var i = this._tilePoint(t, e), r = t.canvas, o = r.getContext("2d");
                o.beginPath(), o.fillStyle = n.fill, o.arc(i.x, i.y, n.radius, 0, 2 * Math.PI), o.closePath(), o.fill(), o.restore()
            }
        },_drawLineString: function(t, e, n) {
            if (n) {
                var i, r = e, o = [];
                for (r = this._clip(t, r), i = 0; i < r.length; i++)
                    o.push(this._tilePoint(t, r[i]));
                if (this._isActuallyVisible(o)) {
                    var a = t.canvas.getContext("2d");
                    for (a.strokeStyle = n.stroke, a.lineWidth = parseInt(n.strokeWidth, 10), a.beginPath(), i = 0; i < o.length; i++) {
                        var s = (0 === i ? "move" : "line") + "To";
                        a[s](o[i].x, o[i].y)
                    }
                    a.stroke(), a.restore()
                }
            }
        },_drawPolygon: function(t, e, n) {
            if (n)
                for (var i = 0; i < e.length; i++) {
                    var r, o = e[i], a = [];
                    for (o = this._clip(t, o), r = 0; r < o.length; r++)
                        a.push(this._tilePoint(t, o[r]));
                    if (this._isActuallyVisible(a)) {
                        var s = t.canvas.getContext("2d"), u = n.stroke;
                        for (s.fillStyle = n.fill, u && (s.strokeStyle = u.color, s.lineWidth = u.size), s.beginPath(), r = 0; r < a.length; r++) {
                            var l = (0 === r ? "move" : "line") + "To";
                            s[l](a[r].x, a[r].y)
                        }
                        s.closePath(), s.fill(), u && s.stroke()
                    }
                }
        },_draw: function(n) {
            var i = t.getJSON, r = n.tile.multiplyBy(this.tileSize), o = r.add(new e.Point(this.tileSize, this.tileSize)), a = this.options.buffer;
            if (a > 0) {
                var s = new e.Point(a, a);
                r = r.subtract(s), o = o.add(s)
            }
            var u = this._map.unproject(r, n.zoom, !0), l = this._map.unproject(o, n.zoom, !0);
            [u.lng, l.lat, l.lng, u.lat];
            var h, c = this.createUrl(n.tile), f = this;
            i(c, function(t) {
                for (var e = topojson.feature(t, t.objects.vectile), i = 0; i < e.features.length; i++) {
                    var r = e.features[i], o = f.styleFor(r), a = r.geometry.type, s = r.geometry.coordinates, u = s.length;
                    switch (a) {
                        case "Point":
                            f._drawPoint(n, s, o);
                            break;
                        case "MultiPoint":
                            for (h = 0; u > h; h++)
                                f._drawPoint(n, s[h], o);
                            break;
                        case "LineString":
                            f._drawLineString(n, s, o);
                            break;
                        case "MultiLineString":
                            for (h = 0; u > h; h++)
                                f._drawLineString(n, s[h], o);
                            break;
                        case "Polygon":
                            f._drawPolygon(n, s, o);
                            break;
                        case "MultiPolygon":
                            for (h = 0; u > h; h++)
                                f._drawPolygon(n, s[h], o);
                            break;
                        default:
                            throw Error("Unmanaged type: " + a)
                    }
                }
            })
        },createUrl: function(t) {
            return e.Util.template(this._url, e.extend({r: this.options.detectRetina && e.Browser.retina && this.options.maxZoom > 0 ? "@2x" : "",s: this._getSubdomain(t),x: t.x,y: this.options.tms ? this._tileNumBounds.max.y - t.y : t.y,z: this._getZoomForUrl()}, this.options))
        },styleFor: function(e) {
            var n;
            return e.properties.kind || (n = this.options.style), (n = this.options.style[e.properties.kind]) ? (n = t.extend({}, n), n.maxZoom && this._map.getZoom() <= n.maxZoom && (n.fill = "rgba(0,0,0,0)", n.stroke = "rgba(0,0,0,0)"), n) : void 0
        }}), e.ContentDivIcon = e.DivIcon.extend({createIcon: function(n) {
            var i = e.DivIcon.prototype.createIcon.call(this, n);
            return t(i).find("img").on("error", function(e) {
                t(e.target).trigger("imageError.hub")
            }), i
        }}), e
}), Livefyre.define("streamhub-map/main", ["streamhub-sdk/modal", "streamhub-sdk/content/views/content-list-view", "streamhub-hot-collections/streams/collection-to-heat-metric", "text!streamhub-map/css/style.css", "d3", "topojson", "streamhub-sdk/jquery", "streamhub-map/leaflet", "inherits"], function(t, e, n, i, r, o, a, s, u) {
    var l, h = function(t) {
        t = t || {}, this._id = (new Date).getTime(), this._cloudmadeStyleId = t.cloudmadeStyleId || 998, this._mapCenter = t.center || [0, 0], this._mapZoom = t.zoom || 2, this._cluster = t.cluster || !0, this._clusterPixelDistance = t.clusterPixelDistance || 50, this._overlayViews = [], this._dataPoints = [], this.elId = this.elClass + "-" + this._id, e.call(this, t), l || a('<style id="' + this.elId + '-style"></style>').text("." + this.elId + i).prependTo("head"), this._drawMap(t)
    };
    return u(h, e), h.prototype.mapClassName = "hub-map", h.prototype.mapOverlayLayerClassName = "hub-map-overlays", h.prototype.mapLayerClassName = "hub-map-layer", h.prototype.mapLandClassName = "hub-map-land", h.prototype.mapWaterClassName = "hub-map-water", h.prototype.mapGraticuleClassName = "hub-map-graticule", h.prototype.mapSvgTemplatesClassName = "hub-map-svg-templates", h.prototype.elClass = "hub-map-view", h.prototype.setElement = function(t) {
        e.prototype.setElement.call(this, t), this.$el.addClass(this.elId);
        var n = this;
        this.$el.on("imageError.hub", function(t) {
            for (var e, i = 0; i < n._dataPoints.length; i++)
                a(t.target).attr("src") == n._dataPoints[i].getContent().attachments[0].thumbnail_url && (e = n._dataPoints[i]);
            n._removeDataPoint(e)
        }), this.$el.on("addDataPoint.hub", function(t, e) {
            n._drawMarker(e)
        })
    }, h.prototype._drawMarker = function(t) {
        new s.Marker(new s.LatLng(t.lat, t.lon)).addTo(this._map)
    }, h.prototype._getMapDimensions = function() {
        return this._width = this.$el.width(), this._height = this.$el.height(), {width: this._width,height: this._height}
    }, h.prototype.addLayer = function(t) {
        return this._mapContext.svg.append("svg:g").attr("class", this.mapLayerClassName).attr("class", t)
    }, h.prototype._addDataPoint = function(t) {
        this._dataPoints.push(t), this.$el.trigger("addDataPoint.hub", t)
    }, h.prototype._removeDataPoint = function(t) {
        var e = this._dataPoints.indexOf(t);
        e >= 0 && (this._dataPoints.splice(e, 1), this.$el.trigger("removeDataPoint.hub"))
    }, h.prototype._createOverlayView = function() {
        var t = 0;
        return function(e) {
            var i;
            if (e.length)
                return i = e.length > 1 ? this._overlayViewFactory.createOverlayView(e) : this._overlayViewFactory.createOverlayView(e[0]);
            if (!this.isCollectionPoint(e))
                return i = this._overlayViewFactory.createOverlayView(e);
            var r = e.getCollection(), o = n.transform(r), a = o.getValue();
            return a > t && (t = a), i = new SymbolView(e, {mapContext: this._mapContext,maxMetricValue: function() {
                    return t
                },notifyStream: e.getCollection()})
        }
    }(), h.prototype.isCollectionPoint = function(t) {
        return void 0 !== t._collection
    }, h.prototype._drawMap = function(t) {
        this._map = new s.map(this.el, t).setView(this._mapCenter, this._mapZoom), new s.TileLayer("http://{s}.tile.cloudmade.com/9f4a9cd9d242456794a775abb4e765e1/" + this._cloudmadeStyleId + "/256/{z}/{x}/{y}.png").addTo(this._map)
    }, h.prototype.add = function(t) {
        this._addDataPoint(t)
    }, h
}), Livefyre.define("streamhub-map", ["streamhub-map/main"], function(t) {
    return t
}), Livefyre.define("streamhub-map/point", [], function() {
    var t = function(t) {
        t = t || {}, this.lat = t.lat, this.lon = t.lon
    };
    return t.prototype.getCoordinates = function() {
        return [this.lon, this.lat]
    }, t.prototype.getLatLon = function() {
        return [this.lat, this.lon]
    }, t
}), Livefyre.define("streamhub-map/collection/collection-point", ["streamhub-map/point", "inherits"], function(t, e) {
    var n = function(e, n) {
        if (n = n || {}, void 0 === e)
            throw Error("CollectionPoint expected a Collection instance as its first argument");
        this._collection = e, t.call(this, n)
    };
    return e(n, t), n.prototype.getCollection = function() {
        return this._collection
    }, n
}), Livefyre.define("streamhub-map/collection/collection-map-view", ["streamhub-map", "streamhub-map/collection/collection-point", "inherits"], function(t, e, n) {
    var i = function(e) {
        e = e || {}, this._collectionToLocation = e.collectionToLocation, t.call(this, e)
    };
    return n(i, t), i.prototype.add = function(n) {
        if (this._collectionToLocation && !(!n.id in this._collectionToLocation)) {
            var i = new e(n, this._collectionToLocation[n.id]);
            t.prototype.add.call(this, i)
        }
    }, i
}), Livefyre.define("streamhub-map/content/content-point", ["streamhub-map/point", "inherits"], function(t, e) {
    var n = function(e, n) {
        if (n = n || {}, void 0 === e)
            throw Error("ContentPoint expected a Content instance as its first argument");
        this._content = e, n.lat = e._annotations.geocode.latitude, n.lon = e._annotations.geocode.longitude, t.call(this, n)
    };
    return e(n, t), n.prototype.getContent = function() {
        return this._content
    }, n
}), Livefyre.define("hgn!streamhub-map/views/templates/marker", ["hogan"], function(t) {
    function e() {
        return n.render.apply(n, arguments)
    }
    var n = new t.Template(function(t, e, n) {
        var i = this;
        return i.b(n = n || ""), i.b('<div class="hub-map-marker-bg">'), i.b("\n" + n), i.b('    <img class="hub-map-marker-thumbnail" src="'), i.b(i.v(i.f("thumbnail_url", t, e, 0))), i.b('">'), i.b("\n" + n), i.b("    "), i.s(i.f("badge_count", t, e, 1), t, e, 0, 121, 178, "{{ }}") && (i.rs(t, e, function(t, e, n) {
            n.b('<div class="hub-map-marker-badge">'), n.b(n.v(n.f("badge_count", t, e, 0))), n.b("</div>")
        }), t.pop()), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
    }, "", t);
    return e.template = n, e
}), function(t, e) {
    L.MarkerClusterGroup = L.FeatureGroup.extend({options: {maxClusterRadius: 80,iconCreateFunction: null,spiderfyOnMaxZoom: !0,showCoverageOnHover: !0,zoomToBoundsOnClick: !0,singleMarkerMode: !1,disableClusteringAtZoom: null,removeOutsideVisibleBounds: !0,animateAddingMarkers: !1,spiderfyDistanceMultiplier: 1,polygonOptions: {}},initialize: function(t) {
            L.Util.setOptions(this, t), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = L.featureGroup(), this._featureGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this), this._nonPointGroup = L.featureGroup(), this._nonPointGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = []
        },addLayer: function(t) {
            if (t instanceof L.LayerGroup) {
                var e = [];
                for (var n in t._layers)
                    e.push(t._layers[n]);
                return this.addLayers(e)
            }
            if (!t.getLatLng)
                return this._nonPointGroup.addLayer(t), this;
            if (!this._map)
                return this._needsClustering.push(t), this;
            if (this.hasLayer(t))
                return this;
            this._unspiderfy && this._unspiderfy(), this._addLayer(t, this._maxZoom);
            var i = t, r = this._map.getZoom();
            if (t.__parent)
                for (; i.__parent._zoom >= r; )
                    i = i.__parent;
            return this._currentShownBounds.contains(i.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(t, i) : this._animationAddLayerNonAnimated(t, i)), this
        },removeLayer: function(t) {
            if (t instanceof L.LayerGroup) {
                var e = [];
                for (var n in t._layers)
                    e.push(t._layers[n]);
                return this.removeLayers(e)
            }
            return t.getLatLng ? this._map ? t.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(t)), this._removeLayer(t, !0), this._featureGroup.hasLayer(t) && (this._featureGroup.removeLayer(t), t.setOpacity && t.setOpacity(1)), this) : this : (!this._arraySplice(this._needsClustering, t) && this.hasLayer(t) && this._needsRemoving.push(t), this) : (this._nonPointGroup.removeLayer(t), this)
        },addLayers: function(t) {
            var e, n, i, r = this._map, o = this._featureGroup, a = this._nonPointGroup;
            for (e = 0, n = t.length; n > e; e++)
                if (i = t[e], i.getLatLng) {
                    if (!this.hasLayer(i))
                        if (r) {
                            if (this._addLayer(i, this._maxZoom), i.__parent && 2 === i.__parent.getChildCount()) {
                                var s = i.__parent.getAllChildMarkers(), u = s[0] === i ? s[1] : s[0];
                                o.removeLayer(u)
                            }
                        } else
                            this._needsClustering.push(i)
                } else
                    a.addLayer(i);
            return r && (o.eachLayer(function(t) {
                t instanceof L.MarkerCluster && t._iconNeedsUpdate && t._updateIcon()
            }), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)), this
        },removeLayers: function(t) {
            var e, n, i, r = this._featureGroup, o = this._nonPointGroup;
            if (!this._map) {
                for (e = 0, n = t.length; n > e; e++)
                    i = t[e], this._arraySplice(this._needsClustering, i), o.removeLayer(i);
                return this
            }
            for (e = 0, n = t.length; n > e; e++)
                i = t[e], i.__parent ? (this._removeLayer(i, !0, !0), r.hasLayer(i) && (r.removeLayer(i), i.setOpacity && i.setOpacity(1))) : o.removeLayer(i);
            return this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), r.eachLayer(function(t) {
                t instanceof L.MarkerCluster && t._updateIcon()
            }), this
        },clearLayers: function() {
            return this._map || (this._needsClustering = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function(t) {
                delete t.__parent
            }), this._map && this._generateInitialClusters(), this
        },getBounds: function() {
            var t = new L.LatLngBounds;
            if (this._topClusterLevel)
                t.extend(this._topClusterLevel._bounds);
            else
                for (var e = this._needsClustering.length - 1; e >= 0; e--)
                    t.extend(this._needsClustering[e].getLatLng());
            return t.extend(this._nonPointGroup.getBounds()), t
        },eachLayer: function(t, e) {
            var n, i = this._needsClustering.slice();
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(i), n = i.length - 1; n >= 0; n--)
                t.call(e, i[n]);
            this._nonPointGroup.eachLayer(t, e)
        },getLayers: function() {
            var t = [];
            return this.eachLayer(function(e) {
                t.push(e)
            }), t
        },getLayer: function(t) {
            var e = null;
            return this.eachLayer(function(n) {
                L.stamp(n) === t && (e = n)
            }), e
        },hasLayer: function(t) {
            if (!t)
                return !1;
            var e, n = this._needsClustering;
            for (e = n.length - 1; e >= 0; e--)
                if (n[e] === t)
                    return !0;
            for (n = this._needsRemoving, e = n.length - 1; e >= 0; e--)
                if (n[e] === t)
                    return !1;
            return !(!t.__parent || t.__parent._group !== this) || this._nonPointGroup.hasLayer(t)
        },zoomToShowLayer: function(t, e) {
            var n = function() {
                if ((t._icon || t.__parent._icon) && !this._inZoomAnimation)
                    if (this._map.off("moveend", n, this), this.off("animationend", n, this), t._icon)
                        e();
                    else if (t.__parent._icon) {
                        var i = function() {
                            this.off("spiderfied", i, this), e()
                        };
                        this.on("spiderfied", i, this), t.__parent.spiderfy()
                    }
            };
            t._icon && this._map.getBounds().contains(t.getLatLng()) ? e() : t.__parent._zoom < this._map.getZoom() ? (this._map.on("moveend", n, this), this._map.panTo(t.getLatLng())) : (this._map.on("moveend", n, this), this.on("animationend", n, this), this._map.setView(t.getLatLng(), t.__parent._zoom + 1), t.__parent.zoomToBounds())
        },onAdd: function(t) {
            this._map = t;
            var e, n, i;
            if (!isFinite(this._map.getMaxZoom()))
                throw "Map has no maxZoom specified";
            for (this._featureGroup.onAdd(t), this._nonPointGroup.onAdd(t), this._gridClusters || this._generateInitialClusters(), e = 0, n = this._needsRemoving.length; n > e; e++)
                i = this._needsRemoving[e], this._removeLayer(i, !0);
            for (this._needsRemoving = [], e = 0, n = this._needsClustering.length; n > e; e++)
                i = this._needsClustering[e], i.getLatLng ? i.__parent || this._addLayer(i, this._maxZoom) : this._featureGroup.addLayer(i);
            this._needsClustering = [], this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), this._zoom = this._map.getZoom(), this._currentShownBounds = this._getExpandedVisibleBounds(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)
        },onRemove: function(t) {
            t.off("zoomend", this._zoomEnd, this), t.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), this._hideCoverage(), this._featureGroup.onRemove(t), this._nonPointGroup.onRemove(t), this._featureGroup.clearLayers(), this._map = null
        },getVisibleParent: function(t) {
            for (var e = t; e && !e._icon; )
                e = e.__parent;
            return e || null
        },_arraySplice: function(t, e) {
            for (var n = t.length - 1; n >= 0; n--)
                if (t[n] === e)
                    return t.splice(n, 1), !0
        },_removeLayer: function(t, e, n) {
            var i = this._gridClusters, r = this._gridUnclustered, o = this._featureGroup, a = this._map;
            if (e)
                for (var s = this._maxZoom; s >= 0 && r[s].removeObject(t, a.project(t.getLatLng(), s)); s--)
                    ;
            var u, l = t.__parent, h = l._markers;
            for (this._arraySplice(h, t); l && (l._childCount--, !(l._zoom < 0)); )
                e && l._childCount <= 1 ? (u = l._markers[0] === t ? l._markers[1] : l._markers[0], i[l._zoom].removeObject(l, a.project(l._cLatLng, l._zoom)), r[l._zoom].addObject(u, a.project(u.getLatLng(), l._zoom)), this._arraySplice(l.__parent._childClusters, l), l.__parent._markers.push(u), u.__parent = l.__parent, l._icon && (o.removeLayer(l), n || o.addLayer(u))) : (l._recalculateBounds(), n && l._icon || l._updateIcon()), l = l.__parent;
            delete t.__parent
        },_isOrIsParent: function(t, e) {
            for (; e; ) {
                if (t === e)
                    return !0;
                e = e.parentNode
            }
            return !1
        },_propagateEvent: function(t) {
            if (t.layer instanceof L.MarkerCluster) {
                if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget))
                    return;
                t.type = "cluster" + t.type
            }
            this.fire(t.type, t)
        },_defaultIconCreateFunction: function(t) {
            var e = t.getChildCount(), n = " marker-cluster-";
            return n += 10 > e ? "small" : 100 > e ? "medium" : "large", new L.DivIcon({html: "<div><span>" + e + "</span></div>",className: "marker-cluster" + n,iconSize: new L.Point(40, 40)})
        },_bindEvents: function() {
            var t = this._map, e = this.options.spiderfyOnMaxZoom, n = this.options.showCoverageOnHover, i = this.options.zoomToBoundsOnClick;
            (e || i) && this.on("clusterclick", this._zoomOrSpiderfy, this), n && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), t.on("zoomend", this._hideCoverage, this))
        },_zoomOrSpiderfy: function(t) {
            var e = this._map;
            e.getMaxZoom() === e.getZoom() ? this.options.spiderfyOnMaxZoom && t.layer.spiderfy() : this.options.zoomToBoundsOnClick && t.layer.zoomToBounds(), t.originalEvent && 13 === t.originalEvent.keyCode && e._container.focus()
        },_showCoverage: function(t) {
            var e = this._map;
            this._inZoomAnimation || (this._shownPolygon && e.removeLayer(this._shownPolygon), t.layer.getChildCount() > 2 && t.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(t.layer.getConvexHull(), this.options.polygonOptions), e.addLayer(this._shownPolygon)))
        },_hideCoverage: function() {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null)
        },_unbindEvents: function() {
            var t = this.options.spiderfyOnMaxZoom, e = this.options.showCoverageOnHover, n = this.options.zoomToBoundsOnClick, i = this._map;
            (t || n) && this.off("clusterclick", this._zoomOrSpiderfy, this), e && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), i.off("zoomend", this._hideCoverage, this))
        },_zoomEnd: function() {
            this._map && (this._mergeSplitClusters(), this._zoom = this._map._zoom, this._currentShownBounds = this._getExpandedVisibleBounds())
        },_moveEnd: function() {
            if (!this._inZoomAnimation) {
                var t = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, t), this._currentShownBounds = t
            }
        },_generateInitialClusters: function() {
            var t = this._map.getMaxZoom(), e = this.options.maxClusterRadius;
            this.options.disableClusteringAtZoom && (t = this.options.disableClusteringAtZoom - 1), this._maxZoom = t, this._gridClusters = {}, this._gridUnclustered = {};
            for (var n = t; n >= 0; n--)
                this._gridClusters[n] = new L.DistanceGrid(e), this._gridUnclustered[n] = new L.DistanceGrid(e);
            this._topClusterLevel = new L.MarkerCluster(this, -1)
        },_addLayer: function(t, e) {
            var n, i, r = this._gridClusters, o = this._gridUnclustered;
            for (this.options.singleMarkerMode && (t.options.icon = this.options.iconCreateFunction({getChildCount: function() {
                    return 1
                },getAllChildMarkers: function() {
                    return [t]
                }})); e >= 0; e--) {
                n = this._map.project(t.getLatLng(), e);
                var a = r[e].getNearObject(n);
                if (a)
                    return a._addChild(t), t.__parent = a, undefined;
                if (a = o[e].getNearObject(n)) {
                    var s = a.__parent;
                    s && this._removeLayer(a, !1);
                    var u = new L.MarkerCluster(this, e, a, t);
                    r[e].addObject(u, this._map.project(u._cLatLng, e)), a.__parent = u, t.__parent = u;
                    var l = u;
                    for (i = e - 1; i > s._zoom; i--)
                        l = new L.MarkerCluster(this, i, l), r[i].addObject(l, this._map.project(a.getLatLng(), i));
                    for (s._addChild(l), i = e; i >= 0 && o[i].removeObject(a, this._map.project(a.getLatLng(), i)); i--)
                        ;
                    return
                }
                o[e].addObject(t, n)
            }
            this._topClusterLevel._addChild(t), t.__parent = this._topClusterLevel
        },_enqueue: function(t) {
            this._queue.push(t), this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
        },_processQueue: function() {
            for (var t = 0; t < this._queue.length; t++)
                this._queue[t].call(this);
            this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null
        },_mergeSplitClusters: function() {
            this._processQueue(), this._zoom < this._map._zoom && this._currentShownBounds.contains(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, this._map._zoom)) : this._zoom > this._map._zoom ? (this._animationStart(), this._animationZoomOut(this._zoom, this._map._zoom)) : this._moveEnd()
        },_getExpandedVisibleBounds: function() {
            if (!this.options.removeOutsideVisibleBounds)
                return this.getBounds();
            var t = this._map, e = t.getBounds(), n = e._southWest, i = e._northEast, r = L.Browser.mobile ? 0 : Math.abs(n.lat - i.lat), o = L.Browser.mobile ? 0 : Math.abs(n.lng - i.lng);
            return new L.LatLngBounds(new L.LatLng(n.lat - r, n.lng - o, !0), new L.LatLng(i.lat + r, i.lng + o, !0))
        },_animationAddLayerNonAnimated: function(t, e) {
            if (e === t)
                this._featureGroup.addLayer(t);
            else if (2 === e._childCount) {
                e._addToMap();
                var n = e.getAllChildMarkers();
                this._featureGroup.removeLayer(n[0]), this._featureGroup.removeLayer(n[1])
            } else
                e._updateIcon()
        }}), L.MarkerClusterGroup.include(L.DomUtil.TRANSITION ? {_animationStart: function() {
            this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++
        },_animationEnd: function() {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend")
        },_animationZoomIn: function(t, e) {
            var n, i = this._getExpandedVisibleBounds(), r = this._featureGroup;
            this._topClusterLevel._recursively(i, t, 0, function(o) {
                var a, s = o._latlng, u = o._markers;
                for (i.contains(s) || (s = null), o._isSingleParent() && t + 1 === e ? (r.removeLayer(o), o._recursivelyAddChildrenToMap(null, e, i)) : (o.setOpacity(0), o._recursivelyAddChildrenToMap(s, e, i)), n = u.length - 1; n >= 0; n--)
                    a = u[n], i.contains(a._latlng) || r.removeLayer(a)
            }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(i, e), r.eachLayer(function(t) {
                t instanceof L.MarkerCluster || !t._icon || t.setOpacity(1)
            }), this._topClusterLevel._recursively(i, t, e, function(t) {
                t._recursivelyRestoreChildPositions(e)
            }), this._enqueue(function() {
                this._topClusterLevel._recursively(i, t, 0, function(t) {
                    r.removeLayer(t), t.setOpacity(1)
                }), this._animationEnd()
            })
        },_animationZoomOut: function(t, e) {
            this._animationZoomOutSingle(this._topClusterLevel, t - 1, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, e, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t, this._getExpandedVisibleBounds())
        },_animationZoomOutSingle: function(t, e, n) {
            var i = this._getExpandedVisibleBounds();
            t._recursivelyAnimateChildrenInAndAddSelfToMap(i, e + 1, n);
            var r = this;
            this._forceLayout(), t._recursivelyBecomeVisible(i, n), this._enqueue(function() {
                if (1 === t._childCount) {
                    var o = t._markers[0];
                    o.setLatLng(o.getLatLng()), o.setOpacity(1)
                } else
                    t._recursively(i, n, 0, function(t) {
                        t._recursivelyRemoveChildrenFromMap(i, e + 1)
                    });
                r._animationEnd()
            })
        },_animationAddLayer: function(t, e) {
            var n = this, i = this._featureGroup;
            i.addLayer(t), e !== t && (e._childCount > 2 ? (e._updateIcon(), this._forceLayout(), this._animationStart(), t._setPos(this._map.latLngToLayerPoint(e.getLatLng())), t.setOpacity(0), this._enqueue(function() {
                i.removeLayer(t), t.setOpacity(1), n._animationEnd()
            })) : (this._forceLayout(), n._animationStart(), n._animationZoomOutSingle(e, this._map.getMaxZoom(), this._map.getZoom())))
        },_forceLayout: function() {
            L.Util.falseFn(e.body.offsetWidth)
        }} : {_animationStart: function() {
        },_animationZoomIn: function(t, e) {
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, e, this._getExpandedVisibleBounds())
        },_animationZoomOut: function(t, e) {
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, e, this._getExpandedVisibleBounds())
        },_animationAddLayer: function(t, e) {
            this._animationAddLayerNonAnimated(t, e)
        }}), L.markerClusterGroup = function(t) {
        return new L.MarkerClusterGroup(t)
    }, L.MarkerCluster = L.Marker.extend({initialize: function(t, e, n, i) {
            L.Marker.prototype.initialize.call(this, n ? n._cLatLng || n.getLatLng() : new L.LatLng(0, 0), {icon: this}), this._group = t, this._zoom = e, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._bounds = new L.LatLngBounds, n && this._addChild(n), i && this._addChild(i)
        },getAllChildMarkers: function(t) {
            t = t || [];
            for (var e = this._childClusters.length - 1; e >= 0; e--)
                this._childClusters[e].getAllChildMarkers(t);
            for (var n = this._markers.length - 1; n >= 0; n--)
                t.push(this._markers[n]);
            return t
        },getChildCount: function() {
            return this._childCount
        },zoomToBounds: function() {
            for (var t, e = this._childClusters.slice(), n = this._group._map, i = n.getBoundsZoom(this._bounds), r = this._zoom + 1, o = n.getZoom(); e.length > 0 && i > r; ) {
                r++;
                var a = [];
                for (t = 0; t < e.length; t++)
                    a = a.concat(e[t]._childClusters);
                e = a
            }
            i > r ? this._group._map.setView(this._latlng, r) : o >= i ? this._group._map.setView(this._latlng, o + 1) : this._group._map.fitBounds(this._bounds)
        },getBounds: function() {
            var t = new L.LatLngBounds;
            return t.extend(this._bounds), t
        },_updateIcon: function() {
            this._iconNeedsUpdate = !0, this._icon && this.setIcon(this)
        },createIcon: function() {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon()
        },createShadow: function() {
            return this._iconObj.createShadow()
        },_addChild: function(t, e) {
            this._iconNeedsUpdate = !0, this._expandBounds(t), t instanceof L.MarkerCluster ? (e || (this._childClusters.push(t), t.__parent = this), this._childCount += t._childCount) : (e || this._markers.push(t), this._childCount++), this.__parent && this.__parent._addChild(t, !0)
        },_expandBounds: function(t) {
            var e, n = t._wLatLng || t._latlng;
            t instanceof L.MarkerCluster ? (this._bounds.extend(t._bounds), e = t._childCount) : (this._bounds.extend(n), e = 1), this._cLatLng || (this._cLatLng = t._cLatLng || n);
            var i = this._childCount + e;
            this._wLatLng ? (this._wLatLng.lat = (n.lat * e + this._wLatLng.lat * this._childCount) / i, this._wLatLng.lng = (n.lng * e + this._wLatLng.lng * this._childCount) / i) : this._latlng = this._wLatLng = new L.LatLng(n.lat, n.lng)
        },_addToMap: function(t) {
            t && (this._backupLatlng = this._latlng, this.setLatLng(t)), this._group._featureGroup.addLayer(this)
        },_recursivelyAnimateChildrenIn: function(t, e, n) {
            this._recursively(t, 0, n - 1, function(t) {
                var n, i, r = t._markers;
                for (n = r.length - 1; n >= 0; n--)
                    i = r[n], i._icon && (i._setPos(e), i.setOpacity(0))
            }, function(t) {
                var n, i, r = t._childClusters;
                for (n = r.length - 1; n >= 0; n--)
                    i = r[n], i._icon && (i._setPos(e), i.setOpacity(0))
            })
        },_recursivelyAnimateChildrenInAndAddSelfToMap: function(t, e, n) {
            this._recursively(t, n, 0, function(i) {
                i._recursivelyAnimateChildrenIn(t, i._group._map.latLngToLayerPoint(i.getLatLng()).round(), e), i._isSingleParent() && e - 1 === n ? (i.setOpacity(1), i._recursivelyRemoveChildrenFromMap(t, e)) : i.setOpacity(0), i._addToMap()
            })
        },_recursivelyBecomeVisible: function(t, e) {
            this._recursively(t, 0, e, null, function(t) {
                t.setOpacity(1)
            })
        },_recursivelyAddChildrenToMap: function(t, e, n) {
            this._recursively(n, -1, e, function(i) {
                if (e !== i._zoom)
                    for (var r = i._markers.length - 1; r >= 0; r--) {
                        var o = i._markers[r];
                        n.contains(o._latlng) && (t && (o._backupLatlng = o.getLatLng(), o.setLatLng(t), o.setOpacity && o.setOpacity(0)), i._group._featureGroup.addLayer(o))
                    }
            }, function(e) {
                e._addToMap(t)
            })
        },_recursivelyRestoreChildPositions: function(t) {
            for (var e = this._markers.length - 1; e >= 0; e--) {
                var n = this._markers[e];
                n._backupLatlng && (n.setLatLng(n._backupLatlng), delete n._backupLatlng)
            }
            if (t - 1 === this._zoom)
                for (var i = this._childClusters.length - 1; i >= 0; i--)
                    this._childClusters[i]._restorePosition();
            else
                for (var r = this._childClusters.length - 1; r >= 0; r--)
                    this._childClusters[r]._recursivelyRestoreChildPositions(t)
        },_restorePosition: function() {
            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng)
        },_recursivelyRemoveChildrenFromMap: function(t, e, n) {
            var i, r;
            this._recursively(t, -1, e - 1, function(t) {
                for (r = t._markers.length - 1; r >= 0; r--)
                    i = t._markers[r], n && n.contains(i._latlng) || (t._group._featureGroup.removeLayer(i), i.setOpacity && i.setOpacity(1))
            }, function(t) {
                for (r = t._childClusters.length - 1; r >= 0; r--)
                    i = t._childClusters[r], n && n.contains(i._latlng) || (t._group._featureGroup.removeLayer(i), i.setOpacity && i.setOpacity(1))
            })
        },_recursively: function(t, e, n, i, r) {
            var o, a, s = this._childClusters, u = this._zoom;
            if (e > u)
                for (o = s.length - 1; o >= 0; o--)
                    a = s[o], t.intersects(a._bounds) && a._recursively(t, e, n, i, r);
            else if (i && i(this), r && this._zoom === n && r(this), n > u)
                for (o = s.length - 1; o >= 0; o--)
                    a = s[o], t.intersects(a._bounds) && a._recursively(t, e, n, i, r)
        },_recalculateBounds: function() {
            var t, e = this._markers, n = this._childClusters;
            for (this._bounds = new L.LatLngBounds, delete this._wLatLng, t = e.length - 1; t >= 0; t--)
                this._expandBounds(e[t]);
            for (t = n.length - 1; t >= 0; t--)
                this._expandBounds(n[t])
        },_isSingleParent: function() {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }}), L.DistanceGrid = function(t) {
        this._cellSize = t, this._sqCellSize = t * t, this._grid = {}, this._objectPoint = {}
    }, L.DistanceGrid.prototype = {addObject: function(t, e) {
            var n = this._getCoord(e.x), i = this._getCoord(e.y), r = this._grid, o = r[i] = r[i] || {}, a = o[n] = o[n] || [], s = L.Util.stamp(t);
            this._objectPoint[s] = e, a.push(t)
        },updateObject: function(t, e) {
            this.removeObject(t), this.addObject(t, e)
        },removeObject: function(t, e) {
            var n, i, r = this._getCoord(e.x), o = this._getCoord(e.y), a = this._grid, s = a[o] = a[o] || {}, u = s[r] = s[r] || [];
            for (delete this._objectPoint[L.Util.stamp(t)], n = 0, i = u.length; i > n; n++)
                if (u[n] === t)
                    return u.splice(n, 1), 1 === i && delete s[r], !0
        },eachObject: function(t, e) {
            var n, i, r, o, a, s, u, l = this._grid;
            for (n in l) {
                a = l[n];
                for (i in a)
                    for (s = a[i], r = 0, o = s.length; o > r; r++)
                        u = t.call(e, s[r]), u && (r--, o--)
            }
        },getNearObject: function(t) {
            var e, n, i, r, o, a, s, u, l = this._getCoord(t.x), h = this._getCoord(t.y), c = this._objectPoint, f = this._sqCellSize, p = null;
            for (e = h - 1; h + 1 >= e; e++)
                if (r = this._grid[e])
                    for (n = l - 1; l + 1 >= n; n++)
                        if (o = r[n])
                            for (i = 0, a = o.length; a > i; i++)
                                s = o[i], u = this._sqDist(c[L.Util.stamp(s)], t), f > u && (f = u, p = s);
            return p
        },_getCoord: function(t) {
            return Math.floor(t / this._cellSize)
        },_sqDist: function(t, e) {
            var n = e.x - t.x, i = e.y - t.y;
            return n * n + i * i
        }}, function() {
        L.QuickHull = {getDistant: function(t, e) {
                var n = e[1].lat - e[0].lat, i = e[0].lng - e[1].lng;
                return i * (t.lat - e[0].lat) + n * (t.lng - e[0].lng)
            },findMostDistantPointFromBaseLine: function(t, e) {
                var n, i, r, o = 0, a = null, s = [];
                for (n = e.length - 1; n >= 0; n--)
                    i = e[n], r = this.getDistant(i, t), r > 0 && (s.push(i), r > o && (o = r, a = i));
                return {maxPoint: a,newPoints: s}
            },buildConvexHull: function(t, e) {
                var n = [], i = this.findMostDistantPointFromBaseLine(t, e);
                return i.maxPoint ? (n = n.concat(this.buildConvexHull([t[0], i.maxPoint], i.newPoints)), n = n.concat(this.buildConvexHull([i.maxPoint, t[1]], i.newPoints))) : [t[0]]
            },getConvexHull: function(t) {
                var e, n = !1, i = !1, r = null, o = null;
                for (e = t.length - 1; e >= 0; e--) {
                    var a = t[e];
                    (n === !1 || a.lat > n) && (r = a, n = a.lat), (i === !1 || a.lat < i) && (o = a, i = a.lat)
                }
                var s = [].concat(this.buildConvexHull([o, r], t), this.buildConvexHull([r, o], t));
                return s
            }}
    }(), L.MarkerCluster.include({getConvexHull: function() {
            var t, e, n = this.getAllChildMarkers(), i = [];
            for (e = n.length - 1; e >= 0; e--)
                t = n[e].getLatLng(), i.push(t);
            return L.QuickHull.getConvexHull(i)
        }}), L.MarkerCluster.include({_2PI: 2 * Math.PI,_circleFootSeparation: 25,_circleStartAngle: Math.PI / 6,_spiralFootSeparation: 28,_spiralLengthStart: 11,_spiralLengthFactor: 5,_circleSpiralSwitchover: 9,spiderfy: function() {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var t, e = this.getAllChildMarkers(), n = this._group, i = n._map, r = i.latLngToLayerPoint(this._latlng);
                this._group._unspiderfy(), this._group._spiderfied = this, e.length >= this._circleSpiralSwitchover ? t = this._generatePointsSpiral(e.length, r) : (r.y += 10, t = this._generatePointsCircle(e.length, r)), this._animationSpiderfy(e, t)
            }
        },unspiderfy: function(t) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(t), this._group._spiderfied = null)
        },_generatePointsCircle: function(t, e) {
            var n, i, r = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + t), o = r / this._2PI, a = this._2PI / t, s = [];
            for (s.length = t, n = t - 1; n >= 0; n--)
                i = this._circleStartAngle + n * a, s[n] = new L.Point(e.x + o * Math.cos(i), e.y + o * Math.sin(i))._round();
            return s
        },_generatePointsSpiral: function(t, e) {
            var n, i = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthStart, r = this._group.options.spiderfyDistanceMultiplier * this._spiralFootSeparation, o = this._group.options.spiderfyDistanceMultiplier * this._spiralLengthFactor, a = 0, s = [];
            for (s.length = t, n = t - 1; n >= 0; n--)
                a += r / i + 5e-4 * n, s[n] = new L.Point(e.x + i * Math.cos(a), e.y + i * Math.sin(a))._round(), i += this._2PI * o / a;
            return s
        },_noanimationUnspiderfy: function() {
            var t, e, n = this._group, i = n._map, r = n._featureGroup, o = this.getAllChildMarkers();
            for (this.setOpacity(1), e = o.length - 1; e >= 0; e--)
                t = o[e], r.removeLayer(t), t._preSpiderfyLatlng && (t.setLatLng(t._preSpiderfyLatlng), delete t._preSpiderfyLatlng), t.setZIndexOffset && t.setZIndexOffset(0), t._spiderLeg && (i.removeLayer(t._spiderLeg), delete t._spiderLeg);
            n._spiderfied = null
        }}), L.MarkerCluster.include(L.DomUtil.TRANSITION ? {SVG_ANIMATION: function() {
            return ("" + e.createElementNS("http://www.w3.org/2000/svg", "animate")).indexOf("SVGAnimate") > -1
        }(),_animationSpiderfy: function(t, n) {
            var i, r, o, a, s = this, u = this._group, l = u._map, h = u._featureGroup, c = l.latLngToLayerPoint(this._latlng);
            for (i = t.length - 1; i >= 0; i--)
                r = t[i], r.setOpacity ? (r.setZIndexOffset(1e6), r.setOpacity(0), h.addLayer(r), r._setPos(c)) : h.addLayer(r);
            u._forceLayout(), u._animationStart();
            var f = L.Path.SVG ? 0 : .3, p = L.Path.SVG_NS;
            for (i = t.length - 1; i >= 0; i--)
                if (a = l.layerPointToLatLng(n[i]), r = t[i], r._preSpiderfyLatlng = r._latlng, r.setLatLng(a), r.setOpacity && r.setOpacity(1), o = new L.Polyline([s._latlng, a], {weight: 1.5,color: "#222",opacity: f}), l.addLayer(o), r._spiderLeg = o, L.Path.SVG && this.SVG_ANIMATION) {
                    var d = o._path.getTotalLength();
                    o._path.setAttribute("stroke-dasharray", d + "," + d);
                    var m = e.createElementNS(p, "animate");
                    m.setAttribute("attributeName", "stroke-dashoffset"), m.setAttribute("begin", "indefinite"), m.setAttribute("from", d), m.setAttribute("to", 0), m.setAttribute("dur", .25), o._path.appendChild(m), m.beginElement(), m = e.createElementNS(p, "animate"), m.setAttribute("attributeName", "stroke-opacity"), m.setAttribute("attributeName", "stroke-opacity"), m.setAttribute("begin", "indefinite"), m.setAttribute("from", 0), m.setAttribute("to", .5), m.setAttribute("dur", .25), o._path.appendChild(m), m.beginElement()
                }
            if (s.setOpacity(.3), L.Path.SVG)
                for (this._group._forceLayout(), i = t.length - 1; i >= 0; i--)
                    r = t[i]._spiderLeg, r.options.opacity = .5, r._path.setAttribute("stroke-opacity", .5);
            setTimeout(function() {
                u._animationEnd(), u.fire("spiderfied")
            }, 200)
        },_animationUnspiderfy: function(t) {
            var e, n, i, r = this._group, o = r._map, a = r._featureGroup, s = t ? o._latLngToNewLayerPoint(this._latlng, t.zoom, t.center) : o.latLngToLayerPoint(this._latlng), u = this.getAllChildMarkers(), l = L.Path.SVG && this.SVG_ANIMATION;
            for (r._animationStart(), this.setOpacity(1), n = u.length - 1; n >= 0; n--)
                e = u[n], e._preSpiderfyLatlng && (e.setLatLng(e._preSpiderfyLatlng), delete e._preSpiderfyLatlng, e.setOpacity ? (e._setPos(s), e.setOpacity(0)) : a.removeLayer(e), l && (i = e._spiderLeg._path.childNodes[0], i.setAttribute("to", i.getAttribute("from")), i.setAttribute("from", 0), i.beginElement(), i = e._spiderLeg._path.childNodes[1], i.setAttribute("from", .5), i.setAttribute("to", 0), i.setAttribute("stroke-opacity", 0), i.beginElement(), e._spiderLeg._path.setAttribute("stroke-opacity", 0)));
            setTimeout(function() {
                var t = 0;
                for (n = u.length - 1; n >= 0; n--)
                    e = u[n], e._spiderLeg && t++;
                for (n = u.length - 1; n >= 0; n--)
                    e = u[n], e._spiderLeg && (e.setOpacity && (e.setOpacity(1), e.setZIndexOffset(0)), t > 1 && a.removeLayer(e), o.removeLayer(e._spiderLeg), delete e._spiderLeg);
                r._animationEnd()
            }, 200)
        }} : {_animationSpiderfy: function(t, e) {
            var n, i, r, o, a = this._group, s = a._map, u = a._featureGroup;
            for (n = t.length - 1; n >= 0; n--)
                o = s.layerPointToLatLng(e[n]), i = t[n], i._preSpiderfyLatlng = i._latlng, i.setLatLng(o), i.setZIndexOffset && i.setZIndexOffset(1e6), u.addLayer(i), r = new L.Polyline([this._latlng, o], {weight: 1.5,color: "#222"}), s.addLayer(r), i._spiderLeg = r;
            this.setOpacity(.3), a.fire("spiderfied")
        },_animationUnspiderfy: function() {
            this._noanimationUnspiderfy()
        }}), L.MarkerClusterGroup.include({_spiderfied: null,_spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), this._map.on("zoomend", this._noanimationUnspiderfy, this), L.Path.SVG && !L.Browser.touch && this._map._initPathRoot()
        },_spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy()
        },_unspiderfyZoomStart: function() {
            this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        },_unspiderfyZoomAnim: function(t) {
            L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(t))
        },_unspiderfyWrapper: function() {
            this._unspiderfy()
        },_unspiderfy: function(t) {
            this._spiderfied && this._spiderfied.unspiderfy(t)
        },_noanimationUnspiderfy: function() {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy()
        },_unspiderfyLayer: function(t) {
            t._spiderLeg && (this._featureGroup.removeLayer(t), t.setOpacity(1), t.setZIndexOffset(0), this._map.removeLayer(t._spiderLeg), delete t._spiderLeg)
        }})
}(window, document), Livefyre.define("leaflet-markercluster", ["leaflet-markercluster/leaflet.markercluster-src"], function(t) {
    return t
}), Livefyre.define("leaflet-markercluster/leaflet.markercluster-src", ["leaflet"], function() {
}), Livefyre.define("text!leaflet-markercluster/MarkerCluster.css", [], function() {
    return ".leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {\n	-webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;\n	-moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;\n	-o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;\n	transition: transform 0.3s ease-out, opacity 0.3s ease-in;\n	}\n"
}), Livefyre.define("streamhub-map/leaflet-markercluster", ["leaflet-markercluster", "text!leaflet-markercluster/MarkerCluster.css"], function(t, e) {
    var n;
    if (!n) {
        var i = document.createElement("style");
        i.innerHTML = e, document.getElementsByTagName("head")[0].appendChild(i)
    }
    return t
}), Livefyre.define("streamhub-map/content/content-map-view", ["streamhub-map", "streamhub-sdk/content/views/content-list-view", "streamhub-map/content/content-point", "hgn!streamhub-map/views/templates/marker", "inherits", "streamhub-map/leaflet", "streamhub-map/leaflet-markercluster"], function(t, e, n, i, r, o) {
    var a = function(e) {
        this._contentToMarkerMap = {}, this._markers = new o.MarkerClusterGroup({showCoverageOnHover: !1,zoomToBoundsOnClick: !0,maxClusterRadius: 100,spiderfyDistanceMultiplier: 2,iconCreateFunction: function(t) {
                for (var e, n = t.getAllChildMarkers(), i = 0; i < n.length; i++) {
                    var r = n[i];
                    if (e = r._icon ? r._icon.innerHTML : r.options.icon.options.html)
                        break
                }
                var a = $(e);
                return a.append('<div class="hub-map-marker-badge">' + n.length + "</div>"), new o.ContentDivIcon({className: "hub-map-collection-marker",html: '<div class="hub-map-marker-bg">' + a.html() + "</div>",iconSize: [54, 55],iconAnchor: [27, 27.5]})
            }}), t.call(this, e)
    };
    return r(a, t), a.prototype.add = function(e) {
        if (e._annotations.geocode && e._annotations.geocode.latitude && e._annotations.geocode.longitude) {
            var i = new n(e);
            t.prototype.add.call(this, i)
        }
    }, a.prototype.setElement = function() {
        t.prototype.setElement.apply(this, arguments);
        var e = this;
        this.$el.on("focusDataPoint.hub", function(t, n) {
            e._displayDataPointDetails(n.contentItems)
        }), this._markers.on("click", function(t) {
            var n = t.layer.options.icon.options.content;
            e.$el.trigger("focusDataPoint.hub", {contentItems: [n]})
        }), this._markers.on("clusterclick", function(t) {
            if (e._map.getMaxZoom() === e._map.getZoom()) {
                for (var n = [], i = 0; i < t.layer._markers.length; i++)
                    n.push(t.layer._markers[i].options.icon.options.content);
                e.$el.trigger("focusDataPoint.hub", {contentItems: n})
            }
        })
    }, a.prototype._drawMarker = function(t) {
        var e = new o.Marker(new o.LatLng(t.lat, t.lon), {icon: new o.ContentDivIcon({className: "hub-map-content-marker",html: i({thumbnail_url: t.getContent().attachments[0].thumbnail_url}),iconSize: [44, 48],iconAnchor: [22, 48],content: t.getContent()})});
        this._markers.addLayer(e), this._map.addLayer(this._markers), this._contentToMarkerMap[t.getContent().id] = e
    }, a.prototype._displayDataPointDetails = function(t) {
        if (this.modal && t && t.length) {
            for (var n = new e, i = 0; i < t.length; i++)
                n.more.write(t[i]);
            this.modal.show(n)
        }
    }, a.prototype._removeDataPoint = function(e) {
        this._markers.removeLayer(this._contentToMarkerMap[e.getContent().id]), t.prototype._removeDataPoint.call(this, e)
    }, a
}), Livefyre.define("streamhub-hot-collections/clients/hot-collections-client", ["streamhub-sdk/jquery"], function(t) {
    var e = function() {
    };
    return e.prototype.get = function(t, e) {
        var n, i;
        t = t || {}, e = e || function() {
        }, n = t.environment && "fyre" === t.environment;
        var r = ["http://bootstrap.", "livefyre.com" === t.network ? t.environment || "livefyre.com" : t.network, "/api/v3.0/hottest/"].join("");
        i = {site: t.siteId,tag: t.tag,number: t.count}, this._get(r, i, function(t, n) {
            var i = n && n.data;
            return i ? (e(null, i), void 0) : e("No data in Hot Collections response")
        })
    }, e.prototype._get = function(e, n, i) {
        t.ajax({type: "GET",url: e,data: n,dataType: "json",success: function(t) {
                i(null, t)
            },error: function(t, e, n) {
                i(n)
            }})
    }, e
}), Livefyre.define("streamhub-sdk/collection/clients/http-client", ["streamhub-sdk/jquery"], function(t) {
    var e = function(t) {
        t = t || {}, this._serviceName = t.serviceName, this._protocol = t.protocol || document.location.protocol, ":" !== this._protocol.slice(-1) && (this._protocol += ":")
    };
    e.prototype._request = function(e, i) {
        var r = t.ajax({type: e.method || "GET",url: e.url,data: e.data,dataType: e.dataType || this._getDataType()});
        return r.done(function(t) {
            i(null, t)
        }), r.fail(function(t, e, r) {
            n || (r || (r = "LivefyreHttpClient Error"), i(r))
        }), r
    }, e.prototype._getDataType = function() {
        return t.support.cors ? "json" : "jsonp"
    }, e.prototype._getUrlBase = function(t) {
        return [this._protocol, "//", this._getHost(t)].join("")
    }, e.prototype._getHost = function(t) {
        var e, n = "livefyre.com" === t.network, i = this._serviceName + "." + (n ? t.environment : t.network);
        return n || "https:" !== this._protocol || (e = t.network.split("."), e.splice(1, 0, this._serviceName), i = e.join(".")), i
    };
    var n = !1;
    return t(window).on("beforeunload", function() {
        n = !0
    }), e
}), function() {
    var t = "undefined" != typeof exports ? exports : window, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = function() {
        try {
            document.createElement("$")
        } catch (t) {
            return t
        }
    }();
    t.btoa || (t.btoa = function(t) {
        for (var i, r, o = 0, a = e, s = ""; t.charAt(0 | o) || (a = "=", o % 1); s += a.charAt(63 & i >> 8 - 8 * (o % 1))) {
            if (r = t.charCodeAt(o += .75), r > 255)
                throw n;
            i = i << 8 | r
        }
        return s
    }), t.atob || (t.atob = function(t) {
        if (t = t.replace(/=+$/, ""), 1 == t.length % 4)
            throw n;
        for (var i, r, o = 0, a = 0, s = ""; r = t.charAt(a++); ~r && (i = o % 4 ? 64 * i + r : r, o++ % 4) ? s += String.fromCharCode(255 & i >> (6 & -2 * o)) : 0)
            r = e.indexOf(r);
        return s
    })
}(), Livefyre.define("base64", function() {
}), Livefyre.define("streamhub-sdk/collection/clients/bootstrap-client", ["streamhub-sdk/collection/clients/http-client", "inherits", "base64"], function(t, e) {
    var n = function(e) {
        e = e || {}, e.serviceName = "bootstrap", t.call(this, e)
    };
    return e(n, t), n.prototype._serviceName = "bootstrap", n.prototype.getContent = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = t.environment || "livefyre.com", i = "livefyre.com" !== n && "fyre" !== n, r = [this._getUrlBase(t), "/bs3/", i ? t.environment + "/" : "", t.network, "/", t.siteId, "/", btoa(t.articleId), "/", void 0 !== t.page ? t.page + ".json" : "init"].join("");
        this._request({url: r}, e)
    }, n
}), Livefyre.define("streamhub-sdk/content/types/oembed", ["streamhub-sdk/jquery", "streamhub-sdk/content", "inherits"], function(t, e, n) {
    var i = function(n) {
        if (e.call(this, this), n && -1 === i.types.indexOf(n.type))
            throw Error("Oembeds must be constructed with .type in " + i.types);
        n = n || {}, t.extend(this, n), void 0 !== this.html && "" === t.trim(this.html) && (this.html = null)
    };
    return n(i, e), i.types = ["photo", "video", "link", "rich"], i.properties = ["type", "version", "title", "author_name", "author_url", "provider_name", "provider_url", "cache_age", "thumbnail_url", "thumbnail_width", "thumbnail_height", "url", "width", "height", "html"], i.prototype.toJSON = function() {
        var e = this, n = {};
        return t.each(i.properties, function(t, i) {
            void 0 !== e[i] && (n[i] = e[i])
        }), n
    }, i
}), Livefyre.define("streamhub-sdk/content/types/livefyre-oembed", ["streamhub-sdk/jquery", "streamhub-sdk/content/types/oembed", "streamhub-sdk/content/types/livefyre-content", "inherits"], function(t, e, n, i) {
    var r = function(t) {
        n.call(this, t), e.call(this, t.content.oembed), "Facebook" === this.provider_name && this.url && this.thumbnail_url && ("" === this.html || null === this.html) && (this.html = "<a href='" + this.url + "' target='_blank'/><img src='" + this.thumbnail_url + "'/></a>")
    };
    return i(r, e), t.extend(r.prototype, n.prototype), r
}), Livefyre.define("streamhub-sdk/storage", ["streamhub-sdk/jquery", "event-emitter"], function(t, e) {
    var n = {cache: {}};
    return e.call(n), t.extend(n, e.prototype), n.get = function(t, e) {
        var n = this.cache[t];
        return e ? (e(n), void 0) : n
    }, n.set = function(t, e, n) {
        var i = this.cache[t];
        return this.cache[t] = e, i ? this.emit("change", i, e) : this.emit("add", e), n ? (n(e), void 0) : e
    }, n
}), Livefyre.define("streamhub-sdk/content/state-to-content", ["streamhub-sdk/content/types/livefyre-content", "streamhub-sdk/content/types/livefyre-twitter-content", "streamhub-sdk/content/types/livefyre-facebook-content", "streamhub-sdk/content/types/oembed", "streamhub-sdk/content/types/livefyre-oembed", "streamhub-sdk/content/types/livefyre-instagram-content", "streamhub-sdk/storage", "streamhub-sdk/debug", "stream/transform", "inherits"], function(t, e, n, i, r, o, a, s, u, l) {
    function h(t) {
        var e = /\/\/instagram\.com/i;
        try {
            return t.content.feedEntry.channelId.match(e)
        } catch (n) {
            return !1
        }
    }
    var c = s("streamhub-sdk/content/state-to-content"), f = function(t) {
        t = t || {}, this._authors = t.authors || {}, this._replies = t.replies, u.call(this, t)
    };
    return l(f, u), f.prototype._transform = function(t, e) {
        var n;
        try {
            n = f.transform(t, this._authors, {replies: this._replies})
        } catch (i) {
            this.emit("error transforming state-to-content", i), c("StateToContent.transform threw", i)
        }
        n && n.length && this.push.apply(this, n), e()
    }, f.transform = function(t, e, n) {
        n = n || {};
        var i, r = void 0 === t.vis || 1 === t.vis, o = t.content.parentId, s = f.enums.type[t.type], u = "OEMBED" === s, l = "CONTENT" === s, h = t.childContent || [], c = [], p = [];
        if (u || l) {
            if (i = f._createContent(t, e), i && i.id) {
                var d = a.get(i.id);
                d ? (l && d.set(f._getUpdatedProperties(i)), i = d) : a.set(i.id, i), c = a.get("children_" + i.id) || []
            }
            h = t.childContent || [];
            for (var m = 0, g = h.length; g > m; m++) {
                var v = this.transform(h[m], e, n);
                p.push.apply(p, v || [])
            }
            if (c.length && this._addChildren(i, c), u && this._attachOrStore(i, t.content.targetId), o && this._addReplyOrStore(i, t.content.parentId), l && r && (!o || n.replies))
                return n.replies ? [i].concat(p) : [i]
        }
    }, f._addChildren = function(e, n) {
        for (var r, o = 0, a = n.length; a > o; o++)
            r = n[o], r instanceof i ? e.addAttachment(r) : r instanceof t && e.addReply(r)
    }, f._createContent = function(i, a) {
        var s, u = f.enums.source[i.source];
        return i.author = a && a[i.content.authorId], "OEMBED" === f.enums.type[i.type] ? new r(i) : "twitter" === u ? new e(i) : "facebook" === u ? new n(i) : "instagram" === u ? new o(i) : "feed" === u ? (s = t, h(i) && (s = o), new s(i)) : "livefyre" === u ? new t(i) : (c("StateToContent could not create content for state", i), void 0)
    }, f._getUpdatedProperties = function(t) {
        var e = {visibility: t.visibility};
        return t.attachments && t.attachments.length && (e.attachments = t.attachments), t.body && (e.body = t.body), t.author && (e.author = t.author), t.createdAt && (e.createdAt = t.createdAt), t.updatedAt && (e.updatedAt = t.updatedAt), e
    }, f._attachOrStore = function(t, e) {
        var n = a.get(e);
        n ? (c("attaching attachment", arguments), n.addAttachment(t)) : (c("storing attachment", arguments), this._storeChild(t, e))
    }, f._addReplyOrStore = function(t, e) {
        var n = a.get(e);
        n ? (c("adding reply", arguments), n.addReply(t)) : (c("storing reply", arguments), this._storeChild(t, e))
    }, f._storeChild = function(t, e) {
        var n = "children_" + e, i = a.get(n) || [];
        i.push(t), a.set(n, i)
    }, f.enums = {}, f.enums.source = t.SOURCES, f.enums.type = ["CONTENT", "OPINE", "SHARE", "OEMBED"], f.Storage = a, f
}), Livefyre.define("streamhub-sdk/collection/streams/archive", ["streamhub-sdk/jquery", "stream/readable", "streamhub-sdk/collection/clients/bootstrap-client", "streamhub-sdk/content/state-to-content", "streamhub-sdk/debug", "inherits"], function(t, e, n, i, r, o) {
    var a = r("streamhub-sdk/streams/collection-archive"), s = function(t) {
        t = t || {}, this._collection = t.collection, this._bootstrapClient = t.bootstrapClient || new n, this._contentIdsInHeadDocument = [], this._replies = t.replies || !1, e.call(this, t)
    };
    return o(s, e), s.prototype._read = function() {
        var t = this;
        return a("_read", "Buffer length is " + this._readableState.buffer.length), void 0 === this._nextPage ? this._collection.initFromBootstrap(function(e, n) {
            var i = n.headDocument, r = n.collectionSettings, o = r && r.archiveInfo, a = o && o.nPages, s = t._contentsFromBootstrapDoc(i, {isHead: !0});
            t._nextPage = a - 1, t.push.apply(t, s)
        }) : null === this._nextPage ? this.push(null) : ("number" == typeof this._nextPage && this._readNextPage(), void 0)
    }, s.prototype._readNextPage = function() {
        var t = this, e = this._getBootstrapClientOptions();
        this._nextPage = this._nextPage - 1, this._nextPage < 0 && (this._nextPage = null), this._bootstrapClient.getContent(e, function(n, i) {
            if (n || !i)
                return t.emit("error", Error("Error requesting Bootstrap page " + e.page)), void 0;
            var r = t._contentsFromBootstrapDoc(i);
            return r.length ? (t.push.apply(t, r), void 0) : t._read()
        })
    }, s.prototype._getBootstrapClientOptions = function() {
        return {environment: this._collection.environment,network: this._collection.network,siteId: this._collection.siteId,articleId: this._collection.articleId,page: this._nextPage}
    }, s.prototype._contentsFromBootstrapDoc = function(t, e) {
        e = e || {}, t = t || {};
        var n, i, r = this, o = t.content || [], s = this._createStateToContent(t), u = [];
        s.on("data", function(t) {
            t && -1 === r._contentIdsInHeadDocument.indexOf(t.id) && (e.isHead && t.id && r._contentIdsInHeadDocument.push(t.id), u.push(t))
        });
        for (var l = 0, h = o.length; h > l; l++)
            n = o[l], i = s.write(n);
        return a("created contents from bootstrapDoc", u), u
    }, s.prototype._createStateToContent = function(t) {
        return t = t || {}, t.replies = this._replies, new i(t)
    }, s
}), Livefyre.define("streamhub-sdk/collection/clients/stream-client", ["streamhub-sdk/collection/clients/http-client", "inherits"], function(t, e) {
    var n = function(e) {
        e = e || {}, e.serviceName = "stream1", t.call(this, e)
    };
    return e(n, t), n.prototype._serviceName = "stream1", n.prototype.getContent = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = [this._getUrlBase(t), "/v3.0/collection/", t.collectionId, "/", t.commentId || "0", "/"].join(""), i = this._request({url: n}, function(t, n) {
            return t ? e.apply(this, arguments) : n.timeout ? e(null, {timeout: n.timeout}) : "error" === n.status ? e(n.msg) : (e(null, n.data), void 0)
        });
        return i
    }, n
}), Livefyre.define("streamhub-sdk/collection/streams/updater", ["inherits", "stream/readable", "stream/util", "streamhub-sdk/collection/clients/bootstrap-client", "streamhub-sdk/collection/clients/stream-client", "streamhub-sdk/content/state-to-content", "streamhub-sdk/debug"], function(t, e, n, i, r, o, a) {
    var s = a("streamhub-sdk/collection/streams/updater"), u = function(t) {
        t = t || {}, this._collection = t.collection, this._streamClient = t.streamClient || new r, this._request = null, this._replies = t.replies || !1, e.call(this, t)
    };
    return t(u, e), u.prototype._read = function() {
        var t = this;
        return s("_read", "Buffer length is " + this._readableState.buffer.length), this._latestEvent && this._collection.id ? (t._stream(), void 0) : this._collection.initFromBootstrap(function(e, n) {
            var i = n.collectionSettings, r = i && i.event;
            if (!t._collection.id)
                throw Error("Couldn't get Collection ID after initFromBootstrap");
            if (void 0 === r)
                throw Error("Couldn't get latestEvent after initFromBootstrap");
            t._latestEvent = r, t._stream()
        })
    }, u.prototype._stream = function() {
        var t = this, e = this._streamClient, i = this._getStreamClientOptions(), r = e.getContent(i, function(e, i) {
            function r() {
                t.push(), n.nextTick(function() {
                    t.read(0)
                })
            }
            if ("abort" === e)
                return s("stream request aborted"), t.push(), void 0;
            if (e)
                return t.emit("error", e);
            if (i.timeout)
                return s("long poll timeout, requesting again on next tick"), r();
            var o = t._contentsFromStreamData(i);
            return t._latestEvent = i.maxEventId, o.length ? (t.push.apply(t, o), void 0) : r()
        });
        this._request = r
    }, u.prototype.pause = function() {
        return this._request && (this._request.abort(), this._request = null), e.prototype.pause.apply(this, arguments)
    }, u.prototype._contentsFromStreamData = function(t) {
        var e, n = this._createStateToContent(t), i = t.states, r = [];
        n.on("data", function(t) {
            r.push(t)
        });
        for (var o in i)
            i.hasOwnProperty(o) && (e = i[o], n.write(e));
        return r
    }, u.prototype._getStreamClientOptions = function() {
        return {collectionId: this._collection.id,network: this._collection.network,environment: this._collection.environment,commentId: this._latestEvent}
    }, u.prototype._createStateToContent = function(t) {
        return t = t || {}, t.replies = this._replies, new o(t)
    }, u
}), Livefyre.define("streamhub-sdk/collection/clients/write-client", ["streamhub-sdk/collection/clients/http-client", "inherits"], function(t, e) {
    var n = function(e) {
        e = e || {}, e.serviceName = "quill", t.call(this, e)
    };
    return e(n, t), n.prototype.postContent = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = [this._getUrlBase(t), "/api/v3.0/collection/", t.collectionId, "/post/"].join(""), i = {body: t.body,lftoken: t.lftoken};
        t.parent_id && (i.parent_id = t.parent_id), t.media && (i.media = JSON.stringify(t.media)), this._request({method: "POST",url: n,dataType: "json",data: i}, e)
    }, n.prototype.postTweet = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = [this._getUrlBase(t), "/api/v3.0/collection/", t.collectionId, "/post/tweet/"].join(""), i = {tweet_id: t.tweetId,lftoken: t.lftoken};
        this._request({method: "POST",url: n,dataType: "json",data: i}, e)
    }, n.prototype.follow = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = [this._getUrlBase(t), "/api/v3.0/collection/", t.collectionId, "/follow/"].join(""), i = {lftoken: t.lftoken};
        this._request({method: "POST",url: n,dataType: "json",data: i}, e)
    }, n.prototype.unfollow = function(t, e) {
        t = t || {}, e = e || function() {
        };
        var n = [this._getUrlBase(t), "/api/v3.0/collection/", t.collectionId, "/unfollow/"].join(""), i = {lftoken: t.lftoken};
        this._request({method: "POST",url: n,dataType: "json",data: i}, e)
    }, n
}), Livefyre.define("streamhub-sdk/auth/main", ["inherits", "event-emitter", "streamhub-sdk/debug"], function(t, e, n) {
    var i = n("streamhub-sdk/auth"), r = new e;
    r.setToken = function(t) {
        i(".setToken", t), this._token = t, this.emit("token", t)
    }, r.getToken = function() {
        return this._token
    };
    var o = function(t) {
        Error.apply(this, arguments), this.message = t
    };
    return t(o, Error), o.prototype.name = "UnauthorizedError", r.UnauthorizedError = o, r
}), Livefyre.define("streamhub-sdk/auth", ["streamhub-sdk/auth/main"], function(t) {
    return t
}), Livefyre.define("streamhub-sdk/collection/streams/writer", ["stream/writable", "streamhub-sdk/collection/clients/write-client", "streamhub-sdk/auth", "inherits"], function(t, e, n, i) {
    var r = function(n) {
        this._collection = n.collection, this._writeClient = n.writeClient || new e, t.call(this, n)
    };
    return i(r, t), r.prototype._write = function o(t, e) {
        var i = this, r = this._collection, a = n.getToken(), s = this._writeClient.postContent, u = t.attachments && t.attachments.length;
        if (!a)
            throw new n.UnauthorizedError("Collection cannot write until streamhub-sdk/auth.setToken has been called");
        if (!r.id)
            return r.initFromBootstrap(function() {
                o.call(i, t, e)
            });
        var l = {body: t.body,network: r.network,collectionId: r.id,lftoken: n.getToken()};
        if (u) {
            l.media = [];
            for (var h = 0; u > h; h++)
                l.media.push(t.attachments[h].toJSON())
        }
        t.parentId && (l.parent_id = t.parentId), t.tweetId && (s = this._writeClient.postTweet, l.tweetId = t.tweetId), s.call(this._writeClient, l, e)
    }, r
}), Livefyre.define("streamhub-sdk/collection/streams/featured-archive", ["streamhub-sdk/jquery", "stream/readable", "streamhub-sdk/collection/clients/bootstrap-client", "streamhub-sdk/content/state-to-content", "streamhub-sdk/debug", "inherits"], function(t, e, n, i, r, o) {
    var a = r("streamhub-sdk/collection/streams/featured-archive"), s = function(t) {
        t = t || {}, this._collection = t.collection, this._fetchedHead = !1, this._bootstrapClient = t.bootstrapClient || new n, this._contentIdsInHeadDocument = [], e.call(this, t)
    };
    return o(s, e), s.prototype._read = function() {
        var t = this;
        return a("_read", "Buffer length is " + this._readableState.buffer.length), this._fetchedHead ? null === this._nextPage ? this.push(null) : (this._nextPage && this._readNextPage(), void 0) : this._collection.initFromBootstrap(function(e, n) {
            var i = n.featured;
            if (!i)
                return t.push(null);
            t._nextPage = i.isComplete ? null : "featured-all";
            var r = t._contentsFromBootstrapDoc(i, {isHead: !0});
            t._fetchedHead = !0, t.push.apply(t, r)
        })
    }, s.prototype._readNextPage = function() {
        var t = this, e = this._getBootstrapClientOptions();
        this._nextPage = null, this._bootstrapClient.getContent(e, function(n, i) {
            if (n || !i)
                return t.emit("error", Error("Error requesting Bootstrap page " + e.page)), void 0;
            var r = t._contentsFromBootstrapDoc(i);
            return r.length ? (t.push.apply(t, r), void 0) : t._read()
        })
    }, s.prototype._getBootstrapClientOptions = function() {
        return {environment: this._collection.environment,network: this._collection.network,siteId: this._collection.siteId,articleId: this._collection.articleId,page: this._nextPage}
    }, s.prototype._contentsFromBootstrapDoc = function(t, e) {
        e = e || {}, t = t || {};
        var n, r, o = this, s = t.content || [], u = new i(t), l = [];
        u.on("data", function(t) {
            t && -1 === o._contentIdsInHeadDocument.indexOf(t.id) && (e.isHead && t.id && o._contentIdsInHeadDocument.push(t.id), l.push(t))
        });
        for (var h = 0, c = s.length; c > h; h++)
            n = s[h], r = u.write(n);
        return a("created contents from bootstrapDoc", l), l
    }, s
}), Livefyre.define("streamhub-sdk/collection/featured-contents", ["streamhub-sdk/collection/streams/featured-archive"], function(t) {
    var e = function(t) {
        t = t || {}, this._collection = t.collection
    };
    return e.prototype.createArchive = function(e) {
        return e = e || {}, e.collection = this._collection, new t(e)
    }, e
}), Livefyre.define("streamhub-sdk/collection/clients/create-client", ["streamhub-sdk/collection/clients/http-client", "inherits"], function(t, e) {
    var n = function(e) {
        e = e || {}, e.serviceName = "quill", t.call(this, e)
    };
    return e(n, t), n.prototype.createCollection = function(t, e) {
        e = e || function() {
        };
        var n = [this._getUrlBase(t), "/api/v3.0/site/", t.siteId, "/collection/create"].join(""), i = t.collectionMeta;
        if (!i)
            throw "User error: Missing collectionMeta.";
        var r = {collectionMeta: i};
        "boolean" == typeof t.signed && (r.signed = t.signed), r.signed || (r.collectionMeta.articleId = t.articleId, t.collectionMeta.tags && (r.collectionMeta.tags = t.collectionMeta.tags.join(","))), t.checksum && (r.checksum = t.checksum), r = JSON.stringify(r), this._request({method: "POST",url: n,dataType: "json",data: r}, e)
    }, n
}), Livefyre.define("streamhub-sdk/collection/main", ["streamhub-sdk/collection/streams/archive", "streamhub-sdk/collection/streams/updater", "streamhub-sdk/collection/streams/writer", "streamhub-sdk/collection/featured-contents", "stream/duplex", "streamhub-sdk/collection/clients/bootstrap-client", "streamhub-sdk/collection/clients/create-client", "streamhub-sdk/collection/clients/write-client", "streamhub-sdk/auth", "inherits", "streamhub-sdk/debug"], function(t, e, n, i, r, o, a, s, u, l, h) {
    var c = h("streamhub-sdk/collection"), f = function(t) {
        t = t || {}, this.id = t.id, this.network = t.network, this.siteId = t.siteId, this.articleId = t.articleId, this.environment = t.environment, this._collectionMeta = t.collectionMeta, this._signed = t.signed, this._autoCreate = t.autoCreate || !0, this._replies = t.replies || !1, this._bootstrapClient = t.bootstrapClient || new o, this._createClient = t.createClient || new a, this._writer = t.writer || null, this._updater = null, this._pipedArchives = [], r.call(this, t)
    };
    return l(f, r), f.prototype.createArchive = function(e) {
        return e = e || {}, new t({collection: this,bootstrapClient: e.bootstrapClient || this._bootstrapClient,replies: this._replies})
    }, f.prototype.createUpdater = function(t) {
        return t = t || {}, new e({collection: this,streamClient: t.streamClient,replies: this._replies})
    }, f.prototype.createWriter = function(t) {
        return t = t || {}, t.collection = this, new n(t)
    }, f.prototype.createFeaturedContents = function(t) {
        return t = t || {}, t.collection = this, new i(t)
    }, f.prototype.pipe = function(t, e) {
        var n;
        return e = e || {}, void 0 === e.pipeArchiveToMore && (e.pipeArchiveToMore = !0), e.pipeArchiveToMore && t.more && t.more.writable && (n = this.createArchive(), n.pipe(t.more), this._pipedArchives.push(n)), r.prototype.pipe.apply(this, arguments)
    }, f.prototype.pause = function() {
        r.prototype.pause.apply(this, arguments), this._updater && this._updater.pause()
    }, f.prototype.resume = function() {
        r.prototype.resume.apply(this, arguments), this._updater && this._updater.resume()
    }, f.prototype._read = function() {
        var t, e = this;
        return this._updater || (this._updater = this.createUpdater()), t = this._updater.read(), t ? this.push(t) : e._updater.on("readable", function n() {
            var t = e._updater.read();
            t && (e._updater.removeListener("readable", n), e.push(t))
        })
    }, f.prototype._write = function(t, e) {
        this._writer || (this._writer = this.createWriter()), this._writer.write(t, e)
    }, f.prototype.initFromBootstrap = function(t) {
        var e = this;
        t && this.once("_initFromBootstrap", t), this._isInitingFromBootstrap || (this._isInitingFromBootstrap = !0, this._getBootstrapInit(function(t, n) {
            if (e._isInitingFromBootstrap = !1, "Not Found" === t && this._autoCreate)
                return this._createCollection(function(t) {
                    t || e.initFromBootstrap()
                }), void 0;
            if (!n)
                throw "Fatal collection connection error";
            var i = n.collectionSettings;
            e.id = i && i.collectionId, e.emit("_initFromBootstrap", t, n)
        }))
    }, f.prototype._getBootstrapInit = function(t) {
        var e, n = this;
        e = {network: this.network,siteId: this.siteId,articleId: this.articleId,environment: this.environment}, this._bootstrapClient.getContent(e, function(e, i) {
            e && c("Error requesting Bootstrap init", e, i), t.call(n, e, i)
        })
    }, f.prototype._createCollection = function(t) {
        if (this._isCreatingCollection)
            throw "Attempting to create a collection more than once.";
        this._isCreatingCollection = !0;
        var e = this;
        this._autoCreate = !1, this.once("_createCollection", t);
        var n = function(t) {
            e._isCreatingCollection = !1, t && c("Error requesting collection creation", t), e.emit("_createCollection", t)
        }, i = {network: this.network,siteId: this.siteId,articleId: this.articleId,environment: this.environment,collectionMeta: this._collectionMeta,signed: this._signed};
        this._createClient.createCollection(i, n)
    }, f
}), Livefyre.define("streamhub-sdk/collection", ["streamhub-sdk/collection/main"], function(t) {
    return t
}), Livefyre.define("streamhub-hot-collections/streams/hot-collection-to-collection", ["streamhub-sdk/collection"], function(t) {
    function e(t) {
        var e = t.initUrl, n = e.match(r);
        return n ? n[1] : void 0
    }
    function n(t) {
        var e = t.initUrl, n = e.match(o);
        return n ? n[1] : void 0
    }
    var i = function() {
    };
    i.transform = function(i) {
        var r = new t({network: e(i),siteId: i.siteId,articleId: i.articleId,id: i.id,environment: n(i)});
        return r.heatIndex = i.heat, r.title = i.title, r
    };
    var r = /([^.\/]+\.fyre\.co|livefyre\.com)\/\d+\//, o = /\/bs3\/([^\/]+)\/[^\/]+\/\d+\//;
    return i
}), Livefyre.define("streamhub-hot-collections/streams/hot-collections", ["stream/readable", "streamhub-hot-collections/clients/hot-collections-client", "streamhub-hot-collections/streams/hot-collection-to-collection", "streamhub-sdk/jquery", "inherits"], function(t, e, n, i, r) {
    var o = function(n) {
        if (n = n || {}, !n.network)
            throw "HotCollections must be constructed with opts.network";
        this._client = n.client || new e, this._network = n.network, this._siteId = n.siteId, this._tag = n.tag, this._madeRequest = !1, t.apply(this, arguments)
    };
    return r(o, t), o.prototype._read = function() {
        var t = this, e = {network: this._network,siteId: this._siteId,tag: this._tag};
        return this._madeRequest ? this.push(null) : (this._client.get(e, function(e, r) {
            if (e)
                return t.emit("error", e);
            t._madeRequest = !0;
            var o = i.map(r, n.transform);
            o.length || t.push(null), t.push.apply(t, o)
        }), void 0)
    }, o
}), Livefyre.define("json", {load: function(t) {
        throw Error("Dynamic load not allowed: " + t)
    }}), Livefyre.define("json!streamhub-hot-collections-tests/mocks/clients/hot-collections-response.json", function() {
    return {status: "ok",code: 200,data: [{updated: "2013-09-23T12:32:13",tags: ["apple", "iphone 5s", "iphone 5c", "iphone"],url: "http://techcrunch.com/2013/09/23/apples-iphone-5s-and-iphone-5c-sell-9m-units-over-opening-weekend-topping-5m-for-iphone-5-last-year/",title: "Apples iPhone 5s And iPhone 5c Sell 9M Units Over Opening Weekend, Topping 5M For iPhone 5 Last�Year",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyMDA5/init",heat: 6.38455811297,siteId: 311145,articleId: "882009",id: 47993636}, {updated: "2013-09-24T12:47:45",tags: ["apple", "imac"],url: "http://techcrunch.com/2013/09/24/apple-new-imacs/",title: "Apple Updates iMac With New Intel Processors, Speedy 802.11ac Wi-Fi And Faster Flash�Storage",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNzIx/init",heat: 3.85341193805,siteId: 311145,articleId: "882721",id: 48084932}, {updated: "2013-09-24T10:53:51",tags: ["android", "apple", "imessage", "techcrunch", "GitHub", "hacker news", "apple id", "ios"],url: "http://techcrunch.com/2013/09/24/malware-threat-in-unofficial-android-imessage-app-processing-data-on-chinese-servers/",title: "Security Concerns Abound Over Unofficial Android iMessage App That Uses Chinese Servers To Process�Data",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNTgw/init",heat: 1.82580333503,siteId: 311145,articleId: "882580",id: 48078130}, {updated: "2013-09-24T11:57:20",tags: ["apple", "touchscreen keyboard", "Swipe", "typing", "ios keyboard", "patents"],url: "http://techcrunch.com/2013/09/24/apple-keyboard-swipe-patent/",title: "Apple Swipe Keyboard Patent Shows Cupertino Knows Typing On iOS Is�Tedious",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNjA2/init",heat: 1.22856340748,siteId: 311145,articleId: "882606",id: 48081257}, {updated: "2013-09-24T13:53:47",tags: ["practice fusion", "Health", "HealthTech", "EMRs"],url: "http://techcrunch.com/2013/09/24/looking-beyond-medical-records-practice-fusion-lands-a-whopping-70m-to-bring-a-big-data-cure-to-the-healthcare-crisis/",title: "Practice Fusion Lands A Whopping $70M To Bring A Big Data Cure To The Healthcare�Crisis",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNDU3/init",heat: 1.03417878262,siteId: 311145,articleId: "882457",id: 48089894}, {updated: "2013-09-24T16:30:52",tags: [],url: "http://techcrunch.com/2013/09/24/send-in-your-questions-for-ask-a-vc-with-emergence-capital-partners-kevin-spain/",title: "Send In Your Questions For Ask A VC With Emergence Capital Partners Kevin Spain And Google Ventures Krishna�Yeshwant",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyMjgw/init",heat: .966083528102,siteId: 311145,articleId: "882280",id: 48103282}, {updated: "2013-09-24T16:17:16",tags: ["sold", "marketplace", "e-commerce", "Selling", "shopping"],url: "http://techcrunch.com/2013/09/24/sold-the-app-that-sells-your-stuff-for-you-arrives-on-android/",title: "Sold, The App That Sells Your Stuff For You, Arrives On�Android",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyODcw/init",heat: .886061245719,siteId: 311145,articleId: "882870",id: 48101931}, {updated: "2013-09-24T15:00:28",tags: ["Discovr", "music discovery", "Apps", "recommendations", "ios 7"],url: "http://techcrunch.com/2013/09/24/discovr-delivers-total-ios-7-overhaul-for-its-music-disovery-app-with-streaming-and-social-features/",title: "Discovr Delivers Total iOS 7 Overhaul For Its Music Discovery App With Streaming And Social�Features",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNzg2/init",heat: .861337617303,siteId: 311145,articleId: "882786",id: 48095527}, {updated: "2013-09-24T12:27:15",tags: ["app-store", "ranking", "readdle", "top charts"],url: "http://techcrunch.com/2013/09/24/download-rate-for-top-ios-7-apps/",title: "Developer Finds It Takes Just Under 4K Downloads To Break Top 10 Paid iOS Apps, Over 7K To Rank Fifth And�Up",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNjM3/init",heat: .599095689165,siteId: 311145,articleId: "882637",id: 48082877}, {updated: "2013-09-24T13:34:38",tags: ["apple", "iphone 5s", "iphone 5", "bom"],url: "http://techcrunch.com/2013/09/24/apples-iphone-5c-build-costs-start-at-173-entry-level-5s-at-199-according-to-research-firm-ihs/",title: "Apples iPhone 5c Build Costs Start At $173, Entry-Level 5s At $199, According To Research Firm�IHS",initUrl: "/bs3/techcrunch.fyre.co/311145/ODgyNzYz/init",heat: .267490441289,siteId: 311145,articleId: "882763",id: 48088256}]}
}), Livefyre.define("streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client", ["inherits", "streamhub-hot-collections/clients/hot-collections-client", "json!streamhub-hot-collections-tests/mocks/clients/hot-collections-response.json"], function(t, e, n) {
    var i = function() {
        e.apply(this, arguments)
    };
    return t(i, e), i.prototype._get = function(t, e, i) {
        i(null, n)
    }, i.mockResponse = n, i
}), Livefyre.define("streamhub-sdk-tests/mocks/mock-stream", ["streamhub-sdk/jquery", "stream/readable", "streamhub-sdk/content", "streamhub-sdk/content/types/livefyre-content", "inherits"], function(t, e, n, i, r) {
    function o(t) {
        a.call(this, t)
    }
    var a = function(t) {
        e.call(this), t = t || {}, this.mocks = t.mocks || this.mocks, this.interval = t.interval || 1e3, this.timeout = null, this.writeLatency = t.writeLatency || 0
    };
    r(a, e), a.prototype.mocks = [new n("Bar"), new n("Foo")], a.prototype._read = function() {
        var e = this, n = t.extend({}, this.mocks[Math.floor(Math.random() * this.mocks.length)]);
        n.id = (new Date).getTime(), setTimeout(function() {
            e.push(n)
        }, e.interval)
    }, a.LivefyreContent = o;
    var s = {};
    return s.livefyreBootstrapContent = {source: 1,content: {replaces: "",parentId: "",bodyHtml: "oh hi there",id: "tweet-308584114829795328@twitter.com",authorId: "890999516@twitter.com",updatedAt: 1362407161,annotations: {},createdAt: 1362407161},vis: 1,type: 0,event: 0x4d71a22e34f73,childContent: [],author: {displayName: "sara",tags: [],profileUrl: "https://twitter.com/#!/135sara",avatar: "http://a0.twimg.com/profile_images/1349672055/Baqueira_29-01-2010_13-54-52_normal.jpg",type: 3,id: "123568642@twitter.com"}}, s.livefyreStreamContent = {vis: 1,content: {replaces: "",feedEntry: {transformer: "lfcore.v2.procurement.feed.transformer.instagram",feedType: 2,description: '#gayrights #lgbt #equality #marriageequality <img src="http://distilleryimage2.instagram.com/18ea2500970c11e294f522000a9f30b8_7.jpg" />',pubDate: 1364409052,channelId: "http://instagram.com/tags/marriageequality/feed/recent.rss",link: "http://distilleryimage2.instagram.com/18ea2500970c11e294f522000a9f30b8_7.jpg",id: "bffcb85a-2976-4396-bb60-3cf5b1e2c3a8",createdAt: 1364409052},bodyHtml: "#gayrights #lgbt #equality #marriageequality ",annotations: {},authorId: "7759cd005d95d8cc5bd93718b2ac0064@instagram.com",parentId: "",updatedAt: 1364409052,id: "bffcb85a-2976-4396-bb60-3cf5b1e2c3a8",createdAt: 1364409052},source: 13,lastVis: 0,type: 0,event: 0x4d8ec3ce98cb4,author: {displayName: "sara",tags: [],profileUrl: "https://twitter.com/#!/135sara",avatar: "http://a0.twimg.com/profile_images/1349672055/Baqueira_29-01-2010_13-54-52_normal.jpg",type: 3,id: "123568642@twitter.com"}}, o.prototype = new a, o.prototype.mocks = [new i(s.livefyreBootstrapContent), new i(s.livefyreStreamContent)], a
}), Livefyre.define("streamhub-hot-collections-tests/mocks/streams/mock-hot-collections", ["inherits", "streamhub-hot-collections/streams/hot-collections", "streamhub-hot-collections-tests/mocks/clients/mock-hot-collections-client", "streamhub-sdk-tests/mocks/mock-stream"], function(t, e, n, i) {
    var r = function(t) {
        t = t || {}, t.client = t.client || new n, e.call(this, t)
    };
    return t(r, e), r.prototype.push = function(t) {
        if (null !== t)
            for (var n = Array.prototype.slice.call(arguments), r = 0; r < n.length; r++)
                n[r].createUpdater = function() {
                    return new i.LivefyreContent
                };
        e.prototype.push.apply(this, arguments)
    }, r
});
