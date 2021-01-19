const dataService = function(){
    const BASE_WORDS = [
    {w:'あ',key:'a'},
    {w:'い',key:'i'},
    {w:'う',key:'u'},
    {w:'え',key:'e'},
    {w:'お',key:'o'},
    {w:'か',key:'ka'},
    {w:'き',key:'ki'},
    {w:'く',key:'ku'},
    {w:'け',key:'ke'},
    {w:'こ',key:'ko'},
    {w:'さ',key:'sa'},
    {w:'し',key:'si'},
    {w:'す',key:'su'},
    {w:'せ',key:'se'},
    {w:'そ',key:'so'},
    {w:'た',key:'ta'},
    {w:'ち',key:'ti'},
    {w:'つ',key:'tu'},
    {w:'て',key:'te'},
    {w:'と',key:'to'},
    {w:'な',key:'na'},
    {w:'に',key:'ni'},
    {w:'ぬ',key:'nu'},
    {w:'ね',key:'ne'},
    {w:'の',key:'no'},
    {w:'は',key:'ha'},
    {w:'ひ',key:'hi'},
    {w:'ふ',key:'hu'},
    {w:'へ',key:'he'},
    {w:'ほ',key:'ho'},
    {w:'ま',key:'ma'},
    {w:'み',key:'mi'},
    {w:'む',key:'mu'},
    {w:'め',key:'me'},
    {w:'も',key:'mo'},
    {w:'や',key:'ya'},
    {w:'ゆ',key:'yu'},
    {w:'よ',key:'yo'},
    {w:'ら',key:'ra'},
    {w:'り',key:'ri'},
    {w:'る',key:'ru'},
    {w:'れ',key:'re'},
    {w:'ろ',key:'ro'},
    {w:'わ',key:'wa'},
    {w:'を',key:'o'},
    {w:'ん',key:'n'}
  ];
  const BASE_SECOND_WORDS = [
    {w:'ア',key:'a'},
    {w:'イ',key:'i'},
    {w:'ウ',key:'u'},
    {w:'エ',key:'e'},
    {w:'オ',key:'o'},
    {w:'カ',key:'ka'},
    {w:'キ',key:'ki'},
    {w:'ク',key:'ku'},
    {w:'ケ',key:'ke'},
    {w:'コ',key:'ko'},
    {w:'サ',key:'sa'},
    {w:'シ',key:'si'},
    {w:'ス',key:'su'},
    {w:'セ',key:'se'},
    {w:'ソ',key:'so'},
    {w:'タ',key:'ta'},
    {w:'チ',key:'ti'},
    {w:'ツ',key:'tu'},
    {w:'テ',key:'te'},
    {w:'ト',key:'to'},
    {w:'ナ',key:'na'},
    {w:'ニ',key:'ni'},
    {w:'ヌ',key:'nu'},
    {w:'ネ',key:'ne'},
    {w:'ノ',key:'no'},
    {w:'ハ',key:'ha'},
    {w:'ヒ',key:'hi'},
    {w:'フ',key:'hu'},
    {w:'ヘ',key:'he'},
    {w:'ホ',key:'ho'},
    {w:'マ',key:'ma'},
    {w:'ミ',key:'mi'},
    {w:'ム',key:'mu'},
    {w:'メ',key:'me'},
    {w:'モ',key:'mo'},
    {w:'ヤ',key:'ya'},
    {w:'ユ',key:'yu'},
    {w:'ヨ',key:'yo'},
    {w:'ラ',key:'ra'},
    {w:'リ',key:'ri'},
    {w:'ル',key:'ru'},
    {w:'レ',key:'re'},
    {w:'ロ',key:'ro'},
    {w:'ワ',key:'wa'},
    {w:'オ',key:'o'},
    {w:'ン',key:'n'}
  ];
  const BASE_UP_WORDS = [
    {w:'が',key:'ga'},
    {w:'ぎ',key:'gi'},
    {w:'ぐ',key:'gu'},
    {w:'げ',key:'ge'},
    {w:'ご',key:'go'},
    {w:'ざ',key:'za'},
    {w:'じ',key:'zi'},
    {w:'ず',key:'zu'},
    {w:'ぜ',key:'ze'},
    {w:'ぞ',key:'zo'},
    {w:'だ',key:'da'},
    {w:'ぢ',key:'di'},
    {w:'づ',key:'du'},
    {w:'で',key:'de'},
    {w:'ど',key:'do'},
    {w:'ば',key:'ba'},
    {w:'び',key:'bi'},
    {w:'ぶ',key:'bu'},
    {w:'べ',key:'be'},
    {w:'ぼ',key:'bo'},
    {w:'ぱ',key:'pa'},
    {w:'ぴ',key:'pi'},
    {w:'ぷ',key:'pu'},
    {w:'ぺ',key:'pe'},
    {w:'ぽ',key:'po'}
  ];
  const BASE_SECOND_UP_WORDS = [
    {w:'ガ',key:'ga'},
    {w:'ギ',key:'gi'},
    {w:'グ',key:'gu'},
    {w:'ゲ',key:'ge'},
    {w:'ゴ',key:'go'},
    {w:'ザ',key:'za'},
    {w:'ジ',key:'zi'},
    {w:'ズ',key:'zu'},
    {w:'ゼ',key:'ze'},
    {w:'ゾ',key:'zo'},
    {w:'ダ',key:'da'},
    {w:'ヂ',key:'di'},
    {w:'ヅ',key:'du'},
    {w:'デ',key:'de'},
    {w:'ド',key:'do'},
    {w:'バ',key:'ba'},
    {w:'ビ',key:'bi'},
    {w:'ブ',key:'bu'},
    {w:'ベ',key:'be'},
    {w:'ボ',key:'bo'},
    {w:'パ',key:'pa'},
    {w:'ピ',key:'pi'},
    {w:'プ',key:'pu'},
    {w:'ペ',key:'pe'},
    {w:'ポ',key:'po'}
  ];
  const FIRST = 'aiueokstnhmyrwngzdbp';
  const SECOND = 'aiueo';
  const FPS = 60;
  let width = 500;
  let height = 600;
  let hadRun = false;
  let words = [];
  let speed = 0.5;
  let currentKeyIn = '';
  let score = 0;
  let failWords = {};
  let keyInIds = [];
  let levelUp = false;
  let secondWord = false;

  function generateWords(){
    let wordStr = [];
    words = [];
    if(secondWord){
      wordStr = BASE_SECOND_WORDS.slice();
      if(levelUp){
        wordStr = wordStr.concat(BASE_SECOND_UP_WORDS);
      }
    }else{
      wordStr = BASE_WORDS.slice();
      if(levelUp){
        wordStr = wordStr.concat(BASE_UP_WORDS);
      }
    }
    let interval = 0;
    for(let i=0;i<wordStr.length;i++){
      let randIndex = parseInt(Math.random()*wordStr.length);
      let randX = parseInt(Math.random()*width+20);
      if(randX>=width-20){
        randX = width-50;
      }
      let randInterval = parseInt(Math.random()*30)+30;
      let w = wordStr[randIndex];
      let word = {
        id: i+1,
        word:{w:w.w,key:w.key},
        x: randX,
        y: -interval
      }
      interval+= randInterval;
      words.push(word);
    }
  }

  function updateData(){
      updateWords();
  }

  function updateWords(){
    words.forEach((word)=>{word.y+=speed});
    let newWords = [];
    for(let index=0;index<words.length;index++){
      let word = words[index];
      if(keyInIds.indexOf(word.id)==-1&&word.y>=height+20){
        failWords[word.word.key]=word.word;
      }else{
        newWords.push(word);
      }
    }
    words = newWords;
  }

  function updateKeyIn(key){
    switch(currentKeyIn.length){
      case 0:
        if(FIRST.indexOf(key)>-1){
          currentKeyIn+=key;
        }
      break;
      case 1:
        if(SECOND.indexOf(currentKeyIn)>-1){
          currentKeyIn='';
          updateKeyIn(key);
        }else if(SECOND.indexOf(key)>-1){
          currentKeyIn+=key;
        }else{
          currentKeyIn='';
        }
      break;
      case 2:
        currentKeyIn='';
        updateKeyIn(key);
      break;
    }
  }

  function checkKeyIn(){
    for(let index=0;index<words.length;index++){
      let word = words[index];
      if(word.y<=10||word.y>height+20||keyInIds.indexOf(word.id)>-1){
        continue;
      }
      if(word.word.key==currentKeyIn){
        keyInIds.push(word.id);
        score++;
        break;
      }
    }
  }

  return {
    run: function(uiWidth,uiHeight) {
      if(hadRun){
        return;
      }
      hadRun = true;
      width = uiWidth;
      height = uiHeight;
      generateWords();
      setInterval(updateData,1000/FPS);
    },
    restartData:function(uiSpeed,uiLevelUp,uiSecondWord){
       words = [];
       speed = uiSpeed;
       levelUp = uiLevelUp;
       secondWord = uiSecondWord;
       currentKeyIn = '';
       score = 0;
       failWords = {};
       keyInIds = [];
       generateWords();
    },
    getWords:function(){
      return words.filter((word)=>dataService.getKeyInIds().indexOf(word.id)==-1);
    },
    getFailWords:function(){
      return failWords;
    },
    getScore:function(){
      return score;
    },
    getCurrentKeyIn:function(){
      return currentKeyIn;
    },
    getKeyInIds:function(){
      return keyInIds;
    },
    getFirstWord:function(){
      return words.filter((word)=>dataService.getKeyInIds().indexOf(word.id)==-1)[0];
    },
    updateKeyIn:updateKeyIn,
    checkKeyIn:checkKeyIn
  };
}();


const uiController = function(dataService){
  let hadRun = false;
  const FPS = 60;
  const canvas = document.getElementsByClassName("mainCanvas")[0];
  const ctx = canvas.getContext('2d');
  const speedUi = document.getElementById("speed");
  const levelUpUi =  document.getElementById("levelUp");
  const secondWordUi = document.getElementById("secondWord");
  const japaneseTable = document.getElementById("japanese-table");
  const japaneseTableTds = japaneseTable.querySelectorAll("td");
  function printWords(){
    dataService.getWords().forEach((word)=>{
      printWord(word);
    });
  }
  function printWord(word){
    ctx.font = "16pt Arial";
    ctx.fillStyle = "black";
    ctx.fillText(word.word.w,word.x,word.y);
  }
  function printFailWords(){
    let failWords =  dataService.getFailWords();
    for(let key in failWords){
      for(let i=0;i<japaneseTableTds.length;i++){
        let td = japaneseTableTds[i];
        let tdKey = td.getAttribute("key");
        if(key==tdKey&&!td.classList.contains("table-current")&&!td.classList.contains("table-first")){
          td.classList.add("table-fail");
        }
      }
    }
  }
  function printFirstWord(){
    let firstWord = dataService.getFirstWord();
    if(firstWord==null){
      return
    }
    for(let i=0;i<japaneseTableTds.length;i++){
      let td = japaneseTableTds[i];
      let tdKey = td.getAttribute("key");
      if(tdKey&&firstWord.word.key==tdKey){
        td.classList.add("table-first");
      }else{
        td.classList.remove("table-first");
      }
    }
  }
  function printScore(){
    ctx.font = "24pt Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(dataService.getScore(),canvas.width-50,50);
  }
  function printCurrentKeyIn(){
    ctx.font = "24pt Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(dataService.getCurrentKeyIn(),canvas.width/2,50);
  }
  function printTableWords(keyIn){
    for(let i=0;i<japaneseTableTds.length;i++){
      let td = japaneseTableTds[i];
      let key = td.getAttribute("key");
      if(key==keyIn){
        td.classList.add("table-current");
      }else{
        td.classList.remove("table-current");
      }
    }
  }
  function refresh(){
    clean();
    draw();
  }
  function draw(){
    printScore();
    printWords();
    printCurrentKeyIn();
    printFailWords();
    printFirstWord();
  }
  function clean(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function initControl(){
    document.addEventListener('keydown',(event)=>{
        dataService.updateKeyIn(event.key);
        dataService.checkKeyIn();
        printTableWords(dataService.getCurrentKeyIn());
    });
    document.getElementById('restart').addEventListener('click',()=>{
        let speed = parseFloat(speedUi.value);
        let levelUp = levelUpUi.checked;
        let secondWord = secondWordUi.checked;
        dataService.restartData(speed,levelUp,secondWord);
        for(let i=0;i<japaneseTableTds.length;i++){
          let td = japaneseTableTds[i];
          td.className="";
        }
    });
  }
  return {
      run:function(){
        if(hadRun){
          return;
        }
        hadRun = true;
        initControl();
        setInterval(refresh,1000/FPS);
        dataService.run(canvas.width,canvas.height);
      }
  }
}(dataService);

uiController.run();