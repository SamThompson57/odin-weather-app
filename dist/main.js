(()=>{"use strict";const t="a76bd9ccf221f5b2f6393608a4e47f8e";document.getElementById("submit").onclick=()=>a();const e=document.getElementById("city");async function a(){const a=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e.value}&appid=${t}`,{mode:"cors"}),o=await a.json(),c=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${o[0].lat}&lon=${o[0].lon}&appid=${t}`,{mode:"cors"}),n=await c.json();console.log(n)}a()})();