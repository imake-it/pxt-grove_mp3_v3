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

    //% block
    export function playSong(trackNumber: number){
        let hexArray: string[] = ["0x05","0xA2","0x00","0x01"];
        writeBuffer(hexArray);
        /* 
        bufr.setNumber(NumberFormat.Int8LE, 0, 0x7e); //Start Code
        bufr.setNumber(NumberFormat.Int8LE, 1, 0x05); //Length
        bufr.setNumber(NumberFormat.Int8LE, 2, 0xA2); //Command
        bufr.setNumber(NumberFormat.Int8LE, 3, 0x00); //High Order
        bufr.setNumber(NumberFormat.Int8LE, 4, 0x01); //Low Order
        bufr.setNumber(NumberFormat.Int8LE, 5, 0xA8); //Check-Code (Low Bite of: Lenght + Command + Data (Volume Value))
        bufr.setNumber(NumberFormat.Int8LE, 6, 0xEF); //End Code
         
        
        serial.writeBuffer(bufr);
        control.waitMicros(200000);
        */
    }

    function writeBuffer(hexArray: string[]){
        let bufferLength: number = hexArray.length + 3 // 3 (Start Code, Check Code, End Code)
        let bufr = pins.createBuffer(bufferLength);

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

    

    let bufr = pins.createBuffer(1);
    
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