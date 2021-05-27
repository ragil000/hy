BASE_URL = window.location.protocol + '//' + window.location.host + '/hy'
$('#name-alert').hide()
$('#gender-alert').hide()
function rememberMe() {
    let name =$("input[name=name]").val().trim()
    let gender =$("input[name=gender]:checked").val()

    isGo = true
    if(!name || !gender) {
        isGo = false
        if(!name) $('#name-alert').show()
        else $('#name-alert').hide()

        if(!gender){
            $('#gender-alert').show()
            $('#select-gender').attr('style', 'margin-top:0px !important; padding-top:0px !important;')
        }else {
            $('#gender-alert').hide()
            $('#select-gender').removeAttr('style')
        }
    }else {
        $('#name-alert').hide()
        $('#gender-alert').hide()
        $('#select-gender').removeAttr('style')
        isGo = true
    }

    if(isGo) {
        name = name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        })

        let cookieBaseValue = {
            'name': name,
            'gender': gender,
            'isMuslim': false
        }

        let dateNow = new Date().getTime()
        // console.log('ccc', dateNow)
        // let timeNow = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds()

        setCookie('member', JSON.stringify(cookieBaseValue), 365)
        setCookie('lastLogin', dateNow, 365)
        setCookie('countLogin', 1, 365)

        swal(`hy ${name}, sekarang aku sudah mengingatmu :)`, {
            closeOnClickOutside: false,
            button: "Makasih ya!"
        }).then(() => {
            location.reload()
        })
    }
}

function forgetMe() {
    swal('kamu beneran pengen aku lupain? :(', {
        closeOnClickOutside: false,
        buttons: ["Ngga' jadi!", "Lupain aja"],
    }).then((re) => {
        if(re) {
            eraseCookie('member')
            eraseCookie('lastLogin')
            eraseCookie('countLogin')
            eraseCookie('lastQuote')
            location.reload()
        }
    })
}

$(document).ready(() => {
    let dateNow = new Date()
    let hourNow = dateNow.getHours()
    let minuteNow = dateNow.getMinutes()
    let secondNow = dateNow.getSeconds()

    let cookieMember = getCookie('member')
    let cookieLastLogin = getCookie('lastLogin')
    let cookieCountLogin = getCookie('countLogin')
    let cookieLastQuote = getCookie('lastQuote')

    if(cookieMember) {
        setCookie('countLogin', cookieCountLogin++, 365)

        let member = JSON.parse(cookieMember)

        let lastLogin = 0
        if(cookieLastLogin) {
            lastLogin = getLastLogin(cookieLastLogin)/60
        }

        let isRecently = false
        let textHy = ''
        let textRegards = 'Selamat'
        if(lastLogin > 300 && lastLogin < 2400) {
            isRecently = true
            textHy = 'Ada apa, kan belum lama kamu mengunjungiku, kok sudah kembali lagi :)'
        }else if(lastLogin > 1 && lastLogin <= 300) {
            isRecently = true
            textHy = 'Kamu pengen baca quote dibawah ini lagi ya?'
        }

        if(hourNow >= 5 && hourNow <= 10) {
            // morning
            let setTextRegards = `Selamat pagi, ${member.name}`
            let setTextHy = 'Buruan gih mandi dan bersiap menghadapi hari ini'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })

            redirectLink('morning')
        }else if(hourNow > 10 && hourNow <= 15) {
            // noon
            let setTextRegards = `Hy ${member.name}, dah siang aja nih`
            let setTextHy = 'Kamu jangan lupa makan siang'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })

            redirectLink('morning')
        }else if(hourNow > 15 && hourNow <= 18) {
            // afternoon
            let setTextRegards = `${textRegards} Sore, ${member.name}`
            let setTextHy = 'Jangan lupa mandi sore'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })

            redirectLink('morning')
        }else if(hourNow > 18 && hourNow <= 24) {
            // night
            let setTextRegards = `${textRegards} Malam, ${member.name}`
            let setTextHy = 'Kamu jangan tidur kemaleman ya'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })
            redirectLink('night')
        }else if(hourNow > 24 && hourNow <= 3) {
            // midnight
            let setTextRegards = `Waduh, udah tengah malam nih ${member.name}`
            let setTextHy = 'Jangan begadang ya, tapi kalo ibadah boleh aja'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })

            redirectLink('night')
        }else if(hourNow > 3 && hourNow < 5) {
            // dawn
            let setTextRegards = `Udah subuh nih ${member.name}, jangan tidur lagi ya`
            let setTextHy = 'Subuh gini, sangat bagus untuk memulai aktifitas'
            if(textHy) {
                setTextHy = textHy
            }
            let setTextQuote = ''
            
            $.getJSON('../assets/js/json/quotes.json', (items) => {
                let quote = null
                if(isRecently) {
                    quote = getQuote(items, member.gender, cookieLastQuote)
                    setTextQuote = quote[1].quote
                }else {
                    quote = getQuote(items, member.gender)
                    setTextQuote = quote[1].quote
                }
                setContent(setTextRegards, setTextHy, setTextQuote)
                setCookie('lastQuote', quote[0], 365)
            })

            redirectLink('night')
        }
    }else {
        if(window.location.pathname != '/hy/'){
            window.location.replace(`${BASE_URL}`)
        }
    }
    
    let textHourNow = hourNow > 9 ? hourNow : '0'+hourNow
    let textMinuteNow = minuteNow > 9 ? minuteNow : '0'+minuteNow
    
    $('#hour').html(textHourNow)
    $('#minute').html(textMinuteNow)
    $('#second').html(secondNow)

    setTimeCount(hourNow, minuteNow, secondNow)
        
})

function getQuote(items, gender, lastQuote = null) {
    let random = Math.floor(Math.random() * items.length)
    let item = null
    if(lastQuote) {
        item = items[lastQuote]
        return [lastQuote, item]
    }else {
        item = items[random]
        if(item.gender == gender || item.gender == 'a') return [random ,item]
        else return getQuote(items, gender)
    }
}

function setContent(textRegards, textHy, textQuote) {
    $('#text-regards').html(textRegards)
    $('#text-hy').html(textHy)
    $('#text-quote').html(textQuote)
}

function getLastLogin(lastLogin) {
    let dateNow = new Date().getTime()
    // get total seconds between the times
    var delta = Math.abs(lastLogin - dateNow) / 1000;

    // // calculate (and subtract) whole days
    // var days = Math.floor(delta / 86400);
    // delta -= days * 86400;

    // // calculate (and subtract) whole hours
    // var hours = Math.floor(delta / 3600) % 24;
    // delta -= hours * 3600;

    // // calculate (and subtract) whole minutes
    // var minutes = Math.floor(delta / 60) % 60;
    // delta -= minutes * 60;

    // // what's left is seconds
    // var seconds = delta % 60;

    return delta
}

function redirectLink(path='morning') {
    if(window.location.pathname != `/hy/pages/${path}.html`) {
        // console.log('sasa', window.location.pathname)
        window.location.replace(`${BASE_URL}/pages/${path}.html`)
    }
}

function setTimeCount(hourNow, minuteNow, secondNow) {
    let secondCount = secondNow
    let minuteCount = minuteNow
    let hourCount = hourNow
    setInterval(function () {
        secondCount++
        let textSecond = ''
        let textMinute = ''
        let textHour = ''
        
        if(secondCount >= 59) {
            secondCount = 0
            minuteCount++
            
            if(minuteCount > 9) textMinute = minuteCount
            else textMinute = '0'+minuteCount
            $('#minute').html(textMinute)  
        }

        if(minuteCount >= 59) {
            minuteCount = 0
            hourCount++
            
            if(minuteCount > 9) textMinute = minuteCount
            else textMinute = '0'+minuteCount
            $('#minute').html(textMinute)

            if(hourCount >= 23) {
                hourCount = 0
            }

            if(minuteCount > 9) textHour = hourCount
            else textHour = '0'+hourCount
            $('#hour').html(textHour)  
        }

        if(secondCount > 9) textSecond = secondCount
        else textSecond = '0'+secondCount
        $('#second').html(textSecond)
    }, 1000)
}

function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, '-1');
}