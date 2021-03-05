input.onButtonPressed(Button.A, function () {
    songNr += -1
    mp3_V3.previousSong()
    mp3_V3.querySongname()
})
input.onGesture(Gesture.LogoUp, function () {
    mode += 1
    if (mode < 0 || mode > 3) {
        mode = 0
    }
    mp3_V3.playMode(mode)
    basic.showString("" + (mode))
})
input.onButtonPressed(Button.AB, function () {
    mp3_V3.pauseSong()
    basic.showLeds(`
        . # . # .
        . # . # .
        . # . # .
        . # . # .
        . # . # .
        `)
})
input.onButtonPressed(Button.B, function () {
    songNr += 1
    mp3_V3.nextSong()
    mp3_V3.querySongname()
})
input.onGesture(Gesture.Shake, function () {
    mp3_V3.stopSong()
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
})
let mode = 0
let songNr = 1
mp3_V3.queryNumberOfTracks()
