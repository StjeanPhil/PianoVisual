let currentScale='major'
let currentKey='a';
let current,currentlyShowing;

let pitch=['c','csharp','d','dsharp','e','f','fsharp','g','gsharp','a','asharp','b']
 
const scales={
    "major":[2,2,1,2,2,2,1],
    'minor':[2,1,2,2,1,2,2]
}

let setKeys=(p)=>{
    for(var idx in p){
        let key=p[idx]
        toAdd=document.getElementsByClassName(key)
        for(var i=0; i<toAdd.length;i++){
            toAdd[i].onclick=()=>{selectKey(key)}
        }
    }
    document.getElementById("plusPitch").onclick=()=>{
       let idx=pitch.indexOf(currentKey)
       currentKey=pitch[(idx+1)%12]
       document.getElementById("currentPitch").innerHTML=currentKey
    }
    document.getElementById("minusPitch").onclick=()=>{
       let idx=pitch.indexOf(currentKey)
       if (idx==0){idx=12}
       currentKey=pitch[(idx-1)%12]
       document.getElementById("currentPitch").innerHTML=currentKey
    }
    
    document.getElementById("set").onclick = ()=>{showKeys(currentScale,currentKey)}
    document.getElementById("reset").onclick=refreshKeys
}

//Selection from user
let selectKey=(key)=>{
    console.log(key)
    currentKey=key

    document.getElementById("currentPitch").innerHTML=key

}
let selectScale=(scale)=>{
    console.log(scale)
    currentScale=scale

    prev=document.getElementsByClassName("active")
    prev[0].classList.remove("active")

    curr=document.getElementsByClassName(scale)
    curr[0].classList.add("active")
}
// flash the notes from the chord with the right number from the roman numeral notations
const showChord=(n)=>{
    refreshChord()
    showActiveChordBtn(n)
    nb=n
    let idx = pitch.indexOf(currentKey)
    let max=idx+12

    for(var x=0;x<24;x++){
        elems=document.getElementsByClassName(pitch[(x+idx)%12])
        console.log(pitch[(x+idx)%12])
        console.log(elems[0].classList.contains("inScale"))
        console.log(nb)
        if (elems[0].classList.contains("inScale")){
            nb-=1
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
//Start the page
const init=()=>{
    setKeys(pitch)
    console.log("done init") 
}


//Main
init()
