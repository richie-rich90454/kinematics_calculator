function returnResult(){
    document.getElementById("return_vi").innerHTML="";
    document.getElementById("return_vf").innerHTML="";
    document.getElementById("return_a").innerHTML="";
    document.getElementById("return_t").innerHTML="";
    document.getElementById("return_x").innerHTML="";
    Uservi=document.getElementById("initial_velocity").value;
    Uservf=document.getElementById("final_velocity").value;
    Usera=document.getElementById("acceleration").value;
    Usert=document.getElementById("time").value;
    Userx=document.getElementById("displacement").value;
    if (Uservi!=""&&Uservf!=""&&Usert!=""){
        if (Usert<0||Usert==0){
            document.getElementById("return_vi").innerHTML="Please check your inputs";
        }
        else{
            Usera=getA(Uservf, Uservi, Usert);
            Userx=getXnA(Uservf, Uservi, Usert);
            document.getElementById("return_a").innerHTML="The acceleration is "+parseFloat(Usera).toPrecision(3)+"m/s<sup>2</sup>.";
            document.getElementById("return_x").innerHTML="The displacement is "+parseFloat(Userx).toPrecision(3)+"m.";
        }
    }
    else if (Uservi!=""&&Usera!=""&&Usert!=""){
        if (Usert<0){
            document.getElementById("return_vi").innerHTML="Please check your inputs";
        }
        else{
            Uservf=getVf(Uservi, Usera, Usert);
            Userx=getXnA(Uservf, Uservi, Usert);
            document.getElementById("return_vf").innerHTML="The final velocity is "+parseFloat(Uservf).toPrecision(3)+"m/s.";
            document.getElementById("return_x").innerHTML="The displacement is "+parseFloat(Userx).toPrecision(3)+"m.";
        }
    }
    else if (Uservi!=""&&Uservf!=""&&Userx!=""){
        if (Userx==0&&Uservf!=Uservi||Userx==0&&Uservf==Uservi||Userx!=0&&Uservf==Uservi||Userx<0&&Uservf >= Uservi||Userx > 0&&Uservf<Uservi){
            document.getElementById("return_vi").innerHTML="Please check your inputs";
        }
        else{
            document.getElementById("return_vi").innerHTML="";
            Usert=Math.abs(getTfX(Uservf, Uservi, Userx)).toPrecision(3);
            Usera=getA(Uservf, Uservi, Usert).toPrecision(3);
            document.getElementById("return_t").innerHTML="The time is "+parseFloat(Usert).toPrecision(3)+"s.";
            document.getElementById("return_a").innerHTML="The acceleration is "+parseFloat(Usera).toPrecision(3)+"m/s<sup>2</sup>.";
        }
    }
    else if (Uservi!=""&&Uservf!=""&&Usera!=""){
        if (Uservi<=Uservf&&Usera<0||Uservi >= Uservf&&Usera > 0||Uservi==Uservf&&Usera==0||Uservi==Uservf&&Usera!=0){
            document.getElementById("return_vi").innerHTML="Please check you inputs";
        }
        else{
            Usert=getT(Uservf, Uservi, Usera);
            Userx=getXnA(Uservf, Uservi, Usert);
            document.getElementById("return_x").innerHTML="The displacement is "+parseFloat(Userx).toPrecision(3)+"m.";
            document.getElementById("return_t").innerHTML="The time is "+parseFloat(Usert).toPrecision(3)+"s."
        }
    }
    else if (Uservf!=""&&Usera!=""&&Usert!=""){
        if (Usert<0){
            document.getElementById("return_vi").innerHTML="Please check you inputs";
        }
        else{
            Uservi=getVi(Uservf, Usera, Usert);
            Userx=getXnA(Uservf, Uservi, Usert);
            document.getElementById("return_vi").innerHTML="The initial velocity is "+parseFloat(Uservi).toPrecision(3)+"m/s.";
            document.getElementById("return_x").innerHTML="The displacement is "+parseFloat(Userx).toPrecision(3)+"m."
        }
    }
    else{
        document.getElementById("return_vi").innerHTML="Please check your inputs";
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
    location.reload(true);
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
