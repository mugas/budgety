//Budget Controller
var budgetController = (function() {})();

// UI Controller
var UIController = (function() {
  //We can create variables for each strings then we
  //can only need to change them here
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };
  return {
    //This functions are accessible by all modules
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    // to have access to the DOMstring we need now to define the variable here
    var DOM = UICtrl.getDOMstrings();

    // Two Event listener, one for click other for return key for the same function
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    // 1. Get the filled input data
    var input = UICtrl.getInput();
    //2. Add the item to the budget controller
    //3. Add new item to UI
    //4. Calculate the budget
    //5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log("application started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
