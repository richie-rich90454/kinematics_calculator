function returnResult(){
    document.getElementById("return-vi").innerHTML="";
    document.getElementById("return-vf").innerHTML="";
    document.getElementById("return-a").innerHTML="";
    document.getElementById("return-t").innerHTML="";
    document.getElementById("return-x").innerHTML="";
    let userVI=document.getElementById("initial-velocity").value;
    let userVF=document.getElementById("final-velocity").value;
    let userA=document.getElementById("acceleration").value;
    let userT=document.getElementById("time").value;
    let userX=document.getElementById("displacement").value;
    if (userVI!==""&&userVF!==""&&userT!==""){
        if (userT<0||userT==0){
            document.getElementById("return-vi").innerHTML="Please check your inputs";
        }
        else{
            userA=getA(userVF, userVI, userT);
            userX=getXnA(userVF, userVI, userT);
            document.getElementById("return-a").innerHTML="The acceleration is "+parseFloat(userA).toPrecision(3)+"m/s<sup>2</sup>.";
            document.getElementById("return-x").innerHTML="The displacement is "+parseFloat(userX).toPrecision(3)+"m.";
        }
    }
    else if (userVI!==""&&userA!==""&&userT!==""){
        if (userT<0){
            document.getElementById("return-vi").innerHTML="Please check your inputs";
        }
        else{
            userVF=getVf(userVI, userA, userT);
            userX=getXnA(userVF, userVI, userT);
            document.getElementById("return-vf").innerHTML="The final velocity is "+parseFloat(userVF).toPrecision(3)+"m/s.";
            document.getElementById("return-x").innerHTML="The displacement is "+parseFloat(userX).toPrecision(3)+"m.";
        }
    }
    else if (userVI!==""&&userVF!==""&&userX!==""){
        if (userX==0&&userVF!==userVI||userX==0&&userVF==userVI||userX!==0&&userVF==userVI||userX<0&&userVF >= userVI||userX > 0&&userVF<userVI){
            document.getElementById("return-vi").innerHTML="Please check your inputs";
        }
        else{
            document.getElementById("return-vi").innerHTML="";
            userT=Math.abs(getTfX(userVF, userVI, userX)).toPrecision(3);
            userA=getA(userVF, userVI, userT).toPrecision(3);
            document.getElementById("return-t").innerHTML="The time is "+parseFloat(userT).toPrecision(3)+"s.";
            document.getElementById("return-a").innerHTML="The acceleration is "+parseFloat(userA).toPrecision(3)+"m/s<sup>2</sup>.";
        }
    }
    else if (userVI!==""&&userVF!==""&&userA!==""){
        if (userVI<=userVF&&userA<0||userVI >= userVF&&userA > 0||userVI==userVF&&userA==0||userVI==userVF&&userA!==0){
            document.getElementById("return-vi").innerHTML="Please check you inputs";
        }
        else{
            userT=getT(userVF, userVI, userA);
            userX=getXnA(userVF, userVI, userT);
            document.getElementById("return-x").innerHTML="The displacement is "+parseFloat(userX).toPrecision(3)+"m.";
            document.getElementById("return-t").innerHTML="The time is "+parseFloat(userT).toPrecision(3)+"s."
        }
    }
    else if (userVF!==""&&userA!==""&&userT!==""){
        if (userT<0){
            document.getElementById("return-vi").innerHTML="Please check you inputs";
        }
        else{
            userVI=getVi(userVF, userA, userT);
            userX=getXnA(userVF, userVI, userT);
            document.getElementById("return-vi").innerHTML="The initial velocity is "+parseFloat(userVI).toPrecision(3)+"m/s.";
            document.getElementById("return-x").innerHTML="The displacement is "+parseFloat(userX).toPrecision(3)+"m."
        }
    }
    else{
        document.getElementById("return-vi").innerHTML="Please check your inputs";
    }
}
function getTfX(vf, vi, x){
    return 2*parseFloat(x)/(parseFloat(vf)+parseFloat(vi));
}
function getVi(vf, a, t){
    return parseFloat(vf)-(parseFloat(a)*parseFloat(t));
}
function getT(vf, vi, a){
    let vt=parseFloat(vf)-parseFloat(vi);
    return vt/parseFloat(a);
}
function clearValues(){
    let userVI=document.getElementById("initial-velocity");
    let userVF=document.getElementById("final-velocity");
    let userA=document.getElementById("acceleration");
    let userT=document.getElementById("time");
    let userX=document.getElementById("displacement");
    userVI.value=null;
    userVF.value=null;
    userA.value=null;
    userT.value=null;
    userX.value=null;
    document.getElementById("return-vi").innerHTML="";
    document.getElementById("return-vf").innerHTML="";
    document.getElementById("return-a").innerHTML="";
    document.getElementById("return-t").innerHTML="";
    document.getElementById("return-x").innerHTML="";
}
function getVf(vi, a, t){
    return parseFloat(vi)+(parseFloat(a)*parseFloat(t));
}
function getA(vf, vi, t){
    return (parseFloat(vf)-parseFloat(vi))/parseFloat(t);
}
function getXnA(vf, vi, t){
    return ((parseFloat(vf)+parseFloat(vi))/2)*parseFloat(t);
}
document.getElementById("calculate").addEventListener("click", returnResult);
document.getElementById("clear").addEventListener("click", clearValues);