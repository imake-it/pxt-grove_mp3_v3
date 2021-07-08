enum Dir{
    KLAVIER,
    BLECHBLASINSTRUMENT,
    SCHLAGZEUG,
    MUSIK,
    GITARRE,
}

//% color="#000099" weight=105 icon="\uf144"
namespace mp3_V3 {
    let dirName: string;

    //% block
    //% volume.min=0 volume.max=31
    export function setVolume(volume: number){
        let stringVol: string = volume.toString();
        let hexArray: string[] = ["0x04","0xAE", stringVol];
        writeBuffer(hexArray);
    }

    function zeroAdding(trackNumber: number): string {
        let s = trackNumber+"";
        while (s.length < 4) {
            s = "0" + s;
        }
        return s;
    }

    /**Play Song in Root-Directory */
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

    /**Play Song in specific Folder */
    //% block
    export function playFolderSong(trackNumber: number){

       /*  let splitFolderName = dirName.split("");
        let char00 = splitFolderName[0];
        let char01 = splitFolderName[1];
        let char02 = splitFolderName[2];
        let char03 = splitFolderName[3];
        let char04 = splitFolderName[4]; */

        //Song-Number
        let splitString = zeroAdding(trackNumber).split("");
        let sDigit01 = splitString[0] + splitString[1]
        let sDigit02 = splitString[2] + splitString[3]

        //Folder-Name
        // Convert folder name into ASCII
        let asciiArray: number[] = asciiConverter();
        
        /**Hardcoded ASCII-VAlues for Forlder "PIANO" and Index 5 (5th Song copied to SD-Card) */
        let hexArray :string[] = ["0x0A","0xA4", asciiArray[0].toString(), asciiArray[1].toString(), asciiArray[2].toString(), asciiArray[3].toString(), asciiArray[4].toString(), sDigit01, sDigit02];
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

        //DELETE
       /*  let test = bufr.getNumber(NumberFormat.Int8LE, 2)
        basic.showString(test.toString()) */


    }

    //% block
    export function chooseFolder(folder: Dir){

        switch(folder){
            case Dir.KLAVIER: dirName = "PIANO";
            break;
            case Dir.BLECHBLASINSTRUMENT: dirName = "BRASS";
            break;
            case Dir.SCHLAGZEUG: dirName = "DRUMS";
            break;
            case Dir.MUSIK: dirName = "MUSIC";
            break;
            case Dir.GITARRE: dirName = "GUITR";
            break;
            
        }

       
    }

    function asciiConverter(): number[]{
        let alphabetNumbers :number[] = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
        let alphabetChars :string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        //dirName = Global-Variable
        let dirNameArray = dirName.split("");
        let dirNumberArray: number[] = [];

        for (let i = 0; i < dirNameArray.length; i ++){
           for (let j = 0; j < alphabetChars.length; j ++){
               if (dirNameArray[i] == alphabetChars[j]){
                   dirNumberArray.push(alphabetNumbers[j]);
               }              
            } 
        }
        return dirNumberArray;
    }





    //QUERY Funktionen 

    //% block
    export function querySongname(){
    
        let hexArray: string[] = ["0x03","0xCB"];
        writeBuffer(hexArray);
        
        let songName = serial.readBuffer(32);
        
    }

    //% block
    export function queryNumberOfTracks(){

        let hexArray: string[] = ["0x03","0xC5"];
        writeBuffer(hexArray);

        let numberOfTracks = serial.readLine();

        let numTr = numberOfTracks();

        basic.showString(numTr);        
    }

    
    /**
    * This is the quick-help
    */
    //% block="Test Query"
    export function queryNumberOfTracksTest(){

    let hexArray: string[] = ["0x03","0xC5"];
    bufr = pins.createBuffer(5)

    bufr.setNumber(NumberFormat.Int8LE, 0, 0x7e); //Start Code
    bufr.setNumber(NumberFormat.Int8LE, 1, 0x03);
    bufr.setNumber(NumberFormat.Int8LE, 2, 0xc5); //End Code
    bufr.setNumber(NumberFormat.Int8LE, 3, 0xc8);
    bufr.setNumber(NumberFormat.Int8LE, 4, 0xef);
    serial.writeBuffer(bufr);
    control.waitMicros(200000);
    let readBuf = bufr.getNumber(NumberFormat.Int8LE, 2)
  
   
   /*  return readBuf.toString() */
    }

    let bufr;
    
    // MP3 Module set to Pin 0
    /* serial.redirect(
    SerialPin.P14, //TX (Transmitt)
    SerialPin.P0,  //RX (Receive)
    BaudRate.BaudRate9600
    ); */

}
