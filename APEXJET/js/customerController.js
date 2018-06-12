define(['ojs/ojcore'], function(oj) {

  var CustomerController = {
     serviceURL: 'https://apex.oracle.com/pls/apex/ojet/hr/empinfo/',
     
     createCustomerModel: function() {
         var Customer = oj.Model.extend({
                        urlRoot: this.serviceURL, 
                        idAttribute: "empno"
         });
       
         return new Customer();
     },
     
     createCustomerCollection: function() {
        var Customers = oj.Collection.extend({
                        url: this.serviceURL,                        
                        model: this.createCustomerModel()
        });
        
        return new Customers();
     }
    
  }
  
  return CustomerController;
});