function returnResult(){
    ["return-vi", "return-vf", "return-a", "return-t", "return-x"].forEach(id=>{
        document.getElementById(id).innerHTML="";
    });
    let userVI=document.getElementById("initial-velocity").value.trim();
    let userVF=document.getElementById("final-velocity").value.trim();
    let userA=document.getElementById("acceleration").value.trim();
    let userT=document.getElementById("time").value.trim();
    let userX=document.getElementById("displacement").value.trim();
    let vi=userVI==""?null:parseFloat(userVI);
    let vf=userVF==""?null:parseFloat(userVF);
    let a=userA==""?null:parseFloat(userA);
    let t=userT==""?null:parseFloat(userT);
    let x=userX==""?null:parseFloat(userX);
    function showError(fieldId, message){
        document.getElementById(fieldId).innerHTML=message;
    }
    let provided ={ vi, vf, a, t, x };
    let count=Object.values(provided).filter(v=>v!==null).length;
    if (count<3){
        showError("return-vi", "Please provide at least three values.");
        return;
    }
    if (vi!==null&&vf!==null&&t!==null&&a==null&&x==null){
        if (t<=0){
            showError("return-t", "Time must be greater than zero.");
            return;
        }
        let aCalc=getA(vf, vi, t);
        let xCalc=getX(vf, vi, t);
        showResult("a", aCalc, "m/s²");
        showResult("x", xCalc, "m");
    }
    else if (vi!==null&&a!==null&&t!==null&&vf==null&&x==null){
        if (t<0){
            showError("return-t", "Time must be non-negative.");
            return;
        }
        let vfCalc=getVf(vi, a, t);
        let xCalc=getX(vfCalc, vi, t);
        showResult("vf", vfCalc, "m/s");
        showResult("x", xCalc, "m");
    }
    else if (vi!==null&&vf!==null&&x!==null&&a==null&&t==null){
        let denom=vi+vf;
        if (denom==0){
            showError("return-t", "Division by zero.");
            return;
        }
        let tCalc=2*x/denom;
        if (tCalc<0){
            showError("return-x", "Inconsistent inputs.");
            return;
        }
        let aCalc=getA(vf, vi, tCalc);
        showResult("t", tCalc, "s");
        showResult("a", aCalc, "m/s²");
    }
    else if (vi!==null&&vf!==null&&a!==null&&t==null&&x==null){
        if (a==0){
            if (vf!==vi){
                showError("return-a", "Acceleration zero with changing velocity.");
                return;
            }
            showError("return-t", "Time indeterminate when acceleration is zero and velocities are equal.");
            return;
        }
        let tCalc=getT(vf, vi, a);
        if (tCalc<0){
            showError("return-t", "Time is negative.");
            return;
        }
        let xCalc=getX(vf, vi, tCalc);
        showResult("t", tCalc, "s");
        showResult("x", xCalc, "m");
    }
    else if (vf!==null&&a!==null&&t!==null&&vi==null&&x==null){
        if (t<0){
            showError("return-t", "Time must be non-negative.");
            return;
        }
        let viCalc=getVi(vf, a, t);
        let xCalc=getX(vf, viCalc, t);
        showResult("vi", viCalc, "m/s");
        showResult("x", xCalc, "m");
    }
    else if (vi!==null&&a!==null&&x!==null&&vf==null&&t==null){
        if (a==0){
            if (vi==0){
                if (x==0){
                    let tCalc=0;
                    let vfCalc=vi;
                    showResult("t", tCalc, "s");
                    showResult("vf", vfCalc, "m/s");
                }
                else{
                    showError("return-x", "Displacement non-zero with zero velocity and acceleration.");
                    return;
                }
            }
            else{
                let tCalc=x/vi;
                if (tCalc<0){
                    showError("return-t", "Time is negative.");
                    return;
                }
                let vfCalc=vi;
                showResult("t", tCalc, "s");
                showResult("vf", vfCalc, "m/s");
            }
        }
        else{
            let discriminant=vi*vi+2*a*x;
            if (discriminant<0){
                showError("return-t", "No real solution for time.");
                return;
            }
            let sqrtD=Math.sqrt(discriminant);
            let t1=(-vi+sqrtD)/a;
            let t2=(-vi-sqrtD)/a;
            let positiveTs=[t1, t2].filter(t=>t >= 0);
            if (positiveTs.length==0){
                showError("return-t", "No positive time solution.");
                return;
            }
            let tCalc=Math.min(...positiveTs);
            let vfCalc=getVf(vi, a, tCalc);
            showResult("t", tCalc, "s");
            showResult("vf", vfCalc, "m/s");
        }
    }
    else if (vf!==null&&a!==null&&x!==null&&vi==null&&t==null){
        if (a==0){
            if (vf==0){
                if (x==0){
                    let tCalc=0;
                    let viCalc=vf;
                    showResult("t", tCalc, "s");
                    showResult("vi", viCalc, "m/s");
                }
                else{
                    showError("return-x", "Displacement non-zero with zero velocity and acceleration.");
                    return;
                }
            }
            else{
                let tCalc=x/vf;
                if (tCalc<0){
                    showError("return-t", "Time is negative.");
                    return;
                }
                let viCalc=vf;
                showResult("t", tCalc, "s");
                showResult("vi", viCalc, "m/s");
            }
        }
        else{
            let discriminant=vf*vf-2*a*x;
            if (discriminant<0){
                showError("return-t", "No real solution for time.");
                return;
            }
            let sqrtD=Math.sqrt(discriminant);
            let t1=(vf-sqrtD)/a;
            let t2=(vf+sqrtD)/a;
            let positiveTs=[t1, t2].filter(t=>t >= 0);
            if (positiveTs.length==0){
                showError("return-t", "No positive time solution.");
                return;
            }
            let tCalc=Math.min(...positiveTs);
            let viCalc=getVi(vf, a, tCalc);
            showResult("t", tCalc, "s");
            showResult("vi", viCalc, "m/s");
        }
    }
    else if (vi!==null&&t!==null&&x!==null&&vf==null&&a==null){
        if (t<=0){
            showError("return-t", "Time must be positive.");
            return;
        }
        let aCalc=2*(x-vi*t)/(t*t);
        let vfCalc=getVf(vi, aCalc, t);
        showResult("a", aCalc, "m/s²");
        showResult("vf", vfCalc, "m/s");
    }
    else if (vf!==null&&t!==null&&x!==null&&vi==null&&a==null){
        if (t<=0){
            showError("return-t", "Time must be positive.");
            return;
        }
        let aCalc=2*(vf*t-x)/(t*t);
        let viCalc=getVi(vf, aCalc, t);
        showResult("a", aCalc, "m/s²");
        showResult("vi", viCalc, "m/s");
    }
    else if (a!==null&&t!==null&&x!==null&&vi==null&&vf==null){
        if (t<=0){
            showError("return-t", "Time must be positive.");
            return;
        }
        let viCalc=(x-0.5*a*t*t)/t;
        let vfCalc=getVf(viCalc, a, t);
        showResult("vi", viCalc, "m/s");
        showResult("vf", vfCalc, "m/s");
    }
    else{
        showError("return-vi", "Unable to compute. Check your inputs.");
    }
}
function showResult(field, value, unit){
    let el=document.getElementById(`return-${field}`);
    el.innerHTML=`The ${fieldText(field)} is ${value.toPrecision(3)} ${unit}.`;
}
function fieldText(field){
    switch (field){
        case "vi": return "initial velocity";
        case "vf": return "final velocity";
        case "a": return "acceleration";
        case "t": return "time";
        case "x": return "displacement";
    }
}
function clearValues(){
    ["initial-velocity", "final-velocity", "acceleration", "time", "displacement"].forEach(id=>{
        document.getElementById(id).value="";
    });
    ["return-vi", "return-vf", "return-a", "return-t", "return-x"].forEach(id=>{
        document.getElementById(id).innerHTML="";
    });
}
function getVf(vi, a, t){
    return vi+a*t;
}
function getVi(vf, a, t){
    return vf-a*t;
}
function getA(vf, vi, t){
    return (vf-vi)/t;
}
function getT(vf, vi, a){
    return (vf-vi)/a;
}
function getX(vf, vi, t){
    return ((vf+vi)/2)*t;
}
document.getElementById("calculate").addEventListener("click", returnResult);
document.getElementById("clear").addEventListener("click", clearValues);