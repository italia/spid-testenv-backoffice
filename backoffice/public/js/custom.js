/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(window).load(function () {


    /* MDA20171107 moved to react logic (Box2 component)

    $('#SaveMetadataButton').on('click', function () {
        var resetlist = document.getElementsByClassName("validationfailed");
                while (resetlist.length > 0)
                {
                    resetlist[0].classList.remove("validationfailed");
                };
        var formList = document.getElementsByTagName("form");
        var validity = true;
        errorformlist = [];
        for (i = 0; i < formList.length; i++)
        {
            formid = formList[i].id;
            formvalidity =  formList[i].checkValidity();
            if (!formvalidity) {
                errorformlist.push(i);   
            }
            validity = validity && formvalidity;
            if ((typeof formid !== undefined) && (formid.indexOf("attribute-container") !== -1)) {
                formvalidity = ($('#' + formid + ' :input[type="checkbox"]:checked').length > 0);
                validity = validity && formvalidity;
                if (!formvalidity)
                    errorformlist.push(i);
            }
        }
        if (validity) {
            var blob = $('.ace_content').text();
            var textFile = new Blob([blob], {type: 'text/plain'});
            filename = GenerateName();
            invokeSaveAsDialog(textFile, filename);
        }
        else {
           modalobj =  $('#ValidationFailedModal');
           for ( z = 0; z < errorformlist.length; z++)
           {
               cardholder = formList[errorformlist[z]];
               while (! cardholder.classList.contains("card")) cardholder = cardholder.parentNode; 
               cardholder.classList.add("validationfailed");
                if (! cardholder.classList.contains("maincard")) {
                    while (! cardholder.classList.contains("maincard")) cardholder = cardholder.parentNode; 
                        cardholder.classList.add("validationfailed");
               }      
           }
           modalobj.modal();
        }
    });
    */
    
    
    
    
    
    
    
    
});

/* MDA20171107 moved to react logic (Box2 component)
function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        try {
            file.type = 'video/webm';
        } catch (e) {
        }
    }

    var fileExtension = (file.type || 'video/webm').split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.download = fileFullName;

    hyperlink.style = 'display:none;opacity:0;color:transparent;';
    (document.body || document.documentElement).appendChild(hyperlink);

    if (typeof hyperlink.click === 'function') {
        hyperlink.click();
    } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }
    (window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.download = fileName || 'unknown';
        save.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(save);

        if (typeof save.click === 'function') {
            save.click();
        } else {
            save.target = '_blank';
            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
        }

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

function GenerateTimeStamp(dateIn) {
    var yyyy = dateIn.getFullYear();
    var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
    var dd = dateIn.getDate();
    var hh = dateIn.getHours();
    var mmnn = dateIn.getMinutes();
    var ss = dateIn.getSeconds();
    return String(10000 * yyyy + 100 * mm + dd) + String(10000 * hh + mmnn * 100 + ss); // Leading zeros for mm and dd
}

function GenerateName() {
    suffix = ".xml";
    filename = "Metadata";
    var displayname = $("#OrganizationName").val();
    if (typeof displayname !== undefined) {
        displayname = "-" + displayname.replace(/[\\/:*?\"<>|/\s]/g, "");
        filename += displayname.toLowerCase();
    }
    filename += "-" + GenerateTimeStamp(new Date());
    return filename + suffix;
}
*/


function RandomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function GenerateSPIDCode() {
    randomAlpha = randomString = "";
    for (i=0; i<4; i++) randomAlpha += String.fromCharCode(Math.round(Math.random() * (25) + 97));
    randomString =  RandomString(10);
    spidcode = randomAlpha+randomString;
    return spidcode; 
}


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}




$(document).ready(function () {
    var errorMessage = "Please match the requested format.";
    $(this).find("textarea").on("input change propertychange", function () {
        var pattern = $(this).attr("data-pattern");
        if (typeof pattern !== typeof undefined && pattern !== false)
        {
            console.log("valido pattern");
            var patternRegex = new RegExp("^" + pattern.replace(/^\^|\$$/g, '') + "$", "g");
            hasError = !$(this).val().match(patternRegex);
            if (typeof this.setCustomValidity === "function")
            {
                this.setCustomValidity(hasError ? errorMessage : "");
            } else
            {
                $(this).toggleClass("error", !!hasError);
                $(this).toggleClass("ok", !hasError);
                if (hasError)
                {
                    $(this).attr("title", errorMessage);
                } else
                {
                    $(this).removeAttr("title");
                }
            }
        }
    });
    
    $('#AutoGeneratedSPIDCode').val(GenerateSPIDCode());

});