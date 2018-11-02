//Budget Controller
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on "inc" or "exp" type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      //Push into data structure
      data.allItems[type].push(newItem);
      //from the array allItems get the type of the function and
      // accordingly if it's a expense or income add a new item

      //return the new element
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();

// UI Controller
var UIController = (function() {
  //We can create variables for each strings then we
  //can only need to change them here
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
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
    addListItem: function(obj, type) {
      var html, newHtml, element;
      //create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //replace the placeholder with some actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //insert the html into the dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function() {
      var fields, fieldsArray;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });
      fieldsArray[0].focus();
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
    var input, newItem;
    // 1. Get the filled input data
    input = UICtrl.getInput();
    //2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3. Add new item to UI

    UICtrl.addListItem(newItem, input.type);

    //4. Clear the fields
    UICtrl.clearFields();
    //5. Calculate the budget
    //6. Display the budget on the UI
  };

  return {
    init: function() {
      console.log("application started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
