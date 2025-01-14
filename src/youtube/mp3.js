import ytdl from 'ytdl-core';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

import { cookie } from './index.js';
import { getRandom } from "../core.js"

ffmpeg.setFfmpegPath(ffmpegPath)


export async function mp3(data) {
    if (!data?.url) return;
    let itag = data?.itag || 'highestaudio'
    try {
        let videoinfo = await ytdl.getInfo(data?.url)
        let nomearquivo = 'audio_' + getRandom('.mp3')
        let audio = ytdl.downloadFromInfo(videoinfo, { quality: itag, requestOptions: { headers: { cookie: cookie } } })

        let result = await new Promise((res, rej) => {
            ffmpeg(audio)
                .audioCodec('libmp3lame')
                .save(`./publico/${nomearquivo}`)
                .on('end', () => {
                    res(`${nomearquivo}`)
                })
                .on('error', function (err) {
                    console.log('ffmpeg mp3 erro:', err)
                    res()
                });
        })
        return result

    } catch (e) {
        console.log('erro ', e)
    }
}