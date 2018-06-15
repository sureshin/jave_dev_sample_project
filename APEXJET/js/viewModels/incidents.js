/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $) {

            function IncidentsViewModel() {
                var self = this;
                //self.value = ko.observable("Green");
                self.Resturl= ko.observable("https://apex.oracle.com/pls/apex/ojet/hr/empinfo/?page=0");
                self.username= ko.observable("");
                self.password= ko.observable("");
                self.fileprefix = ko.observable("Extract");
//                var headers = {
//                                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
//                            };

                self.buttonClick = function (event) {
                    var filenm=  $("#text-input").val()+".csv";
                    var Resturl=$("#text-input-URL").val();

                    $.ajaxSetup({async: false});

                    var csvContent = '';                    
                    console.log(Resturl.length);
                    var headerExtract = false;
                    while (Resturl.length !== 0) {
                        jQuery.ajax({
                            url: Resturl,
                            type: "GET",
                            contentType: 'application/json; charset=utf-8',
//                            headers: headers,
                            success: function (resultData) {
                                console.log(resultData);
                                for (index = 0; index < resultData.items.length; index++)
                                {
                                    if (index === 0 && headerExtract === false)
                                    {
                                        var key = Object.keys(resultData.items[index]);
                                        csvContent += key + '\n';
                                        headerExtract = true;

                                    }
                                    var values = Object.values(resultData.items[index]);
                                    csvContent += values + '\n';

                                }
                                if (typeof (resultData.next) != "undefined")
                                {
                                    Resturl = Object.values(resultData.next)[0];
                                } else {
                                    Resturl = "";
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log("Failed!!");
                                Resturl = "";
                            },

                            timeout: 120000,
                        });

                    }

                    if (csvContent.length !== 0) {
                        var download = function (content, fileName, mimeType) {
                            var a = document.createElement('a');
                            mimeType = mimeType || 'application/octet-stream';

                            if (navigator.msSaveBlob) { // IE10
                                navigator.msSaveBlob(new Blob([content], {
                                    type: mimeType
                                }), fileName);
                            } else if (URL && 'download' in a) { //html5 A[download]
                                a.href = URL.createObjectURL(new Blob([content], {
                                    type: mimeType
                                }));
                                a.setAttribute('download', fileName);
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                            } else {
                                location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
                            }
                        }
                        download(csvContent, filenm, 'text/csv;encoding:utf-8');
                    }

                    return true;
                }


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
            return new IncidentsViewModel();
        }
);
