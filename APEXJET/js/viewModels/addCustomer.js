/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'customerController', 'jquery', 'ojs/ojmodel', 'ojs/ojbutton',
    'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojdatetimepicker'],
        function (oj, ko, customerController) {

            function EditCustomerViewModel() {
                var self = this;
                self.customerModel = ko.observable();
                //var obj = { "empno": 566, "ename":"Test_1"};
                self.list = ko.observable();
                self.initialize = function (params) {
                    console.log("initialize called");
                    self.customerModel(customerController.createCustomerModel());
                    self.list = customerController.createCustomerCollection();
                };
                self.goBack = function () {
                    oj.Router.rootInstance.store(null);
                    oj.Router.rootInstance.go("customers");
                };

                self.saveCustomer = function () {
                    var obj = { "empno": self.customerModel().toJSON().empno, "ename":self.customerModel().toJSON().ename};
                    $.ajax({
                        url: "https://apex.oracle.com/pls/apex/ojet/hr/empinfo/",
                        data: JSON.stringify(obj),
                        type: 'POST',
                       contentType: "application/json",
                       dataType: "text",
                        success: function (data, textStatus, jqXHR) {
                            console.log("success");
                           // oj.Router.rootInstance.store(-1);
                            oj.Router.rootInstance.go("customers");

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                             console.log("Error");
                            console.log("Update error: ", textStatus);
                        }
                    });

                };

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };
                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                };
                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };
                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new EditCustomerViewModel();
        }
);
