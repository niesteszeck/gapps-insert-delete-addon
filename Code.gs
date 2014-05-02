/**
 * Creates menu entries in the Sheets UI when the document is opened.
 */
function onOpen() {
   var ss = SpreadsheetApp.getActive();
   var items = [
      {name: 'Shift Down', functionName: 'shiftDown'},
      {name: 'Shift Right', functionName: 'shiftRight'}
   ];
   ss.addMenu('Insert Cells', items);
   var items = [
      {name: 'Shift Up', functionName: 'shiftUp'},
      {name: 'Shift Left', functionName: 'shiftLeft'}
   ];
   ss.addMenu('Delete Cells', items);
}

/**
 * Runs when the add-on is installed.
 */
function onInstall() {
  onOpen();
}

/**
 * Insert blank cells and shift existing content down
 */
function shiftDown() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  var col = cell.getColumn();
  var range = sheet.getActiveRange();
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var lastRow = sheet.getLastRow();
  sheet.getRange(row, col, lastRow - row + 1, numCols).copyTo(sheet.getRange(row + numRows, col, lastRow - row + 1, numCols));
  range.clearContent();
}

/**
 * Insert blank cells and shift existing content to the right
 */
function shiftRight() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  var col = cell.getColumn();
  var range = sheet.getActiveRange();
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var lastCol = sheet.getLastColumn();
  sheet.getRange(row, col, numRows, lastCol - col + 1).copyTo(sheet.getRange(row, col + numCols, numRows, lastCol - col + 1));
  range.clearContent();
}

/**
 * Delete cells and shift up content from below
 */
function shiftUp() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  var col = cell.getColumn();
  var range = sheet.getActiveRange();
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var lastRow = sheet.getLastRow();
  try {
    sheet.getRange(row + numRows, col, lastRow - row - numRows + 1, numCols).copyTo(sheet.getRange(row, col, lastRow - row - numRows + 1, numCols));
    sheet.getRange(lastRow - numRows + 1, col, numRows, numCols).clearContent();
  }
  catch(err) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Cannot shift cells up from the very bottom", "Error", -1);
  }
}

/**
 * Delete cells and shift left content from the right
 */
function shiftLeft() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();
  var row = cell.getRow();
  var col = cell.getColumn();
  var range = sheet.getActiveRange();
  var numRows = range.getNumRows();
  var numCols = range.getNumColumns();
  var lastCol = sheet.getLastColumn();
  try {
    sheet.getRange(row, col + numCols, numRows, lastCol - col - numCols + 1).copyTo(sheet.getRange(row, col, numRows, lastCol - col - numCols + 1));
    sheet.getRange(row, lastCol - numCols + 1, numRows, numCols).clearContent();
  }
  catch(err) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Cannot shift cells left from the far right", "Error", -1);
  }
}
