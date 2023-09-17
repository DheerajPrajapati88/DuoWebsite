 var cur = document.querySelector(".cursor");
 var main  = document.querySelector(".main");
 document.addEventListener("mousemove",function(dets){
  cur.style.left=dets.x+20+"px";
  cur.style.top=dets.y+20+"px";
 })

var h4 = document.querySelectorAll(".nav #h4_first");
var purple = document.querySelector(".purple");
var nav=document.querySelector(".nav")
h4.forEach(function(elm){
  elm.addEventListener("mouseenter",function(){
    purple.style.display="block";
    purple.style.opacity="1";    
    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths = [],
          xPercents = [],
          curIndex = 0,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
          totalWidth, curX, distanceToStart, distanceToLoop, item, i;
      gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i, el) => {
              let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
              xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
              return xPercents[i];
          }
      });
      gsap.set(items, {x: 0});
      totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
          vars = vars || {};
          (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
          let newIndex = gsap.utils.wrap(0, length, index),
              time = times[newIndex];
          if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
              vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
              time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
      }
      tl.next = vars => toIndex(curIndex+1, vars);
      tl.previous = vars => toIndex(curIndex-1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
      }
  const elems = gsap.utils.toArray(".elm");
  loop = horizontalLoop(elems, {paused:false,repeat:-1});
  })
  elm.addEventListener("mouseleave",function(){
    purple.style.display="none";
    purple.style.opacity="0";
  })
})

function init(){
    
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

}
init();

// gsap code

var tl=gsap.timeline({

    scrollTrigger:{
        trigger:".page1",
        scroller:".main",
        // markers:true,
        start:" top 30%",
        end:"top -60%",
        scrub:2
    }
})
tl.to(".page1>h1",{
    x:-100

},"anim")
tl.to(".page1>h2",{
    x:100
},"anim")
tl.to(".page1>video",{
    width:"80%"
},"anim")

var tl2=gsap.timeline({

    scrollTrigger:{
        trigger:".page1",
        scroller:".main",
        // markers:true,
        start:"top -170%",
        end:"top -150%",
        scrub:2,
        pin:true
      }
})
tl2.to(".main",{
    backgroundColor:"#dadada",
    // color:"red"
})

var tl3=gsap.timeline({

  scrollTrigger:{
      trigger:".page1",
      scroller:".main",
      // markers:true,
      start:"top -350%",
      end:"top -250%",
      scrub:2
  }
})
tl3.to(".main",{
  backgroundColor:"#0F0D0D"
})
var tl4=gsap.timeline({

  scrollTrigger:{
      trigger:".page1",
      scroller:".main",
      // markers:true,
      start:"top -550%",
      end:"top -400%",
      scrub:2
  }
})
tl4.to(".main",{
  backgroundColor:"#ffb8ff"
})

var tlpage2=gsap.timeline({

  scrollTrigger:{
    trigger:".page2",
    scroller:".main",
    // markers:true,
    start:"top 20%",
    end:"top 70%",
    scrub:2,
  }
})
tlpage2.from(".main .page2 h1",{

  opacity:0,
  x:100
},"anim")
tlpage2.from(".main .page2 h2",{
  opacity:0,
  x:-100
},"anim")
tlpage2.from(".main .page2 p",{

  opacity:0,
  x:100
},"anim")

var tlpage3=gsap.timeline({
  scrollTrigger:{
    trigger:".page3",
    scroller:".main",
    start:"top 30%",
    // markers:true,
    end:"top 70%",
    scrub:2

  }
})
tlpage3.from(".main .page3 h1",{
  y:100,
  opacity:0,
})
tlpage3.from(".main .page3 img",{
  opacity:0,
  scale:0
},"anim")
tlpage3.from(".main .page3 video",{
  opacity:0,
  scale:0
},"anim")

var tl5=gsap.timeline({

  scrollTrigger:{
      trigger:".page5",
      scroller:".main",
      scrub:2,
      // markers:true,
      start:"top 20%",
      end:"top 60%"
    }
})
tl5.from(".main .page5 .box h3",{
  x:100,
  duration:1
},"anim")
tl5.from(".main .page5 .box h4",{
  x:-100,
  duration:1
},"anim")
tl5.from(".main .page5 h2",{
  rotate:"5deg",
  duration:0.5
},"anim")


tlfooter=gsap.timeline({
  scrollTrigger:{
    trigger:".footer",
    scroller:".main",
    start:"top 20%",
    end:"top 60%",
    scrub:2,
  }
})
tlfooter.from(".main .footer .footer1 .sphare",{
  opacity:0,
  scale:1.5
},"anim")
tlfooter.from(".main .footer .footer1 h1",{
  opacity:0,
  scale:1.5

},"anim")

var curChange = document.querySelector("video");
curChange.addEventListener("mouseenter",function(){
  cur.style.width="50px";
  cur.style.height="20px";
  cur.style.borderRadius="10px";
  cur.style.backgroundColor="#ff31ff"
  cur.innerHTML="hello";
})
curChange.addEventListener("mouseleave",function(){
  cur.style.width="20px";
  cur.style.height="20px";
  cur.style.borderRadius="50%";
  cur.style.backgroundColor="#fff";
  cur.innerHTML=" ";

})


var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elm){

  elm.addEventListener("mouseenter",function(){
   var att= elm.getAttribute("data_img");
   cur.style.width="250px";
   cur.style.height="200px";
   cur.style.borderRadius="0";
   cur.style.backgroundImage=`url(${att})`;
  })
  elm.addEventListener("mouseleave",function(){
    elm.style.backgroundColor="transparent";
    cur.style.width="20px";
    cur.style.height="20px";
    cur.style.borderRadius="50%";
    cur.style.backgroundImage=`none`;

  })
})

