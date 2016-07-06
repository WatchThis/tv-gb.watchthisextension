function content(cid) {
    return function() {
        return fetch("http://www.filmon.tv/api-v2/channel/" + cid).then(function (resp) {
            return resp.json();
        }).then(function (data) {
            var streams = data["data"]["streams"];
            var timeout = -1;
            var url = null;
            for (var ii = 0; ii < streams.length; ii++) {
                var u = streams[ii]["url"]; 
                if (!u) {
                    continue;
                }
                var t = streams[ii]["watch-timeout"];
                if (timeout < 0 || t > timeout) {
                    url = u;
                }
            }
            return url;
        });
    };
}

function channels(req) {
    var data = [
        ["BBC 1", "bbc1.png", 14],
        ["BBC 2", "bbc2.png", 25],
        ["BBC 3", "bbc3.png", 113],
        ["BBC 4", "bbc4.png", 103],
        ["Channel 4", "channel4.png", 2],
        ["ITV", "itv.png", 11],
        ["ITV2", "itv2.png", 67],
        ["ITV3", "itv3.png", 26],
        ["ITV4", "itv4.png", 101],
    ];
    var channels = [];
    for (var ii = 0; ii < data.length; ii++) {
        var item = data[ii];
        channels.push({
            title: item[0],
            country: "gb",
            image: item[1],
            background_color: "#fff",
            content_url: content(item[2]),
        });
    }
    req.reply(channels);
}
