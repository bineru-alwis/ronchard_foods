const spreadSheet_ID = "1MgqwcMyn2Ezt9xZ5N54beOazB4udpqpS2iJh106idKs";

function doGet(e) {
  var page = e.parameter.page;

  if (page == "products") {
    return HtmlService.createTemplateFromFile('index_inventory')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                    
  } else {
    return HtmlService.createTemplateFromFile('index_dashboard')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);                
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function InventoryProductInfo() {
    
    const sheet = SpreadsheetApp.openById(spreadSheet_ID).getSheetByName("Inventory");
    const data = sheet.getRange(2, 1, sheet.getLastRow(), 8).getValues();
    //Logger.log(sheet.getRange(2, 1, sheet.getLastRow(), 8).getValues());
    
    return data.reduce((acc, row) => {
    if (row[0]) { // If SKU is not empty, add to results
      acc.push([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]]);
    }
    return acc;
    }, []);

    /*Logger.log(data.reduce((acc, row) => {
    if (row[0]) { // If SKU is not empty, add to results
      acc.push([row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]]);
    }
    return acc;
    }, []));*/
    

}

/*function getSKUs() { 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Products");
  const data = sheet.getRange("A2:G" + sheet.getLastRow()).getValues();

  return data.reduce((acc, row) => {
    if (row[0]) { // If SKU is not empty, add to results
      acc.push([row[0], row[4], row[5], row[2], row[6]]);
    }
    return acc;
  }, []);
}*/

//Function to get the Script URL to enter to apps internal links (dashboard, products ie)
function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}