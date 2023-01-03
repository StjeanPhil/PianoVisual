let currentScale=currentKey='';
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
}

//Selection from user
let selectKey=(key)=>{
    console.log(key)
    currentKey=key
    updateCurrent(currentScale,currentKey)
}
let selectScale=(scale)=>{
    console.log(scale)
    currentScale=scale
    updateCurrent(currentScale,currentKey)
}
//Update the model from the ui
let updateCurrent=(scale,key)=>{
    current=[scale,key]
    currentlyShowing=document.getElementById("currentScaleKey")
    currentlyShowing.innerHTML=key+scale

    if(scale!='' && key!=''){showKeys(scale,key)}

}

const showKeys=(s,key)=>{
    console.log("Showing scale: "+s + key)
    refreshKeys()
    let scale=scales[s]
    console.log(scale)
    
    let idx=pitch.indexOf(key)
    console.log(idx)

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
