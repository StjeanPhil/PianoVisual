let currentScale='major'
let currentKey='';
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

const safesetKeys=()=>{
    showKeys(currentScale,currentKey)
}
const showKeys=(s,key)=>{
    refreshKeys()
    let scale=scales[s]

    let idx=pitch.indexOf(key)

    for(var i=0;i<7;i++){
        idx+=scale[i]
        console.log(idx)
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
}
//Start the page
const init=()=>{
    setKeys(pitch)
    console.log("done init") 
}


//Main
init()
