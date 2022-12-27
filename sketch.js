var face_x = [] 
var face_y = []
var face_size = []
var face_num = 10
var song
var songIsplay=false //設定此變數為"假"(false)，收到按下滑鼠把變數改為真，音樂開始播放
var amp
var vol
var music_btn_pressed
var mouse_btn_pressed
var Speech_btn_pressed
var myRec = new p5.SpeechRec();
var result
let handpose;

function preload(){
  song = loadSound("Tsum Tsum .mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  //第一個按鈕
  music_btn = createButton("播音樂")
  music_btn.position(50,30)
  music_btn.size(150, 70);
  music_btn.style('background-color', '#cad2c5');
  music_btn.style('font-size', '24px');
  music_btn.style('color', '#282E1E');
  music_btn.mousePressed(music_btn_pressed) //music_btn被按下時，要到music_btn_pressed函數下執行
  //第二個按鈕
  mouse_btn = createButton("暫停音樂")
  mouse_btn.position(250,30)
  mouse_btn.size(150, 70);
  mouse_btn.style('background-color', '#cad2c5');
  mouse_btn.style('font-size', '24px');
  mouse_btn.style('color', '#282E1E');
  mouse_btn.mousePressed(mouse_btn_pressed)
  //第三個按鈕
  Speech_btn = createButton("語音辨識(播音樂/不要播)")
  Speech_btn.position(450,30)
  Speech_btn.size(150, 70);
  Speech_btn.style('background-color', '#cad2c5');
  Speech_btn.style('font-size', '20px');
  Speech_btn.style('color','#282E1E');
  Speech_btn.mousePressed(Speech_btn_pressed)

  face_num = 5

  for(var i=0;i<face_num;i++){
    face_size[i] = random(100,200)  //臉的大小100~300
    face_x[i] = random(0,width)
    face_y[i] = random(0,height)
  }
}
  function music_btn_pressed(){
    song.play()
    songIsplay = true
    amp=new p5.Amplitude()  
    music_btn.style('background-color', '#606F49');
    mouse_btn.style('background-color', '#cad2c5');
    speech_btn.style('background-color', '#cad2c5');

  }

  function mouse_btn_pressed(){
    song.pause()
    songIsplay = false
    music_btn.style('background-color', '#cad2c5');
    mouse_btn.style('background-color', '#606F49');
    speech_btn.style('background-color', '#cad2c5');
  }

  function Speech_btn_pressed(){
  music_btn.style('background-color', '#cad2c5');
  mouse_btn.style('background-color', '#cad2c5');
  speech_btn.style('background-color', '#606F49');
  myRec.onResult =showResult;
  myRec.start();
  }

  function showResult()
  {
  if(myRec.resultValue==true) {
      result = myRec.resultString
        if(myRec.resultString==="播音樂")
            {
              music_btn_pressed()
            }
        if(myRec.resultString==="不要播")
            {

              mouse_btn_pressed()
            }
  }
  }
function draw() {
  background("#f2e9e4");
  // textSize(30)
  // text("X:"+mouseX+"  Y:"+mouseY,50,50)
  for(var j=0;j<face_num;j++){
    push()  
      var f_s = face_size[j]
      translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
      //腳
      fill(255)
      noStroke()
      ellipse(-f_s/3.6,f_s/2.2,f_s/8) //左腳
      ellipse(f_s/3.6,f_s/2.2,f_s/8) //右腳
      //臉的部分
      fill(0)
      noStroke()
      ellipse(0,0,f_s) //臉
      //膚色部分
      noStroke()
      fill("#FFE8D6")
      ellipse(-f_s/10,f_s/15,f_s/2,f_s/1.5) //左膚色臉
      ellipse(f_s/10,f_s/15,f_s/2,f_s/1.5) //右膚色臉
      fill("#FFE8D6")
      ellipse(-f_s/160,f_s/4,f_s/1.2,f_s/2) //下膚色臉
      //耳朵部分
      fill(0)
      noStroke()
      ellipse(-f_s/1.8,-f_s/2.5,f_s/1.8) //左耳朵
      ellipse(f_s/1.8,-f_s/2.5,f_s/1.8) //右耳朵
      //鼻子部分
      stroke(0)
      fill(0)
      ellipse(f_s/90,f_s/4,f_s/6,f_s/10) //鼻子橢圓
      //腮紅部分
      noStroke()
      fill("#FFCDB2")
      ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
      ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅

      //左眼
      fill(0)
      stroke(0)
      ellipse(-f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
      //右眼
      fill(0)
      ellipse(f_s/9+map(mouseX,0,width,-f_s/100,f_s/40),-f_s/60+map(mouseY,0,height,-f_s/60,f_s/60),f_s/12,f_s/8)
      

      if(!songIsplay){
        fill("#FFCDB2")
        noStroke()
        ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
        ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 //沒有播放
      }
      else{
        if(!songIsplay){
          fill("#FFCDB2")
          noStroke()
          ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
          ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅
      }
        vol = amp.getLevel() //取得聲音值(值為0~1之間)
        // console.log(vol) //網頁中console數字
        fill("#E5989B")
        noStroke()
        ellipse(-f_s/4,f_s/5,f_s/6,f_s/10) //左腮紅
        ellipse(f_s/4,f_s/5,f_s/6,f_s/10) //右腮紅 
      }
    
    

      noFill()
    pop()

  }
}

  // function mousePressed() //音樂播放或暫停
  // {
  //   if(!songIsplay){
  //     song.play()
  //     songIsplay = true
  //     amp=new p5.Amplitude()

  //   }
  //   else{
  //     song.pause()
  //     songIsplay = false

  //   }
    
  // }
