input.onButtonPressed(Button.A, function () {
    if (songNr >= 1) {
        songNr += -1
        mp3_V3.playFolderSong(songNr)
    }
})
input.onButtonPressed(Button.AB, function () {
    mp3_V3.chooseFolder(Dir.GITARRE)
    mp3_V3.playFolderSong(songNr)
})
input.onButtonPressed(Button.B, function () {
    if (songNr <= 5) {
        songNr += 1
        mp3_V3.playFolderSong(songNr)
    }
})
let songNr = 0
serial.redirect(
SerialPin.P1,
SerialPin.P0,
BaudRate.BaudRate9600
)
songNr = 1
mp3_V3.setVolume(16)
mp3_V3.chooseFolder(Dir.MUSIK)
