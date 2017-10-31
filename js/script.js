$(document).ready(function () {
  let container = $('#container');
  
  let snake = {
    bodyLength: 10,
    moveDirection: 'right',
    points: 0,
    headPosition: [35, 20],
    body: [[35, 20]],

    increaseLength: function () {
      this.bodyLength++;
    },

    increasePoints: function () {
      this.points++;
    },
    
    showPoints: function () {
      return this.points;
    },

    //after pressing a button, direction of snake will change
    changeDirection: function (direction) {
      if (this.moveDirection !== direction) {
        if (direction === 'left') {
          this.moveDirection = 'left';
        } else if (direction === 'up') {
          this.moveDirection = 'up';
        } else if (direction === 'right') {
          this.moveDirection = 'right';
        } else {
          this.moveDirection = 'down';
        }
      }
    },

    //snake is moving in this direction.
    moveSnake: function (moveDirection) {

      //move will have values that will change headPosition, that will be pushed into body array.
      //last array in snake.body array is head position.
      let move = [];

      switch (moveDirection) {
        case 'left':
          move = [-1, 0];
          break;
        case 'right':
          move = [1, 0];
          break;
        case 'up':
          move = [0, -1];
          break;
        case 'down':
          move = [0, 1];
          break;
      }

      this.body.push(this.moveHead(move));

      if (this.body.length === this.bodyLength) {
        this.body.shift();
      }

      this.paintSnake(this.body);

    },

    paintSnake: function(body) {

      //delete all body parts
      container.empty();
      let i = 0,
          head = body.length - 1;
      while (body[i]) {
        if (i === head) {
          container.append('<div class="head-part" style="top: ' + body[i][1] + 'rem; left: ' + body[i][0] + 'rem"></div>');
        } else {
          container.append('<div class="body-part" style="top: ' + body[i][1] + 'rem; left: ' + body[i][0] + 'rem"></div>');
        }
        i++;
      }
    },

    moveHead: function(move) {

      //headPosition is changed by move value
      this.headPosition[0] += move[0];

      //this function checks if head hits walls
      if ((this.headPosition[0] > 69) || (this.headPosition[0] < 0)) {
        clearInterval(movement);
        alert('gameOverMan' + this.headPosition);
      }
      this.headPosition[1] += move[1];

      //this function checks if head hits walls
      if ((this.headPosition[1] > 39) || (this.headPosition[1] < 0)) {
        clearInterval(movement);
        alert('gameOverMan' + this.headPosition);
      }


      //I need new array and copy it via spread, because even if I push this.headPosition to body, when changing
      //this.headPosition, it was changing all previous values in snake.body.
      return newHeadPosition = [...this.headPosition];
    },
    
  };

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      clearInterval(movement);
    }

    //there is a problem with changing direction very fast multiple time. There is a delay between moves, so when
    //snake is going left, and I want to move up and left and press buttons to quick, it will override the 'up'
    //with 'left'. So it will not change direction. Probable solution: create an array for 'next' moves and work
    //according to them...
    //or pressing the button, will make turn instant. Will check how to make it work with setInterval... This is
    //probably best solution.

    //array to help check if correct key was pressed
    let allowedKeys = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        ];

    //if pressed key is in the array
    if (allowedKeys.indexOf(e.key) !== -1) {

      //change all to lowerCase and remove arrow, so only direction will stay
      let newKey = e.key.toLowerCase().replace('arrow', '');

      //change direction of snake
      snake.changeDirection(newKey);
    } else {
      console.log('error');
    }
    });

  let movement = setInterval(function () {
    snake.moveSnake(snake.moveDirection);
  }, 200);

  container.on('click', function () {
    snake.increaseLength();
  })

  // container.on('click', function () {
  //   console.log('stop');
  //   clearInterval(movement);
  // });

});