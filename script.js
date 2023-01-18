let currentScale='major'
let currentKey='a';
let current,currentlyShowing;

let pitch=['c','csharp','d','dsharp','e','f','fsharp','g','gsharp','a','asharp','b']
 
const scales={
    "major":[2,2,1,2,2,2,1],
    'minor':[2,1,2,2,1,2,2]
}

//Start the page
const init=()=>{
    //Add Onclick to the keys
    for(var idx in pitch){
        let key=pitch[idx]
        toAdd=document.getElementsByClassName(key)
        for(var i=0; i<toAdd.length;i++){
            toAdd[i].onclick=()=>{selectKey(key)}
        }
    }
    //Add onClick for the +/- pitch
    document.getElementById("plusPitch").onclick=()=>{
        let idx=pitch.indexOf(currentKey)
        selectKey(pitch[(idx+1)%12])
    }
    document.getElementById("minusPitch").onclick=()=>{
        let idx=pitch.indexOf(currentKey)
        if (idx==0){idx=12}
        selectKey(pitch[(idx-1)%12])
    }
    //Add the reset function ability
    document.getElementById("reset").onclick=refreshKeys
}

//Change current key for prop Key
let selectKey=(key)=>{
    currentKey=key
    //Change the UI
    document.getElementById("currentPitch").innerHTML=key.toUpperCase()
    //Make changes to piano
    showKeys(currentScale,currentKey)

}
//Change current scale for prop scale
let selectScale=(scale)=>{
    currentScale=scale
    //Remove currently active scale button from UI
    prev=document.getElementsByClassName("active")
    prev[0].classList.remove("active")
    //Active the clicked scale button from UI
    curr=document.getElementsByClassName(scale)
    curr[0].classList.add("active")
    //Make changes to piano
    showKeys(currentScale,currentKey)
}

// flash the notes from the chord with the right number from the roman numeral notations
const showChord=(n)=>{
    //Reset the piano
    refreshChord()
    //Active the right chord btn
    showActiveChordBtn(n)
    //
    nb=n
    let idx = pitch.indexOf(currentKey)
    let max=idx+12
    // Add Piano keys to the chords, keys need to be space 1 note apart and be in the same scale, 
    for(var x=0;x<24;x++){
        elems=document.getElementsByClassName(pitch[(x+idx)%12])
        //Verify the current note is in scale
        if (elems[0].classList.contains("inScale")){
            nb-=1
            //Spaced out correctly
            if (nb==0 || nb==-2 ||nb==-4){
                elems[(x+idx>=12?1:0)].classList.add("inChord")
            }
        }
    }  
    
}

const showActiveChordBtn=(n)=>{
    var elems=document.getElementsByClassName("activeChord")
    if (elems.length>0 ){elems[0].classList.remove("activeChord")}
    switch(n){
        case 1:
            document.getElementById("i").classList.add("activeChord")
            break
        case 2:
            document.getElementById("ii").classList.add("activeChord")
            break
        case 3:
            document.getElementById("iii").classList.add("activeChord")
            break
        case 4:
            document.getElementById("iv").classList.add("activeChord")
            break
        case 5:
            document.getElementById("v").classList.add("activeChord")
            break
        case 6:
            document.getElementById("vi").classList.add("activeChord")
            break
        case 7:
            document.getElementById("vii").classList.add("activeChord")
            break
    }
}
const showKeys=(s,key)=>{
    refreshKeys()
    let scale=scales[s]

    let idx=pitch.indexOf(key)

    for(var i=0;i<7;i++){
        idx+=scale[i]
        var toChange= document.getElementsByClassName(pitch[idx%12])
        for (var j=0;j<toChange.length;j++){
            toChange[j].classList.add("inScale")
        }
    }
}
//Remove all the "inscale" statuses
const refreshKeys=()=>{
    var k=document.getElementsByClassName("key")
    for (var i =0; i<k.length;i++){
        if (k[i].classList.contains("inScale")){
            k[i].classList.remove("inScale")
        }
    }
    refreshChord()
}
const refreshChord=()=>{
    var k=document.getElementsByClassName("key")
    for (var i =0; i<k.length;i++){
        if (k[i].classList.contains("inChord")){
            k[i].classList.remove("inChord")
        }
    }
    var elems=document.getElementsByClassName("activeChord")
    if (elems.length>0 ){elems[0].classList.remove("activeChord")}
}



//Main
init()
