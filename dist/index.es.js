const a=a=>({year:a.getFullYear(),month:a.getMonth()+1,day:a.getDate(),weekDay:a.getDay()}),t=(a,t)=>a-t*Math.floor(a/t);class e{constructor(i,r){switch(this._getCalendarEpoch=a=>{switch(a){case"gregorian":return 1721425.5;case"islamic":return 1948439.5;case"jalali":return 1948320.5}},this._getJulianWeekDay=a=>t(Math.floor(a+1.5),7),this._isLeapYear=(a,t)=>{switch(t){case"gregorian":return a%4==0&&!(a%100==0&&a%400!=0);case"jalali":return 682*((a-(a>0?474:473))%2820+474+38)%2816<682;case"islamic":return(11*a+14)%30<11}},this._toJulianDate=(a,e)=>{const{year:i,month:r,day:o}=a;switch(e){case"jalali":{const a=i-(i>=0?474:473),e=474+t(a,2820);return o+(r<=7?31*(r-1):30*(r-1)+6)+Math.floor((682*e-110)/2816)+365*(e-1)+1029983*Math.floor(a/2820)+(this._getCalendarEpoch("jalali")-1)}case"gregorian":return this._getCalendarEpoch("gregorian")-1+365*(i-1)+Math.floor((i-1)/4)+-Math.floor((i-1)/100)+Math.floor((i-1)/400)+Math.floor((367*r-362)/12+(r<=2?0:this._isLeapYear(i,e)?-1:-2)+o);case"islamic":return o+Math.ceil(29.5*(r-1))+354*(i-1)+Math.floor((3+11*i)/30)+this._getCalendarEpoch("islamic")-1}},this._toGregorian=(a,e)=>{let i;const r=this._toJulianDate(a,e),o=this._getJulianWeekDay(r),s=Math.floor(r-.5)+.5,l=s-this._getCalendarEpoch("gregorian"),n=Math.floor(l/146097),h=t(l,146097),c=Math.floor(h/36524),_=t(h,36524),g=Math.floor(_/1461),u=t(_,1461),y=Math.floor(u/365);i=400*n+100*c+4*g+y,4!==c&&4!==y&&i++;const d={year:i,month:1,day:1,weekDay:0},D=s-this._toJulianDate(d,"gregorian");d.month=3;const f=s<this._toJulianDate(d,"gregorian")?0:this._isLeapYear(i,"gregorian")?1:2,m=Math.floor((12*(D+f)+373)/367);d.month=m;const M=s-this._toJulianDate(d,"gregorian")+1;return d.day=M,d.weekDay=o,d},this._toJalali=(a,e)=>{let i=this._toJulianDate(a,e)+Math.floor(.5)/86400;const r=this._getJulianWeekDay(i);i=Math.floor(i)+.5;const o={year:475,month:1,day:1,weekDay:0},s=i-this._toJulianDate(o,"jalali"),l=Math.floor(s/1029983),n=t(s,1029983);let h=0;if(1029982===n)h=2820;else{const a=Math.floor(n/366),e=t(n,366);h=Math.floor((2134*a+2816*e+2815)/1028522)+a+1}let c=h+2820*l+474;c<=0&&c--,o.year=c;const _=i-this._toJulianDate(o,"jalali")+1,g=_<=186?Math.ceil(_/31):Math.ceil((_-6)/30);o.month=g;const u=i-this._toJulianDate(o,"jalali")+1;return o.day=u,o.weekDay=r,o},this._toIslamic=(a,t)=>{const e=Math.floor(this._toJulianDate(a,t))+.5,i={year:Math.floor((30*(e-this._getCalendarEpoch("islamic"))+10646)/10631),month:1,day:1,weekDay:0};return i.month=Math.min(12,Math.ceil((e-(29+this._toJulianDate(i,"islamic")))/29.5)+1),i.day=e-this._toJulianDate(i,"islamic")+1,i.weekDay=this._getJulianWeekDay(e),i},this.toJalali=()=>new e("jalali",this._toJalali(this._date,this._calendar)).date,this.toGregorian=()=>new e("gregorian",this._toGregorian(this._date,this._calendar)).date,this.toIslamic=()=>new e("islamic",this._toIslamic(this._date,this._calendar)).date,this.toJulianDay=()=>this._toJulianDate(this._date,this._calendar),i=i??"gregorian",r=(t=>{if(t instanceof Date)return a(t);if("number"==typeof t||"string"==typeof t){const e=new Date(t);return a(e)}if("year"in t)return{...t,weekDay:0};const[e,i,r,o]=t.map(Number);return{year:e,month:i,day:r,weekDay:o??0}})(r??new Date),this._calendar=i,this._calendar){case"gregorian":this._date=this._toGregorian({...r,weekDay:0},i);break;case"islamic":this._date=this._toIslamic({...r,weekDay:0},i);break;case"jalali":this._date=this._toJalali({...r,weekDay:0},i)}}get date(){return this._date}get isLeapYear(){return this._isLeapYear(this._date.year,this._calendar)}}var i;!function(a){a.Calendars=["jalali","islamic","gregorian"]}(i||(i={}));export{e as Khayyam,i as KhayyamNS};