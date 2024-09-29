
function collectPuzzle(...puzzles) {
    // TODO:在这里写入具体的实现逻辑
    // 对所有的碎片进行收集，获取不同拼图类型的结果，并返回
    let puzzle=new Array();
    for(i in puzzles){
      for(j in puzzles[i]){
        // console.log(puzzles[i][j]);
        if(!puzzle.includes(puzzles[i][j])){
          puzzle.push(puzzles[i][j])
        }
      }
    }
    for(k in puzzle){
      console.log(puzzle[k]);
    }
    return puzzle;
  }
  
  