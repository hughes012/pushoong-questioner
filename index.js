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
            name: 'value',
            message: 'pushoong ID',
            validate: (date) => {
                const len = date.length;

                if(len == 10) {
                    return true;
                } else {
                    return 'String length is not correct'
                }
            }
        }, {
            type: 'number',
            name: 'not',
            message: 'number of times'
        }
    ]);

    console.time('send');

    await Promise.all(Array(id.not).fill(0).map(async () => {
        await axios.post(`https://pushoong.com/ask/ask_question`, `------WebKitFormBoundaryV8o7Tf6wd8oPXM0T\r\nContent-Disposition: form-data; name=\"csrfmiddlewaretoken\"\r\n\r\nPdqTocSLO609a7UYyNJeut7TsN9iZh9e2aLlFoIQiei0OEl4XrKg4okxpm0wuzP7\r\n------WebKitFormBoundaryV8o7Tf6wd8oPXM0T\r\nContent-Disposition: form-data; name=\"ask_key\"\r\n\r\n${id.value}\r\n------WebKitFormBoundaryV8o7Tf6wd8oPXM0T\r\nContent-Disposition: form-data; name=\"content\"\r\n\r\n${require('fs').readFileSync('./할말.txt')}\r\n------WebKitFormBoundaryV8o7Tf6wd8oPXM0T\r\nContent-Disposition: form-data; name=\"image\"\r\n\r\nundefined\r\n------WebKitFormBoundaryV8o7Tf6wd8oPXM0T--\r\n`, {
            validateStatus: null,
            headers: {
                "accept": "*/*",
                "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryV8o7Tf6wd8oPXM0T",
                "sec-ch-ua": "\"Whale\";v=\"3\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "cookie_id=14a3f323ab9f05d13728; adfit_sdk_id=a1d6d4c8-837b-40dd-92f1-fa533e88a104; csrftoken=n7vCrm0fEis1OHBgzObcK5nO7J1oFsQ3; _gid=GA1.2.293917039.1673965018; __cdcHVzaG9vbmctYXNrLWFkbWluLnZlcmNlbC5hcHA==1; hide-modal=hide; _ga_6EFJFWM5BH=GS1.1.1674054127.5.1.1674054256.45.0.0; _ga=GA1.2.697124667.1673853434",
                "Referer": "https://pushoong.com/ask/8783061566",
                "Referrer-Policy": "same-origin"
            }
        }).then((res) => {
            console.log(res.data);
        });
    }));

    console.log(`\n${id.not}개 전송 완료`);
    console.timeEnd('send');
    sleep(60000);
})();