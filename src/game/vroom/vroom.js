!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Vroom",[],t):"object"==typeof exports?exports.Vroom=t():e.Vroom=t()}(window,(function(){return function(e){var t={};function i(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(s,o,function(t){return e[t]}.bind(null,o));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t){e.exports={running:!1,halt:!1,debug:{enabled:!1,console:!0,overlay:!0,level:1},mainUpdateLoopExtension:null,canvasId:"vroom-canvas",canvas:null,ctx:null,canvasSizeCache:{width:null,height:null},backgroundColor:"#000",dim:{width:null,height:null},scale:{x:1,y:1},meter:30,physics:{physicsEnabled:!1,gravityEnabled:!1,iterations:2,gravity:{x:0,y:9.81},friction:{x:0,y:0}},input:{preventDefault:[],keyState:{},mouseState:{pos:{x:0,y:0},mouseDown:!1,clicked:!1}},entityList:{},activeCamera:null,maxLayers:6,layers:[],audioCtx:null}},function(e,t,i){const s=i(0);e.exports={generateId:()=>"_"+Math.random().toString(36).slice(-10)+Date.now().toString(36),toMeters:e=>e*s.meter,getScaledPos:e=>({x:e.x*s.scale.x,y:e.y*s.scale.y}),getCameraRelativePos(e,t){void 0===t&&(t=s.activeCamera);this.getScaledPos(e);return{x:e.x*t.zoom-t.pos.x,y:e.y*t.zoom-t.pos.y}},getCameraRelativeDim:(e,t)=>(void 0===t&&(t=s.activeCamera),{width:e.width*t.zoom,height:e.height*t.zoom}),isPosInCameraView(e,t){void 0===t&&(t=s.activeCamera);let i=this.getScaledPos(e);return i.x>t.pos.x&&i.x<t.pos.x+s.canvas.width&&i.y>t.pos.y&&i.y<t.pos.y+s.canvas.height},isEntityInCameraView:(e,t)=>(void 0===t&&(t=s.activeCamera),e.getRight()>t.pos.x&&e.getLeft()<t.pos.x+s.canvas.width&&e.getBottom()>t.pos.y&&e.getTop()<t.pos.y+s.canvas.height),lerpValue(e,t,i,s,o){let n=0;return!1!==s?(n=(i-t)*s*e,o&&Math.abs(n)>Math.abs(o)&&(-1==Math.sign(n)&&(o=-o),n=o)):n=i-t,(Math.abs(i-t)<.001||isNaN(Math.abs(i-t)))&&(n=i-t),n},lerpPosition(e,t,i,s,o){return{x:this.lerpValue(e,t.x,i.x,s,o),y:this.lerpValue(e,t.y,i.y,s,o)}},lerpDimensions(e,t,i,s,o){return{width:this.lerpValue(e,t.width,i.width,s,o),height:this.lerpValue(e,t.height,i.height,s,o)}},getDistance:(e,t)=>Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),multilineText(e,t,i){void 0===i&&(i=0),textLines=e.split("\n");for(let e=0;e<textLines.length;e++)s.ctx.fillText(textLines[e],t.x,t.y+i*e)}}},function(e,t,i){const s=i(3),o=i(4),n=i(5),a=i(6),r=i(0),h=i(7),d=i(1),l={init(e){r.canvasId=e.canvasId||r.canvasId,r.canvas=document.getElementById(r.canvasId),r.canvas?(r.ctx=r.canvas.getContext("2d",{alpha:!1}),r.canvasSizeCache={width:r.canvas.width,height:r.canvas.height},window.AudioContext=window.AudioContext||window.webkitAudioContext,r.audioCtx=new AudioContext,void 0!==e&&(void 0!==e.debug&&(void 0!==e.debug.enabled&&(r.debug.enabled=e.debug.enabled),void 0!==e.debug.console&&(r.debug.console=e.debug.console),void 0!==e.debug.overlay&&(r.debug.overlay=e.debug.overlay),void 0!==e.debug.level&&(r.debug.level=e.debug.level)),void 0!==e.dim&&"undefined"!==e.dim.width&&"undefined"!==e.dim.height&&(r.dim=e.dim),void 0!==e.meter&&"number"==typeof e.meter&&(r.meter=e.meter),void 0!==e.input&&void 0!==e.input.preventDefault&&Array.isArray(e.input.preventDefault)&&(r.input.preventDefault=e.input.preventDefault),void 0!==e.backgroundColor&&(r.backgroundColor=e.backgroundColor),void 0!==e.physics&&(void 0!==e.physics.physicsEnabled&&(r.physics.physicsEnabled=e.physics.physicsEnabled),void 0!==e.physics.gravityEnabled&&(r.physics.gravityEnabled=e.physics.gravityEnabled),void 0!==e.physics.gravity&&(r.physics.gravity=e.physics.gravity),void 0!==e.physics.friction&&(r.physics.friction=e.physics.friction))),r.scale={x:r.canvas.width/r.dim.width,y:r.canvas.height/r.dim.height},r.ctx.scale(r.scale.x,r.scale.y),window.addEventListener("keydown",h.keyDown),window.addEventListener("keyup",h.keyUp),r.canvas.addEventListener("mousemove",h.mouseMove),r.canvas.addEventListener("mousedown",h.mouseDown),r.canvas.addEventListener("mouseup",h.mouseUp),r.canvas.addEventListener("click",h.mouseClick),r.canvas.addEventListener("touch",h.mouseClick),window.setInterval((function(){r.canvas.width===r.canvasSizeCache.width&&r.canvas.height===r.canvasSizeCache.height||(r.canvasSizeCache={width:r.canvas.width,height:r.canvas.height},l.setCanvasScale())}),250),l.state=r,l.util=d):console.warn("Could not find canvas. Please check that the canvasId is correct.")},updateSize(e){e&&(r.canvas.width=window.innerWidth,r.canvas.height=window.innerHeight),r.ctx.width=r.canvas.width,r.ctx.height=r.canvas.height,r.dim.width=r.canvas.width,r.dim.height=r.canvas.height,l.setCanvasScale(),r.activeCamera&&null!==r.activeCamera.followingId&&r.activeCamera.follow(r.activeCamera.followingId),r.canvasSizeCache.width=r.canvas.width,r.canvasSizeCache.height=r.canvas.height,console.log("Size updated")},setCanvasScale(){r.ctx.setTransform(1,0,0,1,0,0),r.scale={x:r.canvas.width/r.dim.width,y:r.canvas.height/r.dim.height},r.ctx.scale(r.scale.x,r.scale.y)},isKeyPressed(e){const t=String.fromCharCode(e);return!(!t||void 0===r.input.keyState[t]||!0!==r.input.keyState[t])},resetMouseState(){r.input.mouseState.clicked=!1,r.input.mouseState.mouseUp=!1,r.input.mouseState.mousedown=!1},isMouseOverArea(e,t,i){void 0===i&&(i=!0);let s=e,o=t;return i&&(s=d.getCameraRelativePos(s),o=d.getCameraRelativeDim(o)),r.input.mouseState.pos.x>s.x&&r.input.mouseState.pos.x<s.x+o.width&&r.input.mouseState.pos.y>s.y&&r.input.mouseState.pos.y<s.y+o.height},isAreaClicked:(e,t,i)=>!!r.mouseState.clicked&&(void 0===i&&(i=!0),d.isMouseOverArea(e,t,i)),isEntityClicked(e,t){if(void 0===t&&(t=!0),void 0!==r.entityList[e]){if(void 0!==r.entityList[e].pos&&void 0!==r.entityList[e].dim)return d.isAreaClicked(r.entityList[e].pos,r.entityList[e].dim,t);console.warn("Trying to check if entity "+e+" is clicked when it does not have a pos or dim object defined.")}return!1},registerEntity:e=>(r.entityList[e._id]=e,e._id),getEntity:e=>void 0!==r.entityList[e]&&r.entityList[e],deregisterEntity(e){"funciton"==typeof e&&(e=e._id),delete r.entityList[e]},deleteEntity(e){"funciton"==typeof e&&(e=e._id),delete r.entityList[e]},checkCollision:(e,t)=>!(e.getBottom()+0<t.getTop()||e.getTop()-0>t.getBottom()||e.getRight()+0<t.getLeft()||e.getLeft()-0>t.getRight()),getIntersectionDepth(e,t){const i=e.getMidX()-t.getMidX(),s=e.getMidY()-t.getMidY(),o=e.halfDim.width+t.halfDim.width,n=e.halfDim.height+t.halfDim.height;return Math.abs(i)>=o||Math.abs(s)>=n?{x:0,y:0}:{x:i>0?o-i:-o-i,y:s>0?n-s:-n-s}},calculateCollisionForces(e,t){const i=t.vel.x-e.vel.x,o=t.vel.y-e.vel.y,n=l.getIntersectionDepth(e,t),a={x:0,y:0};if(Math.abs(n.x)<Math.abs(n.y)){if(a.x=n.x<0?1:-1,Math.abs(n.x)<.01)return}else if(a.y=n.y<0?1:-1,Math.abs(n.y)<.01)return;const r=(i*a.x+o*a.y)/(e.mass+t.mass);switch(e.physics.collisionType){case s.ELASTIC:e.impulse.x+=r*t.mass*a.x-e.restitution*(-e.impulse.x*t.mass*a.x)-Math.abs(n.x/2)*a.x,e.impulse.y+=r*t.mass*a.y-e.restitution*(-e.impulse.y*t.mass*a.y)-Math.abs(n.x/2)*a.x;break;case s.INELASTIC:e.impulse.x+=r*t.mass*a.x-Math.abs(n.x/2)*a.x,e.impulse.y+=r*t.mass*a.y-Math.abs(n.y/2)*a.y}},applyCollisionForces(e,t){t.vel.x,e.vel.x,t.vel.y,e.vel.y;const i=l.getIntersectionDepth(e,t),o={x:0,y:0};Math.abs(i.x)<Math.abs(i.y)?o.x=i.x<0?1:-1:o.y=i.y<0?1:-1,t.physics.entityType==s.STATIC&&(0!==o.x?e.vel.x=0:0!==o.y&&(e.vel.y=0)),e.vel.x+=e.impulse.x,e.vel.y+=e.impulse.y,e.impulse.x=0,e.impulse.y=0},displaceEntities(e,t){const i=l.getIntersectionDepth(e,t);0!==i.x&&0!==i.y&&(Math.abs(i.x)<Math.abs(i.y)?Math.sign(i.x)<0?e.pos.x=t.getLeft()-e.dim.width:e.pos.x=t.getRight():Math.abs(i.x)>Math.abs(i.y)&&(Math.sign(i.y)<0?e.pos.y=t.getTop()-e.dim.height:e.pos.y=t.getBottom()))},updatePhysics(e){if(r.physics.physicsEnabled){for(let t in r.entityList){const i=r.entityList[t];if(i.physics.enabled&&i.physics.entityType!=s.STATIC)switch(i.physics.entityType){case s.KINEMATIC:i.vel.x+=i.acc.x*e/i.mass,i.vel.y+=i.acc.y*e/i.mass,i.pos.x+=d.toMeters(i.vel.x)*e,i.pos.y+=d.toMeters(i.vel.y)*e;break;case s.DYNAMIC:i.vel.x+=i.acc.x*e/i.mass,i.vel.x+=r.physics.gravity.x*e*i.mass,i.vel.y+=i.acc.y*e/i.mass,i.vel.y+=r.physics.gravity.y*e*i.mass,i.vel.x-=r.physics.friction.x*Math.sign(i.vel.x)*e,i.vel.y-=r.physics.friction.y*Math.sign(i.vel.y)*e,Math.abs(i.vel.x)<.01&&(i.vel.x=0),Math.abs(i.vel.y)<.01&&(i.vel.y=0),i.pos.x+=d.toMeters(i.vel.x)*e*.99,i.pos.y+=d.toMeters(i.vel.y)*e*.99}}for(let e=0;e<l.state.physics.iterations;e++){for(let e in r.entityList){const t=r.entityList[e];if(t.physics.enabled&&t.physics.entityType!=s.STATIC&&t.physics.collisionType!=s.NONE)for(let i in r.entityList){if(i==e)continue;const o=r.entityList[i];o.physics.enabled&&o.physics.collisionType!=s.NONE&&!1!==l.checkCollision(t,o)&&(o.physics.collisionType!=s.NONE&&l.calculateCollisionForces(t,o))}}for(let e in r.entityList){const t=r.entityList[e];if(t.physics.enabled&&t.physics.entityType!=s.STATIC)for(let i in r.entityList){if(i==e)continue;const o=r.entityList[i];o.physics.enabled&&!1!==l.checkCollision(t,o)&&("function"==typeof t.onCollision&&t.onCollision(o),t.physics.collisionType!=s.NONE&&o.physics.collisionType!=s.NONE&&l.applyCollisionForces(t,o))}}}for(let e in r.entityList){const t=r.entityList[e];if(t.physics.enabled&&t.physics.entityType!=s.STATIC&&t.physics.collisionType!=s.NONE)for(let i in r.entityList){if(i==e)continue;const o=r.entityList[i];o.physics.enabled&&o.physics.collisionType!=s.NONE&&!1!==l.checkCollision(t,o)&&(l.displaceEntities(t,o),"function"==typeof t.onCollisionAfterDisplace&&t.onCollisionAfterDisplace(o))}}}},updateLayers(){r.layers=[];for(let e in r.entityList)void 0!==r.entityList[e].layer&&(void 0===r.layers[r.entityList[e].layer]&&(r.layers[r.entityList[e].layer]=[]),r.layers[r.entityList[e].layer].push(e))},update(e){const t=r.layers;t.reverse();for(let i in t)for(let t in r.layers[i])void 0!==r.entityList[r.layers[i][t]]&&"function"==typeof r.entityList[r.layers[i][t]].update&&r.entityList[r.layers[i][t]].update(e);null!==r.activeCamera&&r.activeCamera.update(e),"function"==typeof l.mainUpdateLoopExtension&&l.mainUpdateLoopExtension(e)},render(e){if(r.ctx.fillStyle=r.backgroundColor,r.ctx.fillRect(0,0,r.dim.width,r.dim.height),null!=r.activeCamera){for(let e in r.layers)for(let t in r.layers[e])void 0!==r.entityList[r.layers[e][t]]&&("function"==typeof r.entityList[r.layers[e][t]].render&&r.entityList[r.layers[e][t]].render(r.ctx,r.activeCamera),"function"==typeof r.entityList[r.layers[e][t]].afterRender&&r.entityList[r.layers[e][t]].afterRender());r.debug.enabled&&r.debug.overlay&&(r.ctx.font="12px monospace",r.ctx.fillStyle="#000",r.ctx.fillText(`FPS: ${e} Physics iterations: ${r.physics.iterations}`,10,20)),"function"==typeof l.mainRenderLoopExtension&&l.mainRenderLoopExtension(r.ctx,r.activeCamera)}},createCamera:e=>new o(e),activateCamera(e){r.activeCamera=e},run(){r.running=!0;let e=window.performance.now();requestAnimationFrame((function t(i){if(!1===r.halt){const s=(i-e)/1e3;if(s>.1)return console.log(`Loop waited too long (${s}s), resetting main loop timestamp.`),e=i-1,void requestAnimationFrame(t);l.updatePhysics(s),l.update(s),l.resetMouseState(),l.updateLayers();const o=Math.round(1/s);l.render(o)}e=i,requestAnimationFrame(t)}))}};e.exports={Vroom:l,Entity:s,Camera:o,Sprite:n,Sound:a}},function(e,t,i){const s=i(0),o=i(1);class n{constructor(e){e=e||{},this._id=o.generateId(),this.layer=e.layer||1,this.pos={x:e.pos&&e.pos.x?e.pos.x:0,y:e.pos&&e.pos.y?e.pos.y:0},this.dim={width:e.dim&&e.dim.width?e.dim.width:0,height:e.dim&&e.dim.height?e.dim.height:0},this.halfDim={width:0,height:0},this.acc={x:e.acc&&e.acc.x?e.acc.x:0,y:e.acc&&e.acc.y?e.acc.y:0},this.vel={x:e.vel&&e.vel.x?e.vel.x:0,y:e.vel&&e.vel.y?e.vel.y:0},this.impulse={x:0,y:0},this.mass=e.mass||1,this.restitution=e.restitution||0,this.physics={enabled:!(!e.physics||!e.physics.enabled)&&e.physics.enabled,entityType:e.physics&&e.physics.entityType?e.physics.entityType:n.KINEMATIC,collisionType:e.physics&&e.physics.collisionType?e.physics.collisionType:n.INELASTIC},e.init&&(this.init=e.init),e.onCreated&&(this.onCreated=e.onCreated),e.update&&(this.update=e.update),e.render&&(this.render=e.render),e.afterRender&&(this.afterRender=e.afterRender),e.onCollision&&(this.onCollision=e.onCollision),e.onCollisionAfterDisplace&&(this.onCollisionAfterDisplace=e.onCollisionAfterDisplace),this.updateBounds(),this.onCreated&&this.onCreated()}updateBounds(){this.halfDim.width=.5*this.dim.width,this.halfDim.height=.5*this.dim.height}getMidX(){return this.pos.x+this.halfDim.width}getMidY(){return this.pos.y+this.halfDim.height}getTop(){return this.pos.y}getRight(){return this.pos.x+this.dim.width}getBottom(){return this.pos.y+this.dim.height}getLeft(){return this.pos.x}insideViewport(){return this.getBottom()>s.activeCamera.y&&this.getTop()<s.activeCamera.y+s.dim.height&&this.getLeft()<s.activeCamera.x+s.dim.width&&this.getRight()>s.activeCamera.x}}n.STATIC="static",n.KINEMATIC="kinematic",n.DYNAMIC="dynamic",n.INELASTIC="inelastic",n.ELASTIC="elastic",n.NONE="none",e.exports=n},function(e,t,i){const s=i(0),o=i(1);function n(e){e=e||{},this._id=o.generateId(),this.pos={x:e.pos&&e.pos.x?e.pos.x:0,y:e.pos&&e.pos.y?e.pos.y:0},this.targetPos={x:0,y:0},this.deadZone={x:e.deadZone&&e.deadZone.x?e.deadZone.x:0,y:e.deadZone&&e.deadZone.y?e.deadZone.y:0},this.offset={x:e.offset&&e.offset.x?e.offset.x:0,y:e.offset&&e.offset.y?e.offset.y:0},this.followingId=e.followingId||null,this.lerpPercentage=e.lerpPercentage||!1,this.zoom=e.zoom||1,this.targetZoom=this.zoom,this.zoomLerpPercentage=e.zoomLerpPercentage||this.lerpPercentage,this.axis=e.axis||"both"}n.prototype.update=function(e){let t=0;if(this.zoom!==this.targetZoom&&(t=o.lerpValue(e,this.zoom,this.targetZoom,this.zoomLerpPercentage),this.zoom+=t),null!=this.followingId&&(this.calculateTargetPos(),this.pos.x!==this.targetPos.x||this.pos.y!==this.targetPos.y)){let t=o.lerpPosition(e,this.pos,this.targetPos,this.lerpPercentage);this.pos.x+=t.x,this.pos.y+=t.y}},n.prototype.calculateTargetPos=function(){if(null!=this.followingId){if("horizontal"===this.axis||"both"===this.axis){let e=(s.entityList[this.followingId].pos.x+this.offset.x)*this.zoom;e-this.pos.x+this.deadZone.x>s.dim.width?this.targetPos.x=e-(s.dim.width-this.deadZone.x):e-this.deadZone.x<this.pos.x&&(this.targetPos.x=e-this.deadZone.x)}if("vertical"===this.axis||"both"===this.axis){let e=(s.entityList[this.followingId].pos.y+this.offset.y)*this.zoom;e-this.pos.y+this.deadZone.y>s.dim.height?this.targetPos.y=e-(s.dim.height-this.deadZone.y):e-this.deadZone.y<this.pos.y&&(this.targetPos.y=e-this.deadZone.y)}}},n.prototype.follow=function(e){this.followingId=e,this.deadZone.x=s.dim.width/2,this.deadZone.y=s.dim.height/2},n.prototype.stationary=function(){this.followingId=null},n.prototype.setZoom=function(e,t){this.zoomLerpPercentage=t||!1,this.targetZoom=e},n.prototype.adjustZoom=function(e,t){this.zoomLerpPercentage=t||!1,this.targetZoom+=e},n.prototype.moveToPos=function(e){this.targetPos.x=e.x,this.targetPos.y=e.y},n.prototype.jumpToPos=function(e){this.pos.x=e.x,this.pos.y=e.y},n.prototype.jumpToTargetPos=function(){this.pos.x=this.targetPos.x,this.pos.y=this.targetPos.y},e.exports=n},function(e,t,i){const s=i(1);function o(e){e=e||{},this._id=s.generateId(),this.image=new Image,this.image.src=e.src||null,this.numberOfFrames=e.numberOfFrames||0,this.startFrame=e.startFrame||0,this.endFrame=e.endFrame||this.numberOfFrames,this.dim={width:e.frameWidth||0,height:e.frameHeight||0},this.frameSpacing=e.frameSpacing||0,this.frameIndex=this.startFrame,this.timePerAnimationFrame=e.timePerAnimationFrame||0,this.elapsedTime=0,this.animated=e.animated||!1,this.loaded=!1,this.lastFrameEnding=!1;const t=this;this.image.onload=function(){0===t.dim.width&&(t.dim.width=t.image.width),0===t.dim.height&&(t.dim.height=t.image.height),t.loaded=!0,t=null}}o.prototype.reset=function(){this.frameIndex=this.startFrame,this.elapsedTime=0,this.lastFrameEnding=!1},o.prototype.setStartEndFrames=function(e,t){this.startFrame=e,this.endFrame=t},o.prototype.update=function(e){this.animated&&(this.elapsedTime+=e,this.elapsedTime>=this.timePerAnimationFrame&&(this.frameIndex++,this.elapsedTime=0),this.frameIndex>this.endFrame&&(this.frameIndex=this.startFrame,this.lastFrameEnding=!1,this.elapsedTime=0),this.frameIndex+1==this.endFrame&&this.elapsedTime+e>=this.timePerAnimationFrame&&(this.lastFrameEnding=!0))},o.prototype.render=function(e,t,i,s){this.loaded&&(i=i||this.dim,s=s||i,e.drawImage(this.image,this.frameIndex*this.dim.width+this.frameIndex*this.frameSpacing,Math.floor(this.frameIndex*this.dim.width/this.image.width)+this.frameIndex*this.frameSpacing,this.dim.width,this.dim.height,t.x,t.y,s.width,s.height))},e.exports=o},function(e,t,i){const s=i(0),o=i(1);function n(e){this._id=o.generateId(),this.ready=!1,this.playing=!1,this.buffer=null,this.bufferSource=null,this.gain=1,this.url=e}n.prototype.loadBuffer=function(){const e=new XMLHttpRequest;e.open("GET",this.url,!0),e.responseType="arraybuffer";const t=this;e.onload=function(){s.audioCtx.decodeAudioData(e.response,(function(e){e?(t.buffer=e,t.ready=!0):console.warn("Error decoding audio file data for sound entity "+t._id+" at "+t.url)}))},e.send()},n.prototype.play=function(){if(!0===this.ready){const e=this,t=s.audioCtx.createGain();this.bufferSource=s.audioCtx.createBufferSource(),this.bufferSource.onended=function(){e.playing=!1},this.bufferSource.connect(t),t.connect(s.audioCtx.destination),this.bufferSource.buffer=this.buffer,t.gain.value=this.gain,this.bufferSource.start(0),this.playing=!0}},n.prototype.stop=function(){this.playing&&(this.playing=!1,this.bufferSource.stop())},e.exports=n},function(e,t,i){const s=i(0);e.exports={keyDown(e){e||(e=window.event),s.input.preventDefault.includes(e.keyCode)&&e.preventDefault(),s.input.keyState[String.fromCharCode(e.keyCode)]=!0},keyUp(e){e||(e=window.event),s.input.preventDefault.includes(e.keyCode)&&e.preventDefault(),s.input.keyState[String.fromCharCode(e.keyCode)]=!1},mouseMove(e){e||(e=window.event);var t=s.canvas.getBoundingClientRect();s.input.mouseState.pos.x=(e.clientX-t.left)/s.scale.x,s.input.mouseState.pos.y=(e.clientY-t.top)/s.scale.y},mouseClick(e){e||(e=window.event),s.input.mouseState.clicked=!0},mouseDown(e){e||(e=window.event),s.input.mouseState.mouseDown=!0},mouseUp(e){e||(e=window.event),s.input.mouseState.mouseDown=!1}}}])}));