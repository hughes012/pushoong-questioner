const axios = require("axios").default;
const prompts = require('prompts');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    var tos = await prompts({
        type: 'toggle',
        name: 'value',
        message: 'your responsibility',
        initial: true,
        active: 'yes',
        inactive: 'no'
    });

    if(!tos.value) { console.log("There's no pleasure without responsibility."); sleep(2000); }

    var id = await prompts([
        {
            type: 'text',
            name: 'content',
            message: 'content',
        }, {
            type: 'text',
            name: 'mail',
            message: 'contact',
        }, {
            type: 'number',
            name: 'not',
            message: 'number of times'
        }
    ]);

    console.time('send');

    await Promise.all(Array(id.not).fill(0).map(async () => {
        await axios.post(`https://pushoong.com/comment/`, `content=${id.content}&contact=${id.mail}&type=99&csrfmiddlewaretoken=FIYScpduGZO5T63d8NOKKzs4bRDKAjHvSFjktB3za76WxDujxrPMkuFI8quY5Bno`, {
            validateStatus: null,
            headers: {
                "accept": "*/*",
                "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\"Whale\";v=\"3\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "cookie_id=14a3f323ab9f05d13728; adfit_sdk_id=a1d6d4c8-837b-40dd-92f1-fa533e88a104; csrftoken=n7vCrm0fEis1OHBgzObcK5nO7J1oFsQ3; _gid=GA1.2.293917039.1673965018; hide-modal=hide; _gat_gtag_UA_162698997_1=1; _ga_6EFJFWM5BH=GS1.1.1674054127.5.1.1674061072.51.0.0; _ga=GA1.2.697124667.1673853434",
                "Referer": "https://pushoong.com/comment/",
                "Referrer-Policy": "same-origin"
            }
        }).then((res) => {
            if(res.status == 200) {
                console.log('성공');
            } else {
                console.log('실패');
            }
        });
    }));

    console.log(`\n${id.not}개 전송 완료`);
    console.timeEnd('send');
    sleep(60000);
})();