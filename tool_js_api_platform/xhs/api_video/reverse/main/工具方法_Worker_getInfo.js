Sr = (r, s, c) => {
    const a = Vn(Zn),
        {fileId: p, cover: m} = s,
        {video: d, audio: l} = c,
        C = {video: {bitrate: Number(d.BitRate), duration: Number(d.Duration) * 1e3, format: d.Format, frame_rate: Number(d.FrameRate), height: Number(d.Height), rotation: Number(d.Rotation), width: Number(d.Width), colour_primaries: d.colour_primaries, matrix_coefficients: d.matrix_coefficients, transfer_characteristics: d.transfer_characteristics}, audio: l ? {bitrate: Number(l.BitRate), channels: Number(l.Channels), duration: Number(l.Duration) * 1e3, format: l.Format, sampling_rate: Number(l.SamplingRate)} : null}
    return (a.video_info.composite_metadata = C), (a.video_info.format_width = Number(d.Width)), (a.video_info.format_height = Number(d.Height)), (a.video_info.video_preview_type = d.Width < d.Height ? 'full_vertical_screen' : ''), (a.video_info.segments.items = [{mute: 0, speed: 1, start: 0, duration: Number(d.Duration), transcoded: 0, media_source: 1, original_metadata: C}]), (a.video_info.file_id = p), (a.video_info.fileid = p), (a.video_info.cover.file_id = m.coverIds), (a.video_info.cover.fileid = m.coverIds), (a.video_info.cover.width = m.width), (a.video_info.cover.height = m.height), (a.common = {type: 'video', ...Kn(r)}), a
},
    Kn = (r) => {
        const s = {}
        for (let h in r) s[h] = r[h].value
        const {description: c = '', friends: a, position: p, publishTime: m, title: d, topic: l, visible: C} = s,
            v = {...Gn}
        if (((v.privacy_info.type = C ?? 0), m)) {
            const h = JSON.parse(v.business_binds)
            ;(h.bizType = 13), (h.notePostTiming.postTime = String(Mn(m).valueOf())), (v.business_binds = JSON.stringify(h))
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
            return `${h}${
                y
                    ? `
` + y
                    : ''
            }${
                O
                    ? `
` + O
                    : ''
            }`
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
            const h = JSON.parse(p),
                {poiOid: b, originSource: N, source: y, name: O, subname: g} = h || {}
            v.post_loc = {poi_id: b, poi_type: y, subname: g, name: O}
        }
        return v
    }