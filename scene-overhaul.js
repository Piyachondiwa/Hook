/* Moonwood scene overhaul: 3/4 camera feel + Japanese rural island + bridge + pixel atmosphere. */
(()=>{
'use strict';
if(typeof g==='undefined'||typeof c==='undefined'||typeof R==='undefined'||typeof world!=='function')return;
const oldWorld=world;
const oldBlocked=typeof blocked==='function'?blocked:null;
const B=(x,y,w,h,col)=>R(x,y,w,h,col);
const C={water:'#245e73',water2:'#2d7184',water3:'#43899a',bank:'#6d7d4a',bank2:'#8c8a57',wood:'#6b432d',wood2:'#96613d',dark:'#3a2924',roof:'#34323a',roof2:'#4b4650',wall:'#9a704c',wall2:'#c09363',paper:'#e8dfc2',red:'#a33f35',red2:'#cf5b46',stone:'#77736b',stone2:'#9b9587',rice:'#b7a34f',rice2:'#d0bd65',sakura:'#e7a7b9',sakura2:'#f2c3d0',bamboo:'#496b42',path:'#9a744d',path2:'#b08a5a',lantern:'#e0a85a'};
function pixelTree(x,y,s=1){
  B(x-4*s,y-2*s,8*s,28*s,C.wood);B(x-2*s,y,4*s,24*s,C.wood2);
  B(x-24*s,y-18*s,48*s,22*s,C.bamboo);B(x-17*s,y-29*s,34*s,17*s,C.bamboo);B(x-8*s,y-39*s,17*s,14*s,C.bamboo);
  B(x-20*s,y-12*s,11*s,6*s,C.sakura);B(x+8*s,y-20*s,10*s,6*s,C.sakura2);B(x-7*s,y-34*s,8*s,6*s,C.sakura2);
}
function house(x,y,s=1,roof=C.roof){
  B(x,y,112*s,72*s,C.wall);B(x+7*s,y+10*s,98*s,62*s,C.wall2);
  /* tiled roof */
  B(x-8*s,y-8*s,128*s,12*s,roof);B(x+5*s,y-17*s,102*s,10*s,C.roof2);B(x+17*s,y-24*s,78*s,9*s,roof);
  for(let i=0;i<7;i++)B(x+(i*16-4)*s,y-7*s,2*s,10*s,C.dark);
  /* beams / shoji */
  B(x+13*s,y+19*s,32*s,27*s,C.dark);B(x+17*s,y+23*s,24*s,19*s,C.paper);
  B(x+53*s,y+19*s,42*s,27*s,C.dark);B(x+57*s,y+23*s,34*s,19*s,C.paper);
  B(x+5*s,y+49*s,101*s,5*s,C.dark);
  B(x+47*s,y+50*s,14*s,22*s,C.dark);B(x+50*s,y+54*s,8*s,18*s,C.wood2);
  B(x-2*s,y-5*s,116*s,4*s,C.wood);
}
function torii(x,y,s=1){
  B(x-55*s,y-56*s,8*s,72*s,C.red);B(x+47*s,y-56*s,8*s,72*s,C.red);
  B(x-68*s,y-67*s,136*s,9*s,C.red);B(x-57*s,y-77*s,114*s,8*s,C.red2);
  B(x-42*s,y-49*s,84*s,7*s,C.red2);B(x-5*s,y-49*s,10*s,48*s,C.red);
}
function lantern(x,y){
  B(x-2,y,4,22,C.dark);B(x-8,y-7,16,10,C.stone);B(x-5,y-13,10,7,C.stone2);B(x-4,y-5,8,7,C.lantern);B(x-5,y+22,10,3,C.dark);
}
function ricePatch(x,y,w,h){
  B(x,y,w,h,'#6f633d');B(x+5,y+5,w-10,h-10,'#8d7b42');
  for(let xx=x+10;xx<x+w-8;xx+=12){
    for(let yy=y+10;yy<y+h-6;yy+=12){
      B(xx,yy,2,6,C.rice);B(xx+3,yy-2,2,7,C.rice2);B(xx+6,yy+1,2,5,C.rice);
    }
  }
}
function fence(x,y,w){
  for(let xx=x;xx<=x+w;xx+=30){B(xx,y,5,24,C.dark);B(xx-2,y-3,9,4,C.wood2)}
  B(x,y+5,w,4,C.wood2);B(x,y+17,w,4,C.wood);
}
function island(){
  /* cover the old right-side land/water transition and build a new island silhouette */
  B(2250,900,1350,520,C.water);
  for(let i=0;i<90;i++){
    const xx=2260+(i*83)%1320,yy=930+(i*47)%430;
    B(xx,yy,7+(i%4)*3,2,i%3===0?C.water3:C.water2);
  }
  B(2480,955,1020,360,C.bank);B(2510,925,960,25,C.bank2);
  B(2525,1310,900,25,C.stone);B(2550,1335,850,18,C.dark);
  /* village paths */
  B(2480,1110,1020,54,C.path);B(2930,950,58,380,C.path2);B(2580,1020,260,48,C.path2);B(3140,1190,270,45,C.path2);
  /* houses */
  house(2550,980,1.05);house(2770,1085,.9,C.roof2);house(3100,980,.95,C.roof);house(3230,1135,.72,C.roof2);
  /* shrine corner */
  torii(2970,1035,1.0);lantern(2895,1050);lantern(3045,1050);B(2925,1055,90,35,C.stone);B(2935,1048,70,8,C.stone2);
  /* rice terraces */
  ricePatch(2525,1195,190,95);ricePatch(3180,1010,180,90);fence(2510,1182,210);fence(3170,998,195);
  /* sakura */
  pixelTree(2700,1035,1.25);pixelTree(3330,1080,1.35);pixelTree(3040,1240,1.0);
  /* small garden + well */
  B(2760,1195,115,72,C.bamboo);B(2770,1205,95,52,C.wall2);B(2810,1190,15,12,C.stone);B(2804,1186,27,7,C.stone2);
  for(let i=0;i<14;i++)B(2780+(i%7)*13,1235+(i%2)*13,6,6,i%2?C.sakura:C.rice2);
  /* village lanterns */
  for(const q of [[2600,1100],[2740,1100],[3150,1130],[3300,1200]])lantern(q[0],q[1]);
  /* bridge from player's side to island */
  B(1830,1085,700,92,C.dark);B(1840,1090,680,12,C.wood2);B(1840,1160,680,12,C.wood);
  for(let xx=1850;xx<2520;xx+=28){B(xx,1098,20,58,C.wood2);B(xx+4,1105,12,43,C.wood);B(xx+7,1108,7,4,'#c58b53')}
  for(const xx of [1860,2020,2180,2340,2490]){B(xx,1065,8,105,C.dark);B(xx-8,1062,24,7,C.wood2);}
  /* bridge lamps and blossom drift */
  for(const xx of [1950,2150,2350]){lantern(xx,1075);B(xx-1,1072,2,3,C.sakura2)}
  for(let i=0;i<30;i++){const xx=2260+(i*97)%1100,yy=900+(i*61)%470;B(xx,yy,3+(i%2),3,i%3?C.sakura:C.sakura2)}
}
function cameraGrade(){
  /* Elevated 3/4 feel: slightly compressed ground plane, preserving pixel crispness. */
  g.translate(0,72);g.scale(1,.86);
}
world=function(){
  g.save();
  cameraGrade();
  oldWorld();
  island();
  g.restore();
};
if(oldBlocked){
  blocked=function(x,y){
    if(oldBlocked(x,y)){
      /* allow the new bridge corridor to be traversed despite old bridge/structure colliders */
      if(x>=1820&&x<=2535&&y>=1070&&y<=1195)return false;
      return true;
    }
    return false;
  };
}
window.moonwoodScene={camera:'elevated-3/4',japaneseIsland:true,bridge:true,riceFields:true,torii:true,sakura:true};
})();
