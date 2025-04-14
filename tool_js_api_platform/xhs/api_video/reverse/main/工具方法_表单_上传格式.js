const {Worker} = require('worker_threads');

// import {ai as a} from './app-41dbee2d.js'
let a = globalThis

class U {
    value
    next

    constructor(E) {
        this.value = E
    }
}

class k {
    #A
    #B
    #Q

    constructor() {
        this.clear()
    }

    enqueue(E) {
        const g = new U(E)
        this.#A ? ((this.#B.next = g), (this.#B = g)) : ((this.#A = g), (this.#B = g)), this.#Q++
    }

    dequeue() {
        const E = this.#A
        if (E) return (this.#A = this.#A.next), this.#Q--, E.value
    }

    peek() {
        if (this.#A) return this.#A.value
    }

    clear() {
        ;(this.#A = void 0), (this.#B = void 0), (this.#Q = 0)
    }

    get size() {
        return this.#Q
    }

    * [Symbol.iterator]() {
        let E = this.#A
        for (; E;) yield E.value, (E = E.next)
    }
}

const N = {
    bind(o, E, g) {
        return o.bind(g)
    },
}

function Y(o) {
    if (!((Number.isInteger(o) || o === Number.POSITIVE_INFINITY) && o > 0)) throw new TypeError('Expected `concurrency` to be a number from 1 and up')
    const E = new k()
    let g = 0
    const I = () => {
        g--, E.size > 0 && E.dequeue()()
    }, A = async (C, G, D) => {
        g++
        const F = (async () => C(...D))()
        G(F)
        try {
            await F
        } catch {
        }
        I()
    }, B = (C, G, D) => {
        E.enqueue(N.bind(A.bind(void 0, C, G, D))), (async () => (await Promise.resolve(), g < o && E.size > 0 && E.dequeue()()))()
    }, Q = (C, ...G) => new Promise((D) => {
        B(C, D, G)
    })
    return (Object.defineProperties(Q, {
        activeCount: {get: () => g}, pendingCount: {get: () => E.size}, clearQueue: {
            value() {
                E.clear()
            },
        },
    }), Q)
}

function H(o) {
    return new Promise((E, g) => {
        const I = document.createElement('video');
        (I.src = URL.createObjectURL(o)), (I.preload = 'auto'), (I.crossOrigin = 'Anonymous'), I.addEventListener('error', (A) => {
            console.error(A), g(A)
        }), I.addEventListener('loadedmetadata', () => {
            const A = {video: I, width: I.videoWidth, height: I.videoHeight, duration: I.duration}
            E(A)
        })
    })
}

function J(o, E = 0) {
    return new Promise(async (g, I) => {
        H(o)
            .then((A) => {
                const {video: B, width: Q, height: C} = A
                B.currentTime = E
                const G = document.createElement('canvas'), D = G.getContext('2d')
                B.addEventListener('canplay', () => {
                    ;(G.width = Q), (G.height = C), D.drawImage(B, 0, 0, Q, C)
                    const F = G.toDataURL('image/jpg')
                    G.toBlob((w) => {
                        g({blob: w, imgUrl: F, canvas: G, width: Q, height: C})
                    }, 'image/jpeg')
                })
            })
            .catch((A) => {
                console.error(A), I(A)
            })
    })
}

function s(o, E = 0) {
    return new Promise(async (g) => {
        const {video: I, width: A, height: B} = o
        I.currentTime = E
        const Q = document.createElement('canvas'), C = Q.getContext('2d')
        I.addEventListener('canplay', () => {
            ;(Q.width = A), (Q.height = B), C.drawImage(I, 0, 0, A, B)
            const G = Q.toDataURL('image/jpg')
            Q.toBlob((D) => {
                g({blob: D, imgUrl: G, canvas: Q, width: A, height: B})
            }, 'image/jpeg')
        })
    })
}

var i = {exports: {}};
(function (o, E) {
    ;(function (g, I) {
        o.exports = I()
    })(a, function () {
        return (function (g) {
            var I = {}

            function A(B) {
                if (I[B]) return I[B].exports
                var Q = (I[B] = {i: B, l: !1, exports: {}})
                return g[B].call(Q.exports, Q, Q.exports, A), (Q.l = !0), Q.exports
            }

            return ((A.m = g), (A.c = I), (A.d = function (B, Q, C) {
                A.o(B, Q) || Object.defineProperty(B, Q, {enumerable: !0, get: C})
            }), (A.r = function (B) {
                typeof Symbol < 'u' && Symbol.toStringTag && Object.defineProperty(B, Symbol.toStringTag, {value: 'Module'}), Object.defineProperty(B, '__esModule', {value: !0})
            }), (A.t = function (B, Q) {
                if ((1 & Q && (B = A(B)), 8 & Q || (4 & Q && typeof B == 'object' && B && B.__esModule))) return B
                var C = Object.create(null)
                if ((A.r(C), Object.defineProperty(C, 'default', {enumerable: !0, value: B}), 2 & Q && typeof B != 'string')) for (var G in B) A.d(C, G, function (D) {
                    return B[D]
                }.bind(null, G))
                return C
            }), (A.n = function (B) {
                var Q = B && B.__esModule ? function () {
                    return B.default
                } : function () {
                    return B
                }
                return A.d(Q, 'a', Q), Q
            }), (A.o = function (B, Q) {
                return Object.prototype.hasOwnProperty.call(B, Q)
            }), (A.p = '/'), A((A.s = 1)))
        })([function (g, I, A) {
            var B = A(2), Q = ['getInfo']
            g.exports = function () {
                // var C = new Worker('C:\\Users\\Administrator\\Desktop\\小豆芽444\\新榜小豆芽_2.1.13\\$PLUGINSDIR\\app-64\\resources\\rpc_小红书_视频\\ggg.js',
                var C = 1
                return B(1, Q), 1
            }
        }, function (g, I, A) {
            A.r(I), A.d(I, 'getInfo', function () {
                return C
            })
            var B = A(0)
            let Q = A.n(B)()()

            // debugger

            function C(G) {
                return Q.getInfo(G)
            }
        }, function (g, I) {
            g.exports = function (A, B) {
                var Q = 0, C = {}
                // A.addEventListener('message', function (G) {
                //     var D = G.data
                //     if (D.type === 'RPC') if (D.id) {
                //         var F = C[D.id]
                //         F && (delete C[D.id], D.error ? F[1](Object.assign(Error(D.error.message), D.error)) : F[0](D.result))
                //     } else {
                //         var w = document.createEvent('Event')
                //         w.initEvent(D.method, !1, !1), (w.data = D.params), A.dispatchEvent(w)
                //     }
                // }), B.forEach(function (G) {
                //     A[G] = function () {
                //         var D = arguments
                //         return new Promise(function (F, w) {
                //             var R = ++Q;
                //             (C[R] = [F, w]), A.postMessage({type: 'RPC', id: R, method: G, params: [].slice.call(D)})
                //         })
                //     }
                // })
            }
        },])
    })
})(i)
var y = i.exports

async function h(o) {
    const {media: E} = await y.getInfo(o)
    return console.log('🚀 ~ mediainfo ~ media:', E), E.track
}

async function c(o) {
    const g = (await h(o)).find((I) => I['@type'] === 'Image')
    if (!g) throw new Error('封面宽高读取错误')
    return {width: g.Width, height: g.Height, format: 'image/' + g.Format.toLowerCase()}
}

async function L(o) {
    const E = await h(o), g = E.find((A) => A['@type'] === 'Video'), I = E.find((A) => A['@type'] === 'Audio')
    if (!g) throw new Error('视频信息读取错误')
    return {video: g, audio: I}
}


// ---------------------------------------------------
Gn = {
    title: '',
    note_id: '',
    desc: '',
    source: '{"type":"web","ids":"","extraInfo":"{\\"subType\\":\\"\\",\\"systemId\\":\\"web\\"}"}',
    business_binds: '{"version":1,"noteId":0,"bizType":0,"noteOrderBind":{},"notePostTiming":{"postTime":""},"noteCollectionBind":{"id":""}}',
    ats: [],
    hash_tag: [],
    post_loc: {},
    privacy_info: {op_type: 1, type: 1}
}


let _ =require("lodash")
Vn=_.cloneDeep
Zn = {
    common: null, image_info: null, video_info: {
        backup_covers: [],
        file_id: '',
        format_width: 1906,
        format_height: 738,
        composite_metadata: {video: {bitrate: 2116004, duration: 4633, format: 'AVC', frame_rate: 30, height: 738, rotation: 0, width: 1906}, audio: {bitrate: null, channels: 2, duration: 4650, format: 'AAC', sampling_rate: 48e3}},
        timelines: [],
        cover: {file_id: '', height: 738, width: 1906, frame: {ts: 0, is_user_select: !1, is_upload: !0}},
        chapters: [],
        chapter_sync_text: !1,
        segments: {
            count: 1, need_slice: !1, items: [{
                mute: 0,
                speed: 1,
                start: 0,
                duration: 4.633,
                transcoded: 0,
                media_source: 1,
                original_metadata: {video: {bitrate: 2116004, duration: 4633, format: 'AVC', frame_rate: 30, height: 738, rotation: 0, width: 1906}, audio: {bitrate: null, channels: 2, duration: 4650, format: 'AAC', sampling_rate: 48e3}}
            }]
        },
        entrance: 'web'
    }
}, Sr = (r, s, c) => {
    const a = Vn(Zn), {fileId: p, cover: m} = s, {video: d, audio: l} = c, C = {
        video: {
            bitrate: Number(d.BitRate),
            duration: Number(d.Duration) * 1e3,
            format: d.Format,
            frame_rate: Number(d.FrameRate),
            height: Number(d.Height),
            rotation: Number(d.Rotation),
            width: Number(d.Width),
            colour_primaries: d.colour_primaries,
            matrix_coefficients: d.matrix_coefficients,
            transfer_characteristics: d.transfer_characteristics
        }, audio: l ? {bitrate: Number(l.BitRate), channels: Number(l.Channels), duration: Number(l.Duration) * 1e3, format: l.Format, sampling_rate: Number(l.SamplingRate)} : null
    }
    return (a.video_info.composite_metadata = C), (a.video_info.format_width = Number(d.Width)), (a.video_info.format_height = Number(d.Height)), (a.video_info.video_preview_type = d.Width < d.Height ? 'full_vertical_screen' : ''), (a.video_info.segments.items = [{
        mute: 0, speed: 1, start: 0, duration: Number(d.Duration), transcoded: 0, media_source: 1, original_metadata: C
    }]), (a.video_info.file_id = p), (a.video_info.fileid = p), (a.video_info.cover.file_id = m.coverIds), (a.video_info.cover.fileid = m.coverIds), (a.video_info.cover.width = m.width), (a.video_info.cover.height = m.height), (a.common = {type: 'video', ...Kn(r)}), a
}
Kn = (r) => {
    const s = {}
    for (let h in r) s[h] = r[h].value
    const {description: c = '', friends: a, position: p, publishTime: m, title: d, topic: l, visible: C} = s, v = {...Gn}
    if (((v.privacy_info.type = C ?? 0), m)) {
        const h = JSON.parse(v.business_binds);
        (h.bizType = 13), (h.notePostTiming.postTime = String(Mn(m).valueOf())), (v.business_binds = JSON.stringify(h))
    }
    d && (v.title = d.trim())

    function J(h, b, N) {
        let y = b?.reduce((g, I) => {
            const S = JSON.parse(I)
            return S.name ? `${g ? g + ' ' : ''}#${S.name}[话题]#` : g
        }, '')
        const O = N?.reduce((g, I) => {
            const S = JSON.parse(I)
            return S.user_nickname ? `${g ? g + ' ' : ''}@${S.user_nickname}` : g
        }, '')
        return `${h}${y ? `
` + y : ''}${O ? `
` + O : ''}`
    }

    if (((v.desc = J(c, l, a)?.trim()), a && a.length)) {
        const h = a.map((b) => {
            const {user_nickname: N, user_id: y} = JSON.parse(b)
            return {nickname: N, user_id: y, name: N}
        })
        v.ats = h
    }
    if (l && l.length) {
        const h = l.map((b) => {
            const {id: N, name: y, link: O} = JSON.parse(b)
            return {id: N, name: y, link: O, type: 'topic'}
        })
        v.hash_tag = h
    }
    if (p) {
        const h = JSON.parse(p), {poiOid: b, originSource: N, source: y, name: O, subname: g} = h || {}
        v.post_loc = {poi_id: b, poi_type: y, subname: g, name: O}
    }
    return v
}
;globalThis.工具方法_表单_上传格式 = Sr;


module.exports = 工具方法_表单_上传格式

// ;globalThis.我的LLL = L;
// console.log(`我的LLL      : `, 我的LLL)
// console.log(`我的Hr222      : `, 我的Hr222)
// export {J as a, H as b, c, s as d, L as g, Y as p}
