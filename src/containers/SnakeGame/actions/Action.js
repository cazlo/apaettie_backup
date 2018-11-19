const Action = {
  // AI config
  TOGGLE_ENABLE_A_STAR: "TOGGLE_ENABLE_A_STAR",
  TOGGLE_GREEDY_SP_TAIL: "TOGGLE_GREEDY_SP_TAIL",
  CHANGE_NAME: "CHANGE_NAME",
  // Game
  PLAY: 'PLAY',
  RESET: 'RESET',
  TICK: 'TICK',
  GAME_OVER: 'GAME_OVER',
  MOVE: 'MOVE',
  CHANGE_DIRECTION: 'CHANGE_DIRECTION',
  SPAWN_FOOD: 'SPAWN_FOOD',
  EAT_FOOD: 'EAT_FOOD',
  SET_SIZE: "SET_SIZE",
  // High Score
  ADD_SCORE: "ADD_SCORE",
  // Path Finding,
  START_PATH_FIND: "START_PATH_FIND",
  FINISH_PATH_FIND: "FINISH_PATH_FIND",
  PATH_NOT_FOUND: "PATH_NOT_FOUND",
  IGNORE_STALE_RESULT: "IGNORE_STALE_RESULT",
};

export default Action;