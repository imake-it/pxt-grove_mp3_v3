//% color="#000099" weight=105 icon="\uf144"
namespace mp3_V3 {

    //% block
    //% volume.min=0 volume.max=31
    /**    export function setVolume(volume: number){
        bufr.setNumber(NumberFormat.Int8LE, 0, 0x7e); //Start Code
        bufr.setNumber(NumberFormat.Int8LE, 1, 0x04); //Length
        bufr.setNumber(NumberFormat.Int8LE, 2, 0xAE); //Command
        bufr.setNumber(NumberFormat.Int8LE, 3, 0x1F); //Volume Value
        bufr.setNumber(NumberFormat.Int8LE, 4, 0x00); //Check-Code (Low Bite of: Lenght + Command + Data (Volume Value))
        bufr.setNumber(NumberFormat.Int8LE, 5, 0xEF); //End Code
    }
    */

    function zeroAdding(trackNumber: number): string {
        let s = trackNumber+"";
        while (s.length < 4) {
            s = "0" + s;
        }
        return s;
    }

    //% block
    export function playSong(trackNumber: number){

        let splitString = zeroAdding(trackNumber).split("");
        // +48 because The Ascii 0 is 48 in Dec which will be convertet to Hex autoatically when writing to buffer
        let digit00 = parseInt(splitString[0]) + 48;
        let digit01 = parseInt(splitString[1]) + 48;
        let digit02 = parseInt(splitString[2]) + 48;
        let digit03 = parseInt(splitString[3]) + 48;

        // Convert digits to string to write them into the array
        let sDigit00 = digit00.toString();
        let sDigit01 = digit01.toString();
        let sDigit02 = digit02.toString();
        let sDigit03 = digit03.toString();
        
        let hexArray: string[] = ["0x07","0xA3", sDigit00, sDigit01, sDigit02, sDigit03];
        writeBuffer(hexArray);

    }

    //% block
    export function pauseSong(){
        let hexArray: string[] = ["0x03","0xAA"];
        writeBuffer(hexArray);
    }

     //% block
    export function stopSong(){
        let hexArray: string[] = ["0x03","0xAB"];
        writeBuffer(hexArray);
    }

     //% block
    export function nextSong(){
        let hexArray: string[] = ["0x03","0xAC"];
        writeBuffer(hexArray);
    }

     //% block
    export function previousSong(){
        let hexArray: string[] = ["0x03","0xAD"];
        writeBuffer(hexArray);
    }

    //% block
    export function playMode(mode: number){
        if (mode > 3 || mode < 0){
            mode = 0;
        }

        let sMode = mode.toString(); 

        let hexArray: string[] = ["0x04","0xAF", sMode];
        writeBuffer(hexArray);
    }

    function writeBuffer(hexArray: string[]){
        let bufferLength: number = hexArray.length + 3 // 3 (Start Code, Check Code, End Code)
        bufr = pins.createBuffer(bufferLength);

        let checkCode: number = 0; // Is calculatet in the for loop (Lenght + Command + Data)
             
        for (let i = 0; i < hexArray.length; i ++){
            let hexNumber = parseInt(hexArray[i]);
            bufr.setNumber(NumberFormat.Int8LE, i+1, hexNumber);
            checkCode += hexNumber;
        }

        bufr.setNumber(NumberFormat.Int8LE, 0, 0x7e); //Start Code
        bufr.setNumber(NumberFormat.Int8LE, bufferLength - 2, checkCode);
        bufr.setNumber(NumberFormat.Int8LE, bufferLength -1 , 0xef); //End Code
        serial.writeBuffer(bufr);
        control.waitMicros(200000);
    }

    let bufr
    
    // MP3 Module set to Pin 0
    serial.redirect(
    SerialPin.P14,
    SerialPin.P0,
    BaudRate.BaudRate9600
    );

    //initializeSDCard();
    /**
    function initializeSDCard(){
        bufr.setNumber(NumberFormat.Int8LE, 0, 0x7e);
        bufr.setNumber(NumberFormat.Int8LE, 1, 0x04);
        bufr.setNumber(NumberFormat.Int8LE, 2, 0xd2);
        bufr.setNumber(NumberFormat.Int8LE, 3, 0x01);
        bufr.setNumber(NumberFormat.Int8LE, 4, 0xd7);
        bufr.setNumber(NumberFormat.Int8LE, 5, 0xef);
        
        serial.writeBuffer(bufr);
        control.waitMicros(200000);
    }
*/
}