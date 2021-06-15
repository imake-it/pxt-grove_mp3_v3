input.onGesture(Gesture.LogoUp, function () {
    mode += 1
    if (mode < 0 || mode > 3) {
        mode = 0
    }
    mp3_V3.playMode(mode)
    basic.showString("" + (mode))
})
input.onButtonPressed(Button.A, function () {
    songNr += -1
    mp3_V3.previousSong()
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
})
let mode = 0
let songNr = 1
mp3_V3.chooseFolder(Dir.MUSIK)

basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        mp3_V3.playFolderSong(5)
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        mp3_V3.playSong(10)
    }
})
